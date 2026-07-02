"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { donutArc } from "@/lib/charts/geometry";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export type DonutSegment = { value: number; color: string };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-40px" } as const;

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
  animateIn = true,
  children,
  className,
}: {
  pct?: number;
  segments?: DonutSegment[];
  size?: number;
  stroke?: number;
  trackClassName?: string;
  animateIn?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const reduced = useReducedMotion();
  const animate = animateIn && !reduced;
  const r = (size - stroke) / 2;
  const cx = size / 2;

  let offset = 0;
  const segmentStarts: number[] = [];
  if (segments) {
    let acc = 0;
    for (const seg of segments) {
      segmentStarts.push(acc);
      acc += seg.value;
    }
  }

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
        {segments ? (
          animate ? (
            <g transform={`rotate(-90 ${cx} ${cx})`}>
              {segments.map((seg, i) => {
                const start = segmentStarts[i];
                return (
                  <motion.circle
                    key={i}
                    cx={cx}
                    cy={cx}
                    r={r}
                    fill="none"
                    style={{ stroke: seg.color }}
                    strokeWidth={stroke}
                    strokeLinecap="butt"
                    initial={{ pathLength: 0, pathOffset: start }}
                    whileInView={{ pathLength: seg.value, pathOffset: start }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.3, ease: EASE, delay: i * 0.05 }}
                  />
                );
              })}
            </g>
          ) : (
            segments.map((seg, i) => {
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
          )
        ) : pct !== undefined ? (
          animate ? (
            <g transform={`rotate(-90 ${cx} ${cx})`}>
              <motion.circle
                cx={cx}
                cy={cx}
                r={r}
                fill="none"
                stroke={`url(#ring-${uid})`}
                strokeWidth={stroke}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: Math.min(Math.max(pct, 0), 1) }}
                viewport={VIEWPORT}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </g>
          ) : (
            (() => {
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
          )
        ) : null}
      </svg>
      {children ? (
        <div className="absolute inset-0 grid place-items-center text-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}
