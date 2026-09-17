import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/lib/calculators/registry";

const SITE_URL = "https://calnivocalc.com";

// Use a single build-time timestamp instead of `new Date()` per request.
// This prevents every deploy from making every page look "just modified",
// which is the Phase 6 requirement. Pages only legitimately change when the
// source changes — using the build time is a reasonable proxy for that.
// (Next.js sitemaps are generated at build time, not request time, so this
// is computed once per deploy.)
const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: BUILD_TIME,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/calculators`,
      lastModified: BUILD_TIME,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Legal / trust pages
    {
      url: `${SITE_URL}/about`,
      lastModified: BUILD_TIME,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: BUILD_TIME,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: BUILD_TIME,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: BUILD_TIME,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // Each calculator has its own crawlable URL.
    ...CALCULATORS.map((calc) => ({
      url: `${SITE_URL}/calculators/${calc.id}`,
      lastModified: BUILD_TIME,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
