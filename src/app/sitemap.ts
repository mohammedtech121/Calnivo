import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/lib/calculators/registry";

const SITE_URL = "https://calnivocalc.com";

// Per the Combined Audit: omit lastModified when a reliable page-specific
// update date is unavailable. We do NOT assign a fake build-time timestamp
// to every URL — that would make every page appear "just modified" on
// every deploy. Instead, only changefreq + priority are used.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/calculators`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...CALCULATORS.map((calc) => ({
      url: `${SITE_URL}/calculators/${calc.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
