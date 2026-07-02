import { notFound } from "next/navigation";

import { DrafterieCaseStudy } from "@/components/diagram/drafterie-case-study";

/** Dev-only preview (gated out of production). */
export default function DrafterieLabPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="min-h-screen w-full" style={{ background: "#fbfbfd" }}>
      <DrafterieCaseStudy />
    </div>
  );
}
