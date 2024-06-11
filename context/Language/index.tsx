"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { t as en } from "@/utils/t/en";
import { t as id } from "@/utils/t/id";

export type Translations = typeof id;

interface LanguageContextProps {
  language: string;
  translations: Translations;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

const translationsMap: Record<string, Translations> = { en, id };

const LOCAL_STORAGE_KEY = "appLanguage";

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<string>("id");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedLanguage && translationsMap[savedLanguage]) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, newLanguage);
    }
  };

  const translations = translationsMap[language];

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
