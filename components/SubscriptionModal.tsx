import React, { useState } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { subscriptionService, SUBSCRIPTION_PLANS } from '../services/subscriptionService';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (referenceId: string) => void;
  userId: string;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onSubscribe, userId }) => {
  const { t } = useLocalization();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);
    try {
      const { paymentUrl, referenceId } = await subscriptionService.createSubscription(userId, planId);
      
      // Store reference ID for later verification
      sessionStorage.setItem('pendingSubscription', referenceId);
      
      // Open payment link
      window.open(paymentUrl, '_blank');
      
      // Close modal and let webhook handle success
      onClose();
      
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Subscription failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">{t('subscription_title')}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div key={plan.id} className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
              <div className="text-3xl font-bold mb-2">
                {plan.price.toLocaleString()} IQD
              </div>
              <div className="text-gray-600 mb-4">{t('subscription_per_month')}</div>
              <div className="mb-6">
                <div className="text-lg font-medium">
                  {plan.images_included === 999 ? t('subscription_unlimited') : `${plan.images_included} ${t('payment_images')}`}
                </div>
                <div className="text-sm text-gray-500">{plan.duration_days} {t('subscription_days')}</div>
              </div>
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading === plan.id ? t('payment_processing') : t('subscription_subscribe')}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>{t('subscription_note')}</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;