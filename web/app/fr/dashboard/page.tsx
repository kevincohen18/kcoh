import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { altLanguages } from "@/lib/i18n/alternates";
import { demoCopy } from "@/content/demo-copy";
import { DashboardPageContent } from "../../dashboard/dashboard-page-content";

// Mirrors app/dashboard/page.tsx — same content component, which already
// derives locale="fr" from the `/fr` path via useLocale(). Title/description
// reuse the existing French framing copy from content/demo-copy.ts (see
// PATTERN.md's "Voice" section: no new translations invented here).
export const metadata: Metadata = {
  ...pageMetadata({
    title: demoCopy.fr.hero.eyebrow,
    description: demoCopy.fr.hero.intro,
    path: "/fr/dashboard/",
  }),
  alternates: {
    canonical: "/fr/dashboard/",
    languages: altLanguages("/dashboard/"),
  },
};

export default function DashboardPageFr() {
  return <DashboardPageContent />;
}
