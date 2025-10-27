import { supabase } from './supabase';
import { waylPaymentService } from './waylPaymentService';
import { translate } from '../utils/translate';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  images_included: number;
  duration_days: number;
}

// Per-image pricing
export const PER_IMAGE_PRICE = 2000; // IQD

// Default subscription plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'monthly_100',
    name: 'Monthly Plan',
    price: 15000,
    currency: 'IQD',
    images_included: 100,
    duration_days: 30
  }
];

class SubscriptionService {
  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    // Always return hardcoded plans to ensure correct pricing
    return SUBSCRIPTION_PLANS;
  }

  async getCurrentSubscription(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .gt('end_date', new Date().toISOString())
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.warn('getCurrentSubscription error:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.warn('getCurrentSubscription failed:', error);
      return null;
    }
  }

  async getUserCredits(userId: string) {
    const { data, error } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async createSubscription(userId: string, planId: string): Promise<{ paymentUrl: string; referenceId: string }> {
    console.log('Creating subscription for planId:', planId);
    const plans = await this.getSubscriptionPlans();
    console.log('Available plans:', plans);
    let plan = plans.find(p => p.id === planId);
    console.log('Found plan:', plan);
    if (!plan && plans.length > 0) {
      console.warn('Plan not found, using first available plan');
      plan = plans[0];
    }
    if (!plan) {
      console.error('No plans available');
      throw new Error(translate('invalid_subscription_plan'));
    }

    const referenceId = `sub_${userId}_${planId}_${Date.now()}`;
    
    // Create payment record
    await supabase.from('payments').insert({
      user_id: userId,
      reference_id: referenceId,
      payment_type: 'subscription',
      plan_id: planId,
      amount: plan.price,
      status: 'pending',
      payment_method: 'wayl'
    });
    
    const paymentLink = await waylPaymentService.createPaymentLink({
      referenceId,
      amount: plan.price,
      description: `${plan.name} - ${plan.images_included} ${translate('images_for_days', { days: plan.duration_days })}`,
    });

    return { paymentUrl: paymentLink.url, referenceId };
  }

  async createOneTimePayment(userId: string, numImages: number): Promise<{ paymentUrl: string; referenceId: string }> {
    const amount = numImages * PER_IMAGE_PRICE;
    const referenceId = `pay_${userId}_${numImages}_${Date.now()}`;
    
    // Create payment record
    await supabase.from('payments').insert({
      user_id: userId,
      reference_id: referenceId,
      payment_type: 'one_time',
      amount,
      status: 'pending',
      payment_method: 'wayl',
      images_purchased: numImages
    });
    
    const paymentLink = await waylPaymentService.createPaymentLink({
      referenceId,
      amount,
      description: `${numImages} ${translate('ai_generated_images')}`,
      numImages,
    });

    return { paymentUrl: paymentLink.url, referenceId };
  }

  async activateSubscription(userId: string, planId: string, referenceId: string) {
    const plans = await this.getSubscriptionPlans();
    const plan = plans.find(p => p.id === planId);
    if (!plan) throw new Error(translate('invalid_subscription_plan'));

    const now = new Date();
    const endDate = new Date(now.getTime() + plan.duration_days * 24 * 60 * 60 * 1000);

    // Create subscription
    const { data: subscription } = await supabase.from('user_subscriptions').insert({
      user_id: userId,
      plan_id: planId,
      status: 'active',
      images_remaining: plan.images_included,
      total_images: plan.images_included,
      start_date: now.toISOString(),
      end_date: endDate.toISOString(),
      payment_reference: referenceId
    }).select().single();

    // Update payment status
    await supabase.from('payments')
      .update({ status: 'completed', payment_date: now.toISOString() })
      .eq('reference_id', referenceId);

    // Ensure user profile exists and set as premium
    await supabase.from('user_profiles')
      .upsert({ 
        id: userId, 
        is_premium: true,
        updated_at: now.toISOString()
      });

    return subscription;
  }

  async addImages(userId: string, numImages: number) {
    const { data: credits, error } = await supabase.from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (credits) {
      await supabase.from('user_credits')
        .update({ 
          credits_available: credits.credits_available + numImages,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);
    } else {
      await supabase.from('user_credits')
        .insert({ 
          user_id: userId, 
          credits_available: numImages,
          credits_used: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
    }

    // Ensure user profile exists and set as premium
    await supabase.from('user_profiles')
      .upsert({ 
        id: userId, 
        is_premium: true,
        updated_at: new Date().toISOString()
      });
  }

  async useImage(userId: string): Promise<boolean> {
    // Check if user is premium and needs monthly quota
    const isPremium = await this.isPremiumUser(userId);
    if (isPremium) {
      await this.ensurePremiumSubscription(userId);
    }
    
    // Try subscription first
    const subscription = await this.getCurrentSubscription(userId);
    if (subscription && subscription.images_remaining > 0) {
      await supabase.from('user_subscriptions')
        .update({ images_remaining: subscription.images_remaining - 1 })
        .eq('id', subscription.id);
      return true;
    }
    
    // Try credits
    const credits = await this.getUserCredits(userId);
    if (credits && credits.credits_available > 0) {
      const { error } = await supabase.from('user_credits')
        .update({ 
          credits_available: credits.credits_available - 1,
          credits_used: (credits.credits_used || 0) + 1,
          last_used_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);
      
      if (error) {
        console.error('Error updating credits:', error);
        return false;
      }
      return true;
    }
    
    return false;
  }

  async getRemainingImages(userId: string): Promise<number> {
    let remaining = 0;
    
    // Check if user is premium and needs monthly quota
    const isPremium = await this.isPremiumUser(userId);
    if (isPremium) {
      await this.ensurePremiumSubscription(userId);

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const { data: monthlyUsage } = await supabase
        .from('image_history')
        .select('id')
        .eq('user_id', userId)
        .gte('created_at', startOfMonth.toISOString());
      
      const usedThisMonth = monthlyUsage?.length || 0;
      remaining = Math.max(0, 100 - usedThisMonth);
    } else {
      const subscription = await this.getCurrentSubscription(userId);
      if (subscription) {
        remaining += subscription.images_remaining;
      }
      
      const credits = await this.getUserCredits(userId);
      if (credits) {
        remaining += credits.credits_available;
      }
    }
    
    return remaining;
  }

  async isSubscriptionActive(userId: string): Promise<boolean> {
    const subscription = await this.getCurrentSubscription(userId);
    return !!subscription;
  }

  async hasAvailableImages(userId: string): Promise<boolean> {
    const remaining = await this.getRemainingImages(userId);
    return remaining > 0;
  }

  async isPremiumUser(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('is_premium')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.warn('Failed to check premium status:', error);
        return false;
      }
      
      return data?.is_premium || false;
    } catch (error) {
      console.warn('isPremiumUser failed:', error);
      return false;
    }
  }

  async updateTotalImagesGenerated(userId: string, count: number): Promise<void> {
    console.log(`Updating total_images_generated for user ${userId} with count ${count}`);
    try {
      // Get current count
      const { data: profile, error: selectError } = await supabase
        .from('user_profiles')
        .select('total_images_generated')
        .eq('id', userId)
        .single();
      
      if (selectError && selectError.code !== 'PGRST116') {
        console.error('Error selecting profile:', selectError);
      }
      
      const currentCount = profile?.total_images_generated || 0;
      const newCount = currentCount + count;
      
      console.log(`Current count: ${currentCount}, adding: ${count}, new total: ${newCount}`);
      
      // Use direct SQL to avoid constraint issues
      const { data: updateResult, error: updateError } = await supabase
        .rpc('update_user_total_images', {
          user_id: userId,
          new_count: newCount
        });
      
      if (updateError) {
        console.error('Failed to update total_images_generated:', updateError);
        throw updateError;
      }
      
      console.log('Successfully updated total_images_generated:', updateResult);
    } catch (error) {
      console.error('Error in updateTotalImagesGenerated:', error);
      throw error;
    }
  }

  async ensurePremiumSubscription(userId: string) {
    const subscription = await this.getCurrentSubscription(userId);
    const now = new Date();
    
    // Calculate remaining based on monthly usage
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const { data: monthlyUsage } = await supabase
      .from('image_history')
      .select('id')
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString());
    
    const usedThisMonth = monthlyUsage?.length || 0;
    const remaining = Math.max(0, 100 - usedThisMonth);
    
    if (!subscription) {
      // Create new subscription
      const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      await supabase.from('user_subscriptions').insert({
        user_id: userId,
        plan_id: 'monthly_100',
        status: 'active',
        images_remaining: remaining,
        total_images: 100,
        start_date: now.toISOString(),
        end_date: endDate.toISOString(),
        payment_reference: `premium_${userId}_${Date.now()}`
      });
    } else {
      // Update existing subscription with correct remaining count
      await supabase.from('user_subscriptions')
        .update({ images_remaining: remaining })
        .eq('id', subscription.id);
    }
  }
}

export const subscriptionService = new SubscriptionService();