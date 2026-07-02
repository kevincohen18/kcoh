import type { DemoLiveData } from "./data";

/** One simulated data tick every 1.6s (state update, not an animation). */
export const DEMO_TICK_MS = 1600;

export type SeriesBounds = { min: number; max: number; maxStep: number };

/**
 * Advance a series one tick: drop the first point and append a bounded
 * random-walk step from the last point. Pure and non-mutating; inject
 * `random` for deterministic tests.
 */
export function advanceSeries(
  series: number[],
  bounds: SeriesBounds,
  random: () => number = Math.random,
): number[] {
  if (series.length === 0) return [];
  const last = series[series.length - 1];
  const delta = (random() * 2 - 1) * bounds.maxStep;
  const next = Math.min(bounds.max, Math.max(bounds.min, last + delta));
  return [...series.slice(1), Math.round(next * 100) / 100];
}

export const REVENUE_BOUNDS: SeriesBounds = { min: 10, max: 42, maxStep: 3 };
export const USERS_BOUNDS: SeriesBounds = { min: 6, max: 30, maxStep: 2.5 };
export const TREND_BOUNDS: SeriesBounds = { min: 2, max: 32, maxStep: 2 };

/** Advance every live series in one pass (used by the demo shell's ticker). */
export function advanceDemoLive(
  live: DemoLiveData,
  random: () => number = Math.random,
): DemoLiveData {
  return {
    revenue: advanceSeries(live.revenue, REVENUE_BOUNDS, random),
    users: advanceSeries(live.users, USERS_BOUNDS, random),
    projectTrends: live.projectTrends.map((t) =>
      advanceSeries(t, TREND_BOUNDS, random),
    ),
  };
}
