import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";

// Required for `output: "export"` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

const base = "https://kcoh.ca";
const lastModified = new Date("2026-07-02");

// Canonical route set expressed as English (root) paths + a priority. French
// lives under /fr; case-study slugs are identical across locales.
const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/services/", priority: 0.8 },
  { path: "/work/", priority: 0.9 },
  { path: "/about/", priority: 0.7 },
  { path: "/contact/", priority: 0.8 },
  { path: "/dashboard/", priority: 0.5 },
  ...caseStudies.en.map((cs) => ({
    path: `/work/${cs.slug}/`,
    priority: 0.7,
  })),
];

const frPath = (p: string) => (p === "/" ? "/fr/" : `/fr${p}`);

export default function sitemap(): MetadataRoute.Sitemap {
  // Emit both the English (root) and French (/fr) URL for each route, each
  // carrying the full hreflang alternates map (self-reference included) so
  // Google pairs the two language variants.
  return routes.flatMap(({ path, priority }) => {
    const languages = {
      en: `${base}${path}`,
      fr: `${base}${frPath(path)}`,
    };
    const common = {
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    };
    return [
      { url: `${base}${path}`, ...common },
      { url: `${base}${frPath(path)}`, ...common },
    ];
  });
}
