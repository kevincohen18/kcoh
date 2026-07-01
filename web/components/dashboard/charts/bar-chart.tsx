"use client";

import { useId } from "react";

export type BarGroup = { label: string; a: number; b: number };

export function BarChart({
  data,
  max = 30,
  width = 520,
  height = 190,
  className,
}: {
  data: BarGroup[];
  max?: number;
  width?: number;
  height?: number;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const pad = 10;
  const innerH = height - pad * 2;
  const groupW = (width - pad * 2) / data.length;
  const barW = Math.min(14, groupW / 3.2);
  const gap = 6;

  const y = (v: number) => pad + innerH - (v / max) * innerH;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label="Projects overview"
    >
      <defs>
        <linearGradient id={`barA-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--brand)" }} />
          <stop offset="100%" style={{ stopColor: "var(--brand)", stopOpacity: 0.55 }} />
        </linearGradient>
        <linearGradient id={`barB-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--highlight)" }} />
          <stop offset="100%" style={{ stopColor: "var(--highlight)", stopOpacity: 0.5 }} />
        </linearGradient>
      </defs>
      {data.map((g, i) => {
        const cx = pad + groupW * i + groupW / 2;
        const ax = cx - barW - gap / 2;
        const bx = cx + gap / 2;
        return (
          <g key={g.label}>
            <rect
              x={ax}
              y={y(g.a)}
              width={barW}
              height={pad + innerH - y(g.a)}
              rx={4}
              fill={`url(#barA-${uid})`}
            />
            <rect
              x={bx}
              y={y(g.b)}
              width={barW}
              height={pad + innerH - y(g.b)}
              rx={4}
              fill={`url(#barB-${uid})`}
            />
          </g>
        );
      })}
    </svg>
  );
}
