"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { useSpring } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void): () => void {
  const mq = window.matchMedia(FINE_POINTER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getFinePointerSnapshot(): boolean {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function getFinePointerServerSnapshot(): boolean {
  return false;
}

/**
 * Pure tilt geometry: px/py are the pointer position normalized to [0, 1]
 * within the element (clamped). Returns degrees so the surface leans
 * toward the cursor, never exceeding maxDeg.
 */
export function computeTilt(
  px: number,
  py: number,
  maxDeg: number,
): { rotateX: number; rotateY: number } {
  const cx = Math.min(Math.max(px, 0), 1) - 0.5;
  const cy = Math.min(Math.max(py, 0), 1) - 0.5;
  // `+ 0` normalizes any `-0` result (e.g. from negating a zero `cy`) to `0`.
  return { rotateX: -cy * 2 * maxDeg + 0, rotateY: cx * 2 * maxDeg + 0 };
}

const SPRING = { stiffness: 160, damping: 18, mass: 0.4 };

/**
 * Cursor-aware perspective tilt (~2deg max by default), spring-driven.
 * Disabled on touch/coarse pointers and under prefers-reduced-motion.
 */
export function useTilt(maxDeg = 2): {
  ref: React.RefObject<HTMLDivElement | null>;
  style: React.CSSProperties;
  onMouseMove: React.MouseEventHandler;
  onMouseLeave: () => void;
} {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  const enabled = finePointer && !reduced;

  useEffect(() => {
    if (!enabled) {
      if (ref.current) ref.current.style.transform = "";
      return;
    }
    const apply = () => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `perspective(900px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`;
    };
    const unsubX = rotateX.on("change", apply);
    const unsubY = rotateY.on("change", apply);
    return () => {
      unsubX();
      unsubY();
    };
  }, [enabled, rotateX, rotateY]);

  const onMouseMove: React.MouseEventHandler = useCallback(
    (e) => {
      if (!enabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const t = computeTilt(
        (e.clientX - rect.left) / rect.width,
        (e.clientY - rect.top) / rect.height,
        maxDeg,
      );
      rotateX.set(t.rotateX);
      rotateY.set(t.rotateY);
    },
    [enabled, maxDeg, rotateX, rotateY],
  );

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return {
    ref,
    style: enabled ? { willChange: "transform" } : {},
    onMouseMove,
    onMouseLeave,
  };
}
