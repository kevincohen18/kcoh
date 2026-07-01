"use client";

import { useId } from "react";
import { areaPath, linePath, toPoints } from "@/lib/charts/geometry";

export function AreaChart({
  data,
  width = 560,
  height = 190,
  highlightIndex,
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  highlightIndex?: number;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const pad = 6;
  const line = linePath(data, width, height, pad);
  const area = areaPath(data, width, height, pad);
  const pts = toPoints(data, width, height, pad);
  const hp = highlightIndex !== undefined ? pts[highlightIndex] : undefined;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label="Revenue over time"
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
  );
}
