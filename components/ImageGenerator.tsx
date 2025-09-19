import React, { useState, useEffect } from 'react';
import type { Category, FormField } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';
import { analyzeImageForSuggestions } from '../services/geminiService';

interface ImageGeneratorProps {
  category: Category;
  onGenerate: (formData: Record<string, string | File>) => void;
  onBack: () => void;
  error: string | null;
  initialData: Record<string, string | File> | null;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ category, onGenerate, onBack, error, initialData }) => {
  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
  const [modelPreview, setModelPreview] = useState<string | null>(null);
  const [clothingPreview, setClothingPreview] = useState<string | null>(null);
  const [consistencyPreview, setConsistencyPreview] = useState<string | null>(null);
  const [personPreview, setPersonPreview] = useState<string | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { t } = useLocalization();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      const setupPreview = (fileKey: string, setPreview: (url: string | null) => void) => {
        const imageFile = initialData[fileKey];
        if (imageFile instanceof File) {
          const reader = new FileReader();
          reader.onloadend = () => { setPreview(reader.result as string); };
          reader.readAsDataURL(imageFile);
        } else {
          setPreview(null);
        }
      };
      setupPreview('productImage', setImagePreview);
      setupPreview('backgroundReferenceImage', setBackgroundPreview);
      setupPreview('modelImage', setModelPreview);
      setupPreview('clothingImage', setClothingPreview);
      setupPreview('consistencyReferenceImage', setConsistencyPreview);
      setupPreview('personImage', setPersonPreview);
    } else {
      const initialFormState: Record<string, string> = {};
      category.fields.forEach(field => {
        if (field.type !== 'file') {
          initialFormState[field.name] = field.type === 'select' && field.optionKeys ? field.optionKeys[0] : '';
        }
      });
      initialFormState['numImages'] = 'option_numImages_3'; // Default to 3 images
      setFormData(initialFormState);
      setImagePreview(null);
      setBackgroundPreview(null);
      setModelPreview(null);
      setClothingPreview(null);
      setConsistencyPreview(null);
      setPersonPreview(null);
    }
  }, [category, initialData]);

  const handleRemoveImage = (fieldName: string) => {
    setFormData(prev => {
        const newState = { ...prev };
        delete newState[fieldName];
        return newState;
    });
    if (fieldName === 'productImage') setImagePreview(null);
    else if (fieldName === 'backgroundReferenceImage') setBackgroundPreview(null);
    else if (fieldName === 'modelImage') setModelPreview(null);
    else if (fieldName === 'clothingImage') setClothingPreview(null);
    else if (fieldName === 'consistencyReferenceImage') setConsistencyPreview(null);
    else if (fieldName === 'personImage') setPersonPreview(null);
    const input = document.getElementById(fieldName) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
     if (e.target.type === 'file') {
        const files = (e.target as HTMLInputElement).files;
        if (files && files[0]) {
            const file = files[0];
            setFormData(prev => ({ ...prev, [name]: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                if (name === 'productImage') setImagePreview(result);
                else if (name === 'backgroundReferenceImage') setBackgroundPreview(result);
                else if (name === 'modelImage') setModelPreview(result);
                else if (name === 'clothingImage') setClothingPreview(result);
                else if (name === 'consistencyReferenceImage') setConsistencyPreview(result);
                else if (name === 'personImage') setPersonPreview(result);
            };
            reader.readAsDataURL(file);
        }
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productImage) {
        alert(t('alert_upload_required_image'));
        return;
    }
    onGenerate(formData);
  };
  
  const handleAiSuggest = async () => {
    const imageFile = formData.productImage as File;
    if (!imageFile || !category.suggestionPrompt) {
        alert(t('alert_upload_for_suggestion'));
        return;
    }
    setIsSuggesting(true);
    try {
        const fieldsToSuggest = category.fields
            .filter(f => f.type === 'text' || f.type === 'textarea')
            .map(f => f.name);
        const suggestions = await analyzeImageForSuggestions(category, imageFile, fieldsToSuggest);
        setFormData(prev => ({...prev, ...suggestions}));
    } catch(err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        alert(`${t('error_suggestion_failed')} ${errorMessage}`);
    } finally {
        setIsSuggesting(false);
    }
  };

  const visibleFields = category.fields.filter(field => {
    if (!field.condition) return true;
    if (field.condition.value === '') {
        return !formData[field.condition.field];
    }
    const conditionValue = field.condition.value;
    return formData[field.condition.field] === conditionValue;
  });

  const renderFileInput = (field: FormField) => {
    let preview = null;
    if (field.name === 'productImage') preview = imagePreview;
    else if (field.name === 'backgroundReferenceImage') preview = backgroundPreview;
    else if (field.name === 'modelImage') preview = modelPreview;
    else if (field.name === 'clothingImage') preview = clothingPreview;
    else if (field.name === 'consistencyReferenceImage') preview = consistencyPreview;
    else if (field.name === 'personImage') preview = personPreview;


    return (
        <div className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md`}>
            <div className="space-y-1 text-center">
                {preview ? (
                     <div className="relative inline-block">
                        <img src={preview} alt="Preview" className="mx-auto h-24 w-auto rounded-md object-cover" />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(field.name)}
                            className="absolute top-0 right-0 -mt-3 -mr-3 bg-red-600 text-white rounded-full h-7 w-7 flex items-center justify-center text-xl font-bold leading-none hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label={t('aria_label_remove_image')}
                        >
                            &times;
                        </button>
                    </div>
                ) : (
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor={field.name} className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>{preview ? t('button_select_other_file') : t('button_upload_file')}</span>
                        <input id={field.name} name={field.name} type="file" className="sr-only" accept="image/*" onChange={handleChange} />
                    </label>
                    {!preview && <p className="pl-1">{t('text_or_drag')}</p>}
                </div>
                {!preview && <p className="text-xs text-gray-500">{t('text_max_size')}</p>}
            </div>
        </div>
    );
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-800 transition mr-4" aria-label={t('aria_label_back_to_categories')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center space-x-3">
          <div className="[&>svg]:w-8 [&>svg]:h-8">{category.icon}</div>
          <h2 className="text-2xl font-bold text-gray-800">{t(category.nameKey)} {t('generator_title_suffix')}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {category.suggestionPrompt && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                 <h3 className="font-semibold text-blue-800">{t('suggestion_box_title')}</h3>
                 <p className="text-sm text-blue-700 mb-3">{t('suggestion_box_description')}</p>
                 <button
                    type="button"
                    onClick={handleAiSuggest}
                    disabled={!formData.productImage || isSuggesting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                {isSuggesting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('button_suggesting')}
                    </>
                ) : (
                    t('button_ai_suggest')
                )}
                </button>
            </div>
        )}

        {visibleFields.map(field => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
              {t(field.labelKey)} {field.required && <span className="text-red-500">*</span>}
              {field.infoKey && <span className="text-gray-400 font-normal ml-2"> - {t(field.infoKey)}</span>}
            </label>
            {field.type === 'file' ? (
                renderFileInput(field)
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={typeof formData[field.name] === 'string' ? formData[field.name] as string : ''}
                onChange={handleChange}
                placeholder={field.placeholderKey ? t(field.placeholderKey) : ''}
                required={field.required}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 placeholder-gray-500 bg-white"
              />
            ) : field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={typeof formData[field.name] === 'string' ? formData[field.name] as string : ''}
                onChange={handleChange}
                required={field.required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-900"
              >
                {field.optionKeys?.map(optionKey => (
                  <option key={optionKey} value={optionKey}>{t(optionKey)}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={typeof formData[field.name] === 'string' ? formData[field.name] as string : ''}
                onChange={handleChange}
                placeholder={field.placeholderKey ? t(field.placeholderKey) : ''}
                required={field.required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 placeholder-gray-500 bg-white"
              />
            )}
          </div>
        ))}
        {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          <span>{t('button_generate')}</span>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ImageGenerator;