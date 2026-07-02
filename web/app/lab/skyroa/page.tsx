import { notFound } from "next/navigation";

import { SkyroaCaseStudy } from "@/components/diagram/skyroa-case-study";

/** Dev-only preview (gated out of production). */
export default function SkyroaLabPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="min-h-screen w-full" style={{ background: "#fbfbfd" }}>
      <SkyroaCaseStudy />
    </div>
  );
}
