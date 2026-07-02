import { describe, it, expect } from "vitest";
import { outcomeToMetric } from "@/lib/case-metrics";

describe("outcomeToMetric", () => {
  it("parses a plain integer into a counting metric", () => {
    expect(outcomeToMetric("8", "Contract types")).toEqual({
      value: 8,
      label: "Contract types",
    });
  });

  it("parses thousands separators and keeps a plus suffix", () => {
    expect(outcomeToMetric("2,600+", "Members")).toEqual({
      value: 2600,
      suffix: "+",
      label: "Members",
    });
  });

  it("keeps percent suffixes", () => {
    expect(outcomeToMetric("100%", "Uptime")).toEqual({
      value: 100,
      suffix: "%",
      label: "Uptime",
    });
  });

  it("parses zero as a counting metric", () => {
    expect(outcomeToMetric("0", "Double-bookings")).toEqual({
      value: 0,
      label: "Double-bookings",
    });
  });

  it("falls back to display mode for non-numeric values", () => {
    expect(outcomeToMetric("AES-256", "Encryption")).toEqual({
      value: 0,
      display: "AES-256",
      label: "Encryption",
    });
  });

  it("treats Live as a display value", () => {
    expect(outcomeToMetric("Live", "At skyroa.com")).toEqual({
      value: 0,
      display: "Live",
      label: "At skyroa.com",
    });
  });
});
