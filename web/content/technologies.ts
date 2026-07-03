import type { Locale } from "@/lib/i18n/locale";

// Technology names are proper nouns — identical in every locale, so this
// list stays a plain array (not `Record<Locale, T>`). Only the section
// label below is translated.
// A broad, honest sample of what we build with (not every project uses all of
// them). Ordered to interleave categories so the marquee reads as varied.
// If this count changes, keep the marquee speed steady by scaling the
// `.tech-marquee__track` animation duration in globals.css (~4.25s per item).
export const technologies: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Python",
  "Node.js",
  "Express",
  "Swift",
  "Go",
  "React Native",
  "Vue",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Redis",
  "Prisma",
  "GraphQL",
  "Docker",
  "Cloudflare",
  "AWS",
  "Vercel",
  "Railway",
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
