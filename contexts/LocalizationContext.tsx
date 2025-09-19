import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { locales, Locale, Translations } from '../i18n/locales';

interface LocalizationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  // FIX: Updated `t` function signature to accept an optional `replacements` object.
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const getNestedValue = (obj: any, path: string): string | undefined => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('ko');

  // FIX: Updated `t` function to handle placeholder replacements.
  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    const translations = locales[locale] as Translations;
    const value = getNestedValue(translations, key) || getNestedValue(locales.en, key);
    
    if (typeof value === 'string') {
        let result = value;
        if (replacements) {
            for (const placeholder in replacements) {
                result = result.replace(new RegExp(`{${placeholder}}`, 'g'), String(replacements[placeholder]));
            }
        }
        return result;
    }

    return key;
  }, [locale]);

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};