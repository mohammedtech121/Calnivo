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

  // Calculator pages are surfaced via in-app SPA navigation but we still list
  // them so crawlers / AI search systems can discover the full calculator set.
  for (const calc of CALCULATORS) {
    entries.push({
      url: `${SITE_URL}/#calc-${calc.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
