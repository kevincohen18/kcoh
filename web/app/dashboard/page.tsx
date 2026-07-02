import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { altLanguages } from "@/lib/i18n/alternates";
import { DashboardPageContent } from "./dashboard-page-content";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Live Demo",
    description:
      "A playable preview of the operations dashboards we build: revenue, projects, invoices, and analytics in one place.",
    path: "/dashboard/",
  }),
  alternates: {
    canonical: "/dashboard/",
    languages: altLanguages("/dashboard/"),
  },
};

export default function DashboardPage() {
  return <DashboardPageContent />;
}
