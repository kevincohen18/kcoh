import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/projects";

const featuredSlugs = ["concordia-connect", "draftery", "skyroa", "automedic"];
const featured = featuredSlugs
  .map((s) => projects.find((p) => p.slug === s))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-24 bg-bg">
      <Container className="py-20 md:py-28">
        <h2 className="sr-only">Featured projects</h2>
        <Reveal className="mb-10 flex justify-center">
          <SectionLabel>Featured Projects</SectionLabel>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="flex">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
