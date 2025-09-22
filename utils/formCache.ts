const FORM_CACHE_KEY = 'form_cache';

export const saveFormData = (categoryName: string, formData: Record<string, string | File>) => {
  try {
    const cache = getFormCache();
    // Only save non-file data to avoid quota issues
    const serializableData: Record<string, string> = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      if (!(value instanceof File)) {
        serializableData[key] = value as string;
      }
    });
    
    cache[categoryName] = serializableData;
    localStorage.setItem(FORM_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      // Clear old cache and try again
      localStorage.removeItem(FORM_CACHE_KEY);
      try {
        const newCache = { [categoryName]: {} };
        Object.entries(formData).forEach(([key, value]) => {
          if (!(value instanceof File)) {
            newCache[categoryName][key] = value as string;
          }
        });
        localStorage.setItem(FORM_CACHE_KEY, JSON.stringify(newCache));
      } catch {
        console.warn('LocalStorage quota exceeded, form caching disabled');
      }
    }
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