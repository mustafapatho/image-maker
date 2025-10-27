import React, { useState, useEffect } from 'react';
import type { Category } from './types';
import { CATEGORIES } from './constants';
import CategorySelector from './components/CategorySelector';
import ImageGenerator from './components/ImageGenerator';
import ImageResult from './components/ImageResult';
import LoadingIndicator from './components/LoadingIndicator';
import History from './components/History';
import PaymentModal from './components/PaymentModal';
import SubscriptionModal from './components/SubscriptionModal';
import SubscriptionButton from './components/SubscriptionButton';
import UserStats from './components/UserStats';
import { subscriptionService } from './services/subscriptionService';
import { generateProductImages } from './services/geminiService';
import { saveToHistory } from './utils/historyManager';
import { signOut } from './services/supabase';
import { LocalizationProvider, useLocalization } from './contexts/LocalizationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Auth from './components/Auth';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState<string>('category');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [lastGenerationData, setLastGenerationData] = useState<Record<string, string | File> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { t, setLocale, locale } = useLocalization();
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<Record<string, string | File> | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t('app_title');
  }, [locale, t]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Auth />;
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentStep('generator');
    setError(null);
  };

  const handleProgress = (current: number, total: number) => {
    setGenerationProgress({ current, total });
  };

  const handleGenerate = async (formData: Record<string, string | File>) => {
    if (!selectedCategory || !user || isGenerating) return;
    
    const numImagesStr = (formData.numImages as string) || 'option_numImages_1';
    const numImages = parseInt(numImagesStr.split('_').pop() || '1', 10);
    
    setIsGenerating(true);
    
    try {
      // Check if user is premium, has subscription, or credits
      const [isPremium, hasSubscription, availableImages] = await Promise.all([
        subscriptionService.isPremiumUser(user.id),
        subscriptionService.isSubscriptionActive(user.id),
        subscriptionService.getRemainingImages(user.id)
      ]);
      
      // If user is premium, has subscription, or enough credits, proceed directly
      if (isPremium || hasSubscription || availableImages >= numImages) {
        // Proceed with generation
      } else {
        // Show payment modal for users without premium/subscription/credits
        setPendingFormData(formData);
        setShowPaymentModal(true);
        return;
      }
      
      // Proceed with generation
      setCurrentStep('loading');
      setGeneratedImages([]);
      setError(null);
      setLastGenerationData(formData);
      setGenerationProgress({ current: 0, total: numImages });
      
      const images = await generateProductImages(selectedCategory, formData, numImages, handleProgress);
      
      // Only consume credits after successful generation
      const successfulImages = images.length;
      for (let i = 0; i < successfulImages; i++) {
        await subscriptionService.useImage(user.id);
      }
      
      // Update total images generated count
      try {
        await subscriptionService.updateTotalImagesGenerated(user.id, successfulImages, user.email);
      } catch (error) {
        console.error('Failed to update total images count:', error);
      }
      
      setGeneratedImages(images);
      
      // Save to history
      try {
        await saveToHistory(t(selectedCategory.nameKey), images, formData, user.id);
      } catch (historyError) {
        console.error('Failed to save to history:', historyError);
      }
      
      setCurrentStep('result');
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`${t('error_generation_failed')} ${errorMessage}`);
      setCurrentStep('generator');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handlePaymentSuccess = async (referenceId: string) => {
    if (!user || !pendingFormData) return;
    
    try {
      // Parse reference ID to determine payment type
      if (referenceId.startsWith('sub_')) {
        const parts = referenceId.split('_');
        const planId = parts[2];
        await subscriptionService.activateSubscription(user.id, planId, referenceId);
      } else if (referenceId.startsWith('pay_')) {
        const parts = referenceId.split('_');
        const numImages = parseInt(parts[2]);
        await subscriptionService.addImages(user.id, numImages);
      }
      
      setShowPaymentModal(false);
      
      // Proceed with generation
      await handleGenerate(pendingFormData);
      setPendingFormData(null);
    } catch (error) {
      console.error('Payment processing error:', error);
      setError('Payment processing failed. Please try again.');
    }
  };

  const handleBackToCategories = () => {
    setCurrentStep('category');
    setSelectedCategory(null);
    setGeneratedImages([]);
    setLastGenerationData(null);
    setError(null);
    setIsGenerating(false);
  };
  
  const handleBackToGenerator = () => {
    setCurrentStep('generator');
    setGeneratedImages([]);
    setError(null);
    setIsGenerating(false);
  };

  const handleGenerateAgain = () => {
    if (lastGenerationData) {
      handleGenerate(lastGenerationData);
    }
  };
  
  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setPendingFormData(null);
  };
  
  const handleSubscriptionSuccess = async (referenceId: string) => {
    if (!user) return;
    
    const parts = referenceId.split('_');
    const planId = parts[2];
    subscriptionService.activateSubscription(user.id, planId, referenceId);
    
    setShowSubscriptionModal(false);
  };
  
  const handleViewHistory = () => {
    setCurrentStep('history');
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
              isGenerating={isGenerating}
            />
          );
        }
        return null;
      case 'loading':
        return <LoadingIndicator progress={generationProgress} />;
      case 'result':
        return <ImageResult images={generatedImages} onBack={handleBackToGenerator} onGenerateAgain={handleGenerateAgain} onGoHome={handleBackToCategories} />;
      case 'history':
        return <History onBack={handleBackToCategories} />;
      default:
        return <CategorySelector categories={CATEGORIES} onSelect={handleCategorySelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6 sm:px-6 lg:px-8">
       <header className="w-full max-w-5xl mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="hidden sm:block flex-1"></div>
            <div onClick={handleBackToCategories} className="cursor-pointer inline-block group text-center" title={t('tooltip_go_home')}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {t('app_header_new')} 💼
              </h1>
              <p className="mt-2 text-sm sm:text-md lg:text-lg text-gray-600">
                {t('app_subheader_new')}
              </p>
            </div>
            <div className="flex items-center space-x-2 flex-1 sm:justify-end justify-center">
                <UserStats userId={user.id} />
                <button 
                  onClick={handleViewHistory}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  {t('view_history')}
                </button>
                <SubscriptionButton userId={user.id} onOpenModal={() => setShowSubscriptionModal(true)} />
                <button 
                  onClick={async () => {
                    const { error } = await signOut();
                    if (error) console.error('Sign out error:', error);
                  }}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
                >
                  {t('sign_out')}
                </button>
                <button onClick={() => setLocale('ar')} className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md ${locale === 'ar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>AR</button>
                <button onClick={() => setLocale('en')} className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md ${locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>EN</button>
            </div>
        </div>
      </header>
      <main className="w-full flex justify-center">
        {renderContent()}
      </main>
      <footer className="w-full text-center mt-8 sm:mt-12 px-4 text-gray-500 text-xs sm:text-sm">
       
      </footer>
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handleClosePaymentModal}
        onPaymentSuccess={handlePaymentSuccess}
        numImages={pendingFormData ? parseInt((pendingFormData.numImages as string || 'option_numImages_3').split('_').pop() || '3', 10) : 3}
        userId={user.id}
      />
      
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscriptionSuccess}
        userId={user.id}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LocalizationProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LocalizationProvider>
  );
};

export default App;