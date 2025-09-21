import React, { useState } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { subscriptionService, PER_IMAGE_PRICE } from '../services/subscriptionService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (referenceId: string) => void;
  numImages: number;
  userId: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess, numImages, userId }) => {
  const { t } = useLocalization();
  const [loading, setLoading] = useState(false);
  
  const totalAmount = numImages * PER_IMAGE_PRICE;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { paymentUrl, referenceId } = await subscriptionService.createOneTimePayment(userId, numImages);
      
      // Store reference ID for later verification
      sessionStorage.setItem('pendingPayment', referenceId);
      
      // Open payment link in new window
      window.open(paymentUrl, '_blank');
      
      // For demo purposes, simulate payment success after 3 seconds
      setTimeout(() => {
        onPaymentSuccess(referenceId);
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert(t('payment_error'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{t('payment_title')}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span>{t('payment_item')}</span>
            <span>{numImages} {t('payment_images')}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>{t('payment_price_per_image')}</span>
            <span>{PER_IMAGE_PRICE.toLocaleString()} IQD</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>{t('payment_total')}</span>
            <span>{totalAmount.toLocaleString()} IQD</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            {t('payment_cancel')}
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? t('payment_processing') : t('payment_pay')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;