import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, LanguageConfig } from '../types';
import { LANGUAGES, DEFAULT_TRANSLATIONS, TranslationDictionary } from '../translations';

interface LanguageContextType {
  currentLang: SupportedLanguage;
  config: LanguageConfig;
  translations: TranslationDictionary;
  setLanguage: (lang: SupportedLanguage) => void;
  availableLanguages: LanguageConfig[];
  updateTranslationString: (lang: SupportedLanguage, key: keyof TranslationDictionary, value: string) => void;
  resetTranslations: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('insta1000gram_lang') as SupportedLanguage;
    if (saved && LANGUAGES[saved]) return saved;
    return 'en';
  });

  const [customTranslations, setCustomTranslations] = useState<Record<SupportedLanguage, Partial<TranslationDictionary>>>(() => {
    try {
      const stored = localStorage.getItem('insta1000gram_custom_translations');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [activeLanguages] = useState<Record<SupportedLanguage, boolean>>(() => {
    try {
      const stored = localStorage.getItem('insta1000gram_active_langs');
      return stored ? JSON.parse(stored) : { en: true, es: true, fr: true, pt: true, ar: true };
    } catch {
      return { en: true, es: true, fr: true, pt: true, ar: true };
    }
  });

  const config = LANGUAGES[currentLang] || LANGUAGES.en;

  // Sync RTL / LTR and fonts on HTML document element
  useEffect(() => {
    const isRtl = config.dir === 'rtl';
    document.documentElement.dir = config.dir;
    document.documentElement.lang = currentLang;
    
    if (isRtl) {
      document.body.classList.add('font-arabic');
      document.body.setAttribute('data-lang', 'ar');
    } else {
      document.body.classList.remove('font-arabic');
      document.body.removeAttribute('data-lang');
    }

    localStorage.setItem('insta1000gram_lang', currentLang);
  }, [currentLang, config]);

  const setLanguage = (lang: SupportedLanguage) => {
    if (LANGUAGES[lang]) {
      setCurrentLang(lang);
    }
  };

  const updateTranslationString = (lang: SupportedLanguage, key: keyof TranslationDictionary, value: string) => {
    setCustomTranslations((prev) => {
      const updated = {
        ...prev,
        [lang]: {
          ...prev[lang],
          [key]: value,
        },
      };
      localStorage.setItem('insta1000gram_custom_translations', JSON.stringify(updated));
      return updated;
    });
  };

  const resetTranslations = () => {
    setCustomTranslations({} as Record<SupportedLanguage, Partial<TranslationDictionary>>);
    localStorage.removeItem('insta1000gram_custom_translations');
  };

  const mergedTranslations: TranslationDictionary = {
    ...DEFAULT_TRANSLATIONS[currentLang],
    ...(customTranslations[currentLang] || {}),
  };

  const availableLanguages = Object.values(LANGUAGES).map((l) => ({
    ...l,
    active: activeLanguages[l.code] ?? true,
  }));

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        config,
        translations: mergedTranslations,
        setLanguage,
        availableLanguages,
        updateTranslationString,
        resetTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
