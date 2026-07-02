"use client";

import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { CaseSchematic } from "@/components/work/case-schematic";
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

        {/* The honest architecture, drawn — this replaces the old sample
            dashboard as the section's visual. */}
        <Reveal delay={0.05}>
          <div className="mt-10 rounded-2xl border border-border bg-card p-2 sm:p-3">
            <CaseSchematic slug={study.slug} />
          </div>
        </Reveal>

        {/* Read-more depth: the system-design decisions behind the diagram. */}
        <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
          {study.system.map((block, i) => (
            <Reveal key={block.title} delay={i * 0.05}>
              <h3 className="text-sm font-semibold text-fg">{block.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {block.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
