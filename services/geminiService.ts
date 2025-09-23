import { createClient } from "@supabase/supabase-js";
import type { Category } from '../types';
import { locales } from '../i18n/locales';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function callGemini(prompt: string, imageData?: any, model?: string) {
  const { data, error } = await supabase.functions.invoke("gemini-fn", {
    body: { prompt, imageData, model },
  });
  
  if (error) {
    console.error("Edge Function Error:", error);
    throw new Error(error.message || 'Gemini API error');
  }

  if (!data) {
    throw new Error('No data returned from Edge Function');
  }


  if (data.error) {
    console.error("Gemini API Error:", data.error);
    throw new Error(data.error.message || 'Gemini API returned an error');
  }

  if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
    console.error("Invalid API response:", data);
    throw new Error('Invalid response from Gemini API - no candidates returned');
  }

  return data;
}

const fileToBase64 = async (file: File): Promise<{data: string, mimeType: string}> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const data = result.split(',')[1];
      resolve({ data, mimeType: file.type });
    };
    reader.readAsDataURL(file);
  });
};

export const analyzeImageForSuggestions = async (
    category: Category,
    imageFile: File,
    fields: string[]
): Promise<Record<string, string>> => {
    if (!category.suggestionPrompt) {
        throw new Error("This category does not support AI suggestions.");
    }
    
    const imageData = await fileToBase64(imageFile);
    const prompt = category.suggestionPrompt(fields);

    try {
        const response = await callGemini(prompt, imageData, 'gemini-2.0-flash');
        
        if (!response?.candidates?.length) {
            throw new Error("No candidates returned from AI");
        }
        
        const candidate = response.candidates[0];
        if (!candidate?.content?.parts?.length) {
            throw new Error("Invalid response structure from AI");
        }
        
        let text = candidate.content.parts[0].text?.trim();
        if (!text) {
            throw new Error("No text content in AI response");
        }
        
        if (text.startsWith("```json")) {
            text = text.substring(7, text.length - 3).trim();
        } else if (text.startsWith("```")) {
            text = text.substring(3, text.length - 3).trim();
        }

        const suggestions = JSON.parse(text);
        return suggestions;

    } catch (error) {
        console.error("Error analyzing image for suggestions:", error);
        throw new Error("Error Analyzing Image.");
    }
}

// Helper function to resolve option keys to their English translations
const resolveOptionKeys = (formData: Record<string, string | File>): Record<string, string> => {
  const resolved: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string' && value.startsWith('option_')) {
      // Use English translations for the prompt
      const translatedValue = locales.en[value] as string;
      resolved[key] = translatedValue || value;
    } else if (typeof value === 'string') {
      resolved[key] = value;
    }
  }
  
  return resolved;
};

export const generateProductImages = async (
  category: Category,
  formData: Record<string, string | File>,
  numImages: number,
  onProgress: (current: number, total: number) => void
): Promise<string[]> => {
  
  const imageFile = formData.productImage as File;
  if (!imageFile) {
    throw new Error("Image file is missing.");
  }
  
  
  const resolvedData = resolveOptionKeys(formData);
  let prompt = category.promptTemplate(resolvedData);
  prompt = `GENERATE AN IMAGE (not text description): ${prompt}`;
  console.log("Generated Prompt:", prompt);
  
  const mainImageData = await fileToBase64(imageFile);
  
  const generateSingleImage = async (): Promise<string> => {
    const response = await callGemini(prompt, mainImageData, 'gemini-2.5-flash-image-preview');
    
    if (!response?.candidates?.length) {
      throw new Error("No candidates returned from AI");
    }
    
    const candidate = response.candidates[0];
    if (!candidate?.content?.parts?.length) {
      throw new Error("Invalid response structure from AI");
    }
    
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
      if (part.text) {
        throw new Error(`AI returned text instead of image: ${part.text.substring(0, 200)}...`);
      }
    }
    
    throw new Error("No image returned from API");
  };

  try {
    let completedCount = 0;
    onProgress(completedCount, numImages);

    const generationPromises = Array.from({ length: numImages }, () => 
        generateSingleImage()
            .then(result => {
                completedCount++;
                onProgress(completedCount, numImages);
                return { status: 'fulfilled' as const, value: result };
            })
            .catch(error => {
                completedCount++;
                onProgress(completedCount, numImages);
                console.error('Image generation failed:', error.message);
                return { status: 'rejected' as const, reason: error };
            })
    );

    const results = await Promise.all(generationPromises);
    
    const successfulImages = results
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as { status: 'fulfilled'; value: string }).value);
    
    if (successfulImages.length === 0) {
      const failedResults = results.filter(result => result.status === 'rejected');
      const firstError = failedResults[0] as { status: 'rejected'; reason: Error };
      throw new Error(firstError?.reason?.message || "All image generation attempts failed");
    }
    
    return successfulImages;

  } catch (error) {
    console.error("Error generating images:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("Internal Server Error");
  }
};