import { notFound } from "next/navigation";

import { ConcordiaCaseStudy } from "@/components/diagram/concordia-case-study";

/** Dev-only preview (gated out of production). */
export default function ConcordiaLabPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="min-h-screen w-full" style={{ background: "#fbfbfd" }}>
      <ConcordiaCaseStudy />
    </div>
  );
}
