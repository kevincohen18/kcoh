"use client";

import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { ScaledPreview } from "@/components/site/scaled-preview";
import { DashboardScreen } from "@/components/dashboard/dashboard-screen";
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
          <h2 className="mt-4 max-w-xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
            {copy.heading}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <ol className="space-y-8 lg:col-span-5">
            {steps.map((s, i) => (
              <li key={s.n}>
                <Reveal delay={i * 0.06} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--brand),var(--highlight))] text-sm font-semibold text-white">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-fg">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-30 blur-3xl"
                style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
              />
              <ScaledPreview designWidth={1160}>
                <DashboardScreen />
              </ScaledPreview>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
