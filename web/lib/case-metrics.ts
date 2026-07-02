import type { Metric } from "@/content/metrics";

// Matches outcome values StatBlock can count up to: an integer (optionally
// with thousands separators) plus an optional "+" or "%" suffix. Anything
// else renders literally via Metric.display (count-up disabled).
const NUMERIC = /^(\d[\d,]*)\s*([+%]?)$/;

export function outcomeToMetric(value: string, label: string): Metric {
  const match = NUMERIC.exec(value.trim());
  if (!match) {
    return { value: 0, display: value, label };
  }
  const n = Number(match[1].replaceAll(",", ""));
  return match[2] ? { value: n, suffix: match[2], label } : { value: n, label };
}
