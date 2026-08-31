import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/lib/calculators/registry";

const SITE_URL = "https://calnivocalc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Each calculator has its own crawlable URL.
  for (const calc of CALCULATORS) {
    entries.push({
      url: `${SITE_URL}/calculators/${calc.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
