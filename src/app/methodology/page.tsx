import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { CALCULATORS, CALCULATOR_MAP } from "@/lib/calculators/registry";
import { NOINDEX_CALCULATOR_IDS } from "@/lib/calculators/indexability";
import {
  ShieldCheck,
  ClipboardCheck,
  BookOpen,
  Mail,
  AlertCircle,
} from "lucide-react";

export const metadata = {
  title: "Methodology & Corrections — How Calnivo Calculators Are Built",
  description:
    "How every Calnivo calculator is built: the formula, the primary source, when it was last checked, and its known limits. Plus a dated corrections log of every change we have made.",
  alternates: { canonical: "https://calnivocalc.com/methodology" },
  authors: [{ name: "Mohammed Khan" }],
  openGraph: {
    title: "Methodology & Corrections — How Calnivo Calculators Are Built",
    description:
      "How every Calnivo calculator is built: formula, source, last review date and known limits, plus a dated corrections log.",
    url: "https://calnivocalc.com/methodology",
    siteName: "Calnivo",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Methodology & Corrections — Calnivo",
    description:
      "How every Calnivo calculator is built: formula, source, last review date, and a dated corrections log.",
  },
};

// Same set as the noindex list in /calculators/[id]/page.tsx and /sitemap.ts.
// The methodology table only lists calculators that are indexable (rewritten
// with the Fix 1 content structure). Noindexed calculators are noted as
// "pending rewrite" at the bottom.
// Centralized noindex list — see src/lib/calculators/indexability.ts (Issue 24).
const NOT_READY = NOINDEX_CALCULATOR_IDS;

interface Correction {
  date: string;
  calculator: string;
  change: string;
}

const CORRECTIONS_LOG: Correction[] = [
  {
    date: "2026-11-17",
    calculator: "Income Tax",
    change:
      "Corrected the 2026 federal tax brackets to the official IRS Rev. Proc. 2025-32 thresholds (single: $12,400 / $50,400 / $105,700 / $201,775 / $256,225 / $640,600; married and head of household refreshed likewise). Recomputed all worked examples: $85,000 single → $13,412 (was $13,407); $100,000 → $16,712; $83,900 → $13,170. Standard deduction FAQ retained at 2025 ($15,750 single / $31,500 married) and 2026 ($16,100 / $32,200) figures.",
  },
  {
    date: "2026-11-17",
    calculator: "Mortgage",
    change:
      "Corrected the worked example: monthly payment $2,022.62 (was $2,022.82), total interest $408,142.36 (was $408,215), total paid $728,142.36 (was $728,215). Numbers now match the live calculator exactly.",
  },
  {
    date: "2026-11-17",
    calculator: "Loan",
    change:
      "Corrected the worked example: monthly payment $525.05 (was $525.13), total interest $6,502.79 (was $6,507.80), total paid $31,502.79 (was $31,507.80).",
  },
  {
    date: "2026-11-17",
    calculator: "Interest Rate",
    change:
      "Relabelled the result from “effective APR” to “nominal APR” (the code multiplies the monthly rate by 12, which is a nominal rate). Added a separate APY card computing (1 + r)^12 − 1. Corrected the worked example payment from $482.66 to $482.83 (the value that actually gives 7.42%).",
  },
  {
    date: "2026-11-17",
    calculator: "Pregnancy Conception",
    change:
      "Aligned the fertile window with the standard medical definition (5 days before ovulation + ovulation day = 6 days) instead of the ±2-day window previously shown. The narrower ±2-day window is kept as the “most likely” ovulation window.",
  },
  {
    date: "2026-11-17",
    calculator: "Fraction",
    change:
      "The add/subtract step now uses the true least common denominator (LCM of the denominators) instead of the product. The step-by-step explains when the product equals the LCD and when it does not.",
  },
  {
    date: "2026-11-17",
    calculator: "Password Generator",
    change:
      "Entropy now uses the actual selected alphabet size (length × log₂(alphabet)) instead of a regex-based estimate with hardcoded pool sizes. Added a thresholds explanation for weak/fair/good/strong/very strong.",
  },
];

export default function MethodologyPage() {
  const indexed = CALCULATORS.filter((c) => !NOT_READY.has(c.id));

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Methodology &amp; Corrections
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-brand-muted">
          This page explains how every Calnivo calculator is built, where its
          numbers come from, when it was last checked, and what it leaves out.
          It also keeps a dated log of every correction we have made. If a
          result looks wrong,{" "}
          <Link
            href="/contact"
            className="font-medium text-brand-accent-deep hover:underline"
          >
            email us
          </Link>{" "}
          and we will investigate and publish the correction here.
        </p>

        {/* How we write and check */}
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-ink">
            <ClipboardCheck className="h-5 w-5 text-brand-accent-deep" />
            How we write and check a calculator
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
              <h3 className="font-semibold text-brand-ink">1. Pick the formula</h3>
              <p className="mt-1 text-sm text-brand-muted">
                We start from the standard published formula for the
                calculation — amortization for loans, Mifflin-St Jeor for
                calories, Naegele’s rule for due dates, US Navy circumference
                for body fat — and cite the primary source on each page.
              </p>
            </div>
            <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
              <h3 className="font-semibold text-brand-ink">
                2. Implement and test
              </h3>
              <p className="mt-1 text-sm text-brand-muted">
                The formula is implemented in TypeScript and checked against an
                independent reference (a spreadsheet function such as PMT, or
                an official worked example). One reference case per indexed
                calculator runs in our automated test suite on every push.
              </p>
            </div>
            <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
              <h3 className="font-semibold text-brand-ink">
                3. Verify examples against the code
              </h3>
              <p className="mt-1 text-sm text-brand-muted">
                Every worked example on a calculator page is computed
                independently (in Python or a spreadsheet) and checked against
                the live calculator output before publishing. Examples are
                stored as text in the registry and regression-tested in our
                test suite so the text and the tool cannot drift apart.
              </p>
            </div>
            <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
              <h3 className="font-semibold text-brand-ink">
                4. State limits and sources
              </h3>
              <p className="mt-1 text-sm text-brand-muted">
                Each page lists what the result does and does not include,
                when it can mislead, and links to the primary source. A
                visible “Last reviewed” date shows when the figures were last
                rechecked.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator table */}
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-ink">
            <BookOpen className="h-5 w-5 text-brand-accent-deep" />
            Calculator index
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            Only calculators that have been rewritten with the full content
            structure (formula, method, limits, sources, last-reviewed date)
            are listed here and indexed by search engines. The rest are
            noindexed until they are rewritten.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-brand">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                    <th className="px-4 py-3">Calculator</th>
                    <th className="px-4 py-3">Formula family</th>
                    <th className="px-4 py-3">Primary source</th>
                    <th className="px-4 py-3 text-right">Last reviewed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-brand-ink">
                  {indexed.map((c) => {
                    const meta = CALCULATOR_MAP[c.id];
                    const src = meta.seo?.sources?.[0];
                    const formulaText = meta.seo?.method?.formula ?? meta.seo?.formula ?? "";
                    return (
                      <tr key={c.id} className="bg-white">
                        <td className="px-4 py-3 font-medium">
                          <Link
                            href={`/calculators/${c.id}`}
                            className="text-brand-accent-deep hover:underline"
                          >
                            {meta.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-brand-muted">
                          {formulaText ? formulaText.split(".")[0] + "." : "—"}
                        </td>
                        <td className="px-4 py-3 text-brand-muted">
                          {src ? (
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="text-brand-accent-deep hover:underline"
                            >
                              {src.title}
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-brand-muted">
                          {meta.seo?.lastReviewed ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-xs text-brand-muted">
            {indexed.length} calculators indexed ·{" "}
            {CALCULATORS.length - indexed.length} calculators pending rewrite
            (noindexed in the meantime).
          </p>
        </section>

        {/* Corrections log */}
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-ink">
            <ShieldCheck className="h-5 w-5 text-brand-accent-deep" />
            Corrections log
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            Every change that affects a calculated result or a stated figure is
            recorded here with the date. Older entries are kept indefinitely.
          </p>
          <ol className="mt-4 space-y-3">
            {CORRECTIONS_LOG.map((c, i) => (
              <li
                key={i}
                className="rounded-xl border border-brand bg-white p-4 shadow-brand"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="rounded-full bg-brand-accent-gradient px-2.5 py-0.5 text-xs font-bold text-white">
                    {c.date}
                  </span>
                  <span className="font-semibold text-brand-ink">
                    {c.calculator}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  {c.change}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Report an error */}
        <section className="mt-10">
          <div className="rounded-2xl border border-brand bg-gradient-to-br from-accent/40 to-white p-6 shadow-brand sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-ink">
              <AlertCircle className="h-5 w-5 text-brand-accent-deep" />
              Report an error
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              If a result looks wrong, or a worked example does not match what
              the live tool outputs,{" "}
              <Link
                href="/contact"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                email us at hello@calnivocalc.com
              </Link>
              . Tell us the calculator, the inputs you used, and what you
              expected. We investigate every report, fix the root cause, and
              publish the correction in the log above with the date.
            </p>
          </div>
        </section>

        {/* What this page does and does not promise */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-brand-ink">
            What this page does and does not promise
          </h2>
          <div className="mt-3 space-y-2 text-sm text-brand-muted">
            <p>
              <strong className="text-brand-ink">Does:</strong> list the formula,
              source and last-review date for every indexed calculator; keep a
              dated corrections log; explain how examples are produced.
            </p>
            <p>
              <strong className="text-brand-ink">Does not:</strong> guarantee
              every result is correct for your situation. Tax tables change,
              medical guidance is updated, and some calculators intentionally
              exclude state tax, fees, or individual health factors. Always
              confirm financial, tax and medical figures with a qualified
              professional before acting on them.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
