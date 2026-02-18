import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations, defaultLang, type Lang, type Translations } from './translations';

interface I18nContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextType>({
  lang: defaultLang,
  t: translations[defaultLang],
  setLang: () => {},
  toggleLang: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const t = translations[lang];

  return (
    <I18nContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function useTranslations() {
  const { t } = useI18n();
  return t;
}
