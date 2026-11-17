import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/lib/calculators/registry";
import { NOINDEX_CALCULATOR_IDS } from "@/lib/calculators/indexability";

const SITE_URL = "https://calnivocalc.com";

// Centralized noindex list — see src/lib/calculators/indexability.ts (Issue 24).
const NOT_READY = NOINDEX_CALCULATOR_IDS;

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
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog/how-to-calculate-mortgage-payment`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/understanding-bmi`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/compound-interest-explained`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/retirement-planning-guide`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/how-many-calories-should-you-eat`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/15-year-vs-30-year-mortgage`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/what-extra-200-a-month-does`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/nominal-vs-effective-interest-rate`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/how-federal-tax-brackets-work`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/does-compounding-frequency-matter`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/password-length-vs-complexity`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/how-concrete-bag-counts-work`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/how-due-dates-are-calculated`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/longer-loan-lower-rate-which-costs-less`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/methodology`,
      changeFrequency: "monthly",
      priority: 0.5,
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
    // Only include calculators that are NOT noindexed
    ...CALCULATORS
      .filter((calc) => !NOT_READY.has(calc.id))
      .map((calc) => ({
        url: `${SITE_URL}/calculators/${calc.id}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
