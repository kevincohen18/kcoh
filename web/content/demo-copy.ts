import type { Locale } from "@/lib/i18n/locale";

/**
 * Framing copy for the `/dashboard` live demo page — the heading, intro
 * paragraph, and CTA back to `/contact/` only. The demo widgets themselves
 * (`components/dashboard/**`) render illustrative mock product UI and are
 * intentionally NOT covered by this module. See `web/lib/i18n/PATTERN.md`.
 */
export type DemoCopy = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  simulatedNote: string;
  ctaText: string;
  ctaButton: string;
};

export const demoCopy: Record<Locale, DemoCopy> = {
  en: {
    hero: {
      eyebrow: "Product demo",
      title: "The operations dashboard we build for you.",
      intro:
        "This is the kind of system we build — click around. Switch screens, sort the invoices, hover the charts, and flip the theme.",
    },
    simulatedNote: "Simulated data. The components are the ones we ship.",
    ctaText:
      "Want a system like this behind your business? It starts with a conversation.",
    ctaButton: "Start the conversation",
  },
  fr: {
    hero: {
      eyebrow: "Démo produit",
      title: "Le tableau de bord opérationnel que nous bâtissons pour vous.",
      intro:
        "Voici le type de système que nous bâtissons — explorez-le. Changez d'écran, triez les factures, survolez les graphiques et basculez le thème.",
    },
    simulatedNote: "Données simulées. Les composants sont ceux que nous livrons.",
    ctaText:
      "Vous voulez un système comme celui-ci derrière votre entreprise ? Tout commence par une conversation.",
    ctaButton: "Démarrer la conversation",
  },
};
