import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { ArticleTrustFooter } from "@/components/blog/ArticleTrustFooter";

export const metadata = {
  title: "Nominal vs Effective Interest Rate: APR vs APY Explained",
  description:
    "A 12% nominal APR is not the same as 12% APY. Learn the difference between nominal APR (what lenders quote) and APY (the true annual cost including compounding), with a worked example.",
  alternates: { canonical: "/blog/nominal-vs-effective-interest-rate" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Nominal vs Effective Interest Rate: APR vs APY Explained",
  url: "https://calnivocalc.com/blog/nominal-vs-effective-interest-rate",
  datePublished: "2026-11-20",
  dateModified: "2026-11-20",
  author: {
    "@type": "Person",
    name: "Mohammed Khan",
    url: "https://calnivocalc.com/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Calnivo",
    logo: {
      "@type": "ImageObject",
      url: "https://calnivocalc.com/calnivo-logo.png",
    },
  },
};

export default function Article() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <Link href="/blog" className="text-sm text-brand-accent-deep hover:underline">
          ← Back to blog
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Nominal vs Effective Interest Rate: APR vs APY Explained
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          November 2026 · 6 min read · By Mohammed Khan
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <p>
            When you see an interest rate advertised for a loan, a credit card, or a savings
            account, the number you see is not always the number you pay. A loan advertised at{" "}
            <strong className="text-brand-ink">12% APR</strong> can cost you more than 12% a year
            once compounding is included. The difference is the gap between the{" "}
            <strong className="text-brand-ink">nominal rate</strong> (what lenders quote) and the{" "}
            <strong className="text-brand-ink">effective rate</strong> (what you actually pay or
            earn). This article explains the difference with a worked example.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Two rates, same loan: the headline
          </h2>
          <p>
            Here is the core example. A loan with a{" "}
            <strong className="text-brand-ink">12% nominal APR compounded monthly</strong> has a
            true annual cost of{" "}
            <strong className="text-brand-ink">12.68% APY</strong>. That extra 0.68 percentage
            point is not a fee or a trick — it is the effect of interest being charged on interest
            within the year. On a $10,000 loan held for a full year, 12% nominal means you owe about{" "}
            <strong className="text-brand-ink">$1,268</strong> in interest, not $1,200.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">What is a nominal rate?</h2>
          <p>
            The <strong className="text-brand-ink">nominal annual percentage rate (APR)</strong> is
            the simple annual rate a lender quotes. It is the monthly rate multiplied by 12 (or the
            daily rate multiplied by 365). If the monthly rate is 1%, the nominal APR is 12%. This
            is the number you see on advertisements, loan disclosures and most comparison sites.
          </p>
          <p>
            The nominal rate ignores compounding within the year. It answers the question:{" "}
            &ldquo;If I borrow $X and pay it back in exactly one year with no intermediate
            charges, what is the interest?&rdquo; It does not answer the more realistic question
            of what happens when interest is charged monthly (or daily) on a declining or growing
            balance.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">What is the effective rate (APY)?</h2>
          <p>
            The <strong className="text-brand-ink">annual percentage yield (APY)</strong>, also
            called the effective annual rate, is the true annual cost or return once compounding is
            included. The formula is:
          </p>
          <p className="rounded-lg bg-muted/50 px-4 py-3 font-mono text-sm text-brand-ink">
            APY = (1 + r/n)^n − 1
          </p>
          <p>
            Where <strong className="text-brand-ink">r</strong> is the nominal annual rate (as a
            decimal) and <strong className="text-brand-ink">n</strong> is the number of compounding
            periods per year. For monthly compounding, n = 12.
          </p>
          <p>
            For the 12% nominal APR compounded monthly: APY = (1 + 0.12/12)^12 − 1 = (1.01)^12 − 1
            = 0.12682… = <strong className="text-brand-ink">12.68%</strong>.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            How compounding frequency changes the effective rate
          </h2>
          <p>
            The more often interest is compounded, the higher the effective rate for the same
            nominal rate. Here is the same 12% nominal APR at different compounding frequencies:
          </p>
          <div className="overflow-hidden rounded-xl border border-brand">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  <th className="px-4 py-3">Compounding</th>
                  <th className="px-4 py-3 text-right">Periods (n)</th>
                  <th className="px-4 py-3 text-right">Effective rate (APY)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-brand-ink">
                <tr>
                  <td className="px-4 py-3">Annually</td>
                  <td className="px-4 py-3 text-right tabular-nums">1</td>
                  <td className="px-4 py-3 text-right tabular-nums">12.00%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Semiannually</td>
                  <td className="px-4 py-3 text-right tabular-nums">2</td>
                  <td className="px-4 py-3 text-right tabular-nums">12.36%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Quarterly</td>
                  <td className="px-4 py-3 text-right tabular-nums">4</td>
                  <td className="px-4 py-3 text-right tabular-nums">12.55%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Monthly</td>
                  <td className="px-4 py-3 text-right tabular-nums">12</td>
                  <td className="px-4 py-3 text-right tabular-nums">12.68%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Daily</td>
                  <td className="px-4 py-3 text-right tabular-nums">365</td>
                  <td className="px-4 py-3 text-right tabular-nums">12.75%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-brand-muted">
            The annual case equals the nominal rate because there is no intra-year compounding. As
            n grows, the effective rate approaches a limit (continuous compounding) of e^r − 1 ≈
            12.75% for r = 12%.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Why this matters when comparing loans
          </h2>
          <p>
            Two loans with the same nominal APR can cost meaningfully different amounts if they
            compound at different frequencies. A credit card at 22% nominal compounded daily has an
            APY of about 24.6%, while a personal loan at 22% nominal compounded monthly has an APY
            of about 24.4%. Over a year, the daily-compounding version costs roughly $26 more per
            $10,000 borrowed. When the rates are close, the effective rate — not the nominal rate —
            is the honest comparison.
          </p>
          <p>
            In the U.S., the Truth in Lending Act requires lenders to disclose the APR, which{" "}
            <em>should</em> include most fees. But APR still does not always reflect compounding
            within the year the way APY does. For savings accounts and CDs, the Truth in Savings
            Act requires the APY to be disclosed, which is why you see APY quoted on deposit
            products but APR on loans.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">A worked loan example</h2>
          <p>
            Suppose you borrow <strong className="text-brand-ink">$20,000</strong> at a{" "}
            <strong className="text-brand-ink">12% nominal APR compounded monthly</strong> and pay
            it back over <strong className="text-brand-ink">48 months</strong>. The monthly payment
            from the standard amortization formula is about{" "}
            <strong className="text-brand-ink">$526.67</strong>. Over 48 months you pay a total of
            about $25,280, of which $5,280 is interest. If you had used the nominal 12% as if it
            were the true annual rate, you would have expected to pay about 12% × $20,000 × 4 =
            $9,600 in interest over 4 years — but because of compounding and the declining
            balance, the actual total is less than that (interest is charged on the declining
            balance, not the original loan).
          </p>
          <p>
            The key point: the <strong className="text-brand-ink">12.68% APY</strong> tells you the
            true cost of holding the full $20,000 for a year. The amortization schedule tells you
            the actual interest paid over the loan&apos;s life. Both are correct; they answer
            different questions.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            How to compute the effective rate yourself
          </h2>
          <p>
            If you know a loan&apos;s monthly payment, principal and term, you can solve for the
            monthly rate and then convert it to both the nominal APR (monthly rate × 12) and the
            APY ((1 + monthly rate)^12 − 1). Calnivo&apos;s{" "}
            <Link
              href="/calculators/interest-rate"
              className="font-medium text-brand-accent-deep hover:underline"
            >
              Interest Rate Calculator
            </Link>{" "}
            does this for you — enter the loan amount, monthly payment and term, and it shows both
            the nominal APR and the APY.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Important disclaimer</h2>
          <p>
            This article is for educational purposes only and does not constitute financial
            advice. Actual loan terms, fees and compounding rules vary by lender and jurisdiction.
            U.S. Truth in Lending disclosures have specific rules about what APR must include; always
            read your loan&apos;s disclosure documents. Consult a qualified financial professional
            before making borrowing decisions.
          </p>

          <div className="mt-8 rounded-xl border border-brand bg-gradient-to-br from-accent/30 to-white p-5">
            <p className="text-sm font-semibold text-brand-ink">
              Find the true rate on your own loan
            </p>
            <p className="mt-1 text-sm text-brand-muted">
              Enter your loan amount, monthly payment and term in Calnivo&apos;s interest rate
              calculator to see both the nominal APR and the APY.
            </p>
            <Link
              href="/calculators/interest-rate"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-[1.03]"
            >
              Open Interest Rate Calculator →
            </Link>
          </div>
        </div>

        <ArticleTrustFooter
          author="Mohammed Khan"
          reviewer="Hammad Khan"
          updatedDate="November 2026"
          sources={[
            {
              name: "CFPB — What is the difference between interest rate and APR?",
              url: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-an-interest-rate-and-an-apr-en-135/",
            },
            {
              name: "CFPB — What is the difference between APR and APY?",
              url: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-apr-and-apy-en-135/",
            },
            {
              name: "Federal Reserve — Truth in Lending Act overview",
              url: "https://www.federalreserve.gov/boarddocs/supmanual/cch/tila.htm",
            },
          ]}
        />
      </article>
    </Layout>
  );
}
