import React, { useState, useEffect } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { useAuth } from '../contexts/AuthContext';
import { getHistory, clearHistory } from '../utils/historyManager';

interface HistoryItem {
  id: string;
  categoryName: string;
  images: string[];
  createdAt: string;
  formData: Record<string, any>;
}

interface HistoryProps {
  onBack: () => void;
}

const History: React.FC<HistoryProps> = ({ onBack }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Show 3 history items per page
  const { t } = useLocalization();
  const { user } = useAuth();

  const loadHistory = async () => {
    if (!user) return;
    setLoading(true);
    const historyData = await getHistory(user.id);
    setHistory(historyData);
    setLoading(false);
  };

  useEffect(() => {
    loadHistory();
  }, [user]);

  // Calculate pagination
  const totalPages = Math.ceil(history.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = history.slice(startIndex, endIndex);

  const handleDownload = (imageUrl: string, index: number, itemId: string) => {
    try {
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = imageUrl;
      a.download = `history_${itemId}_${index + 1}.jpeg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error("Download failed:", e);
      alert(t('alert_download_failed'));
    }
  };

  const handleClearHistory = async () => {
    if (!user || !confirm(t('confirm_clear_history'))) return;
    await clearHistory(user.id);
    setHistory([]);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl px-4">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-800 transition mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{t('history_title')}</h2>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="w-full max-w-4xl px-4">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-800 transition mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{t('history_title')}</h2>
        </div>
        <div className="text-center py-12">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 text-lg">{t('history_empty')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-800 transition mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{t('history_title')}</h2>
        </div>
        <button
          onClick={handleClearHistory}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          {t('clear_history')}
        </button>
      </div>

      {/* History Items */}
      <div className="space-y-6">
        {currentItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.categoryName}</h3>
              <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {item.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`${item.categoryName} ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                    loading="lazy"
                  />
                  <button
                    onClick={() => handleDownload(image, index, item.id)}
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
                  >
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {t('previous') || 'Previous'}
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {t('next') || 'Next'}
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center mt-4 text-sm text-gray-500">
        {t('showing') || 'Showing'} {startIndex + 1}-{Math.min(endIndex, history.length)} {t('of') || 'of'} {history.length} {t('items') || 'items'}
      </div>
    </div>
  );
};

export default History;