"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Simulated-live-data ticker. Advances `initial` through the pure `advance`
 * function every `intervalMs` milliseconds via setInterval.
 * Reduced-motion aware: when the user prefers reduced motion the interval
 * never starts (or is torn down) and the initial data stays frozen.
 * The interval is cleared on unmount.
 */
export function useTicker<T>(
  initial: T,
  advance: (current: T) => T,
  intervalMs = 1600,
): T {
  const [value, setValue] = useState(initial);
  const advanceRef = useRef(advance);
  const reduced = useReducedMotion();

  useEffect(() => {
    advanceRef.current = advance;
  }, [advance]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setValue((current) => advanceRef.current(current));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, intervalMs]);

  return value;
}
