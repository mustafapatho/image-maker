import { GoogleGenAI, Modality, GenerateContentResponse, Part, Type } from "@google/genai";
import type { Category } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });


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
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
        });

        let text = response.text.trim();
        // Clean the response to ensure it's valid JSON
        if (text.startsWith("```json")) {
            text = text.substring(7, text.length - 3).trim();
        } else if (text.startsWith("```")) {
            text = text.substring(3, text.length - 3).trim();
        }

        const suggestions = JSON.parse(text);
        return suggestions;

    } catch (error) {
        console.error("Error analyzing image for suggestions:", error);
        throw new Error("AI 제안을 생성하는 데 실패했습니다. 이미지나 카테고리를 확인해주세요.");
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
  
  const backgroundRefFile = formData.backgroundReferenceImage as File;
  const modelFile = formData.modelImage as File;
  const clothingFile = formData.clothingImage as File;
  const consistencyFile = formData.consistencyReferenceImage as File;
  const personFile = formData.personImage as File;

  const imagePart = await fileToGenerativePart(imageFile);
  
  // Pass all form data to the template, including files for conditional logic
  const prompt = category.promptTemplate(formData as Record<string, string>);
  console.log("Generated Prompt:", prompt);
  
  const parts: Part[] = [imagePart];
  
  if (backgroundRefFile) {
      const backgroundPart = await fileToGenerativePart(backgroundRefFile);
      parts.push(backgroundPart);
  }
  
  if (modelFile) {
      const modelPart = await fileToGenerativePart(modelFile);
      parts.push(modelPart);
  }

  if (clothingFile) {
      const clothingPart = await fileToGenerativePart(clothingFile);
      parts.push(clothingPart);
  }
  
  if (consistencyFile) {
      const consistencyPart = await fileToGenerativePart(consistencyFile);
      parts.push(consistencyPart);
  }

  if (personFile) {
      const personPart = await fileToGenerativePart(personFile);
      parts.push(personPart);
  }

  parts.push({ text: prompt });

  const contents = { parts };

  const generateSingleImage = async (): Promise<string> => {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: contents,
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    // Check for safety ratings and provide a more informative error
    const candidate = response.candidates[0];
    if (candidate.finishReason !== 'STOP' && candidate.safetyRatings) {
      const blockedRating = candidate.safetyRatings.find(rating => rating.blocked);
      if (blockedRating) {
        console.warn('Image generation blocked due to safety settings. Category:', blockedRating.category);
        throw new Error(`이미지 생성이 안전 설정에 의해 차단되었습니다. (사유: ${blockedRating.category}) 다른 이미지나 프롬프트를 시도해주세요.`);
      }
    }
    throw new Error("API가 이미지를 반환하지 않았습니다. 모델이 요청을 거부했을 수 있습니다.");
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
      results.forEach(result => {
        if (result.status === 'rejected') {
            console.error("A generation promise failed:", result.reason);
        }
      });
      throw new Error("API가 이미지를 하나도 반환하지 않았습니다. 모든 요청이 실패했을 수 있습니다.");
    }
    
    return successfulImages;

  } catch (error) {
    console.error("Error generating images with Gemini API:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("알 수 없는 오류로 이미지 생성에 실패했습니다. 콘솔을 확인해주세요.");
  }
};