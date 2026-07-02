import type { Locale } from "@/lib/i18n/locale";

/**
 * Structured bilingual content pattern (see `web/lib/i18n/PATTERN.md`):
 * `Record<Locale, T>`, original type `T` unchanged. Consumers select the
 * active locale's data with `<export>[locale]`.
 */
export type ProofPoint = { title: string; body: string };
export type Principle = { title: string; body: string };

export const aboutIntro: Record<Locale, string> = {
  en: "I built and operated a 7-figure digital platform with 2,600+ members. Handled payments, disputes, support, abuse, and uptime. I apply that systems thinking to businesses through KCOH Software Inc.",
  fr: "J'ai bâti et exploité une plateforme numérique à 7 chiffres comptant plus de 2 600 membres. J'ai géré les paiements, les litiges, le support, les abus et la disponibilité. J'applique cette réflexion systémique aux entreprises par l'entremise de KCOH Software Inc.",
};

export const founderStory: Record<Locale, string[]> = {
  en: [
    "Most developers build what you spec. I've been on the other side, operating a platform with thousands of members, handling payments, disputes, uptime, and the kind of edge cases that only show up at scale.",
    "That experience changed how I build. I design systems around how businesses actually run, not how they look in a wireframe. Financial clarity, automated workflows, operational leverage. These aren't features I list. They're problems I've solved for myself.",
    "When I build for you, I'm applying judgment I earned by operating, not just engineering.",
  ],
  fr: [
    "La plupart des développeurs construisent selon vos spécifications. Moi, j'ai été de l'autre côté, à exploiter une plateforme comptant des milliers de membres, à gérer les paiements, les litiges, la disponibilité et le genre de cas particuliers qui n'apparaissent qu'à grande échelle.",
    "Cette expérience a changé ma façon de bâtir. Je conçois des systèmes autour de la façon dont les entreprises fonctionnent réellement, pas de leur apparence dans une maquette. Clarté financière, flux de travail automatisés, effet de levier opérationnel. Ce ne sont pas des fonctionnalités que j'énumère. Ce sont des problèmes que j'ai résolus pour moi-même.",
    "Quand je bâtis pour vous, j'applique un jugement acquis en opérant, pas seulement en programmant.",
  ],
};

export const proofPoints: Record<Locale, ProofPoint[]> = {
  en: [
    {
      title: "Digital platform",
      body: "Built and operated a 7-figure platform with 2,600+ members.",
    },
    {
      title: "iOS apps",
      body: "10+ production apps shipped to the App Store.",
    },
    {
      title: "Payment operations",
      body: "Managed payment flows, disputes, and reconciliation at scale.",
    },
  ],
  fr: [
    {
      title: "Plateforme numérique",
      body: "Bâti et exploité une plateforme à 7 chiffres comptant plus de 2 600 membres.",
    },
    {
      title: "Applications iOS",
      body: "Plus de 10 applications de production livrées sur l'App Store.",
    },
    {
      title: "Opérations de paiement",
      body: "Géré les flux de paiement, les litiges et la réconciliation à grande échelle.",
    },
  ],
};

export const stepDetails: Record<Locale, Record<number, string>> = {
  en: {
    1: "We sit with your actual workflows: orders, payments, support, reporting. We trace where time and money leak, and name the bottlenecks and edge cases before any code is written.",
    2: "Not everything is worth automating. We rank the work by operational ROI, then agree on a fixed scope and a fixed quote. No hourly billing, no surprises.",
    3: "We build in weekly increments with demos of actual working software, not status decks. Clean architecture, proper testing, and integration with the tools you already run.",
    4: "Launch is not the end. Every project includes 30-90 days of post-launch support. We monitor performance, train your team, and iterate on real usage.",
  },
  fr: {
    1: "Nous examinons vos flux de travail réels : commandes, paiements, support, rapports. Nous traçons où le temps et l'argent se perdent, et nommons les points de friction et cas particuliers avant d'écrire une seule ligne de code.",
    2: "Tout ne mérite pas d'être automatisé. Nous classons le travail selon le retour opérationnel, puis convenons d'une portée fixe et d'un prix fixe. Pas de facturation horaire, pas de surprises.",
    3: "Nous bâtissons par incréments hebdomadaires avec des démonstrations de logiciel réellement fonctionnel, pas des présentations d'état. Architecture propre, tests rigoureux et intégration avec les outils que vous utilisez déjà.",
    4: "Le lancement n'est pas la fin. Chaque projet inclut de 30 à 90 jours de soutien post-lancement. Nous surveillons la performance, formons votre équipe et itérons selon l'usage réel.",
  },
};

export const principles: Record<Locale, Principle[]> = {
  en: [
    {
      title: "Clear scoping",
      body: "Fixed quotes after discovery. Clear scope, clear price, no surprises.",
    },
    {
      title: "Weekly progress",
      body: "Real software every week, with measurable results. Never status decks.",
    },
    {
      title: "Durable stack",
      body: "Swift, React, Node, and cloud infrastructure. Tools chosen for durability and speed, not trends.",
    },
    {
      title: "Leverage first",
      body: "Focus on what creates leverage for your business. No fluff.",
    },
  ],
  fr: [
    {
      title: "Portée claire",
      body: "Prix fixes après la phase de découverte. Portée claire, prix clair, aucune surprise.",
    },
    {
      title: "Progrès hebdomadaire",
      body: "Du logiciel réel chaque semaine, avec des résultats mesurables. Jamais de présentations d'état.",
    },
    {
      title: "Pile technologique durable",
      body: "Swift, React, Node et infrastructure infonuagique. Des outils choisis pour leur durabilité et leur rapidité, pas pour les tendances.",
    },
    {
      title: "Le levier avant tout",
      body: "Concentré sur ce qui crée un effet de levier pour votre entreprise. Aucun superflu.",
    },
  ],
};

/**
 * Inline copy for the about page's own JSX literals — hero eyebrow/title,
 * section labels/headings, and the page's `CTASection` override — colocated
 * here rather than in `content/i18n/messages.ts` (owned by a sibling
 * workstream). Consumed by `components/about/about-content.tsx`.
 */
export type AboutCopy = {
  hero: { eyebrow: string; title: string };
  story: { label: string };
  process: { label: string; heading: string };
  principles: { label: string; heading: string };
  cta: { heading: string; subline: string };
};

export const aboutCopy: Record<Locale, AboutCopy> = {
  en: {
    hero: {
      eyebrow: "About",
      title: "Operator who builds systems under real constraints.",
    },
    story: { label: "The Story" },
    process: { label: "How We Work", heading: "The four steps, in full." },
    principles: {
      label: "Operating Principles",
      heading: "No surprises. No fluff.",
    },
    cta: {
      heading: "Work with an operator.",
      subline:
        "30-minute call. No pitch, no pressure. Just a conversation about your systems.",
    },
  },
  fr: {
    hero: {
      eyebrow: "À propos",
      title: "Un opérateur qui bâtit des systèmes sous de vraies contraintes.",
    },
    story: { label: "L'histoire" },
    process: {
      label: "Comment nous travaillons",
      heading: "Les quatre étapes, en détail.",
    },
    principles: {
      label: "Principes d'opération",
      heading: "Aucune surprise. Aucun superflu.",
    },
    cta: {
      heading: "Travaillez avec un opérateur.",
      subline:
        "Un appel de 30 minutes. Pas de discours de vente, pas de pression. Juste une conversation sur vos systèmes.",
    },
  },
};
