import type { Metadata } from "next";
import { altLanguages } from "@/lib/i18n/alternates";
import { CaseStudyContent } from "@/components/work/case-study-content";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import type { CaseSlug } from "@/content/case-studies";

// Mirrors app/work/[slug]/page.tsx — same static params (the 4 slugs are
// locale-invariant) and the same content component, which already derives
// locale="fr" from the /fr path via useLocale(). Unlike the English page,
// metadata here is sourced from the French case-study data
// (caseStudies.fr), since this route serves French visitors.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.en.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: CaseSlug }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy("fr", slug);
  return {
    title: study.name,
    description: study.oneLiner,
    alternates: {
      canonical: `/fr/work/${study.slug}/`,
      languages: altLanguages(`/work/${study.slug}/`),
    },
  };
}

export default async function CaseStudyPageFr({ params }: Props) {
  const { slug } = await params;
  return <CaseStudyContent slug={slug} />;
}
