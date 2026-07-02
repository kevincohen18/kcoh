import { describe, it, expect } from "vitest";
import { computeGlowPosition } from "@/lib/hooks/use-pointer-glow";

describe("computeGlowPosition", () => {
  it("converts viewport coordinates to element-local coordinates", () => {
    expect(computeGlowPosition({ left: 100, top: 50 }, 160, 90)).toEqual({
      x: 60,
      y: 40,
    });
  });

  it("is zero at the element origin", () => {
    expect(computeGlowPosition({ left: 20, top: 20 }, 20, 20)).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("goes negative when the pointer is outside the element", () => {
    expect(computeGlowPosition({ left: 100, top: 100 }, 90, 80)).toEqual({
      x: -10,
      y: -20,
    });
  });
});
