
"use client";
 
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Locale, translations } from "./translations";
 
interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  hydrated: boolean;
}
 
const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);
 
const STORAGE_KEY = "hms_locale";
 
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";

    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    return saved && translations[saved] ? saved : "en";
  });
  const hydrated = typeof window !== "undefined";

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);
 
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
 

  const t = useCallback(
    (key: string) => {
      return translations[locale]?.[key] ?? translations.en[key] ?? key;
    },
    [locale]
  );
 
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, hydrated }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used inside LanguageProvider");
  return ctx;
}