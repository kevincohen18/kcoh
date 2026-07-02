import type { DemoInvoice, InvoiceStatus } from "./data";

export type SortDirection = "asc" | "desc";

export type InvoiceSortKey = "id" | "client" | "amount" | "issued" | "status";

export type SortState = { key: InvoiceSortKey; direction: SortDirection };

const statusRank: Record<InvoiceStatus, number> = {
  Paid: 0,
  Pending: 1,
  Overdue: 2,
};

/** Column-header click reducer: fresh column starts ascending,
 *  clicking the active column toggles direction. */
export function nextSortState(
  current: SortState | null,
  clicked: InvoiceSortKey,
): SortState {
  if (!current || current.key !== clicked) {
    return { key: clicked, direction: "asc" };
  }
  return {
    key: clicked,
    direction: current.direction === "asc" ? "desc" : "asc",
  };
}

function compare(a: DemoInvoice, b: DemoInvoice, key: InvoiceSortKey): number {
  switch (key) {
    case "amount":
      return a.amount - b.amount;
    case "status":
      return statusRank[a.status] - statusRank[b.status];
    case "issued":
      return a.issued < b.issued ? -1 : a.issued > b.issued ? 1 : 0;
    default:
      return a[key].localeCompare(b[key]);
  }
}

/** Non-mutating sort. `null` state returns a copy in original order.
 *  Array.prototype.sort is stable, so equal keys keep their relative order. */
export function sortInvoices(
  invoices: DemoInvoice[],
  state: SortState | null,
): DemoInvoice[] {
  const copy = [...invoices];
  if (!state) return copy;
  const dir = state.direction === "asc" ? 1 : -1;
  copy.sort((a, b) => dir * compare(a, b, state.key));
  return copy;
}
