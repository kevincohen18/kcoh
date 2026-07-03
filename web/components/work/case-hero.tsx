"use client";

import Image from "next/image";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { useLocale } from "@/lib/i18n/locale";
import { workCopy } from "@/content/case-studies";
import type { CaseStudy } from "@/content/case-studies";

// Rendered inside the page-level ProjectTheme wrapper, so var(--brand) is the
// project accent here. The gradient is a low-opacity radial tint on the base
// background — an atmosphere, never a fill.
export function CaseHero({ study }: { study: CaseStudy }) {
  const { locale } = useLocale();
  const copy = workCopy[locale];
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />
      <Container className="relative pb-16 pt-20 md:pb-20 md:pt-28">
        <Reveal>
          <div className="flex items-center gap-4">
            <span
              className="grid size-14 shrink-0 place-items-center rounded-2xl border border-border"
              style={{ background: `${study.accent}14` }}
            >
              <Image
                src={study.logoSrc}
                alt={`${study.name} logo`}
                width={32}
                height={32}
                className="size-8 object-contain"
                priority
              />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-text">
                {copy.case.caseStudyLabel}
              </p>
              <h1 className="mt-1 font-serif text-[clamp(36px,5vw,64px)] font-medium leading-[1.02] tracking-[-0.015em] text-fg">
                {study.name}
              </h1>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {study.oneLiner}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {study.factChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-fg"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
