"use client";

import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { WorkFeatureRow } from "@/components/work/feature-row";
import { featuredWorkCopy } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { useLocale } from "@/lib/i18n/locale";

const FEATURED_SLUGS = ["concordia-connect", "drafterie", "skyroa", "automedic"] as const;

export function FeaturedWork() {
  const { locale } = useLocale();
  const wc = featuredWorkCopy[locale];
  const studies = caseStudies[locale];
  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const s = studies.find((x) => x.slug === slug);
    return s ? [s] : [];
  });

  return (
    <section id="work" className="scroll-mt-24">
      <Container className="pt-20 md:pt-28">
        <Reveal>
          <SectionLabel>{wc.eyebrow}</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
            {wc.heading}
          </h2>
        </Reveal>
      </Container>
      {featured.map((study, i) => (
        <WorkFeatureRow key={study.slug} study={study} flip={i % 2 === 1} />
      ))}
    </section>
  );
}
