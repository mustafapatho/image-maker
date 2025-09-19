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
  const historyItem: HistoryItem = {
    id: Date.now().toString(),
    categoryName,
    images,
    createdAt: new Date().toISOString(),
    formData
  };

  const existingHistory = localStorage.getItem('imageHistory');
  const history: HistoryItem[] = existingHistory ? JSON.parse(existingHistory) : [];
  
  history.unshift(historyItem); // Add to beginning
  
  // Keep only last 50 items
  if (history.length > 50) {
    history.splice(50);
  }
  
  localStorage.setItem('imageHistory', JSON.stringify(history));
};

export const getHistory = (): HistoryItem[] => {
  const savedHistory = localStorage.getItem('imageHistory');
  return savedHistory ? JSON.parse(savedHistory) : [];
};

export const clearHistory = (): void => {
  localStorage.removeItem('imageHistory');
};