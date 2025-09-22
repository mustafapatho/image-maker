import React, { useState, useEffect } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { subscriptionService } from '../services/subscriptionService';

interface SubscriptionButtonProps {
  userId: string;
  onOpenModal: () => void;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ userId, onOpenModal }) => {
  const { t } = useLocalization();
  const [remainingImages, setRemainingImages] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSubscriptionData = async () => {
      try {
        const [remaining, active, premium] = await Promise.all([
          subscriptionService.getRemainingImages(userId),
          subscriptionService.isSubscriptionActive(userId),
          subscriptionService.isPremiumUser(userId)
        ]);
        setRemainingImages(remaining);
        setIsActive(active);
        setIsPremium(premium);
      } catch (error) {
        console.error('Failed to load subscription data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptionData();
  }, [userId]);

  if (loading) {
    return (
      <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md bg-gray-100 text-gray-700">
        {t('loading')}
      </button>
    );
  }

  if (isPremium) {
    return (
      <div className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md bg-purple-100 text-purple-700">
        Premium User
      </div>
    );
  }

  if (isActive || remainingImages > 0) {
    return (
      <div className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md bg-blue-100 text-blue-700">
        {remainingImages} {t('subscription_remaining')}
      </div>
    );
  }

  return (
    <button 
      onClick={onOpenModal}
      className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition"
    >
      {t('subscription_subscribe')}
    </button>
  );
};

export default SubscriptionButton;