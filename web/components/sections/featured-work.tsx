"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { ProjectTheme } from "@/components/site/project-theme";
import { LocaleLink } from "@/components/site/locale-link";
import { ProjectMiniPreview } from "@/components/work/mini-preview";
import { usePointerGlow } from "@/lib/hooks/use-pointer-glow";
import {
  projects,
  featuredProjectCopy,
  featuredWorkCopy,
  type Project,
} from "@/content/projects";
import type { CaseSlug } from "@/content/case-studies";
import { useLocale } from "@/lib/i18n/locale";

const featuredSlugs: CaseSlug[] = [
  "concordia-connect",
  "drafterie",
  "skyroa",
  "automedic",
];

const featured = featuredSlugs.flatMap((slug) => {
  const project = projects.find((p) => p.slug === slug);
  return project ? [{ slug, project }] : [];
});

function FeatureCard({ slug, project }: { slug: CaseSlug; project: Project }) {
  const { onMouseMove, onMouseLeave } = usePointerGlow();
  const { locale } = useLocale();
  const copy = featuredProjectCopy[locale][slug];
  return (
    <ProjectTheme accent={project.color} className="h-full w-full">
      <LocaleLink
        href={project.href}
        data-preview-group
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand)_45%,transparent)] hover:shadow-[0_30px_80px_-32px_color-mix(in_srgb,var(--brand)_60%,transparent)]"
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
        <div className="flex items-center justify-between gap-4">
          <SectionLabel className="tracking-[0.18em]">
            {copy.tagline}
          </SectionLabel>
          <div
            className="grid size-9 shrink-0 place-items-center rounded-lg"
            style={{ background: `${project.color}1f` }}
          >
            <Image
              src={project.logo}
              alt=""
              width={22}
              height={22}
              className="size-5 object-contain"
            />
          </div>
        </div>
        <h3 className="mt-3 font-serif text-2xl font-medium tracking-[-0.01em] text-fg">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {copy.description}
        </p>
        <div className="mt-5 flex-1">
          <ProjectMiniPreview slug={slug} />
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-text">
          {featuredWorkCopy[locale].readCaseStudy}
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </LocaleLink>
    </ProjectTheme>
  );
}

export function FeaturedWork() {
  const { locale } = useLocale();
  const wc = featuredWorkCopy[locale];
  return (
    <section id="work" className="scroll-mt-24 bg-bg">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionLabel>{wc.eyebrow}</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
            {wc.heading}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map(({ slug, project }, i) => (
            <Reveal key={slug} delay={i * 0.08} className="flex">
              <FeatureCard slug={slug} project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
