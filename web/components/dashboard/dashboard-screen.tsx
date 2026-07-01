import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./sidebar-nav";
import { OverviewDashboard } from "./overview-dashboard";

/** A complete dashboard "screen": sidebar + top bar + overview content.
 *  Reused by the homepage (non-interactive preview) and the /dashboard route
 *  (fully interactive second page). */
export function DashboardScreen({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-[18px] border border-border bg-section shadow-[0_30px_80px_-24px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <aside className="hidden w-[200px] shrink-0 border-r border-border p-4 lg:block">
        <SidebarNav />
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-4 border-b border-border px-5 py-4">
          <Menu size={18} className="hidden text-fg-subtle sm:block" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-fg">
              Welcome back, John
            </p>
            <p className="truncate text-xs text-fg-subtle">
              Here&apos;s what&apos;s happening with your business.
            </p>
          </div>
          <span className="hidden rounded-md border border-border px-2.5 py-1 text-[11px] text-fg-muted md:inline">
            May 1 – May 31, 2026
          </span>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/15 text-[11px] font-semibold text-brand">
            JS
          </span>
        </div>

        <div className="p-4 md:p-5">
          <OverviewDashboard />
        </div>
      </div>
    </div>
  );
}
