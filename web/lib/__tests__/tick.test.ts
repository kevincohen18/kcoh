import { describe, it, expect } from "vitest";
import { tickSeries } from "@/lib/charts/tick";

describe("tickSeries", () => {
  it("returns an array of the same length", () => {
    expect(tickSeries([1, 2, 3, 4], 1)).toHaveLength(4);
  });

  it("shifts the window left by one (drops the first value)", () => {
    const out = tickSeries([5, 9, 7, 11], 1);
    expect(out.slice(0, 3)).toEqual([9, 7, 11]);
  });

  it("appends a new value within the min/max bounds of the input", () => {
    const input = [10, 40, 25, 30];
    for (let seed = 0; seed < 25; seed++) {
      const next = tickSeries(input, seed)[3];
      expect(next).toBeGreaterThanOrEqual(10);
      expect(next).toBeLessThanOrEqual(40);
    }
  });

  it("is deterministic for the same seed", () => {
    expect(tickSeries([3, 1, 4, 1, 5], 42)).toEqual(
      tickSeries([3, 1, 4, 1, 5], 42),
    );
  });

  it("produces different values across seeds", () => {
    const input = [0, 100];
    const values = new Set(
      [1, 2, 3, 4, 5].map((seed) => tickSeries(input, seed)[1]),
    );
    expect(values.size).toBeGreaterThan(1);
  });

  it("returns an empty array for empty input", () => {
    expect(tickSeries([], 7)).toEqual([]);
  });

  it("keeps a flat series flat", () => {
    expect(tickSeries([5, 5, 5], 3)).toEqual([5, 5, 5]);
  });
});
