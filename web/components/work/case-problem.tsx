import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/content/case-studies";

export function CaseProblem({ study }: { study: CaseStudy }) {
  return (
    <section className="bg-bg">
      <Container className="py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel>The Problem</SectionLabel>
          </Reveal>
          <div className="space-y-5 lg:col-span-7 lg:col-start-6">
            {study.problem.map((para, i) => (
              <Reveal key={para} delay={i * 0.05}>
                <p
                  className={cn(
                    "leading-relaxed",
                    i === 0 ? "text-xl text-fg" : "text-lg text-fg-muted",
                  )}
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
