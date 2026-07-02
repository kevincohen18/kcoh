"use client";

import { useMediaQuery } from "@/lib/hooks/use-media-query";

/**
 * Tracks the user's `prefers-reduced-motion` setting. Returns `false` during
 * SSR and the first client render (so server and client markup match), then
 * updates after mount.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
