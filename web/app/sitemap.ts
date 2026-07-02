import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";

// Required for `output: "export"` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

const base = "https://kcoh.ca";
const lastModified = new Date("2026-07-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/services/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/work/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/about/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/dashboard/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Slugs are identical across locales (no /fr routes) — the English list
  // is authoritative for the route set.
  const caseRoutes: MetadataRoute.Sitemap = caseStudies.en.map((cs) => ({
    url: `${base}/work/${cs.slug}/`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseRoutes];
}
