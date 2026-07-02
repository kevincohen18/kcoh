"use client";

import { ProjectTheme } from "@/components/site/project-theme";
import { Sparkline } from "@/components/dashboard/charts/sparkline";
import { demoProjects } from "@/lib/demo/data";

/**
 * Projects screen: progress list with per-project live sparklines.
 * `trends` is the ticking projectTrends array from the demo shell,
 * parallel to demoProjects. Each sparkline is wrapped in ProjectTheme
 * so it draws in that project's real brand color.
 */
export function ProjectsScreen({ trends }: { trends: number[][] }) {
  return (
    <div className="space-y-4 text-fg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <span className="rounded-md border border-border px-2 py-1 text-[11px] text-fg-muted">
          {demoProjects.length} active
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <ul className="divide-y divide-border/70">
          {demoProjects.map((p, i) => (
            <li
              key={p.name}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-[180px] flex-1 items-center gap-3">
                <span
                  className="size-4 shrink-0 rounded-md"
                  style={{ background: p.color }}
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-fg">{p.name}</div>
                  <div className="text-xs text-fg-muted">{p.phase}</div>
                </div>
              </div>

              <ProjectTheme accent={p.color} className="hidden sm:block">
                <Sparkline data={trends[i] ?? p.trend} className="h-10 w-32" />
              </ProjectTheme>

              <div className="flex w-full max-w-[220px] items-center gap-3 sm:w-auto sm:flex-1">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${p.pct}%`, background: p.color }}
                  />
                </div>
                <span className="w-10 text-right text-sm text-fg-muted tabular-nums">
                  {p.pct}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
