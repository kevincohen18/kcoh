import { notFound } from "next/navigation";

import { ScalableSystemDiagram } from "@/components/diagram/scalable-system-diagram";

/**
 * Dev-only lab surface for iterating on the system-architecture diagram
 * design system. Gated out of production; not linked from anywhere.
 */
export default function SystemDesignLabPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-auto bg-black p-8">
      <ScalableSystemDiagram />
    </div>
  );
}
