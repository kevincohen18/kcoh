import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { DashboardDemoLoader } from "@/components/dashboard/demo/dashboard-demo-loader";

export const metadata: Metadata = {
  title: "Live Demo",
  description:
    "A playable preview of the operations dashboards we build: revenue, projects, invoices, and analytics in one place.",
};

export default function DashboardPage() {
  return (
    <>
      <PageHero
        eyebrow="Product demo"
        title="The operations dashboard we build for you."
        intro="This is the kind of system we build — click around. Switch screens, sort the invoices, hover the charts, and flip the theme."
      />
      <Container className="pb-20 md:pb-28">
        <DashboardDemoLoader />
        <p className="mt-3 text-center text-xs text-fg-subtle">
          Simulated data. The components are the ones we ship.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-fg-muted">
            Want a system like this behind your business? It starts with a
            conversation.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/contact/">
              Start the conversation
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
