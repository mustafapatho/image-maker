import React, { useState, useEffect } from 'react';
import type { Category } from './types';
import { CATEGORIES } from './constants';
import CategorySelector from './components/CategorySelector';
import ImageGenerator from './components/ImageGenerator';
import ImageResult from './components/ImageResult';
import LoadingIndicator from './components/LoadingIndicator';
import { generateProductImages } from './services/geminiService';
import { useLocalization } from './contexts/LocalizationContext';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<string>('category'); // category, generator, loading, result
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [lastGenerationData, setLastGenerationData] = useState<Record<string, string | File> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { t, setLocale, locale } = useLocalization();
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t('app_title');
  }, [locale, t]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentStep('generator');
    setError(null);
  };

  const handleProgress = (current: number, total: number) => {
    setGenerationProgress({ current, total });
  };

  const handleGenerate = async (formData: Record<string, string | File>) => {
    if (!selectedCategory) return;
    setCurrentStep('loading');
    setGeneratedImages([]);
    setError(null);
    setLastGenerationData(formData);
    
    const numImagesStr = (formData.numImages as string) || 'option_numImages_3';
    const numImages = parseInt(numImagesStr.split('_').pop() || '3', 10);
    
    setGenerationProgress({ current: 0, total: numImages });

    try {
      const images = await generateProductImages(selectedCategory, formData, numImages, handleProgress);
      setGeneratedImages(images);
      setCurrentStep('result');
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`${t('error_generation_failed')} ${errorMessage}`);
      setCurrentStep('generator');
    }
  };

  const handleBackToCategories = () => {
    setCurrentStep('category');
    setSelectedCategory(null);
    setGeneratedImages([]);
    setLastGenerationData(null);
    setError(null);
  };
  
  const handleBackToGenerator = () => {
    setCurrentStep('generator');
    setGeneratedImages([]);
    setError(null);
  };

  const handleGenerateAgain = () => {
    if (lastGenerationData) {
      handleGenerate(lastGenerationData);
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'category':
        return <CategorySelector categories={CATEGORIES} onSelect={handleCategorySelect} />;
      case 'generator':
        if (selectedCategory) {
          return (
            <ImageGenerator
              category={selectedCategory}
              onGenerate={handleGenerate}
              onBack={handleBackToCategories}
              error={error}
              initialData={lastGenerationData}
            />
          );
        }
        return null;
      case 'loading':
        return <LoadingIndicator progress={generationProgress} />;
      case 'result':
        return <ImageResult images={generatedImages} onBack={handleBackToGenerator} onGenerateAgain={handleGenerateAgain} onGoHome={handleBackToCategories} />;
      default:
        return <CategorySelector categories={CATEGORIES} onSelect={handleCategorySelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
       <header className="w-full max-w-5xl mb-8">
        <div className="flex justify-between items-center">
            <div></div>
            <div onClick={handleBackToCategories} className="cursor-pointer inline-block group text-center" title={t('tooltip_go_home')}>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {t('app_header_new')} 💼
              </h1>
              <p className="mt-2 text-md sm:text-lg text-gray-600">
                {t('app_subheader_new')}
              </p>
            </div>
            <div className="flex space-x-2">
                <button onClick={() => setLocale('ko')} className={`px-3 py-1 text-sm rounded-md ${locale === 'ko' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>KO</button>
                <button onClick={() => setLocale('en')} className={`px-3 py-1 text-sm rounded-md ${locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>EN</button>
                <button onClick={() => setLocale('ja')} className={`px-3 py-1 text-sm rounded-md ${locale === 'ja' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>JA</button>
            </div>
        </div>
      </header>
      <main className="w-full flex justify-center">
        {renderContent()}
      </main>
      <footer className="w-full text-center mt-12 text-gray-500 text-sm">
        <p>
            {t('footer_made_by')} <a href="https://www.threads.net/@choi.openai" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">@choi.openai</a>
        </p>
         <p className="mt-1">{t('footer_follow_cta')}</p>
      </footer>
    </div>
  );
};

export default App;