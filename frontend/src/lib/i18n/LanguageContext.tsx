"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "en" | "hi" | "or";

import { translations } from "./translations";

type ContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<ContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = (path: string) => {
    const keys = path.split(".");
    let result: unknown = translations[lang];
    for (const key of keys) {
      if (result && typeof result === "object") {
        result = (result as Record<string, unknown>)[key];
      } else {
        return path;
      }
    }
    return typeof result === "string" ? result : path;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
