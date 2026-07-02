import type { Locale } from "@/lib/i18n/locale";

// Technology names are proper nouns — identical in every locale, so this
// list stays a plain array (not `Record<Locale, T>`). Only the section
// label below is translated.
export const technologies: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Swift",
  "Node.js",
  "PostgreSQL",
  "Cloudflare",
  "Stripe",
];

/**
 * Inline copy for the "Technologies" section eyebrow
 * (`components/sections/technologies.tsx`), colocated here rather than in
 * `content/i18n/messages.ts` (owned by a sibling workstream). "Technologies"
 * is spelled the same in French, so both locales share the same label.
 */
export type TechnologiesCopy = { label: string };

export const technologiesCopy: Record<Locale, TechnologiesCopy> = {
  en: { label: "Technologies" },
  fr: { label: "Technologies" },
};
