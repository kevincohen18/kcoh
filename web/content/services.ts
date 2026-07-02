import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Workflow,
  LineChart,
  Plug,
  Smartphone,
  LifeBuoy,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/locale";

/**
 * Structured bilingual content pattern (see `web/lib/i18n/PATTERN.md`):
 * `services` keeps its original `Service[]` shape, wrapped in
 * `Record<Locale, T>`. Consumers select `services[locale]`.
 */
export type Service = {
  icon: LucideIcon;
  title: string;
  blurb: string;
};

export const services: Record<Locale, Service[]> = {
  en: [
    {
      icon: Code2,
      title: "Custom Software",
      blurb: "Web and mobile applications built for your operations.",
    },
    {
      icon: Workflow,
      title: "Automation",
      blurb: "Workflows, approvals, and processes that save time and reduce errors.",
    },
    {
      icon: LineChart,
      title: "Financial Systems",
      blurb: "Real-time dashboards, reconciliation, and reporting.",
    },
    {
      icon: Plug,
      title: "Integrations",
      blurb: "APIs, third-party tools, and seamless data flow.",
    },
    {
      icon: Smartphone,
      title: "iOS Development",
      blurb: "Native iOS apps shipped to the App Store.",
    },
    {
      icon: LifeBuoy,
      title: "Ongoing Support",
      blurb: "Monitoring, updates, and continuous improvement.",
    },
  ],
  fr: [
    {
      icon: Code2,
      title: "Développement sur mesure",
      blurb: "Applications web et mobiles conçues pour vos opérations.",
    },
    {
      icon: Workflow,
      title: "Automatisation",
      blurb:
        "Flux de travail, approbations et processus qui font gagner du temps et réduisent les erreurs.",
    },
    {
      icon: LineChart,
      title: "Systèmes financiers",
      blurb: "Tableaux de bord en temps réel, réconciliation et rapports.",
    },
    {
      icon: Plug,
      title: "Intégrations",
      blurb: "API, outils tiers et flux de données fluide.",
    },
    {
      icon: Smartphone,
      title: "Développement iOS",
      blurb: "Applications iOS natives livrées sur l'App Store.",
    },
    {
      icon: LifeBuoy,
      title: "Soutien continu",
      blurb: "Surveillance, mises à jour et amélioration continue.",
    },
  ],
};

/**
 * Inline component literals for `components/sections/services.tsx` (section
 * label, heading, and the "book a call" callout card). Colocated here
 * rather than in the shared `content/i18n/messages.ts` to keep this area's
 * translation work disjoint from sibling agents. See PATTERN.md §2.
 */
export type ServicesCopy = {
  eyebrow: string;
  heading: string;
  ctaHeadingLine1: string;
  ctaHeadingLine2: string;
  ctaBody: string;
  ctaButton: string;
};

export const servicesCopy: Record<Locale, ServicesCopy> = {
  en: {
    eyebrow: "What We Do",
    heading: "End-to-end software systems that run your business.",
    ctaHeadingLine1: "Let's talk about",
    ctaHeadingLine2: "what you're building.",
    ctaBody: "30-minute call. No pitch, no pressure. Just a conversation about your systems.",
    ctaButton: "Book a Conversation",
  },
  fr: {
    eyebrow: "Ce que nous faisons",
    heading: "Des systèmes logiciels de bout en bout qui font tourner votre entreprise.",
    ctaHeadingLine1: "Parlons de",
    ctaHeadingLine2: "ce que vous bâtissez.",
    ctaBody:
      "Un appel de 30 minutes. Pas de discours de vente, pas de pression. Juste une conversation sur vos systèmes.",
    ctaButton: "Réserver un appel",
  },
};
