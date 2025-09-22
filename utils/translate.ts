import { locales, Locale } from '../i18n/locales';

const getNestedValue = (obj: any, path: string): string | undefined => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const translate = (key: string, replacements?: Record<string, string | number>): string => {
  const locale = (localStorage.getItem('app_locale') as Locale) || 'ar';
  const translations = locales[locale];
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
};