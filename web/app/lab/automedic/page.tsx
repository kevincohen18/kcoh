import { notFound } from "next/navigation";

import { AutoMedicCaseStudy } from "@/components/diagram/automedic-case-study";

/** Dev-only preview (gated out of production). */
export default function AutoMedicLabPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="min-h-screen w-full" style={{ background: "#fbfbfd" }}>
      <AutoMedicCaseStudy />
    </div>
  );
}
