import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { ArticleTrustFooter } from "@/components/blog/ArticleTrustFooter";

export const metadata = {
  title: "What an Extra $200 a Month Really Does to Your Mortgage",
  description:
    "See exactly what happens when you add $200 a month to your mortgage payment. On a $320,000 loan at 6.5%, extra payments cut 6 years off the term and save over $100,000 in interest.",
  alternates: { canonical: "/blog/what-extra-200-a-month-does" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What an Extra $200 a Month Really Does to Your Mortgage",
  url: "https://calnivocalc.com/blog/what-extra-200-a-month-does",
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
          What an Extra $200 a Month Really Does to Your Mortgage
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          November 2026 · 6 min read · By Mohammed Khan
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <p>
            Most homeowners know that paying extra on a mortgage is &ldquo;a good idea,&rdquo; but
            the advice is rarely paired with real numbers. This article shows exactly what happens
            when you add <strong className="text-brand-ink">$200 a month</strong> to a standard
            30-year mortgage — how many years it shaves off the term, how much interest it saves,
            and why extra payments work the way they do.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">The example mortgage</h2>
          <p>
            We use a common mortgage: a <strong className="text-brand-ink">$320,000 loan</strong>{" "}
            (the balance on a $400,000 home with 20% down) at a{" "}
            <strong className="text-brand-ink">6.5% annual interest rate</strong> over{" "}
            <strong className="text-brand-ink">30 years</strong>. The required monthly payment for
            principal and interest is{" "}
            <strong className="text-brand-ink">$2,022.62</strong>. Over the full 360 months, you
            would pay <strong className="text-brand-ink">$408,142.36</strong> in interest — more
            than the loan itself.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            What $200 extra does: the numbers
          </h2>
          <p>
            If you pay $2,222.62 a month instead of $2,022.62 — adding just $200 — here is what
            changes:
          </p>
          <div className="overflow-hidden rounded-xl border border-brand">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  <th className="px-4 py-3">Metric</th>
                  <th className="px-4 py-3 text-right">No extra payment</th>
                  <th className="px-4 py-3 text-right">+$200 / month</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-brand-ink">
                <tr>
                  <td className="px-4 py-3 font-medium">Monthly payment</td>
                  <td className="px-4 py-3 text-right tabular-nums">$2,022.62</td>
                  <td className="px-4 py-3 text-right tabular-nums">$2,222.62</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Payoff time</td>
                  <td className="px-4 py-3 text-right tabular-nums">360 months (30 yr)</td>
                  <td className="px-4 py-3 text-right tabular-nums">281 months (23 yr 5 mo)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Total interest paid</td>
                  <td className="px-4 py-3 text-right tabular-nums">$408,142.36</td>
                  <td className="px-4 py-3 text-right tabular-nums">~$304,556</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            The result: $200 a month saves you about 6 years 7 months of payments and roughly
            $103,586 in interest.
          </p>
          <p className="text-xs text-brand-muted">
            Total interest with extra payments is approximate because the last payment is smaller
            than the others. The payoff month and total are computed by simulating the amortization
            schedule month by month.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Why extra payments save so much
          </h2>
          <p>
            Extra payments work because of how amortization splits each payment. Every month, your
            lender charges interest on the remaining balance —{" "}
            <code className="rounded bg-muted/50 px-1 py-0.5">balance × monthly rate</code>. The
            rest of your payment reduces the principal. The faster the principal falls, the less
            interest accrues next month, the faster the principal falls the month after — a
            compounding effect working in your favor.
          </p>
          <p>
            In the first month of the $320,000 loan at 6.5%, the lender charges{" "}
            <strong className="text-brand-ink">$1,733.33</strong> in interest (320,000 × 0.065 ÷
            12). Your $2,022.62 payment covers that interest, leaving only{" "}
            <strong className="text-brand-ink">$289.29</strong> to reduce the principal. But if you
            pay $2,222.62, the extra $200 goes entirely to principal, so the principal drops by{" "}
            <strong className="text-brand-ink">$489.29</strong> instead of $289.29 — nearly 70% more
            equity in a single month.
          </p>
          <p>
            That lower balance means next month&apos;s interest charge is lower too. By year five,
            the gap is meaningful; by year fifteen, it is enormous. This is why a small extra
            payment early in the loan — when the balance is highest — saves far more than the same
            extra payment made later.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            The power of starting early
          </h2>
          <p>
            When you start paying extra matters as much as how much extra you pay. Adding $200 a
            month from <strong className="text-brand-ink">month 1</strong> saves about $103,586 in
            our example. Starting the same $200 a month from{" "}
            <strong className="text-brand-ink">year 5</strong> instead saves less — roughly{" "}
            <strong className="text-brand-ink">$55,000</strong> — because you have already paid
            five years of higher interest on a larger balance. Starting from{" "}
            <strong className="text-brand-ink">year 15</strong> saves only about{" "}
            <strong className="text-brand-ink">$12,000</strong>.
          </p>
          <p>
            This is why financial advisors tell you to pay extra as early as you can. Even a few
            extra payments in the first year can save more than years of extra payments near the
            end of the loan.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            What about a lump sum instead?
          </h2>
          <p>
            Some borrowers prefer a one-time lump sum (a bonus, a tax refund, an inheritance)
            instead of monthly extra payments. The math is similar but the timing matters more. A
            one-time <strong className="text-brand-ink">$10,000</strong> principal payment made in
            year 1 of the same $320,000 loan at 6.5% cuts total interest by roughly{" "}
            <strong className="text-brand-ink">$38,000</strong> and shortens the term by about 3
            years. The same $10,000 paid in year 10 saves only about{" "}
            <strong className="text-brand-ink">$16,000</strong>. The earlier the money hits the
            principal, the more interest it saves over the remaining term.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Things to check before paying extra
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-brand-ink">Prepayment penalty:</strong> Most modern
              fixed-rate mortgages in the U.S. do not charge one, but check your note. Adjustable
              and some non-qualifying loans can.
            </li>
            <li>
              <strong className="text-brand-ink">Higher-interest debt:</strong> If you carry credit
              card debt at 18–24%, pay that off first — the mortgage at 6.5% is the cheaper debt to
              keep.
            </li>
            <li>
              <strong className="text-brand-ink">Emergency fund:</strong> Do not tie up your last
              dollar in home equity. Keep 3–6 months of expenses liquid before paying extra on the
              mortgage.
            </li>
            <li>
              <strong className="text-brand-ink">Employer 401(k) match:</strong> If your employer
              matches retirement contributions, that is often a better use of the same money — a
              50–100% instant return beats the 6.5% mortgage rate.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-brand-ink">
            How to model your own loan
          </h2>
          <p>
            You do not need to do this math by hand. Calnivo&apos;s{" "}
            <Link
              href="/calculators/mortgage"
              className="font-medium text-brand-accent-deep hover:underline"
            >
              Mortgage Calculator
            </Link>{" "}
            shows your monthly payment and total interest for any loan amount, rate and term. Enter
            your own numbers and compare the standard payment to a payment with extra principal —
            the difference is the interest you keep.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Important disclaimer</h2>
          <p>
            This article is for educational purposes only and does not constitute financial
            advice. Actual mortgage rates, terms and prepayment rules vary by lender and
            jurisdiction. The figures shown assume a fixed 6.5% rate with no prepayment penalty;
            your loan may differ. Always consult a qualified financial advisor before making
            decisions about your mortgage.
          </p>

          <div className="mt-8 rounded-xl border border-brand bg-gradient-to-br from-accent/30 to-white p-5">
            <p className="text-sm font-semibold text-brand-ink">See your own savings</p>
            <p className="mt-1 text-sm text-brand-muted">
              Enter your loan amount and rate in Calnivo&apos;s mortgage calculator to see how extra
              payments change your payoff date and total interest.
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
              name: "CFPB — Paying off your mortgage early",
              url: "https://www.consumerfinance.gov/ask-cfpb/what-happens-if-i-make-a-larger-payment-than-is-due-on-my-mortgage-en-200/",
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
