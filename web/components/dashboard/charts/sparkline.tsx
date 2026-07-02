"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { areaPath, linePath } from "@/lib/charts/geometry";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-40px" } as const;

export function Sparkline({
  data,
  width = 180,
  height = 56,
  animateIn = true,
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  animateIn?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const reduced = useReducedMotion();
  const animate = animateIn && !reduced;

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
      <motion.path
        d={areaPath(data, width, height, 3)}
        fill={`url(#spark-${uid})`}
        initial={animate ? { opacity: 0 } : undefined}
        whileInView={animate ? { opacity: 1 } : undefined}
        viewport={VIEWPORT}
        transition={{ duration: 0.3, ease: EASE, delay: 0.08 }}
      />
      <motion.path
        d={linePath(data, width, height, 3)}
        fill="none"
        style={{ stroke: "var(--brand)" }}
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={animate ? { pathLength: 0 } : undefined}
        whileInView={animate ? { pathLength: 1 } : undefined}
        viewport={VIEWPORT}
        transition={{ duration: 0.35, ease: EASE }}
      />
    </svg>
  );
}
