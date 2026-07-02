/**
 * Neon category palette for the system-architecture diagram design system.
 *
 * Each architectural category owns one accent color. Panels, node cards, icons,
 * number badges and the legend all derive their border / glow / text color from
 * the same value, so a whole layer re-themes by changing one hex.
 */

export type CategoryKey =
  | "client"
  | "edge"
  | "auth"
  | "core"
  | "async"
  | "data"
  | "observ"
  | "admin"
  | "external";

export type Category = { label: string; color: string };

export const CATEGORY: Record<CategoryKey, Category> = {
  client: { label: "Client & Access", color: "#38bdf8" }, // sky
  edge: { label: "Edge & Access", color: "#a855f7" }, // violet
  auth: { label: "Security / Auth", color: "#f5c518" }, // gold
  core: { label: "Core Services", color: "#22c55e" }, // green
  async: { label: "Async Processing", color: "#f97316" }, // orange
  data: { label: "Data Management", color: "#3b82f6" }, // blue
  observ: { label: "Observability", color: "#a78bfa" }, // lilac
  admin: { label: "Management / External", color: "#ec4899" }, // pink
  external: { label: "Integrations", color: "#2dd4bf" }, // teal
};

/** Legend color key, in the reading order used on the poster. */
export const LEGEND_ITEMS: { label: string; color: string }[] = [
  { label: "Core Services", color: CATEGORY.core.color },
  { label: "Edge & Access", color: CATEGORY.edge.color },
  { label: "Async Processing", color: CATEGORY.async.color },
  { label: "Data Management", color: CATEGORY.data.color },
  { label: "Management / External", color: CATEGORY.admin.color },
  { label: "Integrations", color: CATEGORY.external.color },
  { label: "Security / Auth", color: CATEGORY.auth.color },
];

/** Convert a #rrggbb hex to an rgba() string at the given alpha. */
export function rgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
