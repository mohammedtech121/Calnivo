import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { ArticleTrustFooter } from "@/components/blog/ArticleTrustFooter";

export const metadata = {
  title: "15-Year vs 30-Year Mortgage: Which Costs Less?",
  description:
    "Compare a 15-year vs 30-year mortgage on the same $320,000 loan at 6.5%. See the monthly payment, total interest, and total cost side-by-side, and learn which term fits your situation.",
  alternates: { canonical: "/blog/15-year-vs-30-year-mortgage" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "15-Year vs 30-Year Mortgage: Which Costs Less?",
  url: "https://calnivocalc.com/blog/15-year-vs-30-year-mortgage",
  datePublished: "2026-11-17",
  dateModified: "2026-11-17",
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
          15-Year vs 30-Year Mortgage: Which Costs Less?
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          November 2026 · 7 min read · By Mohammed Khan
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <p>
            When you take out a mortgage, the single biggest lever you control is the loan term.
            The choice between 15 years and 30 years changes your monthly payment by hundreds of
            dollars and your total interest by more than two hundred thousand dollars on the same
            loan. This article compares both terms on the same loan using real numbers, so you can
            see exactly what changes and why.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">The example loan</h2>
          <p>
            To make the comparison fair, we use the same loan for both terms: a{" "}
            <strong className="text-brand-ink">$320,000 principal</strong> at a{" "}
            <strong className="text-brand-ink">6.5% annual interest rate</strong>. In practice,
            15-year mortgages usually carry a rate about 0.5% lower than 30-year mortgages, but we
            hold the rate constant here so the only variable is the term. You can model your own
            numbers — including a different rate for each term — in Calnivo&apos;s free{" "}
            <Link
              href="/calculators/mortgage"
              className="font-medium text-brand-accent-deep hover:underline"
            >
              Mortgage Calculator
            </Link>
            .
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Side-by-side: 15-year vs 30-year
          </h2>
          <p>Here is what each term looks like on the same $320,000 loan at 6.5%:</p>
          <div className="overflow-hidden rounded-xl border border-brand">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  <th className="px-4 py-3">Metric</th>
                  <th className="px-4 py-3 text-right">30-year term</th>
                  <th className="px-4 py-3 text-right">15-year term</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-brand-ink">
                <tr>
                  <td className="px-4 py-3 font-medium">Monthly payment</td>
                  <td className="px-4 py-3 text-right tabular-nums">$2,022.62</td>
                  <td className="px-4 py-3 text-right tabular-nums">$2,787.54</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Total interest paid</td>
                  <td className="px-4 py-3 text-right tabular-nums">$408,142.36</td>
                  <td className="px-4 py-3 text-right tabular-nums">$181,757.84</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Total paid over the term</td>
                  <td className="px-4 py-3 text-right tabular-nums">$728,142.36</td>
                  <td className="px-4 py-3 text-right tabular-nums">$461,757.84</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-emerald-50">
                  <td className="px-4 py-3 font-semibold text-emerald-700">
                    Interest saved (15-yr)
                  </td>
                  <td className="px-4 py-3" colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            Interest saved with the 15-year term: $226,384.52
          </p>
          <p className="text-xs text-brand-muted">
            All figures computed from the standard amortization formula{" "}
            <code className="rounded bg-muted/50 px-1 py-0.5">
              M = P × [r(1+r)^n] / [(1+r)^n − 1]
            </code>
            . Monthly payment is principal and interest only — property tax, insurance and PMI are
            not included.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">What the numbers mean</h2>
          <p>
            The 15-year mortgage costs{" "}
            <strong className="text-brand-ink">$764.92 more per month</strong> ($2,787.54 −
            $2,022.62). That is a real cash-flow cost every month for 15 years. In exchange, you
            pay <strong className="text-brand-ink">$226,384.52 less in interest</strong> over the
            life of the loan — more than the original principal you borrowed. You also own your home
            free and clear 15 years sooner, which means no mortgage payment at all from year 16 to
            year 30.
          </p>
          <p>
            But the higher monthly payment is the trade-off. On the same income, $764.92 more per
            month for housing could strain your budget, reduce your emergency fund, or crowd out
            investing. The 30-year term keeps the monthly payment lower, which gives you
            flexibility — you can always pay extra when you have the money, but you are not
            obligated to.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            The case for the 30-year term
          </h2>
          <p>
            A 30-year mortgage is not automatically worse. The lower payment buys you{" "}
            <strong className="text-brand-ink">optionality</strong>. If you lose your job, have a
            medical emergency, or want to invest the $764.92 difference in the stock market
            instead, the 30-year term lets you. Historically, broad stock market returns have
            averaged about 7% per year after inflation, while mortgage interest is deductible for
            many taxpayers — so the after-cost gap between paying down a 6.5% mortgage and
            investing can be small or even negative.
          </p>
          <p>
            The 30-year term is also the only option for many first-time buyers. A $2,787 monthly
            payment requires roughly $100,000 of gross income to stay within the 28% housing-cost
            ratio most lenders use. If your income is lower, the 30-year term may be the only way
            to buy at all.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            The case for the 15-year term
          </h2>
          <p>
            The 15-year mortgage is the right choice when you can comfortably afford the higher
            payment and your priority is a guaranteed, risk-free return. Every dollar of principal
            you pay down early earns the mortgage rate (6.5% here) with zero risk and no tax on the
            &ldquo;return.&rdquo; For a borrower in a high tax bracket, the after-tax mortgage rate
            may be lower than the nominal 6.5%, but for most taxpayers, paying down a 6.5% mortgage
            is equivalent to a risk-free investment returning about 5–6.5%.
          </p>
          <p>
            The 15-year term also builds equity much faster. In the first year of the 30-year
            loan, only about $3,500 of your $24,271 in payments goes to principal. In the first
            year of the 15-year loan, about $19,000 of your $33,450 in payments goes to principal —
            more than five times as much equity built in a single year.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            A middle path: the 30-year term with extra payments
          </h2>
          <p>
            You do not have to choose rigidly between 15 and 30. Many borrowers take the 30-year
            term for the lower required payment, then pay extra each month when they can. Adding{" "}
            <strong className="text-brand-ink">$200 a month</strong> to the 30-year loan in our
            example pays it off in about <strong className="text-brand-ink">281 months</strong>{" "}
            (23 years 5 months) instead of 360, and cuts total interest from $408,142 to roughly{" "}
            <strong className="text-brand-ink">$304,556</strong> — a saving of about{" "}
            <strong className="text-brand-ink">$103,586</strong>. You get most of the 15-year
            benefit while keeping the option to drop back to the lower payment if money gets tight.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Which should you pick?</h2>
          <p>There is no universally correct answer. Choose the 15-year term if:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>You can afford the higher payment and still keep a 3–6 month emergency fund.</li>
            <li>You are close to retirement and want to be mortgage-free before you stop working.</li>
            <li>You prefer a guaranteed, risk-free return over the uncertain returns of investing.</li>
          </ul>
          <p className="mt-3">Choose the 30-year term if:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              The higher payment would strain your monthly budget or eat into your emergency fund.
            </li>
            <li>
              You expect your income to grow and want to invest the difference in the stock market.
            </li>
            <li>
              You value the flexibility to pay extra when you can, and drop back when you cannot.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-brand-ink">Important disclaimer</h2>
          <p>
            This article is for educational purposes only and does not constitute financial advice.
            Actual mortgage rates, terms and costs vary by lender, jurisdiction and your individual
            financial situation. The figures shown use a fixed 6.5% rate for both terms; in
            practice, 15-year rates are typically 0.25–0.5% lower than 30-year rates. Always
            consult a qualified mortgage professional or financial advisor before making decisions
            about your home loan.
          </p>

          <div className="mt-8 rounded-xl border border-brand bg-gradient-to-br from-accent/30 to-white p-5">
            <p className="text-sm font-semibold text-brand-ink">Compare both terms yourself</p>
            <p className="mt-1 text-sm text-brand-muted">
              Enter your own loan amount and rate in Calnivo&apos;s mortgage calculator to see your
              monthly payment and total interest for any term.
            </p>
            <Link
              href="/calculators/mortgage"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-[1.03]"
            >
              Open Mortgage Calculator →
            </Link>
          </div>
        </div>

        <ArticleTrustFooter
          author="Mohammed Khan"
          reviewer="Hammad Khan"
          updatedDate="November 2026"
          sources={[
            {
              name: "CFPB — Owning a home: mortgage basics",
              url: "https://www.consumerfinance.gov/owning-a-home/mortgage-basics/",
            },
            {
              name: "Freddie Mac — 15-year vs 30-year mortgage",
              url: "https://www.freddiemac.com/education/homeownership/understanding-mortgages/15-vs-30-year-mortgage",
            },
            {
              name: "FDIC — Mortgage payment basics",
              url: "https://www.fdic.gov/resources/consumers/consumer-news/2019-10.html",
            },
          ]}
        />
      </article>
    </Layout>
  );
}
