import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { ProjectTheme } from "@/components/site/project-theme";
import { nextCaseStudy } from "@/content/case-studies";
import type { CaseSlug } from "@/content/case-studies";

// Self-themed with the NEXT project's accent so the handoff row previews the
// destination's color identity.
export function NextProjectPager({ current }: { current: CaseSlug }) {
  const next = nextCaseStudy(current);

  return (
    <ProjectTheme accent={next.accent}>
      <section className="border-t border-border bg-section-alt">
        <Container className="py-12 md:py-16">
          <Link
            href={`/work/${next.slug}/`}
            className="group flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <span
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-border"
                style={{ background: `${next.accent}14` }}
              >
                <Image
                  src={next.logoSrc}
                  alt={`${next.name} logo`}
                  width={24}
                  height={24}
                  className="size-6 object-contain"
                />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-text">
                  Next case study
                </p>
                <p className="mt-1 font-serif text-2xl font-medium tracking-[-0.01em] text-fg md:text-3xl">
                  {next.name}
                </p>
              </div>
            </div>
            <ArrowRight
              size={22}
              className="shrink-0 text-fg-muted transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Container>
      </section>
    </ProjectTheme>
  );
}
