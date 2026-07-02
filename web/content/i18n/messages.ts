"use client";

import { useLocale, type Locale } from "@/lib/i18n/locale";

/**
 * Typed dictionary for inline copy — literal strings that live directly in a
 * component's JSX (headings, button labels, aria text). Keyed by section, one
 * section per component/area of the site.
 *
 * This is NOT for structured/array content (lists of cards, nav links,
 * case studies, etc.) — those live in `content/*.ts` as `Record<Locale, T>`
 * next to their existing type (see `content/proof.ts` for the pattern).
 *
 * See `web/lib/i18n/PATTERN.md` for the full guide on extending this file.
 */
export type Messages = {
  nav: {
    letsTalk: string;
  };
  hero: {
    eyebrow: string;
    headlineLead: string;
    headlineEmphasis: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    exploreDemo: string;
  };
  proof: {
    heading: string;
    body: string;
  };
  cta: {
    heading: string;
    subline: string;
    bookCall: string;
  };
  footer: {
    tagline: string;
    siteHeading: string;
    workHeading: string;
    connectHeading: string;
    bookCall: string;
    rights: string;
  };
};

export const messages: Record<Locale, Messages> = {
  en: {
    nav: {
      letsTalk: "Let's Talk",
    },
    hero: {
      eyebrow: "Software that runs businesses",
      headlineLead: "We build and operate",
      headlineEmphasis: "the systems that scale real companies.",
      subhead:
        "Automation, financial clarity, and operational leverage. Built by someone who scaled a 7-figure platform from the inside.",
      primaryCta: "Book a Conversation",
      secondaryCta: "See What We've Built",
      exploreDemo: "Explore the live demo",
    },
    proof: {
      heading: "Built from real operating experience",
      body: "These systems come from operating them, not just building them — scaling a platform, running the day-to-day, wiring up automations, shipping apps, and managing thousands of real users.",
    },
    cta: {
      heading: "Let's talk about what you're building.",
      subline:
        "30-minute call. No pitch, no pressure. Just a conversation about your systems.",
      bookCall: "Book a Conversation",
    },
    footer: {
      tagline:
        "Software systems that automate operations and add financial clarity. Led by an operator who built and scaled a 7 figure platform.",
      siteHeading: "Site",
      workHeading: "Work",
      connectHeading: "Connect",
      bookCall: "Book a Conversation",
      rights: "© 2026 KCOH Software Inc. All rights reserved.",
    },
  },
  fr: {
    nav: {
      letsTalk: "Discutons",
    },
    hero: {
      eyebrow: "Des logiciels qui font tourner les entreprises",
      headlineLead: "Nous concevons et exploitons",
      headlineEmphasis: "les systèmes qui font croître de vraies entreprises.",
      subhead:
        "Automatisation, clarté financière et effet de levier opérationnel. Conçus par quelqu'un qui a fait croître une plateforme à 7 chiffres, de l'intérieur.",
      primaryCta: "Réserver un appel",
      secondaryCta: "Voir ce que nous avons bâti",
      exploreDemo: "Explorer la démo en direct",
    },
    proof: {
      heading: "Bâtis à partir d'une vraie expérience opérationnelle",
      body: "Ces systèmes viennent du fait de les avoir exploités, pas seulement construits — faire croître une plateforme, gérer le quotidien, brancher des automatisations, livrer des applications et gérer des milliers d'utilisateurs réels.",
    },
    cta: {
      heading: "Parlons de ce que vous bâtissez.",
      subline:
        "Un appel de 30 minutes. Pas de discours de vente, pas de pression. Juste une conversation sur vos systèmes.",
      bookCall: "Réserver un appel",
    },
    footer: {
      tagline:
        "Des systèmes logiciels qui automatisent les opérations et apportent une clarté financière. Dirigés par un opérateur qui a bâti et fait croître une plateforme à 7 chiffres.",
      siteHeading: "Site",
      workHeading: "Réalisations",
      connectHeading: "Nous joindre",
      bookCall: "Réserver un appel",
      rights: "© 2026 KCOH Software Inc. Tous droits réservés.",
    },
  },
};

/**
 * Returns the message dictionary for the active locale. Re-renders
 * automatically when the locale changes (it reads `useLocale()` under the
 * hood). Call this from any Client Component that renders inline copy.
 *
 * @example
 * "use client";
 * const t = useT();
 * return <h1>{t.hero.headlineLead}</h1>;
 */
export function useT(): Messages {
  const { locale } = useLocale();
  return messages[locale];
}
