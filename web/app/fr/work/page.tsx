import type { Metadata } from "next";
import { altLanguages } from "@/lib/i18n/alternates";
import { WorkIndex } from "@/components/work/work-index";

// Mirrors app/work/page.tsx — same content component, which already derives
// locale="fr" from the /fr path via useLocale(). Title/description reuse
// existing French copy: "Réalisations" matches the nav label and
// messages.fr.workHeading (content/i18n/messages.ts); the description
// reuses workCopy.fr.index.intro (content/case-studies.ts) verbatim,
// prefixed with the case-study names (proper nouns, untranslated per
// PATTERN.md) and "Études de cas", the plural of workCopy.fr.case.caseStudyLabel.
export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Études de cas de KCOH Software Inc. : Concordia Connect, Drafterie, Skyroa et AutoMedic. Tout ce qui est présenté ici a été construit, livré et exploité en production.",
  alternates: { canonical: "/fr/work/", languages: altLanguages("/work/") },
};

export default function WorkPageFr() {
  return <WorkIndex />;
}
