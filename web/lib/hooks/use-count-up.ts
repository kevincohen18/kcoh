"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/** Ease-out cubic: fast start, gentle settle. Maps [0,1] -> [0,1]. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Eased, rounded value for a given animation progress (clamped to [0,1]). */
export function computeCountUp(target: number, progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.round(target * easeOutCubic(clamped));
}

type CountUpOptions = { duration?: number; enabled?: boolean };

/**
 * Animates a number from 0 up to `target`. Returns `target` immediately when
 * disabled or when the user prefers reduced motion. Always finishes exactly on
 * `target` (never overshoots).
 */
export function useCountUp(target: number, opts?: CountUpOptions): number {
  const { duration = 1200, enabled = true } = opts ?? {};
  const reduced = useReducedMotion();
  const [value, setValue] = useState(enabled ? 0 : target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || reduced) {
      setValue(target);
      return;
    }

    let startTs: number | null = null;
    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const progress = (ts - startTs) / duration;
      if (progress >= 1) {
        setValue(target);
        return;
      }
      setValue(computeCountUp(target, progress));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, enabled, reduced]);

  return value;
}
