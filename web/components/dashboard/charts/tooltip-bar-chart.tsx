"use client";

import { useId, useState } from "react";
import { barIndexFromX } from "@/lib/demo/hover";
import { cn } from "@/lib/utils";
import type { BarGroup } from "./bar-chart";
import { ChartTooltip } from "./chart-tooltip";

type HoverState = { index: number; cx: number; cy: number };

/**
 * BarChart variant with per-group hover: a faint brand wash behind the
 * hovered group plus a ChartTooltip showing the group label + formatValue.
 * Same geometry constants as the base BarChart (pad 10, barW cap 14, gap 6).
 */
export function TooltipBarChart({
  data,
  formatValue,
  max = 30,
  width = 520,
  height = 220,
  ariaLabel,
  className,
}: {
  data: BarGroup[];
  formatValue: (group: BarGroup) => string;
  max?: number;
  width?: number;
  height?: number;
  ariaLabel: string;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const [hover, setHover] = useState<HoverState | null>(null);
  const pad = 10;
  const innerH = height - pad * 2;
  const groupW = (width - pad * 2) / data.length;
  const barW = Math.min(14, groupW / 3.2);
  const gap = 6;

  const y = (v: number) => pad + innerH - (v / max) * innerH;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (data.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const viewX = ((e.clientX - rect.left) / rect.width) * width;
    const index = barIndexFromX(viewX - pad, width - pad * 2, data.length);
    if (index < 0) return;
    const g = data[index];
    const cx = pad + groupW * index + groupW / 2;
    const cy = y(Math.max(g.a, g.b));
    setHover({
      index,
      cx: (cx / width) * rect.width,
      cy: (cy / height) * rect.height,
    });
  }

  const hovered = hover ? data[hover.index] : undefined;

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
          <linearGradient id={`barA-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--brand)" }} />
            <stop offset="100%" style={{ stopColor: "var(--brand)", stopOpacity: 0.55 }} />
          </linearGradient>
          <linearGradient id={`barB-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--highlight)" }} />
            <stop offset="100%" style={{ stopColor: "var(--highlight)", stopOpacity: 0.5 }} />
          </linearGradient>
        </defs>
        {hover ? (
          <rect
            x={pad + groupW * hover.index}
            y={pad}
            width={groupW}
            height={innerH}
            rx={8}
            style={{ fill: "var(--brand)" }}
            opacity={0.08}
          />
        ) : null}
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
      {hover && hovered ? (
        <ChartTooltip
          x={hover.cx}
          y={hover.cy}
          label={hovered.label}
          value={formatValue(hovered)}
        />
      ) : null}
    </div>
  );
}
