"use client";

import { useCallback } from "react";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

/** Pure transform: viewport pointer coords -> element-local coords. */
export function computeGlowPosition(
  rect: { left: number; top: number },
  clientX: number,
  clientY: number,
): { x: number; y: number } {
  return { x: clientX - rect.left, y: clientY - rect.top };
}

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

/**
 * Cursor-tracking brand glow for cards. Spread the returned handlers onto
 * the card root (which needs `relative overflow-hidden`) and render an
 * overlay child that reads --glow-x / --glow-y / --glow-opacity:
 *
 *   <div
 *     aria-hidden
 *     className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
 *     style={{
 *       opacity: "var(--glow-opacity, 0)",
 *       background:
 *         "radial-gradient(240px circle at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in srgb, var(--brand) 12%, transparent), transparent 70%)",
 *     }}
 *   />
 *
 * No-op on touch/coarse pointers.
 */
export function usePointerGlow(): {
  onMouseMove: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
} {
  const finePointer = useMediaQuery(FINE_POINTER_QUERY);

  const onMouseMove: React.MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      if (!finePointer) return;
      const el = e.currentTarget;
      const { x, y } = computeGlowPosition(
        el.getBoundingClientRect(),
        e.clientX,
        e.clientY,
      );
      el.style.setProperty("--glow-x", `${x}px`);
      el.style.setProperty("--glow-y", `${y}px`);
      el.style.setProperty("--glow-opacity", "1");
    },
    [finePointer],
  );

  const onMouseLeave: React.MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      e.currentTarget.style.setProperty("--glow-opacity", "0");
    },
    [],
  );

  return { onMouseMove, onMouseLeave };
}
