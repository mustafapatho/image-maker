import React from 'react';
import type { Category } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface CategorySelectorProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelect }) => {
  const { t } = useLocalization();

  return (
    <div className="w-full max-w-6xl px-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-700 mb-2">{t('category_selector_title')}</h2>
      <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">{t('category_selector_subtitle')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category)}
            className="group bg-white p-4 sm:p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left flex flex-col items-center text-center min-h-[140px] sm:min-h-[160px]"
          >
            <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                {category.icon}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">{t(category.nameKey)}</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-3">{t(category.descriptionKey)}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;