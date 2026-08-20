"use client";

import { useState } from "react";
import { Eye, Type, Contrast } from "lucide-react";
import { useAccessibility } from "@/lib/accessibility/AccessibilityContext";
import { cn } from "@/lib/cn";

export function AccessibilityMenu() {
  const { largeText, highContrast, toggleLargeText, toggleHighContrast } =
    useAccessibility();
  const [open, setOpen] = useState(false);

  const activeCount = (largeText ? 1 : 0) + (highContrast ? 1 : 0);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-ink-100 bg-white text-ink-500 shadow-soft hover:text-ink-900"
        aria-label="Accessibility settings"
      >
        <Eye className="h-4.5 w-4.5" />
        {activeCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-2xl border border-ink-100 bg-white p-2 shadow-card">
            <p className="px-2.5 py-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
              Accessibility
            </p>

            <button
              onClick={toggleLargeText}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left text-sm hover:bg-ink-100",
                largeText && "bg-brand-50"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg",
                  largeText ? "bg-brand-700 text-white" : "bg-ink-100 text-ink-500"
                )}
              >
                <Type className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-ink-900">Large text</p>
                <p className="text-xs text-ink-500">Bigger text and buttons</p>
              </div>
              <div
                className={cn(
                  "h-5 w-9 flex-shrink-0 rounded-full p-0.5 transition-colors",
                  largeText ? "bg-brand-700" : "bg-ink-300"
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full bg-white transition-transform",
                    largeText && "translate-x-4"
                  )}
                />
              </div>
            </button>

            <button
              onClick={toggleHighContrast}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left text-sm hover:bg-ink-100",
                highContrast && "bg-brand-50"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg",
                  highContrast ? "bg-brand-700 text-white" : "bg-ink-100 text-ink-500"
                )}
              >
                <Contrast className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-ink-900">High contrast</p>
                <p className="text-xs text-ink-500">Stronger borders and text</p>
              </div>
              <div
                className={cn(
                  "h-5 w-9 flex-shrink-0 rounded-full p-0.5 transition-colors",
                  highContrast ? "bg-brand-700" : "bg-ink-300"
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full bg-white transition-transform",
                    highContrast && "translate-x-4"
                  )}
                />
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}