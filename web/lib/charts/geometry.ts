export type Point = { x: number; y: number };

/**
 * Map raw values into SVG coordinates within an inner box inset by `pad`.
 * Y is inverted (SVG origin is top-left) so larger values sit higher.
 */
export function toPoints(values: number[], w: number, h: number, pad = 0): Point[] {
  const n = values.length;
  if (n === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  return values.map((v, i) => ({
    x: pad + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW),
    y: pad + innerH - ((v - min) / range) * innerH,
  }));
}

/** Catmull-Rom -> cubic Bezier smoothing through the given points. */
function smoothPath(pts: Point[], tension = 0.5): string {
  let d = `M${round(pts[0].x)},${round(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension * 2;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension * 2;
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension * 2;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension * 2;
    d += ` C${round(cp1x)},${round(cp1y)} ${round(cp2x)},${round(cp2y)} ${round(p2.x)},${round(p2.y)}`;
  }
  return d;
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Smooth line path `d` for a series of values. */
export function linePath(values: number[], w: number, h: number, pad = 0): string {
  const pts = toPoints(values, w, h, pad);
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M${round(pts[0].x)},${round(pts[0].y)}`;
  return smoothPath(pts);
}

/** Closed area path `d` (line, then down to the baseline and back). */
export function areaPath(values: number[], w: number, h: number, pad = 0): string {
  const pts = toPoints(values, w, h, pad);
  if (pts.length < 2) return "";
  const line = smoothPath(pts);
  const baseY = h - pad;
  return `${line} L${round(pts[pts.length - 1].x)},${baseY} L${round(pts[0].x)},${baseY} Z`;
}

/** Stroke-dasharray values to draw a `pct` (0..1) arc of a ring of radius `r`. */
export function donutArc(pct: number, r: number): {
  circumference: number;
  dash: number;
  gap: number;
} {
  const circumference = 2 * Math.PI * r;
  const dash = circumference * Math.min(1, Math.max(0, pct));
  return { circumference, dash, gap: circumference - dash };
}
