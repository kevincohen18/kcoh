"use client";

import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { ScaledPreview } from "@/components/site/scaled-preview";
import { StackMap } from "@/components/diagram/showcase/stack-map";
import { processSteps, processCopy } from "@/content/process";
import { useLocale } from "@/lib/i18n/locale";

export function HowWeWork() {
  const { locale } = useLocale();
  const steps = processSteps[locale];
  const copy = processCopy[locale];

  return (
    <section id="process" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-muted md:text-base">
            {copy.lede}
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.06} className="flex gap-3.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--brand),var(--highlight))] text-[13px] font-semibold text-white">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-fg">{s.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{s.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.12} className="mt-14">
          <ScaledPreview designWidth={1280} interactive>
            <div className="block dark:hidden">
              <StackMap theme="light" locale={locale} />
            </div>
            <div className="hidden dark:block">
              <StackMap theme="dark" locale={locale} />
            </div>
          </ScaledPreview>
        </Reveal>
      </Container>
    </section>
  );
}
