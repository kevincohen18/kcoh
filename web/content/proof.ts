import type { Locale } from "@/lib/i18n/locale";

/**
 * Structured bilingual content pattern: array/object content modules become
 * `Record<Locale, T>` (keeping the original type `T` unchanged) and
 * consumers select the active array with `proofPoints[locale]`. See
 * `web/lib/i18n/PATTERN.md` for the full walkthrough.
 */
export type ProofPoint = {
  value: string;
  label: string;
  context: string;
};

export const proofPoints: Record<Locale, ProofPoint[]> = {
  en: [
    {
      value: "7-figure",
      label: "platform",
      context: "Built and operated from the inside.",
    },
    {
      value: "2,600+",
      label: "members",
      context: "Managed across real workflows and systems.",
    },
    {
      value: "10+",
      label: "apps shipped",
      context: "Production tools brought from idea to live usage.",
    },
    {
      value: "100%",
      label: "ownership",
      context: "Systems we maintain, improve, and stand behind.",
    },
  ],
  fr: [
    {
      value: "7 chiffres",
      label: "plateforme",
      context: "Bâtie et exploitée de l'intérieur.",
    },
    {
      value: "2 600+",
      label: "membres",
      context: "Gérés à travers des flux de travail et systèmes réels.",
    },
    {
      value: "10+",
      label: "applications livrées",
      context: "Des outils de production menés de l'idée à l'utilisation réelle.",
    },
    {
      value: "100 %",
      label: "propriété",
      context: "Des systèmes que nous maintenons, améliorons et soutenons.",
    },
  ],
};
