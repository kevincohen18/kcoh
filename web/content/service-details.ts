import type { Locale } from "@/lib/i18n/locale";
import type { WorkflowStep, WorkflowStepStatus } from "@/lib/workflow-feed";

export type ServiceSlug =
  | "custom-software"
  | "automation"
  | "financial-systems"
  | "integrations"
  | "ios-development"
  | "ongoing-support";

export type ServiceDetail = {
  slug: ServiceSlug;
  title: string;
  heading: string;
  problem: string;
  deliverables: string[];
};

/**
 * Structured bilingual content pattern (see `web/lib/i18n/PATTERN.md`):
 * `slug` is an identifier, not translated copy — it stays the same across
 * locales so `visuals[detail.slug]` lookups in `app/services/page.tsx` keep
 * working regardless of the active language.
 */
export const serviceDetails: Record<Locale, ServiceDetail[]> = {
  en: [
    {
      slug: "custom-software",
      title: "Custom Software",
      heading: "Software built around how you actually operate.",
      problem:
        "Off-the-shelf tools force your operations into someone else's shape. We design, build, and operate cohesive systems across mobile, web, and backend, with one owner from first sketch to production. No handoffs, no silos.",
      deliverables: [
        "One operator across mobile, web, and API",
        "Design, build, deploy, and support under one roof",
        "Measured on stability, shipping speed, and adoption",
      ],
    },
    {
      slug: "automation",
      title: "Automation",
      heading: "Manual work, retired.",
      problem:
        "Repetitive workflows drain hours and invite errors. We replace manual processes with durable automation across operations, fulfillment, customer communications, and finance. Then we keep measuring it after launch.",
      deliverables: [
        "80%+ of repetitive tasks automated, fewer tickets",
        "Existing tools connected, edge cases handled",
        "Monitored, measured, and iterated after launch",
      ],
    },
    {
      slug: "financial-systems",
      title: "Financial Systems",
      heading: "One view of the money.",
      problem:
        "When payments, subscriptions, cards, and accounting live in separate tools, nobody knows the real number. We unify them into a single view, with reconciliation, dispute flows, and reporting handled.",
      deliverables: [
        "Weekly cashflow and P&L dashboards",
        "Dispute automation, refunds, and edge cases covered",
        "Fee reduction and processor optimization",
      ],
    },
    {
      slug: "integrations",
      title: "Integrations",
      heading: "Your tools, finally talking.",
      problem:
        "Most engagements connect to what you already run instead of replacing everything at once. API integrations, webhooks, and data migrations are standard, and your team gets trained on the result.",
      deliverables: [
        "APIs, webhooks, and data migrations",
        "Third-party tools and databases wired into one flow",
        "Your team trained on the new systems",
      ],
    },
    {
      slug: "ios-development",
      title: "iOS Development",
      heading: "Native iOS, shipped to the App Store.",
      problem:
        "We build native iOS in Swift and SwiftUI. More than ten production apps shipped to the App Store, built to hold up with real users.",
      deliverables: [
        "Swift and SwiftUI, native performance",
        "App Store submission handled end to end",
        "Backend integration included",
      ],
    },
    {
      slug: "ongoing-support",
      title: "Ongoing Support",
      heading: "We stand behind what we ship.",
      problem:
        "Software is not done at launch. Every project includes 30-90 days of post-launch support depending on scope. After that, retainers cover iteration, monitoring, and optimization on real usage.",
      deliverables: [
        "30-90 days of post-launch support on every project",
        "Retainers for iteration, monitoring, and optimization",
        "Runbooks and training for your team",
      ],
    },
  ],
  fr: [
    {
      slug: "custom-software",
      title: "Développement sur mesure",
      heading: "Des logiciels conçus autour de la façon dont vous opérez réellement.",
      problem:
        "Les outils prêts à l'emploi forcent vos opérations à s'adapter au moule de quelqu'un d'autre. Nous concevons, bâtissons et exploitons des systèmes cohérents sur mobile, web et back-end, avec un seul responsable du premier croquis à la production. Aucun transfert, aucun silo.",
      deliverables: [
        "Un seul opérateur sur mobile, web et API",
        "Conception, développement, déploiement et soutien sous un même toit",
        "Mesuré selon la stabilité, la vitesse de livraison et l'adoption",
      ],
    },
    {
      slug: "automation",
      title: "Automatisation",
      heading: "Le travail manuel prend sa retraite.",
      problem:
        "Les flux de travail répétitifs drainent des heures et multiplient les erreurs. Nous remplaçons les processus manuels par une automatisation durable dans les opérations, l'exécution des commandes, les communications avec la clientèle et les finances. Puis nous continuons à mesurer les résultats après le lancement.",
      deliverables: [
        "Plus de 80 % des tâches répétitives automatisées, moins de tickets",
        "Outils existants connectés, cas particuliers pris en charge",
        "Surveillé, mesuré et amélioré après le lancement",
      ],
    },
    {
      slug: "financial-systems",
      title: "Systèmes financiers",
      heading: "Une seule vue sur l'argent.",
      problem:
        "Quand les paiements, les abonnements, les cartes et la comptabilité vivent dans des outils séparés, personne ne connaît le vrai chiffre. Nous les unifions dans une seule vue, avec la réconciliation, la gestion des litiges et les rapports pris en charge.",
      deliverables: [
        "Tableaux de bord hebdomadaires de flux de trésorerie et de résultats",
        "Automatisation des litiges, remboursements et cas particuliers couverts",
        "Réduction des frais et optimisation des processeurs de paiement",
      ],
    },
    {
      slug: "integrations",
      title: "Intégrations",
      heading: "Vos outils, enfin connectés.",
      problem:
        "La plupart des mandats se connectent à ce que vous utilisez déjà plutôt que de tout remplacer d'un coup. Les intégrations API, les webhooks et les migrations de données sont standards, et votre équipe est formée sur le résultat.",
      deliverables: [
        "API, webhooks et migrations de données",
        "Outils tiers et bases de données branchés dans un seul flux",
        "Votre équipe formée sur les nouveaux systèmes",
      ],
    },
    {
      slug: "ios-development",
      title: "Développement iOS",
      heading: "iOS natif, livré sur l'App Store.",
      problem:
        "Nous développons des applications iOS natives en Swift et SwiftUI. Plus de dix applications de production livrées sur l'App Store, conçues pour tenir la route avec de vrais utilisateurs.",
      deliverables: [
        "Swift et SwiftUI, performance native",
        "Soumission à l'App Store prise en charge de bout en bout",
        "Intégration back-end incluse",
      ],
    },
    {
      slug: "ongoing-support",
      title: "Soutien continu",
      heading: "Nous répondons de ce que nous livrons.",
      problem:
        "Un logiciel n'est pas terminé au lancement. Chaque projet inclut de 30 à 90 jours de soutien après le lancement, selon l'ampleur. Par la suite, des ententes de service couvrent l'itération, la surveillance et l'optimisation en conditions réelles.",
      deliverables: [
        "30 à 90 jours de soutien après le lancement sur chaque projet",
        "Ententes de service pour l'itération, la surveillance et l'optimisation",
        "Guides d'exploitation et formation pour votre équipe",
      ],
    },
  ],
};

/**
 * Inline component literals for the `/services` page shell
 * (`components/services/services-page-content.tsx`) and
 * `components/services/service-block.tsx` — page-hero copy, the
 * "what this looks like" label, and the "explore the live demo" link.
 */
export type ServiceDetailsCopy = {
  pageHero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  whatThisLooksLike: string;
  exploreDemo: string;
};

export const serviceDetailsCopy: Record<Locale, ServiceDetailsCopy> = {
  en: {
    pageHero: {
      eyebrow: "Services",
      title: "Business systems engineering.",
      intro:
        "Software that automates operations, clarifies finances, and creates operational leverage. Built for revenue-generating businesses scaling past manual processes.",
    },
    whatThisLooksLike: "What this looks like",
    exploreDemo: "Explore the live demo",
  },
  fr: {
    pageHero: {
      eyebrow: "Services",
      title: "Ingénierie de systèmes d'affaires.",
      intro:
        "Des logiciels qui automatisent les opérations, clarifient les finances et créent un effet de levier opérationnel. Conçus pour les entreprises génératrices de revenus qui dépassent les processus manuels.",
    },
    whatThisLooksLike: "À quoi ça ressemble",
    exploreDemo: "Explorer la démo en direct",
  },
};

/**
 * `components/services/workflow-feed.tsx` — the "automation" service
 * visual. `workflowFeedSteps` is structured content (the simulated demo's
 * starting state); `workflowFeedCopy` covers its inline literals, including
 * a translated label per `WorkflowStepStatus` for the status column (the
 * status *value* driving styling/logic stays the English literal type from
 * `lib/workflow-feed.ts`, unchanged).
 */
export type WorkflowFeedCopy = {
  title: string;
  live: string;
  statusLabels: Record<WorkflowStepStatus, string>;
};

export const workflowFeedCopy: Record<Locale, WorkflowFeedCopy> = {
  en: {
    title: "Workflow: order to books",
    live: "Live",
    statusLabels: {
      done: "done",
      running: "running",
      queued: "queued",
    },
  },
  fr: {
    title: "Flux de travail : de la commande à la comptabilité",
    live: "En direct",
    statusLabels: {
      done: "terminé",
      running: "en cours",
      queued: "en attente",
    },
  },
};

export const workflowFeedSteps: Record<Locale, WorkflowStep[]> = {
  en: [
    { label: "New order received", detail: "Stripe webhook", status: "done" },
    { label: "Invoice generated", detail: "PDF + ledger entry", status: "running" },
    { label: "Customer notified", detail: "Email via Resend", status: "queued" },
    { label: "Books reconciled", detail: "Synced to accounting", status: "queued" },
  ],
  fr: [
    { label: "Nouvelle commande reçue", detail: "Webhook Stripe", status: "done" },
    { label: "Facture générée", detail: "PDF + écriture comptable", status: "running" },
    { label: "Client avisé", detail: "Courriel via Resend", status: "queued" },
    { label: "Comptabilité réconciliée", detail: "Synchronisée avec la comptabilité", status: "queued" },
  ],
};

/**
 * `components/services/revenue-mini-chart.tsx` — the "financial-systems"
 * service visual. All display strings (including the formatted dollar
 * value and percentage, which use French numeral conventions: space as
 * thousands separator, comma decimal, non-breaking space before `$`/`%`).
 */
export type RevenueMiniChartCopy = {
  title: string;
  period: string;
  value: string;
  change: string;
  changeCaption: string;
  dateLabels: string[];
};

export const revenueMiniChartCopy: Record<Locale, RevenueMiniChartCopy> = {
  en: {
    title: "Revenue",
    period: "This Month",
    value: "$128,430",
    change: "+12.5%",
    changeCaption: "vs last month",
    dateLabels: ["May 1", "May 8", "May 15", "May 22", "May 29"],
  },
  fr: {
    title: "Revenus",
    period: "Ce mois-ci",
    value: "128 430 $",
    change: "+12,5 %",
    changeCaption: "par rapport au mois dernier",
    dateLabels: ["1 mai", "8 mai", "15 mai", "22 mai", "29 mai"],
  },
};
