import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { altLanguages } from "@/lib/i18n/alternates";
import { WorkIndex } from "@/components/work/work-index";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Work",
    description:
      "Case studies from KCOH Software Inc.: Concordia Connect, Drafterie, Skyroa, and AutoMedic. Systems built, shipped, and operated in production.",
    path: "/work/",
  }),
  alternates: { canonical: "/work/", languages: altLanguages("/work/") },
};

export default function WorkPage() {
  return <WorkIndex />;
}
