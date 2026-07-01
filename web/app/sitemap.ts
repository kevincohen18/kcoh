import type { MetadataRoute } from "next";

// Required for `output: "export"` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kcoh.ca";
  const lastModified = new Date("2026-07-01");

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/dashboard`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
