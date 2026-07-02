"use client";

import { useTilt } from "@/lib/hooks/use-tilt";
import { cn } from "@/lib/utils";

export function Tilt({
  maxDeg = 2,
  className,
  children,
}: {
  maxDeg?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const { ref, style, onMouseMove, onMouseLeave } = useTilt(maxDeg);

  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
