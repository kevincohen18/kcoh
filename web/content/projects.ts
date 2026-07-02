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
