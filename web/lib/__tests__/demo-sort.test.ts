import { describe, it, expect } from "vitest";
import type { DemoInvoice } from "@/lib/demo/data";
import { nextSortState, sortInvoices } from "@/lib/demo/sort";

const fixture: DemoInvoice[] = [
  { id: "INV-2026-003", client: "Skyroa", amount: 6430, issued: "2026-05-11", status: "Pending" },
  { id: "INV-2026-001", client: "Concordia Connect", amount: 4850, issued: "2026-05-02", status: "Paid" },
  { id: "INV-2026-004", client: "AutoMedic", amount: 1250, issued: "2026-04-28", status: "Overdue" },
  { id: "INV-2026-002", client: "Drafterie", amount: 2120, issued: "2026-05-06", status: "Paid" },
];

const ids = (rows: DemoInvoice[]) => rows.map((r) => r.id);

describe("nextSortState", () => {
  it("starts ascending on a fresh column", () => {
    expect(nextSortState(null, "amount")).toEqual({ key: "amount", direction: "asc" });
  });

  it("toggles asc to desc on the same column", () => {
    expect(nextSortState({ key: "amount", direction: "asc" }, "amount")).toEqual({
      key: "amount",
      direction: "desc",
    });
  });

  it("toggles desc back to asc on the same column", () => {
    expect(nextSortState({ key: "amount", direction: "desc" }, "amount")).toEqual({
      key: "amount",
      direction: "asc",
    });
  });

  it("resets to ascending when a different column is clicked", () => {
    expect(nextSortState({ key: "amount", direction: "desc" }, "client")).toEqual({
      key: "client",
      direction: "asc",
    });
  });
});

describe("sortInvoices", () => {
  it("returns a copy in original order when state is null", () => {
    const out = sortInvoices(fixture, null);
    expect(ids(out)).toEqual(["INV-2026-003", "INV-2026-001", "INV-2026-004", "INV-2026-002"]);
    expect(out).not.toBe(fixture);
  });

  it("sorts by amount ascending", () => {
    const out = sortInvoices(fixture, { key: "amount", direction: "asc" });
    expect(ids(out)).toEqual(["INV-2026-004", "INV-2026-002", "INV-2026-001", "INV-2026-003"]);
  });

  it("sorts by amount descending", () => {
    const out = sortInvoices(fixture, { key: "amount", direction: "desc" });
    expect(ids(out)).toEqual(["INV-2026-003", "INV-2026-001", "INV-2026-002", "INV-2026-004"]);
  });

  it("sorts by id ascending", () => {
    const out = sortInvoices(fixture, { key: "id", direction: "asc" });
    expect(ids(out)).toEqual(["INV-2026-001", "INV-2026-002", "INV-2026-003", "INV-2026-004"]);
  });

  it("sorts by client name ascending", () => {
    const out = sortInvoices(fixture, { key: "client", direction: "asc" });
    expect(out.map((r) => r.client)).toEqual([
      "AutoMedic",
      "Concordia Connect",
      "Drafterie",
      "Skyroa",
    ]);
  });

  it("sorts by issued date ascending (ISO string order)", () => {
    const out = sortInvoices(fixture, { key: "issued", direction: "asc" });
    expect(out.map((r) => r.issued)).toEqual([
      "2026-04-28",
      "2026-05-02",
      "2026-05-06",
      "2026-05-11",
    ]);
  });

  it("sorts by status rank Paid < Pending < Overdue, stable within equal ranks", () => {
    const asc = sortInvoices(fixture, { key: "status", direction: "asc" });
    expect(ids(asc)).toEqual(["INV-2026-001", "INV-2026-002", "INV-2026-003", "INV-2026-004"]);
    const desc = sortInvoices(fixture, { key: "status", direction: "desc" });
    expect(ids(desc)).toEqual(["INV-2026-004", "INV-2026-003", "INV-2026-001", "INV-2026-002"]);
  });

  it("does not mutate the input array", () => {
    sortInvoices(fixture, { key: "amount", direction: "asc" });
    expect(fixture[0].id).toBe("INV-2026-003");
  });
});
