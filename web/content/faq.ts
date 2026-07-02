import type { Locale } from "@/lib/i18n/locale";

/**
 * Structured bilingual content pattern (see `web/lib/i18n/PATTERN.md`):
 * `Record<Locale, T>`, original type `T` unchanged. Consumers select the
 * active locale's data with `faqs[locale]`.
 */
export type Faq = { q: string; a: string };

export const faqs: Record<Locale, Faq[]> = {
  en: [
    {
      q: "What kind of work do you take on?",
      a: "End-to-end software systems that run a business: custom web and mobile apps, automation, financial dashboards, integrations, and the ongoing support to keep them running.",
    },
    {
      q: "How is this different from hiring an agency?",
      a: "I've built and operated real platforms, not just shipped designs. I design systems around how a business actually runs, then stand behind them in production.",
    },
    {
      q: "What does a typical engagement look like?",
      a: "Four steps: map the system, find the leverage, build and ship, then support and iterate. You always know what is happening and why.",
    },
    {
      q: "What does it cost?",
      a: "It depends on scope. A focused iOS MVP starts around 5k, a web platform around 10k, and a full product build from 20k. We scope it together before anything starts.",
    },
    {
      q: "Do you work with existing systems?",
      a: "Yes. Most engagements involve integrating with the tools and data you already have, not replacing everything at once.",
    },
  ],
  fr: [
    {
      q: "Quel genre de mandat prenez-vous?",
      a: "Des systèmes logiciels de bout en bout qui font tourner une entreprise : applications web et mobiles sur mesure, automatisation, tableaux de bord financiers, intégrations, et le soutien continu pour les maintenir en marche.",
    },
    {
      q: "En quoi est-ce différent d'embaucher une agence?",
      a: "J'ai bâti et exploité de vraies plateformes, pas seulement livré des maquettes. Je conçois des systèmes autour de la façon dont une entreprise fonctionne réellement, puis je les soutiens en production.",
    },
    {
      q: "À quoi ressemble un mandat typique?",
      a: "Quatre étapes : cartographier le système, trouver le levier, bâtir et livrer, puis soutenir et itérer. Vous savez toujours ce qui se passe et pourquoi.",
    },
    {
      q: "Combien ça coûte?",
      a: "Ça dépend de l'envergure. Un MVP iOS ciblé démarre autour de 5 k$, une plateforme web autour de 10 k$, et un produit complet à partir de 20 k$. Nous définissons la portée ensemble avant de commencer.",
    },
    {
      q: "Travaillez-vous avec des systèmes existants?",
      a: "Oui. La plupart des mandats impliquent une intégration avec les outils et les données que vous avez déjà, plutôt qu'un remplacement complet d'un coup.",
    },
  ],
};

/**
 * Inline copy for the FAQ section heading/eyebrow
 * (`components/sections/faq.tsx`), colocated here rather than in
 * `content/i18n/messages.ts` (owned by a sibling workstream).
 */
export type FaqCopy = { label: string; heading: string };

export const faqCopy: Record<Locale, FaqCopy> = {
  en: {
    label: "Common Questions",
    heading: "Before you book.",
  },
  fr: {
    label: "Questions fréquentes",
    heading: "Avant de réserver.",
  },
};
