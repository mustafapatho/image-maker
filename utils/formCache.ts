const FORM_CACHE_KEY = 'form_cache';

export const saveFormData = (categoryName: string, formData: Record<string, string | File>) => {
  try {
    const cache = getFormCache();
    // Convert File objects to base64 for storage
    const serializableData: Record<string, string> = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          serializableData[key] = reader.result as string;
          cache[categoryName] = serializableData;
          localStorage.setItem(FORM_CACHE_KEY, JSON.stringify(cache));
        };
        reader.readAsDataURL(value);
      } else {
        serializableData[key] = value as string;
      }
    });
    
    // Save non-file data immediately
    cache[categoryName] = serializableData;
    localStorage.setItem(FORM_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('Failed to save form data:', error);
  }
};

export const getFormData = (categoryName: string): Record<string, string> | null => {
  try {
    const cache = getFormCache();
    return cache[categoryName] || null;
  } catch (error) {
    console.warn('Failed to get form data:', error);
    return null;
  }
};

export const clearFormData = (categoryName: string) => {
  try {
    const cache = getFormCache();
    delete cache[categoryName];
    localStorage.setItem(FORM_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('Failed to clear form data:', error);
  }
};

const getFormCache = (): Record<string, Record<string, string>> => {
  try {
    const cached = localStorage.getItem(FORM_CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};