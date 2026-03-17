"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "./translations";

type TranslationValue = string | { [key: string]: TranslationValue };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Load language from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem("app_lang") as Language;
    if (saved && (saved === "en" || saved === "hi" || saved === "or")) {
      setTimeout(() => setLanguageState(saved), 0);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  // Translation helper function
  const t = (path: string): string => {
    const keys = path.split(".");
    let current: TranslationValue = translations[language] as TranslationValue;
    
    for (const key of keys) {
      if (typeof current === 'object' && current !== null && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if key missing
        let fallback: TranslationValue = translations["en"] as TranslationValue;
        for (const fKey of keys) {
            if (typeof fallback === 'object' && fallback !== null && fallback[fKey] !== undefined) {
                fallback = fallback[fKey];
            } else {
                return path;
            }
        }
        return typeof fallback === 'string' ? fallback : path;
      }
    }
    return typeof current === 'string' ? current : path;
  };

  // Sync html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
