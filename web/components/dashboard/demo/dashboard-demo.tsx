"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useTicker } from "@/lib/hooks/use-ticker";
import { advanceDemoLive, DEMO_TICK_MS } from "@/lib/demo/ticker";
import { demoLiveInitial, type DemoScreen } from "@/lib/demo/data";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { OverviewDashboard } from "@/components/dashboard/overview-dashboard";
import { DemoSidebar, demoNavScreens } from "./demo-sidebar";
import { ProjectsScreen } from "./projects-screen";
import { InvoicesScreen } from "./invoices-screen";
import { AnalyticsScreen } from "./analytics-screen";

/**
 * The playable dashboard demo. Everything is client-side simulated data:
 * one useTicker at this level advances all live series; the in-frame
 * ThemeToggle is the global next-themes toggle (see workstream decision 1);
 * screen switches crossfade in 250ms, gated by reduced motion.
 */
export function DashboardDemo({ className }: { className?: string }) {
  const [screen, setScreen] = useState<DemoScreen>("overview");
  const live = useTicker(demoLiveInitial, advanceDemoLive, DEMO_TICK_MS);
  const reduced = useReducedMotion();

  const body =
    screen === "overview" ? (
      <OverviewDashboard />
    ) : screen === "projects" ? (
      <ProjectsScreen trends={live.projectTrends} />
    ) : screen === "invoices" ? (
      <InvoicesScreen />
    ) : (
      <AnalyticsScreen revenue={live.revenue} users={live.users} />
    );

  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-[18px] border border-border bg-section shadow-[0_30px_80px_-24px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <aside className="hidden w-[200px] shrink-0 border-r border-border p-4 lg:block">
        <DemoSidebar screen={screen} onSelect={setScreen} />
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
          <ThemeToggle />
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/15 text-[11px] font-semibold text-brand">
            JS
          </span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto border-b border-border px-4 py-3 lg:hidden">
          {demoNavScreens.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScreen(s.id)}
              aria-current={screen === s.id ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                screen === s.id
                  ? "border-brand/40 bg-brand/10 font-medium text-fg"
                  : "border-border text-fg-muted hover:text-fg",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-5">
          {reduced ? (
            <div>{body}</div>
          ) : (
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {body}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
