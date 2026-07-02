import type { Metadata } from "next";
import { altLanguages } from "@/lib/i18n/alternates";
import { ContactPageContent } from "@/app/contact/contact-page-content";

// Mirrors app/contact/page.tsx — same content component, which already
// derives locale="fr" from the `/fr` path via useLocale(). Title/description
// reuse existing French copy from content/contact.ts (contactPageCopy.fr) —
// see PATTERN.md's "Voice" section: brand names stay untranslated.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Un appel de 30 minutes. Pas de discours de vente, pas de pression. Juste une conversation sur vos systèmes. Délai de réponse moyen : moins de 24 h.",
  alternates: {
    canonical: "/fr/contact/",
    languages: altLanguages("/contact/"),
  },
};

export default function ContactPageFr() {
  return <ContactPageContent />;
}
