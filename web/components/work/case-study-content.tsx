"use client";

import { ProjectTheme } from "@/components/site/project-theme";
import { CTASection } from "@/components/site/cta-section";
import { CaseHero } from "@/components/work/case-hero";
import { CaseProblem } from "@/components/work/case-problem";
import { CaseSystem } from "@/components/work/case-system";
import { CaseOutcome } from "@/components/work/case-outcome";
import { NextProjectPager } from "@/components/work/next-project-pager";
import { useLocale } from "@/lib/i18n/locale";
import { getCaseStudy } from "@/content/case-studies";
import type { CaseSlug } from "@/content/case-studies";

// Locale-reactive body of /work/[slug]. The page file stays a server shell
// (static params + English metadata, per web/lib/i18n/PATTERN.md) and
// renders this as its only child, passing down the route's slug.
export function CaseStudyContent({ slug }: { slug: CaseSlug }) {
  const { locale } = useLocale();
  const study = getCaseStudy(locale, slug);

  return (
    <>
      <ProjectTheme accent={study.accent}>
        <CaseHero study={study} />
        <CaseSystem study={study} />
        <CaseProblem study={study} />
        <CaseOutcome study={study} />
      </ProjectTheme>
      <NextProjectPager current={study.slug} />
      <CTASection />
    </>
  );
}
