"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

/** The two supported site locales. Add new locales here first — every
 *  `Record<Locale, T>` content module and the `Messages` type will then
 *  force you to fill in the new language everywhere it's needed. */
export type Locale = "en" | "fr";

type LocaleContextValue = {
  locale: Locale;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Route-based locale: English lives at the root (`/`, `/services/`, …),
  // French lives under `/fr` (`/fr/`, `/fr/services/`, …). Deriving locale
  // from the URL (rather than localStorage) means the server render and
  // the prerendered HTML for each route are already correct — no
  // client-only flash, no useSyncExternalStore machinery needed.
  //
  // Not importing from `./routing` here on purpose — `routing.ts` imports
  // `Locale` from this module, so importing back would be circular. The
  // `/fr` check is simple enough to inline.
  const pathname = usePathname();
  const locale: Locale =
    pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";

  // DOM side effect only — not React state — so this doesn't trip the
  // repo's `react-hooks/set-state-in-effect` rule.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => ({ locale }), [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/** Read the active locale. Must be called from a descendant of
 *  `LocaleProvider` (wired into `app/providers.tsx`). Any component that
 *  calls this must be a Client Component ("use client"). */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
