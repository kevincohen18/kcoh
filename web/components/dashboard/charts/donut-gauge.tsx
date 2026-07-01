"use client";

import { useId } from "react";
import { donutArc } from "@/lib/charts/geometry";

export type DonutSegment = { value: number; color: string };

/**
 * A ring gauge. Pass a single `pct` for a one-value gauge, or `segments`
 * (values that sum to a whole) for a multi-part donut.
 */
export function DonutGauge({
  pct,
  segments,
  size = 140,
  stroke = 14,
  trackClassName = "text-border",
  children,
  className,
}: {
  pct?: number;
  segments?: DonutSegment[];
  size?: number;
  stroke?: number;
  trackClassName?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const cx = size / 2;

  let offset = 0;

  return (
    <div className={className} style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={`ring-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--brand)" }} />
            <stop offset="100%" style={{ stopColor: "var(--highlight)" }} />
          </linearGradient>
        </defs>
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className={trackClassName}
          stroke="currentColor"
        />
        {segments
          ? segments.map((seg, i) => {
              const { dash, gap } = donutArc(seg.value, r);
              const el = (
                <circle
                  key={i}
                  cx={cx}
                  cy={cx}
                  r={r}
                  fill="none"
                  style={{ stroke: seg.color }}
                  strokeWidth={stroke}
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                  transform={`rotate(-90 ${cx} ${cx})`}
                />
              );
              offset += dash;
              return el;
            })
          : pct !== undefined
            ? (() => {
                const { dash, gap } = donutArc(pct, r);
                return (
                  <circle
                    cx={cx}
                    cy={cx}
                    r={r}
                    fill="none"
                    stroke={`url(#ring-${uid})`}
                    strokeWidth={stroke}
                    strokeDasharray={`${dash} ${gap}`}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${cx} ${cx})`}
                  />
                );
              })()
            : null}
      </svg>
      {children ? (
        <div className="absolute inset-0 grid place-items-center text-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}
