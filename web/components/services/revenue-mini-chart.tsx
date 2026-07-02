"use client";

import { AreaChart } from "@/components/dashboard/charts/area-chart";
import { cn } from "@/lib/utils";
import { revenueMiniChartCopy } from "@/content/service-details";
import { useLocale } from "@/lib/i18n/locale";

const revenueSeries = [
  12, 14, 13, 16, 18, 17, 20, 19, 22, 21, 24, 23, 20, 25, 27, 26, 29, 24, 28,
  30, 27, 31, 29, 33, 30, 34, 32, 36, 35, 38,
];

export function RevenueMiniChart({ className }: { className?: string }) {
  const { locale } = useLocale();
  const copy = revenueMiniChartCopy[locale];

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg">{copy.title}</h3>
        <span className="rounded-md border border-border px-2 py-1 text-[11px] text-fg-muted">
          {copy.period}
        </span>
      </div>
      <div className="mb-1 text-2xl font-semibold text-fg tabular-nums">{copy.value}</div>
      <div className="mb-3 text-xs">
        <span className="text-pos">{copy.change}</span>{" "}
        <span className="text-fg-subtle">{copy.changeCaption}</span>
      </div>
      <AreaChart data={revenueSeries} highlightIndex={19} className="h-32 w-full" />
      <div className="mt-2 flex justify-between text-[11px] text-fg-subtle">
        {copy.dateLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
