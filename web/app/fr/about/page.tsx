import type { Metadata } from "next";
import { altLanguages } from "@/lib/i18n/alternates";
import { AboutContent } from "@/components/about/about-content";

// Mirrors app/about/page.tsx — same content component, which already
// derives locale="fr" from the `/fr` path via useLocale(). Title/description
// reuse existing French copy from content/about.ts (aboutCopy.fr.hero.eyebrow,
// aboutIntro.fr) — see PATTERN.md's "Voice" section: brand names stay
// untranslated.
export const metadata: Metadata = {
  title: "À propos",
  description:
    "J'ai bâti et exploité une plateforme numérique à 7 chiffres comptant plus de 2 600 membres. J'ai géré les paiements, les litiges, le support, les abus et la disponibilité. J'applique cette réflexion systémique aux entreprises par l'entremise de KCOH Software Inc.",
  alternates: {
    canonical: "/fr/about/",
    languages: altLanguages("/about/"),
  },
};

export default function AboutPageFr() {
  return <AboutContent />;
}
