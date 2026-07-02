import { describe, it, expect } from "vitest";
import { computeTilt } from "@/lib/hooks/use-tilt";

describe("computeTilt", () => {
  it("is level at the center", () => {
    expect(computeTilt(0.5, 0.5, 2)).toEqual({ rotateX: 0, rotateY: 0 });
  });

  it("reaches plus/minus maxDeg at the corners", () => {
    expect(computeTilt(0, 0, 2)).toEqual({ rotateX: 2, rotateY: -2 });
    expect(computeTilt(1, 1, 2)).toEqual({ rotateX: -2, rotateY: 2 });
  });

  it("clamps positions outside the element", () => {
    expect(computeTilt(-1, 2, 2)).toEqual({ rotateX: -2, rotateY: -2 });
  });

  it("scales with maxDeg", () => {
    expect(computeTilt(1, 0.5, 5)).toEqual({ rotateX: 0, rotateY: 5 });
  });
});
