"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Gentle fade-rise on page mount. Skipped on the very first page load
 * (so prerendered HTML is never hidden pre-hydration) and under
 * prefers-reduced-motion; runs on every client-side navigation where
 * the first path segment changes (Next remounts the root template).
 */
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const animateEntry = hasNavigated && !reduced;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (!animateEntry) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
