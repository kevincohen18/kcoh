import type { Locale } from "@/lib/i18n/locale";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  tech: string[];
  logo: string;
  featured: boolean;
  href: string;
};

export const projects: Project[] = [
  {
    slug: "drafterie",
    name: "Drafterie",
    tagline: "Contracts and e-signatures",
    description: "Smart contract creation and e-signature platform.",
    color: "#6e63ff",
    tech: ["React", "Node", "PostgreSQL", "Stripe"],
    logo: "/logos/drafterie.png",
    featured: true,
    href: "/work/drafterie/",
  },
  {
    slug: "concordia-connect",
    name: "Concordia Connect",
    tagline: "Connect. Belong. Succeed.",
    description:
      "Student networking platform for Concordia — native iOS and web with realtime chat.",
    color: "#8b1d3f",
    tech: ["Swift", "SwiftUI", "Node", "PostgreSQL", "Socket.IO"],
    logo: "/logos/concordia.png",
    featured: true,
    href: "/work/concordia-connect/",
  },
  {
    slug: "skyroa",
    name: "Skyroa",
    tagline: "Escrow and KYC",
    description: "Secure escrow and KYC for digital transactions.",
    color: "#4f46e5",
    tech: ["React", "Node", "PostgreSQL"],
    logo: "/logos/skyroa.png",
    featured: true,
    href: "/work/skyroa/",
  },
  {
    slug: "automedic",
    name: "AutoMedic",
    tagline: "Mobile mechanic operations",
    description:
      "Real-time booking and operations platform for mobile mechanics.",
    color: "#16a34a",
    tech: ["React Native", "Node", "PostgreSQL"],
    logo: "/logos/automedic.png",
    featured: true,
    href: "/work/automedic/",
  },
  {
    slug: "success",
    name: "Success",
    tagline: "Precious metals valuation",
    description: "Valuation and pricing tools for the precious metals trade.",
    color: "#ea580c",
    tech: ["iOS", "Node"],
    logo: "/logos/success.png",
    featured: false,
    href: "#",
  },
  {
    slug: "frostynow",
    name: "FrostyNow",
    tagline: "On-demand ordering",
    description: "On-demand ordering and delivery, built for speed.",
    color: "#6be5ff",
    tech: ["React", "Node"],
    logo: "/logos/frostynow.png",
    featured: false,
    href: "#",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

// Bilingual copy for the homepage Featured Work section. Structural project
// data above stays locale-invariant (names, hrefs, colors) — only the
// human-readable tagline/description are translated, keyed by slug.
export const featuredProjectCopy: Record<
  Locale,
  Record<string, { tagline: string; description: string }>
> = {
  en: {
    drafterie: {
      tagline: "Contracts and e-signatures",
      description: "Smart contract creation and e-signature platform.",
    },
    "concordia-connect": {
      tagline: "Connect. Belong. Succeed.",
      description:
        "Student networking platform for Concordia — native iOS and web with realtime chat.",
    },
    skyroa: {
      tagline: "Escrow and KYC",
      description: "Secure escrow and KYC for digital transactions.",
    },
    automedic: {
      tagline: "Mobile mechanic operations",
      description:
        "Real-time booking and operations platform for mobile mechanics.",
    },
  },
  fr: {
    drafterie: {
      tagline: "Contrats et signatures électroniques",
      description:
        "Plateforme de création de contrats intelligents et de signature électronique.",
    },
    "concordia-connect": {
      tagline: "Connecter. Appartenir. Réussir.",
      description:
        "Plateforme de réseautage étudiant pour Concordia — iOS natif et web avec clavardage en temps réel.",
    },
    skyroa: {
      tagline: "Entiercement et vérification KYC",
      description:
        "Entiercement sécurisé et vérification d'identité (KYC) pour les transactions numériques.",
    },
    automedic: {
      tagline: "Opérations de mécanique mobile",
      description:
        "Plateforme de réservation et de gestion en temps réel pour mécaniciens mobiles.",
    },
  },
};

export const featuredWorkCopy: Record<
  Locale,
  { eyebrow: string; heading: string; readCaseStudy: string }
> = {
  en: {
    eyebrow: "Featured Work",
    heading:
      "Everything shown here was built, shipped, and operated in production.",
    readCaseStudy: "Read the case study",
  },
  fr: {
    eyebrow: "Nos réalisations",
    heading:
      "Tout ce qui est présenté ici a été conçu, livré et exploité en production.",
    readCaseStudy: "Lire l'étude de cas",
  },
};
