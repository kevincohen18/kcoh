"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      // Critically damped spring, measured against motion-dom's own generator
      // and rest thresholds: opacity (0->1) settles at 370ms, y (16->0) at
      // 267ms — both inside the <=400ms global motion budget, zero overshoot.
      transition={{ type: "spring", stiffness: 390, damping: 28, mass: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
