"use client";

import { cn } from "@/lib/utils";
import type { BarGroup } from "@/components/dashboard/charts/bar-chart";
import { TooltipAreaChart } from "@/components/dashboard/charts/tooltip-area-chart";
import { TooltipBarChart } from "@/components/dashboard/charts/tooltip-bar-chart";
import { demoInvoices, formatMoney } from "@/lib/demo/data";

/** Same values as the Overview screen's "Projects Overview" bars. */
const hoursByProject: BarGroup[] = [
  { label: "Concordia Connect", a: 24, b: 13 },
  { label: "Drafterie", a: 14, b: 18 },
  { label: "Skyroa", a: 26, b: 11 },
  { label: "AutoMedic", a: 16, b: 22 },
  { label: "Success", a: 13, b: 10 },
];

function Panel({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      <h3 className="mb-4 text-sm font-semibold text-fg">{title}</h3>
      {children}
    </div>
  );
}

/** Analytics screen: stat tiles plus larger charts with hover tooltips.
 *  `revenue` and `users` tick live via the shell's useTicker. */
export function AnalyticsScreen({
  revenue,
  users,
}: {
  revenue: number[];
  users: number[];
}) {
  const liveUsers = Math.round(128 + (users[users.length - 1] ?? 0));
  const open = demoInvoices.filter((inv) => inv.status !== "Paid");
  const outstanding = open.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-4 text-fg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Analytics</h2>
        <span className="rounded-md border border-border px-2 py-1 text-[11px] text-fg-muted">
          Last 30 days
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Panel title="Revenue This Month">
          <div className="text-2xl font-semibold tabular-nums">$128,430</div>
          <div className="text-xs">
            <span className="text-pos">+12.5%</span>{" "}
            <span className="text-fg-subtle">vs last month</span>
          </div>
        </Panel>
        <Panel title="Live Users">
          <div className="text-2xl font-semibold tabular-nums">{liveUsers}</div>
          <div className="text-xs text-fg-subtle">updating live</div>
        </Panel>
        <Panel title="Outstanding">
          <div className="text-2xl font-semibold tabular-nums">
            {formatMoney(outstanding)}
          </div>
          <div className="text-xs text-fg-subtle">{open.length} open invoices</div>
        </Panel>
      </div>

      <Panel title="Revenue Trend">
        <TooltipAreaChart
          data={revenue}
          labels={revenue.map((_, i) => `Day ${i + 1}`)}
          formatValue={(v) => `$${v.toFixed(1)}k`}
          ariaLabel="Revenue trend, last 30 days"
          className="h-56 w-full"
        />
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Active Users">
          <TooltipAreaChart
            data={users}
            labels={users.map((_, i) => `Day ${i + 1}`)}
            formatValue={(v) => `${Math.round(128 + v)} users`}
            ariaLabel="Active users, last 14 days"
            className="h-44 w-full"
          />
        </Panel>
        <Panel title="Hours by Project">
          <TooltipBarChart
            data={hoursByProject}
            formatValue={(g) => `${g.a}h billable, ${g.b}h internal`}
            ariaLabel="Hours by project"
            className="h-44 w-full"
          />
          <div className="mt-2 grid grid-cols-5 text-center text-[10px] leading-tight text-fg-subtle">
            {hoursByProject.map((g) => (
              <span key={g.label}>{g.label}</span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-fg-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-brand" /> Billable
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-highlight" /> Internal
            </span>
          </div>
        </Panel>
      </div>
    </div>
  );
}
