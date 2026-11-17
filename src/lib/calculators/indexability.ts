/**
 * Shared indexability policy for calculators.
 *
 * Single source of truth for which calculator IDs are noindexed (not yet
 * rewritten with the full Fix 1 content structure). Imported by the
 * calculator route, sitemap, and methodology page so the three lists can
 * never drift apart.
 *
 * Per AdSense audit Issue 24: the list was previously duplicated in three
 * files. Now any change here propagates everywhere automatically.
 */

export const NOINDEX_CALCULATOR_IDS: ReadonlySet<string> = new Set([
  "concrete",
  "subnet",
  "hours",
  "time",
  "random-number",
  "password-generator",
  "pace",
  "triangle",
  "standard-deviation",
  "finance",
  "interest-rate",
  "sales-tax",
  "pregnancy-conception",
  "fraction",
  "conversion",
  "gpa",
  "grade",
  "date",
  "ideal-weight",
  "body-fat",
  "bmr",
  "pregnancy",
  "inflation",
  "investment",
  "amortization",
  "interest",
  "payment",
  "salary",
  "retirement",
  "auto-loan",
]);

/** Returns true if the calculator ID should be noindexed (pending rewrite). */
export function isNoindexed(id: string): boolean {
  return NOINDEX_CALCULATOR_IDS.has(id);
}
