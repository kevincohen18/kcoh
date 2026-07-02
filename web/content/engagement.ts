import type { Locale } from "@/lib/i18n/locale";

/**
 * Structured bilingual content pattern (see `web/lib/i18n/PATTERN.md`):
 * `n` is a stable identifier (used for the numbered badge and as the React
 * key in `components/services/engagement-strip.tsx`), unchanged across
 * locales.
 */
export type EngagementStep = {
  n: number;
  title: string;
  body: string;
  meta: string;
};

export const engagementSteps: Record<Locale, EngagementStep[]> = {
  en: [
    {
      n: 1,
      title: "Discovery Call",
      body: "A 30-minute call. No pitch, no pressure. Just a conversation about your systems and where the leverage is.",
      meta: "30 minutes",
    },
    {
      n: 2,
      title: "Proposal",
      body: "We scope the workflows with you, then provide a fixed quote. Project-based pricing, no hourly billing, no surprises.",
      meta: "Fixed quote after discovery",
    },
    {
      n: 3,
      title: "Build",
      body: "Weekly increments with working demos. Clean architecture, proper testing, and integration with your existing tools. Most projects run 4-12 weeks.",
      meta: "4-12 weeks typical",
    },
    {
      n: 4,
      title: "Support",
      body: "Every project includes 30-90 days of post-launch support. After that, retainers cover iteration, monitoring, and optimization.",
      meta: "30-90 days included",
    },
  ],
  fr: [
    {
      n: 1,
      title: "Appel de découverte",
      body: "Un appel de 30 minutes. Pas de discours de vente, pas de pression. Juste une conversation sur vos systèmes et où se trouve le levier.",
      meta: "30 minutes",
    },
    {
      n: 2,
      title: "Proposition",
      body: "Nous cadrons les flux de travail avec vous, puis fournissons un prix fixe. Tarification par projet, aucune facturation horaire, aucune surprise.",
      meta: "Prix fixe après la découverte",
    },
    {
      n: 3,
      title: "Réalisation",
      body: "Des livraisons hebdomadaires avec démos fonctionnelles. Architecture propre, tests rigoureux et intégration à vos outils existants. La plupart des projets durent de 4 à 12 semaines.",
      meta: "4 à 12 semaines en général",
    },
    {
      n: 4,
      title: "Soutien",
      body: "Chaque projet inclut de 30 à 90 jours de soutien après le lancement. Par la suite, des ententes de service couvrent l'itération, la surveillance et l'optimisation.",
      meta: "30 à 90 jours inclus",
    },
  ],
};

export const pricingNote: Record<Locale, string> = {
  en: "Clear starting points: iOS MVPs from $5k, web platforms from $10k, full product builds from $20k. All projects include discovery, a fixed-price quote, and post-launch support.",
  fr: "Points de départ clairs : MVP iOS à partir de 5 000 $, plateformes web à partir de 10 000 $, builds de produits complets à partir de 20 000 $. Tous les projets incluent la découverte, un prix fixe et un soutien après le lancement.",
};

/**
 * Inline component literals for `components/services/engagement-strip.tsx`
 * (section label + heading). Colocated here per PATTERN.md §2 rather than
 * the shared `content/i18n/messages.ts`.
 */
export type EngagementCopy = {
  eyebrow: string;
  heading: string;
};

export const engagementCopy: Record<Locale, EngagementCopy> = {
  en: {
    eyebrow: "How Engagements Work",
    heading: "From first call to running system.",
  },
  fr: {
    eyebrow: "Comment se déroulent nos mandats",
    heading: "Du premier appel au système opérationnel.",
  },
};
