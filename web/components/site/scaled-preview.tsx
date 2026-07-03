"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Renders `children` at a fixed `designWidth` (so their desktop layout is
 *  correct), then scales them down to fit the available column width — the
 *  classic "product screenshot" technique. Reserves the scaled height so the
 *  surrounding layout doesn't collapse. Children are non-interactive unless
 *  `interactive` is set (e.g. the "compose your stack" map with hovercards). */
export function ScaledPreview({
  designWidth = 1160,
  className,
  interactive = false,
  children,
}: {
  designWidth?: number;
  className?: string;
  interactive?: boolean;
  children: React.ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number>();

  useIsoLayoutEffect(() => {
    const compute = () => {
      const o = outer.current;
      const i = inner.current;
      if (!o || !i) return;
      const s = Math.min(1, o.clientWidth / designWidth);
      setScale(s);
      setHeight(i.offsetHeight * s);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (outer.current) ro.observe(outer.current);
    if (inner.current) ro.observe(inner.current);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div
      ref={outer}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height }}
    >
      <div
        ref={inner}
        aria-hidden={interactive ? undefined : true}
        className={interactive ? "pointer-events-auto" : "pointer-events-none select-none"}
        style={{
          width: designWidth,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
