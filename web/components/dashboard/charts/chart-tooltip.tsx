import { cn } from "@/lib/utils";

/**
 * Positioned tooltip for the demo charts. Parent must be `relative`;
 * `x`/`y` are pixel coordinates within that parent. Rendered 10px above
 * the anchor point, centered horizontally. Pure presentation, no state.
 */
export function ChartTooltip({
  x,
  y,
  label,
  value,
  className,
}: {
  x: number;
  y: number;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs shadow-lg",
        className,
      )}
      style={{ left: x, top: y }}
    >
      {label ? <div className="text-fg-subtle">{label}</div> : null}
      <div className="font-semibold text-fg tabular-nums">{value}</div>
    </div>
  );
}
