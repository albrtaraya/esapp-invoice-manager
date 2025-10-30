"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { type Language } from "@/app/(frontend)/(page)/translations"

interface LanguageContextType {
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("es");
  
    return (
      <LanguageContext.Provider
        value={{
            language,
            setLanguage
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
}

export function useLanguageContext(): LanguageContextType {
    const context = useContext(LanguageContext);
    if (!context) {
      throw new Error("useLanguageContext debe usarse dentro de un LanguageProvider");
    }
    return context;
  }
  