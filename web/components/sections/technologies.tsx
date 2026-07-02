import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/site/reveal";
import { LogoRow } from "@/components/site/logo-row";
import { technologies } from "@/content/technologies";

export function Technologies() {
  return (
    <section className="border-t border-border bg-bg">
      <Container className="py-14 md:py-16">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
            <SectionLabel className="shrink-0">Technologies</SectionLabel>
            <LogoRow names={technologies} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
