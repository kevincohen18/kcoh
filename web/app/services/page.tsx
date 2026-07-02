import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { EngagementStrip } from "@/components/services/engagement-strip";
import { RevenueMiniChart } from "@/components/services/revenue-mini-chart";
import { ServiceBlock } from "@/components/services/service-block";
import { WorkflowFeed } from "@/components/services/workflow-feed";
import { serviceDetails, type ServiceSlug } from "@/content/service-details";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business systems engineering: custom software, automation, financial systems, integrations, iOS development, and ongoing support. Fixed quotes after discovery, no hourly billing.",
  alternates: { canonical: "/services/" },
};

const visuals: Partial<Record<ServiceSlug, React.ReactNode>> = {
  automation: <WorkflowFeed />,
  "financial-systems": <RevenueMiniChart />,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Business systems engineering."
        intro="Software that automates operations, clarifies finances, and creates operational leverage. Built for revenue-generating businesses scaling past manual processes."
      />

      <section className="border-t border-border bg-bg">
        <Container className="py-16 md:py-20">
          {serviceDetails.map((detail, i) => (
            <ServiceBlock
              key={detail.slug}
              detail={detail}
              index={i}
              visual={visuals[detail.slug]}
            />
          ))}
          <div className="mt-4 flex justify-center">
            <Link
              href="/dashboard/"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-brand-text"
            >
              Explore the live demo
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Container>
      </section>

      <EngagementStrip />
      <CTASection />
    </>
  );
}
