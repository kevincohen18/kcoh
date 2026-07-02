"use client";

import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { ProjectMiniPreview } from "@/components/work/mini-preview";
import { useLocale } from "@/lib/i18n/locale";
import { workCopy } from "@/content/case-studies";
import type { CaseStudy } from "@/content/case-studies";

export function CaseSystem({ study }: { study: CaseStudy }) {
  const { locale } = useLocale();
  const copy = workCopy[locale];
  return (
    <section className="border-t border-border bg-section">
      <Container className="py-16 md:py-24">
        <Reveal>
          <SectionLabel>{copy.case.theSystemWeBuilt}</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(28px,3.2vw,42px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
            {copy.case.systemHeading(study.name)}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="grid content-start gap-x-8 gap-y-9 sm:grid-cols-2 lg:col-span-7">
            {study.system.map((block, i) => (
              <Reveal key={block.title} delay={i * 0.05}>
                <h3 className="text-sm font-semibold text-fg">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {block.body}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <ProjectMiniPreview slug={study.slug} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
