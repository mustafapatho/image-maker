interface HistoryItem {
  id: string;
  categoryName: string;
  images: string[];
  createdAt: string;
  formData: Record<string, any>;
}

export const saveToHistory = (
  categoryName: string,
  images: string[],
  formData: Record<string, any>
): void => {
  try {
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      categoryName,
      images,
      createdAt: new Date().toISOString(),
      formData
    };

    const existingHistory = localStorage.getItem('imageHistory');
    const history: HistoryItem[] = existingHistory ? JSON.parse(existingHistory) : [];
    
    history.unshift(historyItem);
    
    // Keep only last 10 items to save space
    if (history.length > 10) {
      history.splice(10);
    }
    
    localStorage.setItem('imageHistory', JSON.stringify(history));
  } catch (error) {
    // If storage is full, clear old data and try again
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('Storage quota exceeded, clearing old history');
      clearHistory();
      // Try saving just this item
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        categoryName,
        images,
        createdAt: new Date().toISOString(),
        formData
      };
      try {
        localStorage.setItem('imageHistory', JSON.stringify([historyItem]));
      } catch {
        console.error('Unable to save to history - storage quota exceeded');
      }
    } else {
      console.error('Error saving to history:', error);
    }
  }
};

export const getHistory = (): HistoryItem[] => {
  const savedHistory = localStorage.getItem('imageHistory');
  return savedHistory ? JSON.parse(savedHistory) : [];
};

export const clearHistory = (): void => {
  localStorage.removeItem('imageHistory');
};