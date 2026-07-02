/**
 * Deterministically advance a chart series by one step: drop the first
 * value and append a plausible new one within the series' existing range.
 * Pure and seed-driven so the live-ticking mini-previews are testable.
 */
export function tickSeries(series: number[], seed: number): number[] {
  if (series.length === 0) return [];
  const min = Math.min(...series);
  const max = Math.max(...series);
  const next = Math.round(min + pseudoRandom(seed) * (max - min));
  return [...series.slice(1), Math.min(max, Math.max(min, next))];
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
