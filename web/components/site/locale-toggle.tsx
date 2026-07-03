"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedPath, unlocalizedPath } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * EN / FR segmented control, styled to match ThemeToggle's pill footprint.
 * Navigates between the English (`/…`) and French (`/fr/…`) equivalents of
 * the current route — locale is a routing concern now, not client state, so
 * this renders plain `next/link`s instead of calling a setter.
 */
export function LocaleToggle() {
  const pathname = usePathname();
  const isFr = pathname === "/fr" || pathname.startsWith("/fr/");

  const enHref = unlocalizedPath(pathname);
  const frHref = localizedPath(enHref, "fr");

  const options = [
    { value: "en" as const, label: "EN", ariaLabel: "Switch to English", href: enHref },
    { value: "fr" as const, label: "FR", ariaLabel: "Switch to French", href: frHref },
  ];

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-0.5 rounded-full border border-border p-0.5"
    >
      {options.map((option) => {
        const isActive = isFr ? option.value === "fr" : option.value === "en";
        return (
          <Link
            key={option.value}
            href={option.href}
            scroll={false}
            aria-current={isActive ? "true" : undefined}
            aria-label={option.ariaLabel}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-fg-muted hover:text-fg",
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
