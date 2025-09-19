import React from 'react';
import type { Category } from './types';

// Icons remain the same as they are visual components
const CafeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-700" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H8v2H6v2H4v7h16v-7h-2v-2h-2V8h-2V5h-4v3zm4 2h-4v2h4v-2zM4 21h16v2H4v-2z"/></svg> );
const FashionIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20.26 8.13l-4.21-5.9c-.31-.44-.82-.73-1.39-.73H9.34c-.57 0-1.08.29-1.39.73L3.74 8.13c-.22.31-.34.68-.34 1.07v.51c0 1.1.9 2 2 2h13.2c1.1 0 2-.9 2-2v-.51c0-.39-.12-.76-.34-1.07zM12 14c-2.76 0-5 2.24-5 5v1h10v-1c0-2.76-2.24-5-5-5z"/></svg> );
const BeautyIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rose-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.89 0 1.74-.12 2.55-.33l-1.9-1.9c-1.35.66-2.91.8-4.43.34C5.12 19.07 3 15.79 3 12c0-3.31 2.69-6 6-6h.5l-1-1L9.6 3.9C9.99 4 10.37 4 10.75 4c.23 0 .46-.02.68-.04l1.58-1.58C12.67 2.15 12.34 2 12 2zm8.79 10.25c-.2-.48-.51-.89-.92-1.21l-2.61-2.03-3.6-2.82c-.1-.08-.24-.1-.38-.06-.14.03-.25.13-.3.26l-.51 1.28c-.08.21.02.45.23.53l3.6 1.44c.48.19.82.62.82 1.13v.19l-1.39 3.48c-.09.22.02.48.25.57l.82.33c.24.1.51-.03.62-.27l1.45-3.09c.2-.42.27-.89.19-1.34z"/></svg> );
const HandmadeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-lime-600" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg> );
const InteriorIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-500" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"/></svg> );
const PetIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15.5v-1c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5zm5-2.5H9c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5h6c.28 0 .5.22.5.5v5c0 .28-.22.5-.5.5zM12 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg> );
const BakeryIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 1.94 0.78 3.69 2.03 4.94L12 22l4.97-8.06A6.976 6.976 0 0019 9c0-3.87-3.13-7-7-7zm0 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> );
const JewelryIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-2.24 6.88L2 12l7.76 3.12L12 22l2.24-6.88L22 12l-7.76-3.12L12 2zm0 4.24L13.12 9.4 15 10l-1.88 0.6L12 12.5l-1.12-1.9L9 10l1.88-0.6L12 6.24zM6.5 14.5l1.12 1.9L9 17l-1.88-0.6L6.5 18.5l-1.12-1.9L3.5 17l1.88-0.6L6.5 14.5zM17.5 14.5l1.12 1.9L20.5 17l-1.88-0.6L17.5 18.5l-1.12-1.9L14.5 17l1.88-0.6L17.5 14.5z"/></svg> );
const ProfileIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> );
const LifestyleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m-2 8c0-1.11.89-2 2-2s2 .89 2 2H5.81c.85-1.63 2.5-2.8 4.47-2.95C11.26 11.02 12 10.06 12 9c0-1.4-.91-2.6-2.14-2.92C9.22 5.67 8.64 5.35 8 5.1V4h8v1.1c-.64.25-1.22.57-1.86.92C15.91 6.4 15 7.6 15 9c0 1.06.74 1.98 1.72 2.05 1.97.15 3.62 1.32 4.47 2.95H14c0-1.11.89-2 2-2s2 .89 2 2h2c0-2.76-2.24-5-5-5s-5 2.24-5 5h2z"/></svg> );
const EventIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"/></svg> );
const RetouchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg> );
const NailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" viewBox="0 0 24 24" fill="currentColor"><path d="M19.33 7.85c-.88-.09-1.39-.7-1.39-1.35 0-.65.51-1.26 1.39-1.35.98-.1 1.67.73 1.67 1.5s-.69 1.6-1.67 1.5zM12.5 10H11v1.5h1.5V10zm-2 0H9v1.5h1.5V10zm-2 0H7v1.5h1.5V10zm10.75-2.94C17.03 5.48 15.4 4.5 13.5 4.5c-1.89 0-3.48.96-4.68 2.47L8.25 8h7.5l-0.57-1.41c-.4-.98-1.36-1.65-2.43-1.65-1.3 0-2.4.99-2.58 2.24H15v1.5H8.38c.11.23.24.46.38.67l3.22 4.6c.21.3.36.62.45.96h.01c.27.99.04 2.05-.65 2.82-.47.52-1.12.83-1.83.83-1.18 0-2.22-.79-2.55-1.92-.12-.4-.01-1.05.41-1.32.32-.2.73-.13 1.05.15.22.19.33.45.36.69.1.37.5.6.9.6.21 0 .41-.08.56-.23.36-.36.43-.89.23-1.33L7.2 12.51c-.24-.34-.45-.71-.6-1.1L6.04 10H3v1.5h2.24C5.07 12.35 5 13.22 5 14c0 2.21 1.79 4 4 4 1.13 0 2.16-.48 2.9-.125.82-.48 1.4-1.25 1.67-2.18.1-.36.25-.71.49-1.02l2.94-3.59H18V8h.5c.28 0 .5.22.5.5s-.22.5-.5.5H18v1.5h.72l-0.58 1.34-1.61 3.73c-.22.5-.35 1.04-.35 1.6 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.47-0.91-2.73-2.17-3.25L19.25 8h-.5c-.28 0-.5-.22-.5-.5s.22-.5.5.5h.25z"/></svg> );
const FitnessIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg> );
const CarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-700" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg> );
const BedIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20 9H4v6h16V9zM8 13H6v-2h2v2zm5-2h-2v2h2v-2zm5-2h-2v2h2v-2zM2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2z"/></svg> );
const InfluencerIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rose-500" viewBox="0 0 24 24" fill="currentColor"><path d="M9.83 3H14.17L12 5.17 9.83 3M5 3v2.55L2.62 3.17 1.21 4.58 3.58 7H1v10h22V7h-2.58l2.37-2.42-1.41-1.41L19 5.55V3h-5.17L12 1.17 10.17 3H5m14 6h-2v2h2V9m-4 0h-2v2h2V9m-4 0H9v2h2V9z"/></svg> );
const ITIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-600" viewBox="0 0 24 24" fill="currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg> );
const YouTuberIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" viewBox="0 0 24 24" fill="currentColor"><path d="M10 16.5v-9l6 4.5-6 4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> );
const CampaignIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" viewBox="0 0 24 24" fill="currentColor"><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"/></svg> );
const FireIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M13.04 1.22C11.23.5 9.81 2.14 9.81 2.14c-1.79 2.53-.42 5.48.59 6.54.49.49 1.02.77 1.58.85.74.12 1.43-.28 1.95-.82 1.41-1.41 1.05-3.87.56-5.26-.23-.65-.6-1.28-1.04-1.88L13.04 1.22zM17.5 7c-2.49 0-4.5 2.01-4.5 4.5 0 2.11 1.46 3.89 3.44 4.39.42-1.85-.35-3.66-1.63-4.94-.37-.37-.82-.64-1.31-.79-.53-.16-1.12-.1-1.63.14-.6.28-.96.89-.96 1.57 0 .58.33 1.11.82 1.45.69.49 1.62.63 2.5.28 1.15-.45 1.99-1.5 2.2-2.71.03-.17.05-.34.05-.51 0-.83-.34-1.58-.88-2.12-.54-.54-1.29-.88-2.12-.88z"/></svg> );


const getConceptInstructions = (data: Record<string, string>, presetInstructions: Record<string, string>) => {
  const customKeys = ['option_custom'];
  const relevantPresetKey = Object.keys(data).find(key => key.includes('Preset') || key.includes('Concept'));

  if (!relevantPresetKey || customKeys.includes(data[relevantPresetKey])) {
      const customConceptKey = Object.keys(data).find(key => key.includes('customConcept')) || 'customConcept';
      const customConcept = data[customConceptKey] || 'The user has provided a custom concept, please interpret it creatively.';
      return `The user has provided a custom concept: "${customConcept}". Interpret this creative direction to generate a professional and fitting photograph.`;
  }
  
  const preset = data[relevantPresetKey];
  return presetInstructions[preset] || '';
};

const getBackgroundReferenceInstruction = (data: Record<string, any>) => {
    return data.backgroundReferenceImage 
        ? "Crucially, a second image has been uploaded as a background reference. Use this image as strong inspiration for the style, mood, lighting, and composition of the new background. The final result should feel like the product was photographed in a location very similar to the reference image."
        : "";
}

const getConsistencyReferenceInstruction = (data: Record<string, any>) => {
    return data.consistencyReferenceImage 
        ? "CRITICAL STYLISTIC GUIDANCE: A 'Consistency Reference Image' has been provided. This image is the master style guide. The generated photo MUST match the aesthetic of this reference image in terms of lighting (softness, direction, color), color grading, mood, and overall tone. Do NOT copy the content or subject of the reference image, but replicate its visual style precisely to ensure a consistent look across a series of photos."
        : "";
}

const getModelReferenceInstruction = (data: Record<string, any>) => {
    return data.modelImage 
        ? "IMPORTANT: A model photograph has also been uploaded. The primary task is to seamlessly and realistically place the uploaded product onto the person in this model photo. Pay close attention to the model's pose, body shape, and the existing lighting to ensure the product fits naturally with correct perspective, wrinkles, shadows, and highlights. Do not change the model's face or body."
        : "";
}

const getClothingInstruction = (data: Record<string, any>) => {
    if (data.clothingImage) {
        return "An image of clothing has also been uploaded as a reference. The task is to realistically change the person's attire to match the clothes in this reference image. Pay close attention to the style, color, texture, and fit. The result should look natural on the person's body.";
    }
    if (data.clothing) {
        return `Change the person's attire to the following style: "${data.clothing}".`;
    }
    return '';
}

const getHairstyleInstruction = (data: Record<string, any>) => {
    if (data.hairstyle) {
        return `Change the person's hairstyle to the following: "${data.hairstyle}".`;
    }
    return '';
}

const getJsonSuggestionPrompt = (fields: string[]) => {
    const fieldList = fields.map(f => `"${f}"`).join(', ');
    return `Analyze the provided image. Based *only* on the visual information in the image, provide suggestions for the following fields: ${fieldList}.
    Your response MUST be a single, valid JSON object. The keys of the JSON object must be exactly: ${fieldList}.
    Provide concise, descriptive string values for each key. For example, if the image is of a cake, the value for "productName" should be "Chocolate Cake", not a long sentence.
    Do not add any text or formatting before or after the JSON object.`;
}

export const CATEGORIES: Category[] = [
    {
    id: 'viral',
    nameKey: 'category_viral_name',
    descriptionKey: 'category_viral_desc',
    icon: <FireIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_viral_sourceImage_label', type: 'file', required: true, infoKey: 'field_viral_sourceImage_info' },
      { name: 'conceptPreset', labelKey: 'field_conceptPreset_label', type: 'select', required: true, optionKeys: ['option_viral_figurine', 'option_viral_vintage_figure', 'option_viral_anime', 'option_viral_sculpture', 'option_viral_sticker', 'option_custom'] },
      { name: 'environmentDescription', labelKey: 'field_environmentDescription_label', type: 'textarea', required: true, placeholderKey: 'field_environmentDescription_placeholder', condition: { field: 'conceptPreset', value: 'option_viral_figurine' } },
      { name: 'packagingDescription', labelKey: 'field_packagingDescription_label', type: 'textarea', required: true, placeholderKey: 'field_packagingDescription_placeholder', condition: { field: 'conceptPreset', value: 'option_viral_figurine' } },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', required: true, placeholderKey: 'field_customConcept_placeholder_viral', condition: { field: 'conceptPreset', value: 'option_custom' } },
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_viral', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
      let conceptInstructions = '';
      switch (data.conceptPreset) {
        case 'option_viral_figurine':
          conceptInstructions = `Produce a 1/7 scale collectible figurine based on the character/person in the uploaded photo. The style must be hyper-realistic. 
          **Environment:** ${data.environmentDescription}.
          **Packaging:** Include a toy packaging box next to the figurine, designed in a premium collectible style. The box should feature original 2D artwork based on the photo. ${data.packagingDescription}.
          **Details:** The figurine should be mounted on a round, transparent acrylic base with no text. The material should look like high-quality PVC.`;
          break;
        case 'option_viral_vintage_figure':
          conceptInstructions = `Transform the person in the photo into a vintage retro-style action figure, reminiscent of 1980s toys. Place it in a nostalgic setting like a retro gaming room or on top of a comic book. The packaging should be a classic blister pack with bold, colorful illustrations.`;
          break;
        case 'option_viral_anime':
          conceptInstructions = `Redraw the person or subject in the photo as a high-quality anime or manga character. The style should be clean, with dynamic lines and vibrant colors, suitable for a modern anime series. Place them in a fitting animated background (e.g., Tokyo street, fantasy world).`;
          break;
        case 'option_viral_sculpture':
          conceptInstructions = `Create a hyper-realistic 3D sculpture of the subject. The material should look like bronze or marble. Place it on a pedestal within a museum setting, with dramatic spotlighting to emphasize texture and form.`;
          break;
        case 'option_viral_sticker':
          conceptInstructions = `Convert the subject into a cute, die-cut vinyl sticker. It should have a thick white border, a glossy finish, and a playful, slightly simplified 'chibi' or cartoonish style. Place it on a surface like a laptop or water bottle.`;
          break;
        default: // Custom
          conceptInstructions = `The user has a custom viral content request: "${data.customConcept}". Interpret this creatively.`;
      }
      return `You are an AI specializing in creating fun, viral, and shareable content. Your task is to transform the uploaded photo into a new artistic style based on the user's request.
      
      --- EXAMPLE START ---
      - User Uploads: Photo of their cat.
      - User Selects: '3D Collectible Figurine'
      - User Describes Environment: 'On a computer desk, next to a gaming keyboard.'
      - User Describes Packaging: 'The box art should be exciting, like a video game character.'
      - AI Thought Process: The goal is a hyper-realistic render. I need to model the cat faithfully as a small PVC figurine. The scene will be a typical desk. I'll create a dynamic packaging design with the cat's image and some cool graphics. The lighting should be clean studio lighting to show off the figurine.
      --- EXAMPLE END ---
      
      Now, execute the user's actual request.
      **Concept:** ${data.conceptPreset}
      ${conceptInstructions}
      **Additional Requests:** ${data.customRequest || 'None'}.
      **CRITICAL INSTRUCTIONS:** Faithfully capture the likeness and key features of the original subject. The final image must be high-quality, creative, and highly shareable on social media.`;
    },
  },
  {
    id: 'campaign',
    nameKey: 'category_campaign_name',
    descriptionKey: 'category_campaign_desc',
    icon: <CampaignIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_productImage_label', type: 'file', required: true, infoKey: 'field_productImage_info_campaign' },
      { name: 'stagingConcept', labelKey: 'field_stagingConcept_label', type: 'select', required: true, optionKeys: ['option_staging_showcase', 'option_staging_grid', 'option_staging_package', 'option_staging_abstract', 'option_staging_cinematic', 'option_custom'] },
      // Showcase Fields
      { name: 'locationDescription', labelKey: 'field_locationDescription_label', type: 'textarea', required: true, placeholderKey: 'field_locationDescription_placeholder', condition: { field: 'stagingConcept', value: 'option_staging_showcase' } },
      { name: 'merchandiseList', labelKey: 'field_merchandiseList_label', type: 'textarea', required: true, placeholderKey: 'field_merchandiseList_placeholder', condition: { field: 'stagingConcept', value: 'option_staging_showcase' } },
      { name: 'displayInstructions', labelKey: 'field_displayInstructions_label', type: 'textarea', required: true, placeholderKey: 'field_displayInstructions_placeholder', condition: { field: 'stagingConcept', value: 'option_staging_showcase' } },
      // Grid Fields
      { name: 'gridDescription', labelKey: 'field_gridDescription_label', type: 'textarea', required: true, placeholderKey: 'field_gridDescription_placeholder', infoKey: 'field_gridDescription_info', condition: { field: 'stagingConcept', value: 'option_staging_grid' } },
      // Packaging Fields
      { name: 'environmentDescription', labelKey: 'field_environmentDescription_label', type: 'textarea', required: true, placeholderKey: 'field_environmentDescription_placeholder', condition: { field: 'stagingConcept', value: 'option_staging_package' } },
      { name: 'packagingDescription', labelKey: 'field_packagingDescription_label', type: 'textarea', required: true, placeholderKey: 'field_packagingDescription_placeholder', condition: { field: 'stagingConcept', value: 'option_staging_package' } },
      // Abstract Fields
      { name: 'compositionDetails', labelKey: 'field_compositionDetails_label', type: 'textarea', required: true, placeholderKey: 'field_compositionDetails_placeholder', condition: { field: 'stagingConcept', value: 'option_staging_abstract' } },
      // Cinematic Fields
      { name: 'sceneDescription', labelKey: 'field_sceneDescription_label', type: 'textarea', required: true, placeholderKey: 'field_sceneDescription_placeholder', condition: { field: 'stagingConcept', value: 'option_staging_cinematic' } },
      // Custom Field
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', required: true, placeholderKey: 'field_customConcept_placeholder_campaign', condition: { field: 'stagingConcept', value: 'option_custom' } },
      // General Fields
      { name: 'overallTone', labelKey: 'field_overallTone_label', type: 'text', required: false, placeholderKey: 'field_overallTone_placeholder' },
      { name: 'resolutionStyle', labelKey: 'field_resolutionStyle_label', type: 'text', required: false, placeholderKey: 'field_resolutionStyle_placeholder' },
      { name: 'consistencyReferenceImage', labelKey: 'field_consistencyReferenceImage_label', type: 'file', required: false, infoKey: 'field_consistencyReferenceImage_info' },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
      let structuredPrompt = '';
      switch (data.stagingConcept) {
        case 'option_staging_showcase':
          structuredPrompt = `
**Primary Task:** Create a photorealistic merchandise showcase.

**Location Environment:**
${data.locationDescription}

**Merchandise Lineup to Feature (based on the uploaded image):**
${data.merchandiseList}

**Display & Arrangement Instructions:**
${data.displayInstructions}
          `;
          break;
        case 'option_staging_grid':
          structuredPrompt = `
**Primary Task:** Create a multi-panel grid layout image.

**Grid Panel Descriptions:**
${data.gridDescription}
          `;
          break;
        case 'option_staging_package':
          structuredPrompt = `
**Primary Task:** Create a product and packaging mockup scene.

**Environment Description:**
${data.environmentDescription}

**Packaging Design Description:**
${data.packagingDescription}
          `;
          break;
        case 'option_staging_abstract':
          structuredPrompt = `
**Primary Task:** Create an artistic, abstract composition featuring the product.

**Composition Details:**
${data.compositionDetails}
          `;
          break;
        case 'option_staging_cinematic':
          structuredPrompt = `
**Primary Task:** Create a photo-realistic, cinematic scene.

**Detailed Scene Description:**
${data.sceneDescription}
          `;
          break;
        case 'option_custom':
          structuredPrompt = `
**Primary Task:** Fulfill a custom creative request.

**User's Detailed Instructions:**
${data.customConcept}
          `;
          break;
      }

      return `You are an expert AI art director. Your task is to generate a complex, high-quality image based on the following structured brief.
      
      --- EXAMPLE START ---
      - User Uploads: Image of a sleek chrome samurai helmet.
      - User Selects: 'Grid Layout'
      - User Describes Grid: '8-panel grid. Panel 1) the helmet. Panel 2) a neon katana. Panel 3) black armored chestplate...'
      - User Specifies Tone: 'Professional product photography style'
      - AI Thought Process: The user wants a clean 8-panel product catalog. I will render each item specified by the user on a pure white background as requested, ensuring consistent lighting across all panels. For the non-product panels like the Tokyo street, I will generate a matching futuristic, neon-lit image. The final composition must be a sharp, professional grid.
      --- EXAMPLE END ---

      Now, execute the user's actual request.
      ${structuredPrompt}

      **Overall Tone & Atmosphere:** ${data.overallTone || 'As described in the detailed sections.'}

      **Resolution & Style:** ${data.resolutionStyle || '4K, Photorealistic, Professional product photography style.'}

      ${getConsistencyReferenceInstruction(data)}

      **CRITICAL INSTRUCTIONS:**
      1.  The uploaded image is the primary subject. Re-imagine it within the context of the detailed brief.
      2.  Adhere strictly to all parts of the structured prompt.
      3.  The final image must be a high-resolution, professionally composed scene that looks like it was created for a major brand campaign.
`;
    },
  },
  {
    id: 'cafe',
    nameKey: 'category_cafe_name',
    descriptionKey: 'category_cafe_desc',
    icon: <CafeIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_productImage_label', type: 'file', required: true, infoKey: 'field_productImage_info_menu' },
      { name: 'productName', labelKey: 'field_productName_label', type: 'text', placeholderKey: 'field_productName_placeholder_menu', required: true },
      { name: 'cameraAngle', labelKey: 'field_cameraAngle_label', type: 'select', optionKeys: ['option_camera_default', 'option_camera_top', 'option_camera_45', 'option_camera_closeup'], required: true, infoKey: 'field_cameraAngle_info' },
      { name: 'useCase', labelKey: 'field_useCase_label', type: 'select', optionKeys: ['option_usecase_app', 'option_usecase_print', 'option_usecase_kiosk', 'option_usecase_sns'], required: true },
      { name: 'conceptPreset', labelKey: 'field_conceptPreset_label', type: 'select', optionKeys: ['option_concept_warm', 'option_concept_modern', 'option_concept_isolated', 'option_concept_lifestyle', 'option_concept_ad_campaign', 'option_concept_cafe_dark_moody', 'option_concept_cafe_flat_lay', 'option_concept_cafe_vintage_retro', 'option_custom'], required: true, infoKey: 'field_conceptPreset_info' },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_cafe', required: true, condition: { field: 'conceptPreset', value: 'option_custom' }},
      { name: 'garnish', labelKey: 'field_garnish_label', type: 'text', placeholderKey: 'field_garnish_placeholder', required: false, infoKey: 'field_garnish_info'},
      { name: 'consistencyReferenceImage', labelKey: 'field_consistencyReferenceImage_label', type: 'file', required: false, infoKey: 'field_consistencyReferenceImage_info' },
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_cafe', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
      const conceptInstructions = getConceptInstructions(data, {
        'option_concept_warm': 'Create a cozy and inviting atmosphere. Use soft, natural lighting, possibly with a warm wooden or rustic background, like sunlight filtering through a window.',
        'option_concept_modern': 'Create a clean, minimalist scene. Use bright, even studio lighting with a simple background (like light gray, white, or a solid color). The composition should be neat and organized.',
        'option_concept_isolated': 'Isolate the food item on a pure white background. Enhance the food\'s texture and details with professional lighting, adding a subtle, realistic shadow.',
        'option_concept_lifestyle': 'Create a dynamic, "in-the-moment" scene. Add elements like a hand garnishing the dish, steam rising from the food, or ingredients scattered artistically around the plate.',
        'option_concept_ad_campaign': 'Produce a high-end, advertising-style food photograph. Use dramatic lighting and selective soft focus to draw attention. The composition should be clean with negative space for text. The food must look exceptionally appetizing, perhaps with motion elements like a splash of sauce frozen in time.',
        'option_concept_cafe_dark_moody': 'Create a sophisticated, "dark & moody" photograph. Use dramatic, low-key lighting with deep shadows to create a high-contrast, atmospheric image. Backgrounds should be dark, like slate or dark wood.',
        'option_concept_cafe_flat_lay': 'Create an Instagram-style top-down flat lay. The composition should be neatly arranged with complementary props like cutlery, napkins, and small decorative items on a clean surface.',
        'option_concept_cafe_vintage_retro': 'Create a nostalgic scene reminiscent of a vintage diner or old-fashioned cafe. Use retro color grading, and include props like checkered tablecloths or vintage-style mugs.'
      });
      const garnishInstruction = data.garnish ? `A specific garnish has been requested: "${data.garnish}". Please add this to the dish in a subtle and realistic way.` : '';
      return `You are an expert food photography art director. Your task is to transform an uploaded photo into a professional, advertising-style shot.
      
      --- EXAMPLE START ---
      - User Uploads: Photo of a slice of cake on a plate.
      - User provides Name: "Strawberry Cream Cake"
      - User selects Concept: "Warm & Emotional (Natural Light)"
      - AI Thought Process: The goal is a cozy, inviting photo. I will place the cake on a rustic wooden table. I'll add soft, natural sunlight filtering from a side window to create warm highlights and gentle shadows. Props could include a cup of tea and a book to enhance the cozy atmosphere. The final image should feel warm and comforting.
      --- EXAMPLE END ---
      
      Now, execute the user's actual request.
      **Task:** Create a professional food photograph of "${data.productName}" for the use case: "${data.useCase}". 
      **Concept:** "${data.conceptPreset}".
      **Camera Angle:** "${data.cameraAngle}".
      ${conceptInstructions}
      ${garnishInstruction}
      ${getConsistencyReferenceInstruction(data)}
      **Additional requests:** "${data.customRequest || 'None'}".
      **CRITICAL INSTRUCTION:** Do NOT change the food item from the uploaded image. Your task is to recompose the entire scene (background, lighting, props, angle) around it to perfectly match the requested concept. The final output must be a hyper-realistic, high-resolution photo manipulation. It needs to be a magazine-quality shot with crisp details, professional lighting, and a compelling composition.`;
    },
  },
   {
    id: 'bakery',
    nameKey: 'category_bakery_name',
    descriptionKey: 'category_bakery_desc',
    icon: <BakeryIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_productImage_label', type: 'file', required: true, infoKey: 'field_productImage_info_bakery' },
      { name: 'productName', labelKey: 'field_productName_label', type: 'text', placeholderKey: 'field_productName_placeholder_bakery', required: true },
      { name: 'conceptPreset', labelKey: 'field_conceptPreset_label', type: 'select', optionKeys: ['option_concept_bakery_home', 'option_concept_bakery_patisserie', 'option_concept_bakery_clean', 'option_concept_bakery_closeup', 'option_concept_ad_campaign', 'option_concept_bakery_rustic', 'option_concept_bakery_seasonal', 'option_custom'], required: true },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_bakery', required: true, condition: { field: 'conceptPreset', value: 'option_custom' }},
      { name: 'plating', labelKey: 'field_plating_label', type: 'select', optionKeys: ['option_plating_simple', 'option_plating_vintage', 'option_plating_wood', 'option_plating_beverage', 'option_plating_none', 'option_custom'], required: true },
      { name: 'customPlating', labelKey: 'field_customPlating_label', type: 'textarea', placeholderKey: 'field_customPlating_placeholder', required: true, condition: { field: 'plating', value: 'option_custom' }},
      { name: 'garnish', labelKey: 'field_garnish_label', type: 'text', placeholderKey: 'field_garnish_placeholder', required: false, infoKey: 'field_garnish_info'},
      { name: 'consistencyReferenceImage', labelKey: 'field_consistencyReferenceImage_label', type: 'file', required: false, infoKey: 'field_consistencyReferenceImage_info' },
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_bakery', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
      const conceptInstructions = getConceptInstructions(data, {
        'option_concept_bakery_home': 'Create a cozy, homey scene with soft, natural sunlight filtering through a window. Use props like a coffee mug, a book, or simple home decor.',
        'option_concept_bakery_patisserie': 'Stage the dessert in an elegant, patisserie-like setting. Use props like marble tabletops, vintage cutlery, or ornate backgrounds.',
        'option_concept_bakery_clean': 'Isolate the product on a clean, minimal, or solid-color background with bright studio lighting to emphasize its shape and texture.',
        'option_concept_bakery_closeup': 'Create a macro shot focusing on the texture, crumb, or filling of the bakery item. If it\'s sliced, showcase the cross-section beautifully.',
        'option_concept_ad_campaign': 'Produce a sophisticated advertising shot. Use dramatic lighting and a shallow depth of field to make the product the hero. The composition should be artistic, with elements like a dusting of flour or a drizzle of chocolate frozen in motion.',
        'option_concept_bakery_rustic': 'Create a rustic, artisanal feel. Use props like wooden boards, linen napkins, and scattered whole grains or flour. The lighting should be natural and slightly moody.',
        'option_concept_bakery_seasonal': 'Incorporate seasonal elements. For example, add cinnamon sticks and autumn leaves for fall, or fresh berries and flowers for spring.'
      });
      const garnishInstruction = data.garnish ? `A specific garnish has been requested: "${data.garnish}". Please add this to the dish in a subtle and realistic way.` : '';
      const platingInstruction = data.plating === 'option_custom' ? data.customPlating : data.plating;
      return `You are an expert bakery photography art director.
      
      --- EXAMPLE START ---
      - User Uploads: Photo of a croissant.
      - User provides Name: "Artisanal Croissant"
      - User selects Concept: "Rustic/Artisanal"
      - User selects Plating: "Wooden board/tray"
      - AI Thought Process: The goal is a rustic, artisanal feel. I will place the croissant on a dark wooden board. The background will be a bakery setting with a dusting of flour on the surface. Lighting should be natural and slightly moody to emphasize the flaky texture. I'll compose the shot with a shallow depth of field.
      --- EXAMPLE END ---
      
      Now, execute the user's actual request.
      **Task:** Transform the uploaded photo of a bakery item, "${data.productName}", into a mouth-watering commercial shot.
      **Core Concept:** "${data.conceptPreset}".
      ${conceptInstructions}
      **Plating and Props:** "${platingInstruction}".
      ${garnishInstruction}
      ${getConsistencyReferenceInstruction(data)}
      **Additional requests:** "${data.customRequest || 'None'}".
      **CRITICAL INSTRUCTION:** Do not alter the bakery item itself. Your job is to rebuild the entire scene around it to match the concept. The final image must be a hyper-realistic, high-resolution photo manipulation that makes the viewer want to taste it immediately.`;
    }
  },
  {
    id: 'fashion',
    nameKey: 'category_fashion_name',
    descriptionKey: 'category_fashion_desc',
    icon: <FashionIcon />,
    fields: [
        { name: 'productImage', labelKey: 'field_productImage_label', type: 'file', required: true, infoKey: 'field_productImage_info_fashion' },
        { name: 'modelImage', labelKey: 'field_modelImage_label', type: 'file', required: false, infoKey: 'field_modelImage_info' },
        { name: 'productName', labelKey: 'field_productName_label', type: 'text', placeholderKey: 'field_productName_placeholder_fashion', required: true },
        { name: 'shotType', labelKey: 'field_shotType_label', type: 'select', optionKeys: ['option_shot_full', 'option_shot_upper', 'option_shot_closeup'], required: true, infoKey: 'field_shotType_info' },
        { name: 'modelDetails', labelKey: 'field_modelDetails_label', type: 'textarea', placeholderKey: 'field_modelDetails_placeholder', required: false, condition: { field: 'modelImage', value: '' }},
        { name: 'conceptPreset', labelKey: 'field_conceptPreset_label', type: 'select', optionKeys: ['option_concept_fashion_studio', 'option_concept_fashion_outdoor', 'option_concept_fashion_magazine', 'option_concept_fashion_vintage', 'option_concept_fashion_street', 'option_concept_fashion_dark_academia', 'option_custom'], required: true },
        { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_fashion', required: true, condition: { field: 'conceptPreset', value: 'option_custom' }},
        { name: 'backgroundReferenceImage', labelKey: 'field_backgroundReferenceImage_label', type: 'file', required: false, infoKey: 'field_backgroundReferenceImage_info' },
        { name: 'consistencyReferenceImage', labelKey: 'field_consistencyReferenceImage_label', type: 'file', required: false, infoKey: 'field_consistencyReferenceImage_info' },
        { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_fashion', required: false },
        { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        const modelInfo = data.modelImage ? getModelReferenceInstruction(data) : `A model is required. Generate a realistic model that fits this description: ${data.modelDetails || 'A fitting model for the product'}. Then place the product onto that model.`;
        const conceptInstructions = getConceptInstructions(data, {
            'option_concept_fashion_studio': 'Create a professional studio shot. The background should be a seamless white, light gray, or solid color with clean, professional lighting that defines the product\'s form.',
            'option_concept_fashion_outdoor': 'Create a natural, outdoor lifestyle shot. The setting can be urban or natural. Use beautiful natural light (e.g., golden hour, soft overcast) for a realistic and emotional feel.',
            'option_concept_fashion_magazine': 'Create a dramatic and sophisticated editorial fashion photograph, suitable for a magazine cover or pictorial. Use bold, artistic lighting (e.g., hard light, colored gels), an unconventional composition, and a high-fashion aesthetic.',
            'option_concept_fashion_vintage': 'Create a shot with a nostalgic feel. Apply a film-like color grading (e.g., muted tones, warm highlights) and add subtle grain and texture.',
            'option_concept_fashion_street': 'Create a dynamic street style photograph. The background should be a candid urban environment (e.g., crosswalk, cafe exterior). The model should have a natural, in-motion pose. Add subtle motion blur to the background.',
            'option_concept_fashion_dark_academia': 'Create a moody and intellectual "dark academia" scene. The setting should be a library, university campus, or museum. Use warm, low-key lighting and a color palette of browns, grays, and deep reds.'
        });
        return `You are a high-fashion photography art director.
        
        --- EXAMPLE START ---
        - User Uploads: Photo of a linen shirt.
        - User provides Name: "Oversized Linen Shirt"
        - User selects Concept: "Emotional Outdoor Snap"
        - User specifies Model: "20s female, Asian, short hair, natural standing pose"
        - AI Thought Process: The goal is an emotional, natural outdoor shot. I'll generate a model matching the description and place the linen shirt on her. The setting will be a beautiful, slightly rustic outdoor location, perhaps a field during golden hour. The lighting will be soft and warm to create a gentle, emotional mood. The final image should feel like a candid shot from a high-end brand's lookbook.
        --- EXAMPLE END ---

        Now, execute the user's actual request.
        **Task:** Create a high-end, editorial fashion photograph based on the uploaded product photo of "${data.productName}".
        **Shot Type:** "${data.shotType}".
        ${modelInfo}
        **Overall Concept:** "${data.conceptPreset}".
        ${conceptInstructions}
        ${getBackgroundReferenceInstruction(data)}
        ${getConsistencyReferenceInstruction(data)}
        **Additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** The result must be a hyper-realistic, high-resolution photo manipulation. It needs professional lighting, sophisticated color grading, and a dynamic composition, suitable for a luxury brand campaign.`;
    }
  },
  {
    id: 'beauty',
    nameKey: 'category_beauty_name',
    descriptionKey: 'category_beauty_desc',
    icon: <BeautyIcon />,
    fields: [
        { name: 'productImage', labelKey: 'field_productImage_label', type: 'file', required: true, infoKey: 'field_productImage_info_beauty' },
        { name: 'modelImage', labelKey: 'field_modelImage_label', type: 'file', required: false, infoKey: 'field_modelImage_info_beauty' },
        { name: 'productName', labelKey: 'field_productName_label', type: 'text', placeholderKey: 'field_productName_placeholder_beauty', required: true },
        { name: 'photoType', labelKey: 'field_photoType_label', type: 'select', optionKeys: ['option_phototype_beauty_product', 'option_phototype_beauty_texture', 'option_phototype_beauty_concept', 'option_phototype_beauty_model'], required: true },
        { name: 'conceptPreset', labelKey: 'field_conceptPreset_label', type: 'select', optionKeys: ['option_concept_beauty_minimal', 'option_concept_beauty_natural', 'option_concept_beauty_moisture', 'option_concept_beauty_ad', 'option_concept_beauty_swatch', 'option_concept_beauty_dramatic', 'option_custom'], required: true },
        { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_beauty', required: true, condition: { field: 'conceptPreset', value: 'option_custom' }},
        { name: 'backgroundReferenceImage', labelKey: 'field_backgroundReferenceImage_label', type: 'file', required: false, infoKey: 'field_backgroundReferenceImage_info' },
        { name: 'consistencyReferenceImage', labelKey: 'field_consistencyReferenceImage_label', type: 'file', required: false, infoKey: 'field_consistencyReferenceImage_info' },
        { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_beauty', required: false },
        { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        const modelInfo = data.modelImage && data.photoType === 'option_phototype_beauty_model' ? getModelReferenceInstruction(data).replace('place the uploaded product onto the person', 'show the model holding or using the uploaded product') : '';
        const conceptInstructions = getConceptInstructions(data, {
            'option_concept_beauty_minimal': 'Place the product on a clean, solid background (white, pastel, or a geometric podium). Use soft, diffused lighting to minimize harsh shadows.',
            'option_concept_beauty_natural': 'Surround the product with its key natural ingredients (e.g., green tea leaves, flowers, fruits). The setting should feel organic and fresh.',
            'option_concept_beauty_moisture': 'Place the product on or near a water surface. Add realistic water splashes, droplets, or ripples to convey hydration and freshness.',
            'option_concept_beauty_ad': 'Create a luxury magazine ad. Use sophisticated textures like silk, satin, or marble as a background. The lighting should be elegant, creating a high-end feel with clean negative space for copy.',
            'option_concept_beauty_swatch': 'Create a beautiful product swatch on a surface or model\'s skin. The texture of the swatch (e.g., creamy, powdery, glossy) must be clearly visible and appealing.',
            'option_concept_beauty_dramatic': 'Use hard light and deep shadows to create a dramatic, artistic shot. This is great for bold colors and unconventional compositions.'
        });
        return `You are a luxury cosmetics advertising director.
        
        --- EXAMPLE START ---
        - User Uploads: Photo of a serum bottle.
        - User provides Name: "Moisture Boosting Serum"
        - User selects Concept: "Moisture/Water Focus"
        - AI Thought Process: The key concept is "moisture". I will place the serum bottle on a clean, wet surface, perhaps glass or marble. I'll add photorealistic water splashes frozen in motion around the bottle and fine water droplets on the bottle itself. The lighting should be bright and clean, like in a lab or spa, to emphasize freshness and hydration.
        --- EXAMPLE END ---
        
        Now, execute the user's actual request.
        **Task:** Create a luxury beauty product advertisement by transforming the uploaded photo of "${data.productName}".
        **Shot Focus:** "${data.photoType}".
        ${modelInfo}
        **Core Concept:** "${data.conceptPreset}".
        ${conceptInstructions}
        ${getBackgroundReferenceInstruction(data)}
        ${getConsistencyReferenceInstruction(data)}
        **Additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** The product in the image must not be altered, but the scene around it should be entirely rebuilt. The final image needs to be a high-resolution, magazine-quality photo manipulation with crisp macro details.`;
    }
  },
   {
    id: 'jewelry',
    nameKey: 'category_jewelry_name',
    descriptionKey: 'category_jewelry_desc',
    icon: <JewelryIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_productImage_label', type: 'file', required: true, infoKey: 'field_productImage_info_jewelry' },
      { name: 'modelImage', labelKey: 'field_modelImage_label', type: 'file', required: false, infoKey: 'field_modelImage_info_jewelry_tryon' },
      { name: 'productName', labelKey: 'field_productName_label', type: 'text', placeholderKey: 'field_productName_placeholder_jewelry', required: true },
      { name: 'photoType', labelKey: 'field_photoType_label', type: 'select', optionKeys: ['option_phototype_jewelry_product', 'option_phototype_jewelry_model'], required: true },
      { name: 'modelDetails', labelKey: 'field_modelDetails_label', type: 'textarea', placeholderKey: 'field_modelDetails_placeholder_jewelry', required: false, condition: { field: 'photoType', value: 'option_phototype_jewelry_model' }},
      { name: 'conceptPreset', labelKey: 'field_conceptPreset_label', type: 'select', optionKeys: ['option_concept_jewelry_luxury', 'option_concept_jewelry_minimal', 'option_concept_jewelry_antique', 'option_concept_jewelry_natural', 'option_concept_jewelry_lifestyle', 'option_concept_jewelry_surreal', 'option_custom'], required: true },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_jewelry', required: true, condition: { field: 'conceptPreset', value: 'option_custom' }},
      { name: 'backgroundReferenceImage', labelKey: 'field_backgroundReferenceImage_label', type: 'file', required: false, infoKey: 'field_backgroundReferenceImage_info' },
      { name: 'consistencyReferenceImage', labelKey: 'field_consistencyReferenceImage_label', type: 'file', required: false, infoKey: 'field_consistencyReferenceImage_info' },
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_jewelry', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
      let modelInfo = '';
      if (data.modelImage) {
          modelInfo = "CRITICAL: A model part photo (e.g., hand, neck, ear) has been uploaded for a VIRTUAL TRY-ON. Realistically and seamlessly place the uploaded jewelry onto this body part. Match the lighting, angle, and skin tone perfectly. This is the top priority."
      } else if (data.photoType === 'option_phototype_jewelry_model') {
          modelInfo = `The shot should feature a generated model with the following characteristics: ${data.modelDetails || 'An appropriate model'}.`
      }
      
      const conceptInstructions = getConceptInstructions(data, {
          'option_concept_jewelry_luxury': 'Use luxurious backgrounds like velvet, silk, or dark marble. Lighting should be dramatic, creating sharp, brilliant highlights on the jewelry\'s facets and metal.',
          'option_concept_jewelry_minimal': 'Place the jewelry on a clean, geometric, or solid-colored surface with soft, even studio lighting that emphasizes its form and finish.',
          'option_concept_jewelry_antique': 'Use aged props like old books, lace, or wooden chests with warm, nostalgic lighting to create a timeless, heirloom quality.',
          'option_concept_jewelry_natural': 'Incorporate natural elements like stone, leaves, flowers, or sand with soft, natural sunlight to give it an organic, bohemian feel.',
          'option_concept_jewelry_lifestyle': 'Show the jewelry being worn in a candid lifestyle context, with the model in a natural setting and not looking directly at the camera. The focus is on the story and mood.',
          'option_concept_jewelry_surreal': 'Create a surreal, artistic scene where the jewelry is floating in mid-air or interacting with impossible elements like clouds or water splashes frozen in time.'
      });

      return `You are a professional jewelry photographer.
      
      --- EXAMPLE START ---
      - User Uploads: Photo of a diamond necklace.
      - User Uploads Model Photo: Close-up of a woman's neck and collarbone.
      - AI Thought Process: This is a virtual try-on. The highest priority is realism. I must perfectly overlay the necklace onto the model's skin, paying extreme attention to the angle of her neck, the lighting in the original photo, and how the necklace would naturally cast shadows and catch light. The result must be completely believable.
      --- EXAMPLE END ---
      
      Now, execute the user's actual request.
      **Task:** Transform the uploaded photo of a jewelry piece, "${data.productName}", into a high-end commercial image.
      ${modelInfo}
      If no model is involved, the **Photo Type** is: "${data.photoType}".
      The main **Concept** is "${data.conceptPreset}".
      ${conceptInstructions}
      ${getBackgroundReferenceInstruction(data)}
      ${getConsistencyReferenceInstruction(data)}
      **Additional requests:** "${data.customRequest || 'None'}".
      **CRITICAL INSTRUCTION:** Preserve the original jewelry piece perfectly while recreating the entire scene. The final image must be a hyper-realistic, high-resolution macro photograph with exquisite detail and professional lighting.`;
    }
  },
    {
    id: 'handmade',
    nameKey: 'category_handmade_name',
    descriptionKey: 'category_handmade_desc',
    icon: <HandmadeIcon />,
    fields: [
        { name: 'productImage', labelKey: 'field_productImage_label', type: 'file', required: true, infoKey: 'field_productImage_info_handmade' },
        { name: 'productName', labelKey: 'field_productName_label', type: 'text', placeholderKey: 'field_productName_placeholder_handmade', required: true },
        { name: 'conceptPreset', labelKey: 'field_style_label', type: 'select', optionKeys: ['option_style_handmade_natural', 'option_style_handmade_elegant', 'option_style_handmade_cute', 'option_style_handmade_modern', 'option_style_handmade_flatlay', 'option_custom'], required: true },
        { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_handmade', required: true, condition: { field: 'conceptPreset', value: 'option_custom' }},
        { name: 'background', labelKey: 'field_backgroundProps_label', type: 'select', optionKeys: ['option_background_linen', 'option_background_books', 'option_background_nature', 'option_background_solid', 'option_custom'], required: true },
        { name: 'customBackground', labelKey: 'field_customBackground_label', type: 'textarea', placeholderKey: 'field_customBackground_placeholder', required: true, condition: { field: 'background', value: 'option_custom' }},
        { name: 'lighting', labelKey: 'field_lighting_label', type: 'select', optionKeys: ['option_lighting_soft', 'option_lighting_warm', 'option_lighting_studio', 'option_custom'], required: true },
        { name: 'customLighting', labelKey: 'field_customLighting_label', type: 'textarea', placeholderKey: 'field_customLighting_placeholder', required: true, condition: { field: 'lighting', value: 'option_custom' }},
        { name: 'consistencyReferenceImage', labelKey: 'field_consistencyReferenceImage_label', type: 'file', required: false, infoKey: 'field_consistencyReferenceImage_info' },
        { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_handmade', required: false },
        { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        const backgroundInstruction = data.background === 'option_custom' ? data.customBackground : data.background;
        const lightingInstruction = data.lighting === 'option_custom' ? data.customLighting : data.lighting;
        const conceptInstructions = getConceptInstructions(data, {
            'option_style_handmade_natural': 'Emphasize a natural, rustic aesthetic.',
            'option_style_handmade_elegant': 'Create a sophisticated and elegant presentation.',
            'option_style_handmade_cute': 'Design a cute, playful, and charming scene.',
            'option_style_handmade_modern': 'Focus on a clean, minimalist, and modern look.',
            'option_style_handmade_flatlay': 'Arrange the item in a beautiful top-down flat lay with related tools or materials (e.g., yarn for knitting, beads for jewelry).',
        });

        return `You are an art director for a high-end craft marketplace.
        
        --- EXAMPLE START ---
        - User Uploads: Photo of a handmade ceramic mug.
        - User provides Name: "Earthy Ceramic Mug"
        - User selects Style: "Natural & Rustic"
        - User selects Background: "Linen/Cotton Fabric"
        - User selects Lighting: "Soft Natural Light"
        - AI Thought Process: The aesthetic is natural and rustic. I'll place the mug on a textured, off-white linen cloth. The lighting will be soft, coming from a window, to create a gentle and calm mood. I might add a small, dried flower as a prop to enhance the handmade feel. The goal is a beautiful, serene photo that highlights the craft.
        --- EXAMPLE END ---
        
        Now, execute the user's actual request.
        **Task:** Transform the uploaded photo of a handmade item, "${data.productName}", into a beautiful, professional product shot.
        **Style Concept:** "${data.conceptPreset}". ${conceptInstructions}
        **Background & Props:** "${backgroundInstruction}".
        **Lighting:** "${lightingInstruction}".
        ${getConsistencyReferenceInstruction(data)}
        **Goal:** Highlight the intricate details and handmade quality of the piece. The composition should be artistic, with a shallow depth of field to draw focus to the product.
        **Additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** Do not alter the handmade item itself. Recreate the background and lighting to create the desired mood. The final photo must be a high-resolution, aesthetically pleasing image perfect for an online craft marketplace like Etsy.`
    }
  },
  {
    id: 'interior',
    nameKey: 'category_interior_name',
    descriptionKey: 'category_interior_desc',
    icon: <InteriorIcon />,
    fields: [
        { name: 'productImage', labelKey: 'field_productImage_label', type: 'file', required: true, infoKey: 'field_productImage_info_interior' },
        { name: 'spaceType', labelKey: 'field_spaceType_label', type: 'text', placeholderKey: 'field_spaceType_placeholder', required: true },
        { name: 'conceptPreset', labelKey: 'field_retouchConcept_label', type: 'select', optionKeys: ['option_concept_interior_bright', 'option_concept_interior_cozy', 'option_concept_interior_modern', 'option_concept_interior_staging', 'option_concept_interior_style_transfer', 'option_concept_interior_cleanup', 'option_custom'], required: true },
        { name: 'backgroundReferenceImage', labelKey: 'field_styleReferenceImage_label', type: 'file', required: true, infoKey: 'field_styleReferenceImage_info', condition: { field: 'conceptPreset', value: 'option_concept_interior_style_transfer' }},
        { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_interior', required: true, condition: { field: 'conceptPreset', value: 'option_custom' }},
        { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_interior', required: false },
        { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        let conceptInstructions = getConceptInstructions(data, {
            'option_concept_interior_bright': 'Adjust lighting and color to make the space feel brighter and more spacious. Clean up minor clutter and enhance the view from the windows for a clean, airy look.',
            'option_concept_interior_cozy': 'Add warm lighting, soft textures (like plush rugs, blankets on a sofa), and lifestyle elements to create a cozy, "lived-in" feeling.',
            'option_concept_interior_modern': 'Use a cooler color palette, sleek furniture, and modern decor elements. Emphasize clean lines and a minimalist aesthetic.',
            'option_concept_interior_staging': 'This is a virtual staging request. Rearrange or replace furniture and decor to create a more appealing, modern, and universally attractive layout. The goal is to maximize the space\'s perceived value.',
            'option_concept_interior_cleanup': 'This is a decluttering request. Remove all personal items, unnecessary furniture, and clutter from the photo, leaving only the essential architectural features and fixtures. The goal is a clean, empty space.',
        });
         if (data.conceptPreset === 'option_concept_interior_style_transfer') {
            conceptInstructions = `This is a VIRTUAL RENOVATION / STYLE TRANSFER request. The primary uploaded photo shows the user's current space. A second photo has been uploaded as a style reference. Your task is to completely re-imagine the user's space in the style of the reference photo. You MUST maintain the original architectural layout (walls, windows, doors, ceiling height) of the user's space, but replace all furniture, lighting, flooring, wall colors, and decor to match the aesthetic, mood, and color palette of the reference image. The result should be a realistic "after" photo of the renovation.`;
        }
        return `You are a professional architectural and interior photographer/retoucher.
        
        --- EXAMPLE START ---
        - User Uploads: Photo of their living room.
        - User Uploads Style Reference: Photo of a minimalist Scandinavian-style living room.
        - User selects Concept: "AI Virtual Remodel (Style Transfer)"
        - AI Thought Process: The core task is style transfer. I must first analyze the user's room layout (walls, windows, etc.) and the target style (light wood, neutral colors, minimalist furniture, green plants). I will keep the user's room structure but replace everything inside—flooring, wall color, furniture, decor—with items that match the Scandinavian aesthetic of the reference photo. The final image must look like a realistic photograph of the renovated space.
        --- EXAMPLE END ---
        
        Now, execute the user's actual request.
        **Task:** Enhance and transform the uploaded interior/real estate photo of a "${data.spaceType}".
        **Enhancement Concept:** "${data.conceptPreset}".
        ${conceptInstructions}
        **Specific additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** The final output must be a highly realistic, magazine-quality photo that looks like it was taken by a professional architectural photographer.`;
    }
  },
   {
    id: 'pet',
    nameKey: 'category_pet_name',
    descriptionKey: 'category_pet_desc',
    icon: <PetIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_petImage_label', type: 'file', required: true, infoKey: 'field_petImage_info' },
      { name: 'subjectName', labelKey: 'field_subject_name_label', type: 'text', placeholderKey: 'field_subject_name_placeholder_pet', required: true },
      { name: 'conceptPreset', labelKey: 'field_conceptPreset_label', type: 'select', optionKeys: ['option_concept_pet_home', 'option_concept_pet_grass', 'option_concept_pet_studio', 'option_concept_pet_fun', 'option_concept_pet_portrait', 'option_custom'], required: true },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_pet', required: true, condition: { field: 'conceptPreset', value: 'option_custom' }},
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_pet', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        const conceptInstructions = getConceptInstructions(data, {
            'option_concept_pet_home': 'Place the pet in a cozy, well-lit home environment, perhaps sleeping on soft blankets with warm light filtering in.',
            'option_concept_pet_grass': 'Create a vibrant outdoor scene in a sunny park or backyard. Use a shallow depth of field to beautifully blur the background and make the pet stand out.',
            'option_concept_pet_studio': 'Create a professional studio portrait. Use a clean, seamless background (e.g., solid color) with bright, professional lighting that highlights the pet\'s fur texture and features.',
            'option_concept_pet_fun': 'Based on the custom request, create a fun and creative composite image (e.g., pet as a superhero, astronaut, etc.). Make it whimsical and imaginative.',
            'option_concept_pet_portrait': 'Create a classic, painterly-style pet portrait. Use soft, directional lighting and a textured background to mimic a fine art oil painting.'
        });
        return `You are a professional pet photographer.
        
        --- EXAMPLE START ---
        - User Uploads: Photo of their dog in their living room.
        - User provides Name: "My dog Choco"
        - User selects Concept: "On a green lawn"
        - AI Thought Process: The task is to place the dog, Choco, in a new scene. I will carefully isolate the dog from the original photo. Then, I will create a new, vibrant background of a sunny park with green grass. I will place Choco in this new scene, ensuring the lighting on him matches the sunny outdoor environment. I'll use a shallow depth of field to blur the background slightly, making Choco the main focus.
        --- EXAMPLE END ---
        
        Now, execute the user's actual request.
        **Task:** Create a professional pet photograph of "${data.subjectName}" by transforming the uploaded image.
        **Overall Concept:** "${data.conceptPreset}".
        ${conceptInstructions}
        **Additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** Ensure the pet from the uploaded image is accurately and realistically represented. The final image should be a heartwarming, high-resolution portrait with professional-grade lighting and composition.`;
    }
  },
  {
    id: 'profile',
    nameKey: 'category_profile_name',
    descriptionKey: 'category_profile_desc',
    icon: <ProfileIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_personImage_label', type: 'file', required: true, infoKey: 'field_personImage_info' },
      { name: 'photoType', labelKey: 'field_photoType_label_profile', type: 'select', optionKeys: ['option_phototype_profile_personal', 'option_phototype_profile_resume', 'option_phototype_profile_id', 'option_phototype_profile_professional', 'option_phototype_profile_actor'], required: true },
      { name: 'lighting', labelKey: 'field_lightingStyle_label', type: 'select', optionKeys: ['option_lighting_studio', 'option_lighting_natural', 'option_lighting_dramatic', 'option_lighting_corporate_headshot'], required: true, infoKey: 'field_lightingStyle_info'},
      { name: 'background', labelKey: 'field_backgroundChange_label', type: 'select', optionKeys: ['option_background_keep', 'option_background_solid_profile', 'option_background_office', 'option_background_outdoor', 'option_background_gradient'], required: true },
      { name: 'backgroundReferenceImage', labelKey: 'field_backgroundReferenceImage_label', type: 'file', required: false, infoKey: 'field_backgroundReferenceImage_info' },
      { name: 'retouching', labelKey: 'field_retouching_label', type: 'select', optionKeys: ['option_retouching_none', 'option_retouching_natural', 'option_retouching_smooth'], required: true },
      { name: 'clothing', labelKey: 'field_clothingChange_text_label', type: 'text', placeholderKey: 'field_clothingChange_text_placeholder', required: false, infoKey: 'field_clothingChange_info'},
      { name: 'clothingImage', labelKey: 'field_clothingChange_image_label', type: 'file', required: false, infoKey: 'field_clothingChange_image_info' },
      { name: 'hairstyle', labelKey: 'field_hairstyle_label', type: 'text', placeholderKey: 'field_hairstyle_placeholder', required: false, infoKey: 'field_hairstyle_info'},
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_profile', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => `You are a professional portrait retoucher and editor.
    
    --- EXAMPLE START ---
    - User Uploads: A selfie in a t-shirt.
    - User selects Type: "Resume Photo"
    - User specifies Clothing: "Clean white shirt and a navy suit jacket"
    - User specifies Background: "Solid Color (White/Gray/Blue)"
    - AI Thought Process: This is for a resume, so it needs to be professional. I will keep the person's face identical. I will replace their t-shirt with a photorealistic white shirt and navy jacket, ensuring the fit and lighting are natural. The background will be replaced with a clean, light gray studio backdrop. I will perform natural skin retouching, removing minor blemishes but preserving texture.
    --- EXAMPLE END ---
    
    Now, execute the user's actual request.
    **Task:** Perform a professional portrait retouch and modification on the uploaded photo for the purpose of a "${data.photoType}".
      **Lighting Style:** "${data.lighting}".
      **Background:** "${data.background}". ${getBackgroundReferenceInstruction(data)} If changing, replace it seamlessly.
      **Retouching Level:** "${data.retouching}". This includes skin smoothing, blemish removal, and subtle facial contouring, while preserving natural skin texture.
      ${getClothingInstruction(data)}
      ${getHairstyleInstruction(data)}
      **Additional requests:** "${data.customRequest || 'None'}".
      For "option_phototype_profile_id", the person must be facing forward against a plain, uniform background. For other profiles, more creative poses and expressions are acceptable.
      **CRITICAL INSTRUCTION:** The person's core identity and essential facial features must be perfectly preserved. The final image must look like it was taken by a professional portrait photographer.`,
  },
  {
    id: 'lifestyle',
    nameKey: 'category_lifestyle_name',
    descriptionKey: 'category_lifestyle_desc',
    icon: <LifestyleIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_snapImage_label', type: 'file', required: true, infoKey: 'field_snapImage_info' },
      { name: 'subject', labelKey: 'field_subject_label', type: 'select', optionKeys: ['option_subject_couple', 'option_subject_friends', 'option_subject_family', 'option_subject_personal'], required: true },
      { name: 'moodPreset', labelKey: 'field_moodPreset_label', type: 'select', optionKeys: ['option_mood_film', 'option_mood_clear', 'option_mood_cinematic', 'option_mood_vintage', 'option_mood_bw', 'option_custom'], required: true },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_lifestyle', required: true, condition: { field: 'moodPreset', value: 'option_custom' }},
      { name: 'enhancement', labelKey: 'field_additionalRetouching_label', type: 'select', optionKeys: ['option_enhancement_basic', 'option_enhancement_cleanup', 'option_enhancement_portrait'], required: true },
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_lifestyle', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        const moodInstructions = getConceptInstructions(data, {
            'option_mood_film': 'Apply warm color grading, subtle grain, and soft focus for a nostalgic, analog film look. Emphasize soft highlights and deep, muted shadows.',
            'option_mood_clear': 'Increase brightness and contrast for a clean, airy, and fresh look. Emphasize blues and whites for a crisp, modern feel.',
            'option_mood_cinematic': 'Add cinematic color grading (e.g., teal and orange), and a wider aspect ratio if appropriate for a movie-still feel. Enhance the storytelling aspect of the image.',
            'option_mood_vintage': 'Apply retro color filters (e.g., sepia tones, faded colors, light leaks) for a classic, timeless feel from a specific era.',
            'option_mood_bw': 'Convert the image to a rich, high-contrast black and white. Pay attention to tonal range, from deep blacks to bright whites, to create a dramatic and timeless image.'
        });
        return `You are a professional photo editor specializing in color grading for lifestyle photos.
        
        --- EXAMPLE START ---
        - User Uploads: A digital photo of a couple at the beach.
        - User selects Mood: "Warm Film Look"
        - User selects Enhancement: "Basic (Color/Brightness)"
        - AI Thought Process: The goal is a nostalgic, film-like aesthetic. I will apply a color grade that warms up the image, gives the highlights a soft, creamy quality, and adds a very subtle grain. I will adjust the brightness and contrast to match the film style without losing detail. The core moment and subjects will remain unchanged, but the overall mood will be transformed.
        --- EXAMPLE END ---
        
        Now, execute the user's actual request.
        **Task:** Enhance the uploaded lifestyle snap photo of a "${data.subject}".
        **Desired Mood:** "${data.moodPreset}".
        ${moodInstructions}
        **Additional Enhancement:** "${data.enhancement}".
        **Additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** The goal is to improve the photo's color, lighting, and composition to match the desired mood, without altering the core subjects or moment. The result should be a professionally graded, emotionally resonant image.`;
    }
  },
   {
    id: 'youtuber',
    nameKey: 'category_youtuber_name',
    descriptionKey: 'category_youtuber_desc',
    icon: <YouTuberIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_youtuber_main_image_label', type: 'file', required: true, infoKey: 'field_youtuber_main_image_info' },
      { name: 'personImage', labelKey: 'field_youtuber_person_image_label', type: 'file', required: false, infoKey: 'field_youtuber_person_image_info' },
      { name: 'thumbnailTitle', labelKey: 'field_youtuber_title_label', type: 'text', placeholderKey: 'field_youtuber_title_placeholder', required: true, infoKey: 'field_youtuber_title_info' },
      { name: 'stylePreset', labelKey: 'field_youtuber_style_preset_label', type: 'select', optionKeys: ['option_youtuber_style_mrbeast', 'option_youtuber_style_vlog', 'option_youtuber_style_tech', 'option_youtuber_style_beauty', 'option_custom'], required: true },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_youtuber', required: true, condition: { field: 'stylePreset', value: 'option_custom' }},
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_youtuber', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
      const personInstruction = data.personImage 
        ? "CRITICAL: A photo of a person has been uploaded. Realistically composite this person's face and upper body into the thumbnail scene. Their expression must be exaggerated to match the chosen style (e.g., shock, excitement, awe, curiosity). Match the lighting, color grading, and overall aesthetic of the scene perfectly. Do not change the person's core identity." 
        : "";

      const styleInstructions = {
        'option_youtuber_style_mrbeast': `Create a high-energy, 'MrBeast' style thumbnail. Use extremely bright, saturated colors and high contrast. The composition must be dynamic and chaotic, possibly featuring elements like explosions, stacks of money, or giant objects related to the main subject. The main person should have an over-the-top expression of shock or excitement. Add a glowing outline or a dramatic rim light to the main subjects to make them pop. The overall feeling should be intense and click-worthy. The video title idea is "${data.thumbnailTitle}".`,
        'option_youtuber_style_vlog': `Create a warm, cinematic 'Vlog' style thumbnail. Use soft, natural lighting, perhaps during golden hour, and apply a professional film-like color grade with pleasing, muted tones and subtle grain. The composition should feel personal, authentic, and inviting. The video title idea is "${data.thumbnailTitle}".`,
        'option_youtuber_style_tech': `Create a clean, futuristic 'Tech Review' style thumbnail. Use a minimalist composition with a dark or gradient background. Lighting should be sleek and professional, highlighting product details with sharp reflections. Use blue, purple, or cyan neon accents and abstract geometric shapes. The video title idea is "${data.thumbnailTitle}".`,
        'option_youtuber_style_beauty': `Create an elegant, 'Beauty/Fashion' style thumbnail. Use soft, diffused lighting to create a flattering and professional look. The color palette should be sophisticated (e.g., pastels, neutrals, rose gold). The composition should be clean and aesthetically pleasing, like a magazine cover. The video title idea is "${data.thumbnailTitle}".`
      };
      
      const concept = data.stylePreset === 'option_custom' 
        ? `The user has provided a custom thumbnail concept: "${data.customConcept}". The video title idea is "${data.thumbnailTitle}".`
        : styleInstructions[data.stylePreset] || '';

      return `You are an expert YouTube thumbnail designer focused on maximizing Click-Through-Rate (CTR).
      
      --- EXAMPLE START ---
      - User Uploads Main Image: A gold bar.
      - User Uploads Person Image: A photo of their face.
      - User Provides Title: "I Bought a $1M Gold Bar!"
      - User Selects Style: "MrBeast Style"
      - AI Thought Process: This needs to be high-energy. I'll create a background with stacks of cash and maybe a vault. I will composite the user's face into the scene, giving them a hugely exaggerated shocked or excited expression. The gold bar will be the central focus, glowing and oversized. I will use extremely saturated colors and add a bright glowing outline to the person and the gold bar to make them pop off the screen.
      --- EXAMPLE END ---
      
      Now, execute the user's actual request.
      **Task:** Create a viral, high-CTR thumbnail based on the uploaded main image.
      ${concept}
      ${personInstruction}
      **Additional user requests:** "${data.customRequest || 'None'}".
      **IMPORTANT:** Leave ample, clean negative space for a large, bold title to be added later. DO NOT GENERATE ANY TEXT ON THE IMAGE. The final image must be a hyper-realistic, 16:9 aspect ratio, high-resolution photo manipulation designed to grab attention immediately on the YouTube homepage.`;
    }
  },
  {
    id: 'influencer',
    nameKey: 'category_influencer_name',
    descriptionKey: 'category_influencer_desc',
    icon: <InfluencerIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_snapImage_label', type: 'file', required: true, infoKey: 'field_snapImage_info_influencer' },
      { name: 'postType', labelKey: 'field_postType_label', type: 'select', optionKeys: ['option_posttype_ootd', 'option_posttype_product_review', 'option_posttype_cafe_visit', 'option_posttype_travel'], required: true },
      { name: 'platform', labelKey: 'field_platform_label', type: 'select', optionKeys: ['option_platform_instagram_feed', 'option_platform_instagram_story', 'option_platform_blog'], required: true },
      { name: 'moodPreset', labelKey: 'field_moodPreset_label', type: 'select', optionKeys: ['option_mood_influencer_clean', 'option_mood_influencer_warm', 'option_mood_influencer_cinematic', 'option_mood_influencer_vibrant', 'option_mood_influencer_dreamy', 'option_custom'], required: true },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_influencer', required: true, condition: { field: 'moodPreset', value: 'option_custom' }},
      { name: 'enhancement', labelKey: 'field_additionalRetouching_label', type: 'select', optionKeys: ['option_enhancement_basic', 'option_enhancement_cleanup', 'option_enhancement_portrait'], required: true },
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_influencer', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        const moodInstructions = getConceptInstructions(data, {
            'option_mood_influencer_clean': 'Apply a clean, bright, and minimal aesthetic. Emphasize white tones and high contrast for a modern, sophisticated look popular on Instagram.',
            'option_mood_influencer_warm': 'Apply a warm, vintage film-like color grading with soft focus and subtle grain. Perfect for a nostalgic, cozy feed.',
            'option_mood_influencer_cinematic': 'Use dramatic, cinematic color grading (e.g., teal and orange) to create a moody and atmospheric shot that tells a story.',
            'option_mood_influencer_vibrant': 'Boost saturation and vibrancy to make colors pop, creating a lively and energetic feel suitable for travel or fashion posts.',
            'option_mood_influencer_dreamy': 'Create a soft, dreamy, and ethereal look. Use a soft-focus effect (bloom), add subtle light leaks, and use a pastel color palette.'
        });
        return `You are a social media content specialist and photo editor.
        
        --- EXAMPLE START ---
        - User Uploads: A photo of themselves at a cafe.
        - User selects Mood: "Clean & Minimal (White Tones)"
        - User selects Platform: "Instagram Feed"
        - AI Thought Process: The goal is a popular Instagram aesthetic. I will color grade the photo to enhance the whites and create a bright, airy feel. I will slightly increase contrast for a clean look. I will also perform basic portrait enhancements, like subtle skin smoothing, while keeping it natural. I'll ensure the composition is strong for a square or vertical feed post.
        --- EXAMPLE END ---
        
        Now, execute the user's actual request.
        **Task:** Enhance the uploaded photo for an influencer/blogger post.
        **Platform:** "${data.platform}"
        **Content Type:** "${data.postType}".
        **Desired Aesthetic Mood:** "${data.moodPreset}".
        ${moodInstructions}
        **Additional Enhancement:** "${data.enhancement}".
        **Additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** The final image must be highly aesthetic, eye-catching, and suitable for a professional social media feed or blog. The goal is to maximize engagement by creating a visually stunning image.`;
    }
  },
  {
    id: 'it_tech',
    nameKey: 'category_it_tech_name',
    descriptionKey: 'category_it_tech_desc',
    icon: <ITIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_sourceImage_label', type: 'file', required: true, infoKey: 'field_sourceImage_info_it' },
      { name: 'subjectType', labelKey: 'field_subjectType_label_it', type: 'select', optionKeys: ['option_subject_it_ui', 'option_subject_it_device', 'option_subject_it_person'], required: true },
      { name: 'conceptPreset', labelKey: 'field_conceptPreset_label', type: 'select', optionKeys: ['option_concept_it_mockup', 'option_concept_it_sleek', 'option_concept_it_lifestyle', 'option_concept_it_abstract', 'option_concept_it_blueprint', 'option_custom'], required: true },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_it', required: true, condition: { field: 'conceptPreset', value: 'option_custom' }},
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_it', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        const conceptInstructions = getConceptInstructions(data, {
            'option_concept_it_mockup': 'Place the uploaded UI screenshot into a realistic, modern device mockup (e.g., latest smartphone, laptop). The background should be clean and slightly blurred to focus on the screen.',
            'option_concept_it_sleek': 'Create a sleek, professional product shot of the hardware device. Use dramatic studio lighting, a minimal background, and highlight the material and design details, similar to a high-end tech ad.',
            'option_concept_it_lifestyle': 'Show the device being used by a person in a natural, modern setting like a coffee shop, co-working space, or home office. The focus should be on the user experience.',
            'option_concept_it_abstract': 'Place the source image within an abstract, tech-themed background with elements like glowing data streams, circuit patterns, or geometric shapes to convey innovation.',
            'option_concept_it_blueprint': 'Transform the device photo into a futuristic holographic blueprint. The image should feature glowing cyan lines on a dark background, with callouts and annotations highlighting key features.'
        });
        return `You are a creative director for a major tech company.
        
        --- EXAMPLE START ---
        - User Uploads: A screenshot of their app's UI.
        - User selects Subject: "Software UI / Screenshot"
        - User selects Concept: "Composite into Device Mockup"
        - AI Thought Process: The goal is a professional mockup. I will select a modern, premium-looking smartphone model (e.g., iPhone, Pixel). I will then realistically place the user's UI screenshot onto the phone's screen, ensuring correct perspective and reflections. The background will be a clean, slightly out-of-focus office setting to provide context without being distracting.
        --- EXAMPLE END ---
        
        Now, execute the user's actual request.
        **Task:** Create a professional IT/Tech-themed image based on the uploaded source photo.
        **Subject:** a "${data.subjectType}".
        **Desired Concept:** "${data.conceptPreset}".
        ${conceptInstructions}
        **Additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** The final image must be clean, modern, high-resolution, and suitable for a tech company website, presentation, or promotional material. Ensure the original subject (UI, device) is represented clearly and accurately within the new composition.`;
    }
  },
  {
    id: 'event',
    nameKey: 'category_event_name',
    descriptionKey: 'category_event_desc',
    icon: <EventIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_eventImage_label', type: 'file', required: true, infoKey: 'field_eventImage_info' },
      { name: 'eventType', labelKey: 'field_eventType_label', type: 'text', placeholderKey: 'field_eventType_placeholder', required: true },
      { name: 'enhancement', labelKey: 'field_coreRequest_label', type: 'select', optionKeys: ['option_enhancement_brightness', 'option_enhancement_sharpen', 'option_enhancement_color', 'option_enhancement_remove', 'option_enhancement_ambience'], required: true },
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_event', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => `You are an expert event photo editor.
    
    --- EXAMPLE START ---
    - User Uploads: A dark photo from a conference stage.
    - User provides Type: "Corporate Conference"
    - User selects Enhancement: "Improve Brightness in Dark Photos"
    - AI Thought Process: The photo is underexposed. I need to increase the overall brightness, especially on the speaker, without blowing out the highlights on the projector screen. I will use techniques to reduce the digital noise that often appears when brightening dark photos. My goal is to make the photo look like it was taken with better lighting, while preserving the natural atmosphere of the event.
    --- EXAMPLE END ---

    Now, execute the user's actual request.
    **Task:** Enhance an event photograph from a "${data.eventType}".
      **Main Enhancement:** "${data.enhancement}".
      - For 'option_enhancement_brightness', intelligently brighten the image, especially in underexposed areas, while controlling noise and preserving highlight details.
      - For 'option_enhancement_sharpen', sharpen the key subjects and details without introducing artifacts or over-sharpening backgrounds.
      - For 'option_enhancement_color', neutralize unnatural color casts from stage lighting and enhance the overall color harmony and vibrancy.
      - For 'option_enhancement_remove', remove distracting objects or people as requested, seamlessly filling the background using content-aware techniques.
      - For 'option_enhancement_ambience', add atmospheric effects like subtle light rays, haze, or lens flare to enhance the mood and energy of the event.
      **Additional requests:** "${data.customRequest || 'None'}".
      **CRITICAL INSTRUCTION:** The goal is to improve the documentary quality of the photo, making it look more professional while preserving the authentic feel and energy of the event.`,
  },
   {
    id: 'retouch',
    nameKey: 'category_retouch_name',
    descriptionKey: 'category_retouch_desc',
    icon: <RetouchIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_retouchImage_label', type: 'file', required: true },
      { name: 'task', labelKey: 'field_task_label', type: 'select', optionKeys: ['option_task_remove', 'option_task_composite', 'option_task_retouch', 'option_task_color', 'option_task_restore', 'option_task_upscale'], required: true },
      { name: 'taskDescription', labelKey: 'field_taskDescription_label', type: 'textarea', placeholderKey: 'field_taskDescription_placeholder', required: true, infoKey: 'field_taskDescription_info' },
      { name: 'backgroundReferenceImage', labelKey: 'field_compositeImage_label', type: 'file', required: false, infoKey: 'field_compositeImage_info', condition: { field: 'task', value: 'option_task_composite' } },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => `You are an expert photo retoucher with access to advanced AI tools.
    
    --- EXAMPLE START ---
    - User Uploads: A photo of a person on a crowded beach.
    - User selects Task: "Remove Unnecessary Elements"
    - User Describes Task: "Please remove all the other people in the background, so it looks like I'm on a private beach."
    - AI Thought Process: The task is object removal. I need to carefully identify and mask all people in the background. Then, using generative fill, I will replace those areas with a natural-looking continuation of the sand, sea, and sky. The result must be seamless, with no visible artifacts or evidence that other people were ever there.
    --- EXAMPLE END ---
    
    Now, execute the user's actual request.
    **Task:** Perform a specific, advanced photo editing task on the uploaded image.
      **Selected Task:** "${data.task}".
      **Detailed Instructions:** "${data.taskDescription}".
      ${getBackgroundReferenceInstruction(data)}
      **CRITICAL INSTRUCTION:** Interpret the user's text description with extreme precision and execute the edit with the skill of a professional retoucher. 
      - For object removal, use generative fill to make the area look completely natural and seamless. 
      - For color changes, accurately isolate the object and change its color realistically, paying close attention to light, shadow, and texture. 
      - For photo restoration, fix cracks, remove dust, and improve colors naturally as if the photo were new. 
      - The final image should be a high-quality, edited version that perfectly fulfills the user's specific request. Only perform the requested task.`,
  },
    {
    id: 'nail_hair',
    nameKey: 'category_nailhair_name',
    descriptionKey: 'category_nailhair_desc',
    icon: <NailIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_serviceImage_label', type: 'file', required: true, infoKey: 'field_serviceImage_info' },
      { name: 'modelImage', labelKey: 'field_modelImage_label', type: 'file', required: false, infoKey: 'field_modelImage_info_nailhair' },
      { name: 'serviceType', labelKey: 'field_serviceType_label', type: 'select', optionKeys: ['option_service_nail', 'option_service_hair'], required: true },
      { name: 'modelDetails', labelKey: 'field_modelRequest_label', type: 'text', placeholderKey: 'field_modelRequest_placeholder', required: false, infoKey: 'field_modelRequest_info', condition: { field: 'modelImage', value: '' }},
      { name: 'conceptPreset', labelKey: 'field_conceptPreset_label', type: 'select', optionKeys: ['option_concept_nh_studio', 'option_concept_nh_natural', 'option_concept_nh_closeup', 'option_concept_nh_glam', 'option_concept_nh_lifestyle', 'option_custom'], required: true },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_nailhair', required: true, condition: { field: 'conceptPreset', value: 'option_custom' }},
      { name: 'backgroundReferenceImage', labelKey: 'field_backgroundReferenceImage_label', type: 'file', required: false, infoKey: 'field_backgroundReferenceImage_info_nailhair' },
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_nailhair', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        let modelInstruction = '';
        if (data.serviceType === 'option_service_hair') {
            if (data.modelImage) {
                modelInstruction = 'CRITICAL TASK: An image of a hairstyle AND an image of a model have been uploaded. Your primary goal is to apply the hairstyle from the first image onto the person in the model image. You must preserve the model\'s face and identity perfectly, only changing their hair to match the style, color, and texture from the service photo. This is a virtual hair swap.';
            } else {
                modelInstruction = `CRITICAL TASK: An image of a hairstyle has been uploaded. Generate a new, suitable AI model that fits this description: "${data.modelDetails || 'a professional model'}". Then, depict this model with the exact hairstyle from the uploaded service photo.`;
            }
        } else { // Nail service
            if (data.modelImage) {
                 modelInstruction = 'CRITICAL TASK: An image of nail art AND an image of a model\'s hand have been uploaded. Apply the nail art from the first image onto the nails in the model\'s hand image. Preserve the hand\'s shape, skin tone, and pose.';
            } else {
                modelInstruction = `CRITICAL TASK: An image of nail art has been uploaded. Generate a new, beautiful AI-generated hand model that fits this description: "${data.modelDetails || 'a professional hand model'}". Then, depict this hand with the exact nail art from the uploaded service photo.`
            }
        }

        const conceptInstructions = getConceptInstructions(data, {
            'option_concept_nh_studio': 'Use a clean, seamless background (white, gray, pastel) with soft studio lighting to professionally showcase the service.',
            'option_concept_nh_natural': 'Create a scene with soft, natural light, possibly near a window or outdoors, for a lifestyle feel.',
            'option_concept_nh_closeup': 'Create a macro shot focusing on the intricate details of the nail art or the texture and shine of the hair.',
            'option_concept_nh_glam': 'Use glamorous props like glitter, champagne glasses, or festive backgrounds for a party or special event look.',
            'option_concept_nh_lifestyle': 'Show the model in a candid lifestyle setting (e.g., holding a coffee cup, typing on a laptop) to showcase the service in a real-world context.'
        });
        return `You are an AI photo editor for a high-end salon.
        
        --- EXAMPLE START ---
        - User Uploads Service Photo: A close-up of intricate nail art.
        - User selects Service Type: "Nail Art"
        - User specifies Model: "Clean white hands of a 20s woman"
        - User selects Concept: "Clean Studio"
        - AI Thought Process: The task is to showcase nail art. I will generate a pair of photorealistic, elegant hands matching the description. Then, I will meticulously apply the nail art from the service photo onto the nails of the generated hands. The background will be a clean, slightly off-white studio setting with soft, diffused lighting to make the nail art the hero of the shot.
        --- EXAMPLE END ---
        
        Now, execute the user's actual request.
        **Task:** Create a professional portfolio image for a "${data.serviceType}" service.
        ${modelInstruction}
        **Overall Concept:** "${data.conceptPreset}".
        ${conceptInstructions}
        ${getBackgroundReferenceInstruction(data)}
        **Additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** The final image must be hyper-realistic and high-resolution, suitable for a professional salon portfolio or social media.`;
    }
  },
  {
    id: 'fitness',
    nameKey: 'category_fitness_name',
    descriptionKey: 'category_fitness_desc',
    icon: <FitnessIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_spacePersonImage_label', type: 'file', required: true },
      { name: 'photoType', labelKey: 'field_photoType_label', type: 'select', optionKeys: ['option_phototype_fitness_space', 'option_phototype_fitness_profile', 'option_phototype_fitness_class'], required: true },
      { name: 'moodPreset', labelKey: 'field_moodConcept_label', type: 'select', optionKeys: ['option_mood_fitness_energetic', 'option_mood_fitness_calm', 'option_mood_fitness_modern', 'option_mood_fitness_gritty', 'option_custom'], required: true },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_fitness', required: true, condition: { field: 'moodPreset', value: 'option_custom' }},
      { name: 'backgroundReferenceImage', labelKey: 'field_backgroundReferenceImage_label', type: 'file', required: false, infoKey: 'field_backgroundReferenceImage_info_fitness' },
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_fitness', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        const moodInstructions = getConceptInstructions(data, {
            'option_mood_fitness_energetic': 'Use bright, dynamic lighting and vibrant colors to create a sense of motion and energy. Think high-contrast and sharp details.',
            'option_mood_fitness_calm': 'Use soft, calm lighting (like early morning light) and a muted, peaceful color palette to evoke a sense of serenity and mindfulness. (e.g., for yoga, pilates).',
            'option_mood_fitness_modern': 'Emphasize clean lines and a minimalist aesthetic. Use neutral colors and professional studio lighting for a sleek, high-end, premium fitness brand feel.',
            'option_mood_fitness_gritty': 'Create a high-contrast, black and white or desaturated image with dramatic shadows. This is great for intense workout scenes (e.g., crossfit, weightlifting) to emphasize grit and power.'
        });
        return `You are a creative director for a premium fitness brand.
        
        --- EXAMPLE START ---
        - User Uploads: A photo of a yoga instructor in a pose.
        - User selects Type: "Instructor Profile"
        - User selects Mood: "Calm & Meditative"
        - AI Thought Process: The mood is calm and serene. I will enhance the photo with soft, early morning light streaming through a large window in the background. The color palette will be muted and natural. I will ensure the instructor's pose is the focus, cleaning up any distracting background elements and applying a professional, calming color grade to the entire image.
        --- EXAMPLE END ---
        
        Now, execute the user's actual request.
        **Task:** Enhance the uploaded photo of a fitness/yoga scene, specifically a "${data.photoType}".
        **Desired Mood:** "${data.moodPreset}".
        ${moodInstructions}
        ${getBackgroundReferenceInstruction(data)}
        **Additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** Preserve the original subjects (people, key architecture) but enhance the lighting, color, and atmosphere. Clean up any distracting elements to create a professional, magazine-quality final image.`;
    }
  },
  {
    id: 'automotive',
    nameKey: 'category_automotive_name',
    descriptionKey: 'category_automotive_desc',
    icon: <CarIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_carImage_label', type: 'file', required: true, infoKey: 'field_carImage_info' },
      { name: 'carModel', labelKey: 'field_carModel_label', type: 'text', placeholderKey: 'field_carModel_placeholder', required: true },
      { name: 'serviceType', labelKey: 'field_serviceType_label_car', type: 'select', optionKeys: ['option_service_car_detailing', 'option_service_car_shoot', 'option_service_car_interior'], required: true },
      { name: 'backgroundPreset', labelKey: 'field_backgroundConcept_label', type: 'select', optionKeys: ['option_background_car_studio', 'option_background_car_city', 'option_background_car_mountain', 'option_background_car_coast', 'option_background_car_track', 'option_custom'], required: true },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_car', required: true, condition: { field: 'backgroundPreset', value: 'option_custom' }},
      { name: 'backgroundReferenceImage', labelKey: 'field_backgroundReferenceImage_label', type: 'file', required: false, infoKey: 'field_backgroundReferenceImage_info' },
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_car', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        const serviceInstructions = {
            'option_service_car_detailing': 'Create dramatic lighting that emphasizes the car\'s reflections and glossy, "wet-look" finish, making it look perfectly polished and detailed.',
            'option_service_car_shoot': 'Place the car in a stunning, cinematic location that matches the background concept, as if for a car commercial or magazine cover.',
            'option_service_car_interior': 'If the original is an interior shot, enhance the cleanliness and detail of the materials (leather, carbon fiber, etc.). If not, generate a shot of the pristine interior.'
        };
        return `You are a professional automotive photographer for a luxury car magazine.
        
        --- EXAMPLE START ---
        - User Uploads: A photo of their car parked in a driveway.
        - User provides Model: "Genesis G80"
        - User selects Background: "City Nightscape"
        - AI Thought Process: The goal is a dramatic city night shot. I will isolate the car from the driveway photo. I will create a new background of a slick, rain-wet city street at night, with neon lights reflecting off the pavement. I will place the car in this scene, adding realistic reflections onto the car's body and creating a sense of motion with a slight blur in the background. The lighting on the car must match the city environment perfectly.
        --- EXAMPLE END ---
        
        Now, execute the user's actual request.
        **Task:** Transform the uploaded photo of a "${data.carModel}" into a professional automotive advertisement.
        **Service Focus:** "${data.serviceType}". ${serviceInstructions[data.serviceType] || ''}
        **Background Concept:** "${data.backgroundPreset}".
        ${getConceptInstructions(data, {
            'option_background_car_studio': 'Place the car in a professional, well-lit studio or showroom with perfect reflections on a polished floor.',
            'option_background_car_city': 'Place the car on a city street at night with neon lights, reflections on wet pavement, and a sense of motion (motion blur).',
            'option_background_car_mountain': 'Place the car on a winding mountain road with dramatic scenery (e.g., sunrise, fog) and dynamic lighting.',
            'option_background_car_coast': 'Place the car on a coastal highway with the ocean in the background, possibly during a golden-hour sunset.',
            'option_background_car_track': 'Place the car on a professional race track with motion blur on the background and wheels to convey a sense of high speed.'
        })}
        ${getBackgroundReferenceInstruction(data)}
        **Additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** Do not change the car itself, but perfect its appearance (remove unwanted reflections, enhance gloss) and place it in the new, hyper-realistic scene. The final image must be high-resolution, dynamic, and magazine-quality.`;
    }
  },
  {
    id: 'accommodation',
    nameKey: 'category_accommodation_name',
    descriptionKey: 'category_accommodation_desc',
    icon: <BedIcon />,
    fields: [
      { name: 'productImage', labelKey: 'field_spaceImage_label', type: 'file', required: true },
      { name: 'spaceType', labelKey: 'field_spaceType_label', type: 'text', placeholderKey: 'field_spaceType_placeholder_accom', required: true },
      { name: 'conceptPreset', labelKey: 'field_retouchConcept_label', type: 'select', optionKeys: ['option_concept_accom_bright', 'option_concept_accom_cozy', 'option_concept_accom_luxury', 'option_concept_accom_view', 'option_concept_accom_twilight', 'option_custom'], required: true },
      { name: 'customConcept', labelKey: 'field_customConcept_label', type: 'textarea', placeholderKey: 'field_customConcept_placeholder_accom', required: true, condition: { field: 'conceptPreset', value: 'option_custom' }},
      { name: 'timeOfDay', labelKey: 'field_timeOfDay_label', type: 'select', optionKeys: ['option_time_morning', 'option_time_afternoon', 'option_time_sunset', 'option_time_night'], required: true },
      { name: 'customRequest', labelKey: 'field_customRequest_label', type: 'textarea', placeholderKey: 'field_customRequest_placeholder_accom', required: false },
      { name: 'numImages', labelKey: 'field_numImages_label', type: 'select', optionKeys: ['option_numImages_1', 'option_numImages_2', 'option_numImages_3', 'option_numImages_4', 'option_numImages_5', 'option_numImages_6', 'option_numImages_7', 'option_numImages_8', 'option_numImages_9', 'option_numImages_10'], required: true },
    ],
    // FIX: Changed from an immediate function call to a function reference.
    suggestionPrompt: getJsonSuggestionPrompt,
    promptTemplate: (data) => {
        const conceptInstructions = getConceptInstructions(data, {
            'option_concept_accom_bright': 'Improve lighting and adjust perspective to make the space feel more open and airy. Use professional real estate photography techniques like HDR blending and perspective correction.',
            'option_concept_accom_cozy': 'Add warm lighting (e.g., glowing lamps), soft textures, and lifestyle elements (e.g., a book on the bed, a cup of tea) to create an inviting, home-like atmosphere.',
            'option_concept_accom_luxury': 'Use a sophisticated color palette and enhance high-end materials like marble or brass. The lighting should be elegant and layered to create a sense of luxury.',
            'option_concept_accom_view': 'Replace the view from the window with a beautiful and fitting landscape (e.g., mountains, cityscape, beach) that matches the time of day.',
            'option_concept_accom_twilight': 'Create a "twilight" or "dusk" shot. The interior lights should be warmly lit, while the sky outside is a deep blue, creating an inviting and high-end look popular in real estate.'
        });
        return `You are an expert real estate and hospitality photographer.
        
        --- EXAMPLE START ---
        - User Uploads: Photo of a hotel room with a plain city view.
        - User provides Type: "Ocean view double room"
        - User selects Concept: "Composite Window View"
        - User selects Time: "Evening Sunset"
        - AI Thought Process: The task is to replace the window view. I will keep the hotel room interior exactly as it is. I will then generate a beautiful, photorealistic image of an ocean at sunset. I will composite this new view into the window, making sure the lighting and color of the sunset realistically affect the lighting inside the room (e.g., casting a warm, orange glow).
        --- EXAMPLE END ---
        
        Now, execute the user's actual request.
        **Task:** Enhance the uploaded photograph of an accommodation space, which is a "${data.spaceType}".
        **Desired Concept:** "${data.conceptPreset}".
        **Time of Day:** "${data.timeOfDay}".
        ${conceptInstructions}
        **Additional requests:** "${data.customRequest || 'None'}".
        **CRITICAL INSTRUCTION:** Maintain the room's core structure but enhance or modify furniture, lighting, decor, and the view to create an inviting, high-resolution image that would attract bookings. The result should look like a professional photo from an architectural or travel magazine.`;
    }
  },
];