import { describe, it, expect } from "vitest";
import { easeOutCubic, computeCountUp } from "@/lib/hooks/use-count-up";

describe("easeOutCubic", () => {
  it("maps 0 to 0 and 1 to 1", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });
});

describe("computeCountUp", () => {
  it("reaches the target exactly at progress 1", () => {
    expect(computeCountUp(2600, 1)).toBe(2600);
  });

  it("is 0 at progress 0", () => {
    expect(computeCountUp(2600, 0)).toBe(0);
  });

  it("clamps progress above 1 to the target (never overshoots)", () => {
    expect(computeCountUp(100, 1.5)).toBe(100);
  });

  it("is monotonically non-decreasing across the animation", () => {
    let prev = -1;
    for (let p = 0; p <= 1.0001; p += 0.1) {
      const v = computeCountUp(1000, p);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });
});
