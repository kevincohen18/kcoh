"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { areaPath, linePath, toPoints } from "@/lib/charts/geometry";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-40px" } as const;

export function AreaChart({
  data,
  width = 560,
  height = 190,
  highlightIndex,
  animateIn = true,
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  highlightIndex?: number;
  animateIn?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const reduced = useReducedMotion();
  const animate = animateIn && !reduced;
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
      <motion.path
        d={area}
        fill={`url(#fill-${uid})`}
        initial={animate ? { opacity: 0 } : undefined}
        whileInView={animate ? { opacity: 1 } : undefined}
        viewport={VIEWPORT}
        transition={{ duration: 0.3, ease: EASE, delay: 0.08 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={`url(#stroke-${uid})`}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={animate ? { pathLength: 0 } : undefined}
        whileInView={animate ? { pathLength: 1 } : undefined}
        viewport={VIEWPORT}
        transition={{ duration: 0.35, ease: EASE }}
      />
      {hp ? (
        <motion.g
          initial={animate ? { opacity: 0 } : undefined}
          whileInView={animate ? { opacity: 1 } : undefined}
          viewport={VIEWPORT}
          transition={{ duration: 0.25, ease: EASE, delay: 0.15 }}
        >
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
        </motion.g>
      ) : null}
    </svg>
  );
}
