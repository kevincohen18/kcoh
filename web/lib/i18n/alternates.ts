import type { Metadata } from "next";

/**
 * Build the `alternates.languages` (hreflang) map for a route, given its
 * English (unlocalized) path. English is the root locale; the French
 * equivalent lives under `/fr`.
 */
export function altLanguages(
  enPath: string,
): NonNullable<Metadata["alternates"]>["languages"] {
  const fr = enPath === "/" ? "/fr/" : `/fr${enPath}`;
  return { en: enPath, fr, "x-default": enPath };
}
