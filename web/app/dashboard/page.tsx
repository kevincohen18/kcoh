import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { DashboardScreen } from "@/components/dashboard/dashboard-screen";

export const metadata: Metadata = {
  title: "Live Dashboard",
  description:
    "A live look at the KCOH operations dashboard: revenue, projects, clients, and invoices in one place.",
};

export default function DashboardPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mb-8 max-w-2xl">
        <SectionLabel>Product preview</SectionLabel>
        <h1 className="mt-4 font-serif text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.015em] text-fg">
          The operations dashboard we build for you.
        </h1>
        <p className="mt-4 text-lg text-fg-muted">
          Real-time revenue, project health, and financial clarity in a single
          view. This is a live, interactive preview — resize it, switch themes,
          and explore.
        </p>
      </div>
      <DashboardScreen />
    </Container>
  );
}
