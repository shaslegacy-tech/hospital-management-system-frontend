"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface AccessibilityContextValue {
  largeText: boolean;
  highContrast: boolean;
  toggleLargeText: () => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(
  undefined
);

const LARGE_TEXT_KEY = "hms_large_text";
const HIGH_CONTRAST_KEY = "hms_high_contrast";

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedLargeText = localStorage.getItem(LARGE_TEXT_KEY) === "true";
    const savedHighContrast = localStorage.getItem(HIGH_CONTRAST_KEY) === "true";
    setLargeText(savedLargeText);
    setHighContrast(savedHighContrast);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("large-text", largeText);
  }, [largeText]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  const toggleLargeText = useCallback(() => {
    setLargeText((prev) => {
      const next = !prev;
      localStorage.setItem(LARGE_TEXT_KEY, String(next));
      return next;
    });
  }, []);

  const toggleHighContrast = useCallback(() => {
    setHighContrast((prev) => {
      const next = !prev;
      localStorage.setItem(HIGH_CONTRAST_KEY, String(next));
      return next;
    });
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{ largeText, highContrast, toggleLargeText, toggleHighContrast }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used inside AccessibilityProvider");
  return ctx;
}