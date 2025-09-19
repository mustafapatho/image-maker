import { createPaymentLink } from './waylPayment';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  imagesPerMonth: number;
  currency: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 25000, // 25,000 IQD
    imagesPerMonth: 50,
    currency: 'IQD'
  },
  {
    id: 'pro',
    name: 'Pro Plan', 
    price: 45000, // 45,000 IQD
    imagesPerMonth: 100,
    currency: 'IQD'
  },
  {
    id: 'unlimited',
    name: 'Unlimited Plan',
    price: 75000, // 75,000 IQD
    imagesPerMonth: 999,
    currency: 'IQD'
  }
];

interface UserSubscription {
  planId: string;
  startDate: string;
  endDate: string;
  imagesUsed: number;
  status: 'active' | 'expired' | 'cancelled';
}

export const createSubscriptionPayment = async (planId: string, userId: string) => {
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  if (!plan) throw new Error('Plan not found');

  const referenceId = `sub-${planId}-${userId}-${Date.now()}`;
  
  return await createPaymentLink({
    referenceId,
    total: plan.price,
    currency: plan.currency,
    lineItem: [{
      label: `${plan.name} - Monthly Subscription`,
      amount: plan.price,
      type: 'increase'
    }],
    redirectionUrl: window.location.origin
  });
};

export const getUserSubscription = (): UserSubscription | null => {
  const sub = localStorage.getItem('user_subscription');
  return sub ? JSON.parse(sub) : null;
};

export const setUserSubscription = (subscription: UserSubscription) => {
  localStorage.setItem('user_subscription', JSON.stringify(subscription));
};

export const isSubscriptionActive = (): boolean => {
  const sub = getUserSubscription();
  if (!sub) return false;
  
  const now = new Date();
  const endDate = new Date(sub.endDate);
  
  return sub.status === 'active' && now <= endDate;
};

export const getRemainingImages = (): number => {
  const sub = getUserSubscription();
  if (!sub || !isSubscriptionActive()) return 0;
  
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === sub.planId);
  if (!plan) return 0;
  
  return Math.max(0, plan.imagesPerMonth - sub.imagesUsed);
};

export const useImage = (): boolean => {
  const sub = getUserSubscription();
  if (!sub || !isSubscriptionActive()) return false;
  
  const remaining = getRemainingImages();
  if (remaining <= 0) return false;
  
  sub.imagesUsed += 1;
  setUserSubscription(sub);
  return true;
};