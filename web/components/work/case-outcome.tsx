"use client";

import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { StatBlock } from "@/components/stat-block";
import { outcomeToMetric } from "@/lib/case-metrics";
import { useLocale } from "@/lib/i18n/locale";
import { workCopy } from "@/content/case-studies";
import type { CaseStudy } from "@/content/case-studies";

export function CaseOutcome({ study }: { study: CaseStudy }) {
  const { locale } = useLocale();
  const copy = workCopy[locale];
  return (
    <section>
      <Container className="py-16 md:py-24">
        <Reveal>
          <SectionLabel>{copy.case.theOutcome}</SectionLabel>
        </Reveal>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {study.outcomes.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.06}>
              <StatBlock metric={outcomeToMetric(o.value, o.label)} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-14 border-t border-border pt-8">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-fg-subtle">
              {copy.case.builtWith}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-fg-muted">
              {study.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
