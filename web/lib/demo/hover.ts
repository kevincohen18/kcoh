/**
 * Hover-picking math for the demo's tooltip charts. Callers translate a
 * mouse position into the chart's viewBox space (minus padding) and get a
 * data index back. Pairs with toPoints() from lib/charts/geometry for the
 * dot/guide position.
 */

/** Nearest point index for a continuous series (area/line charts). */
export function hoverIndexFromX(x: number, width: number, count: number): number {
  if (count <= 0) return -1;
  if (count === 1 || width <= 0) return 0;
  const t = Math.min(1, Math.max(0, x / width));
  return Math.round(t * (count - 1));
}

/** Containing group index for grouped bar charts. */
export function barIndexFromX(x: number, width: number, count: number): number {
  if (count <= 0) return -1;
  if (width <= 0) return 0;
  const t = Math.min(1, Math.max(0, x / width));
  return Math.min(count - 1, Math.floor(t * count));
}
