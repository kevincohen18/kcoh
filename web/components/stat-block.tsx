"use client";

import { useCountUp } from "@/lib/hooks/use-count-up";
import type { Metric } from "@/content/metrics";

export function StatBlock({ metric }: { metric: Metric }) {
  const n = useCountUp(metric.value, { enabled: !metric.display });
  return (
    <div>
      <div className="font-serif text-4xl font-medium tracking-tight text-fg md:text-5xl">
        {metric.display ?? `${n.toLocaleString()}${metric.suffix ?? ""}`}
      </div>
      <div className="mt-2 text-sm text-fg-muted">{metric.label}</div>
    </div>
  );
}
