import { describe, it, expect } from "vitest";
import type { DemoLiveData } from "@/lib/demo/data";
import { advanceSeries, advanceDemoLive } from "@/lib/demo/ticker";

const bounds = { min: 0, max: 100, maxStep: 3 };

describe("advanceSeries", () => {
  it("keeps the series length", () => {
    expect(advanceSeries([1, 2, 3], bounds, () => 0.5)).toHaveLength(3);
  });

  it("slides the window: drops the first point, keeps the rest", () => {
    const out = advanceSeries([10, 12, 14], bounds, () => 0.5);
    expect(out.slice(0, 2)).toEqual([12, 14]);
  });

  it("appends last + maxStep when random() = 1", () => {
    expect(advanceSeries([10, 12], bounds, () => 1)).toEqual([12, 15]);
  });

  it("appends last - maxStep when random() = 0", () => {
    expect(advanceSeries([10, 12], bounds, () => 0)).toEqual([12, 9]);
  });

  it("clamps to max", () => {
    expect(advanceSeries([10, 99], { min: 0, max: 100, maxStep: 5 }, () => 1)).toEqual([99, 100]);
  });

  it("clamps to min", () => {
    expect(advanceSeries([5, 1], { min: 0, max: 100, maxStep: 5 }, () => 0)).toEqual([1, 0]);
  });

  it("rounds the appended value to two decimals", () => {
    const out = advanceSeries([1], { min: 0, max: 10, maxStep: 1 }, () => 0.8333);
    expect(out[0]).toBe(1.67);
  });

  it("returns [] for an empty series", () => {
    expect(advanceSeries([], bounds, () => 1)).toEqual([]);
  });

  it("does not mutate the input", () => {
    const input = [10, 12];
    advanceSeries(input, bounds, () => 1);
    expect(input).toEqual([10, 12]);
  });
});

describe("advanceDemoLive", () => {
  // Fixture values sit INSIDE each series' bounds so the clamp never
  // interferes with the deterministic expectations below
  // (REVENUE_BOUNDS.min = 10, USERS_BOUNDS.min = 6, TREND_BOUNDS.min = 2).
  const live: DemoLiveData = {
    revenue: [12, 14],
    users: [8, 10],
    projectTrends: [
      [5, 6],
      [7, 8],
    ],
  };

  it("advances every series deterministically with an injected random", () => {
    const out = advanceDemoLive(live, () => 1);
    expect(out.revenue).toEqual([14, 17]); // REVENUE_BOUNDS.maxStep = 3
    expect(out.users).toEqual([10, 12.5]); // USERS_BOUNDS.maxStep = 2.5
    expect(out.projectTrends).toEqual([
      [6, 8], // TREND_BOUNDS.maxStep = 2
      [8, 10],
    ]);
  });

  it("preserves all lengths and does not mutate the input", () => {
    const out = advanceDemoLive(live, () => 0.5);
    expect(out.revenue).toHaveLength(2);
    expect(out.users).toHaveLength(2);
    expect(out.projectTrends).toHaveLength(2);
    expect(live.revenue).toEqual([12, 14]);
    expect(live.projectTrends[0]).toEqual([5, 6]);
  });
});
