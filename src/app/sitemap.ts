import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/lib/calculators/registry";

const SITE_URL = "https://calnivocalc.com";

// Same set as NOT_READY in /calculators/[id]/page.tsx — these pages are
// noindexed until rewritten with unique per-calculator content.
const NOT_READY = new Set([
  "concrete", "subnet", "hours", "time", "random-number", "password-generator",
  "pace", "triangle", "standard-deviation", "finance", "interest-rate",
  "sales-tax", "pregnancy-conception", "fraction", "conversion", "gpa",
  "grade", "date", "ideal-weight", "body-fat", "bmr", "pregnancy",
  "inflation", "investment", "amortization", "interest", "payment",
  "salary", "retirement", "auto-loan",
]);

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
