
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../utils/translations";

export type Language = "pt-BR" | "en";

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "pt-BR",
  t: (key: string) => key,
  changeLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Tenta recuperar o idioma salvo no localStorage
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || "pt-BR";
  });

  useEffect(() => {
    // Salva a preferência de idioma
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
