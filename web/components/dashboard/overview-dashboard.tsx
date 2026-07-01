import { CheckCircle2, FileText, Server, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart } from "./charts/area-chart";
import { BarChart, type BarGroup } from "./charts/bar-chart";
import { DonutGauge } from "./charts/donut-gauge";
import { Sparkline } from "./charts/sparkline";

const revenueSeries = [
  12, 14, 13, 16, 18, 17, 20, 19, 22, 21, 24, 23, 20, 25, 27, 26, 29, 24, 28,
  30, 27, 31, 29, 33, 30, 34, 32, 36, 35, 38,
];
const liveUsersSeries = [8, 10, 9, 12, 11, 14, 13, 16, 15, 18, 20, 19, 22, 24];
const projectBars: BarGroup[] = [
  { label: "Concordia Connect", a: 24, b: 13 },
  { label: "Drafterie", a: 14, b: 18 },
  { label: "Skyroa", a: 26, b: 11 },
  { label: "AutoMedic", a: 16, b: 22 },
  { label: "Success", a: 13, b: 10 },
];
const topProjects = [
  { name: "Concordia Connect", pct: 75, color: "#8b1d3f" },
  { name: "Drafterie", pct: 60, color: "#6e63ff" },
  { name: "Skyroa", pct: 45, color: "#4f46e5" },
  { name: "AutoMedic", pct: 30, color: "#16a34a" },
  { name: "FrostyNow", pct: 20, color: "#6be5ff" },
];
const invoices = [
  { id: "INV-2026-001", amount: "$4,850.00", status: "Paid" },
  { id: "INV-2026-002", amount: "$2,120.00", status: "Paid" },
  { id: "INV-2026-003", amount: "$6,430.00", status: "Pending" },
  { id: "INV-2026-004", amount: "$1,250.00", status: "Overdue" },
];
const activity = [
  { icon: CheckCircle2, tint: "text-pos", text: "Invoice #INV-2026-001 paid", time: "2m ago" },
  { icon: FileText, tint: "text-brand", text: "New project created", time: "15m ago" },
  { icon: Server, tint: "text-pos", text: "Server backup completed", time: "1h ago" },
  { icon: CalendarClock, tint: "text-brand", text: "Client meeting scheduled", time: "3h ago" },
];

function Card({
  title,
  action,
  className,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      {title || action ? (
        <div className="mb-4 flex items-center justify-between">
          {title ? <h3 className="text-sm font-semibold text-fg">{title}</h3> : <span />}
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}

const viewAll = (
  <span className="rounded-md border border-border px-2 py-1 text-[11px] text-fg-muted">
    View All
  </span>
);
const statusTint: Record<string, string> = {
  Paid: "text-pos",
  Pending: "text-warn",
  Overdue: "text-neg",
};

function RevenueRow({ label, value, delta, positive }: { label: string; value: string; delta: string; positive?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/70 py-2.5 text-sm last:border-0">
      <span className="text-fg-muted">{label}</span>
      <span className="flex items-center gap-3">
        <span className="font-medium text-fg tabular-nums">{value}</span>
        <span className={cn("w-12 text-right text-xs tabular-nums", positive ? "text-pos" : "text-neg")}>{delta}</span>
      </span>
    </div>
  );
}

export function OverviewDashboard() {
  return (
    <div className="space-y-4 text-fg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Overview</h2>
        {viewAll}
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card title="Revenue Overview" className="lg:col-span-5">
          <RevenueRow label="Total Revenue" value="$128,430" delta="+12.5%" positive />
          <RevenueRow label="Subscriptions" value="$74,430" delta="+8.2%" positive />
          <RevenueRow label="One-time Revenue" value="$54,000" delta="+18.7%" positive />
          <RevenueRow label="Refunds" value="-$2,430" delta="-3.1%" />
        </Card>

        <Card title="Recent Activity" action={viewAll} className="lg:col-span-4">
          <ul className="space-y-3.5">
            {activity.map((a) => (
              <li key={a.text} className="flex items-center gap-3 text-sm">
                <a.icon size={18} className={cn("shrink-0", a.tint)} />
                <span className="flex-1 text-fg">{a.text}</span>
                <span className="text-xs text-fg-subtle">{a.time}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-1">
          <Card title="Live Users">
            <div className="text-2xl font-semibold tabular-nums">152</div>
            <div className="text-xs text-pos">+23.4%</div>
            <Sparkline data={liveUsersSeries} className="mt-2 h-10 w-full" />
          </Card>
          <Card title="System Health">
            <div className="flex items-center gap-3">
              <DonutGauge pct={0.98} size={72} stroke={8}>
                <span className="text-sm font-semibold">98%</span>
              </DonutGauge>
              <span className="flex items-center gap-1.5 text-xs text-fg-muted">
                <span className="size-1.5 rounded-full bg-pos" /> All systems operational
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card
          title="Revenue"
          action={<span className="rounded-md border border-border px-2 py-1 text-[11px] text-fg-muted">This Month</span>}
          className="lg:col-span-7"
        >
          <div className="mb-1 text-2xl font-semibold tabular-nums">$128,430</div>
          <div className="mb-3 text-xs">
            <span className="text-pos">+12.5%</span>{" "}
            <span className="text-fg-subtle">vs last month</span>
          </div>
          <AreaChart data={revenueSeries} highlightIndex={19} className="h-40 w-full" />
          <div className="mt-2 flex justify-between text-[11px] text-fg-subtle">
            <span>May 1</span><span>May 8</span><span>May 15</span><span>May 22</span><span>May 29</span>
          </div>
        </Card>

        <Card
          title="Projects Overview"
          action={<span className="rounded-md border border-border px-2 py-1 text-[11px] text-fg-muted">This Month</span>}
          className="lg:col-span-5"
        >
          <BarChart data={projectBars} className="h-40 w-full" />
          <div className="mt-2 grid grid-cols-5 text-center text-[10px] leading-tight text-fg-subtle">
            {projectBars.map((b) => (
              <span key={b.label}>{b.label}</span>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card title="Top Projects" action={viewAll} className="lg:col-span-4">
          <ul className="space-y-3">
            {topProjects.map((p) => (
              <li key={p.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="size-4 rounded-md" style={{ background: p.color }} />
                    <span className="text-fg">{p.name}</span>
                  </span>
                  <span className="text-fg-muted tabular-nums">{p.pct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Revenue by Source" className="lg:col-span-4">
          <div className="flex items-center gap-4">
            <DonutGauge
              size={120}
              stroke={16}
              segments={[
                { value: 0.58, color: "var(--brand)" },
                { value: 0.32, color: "var(--highlight)" },
                { value: 0.1, color: "#a78bfa" },
              ]}
            >
              <div className="text-center leading-tight">
                <div className="text-sm font-semibold tabular-nums">$128,430</div>
                <div className="text-[10px] text-fg-subtle">Total</div>
              </div>
            </DonutGauge>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-brand" /> Subscriptions <span className="ml-auto text-fg-muted">58%</span></li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-highlight" /> One-time <span className="ml-auto text-fg-muted">32%</span></li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: "#a78bfa" }} /> Support <span className="ml-auto text-fg-muted">10%</span></li>
            </ul>
          </div>
        </Card>

        <Card title="Recent Invoices" action={viewAll} className="lg:col-span-4">
          <ul className="divide-y divide-border/70 text-sm">
            {invoices.map((inv) => (
              <li key={inv.id} className="flex items-center justify-between py-2.5">
                <span className="text-fg-muted">{inv.id}</span>
                <span className="tabular-nums text-fg">{inv.amount}</span>
                <span className={cn("w-16 text-right text-xs font-medium", statusTint[inv.status])}>{inv.status}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
