import { waylPaymentService } from './waylPaymentService';

interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  imagesRemaining: number;
  totalImages: number;
  createdAt: string;
  updatedAt: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  images: number;
  duration: number; // days
}

// Subscription plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 19000,
    currency: 'IQD',
    images: 100,
    duration: 30,
  },
  {
    id: 'pro',
    name: 'Pro Plan', 
    price: 39000,
    currency: 'IQD',
    images: 250,
    duration: 30,
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 69000,
    currency: 'IQD',
    images: 500,
    duration: 30,
  },
];

// Per-image pricing
export const PER_IMAGE_PRICE = 2000; // IQD

class SubscriptionService {
  private getStorageKey(userId: string): string {
    return `subscription_${userId}`;
  }

  private getUsageKey(userId: string): string {
    return `usage_${userId}`;
  }

  getCurrentSubscription(userId: string): Subscription | null {
    try {
      const stored = localStorage.getItem(this.getStorageKey(userId));
      if (!stored) return null;
      
      const subscription: Subscription = JSON.parse(stored);
      
      // Check if subscription is expired
      if (new Date(subscription.endDate) < new Date()) {
        subscription.status = 'expired';
        this.saveSubscription(subscription);
      }
      
      return subscription;
    } catch {
      return null;
    }
  }

  private saveSubscription(subscription: Subscription): void {
    localStorage.setItem(this.getStorageKey(subscription.userId), JSON.stringify(subscription));
  }

  async createSubscription(userId: string, planId: string): Promise<{ paymentUrl: string; referenceId: string }> {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Invalid subscription plan');
    }

    const referenceId = `sub_${userId}_${planId}_${Date.now()}`;
    
    const paymentLink = await waylPaymentService.createPaymentLink({
      referenceId,
      amount: plan.price,
      description: `${plan.name} - ${plan.images} images for ${plan.duration} days`,
    });

    return {
      paymentUrl: paymentLink.url,
      referenceId,
    };
  }

  async createOneTimePayment(userId: string, numImages: number): Promise<{ paymentUrl: string; referenceId: string }> {
    const amount = numImages * PER_IMAGE_PRICE;
    const referenceId = `pay_${userId}_${numImages}_${Date.now()}`;
    
    const paymentLink = await waylPaymentService.createPaymentLink({
      referenceId,
      amount,
      description: `${numImages} AI Generated Images`,
      numImages,
    });

    return {
      paymentUrl: paymentLink.url,
      referenceId,
    };
  }

  activateSubscription(userId: string, planId: string, referenceId: string): Subscription {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Invalid subscription plan');
    }

    const now = new Date();
    const endDate = new Date(now.getTime() + plan.duration * 24 * 60 * 60 * 1000);

    const subscription: Subscription = {
      id: referenceId,
      userId,
      planId,
      status: 'active',
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      imagesRemaining: plan.images,
      totalImages: plan.images,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    this.saveSubscription(subscription);
    return subscription;
  }

  addImages(userId: string, numImages: number): void {
    // For one-time payments, we'll track usage separately
    const usageKey = this.getUsageKey(userId);
    const currentUsage = parseInt(localStorage.getItem(usageKey) || '0');
    localStorage.setItem(usageKey, (currentUsage + numImages).toString());
  }

  useImage(userId: string): boolean {
    const subscription = this.getCurrentSubscription(userId);
    
    if (subscription && subscription.status === 'active' && subscription.imagesRemaining > 0) {
      // Use subscription image
      subscription.imagesRemaining--;
      subscription.updatedAt = new Date().toISOString();
      this.saveSubscription(subscription);
      return true;
    }
    
    // Check one-time payment images
    const usageKey = this.getUsageKey(userId);
    const availableImages = parseInt(localStorage.getItem(usageKey) || '0');
    
    if (availableImages > 0) {
      localStorage.setItem(usageKey, (availableImages - 1).toString());
      return true;
    }
    
    return false;
  }

  getRemainingImages(userId: string): number {
    const subscription = this.getCurrentSubscription(userId);
    let remaining = 0;
    
    if (subscription && subscription.status === 'active') {
      remaining += subscription.imagesRemaining;
    }
    
    // Add one-time payment images
    const usageKey = this.getUsageKey(userId);
    const oneTimeImages = parseInt(localStorage.getItem(usageKey) || '0');
    remaining += oneTimeImages;
    
    return remaining;
  }

  isSubscriptionActive(userId: string): boolean {
    const subscription = this.getCurrentSubscription(userId);
    return subscription?.status === 'active' || false;
  }

  hasAvailableImages(userId: string): boolean {
    return this.getRemainingImages(userId) > 0;
  }
}

export const subscriptionService = new SubscriptionService();

// Legacy functions for backward compatibility
export const isSubscriptionActive = () => false; // Will be updated to use user context
export const getRemainingImages = () => 0; // Will be updated to use user context  
export const useImage = () => false; // Will be updated to use user context