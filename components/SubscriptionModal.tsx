import React, { useState } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { useAuth } from '../contexts/AuthContext';
import { SUBSCRIPTION_PLANS, createSubscriptionPayment, setUserSubscription } from '../services/subscriptionService';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onSubscribe }) => {
  const { t } = useLocalization();
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!user) return;
    
    setLoading(planId);
    try {
      const paymentLink = await createSubscriptionPayment(planId, user.id);
      
      // Open payment link
      window.open(paymentLink.url, '_blank');
      
      // Simulate subscription activation after payment
      setTimeout(() => {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        
        setUserSubscription({
          planId,
          startDate: new Date().toISOString(),
          endDate: endDate.toISOString(),
          imagesUsed: 0,
          status: 'active'
        });
        
        onSubscribe();
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Subscription error:', error);
      alert(t('payment_error'));
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
                {plan.price.toLocaleString()} {plan.currency}
              </div>
              <div className="text-gray-600 mb-4">{t('subscription_per_month')}</div>
              <div className="mb-6">
                <div className="text-lg font-medium">
                  {plan.imagesPerMonth === 999 ? t('subscription_unlimited') : `${plan.imagesPerMonth} ${t('payment_images')}`}
                </div>
                <div className="text-sm text-gray-500">{t('subscription_per_month')}</div>
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