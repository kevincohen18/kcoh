import { describe, it, expect } from "vitest";
import { linePath, areaPath, donutArc, toPoints } from "@/lib/charts/geometry";

describe("toPoints", () => {
  it("centers a single point horizontally", () => {
    expect(toPoints([5], 100, 50, 0)[0].x).toBe(50);
  });
  it("inverts y (max value sits at the top)", () => {
    const pts = toPoints([0, 10], 100, 50, 0);
    expect(pts[1].y).toBeLessThan(pts[0].y);
  });
});

describe("linePath", () => {
  it("starts with a move to the first point", () => {
    expect(linePath([0, 10, 5], 100, 50, 0)).toMatch(/^M0,50/);
  });
  it("returns empty string for no data", () => {
    expect(linePath([], 100, 50)).toBe("");
  });
});

describe("areaPath", () => {
  it("closes back to the baseline", () => {
    expect(areaPath([0, 10, 5], 100, 50, 0).endsWith("Z")).toBe(true);
  });
});

describe("donutArc", () => {
  it("circumference matches 2*pi*r", () => {
    expect(donutArc(0.5, 40).circumference).toBeCloseTo(2 * Math.PI * 40);
  });
  it("dash is half the circumference at 50%", () => {
    const { circumference, dash } = donutArc(0.5, 40);
    expect(dash).toBeCloseTo(circumference / 2);
  });
  it("clamps percentages above 1", () => {
    const { circumference, dash } = donutArc(1.5, 40);
    expect(dash).toBeCloseTo(circumference);
  });
});
