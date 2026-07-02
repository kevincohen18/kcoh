import { describe, it, expect } from "vitest";
import {
  demoInvoices,
  demoProjects,
  demoLiveInitial,
  formatMoney,
  formatIssued,
} from "@/lib/demo/data";

describe("formatMoney", () => {
  it("formats thousands with separators and two decimals", () => {
    expect(formatMoney(4850)).toBe("$4,850.00");
  });

  it("formats sub-thousand amounts", () => {
    expect(formatMoney(980)).toBe("$980.00");
  });

  it("formats decimals without rounding surprises", () => {
    expect(formatMoney(2120.5)).toBe("$2,120.50");
  });
});

describe("formatIssued", () => {
  it("renders an ISO date as Month D, YYYY", () => {
    expect(formatIssued("2026-05-02")).toBe("May 2, 2026");
  });

  it("handles December (index arithmetic)", () => {
    expect(formatIssued("2026-12-24")).toBe("December 24, 2026");
  });
});

describe("demo seed data shape", () => {
  it("has 8 invoices with unique ids", () => {
    expect(demoInvoices).toHaveLength(8);
    expect(new Set(demoInvoices.map((i) => i.id)).size).toBe(8);
  });

  it("live trends are parallel to the projects list", () => {
    expect(demoLiveInitial.projectTrends).toHaveLength(demoProjects.length);
  });

  it("every trend series has enough points to draw a sparkline", () => {
    for (const t of demoLiveInitial.projectTrends) {
      expect(t.length).toBeGreaterThanOrEqual(8);
    }
  });
});
