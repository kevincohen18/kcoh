export type DemoScreen = "overview" | "projects" | "invoices" | "analytics";

export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export type DemoInvoice = {
  id: string;
  client: string;
  amount: number;
  /** ISO date (YYYY-MM-DD): sortable as a plain string. */
  issued: string;
  status: InvoiceStatus;
};

export type DemoProject = {
  name: string;
  color: string;
  phase: string;
  pct: number;
  trend: number[];
};

export type DemoLiveData = {
  revenue: number[];
  users: number[];
  projectTrends: number[][];
};

/** Simulated invoices. Ids/amounts 001-004 match the Overview screen's
 *  "Recent Invoices" card so the demo reads as one system. */
export const demoInvoices: DemoInvoice[] = [
  { id: "INV-2026-001", client: "Concordia Connect", amount: 4850, issued: "2026-05-02", status: "Paid" },
  { id: "INV-2026-002", client: "Drafterie", amount: 2120, issued: "2026-05-06", status: "Paid" },
  { id: "INV-2026-003", client: "Skyroa", amount: 6430, issued: "2026-05-11", status: "Pending" },
  { id: "INV-2026-004", client: "AutoMedic", amount: 1250, issued: "2026-04-28", status: "Overdue" },
  { id: "INV-2026-005", client: "Success", amount: 3480, issued: "2026-05-14", status: "Paid" },
  { id: "INV-2026-006", client: "FrostyNow", amount: 980, issued: "2026-05-17", status: "Pending" },
  { id: "INV-2026-007", client: "Concordia Connect", amount: 5620, issued: "2026-05-21", status: "Paid" },
  { id: "INV-2026-008", client: "Drafterie", amount: 2760, issued: "2026-05-24", status: "Pending" },
];

/** Simulated project list. Colors are the real brand colors from
 *  web/content/projects.ts; pcts match the Overview "Top Projects" card;
 *  phases reuse the four process step names from web/content/process.ts. */
export const demoProjects: DemoProject[] = [
  {
    name: "Concordia Connect",
    color: "#8b1d3f",
    phase: "Build and Ship",
    pct: 75,
    trend: [12, 14, 13, 16, 15, 18, 17, 20, 22, 21, 24, 26],
  },
  {
    name: "Drafterie",
    color: "#6e63ff",
    phase: "Build and Ship",
    pct: 60,
    trend: [8, 9, 11, 10, 13, 12, 15, 14, 16, 18, 17, 19],
  },
  {
    name: "Skyroa",
    color: "#4f46e5",
    phase: "Find the Leverage",
    pct: 45,
    trend: [20, 18, 21, 19, 23, 22, 24, 26, 25, 27, 26, 29],
  },
  {
    name: "AutoMedic",
    color: "#16a34a",
    phase: "Map the System",
    pct: 30,
    trend: [5, 7, 6, 9, 8, 10, 12, 11, 13, 12, 14, 16],
  },
  {
    name: "FrostyNow",
    color: "#6be5ff",
    phase: "Map the System",
    pct: 20,
    trend: [3, 4, 6, 5, 7, 8, 7, 9, 10, 9, 11, 12],
  },
];

/** Same 30-point series the Overview revenue chart uses. */
export const demoRevenueSeries: number[] = [
  12, 14, 13, 16, 18, 17, 20, 19, 22, 21, 24, 23, 20, 25, 27, 26, 29, 24, 28,
  30, 27, 31, 29, 33, 30, 34, 32, 36, 35, 38,
];

/** Same 14-point series the Overview "Live Users" sparkline uses. */
export const demoUsersSeries: number[] = [
  8, 10, 9, 12, 11, 14, 13, 16, 15, 18, 20, 19, 22, 24,
];

export const demoLiveInitial: DemoLiveData = {
  revenue: demoRevenueSeries,
  users: demoUsersSeries,
  projectTrends: demoProjects.map((p) => p.trend),
};

export function formatMoney(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-05-02" -> "May 2, 2026". Parses parts directly (no Date, no TZ drift). */
export function formatIssued(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1] ?? ""} ${d}, ${y}`;
}
