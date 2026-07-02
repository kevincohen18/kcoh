"use client";

import { useId, useState } from "react";
import { areaPath, linePath, toPoints } from "@/lib/charts/geometry";
import { hoverIndexFromX } from "@/lib/demo/hover";
import { cn } from "@/lib/utils";
import { ChartTooltip } from "./chart-tooltip";

type HoverState = { index: number; cx: number; cy: number };

/**
 * AreaChart variant with a cursor-tracking tooltip: vertical guide line,
 * ring dot, and a ChartTooltip showing labels[i] + formatValue(data[i]).
 * `className` must give the wrapper a height (e.g. "h-56 w-full").
 */
export function TooltipAreaChart({
  data,
  labels,
  formatValue,
  width = 560,
  height = 220,
  ariaLabel,
  className,
}: {
  data: number[];
  labels: string[];
  formatValue: (value: number) => string;
  width?: number;
  height?: number;
  ariaLabel: string;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const [hover, setHover] = useState<HoverState | null>(null);
  const pad = 6;
  const line = linePath(data, width, height, pad);
  const area = areaPath(data, width, height, pad);
  const pts = toPoints(data, width, height, pad);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (pts.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const viewX = ((e.clientX - rect.left) / rect.width) * width;
    const index = hoverIndexFromX(viewX - pad, width - pad * 2, data.length);
    if (index < 0) return;
    const pt = pts[index];
    setHover({
      index,
      cx: (pt.x / width) * rect.width,
      cy: (pt.y / height) * rect.height,
    });
  }

  const hp = hover ? pts[hover.index] : undefined;
  const hoveredValue = hover ? data[hover.index] : undefined;

  return (
    <div
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHover(null)}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--brand)", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "var(--brand)", stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id={`stroke-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" style={{ stopColor: "var(--brand)" }} />
            <stop offset="100%" style={{ stopColor: "var(--highlight)" }} />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#fill-${uid})`} />
        <path
          d={line}
          fill="none"
          stroke={`url(#stroke-${uid})`}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {hp ? (
          <>
            <line
              x1={hp.x}
              y1={hp.y}
              x2={hp.x}
              y2={height - pad}
              style={{ stroke: "var(--brand)" }}
              strokeOpacity="0.4"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={hp.x}
              cy={hp.y}
              r={5}
              style={{ fill: "var(--card)", stroke: "var(--brand)" }}
              strokeWidth={2.5}
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : null}
      </svg>
      {hover && hoveredValue !== undefined ? (
        <ChartTooltip
          x={hover.cx}
          y={hover.cy}
          label={labels[hover.index] ?? ""}
          value={formatValue(hoveredValue)}
        />
      ) : null}
    </div>
  );
}
