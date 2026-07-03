"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/site/container";
import { LocaleLink } from "@/components/site/locale-link";
import { ProjectTheme } from "@/components/site/project-theme";
import { CaseSchematic } from "@/components/work/case-schematic";
import { Reveal } from "@/components/site/reveal";
import { usePointerGlow } from "@/lib/hooks/use-pointer-glow";
import { useLocale } from "@/lib/i18n/locale";
import { workCopy } from "@/content/case-studies";
import type { CaseStudy } from "@/content/case-studies";

export function WorkFeatureRow({
  study,
  flip = false,
}: {
  study: CaseStudy;
  flip?: boolean;
}) {
  const { onMouseMove, onMouseLeave } = usePointerGlow();
  const { locale } = useLocale();
  const copy = workCopy[locale];
  return (
    <ProjectTheme accent={study.accent}>
      <article
        className="relative overflow-hidden"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: "var(--glow-opacity, 0)",
            background:
              "radial-gradient(240px circle at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in srgb, var(--brand) 12%, transparent), transparent 70%)",
          }}
        />
        <Container>
          <div className="grid items-center gap-10 py-16 md:py-20 lg:grid-cols-12 lg:gap-14">
            <Reveal className={cn("lg:col-span-5", flip && "lg:order-2")}>
              <div className="flex items-center gap-3">
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-xl border border-border"
                  style={{ background: `${study.accent}1f` }}
                >
                  <Image
                    src={study.logoSrc}
                    alt={`${study.name} logo`}
                    width={24}
                    height={24}
                    className="size-6 object-contain"
                  />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-brand-text">
                  {study.tagline}
                </span>
              </div>
              <h2 className="mt-5 font-serif text-[clamp(28px,3.2vw,42px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
                {study.name}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
                {study.oneLiner}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {study.factChips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-fg-muted"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
              <LocaleLink
                href={`/work/${study.slug}/`}
                className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text"
              >
                {copy.index.readCaseStudy}
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </LocaleLink>
            </Reveal>

            <Reveal
              delay={0.1}
              className={cn("lg:col-span-7", flip && "lg:order-1")}
            >
              <CaseSchematic slug={study.slug} />
            </Reveal>
          </div>
        </Container>
      </article>
    </ProjectTheme>
  );
}
