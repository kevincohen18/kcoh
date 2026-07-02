import { describe, it, expect } from "vitest";
import { hoverIndexFromX, barIndexFromX } from "@/lib/demo/hover";

describe("hoverIndexFromX", () => {
  it("maps the left edge to index 0", () => {
    expect(hoverIndexFromX(0, 100, 30)).toBe(0);
  });

  it("maps the right edge to the last index", () => {
    expect(hoverIndexFromX(100, 100, 30)).toBe(29);
  });

  it("rounds to the nearest index", () => {
    expect(hoverIndexFromX(50, 100, 3)).toBe(1);
    expect(hoverIndexFromX(74, 100, 3)).toBe(1);
    expect(hoverIndexFromX(76, 100, 3)).toBe(2);
  });

  it("clamps x below 0 and above width", () => {
    expect(hoverIndexFromX(-20, 100, 5)).toBe(0);
    expect(hoverIndexFromX(140, 100, 5)).toBe(4);
  });

  it("returns 0 for a single point and for zero width", () => {
    expect(hoverIndexFromX(50, 100, 1)).toBe(0);
    expect(hoverIndexFromX(50, 0, 5)).toBe(0);
  });

  it("returns -1 when there are no points", () => {
    expect(hoverIndexFromX(50, 100, 0)).toBe(-1);
  });
});

describe("barIndexFromX", () => {
  it("maps x to the containing group", () => {
    expect(barIndexFromX(0, 100, 5)).toBe(0);
    expect(barIndexFromX(19.9, 100, 5)).toBe(0);
    expect(barIndexFromX(20, 100, 5)).toBe(1);
    expect(barIndexFromX(99.9, 100, 5)).toBe(4);
  });

  it("clamps the right edge into the last group", () => {
    expect(barIndexFromX(100, 100, 5)).toBe(4);
    expect(barIndexFromX(150, 100, 5)).toBe(4);
  });

  it("clamps negative x into the first group", () => {
    expect(barIndexFromX(-5, 100, 5)).toBe(0);
  });

  it("returns -1 when there are no groups and 0 for zero width", () => {
    expect(barIndexFromX(50, 100, 0)).toBe(-1);
    expect(barIndexFromX(50, 0, 5)).toBe(0);
  });
});
