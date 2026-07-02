import type { Locale } from "@/lib/i18n/locale";

/**
 * Rewrite an unlocalized internal href for the given locale.
 * English stays as-is (English is the root locale). French paths gain a
 * `/fr` prefix. Non-internal hrefs (hashes, external URLs, `mailto:`,
 * `tel:`) and hrefs already under `/fr` pass through unchanged.
 */
export function localizedPath(href: string, locale: Locale): string {
  if (locale === "en") return href;
  if (!href.startsWith("/")) return href; // "#work", "http…", "mailto:", "tel:"
  if (href === "/fr" || href.startsWith("/fr/")) return href;
  if (href === "/") return "/fr/";
  return `/fr${href}`; // "/services/" -> "/fr/services/"
}

/** Strip the `/fr` prefix (if any) from a pathname, returning the English
 *  (unlocalized) equivalent. */
export function unlocalizedPath(pathname: string): string {
  if (pathname === "/fr" || pathname === "/fr/") return "/";
  if (pathname.startsWith("/fr/")) return pathname.slice(3);
  return pathname;
}
