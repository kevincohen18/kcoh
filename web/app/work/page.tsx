import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { LogoRow } from "@/components/site/logo-row";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { WorkFeatureRow } from "@/components/work/feature-row";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from KCOH Software Inc.: Concordia Connect, Drafterie, Skyroa, and AutoMedic. Systems built, shipped, and operated in production.",
  alternates: { canonical: "/work/" },
  openGraph: {
    title: "Work",
    description:
      "Case studies from KCOH Software Inc.: Concordia Connect, Drafterie, Skyroa, and AutoMedic.",
    images: ["/og.png"],
  },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title={
          <>
            Systems that run
            <br />
            real businesses.
          </>
        }
        intro="Everything shown here was built, shipped, and operated in production."
      />

      {caseStudies.map((study, i) => (
        <WorkFeatureRow key={study.slug} study={study} flip={i % 2 === 1} />
      ))}

      <section className="border-t border-border bg-section">
        <Container className="py-14 md:py-16">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-fg-subtle">
              Also built and shipped
            </p>
            <LogoRow names={["Success", "FrostyNow"]} />
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
