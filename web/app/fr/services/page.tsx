import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ServicesPageContent } from "@/components/services/services-page-content";
import { altLanguages } from "@/lib/i18n/alternates";
import { serviceDetailsCopy } from "@/content/service-details";

// Mirrors app/services/page.tsx — same content component, which already
// derives locale="fr" from the `/fr` path via useLocale()/usePathname().
// Title/description reuse existing French copy from
// content/service-details.ts (serviceDetailsCopy.fr.pageHero) — see
// PATTERN.md, "Adding a `/fr/<route>` mirror".
export const metadata: Metadata = {
  ...pageMetadata({
    title: serviceDetailsCopy.fr.pageHero.eyebrow,
    description: serviceDetailsCopy.fr.pageHero.intro,
    path: "/fr/services/",
  }),
  alternates: {
    canonical: "/fr/services/",
    languages: altLanguages("/services/"),
  },
};

export default function ServicesPageFr() {
  return <ServicesPageContent />;
}
