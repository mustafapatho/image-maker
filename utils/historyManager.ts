import { supabase } from '../services/supabase';

interface HistoryItem {
  id: string;
  categoryName: string;
  images: string[];
  createdAt: string;
  formData: Record<string, any>;
  userId: string;
}

export const saveToHistory = async (
  categoryName: string,
  images: string[],
  formData: Record<string, any>,
  userId: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('image_history')
      .insert({
        category_name: categoryName,
        images,
        form_data: formData,
        user_id: userId,
        images_count: images.length,
        cost_type: 'subscription' // Will be determined by payment logic
      });

    if (error) {
      console.error('Error saving to history:', error);
    }
    
    // Update user's total images generated
    await supabase.rpc('increment_user_images', {
      user_id: userId,
      count: images.length
    });
  } catch (error) {
    console.error('Error saving to history:', error);
  }
};

export const getHistory = async (userId: string): Promise<HistoryItem[]> => {
  try {
    const { data, error } = await supabase
      .from('image_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching history:', error);
      return [];
    }

    return data.map(item => ({
      id: item.id,
      categoryName: item.category_name,
      images: item.images,
      createdAt: item.created_at,
      formData: item.form_data,
      userId: item.user_id
    }));
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};

export const clearHistory = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('image_history')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Error clearing history:', error);
    }
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};