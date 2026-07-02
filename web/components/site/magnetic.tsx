"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useSpring } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Pure magnetic-pull math: dx/dy are the pointer offset from the element
 * center in px. Returns a translation scaled by strength and clamped to
 * plus/minus max px so buttons never fly off their layout position.
 */
export function computeMagneticOffset(
  dx: number,
  dy: number,
  strength: number,
  max = 12,
): { x: number; y: number } {
  const clamp = (v: number) => Math.min(Math.max(v, -max), max);
  return { x: clamp(dx * strength), y: clamp(dy * strength) };
}

const SPRING = { stiffness: 260, damping: 18, mass: 0.4 };

/**
 * Slight magnetic pull toward the cursor plus a press state.
 * Static passthrough on touch/coarse pointers and reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.25,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  useEffect(() => {
    setFinePointer(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, []);

  const enabled = finePointer && !reduced;

  const onMouseMove: React.MouseEventHandler<HTMLSpanElement> = useCallback(
    (e) => {
      if (!enabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const o = computeMagneticOffset(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2),
        strength,
      );
      x.set(o.x);
      y.set(o.y);
    },
    [enabled, strength, x, y],
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduced) {
    return <span className="inline-block">{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.span>
  );
}
