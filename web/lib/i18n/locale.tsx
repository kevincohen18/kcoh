"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/** The two supported site locales. Add new locales here first — every
 *  `Record<Locale, T>` content module and the `Messages` type will then
 *  force you to fill in the new language everywhere it's needed. */
export type Locale = "en" | "fr";

const STORAGE_KEY = "kcoh-locale";
const DEFAULT_LOCALE: Locale = "en";

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "fr";
}

// A tiny external store around localStorage, read/written via
// useSyncExternalStore — the same SSR-safe idiom `useMediaQuery` uses for
// `matchMedia`. `getServerSnapshot` always returns the default locale, so
// the server render and the first client (hydration) render always match;
// `getSnapshot` reads the persisted value directly, so any stored "fr" is
// picked up in the render that follows mount. No setState-in-effect needed.
const listeners = new Set<() => void>();

function readStoredLocale(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : DEFAULT_LOCALE;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Locale {
  return readStoredLocale();
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function writeStoredLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // localStorage can throw in private browsing / disabled-storage
    // contexts. Listeners still fire below so in-tab state updates.
  }
  for (const listener of listeners) listener();
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    writeStoredLocale(next);
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/** Read and set the active locale. Must be called from a descendant of
 *  `LocaleProvider` (wired into `app/providers.tsx`). Any component that
 *  calls this must be a Client Component ("use client"). */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
