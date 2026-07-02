import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ServicesPageContent } from "@/components/services/services-page-content";
import { altLanguages } from "@/lib/i18n/alternates";

// French metadata is served by app/fr/services/page.tsx — alternates.languages
// links the two (see PATTERN.md, "Adding a `/fr/<route>` mirror"). Visible
// body copy below is bilingual via `ServicesPageContent`.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Services",
    description:
      "Business systems engineering: custom software, automation, financial systems, integrations, iOS development, and ongoing support. Fixed quotes after discovery, no hourly billing.",
    path: "/services/",
  }),
  alternates: { canonical: "/services/", languages: altLanguages("/services/") },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
