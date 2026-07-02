import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ServicesPageContent } from "@/components/services/services-page-content";

// Metadata is server-rendered and static per route; there's no `/fr` route
// to serve French metadata to, so it stays English by design (see
// PATTERN.md, "Page <title>/metadata strings"). Visible body copy below is
// bilingual via `ServicesPageContent`.
export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Business systems engineering: custom software, automation, financial systems, integrations, iOS development, and ongoing support. Fixed quotes after discovery, no hourly billing.",
  path: "/services/",
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
