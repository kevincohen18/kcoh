import type { Locale } from "@/lib/i18n/locale";

/**
 * Structured bilingual content pattern (see `web/lib/i18n/PATTERN.md`):
 * `Record<Locale, T>`, original type `T` unchanged. Consumers select the
 * active locale's data with `processSteps[locale]`.
 */
export type ProcessStep = {
  n: number;
  title: string;
  body: string;
};

export const processSteps: Record<Locale, ProcessStep[]> = {
  en: [
    {
      n: 1,
      title: "Map the System",
      body: "We audit your current workflows, data flows, and bottlenecks before writing any code.",
    },
    {
      n: 2,
      title: "Find the Leverage",
      body: "We identify the automations and systems that will deliver the highest operational ROI.",
    },
    {
      n: 3,
      title: "Build and Ship",
      body: "Clean architecture, proper testing, and integration with your existing tools. Deployed to production.",
    },
    {
      n: 4,
      title: "Support and Iterate",
      body: "We monitor performance, train your team, and iterate based on real usage.",
    },
  ],
  fr: [
    {
      n: 1,
      title: "Cartographier le système",
      body: "Nous auditons vos flux de travail, vos flux de données et vos points de friction actuels avant d'écrire une seule ligne de code.",
    },
    {
      n: 2,
      title: "Trouver le levier",
      body: "Nous identifions les automatisations et les systèmes qui offriront le meilleur retour opérationnel.",
    },
    {
      n: 3,
      title: "Bâtir et livrer",
      body: "Architecture propre, tests rigoureux et intégration avec vos outils existants. Déployé en production.",
    },
    {
      n: 4,
      title: "Soutenir et itérer",
      body: "Nous surveillons la performance, formons votre équipe et itérons selon l'usage réel.",
    },
  ],
};

/** Inline copy for the homepage "How We Work" section
 *  (`components/sections/how-we-work.tsx`). The about page's expanded
 *  version of this section uses its own heading, defined in
 *  `content/about.ts` (`aboutCopy.process`). */
export type ProcessCopy = {
  label: string;
  heading: string;
  lede: string;
};

export const processCopy: Record<Locale, ProcessCopy> = {
  en: {
    label: "How We Work",
    heading: "Four steps. No mystery.",
    lede: "Every layer is a choice. We bring an opinion, then build with whatever fits: your language, your database, your tools.",
  },
  fr: {
    label: "Comment nous travaillons",
    heading: "Quatre étapes. Aucun mystère.",
    lede: "Chaque couche est un choix. Nous avons un avis, puis nous bâtissons avec ce qui convient : votre langage, votre base de données, vos outils.",
  },
};
