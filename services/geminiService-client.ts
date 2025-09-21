import { GoogleGenAI, Modality, GenerateContentResponse, Part } from "@google/genai";
import type { Category } from '../types';

const geminiApiKey = import.meta.env?.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (!geminiApiKey) {
    throw new Error("VITE_GEMINI_API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: geminiApiKey });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeImageForSuggestions = async (
    category: Category,
    imageFile: File,
    fields: string[]
): Promise<Record<string, string>> => {
    if (!category.suggestionPrompt) {
        throw new Error("This category does not support AI suggestions.");
    }
    const imagePart = await fileToGenerativePart(imageFile);
    const prompt = category.suggestionPrompt(fields);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: { parts: [imagePart, { text: prompt }] },
        });

        let text = response.text.trim();
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
  
  const prompt = category.promptTemplate(formData as Record<string, string>);
  console.log("Generated Prompt:", prompt);
  
  const imagePart = await fileToGenerativePart(imageFile);
  const parts: Part[] = [imagePart, { text: prompt }];

  const generateSingleImage = async (): Promise<string> => {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash-preview-image-generation',
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
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
                return { status: 'rejected' as const, reason: error };
            })
    );

    const results = await Promise.all(generationPromises);
    
    const successfulImages = results
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as { status: 'fulfilled'; value: string }).value);
    
    if (successfulImages.length === 0) {
      throw new Error("All image generation attempts failed");
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