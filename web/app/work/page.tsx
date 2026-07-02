import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { WorkIndex } from "@/components/work/work-index";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies from KCOH Software Inc.: Concordia Connect, Drafterie, Skyroa, and AutoMedic. Systems built, shipped, and operated in production.",
  path: "/work/",
});

export default function WorkPage() {
  return <WorkIndex />;
}
