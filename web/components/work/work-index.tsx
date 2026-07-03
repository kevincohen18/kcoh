"use client";

import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { LogoRow } from "@/components/site/logo-row";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { WorkFeatureRow } from "@/components/work/feature-row";
import { useLocale } from "@/lib/i18n/locale";
import { caseStudies, workCopy } from "@/content/case-studies";

// Locale-reactive body of /work. The page file stays a server shell (static
// English metadata, per web/lib/i18n/PATTERN.md) and renders this as its
// only child.
export function WorkIndex() {
  const { locale } = useLocale();
  const studies = caseStudies[locale];
  const copy = workCopy[locale];

  return (
    <>
      <PageHero
        eyebrow={copy.index.eyebrow}
        title={
          <>
            {copy.index.titleLine1}
            <br />
            {copy.index.titleLine2}
          </>
        }
        intro={copy.index.intro}
      />

      {studies.map((study, i) => (
        <WorkFeatureRow key={study.slug} study={study} flip={i % 2 === 1} />
      ))}

      <section>
        <Container className="py-14 md:py-16">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-fg-subtle">
              {copy.index.alsoBuilt}
            </p>
            <LogoRow names={["Success", "FrostyNow"]} />
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
