import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export const metadata = {
  title: "Compound Interest Explained: How Your Money Grows Over Time",
  description:
    "Compound interest is the most powerful force in finance. Learn how it works, how to calculate it, and how small contributions can grow into significant wealth.",
  alternates: { canonical: "/blog/compound-interest-explained" },
};

export default function Article() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <Link href="/blog" className="text-sm text-brand-accent-deep hover:underline">← Back to blog</Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Compound Interest Explained: How Your Money Grows Over Time
        </h1>
        <p className="mt-2 text-sm text-brand-muted">October 2026 · 9 min read</p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <p>
            Albert Einstein is often credited with calling compound interest the eighth wonder of the
            world. Whether or not he actually said it, the principle is sound: compound interest is
            one of the most powerful forces in finance. It is the reason why starting to save early —
            even with small amounts — can lead to significant wealth over time. In this guide, we
            explain how compound interest works, how to calculate it, and how to use Calnivo&apos;s{" "}
            <Link href="/calculators/compound-interest" className="font-medium text-brand-accent-deep hover:underline">
            Compound Interest Calculator</Link> to project your savings growth.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">What Is Compound Interest?</h2>
          <p>
            Compound interest is interest earned on both your original investment (the principal)
            and on the interest that has already accumulated. In other words, it is interest on
            interest. This creates a snowball effect where your money grows at an accelerating rate
            over time.
          </p>
          <p>
            Simple interest, by contrast, is calculated only on the original principal. If you invest
            $1,000 at 5% simple interest for 10 years, you earn $50 per year (5% of $1,000) for a
            total of $500 in interest. With compound interest, each year&apos;s interest is added to
            the principal, so the next year&apos;s interest is calculated on a larger amount.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">The Compound Interest Formula</h2>
          <p>
            The standard formula for compound interest with a single initial investment is:
          </p>
          <p className="rounded-lg bg-muted/50 px-4 py-3 font-mono text-sm text-brand-ink">
            FV = P × (1 + r/m)^(m×t)
          </p>
          <p>Where:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li><strong className="text-brand-ink">FV</strong> = Future value (the final amount)</li>
            <li><strong className="text-brand-ink">P</strong> = Principal (initial investment)</li>
            <li><strong className="text-brand-ink">r</strong> = Annual interest rate (as a decimal, e.g., 5% = 0.05)</li>
            <li><strong className="text-brand-ink">m</strong> = Number of times interest is compounded per year</li>
            <li><strong className="text-brand-ink">t</strong> = Number of years</li>
          </ul>

          <h2 className="text-xl font-semibold text-brand-ink">Example: $1,000 at 5% for 10 Years</h2>
          <p>
            Let us compare simple interest vs compound interest (compounded annually) on a $1,000
            investment at 5% annual interest for 10 years:
          </p>
          <p>
            <strong className="text-brand-ink">Simple interest:</strong> $1,000 + ($1,000 × 0.05 × 10) = $1,500.
            You earn $500 in interest.
          </p>
          <p>
            <strong className="text-brand-ink">Compound interest (annual):</strong> $1,000 × (1.05)^10 = $1,628.89.
            You earn $628.89 in interest — that is $128.89 more than simple interest, just from
            compounding.
          </p>
          <p>
            If the interest is compounded monthly instead of annually, the result is even higher:
            $1,000 × (1 + 0.05/12)^(12×10) = $1,647.01. You earn $647.01 in interest.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">The Power of Regular Contributions</h2>
          <p>
            The real magic of compound interest happens when you add regular contributions. Suppose
            you start with $1,000 and contribute $200 per month at 7% annual return (compounded
            monthly) for 30 years. Here is what happens:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Total contributions: $1,000 + ($200 × 12 × 30) = $73,000</li>
            <li>Final balance: approximately $244,000</li>
            <li>Total interest earned: approximately $171,000</li>
          </ul>
          <p>
            Your money more than triples, and most of the final balance comes from compound
            interest — not your contributions. This is why starting early matters so much. Someone
            who starts investing at age 25 will accumulate significantly more wealth than someone who
            starts at age 35, even if they invest the same amount per month.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Compounding Frequency Matters</h2>
          <p>
            The frequency of compounding affects how much interest you earn. The more frequently
            interest is compounded, the faster your money grows:
          </p>
          <div className="overflow-hidden rounded-lg border border-brand">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="bg-muted/50 px-3 py-2 text-left font-semibold text-brand-ink">Compounding</th>
                  <th className="bg-muted/50 px-3 py-2 text-right font-semibold text-brand-ink">FV of $10,000 at 5% for 10 years</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-brand"><td className="px-3 py-2">Annually</td><td className="px-3 py-2 text-right tabular-nums">$16,288.95</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">Semi-annually</td><td className="px-3 py-2 text-right tabular-nums">$16,386.16</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">Quarterly</td><td className="px-3 py-2 text-right tabular-nums">$16,436.19</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">Monthly</td><td className="px-3 py-2 text-right tabular-nums">$16,470.09</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">Daily</td><td className="px-3 py-2 text-right tabular-nums">$16,486.65</td></tr>
                <tr className="border-t border-brand"><td className="px-3 py-2">Continuous</td><td className="px-3 py-2 text-right tabular-nums">$16,487.21</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-semibold text-brand-ink">How to Use the Compound Interest Calculator</h2>
          <p>
            Calnivo&apos;s free{" "}
            <Link href="/calculators/compound-interest" className="font-medium text-brand-accent-deep hover:underline">
            Compound Interest Calculator</Link> does all this math for you. Enter your principal,
            annual interest rate, compounding frequency, number of years, and optional monthly
            contributions. The calculator shows your final balance, total interest earned, and a
            visual chart of how your money grows year by year. You can also choose
            beginning-of-period or end-of-period contribution timing for more precise projections.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Important Disclaimer</h2>
          <p>
            Investment returns are not guaranteed. The examples in this article use assumed rates of
            return for educational purposes only. Actual investment performance varies based on
            market conditions, fees, taxes, and other factors. Past performance does not guarantee
            future results. Consult a qualified financial advisor before making investment decisions.
          </p>

          <div className="mt-8 rounded-xl border border-brand bg-gradient-to-br from-accent/30 to-white p-5">
            <p className="text-sm font-semibold text-brand-ink">Ready to see your money grow?</p>
            <p className="mt-1 text-sm text-brand-muted">
              Use Calnivo&apos;s free compound interest calculator to project your savings.
            </p>
            <Link
              href="/calculators/compound-interest"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-[1.03]"
            >
              Open Compound Interest Calculator →
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}
