"use client";

import { useState } from "react";
import { Languages, Check } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { locales } from "@/lib/i18n/translations";
import { cn } from "@/lib/cn";

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = locales.find((l) => l.code === locale);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 items-center gap-1.5 rounded-2xl border border-ink-100 bg-white px-3 text-xs font-medium text-ink-700 shadow-soft hover:text-ink-900"
        aria-label="Change language"
      >
        <Languages className="h-4 w-4" />
        {current?.nativeLabel}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-2xl border border-ink-100 bg-white py-1.5 shadow-card">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-ink-100",
                  l.code === locale ? "text-brand-700 font-medium" : "text-ink-700"
                )}
              >
                {l.nativeLabel}
                {l.code === locale && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}