import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CaseStudyContent } from "@/components/work/case-study-content";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import type { CaseSlug } from "@/content/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.en.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: CaseSlug }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Metadata is server-rendered and static per route (no /fr route to serve
  // French metadata to) — always sourced from the English case study, per
  // web/lib/i18n/PATTERN.md.
  const study = getCaseStudy("en", slug);
  return pageMetadata({
    title: study.name,
    description: study.oneLiner,
    path: `/work/${study.slug}/`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  return <CaseStudyContent slug={slug} />;
}
