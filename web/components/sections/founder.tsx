"use client";

import Image from "next/image";
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { founder } from "@/content/founder";
import { useLocale } from "@/lib/i18n/locale";

export function Founder() {
  const { locale } = useLocale();
  const f = founder[locale];

  return (
    <section id="about" className="scroll-mt-24">
      <Container className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <SectionLabel>{f.eyebrow}</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.1] tracking-[-0.015em] text-fg">
            {f.statement}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
            {f.supporting}
          </p>
          <div className="mt-8">
            <svg
              viewBox="0 0 140 44"
              className="h-10 w-auto text-brand"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 30 C 18 6, 26 6, 30 26 S 44 40, 52 20 60 6, 70 28 M 66 24 C 82 10, 96 10, 110 24 M 100 22 C 116 12, 128 14, 136 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm font-medium text-fg">&mdash; {f.name}</p>
            <p className="text-sm text-fg-subtle">{f.role}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[20px] border border-border bg-section">
            <Image
              src={f.photo}
              alt={`${f.name}, ${f.role}`}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
