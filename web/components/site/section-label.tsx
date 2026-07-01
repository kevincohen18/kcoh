import { cn } from "@/lib/utils";

export function SectionLabel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "text-xs font-medium uppercase tracking-[0.25em] text-brand",
        className,
      )}
    >
      {children}
    </span>
  );
}
