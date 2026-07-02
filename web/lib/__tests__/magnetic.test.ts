import { describe, it, expect } from "vitest";
import { computeMagneticOffset } from "@/components/site/magnetic";

describe("computeMagneticOffset", () => {
  it("scales the pointer offset by strength", () => {
    expect(computeMagneticOffset(40, -20, 0.25)).toEqual({ x: 10, y: -5 });
  });

  it("returns zero at the center", () => {
    expect(computeMagneticOffset(0, 0, 0.4)).toEqual({ x: 0, y: 0 });
  });

  it("clamps large offsets to the default max of 12px", () => {
    expect(computeMagneticOffset(400, -400, 0.25)).toEqual({ x: 12, y: -12 });
  });

  it("honors a custom max", () => {
    expect(computeMagneticOffset(100, 0, 1, 30)).toEqual({ x: 30, y: 0 });
  });
});
