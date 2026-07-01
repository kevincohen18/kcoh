import Image from "next/image";
import { cn } from "@/lib/utils";

/** The KCOH dashboard shown on the marketing pages. Static PNG asset that
 *  swaps by theme via CSS (no hydration flash, no JS theme read). */
export function DashboardImage({
  className,
  priority,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src="/dashboard-dark.webp"
        alt="KCOH operations dashboard: revenue, projects, clients, and invoices"
        width={1536}
        height={1024}
        priority={priority}
        sizes="(min-width: 1024px) 620px, 100vw"
        className={cn("hidden h-auto w-full dark:block", className)}
      />
      <Image
        src="/dashboard-light.webp"
        alt="KCOH operations dashboard: revenue, projects, clients, and invoices"
        width={1536}
        height={1024}
        priority={priority}
        sizes="(min-width: 1024px) 620px, 100vw"
        className={cn("block h-auto w-full dark:hidden", className)}
      />
    </>
  );
}
