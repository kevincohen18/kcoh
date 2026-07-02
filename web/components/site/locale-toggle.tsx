"use client";

import { useLocale, type Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Locale; label: string; ariaLabel: string }[] = [
  { value: "en", label: "EN", ariaLabel: "Switch to English" },
  { value: "fr", label: "FR", ariaLabel: "Switch to French" },
];

/**
 * EN / FR segmented control, styled to match ThemeToggle's pill footprint.
 * `useLocale()` already renders "en" on the server and on the first client
 * paint (see lib/i18n/locale.tsx), so — unlike ThemeToggle — no extra
 * mounted-guard is needed here to avoid a hydration mismatch.
 */
export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-0.5 rounded-full border border-border p-0.5"
    >
      {OPTIONS.map((option) => {
        const isActive = locale === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            aria-label={option.ariaLabel}
            onClick={() => setLocale(option.value)}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-fg-muted hover:text-fg",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
