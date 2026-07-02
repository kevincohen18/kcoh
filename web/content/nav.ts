import type { Locale } from "@/lib/i18n/locale";

export type NavLink = { label: string; href: string };

/**
 * Structured bilingual content (see `content/proof.ts` for the pattern
 * writeup). Routes (`href`) never change between locales — only labels do —
 * so select the active list with `navLinks[locale]` and keep using `l.href`
 * for links/keys.
 */
export const navLinks: Record<Locale, NavLink[]> = {
  en: [
    { label: "Services", href: "/services/" },
    { label: "Work", href: "/work/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],
  fr: [
    { label: "Services", href: "/services/" },
    { label: "Réalisations", href: "/work/" },
    { label: "À propos", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],
};

export const CAL_URL = "https://cal.com/kevin-cohen-utwpmj/consultation";
export const CONTACT_EMAIL = "inquiries@kcoh.ca";
export const LINKEDIN_URL =
  "https://ca.linkedin.com/in/kevin-cohen-entrepreneur";
