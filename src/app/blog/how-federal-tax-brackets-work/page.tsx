import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { ArticleTrustFooter } from "@/components/blog/ArticleTrustFooter";

export const metadata = {
  title: "How Federal Tax Brackets Work in 2026 (With a Worked Example)",
  description:
    "The U.S. uses progressive tax brackets. Learn how marginal vs effective rates work on a $85,000 single filer in 2026, see the 2026 IRS brackets, and understand why a raise does not reduce your take-home.",
  alternates: { canonical: "/blog/how-federal-tax-brackets-work" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Federal Tax Brackets Work in 2026 (With a Worked Example)",
  url: "https://calnivocalc.com/blog/how-federal-tax-brackets-work",
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
          How Federal Tax Brackets Work in 2026 (With a Worked Example)
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          November 2026 · 8 min read · By Mohammed Khan
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <p>
            One of the most common tax misunderstandings is the idea that earning more money can
            &ldquo;push you into a higher bracket&rdquo; and leave you with less take-home pay. It
            cannot. The U.S. uses a{" "}
            <strong className="text-brand-ink">progressive bracket system</strong>, which means
            each portion of your income is taxed at the rate for the bracket it falls into — your
            whole income is never taxed at your top rate. This article walks through the 2026 IRS
            brackets with a worked example so you can see exactly how the math works.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            The 2026 federal tax brackets (single filer)
          </h2>
          <p>
            For the 2026 tax year (returns filed in early 2027), the IRS uses seven brackets for
            single filers, adjusted for inflation under Rev. Proc. 2025-32:
          </p>
          <div className="overflow-hidden rounded-xl border border-brand">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  <th className="px-4 py-3">Rate</th>
                  <th className="px-4 py-3">Taxable income range (single)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-brand-ink">
                <tr>
                  <td className="px-4 py-3 font-semibold">10%</td>
                  <td className="px-4 py-3 tabular-nums">$0 – $12,400</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">12%</td>
                  <td className="px-4 py-3 tabular-nums">$12,401 – $50,400</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">22%</td>
                  <td className="px-4 py-3 tabular-nums">$50,401 – $105,700</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">24%</td>
                  <td className="px-4 py-3 tabular-nums">$105,701 – $201,775</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">32%</td>
                  <td className="px-4 py-3 tabular-nums">$201,776 – $256,225</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">35%</td>
                  <td className="px-4 py-3 tabular-nums">$256,226 – $640,600</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">37%</td>
                  <td className="px-4 py-3 tabular-nums">$640,601+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-brand-muted">
            Brackets are wider for married filing jointly (roughly double) and fall between single
            and married for head of household. The 2026 standard deduction is $16,100 for single
            filers, $32,200 for married filing jointly, and $24,150 for head of household.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Worked example: $85,000 taxable income, single, 2026
          </h2>
          <p>
            Suppose you are a single filer with{" "}
            <strong className="text-brand-ink">$85,000 of taxable income</strong> for 2026. (This
            is your income <em>after</em> the standard deduction or itemized deductions, not your
            gross wages.) Here is how the tax is computed across the brackets:
          </p>
          <div className="overflow-hidden rounded-xl border border-brand">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  <th className="px-4 py-3">Bracket</th>
                  <th className="px-4 py-3 text-right">Income in bracket</th>
                  <th className="px-4 py-3 text-right">Tax for this bracket</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-brand-ink">
                <tr>
                  <td className="px-4 py-3">10% on $0 – $12,400</td>
                  <td className="px-4 py-3 text-right tabular-nums">$12,400</td>
                  <td className="px-4 py-3 text-right tabular-nums">$1,240.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">12% on $12,401 – $50,400</td>
                  <td className="px-4 py-3 text-right tabular-nums">$38,000</td>
                  <td className="px-4 py-3 text-right tabular-nums">$4,560.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">22% on $50,401 – $85,000</td>
                  <td className="px-4 py-3 text-right tabular-nums">$34,600</td>
                  <td className="px-4 py-3 text-right tabular-nums">$7,612.00</td>
                </tr>
                <tr className="bg-emerald-50 font-semibold">
                  <td className="px-4 py-3">Total federal tax owed</td>
                  <td className="px-4 py-3 text-right tabular-nums">$85,000</td>
                  <td className="px-4 py-3 text-right tabular-nums text-emerald-700">$13,412.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            So a single filer with $85,000 of taxable income in 2026 owes{" "}
            <strong className="text-brand-ink">$13,412</strong> in federal income tax. Their
            take-home (after federal tax) is{" "}
            <strong className="text-brand-ink">$71,588</strong>. This excludes FICA (Social
            Security and Medicare), state income tax, and any pre-tax deductions.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Marginal rate vs effective rate
          </h2>
          <p>
            Two rates describe this filer, and they are not the same number:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-brand-ink">Marginal rate</strong> is the rate on the{" "}
              <em>last dollar</em> earned — the bracket the top of your income falls into. For this
              filer it is <strong className="text-brand-ink">22%</strong>. A raise that keeps you
              under $105,700 is taxed at 22% on each additional dollar.
            </li>
            <li>
              <strong className="text-brand-ink">Effective rate</strong> is your{" "}
              <em>average</em> rate — total tax divided by taxable income. For this filer it is{" "}
              <strong className="text-brand-ink">15.8%</strong> ($13,412 ÷ $85,000). The effective
              rate is always lower than the marginal rate because the lower brackets are taxed
              less.
            </li>
          </ul>
          <p>
            This is the source of the persistent myth that a raise can &ldquo;cost you money.&rdquo;
            If this filer gets a $1,000 raise, that $1,000 is taxed at their marginal rate of 22%,
            so they pay $220 more in tax and keep $780. They never lose money by earning more —
            only the dollars above each bracket threshold are taxed at the higher rate.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            What this calculator does not include
          </h2>
          <p>
            The $13,412 figure is <strong className="text-brand-ink">federal income tax only</strong>.
            It does not include:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-brand-ink">FICA:</strong> Social Security (6.2% on wages up
              to the annual wage base, $176,100 in 2026) and Medicare (1.45% on all wages, plus
              0.9% Additional Medicare above $200,000 single). On $85,000 of wages this is about
              $6,502.
            </li>
            <li>
              <strong className="text-brand-ink">State and local income tax:</strong> ranges from
              0% (Texas, Florida, Washington and others) to over 13% (California top rate).
            </li>
            <li>
              <strong className="text-brand-ink">Tax credits:</strong> the Child Tax Credit, Earned
              Income Credit, education credits and foreign tax credit reduce your tax dollar for
              dollar.
            </li>
            <li>
              <strong className="text-brand-ink">Additional standard deduction:</strong> an extra
              $1,650 (single) or $2,050 (married) per spouse aged 65 or older or blind.
            </li>
          </ul>
          <p>
            For a true estimate of total tax liability, add FICA, your state rate, and subtract any
            credits. Calnivo&apos;s{" "}
            <Link
              href="/calculators/income-tax"
              className="font-medium text-brand-accent-deep hover:underline"
            >
              Income Tax Calculator
            </Link>{" "}
            computes the federal portion using the 2026 (and 2025) IRS brackets.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Standard deduction vs itemizing
          </h2>
          <p>
            Most taxpayers take the standard deduction rather than itemizing. In 2026 the standard
            deduction is <strong className="text-brand-ink">$16,100</strong> for single filers. So
            if your gross wages are $101,100 and you are single with no other adjustments, your
            taxable income is $101,100 − $16,100 = $85,000 — the example above. You only itemize if
            your deductible expenses (mortgage interest, state and local taxes up to $10,000,
            charitable contributions, medical expenses above 7.5% of AGI) exceed the standard
            deduction.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            How to compute your own federal tax
          </h2>
          <p>
            The simplest path is to use Calnivo&apos;s{" "}
            <Link
              href="/calculators/income-tax"
              className="font-medium text-brand-accent-deep hover:underline"
            >
              Income Tax Calculator
            </Link>
            . Enter your taxable income (after deductions), choose your filing status and tax year
            (2026 or 2025), and the calculator shows your federal tax owed, marginal rate,
            effective rate and take-home. It also renders the full bracket breakdown so you can see
            exactly how the tax is computed across each bracket.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Important disclaimer</h2>
          <p>
            This article is for educational purposes only and does not constitute tax advice. The
            2026 brackets come from IRS Rev. Proc. 2025-32; always confirm current figures at
            irs.gov before filing. State tax, FICA, credits, and individual circumstances
            significantly affect your actual tax liability. Consult a qualified tax professional
            for advice specific to your situation.
          </p>

          <div className="mt-8 rounded-xl border border-brand bg-gradient-to-br from-accent/30 to-white p-5">
            <p className="text-sm font-semibold text-brand-ink">Estimate your own federal tax</p>
            <p className="mt-1 text-sm text-brand-muted">
              Enter your taxable income in Calnivo&apos;s income tax calculator to see your federal
              tax, marginal rate and effective rate for 2026 or 2025.
            </p>
            <Link
              href="/calculators/income-tax"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-[1.03]"
            >
              Open Income Tax Calculator →
            </Link>
          </div>
        </div>

        <ArticleTrustFooter
          author="Mohammed Khan"
          reviewer="Hammad Khan"
          updatedDate="November 2026"
          sources={[
            {
              name: "IRS — Rev. Proc. 2025-32 (2026 inflation adjustments)",
              url: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
            },
            {
              name: "IRS — Federal income tax rates and brackets",
              url: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets",
            },
            {
              name: "IRS — 2026 Form 1040 instructions (standard deduction)",
              url: "https://www.irs.gov/forms-pubs/about-form-1040",
            },
          ]}
        />
      </article>
    </Layout>
  );
}
