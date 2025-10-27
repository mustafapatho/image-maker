import React, { useState, useEffect } from 'react';
import { subscriptionService } from '../services/subscriptionService';
import { supabase } from '../services/supabase';
import { useLocalization } from '../contexts/LocalizationContext';

interface UserStatsProps {
  userId: string;
}

const UserStats: React.FC<UserStatsProps> = ({ userId }) => {
  const [stats, setStats] = useState({ generated: 0, remaining: 0, isPremium: false });
  const [loading, setLoading] = useState(true);
  const { t } = useLocalization();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [remaining, isPremium, subscription, credits] = await Promise.all([
          subscriptionService.getRemainingImages(userId),
          subscriptionService.isPremiumUser(userId),
          subscriptionService.getCurrentSubscription(userId),
          subscriptionService.getUserCredits(userId)
        ]);
        
        // Calculate total and monthly usage from image_history
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        const [monthlyUsageResult, totalUsageResult] = await Promise.all([
          supabase
            .from('image_history')
            .select('images_count')
            .eq('user_id', userId)
            .gte('created_at', startOfMonth.toISOString()),
          supabase
            .from('image_history')
            .select('images_count')
            .eq('user_id', userId)
        ]);
        
        const usedThisMonth = monthlyUsageResult.data?.reduce((sum, item) => sum + (item.images_count || 1), 0) || 0;
        const totalGenerated = totalUsageResult.data?.reduce((sum, item) => sum + (item.images_count || 1), 0) || 0;

        setStats({
          generated: totalGenerated,
          remaining: remaining,
          isPremium
        });
      } catch (error) {
        console.error('Failed to load user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [userId]);

  if (loading) return null;

  return (
    <div className="flex items-center space-x-2 text-xs sm:text-sm">
      <div className="bg-green-100 text-green-800 px-2 py-1 rounded">
        <span className="font-semibold">{stats.generated}</span> used
      </div>
      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
        <span className="font-semibold">{stats.remaining}</span> left
      </div>
    </div>
  );
};

export default UserStats;