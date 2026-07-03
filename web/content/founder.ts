import type { Locale } from "@/lib/i18n/locale";

/**
 * Structured bilingual content pattern (see `web/lib/i18n/PATTERN.md`):
 * `Record<Locale, T>`, original type `T` unchanged. Consumers select the
 * active locale's data with `founder[locale]`.
 */
export type FounderContent = {
  name: string;
  role: string;
  /** Section eyebrow used by the homepage `Founder` section
   *  ("Built by someone who operates"). */
  eyebrow: string;
  statement: string;
  supporting: string;
  quote: {
    lead: string;
    emphasis: string;
    body: string;
  };
  photo: string;
};

export const founder: Record<Locale, FounderContent> = {
  en: {
    name: "Kevin Cohen",
    role: "Founder, KCOH Software Inc.",
    eyebrow: "Built by someone who operates",
    statement: "I've built, scaled, and operated every system we deliver.",
    supporting:
      "I understand the pressure, the complexity, and the edge cases because I've lived them. That's the advantage you get.",
    quote: {
      lead: "I don't just write code.",
      emphasis: "I run the business that needed it.",
      body: "From architecture to operations, I design systems around how businesses actually run, not how they look in a wireframe. The result: clarity, automation, and leverage.",
    },
    photo: "/founder.webp",
  },
  fr: {
    name: "Kevin Cohen",
    role: "Fondateur, KCOH Software Inc.",
    eyebrow: "Bâti par quelqu'un qui opère",
    statement: "J'ai bâti, fait évoluer et exploité chaque système que nous livrons.",
    supporting:
      "Je comprends la pression, la complexité et les cas particuliers, parce que je les ai vécus. C'est l'avantage que vous obtenez.",
    quote: {
      lead: "Je ne fais pas que coder.",
      emphasis: "Je dirige l'entreprise qui en avait besoin.",
      body: "De l'architecture aux opérations, je conçois des systèmes autour de la façon dont les entreprises fonctionnent réellement, pas de leur apparence dans une maquette. Le résultat : clarté, automatisation et effet de levier.",
    },
    photo: "/founder.webp",
  },
};
