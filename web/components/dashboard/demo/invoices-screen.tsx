"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  demoInvoices,
  formatIssued,
  formatMoney,
  type InvoiceStatus,
} from "@/lib/demo/data";
import {
  nextSortState,
  sortInvoices,
  type InvoiceSortKey,
  type SortState,
} from "@/lib/demo/sort";

const statusTint: Record<InvoiceStatus, string> = {
  Paid: "text-pos",
  Pending: "text-warn",
  Overdue: "text-neg",
};

const columns: { key: InvoiceSortKey; label: string; align?: "right" }[] = [
  { key: "id", label: "Invoice" },
  { key: "client", label: "Client" },
  { key: "amount", label: "Amount", align: "right" },
  { key: "issued", label: "Issued" },
  { key: "status", label: "Status", align: "right" },
];

/** Invoices screen: sortable table. Click a header to sort; clicking the
 *  active header toggles direction. Sorting is the pure sortInvoices(). */
export function InvoicesScreen() {
  const [sort, setSort] = useState<SortState | null>(null);
  const rows = useMemo(() => sortInvoices(demoInvoices, sort), [sort]);
  const open = demoInvoices.filter((inv) => inv.status !== "Paid");
  const outstanding = open.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-4 text-fg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Invoices</h2>
        <span className="rounded-md border border-border px-2 py-1 text-[11px] text-fg-muted">
          {formatMoney(outstanding)} outstanding
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="mb-3 text-xs text-fg-subtle">Click a column to sort.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border">
                {columns.map((col) => {
                  const dir = sort && sort.key === col.key ? sort.direction : undefined;
                  const active = dir !== undefined;
                  return (
                    <th
                      key={col.key}
                      scope="col"
                      aria-sort={
                        active ? (dir === "asc" ? "ascending" : "descending") : "none"
                      }
                      className={cn(
                        "pb-2 font-medium text-fg-muted",
                        col.align === "right" ? "text-right" : "text-left",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setSort((current) => nextSortState(current, col.key))}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-1 py-0.5 transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                          active && "text-fg",
                        )}
                      >
                        {col.label}
                        {active ? (
                          dir === "asc" ? (
                            <ArrowUp size={13} className="text-brand" />
                          ) : (
                            <ArrowDown size={13} className="text-brand" />
                          )
                        ) : (
                          <ChevronsUpDown size={13} className="text-fg-subtle" />
                        )}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {rows.map((inv) => (
                <tr key={inv.id}>
                  <td className="py-2.5 text-fg-muted">{inv.id}</td>
                  <td className="py-2.5 text-fg">{inv.client}</td>
                  <td className="py-2.5 text-right text-fg tabular-nums">
                    {formatMoney(inv.amount)}
                  </td>
                  <td className="py-2.5 text-fg-muted">{formatIssued(inv.issued)}</td>
                  <td
                    className={cn(
                      "py-2.5 text-right text-xs font-medium",
                      statusTint[inv.status],
                    )}
                  >
                    {inv.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
