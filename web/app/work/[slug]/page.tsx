import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProjectTheme } from "@/components/site/project-theme";
import { CTASection } from "@/components/site/cta-section";
import { CaseHero } from "@/components/work/case-hero";
import { CaseProblem } from "@/components/work/case-problem";
import { CaseSystem } from "@/components/work/case-system";
import { CaseOutcome } from "@/components/work/case-outcome";
import { NextProjectPager } from "@/components/work/next-project-pager";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import type { CaseSlug } from "@/content/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: CaseSlug }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return pageMetadata({
    title: study.name,
    description: study.oneLiner,
    path: `/work/${study.slug}/`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  return (
    <>
      <ProjectTheme accent={study.accent}>
        <CaseHero study={study} />
        <CaseProblem study={study} />
        <CaseSystem study={study} />
        <CaseOutcome study={study} />
      </ProjectTheme>
      <NextProjectPager current={study.slug} />
      <CTASection />
    </>
  );
}
