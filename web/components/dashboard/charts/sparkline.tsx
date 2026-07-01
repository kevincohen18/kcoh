"use client";

import { useId } from "react";
import { areaPath, linePath } from "@/lib/charts/geometry";

export function Sparkline({
  data,
  width = 180,
  height = 56,
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`spark-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--brand)", stopOpacity: 0.25 }} />
          <stop offset="100%" style={{ stopColor: "var(--brand)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path d={areaPath(data, width, height, 3)} fill={`url(#spark-${uid})`} />
      <path
        d={linePath(data, width, height, 3)}
        fill="none"
        style={{ stroke: "var(--brand)" }}
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
