import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { ProjectTheme } from "@/components/site/project-theme";
import { ProjectMiniPreview } from "@/components/work/mini-preview";
import { projects, type Project } from "@/content/projects";
import type { CaseSlug } from "@/content/case-studies";

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
  return (
    <ProjectTheme accent={project.color} className="h-full w-full">
      <Link
        href={project.href}
        data-preview-group
        className="group flex h-full flex-col rounded-[20px] border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand)_45%,transparent)] hover:shadow-[0_30px_80px_-32px_color-mix(in_srgb,var(--brand)_60%,transparent)]"
      >
        <div className="flex items-center justify-between gap-4">
          <SectionLabel className="tracking-[0.18em]">
            {project.tagline}
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
          {project.description}
        </p>
        <div className="mt-5 flex-1">
          <ProjectMiniPreview slug={slug} />
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-text">
          Read the case study
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </ProjectTheme>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-24 bg-bg">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionLabel>Featured Work</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-fg">
            Everything shown here was built, shipped, and operated in
            production.
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
