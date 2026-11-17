import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { ArticleTrustFooter } from "@/components/blog/ArticleTrustFooter";

export const metadata = {
  title: "How Due Dates Are Calculated: Naegele's Rule, Conception and IVF",
  description:
    "Your due date is not 9 months from conception — it is 280 days from your last menstrual period. Learn Naegele's rule, how cycle length shifts the date, and why ultrasound can change it.",
  alternates: { canonical: "/blog/how-due-dates-are-calculated" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Due Dates Are Calculated: Naegele's Rule, Conception and IVF",
  url: "https://calnivocalc.com/blog/how-due-dates-are-calculated",
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
          How Due Dates Are Calculated: Naegele&apos;s Rule, Conception and IVF
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          November 2026 · 7 min read · By Mohammed Khan
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <p>
            Your estimated due date (EDD) is not 9 months from conception — it is{" "}
            <strong className="text-brand-ink">280 days from the first day of your last menstrual
            period (LMP)</strong>. This is Naegele&apos;s rule, the standard dating method used by
            obstetricians worldwide. This article explains how it works, why the cycle length
            matters, and why your ultrasound can change the date.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Naegele&apos;s rule: the 280-day rule</h2>
          <p>
            The formula is simple: <strong className="text-brand-ink">EDD = LMP + 280 days</strong>{" "}
            (which is 40 weeks). For an LMP of January 1, 2026, the EDD is{" "}
            <strong className="text-brand-ink">October 8, 2026</strong>. The 280 days come from the
            average human pregnancy length — about 38 weeks from conception, plus the ~2 weeks
            between the LMP and ovulation. Conception itself happens around day 14 of the cycle,
            so conception = LMP + 14 days ={" "}
            <strong className="text-brand-ink">January 15, 2026</strong> in this example.
          </p>
          <p>
            The 280-day rule assumes a{" "}
            <strong className="text-brand-ink">28-day menstrual cycle with ovulation on day 14</strong>.
            Real cycles vary, so the date is an estimate — only about 5% of babies arrive on their
            exact due date.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            How cycle length shifts the due date
          </h2>
          <p>
            If your cycle is longer or shorter than 28 days, ovulation happens later or earlier than
            day 14. A common adjustment is:
          </p>
          <p className="rounded-lg bg-muted/50 px-4 py-3 font-mono text-sm text-brand-ink">
            EDD = LMP + 280 + (cycle length − 28)
          </p>
          <p>Examples:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong className="text-brand-ink">26-day cycle:</strong> ovulation is ~2 days
              earlier, so EDD = LMP + 278 days
            </li>
            <li>
              <strong className="text-brand-ink">28-day cycle:</strong> standard, EDD = LMP + 280
              days
            </li>
            <li>
              <strong className="text-brand-ink">32-day cycle:</strong> ovulation is ~4 days later,
              so EDD = LMP + 284 days
            </li>
            <li>
              <strong className="text-brand-ink">35-day cycle:</strong> ovulation is ~7 days later,
              so EDD = LMP + 287 days
            </li>
          </ul>
          <p>
            For irregular cycles (where you cannot predict ovulation from the LMP alone), the LMP
            date is unreliable and an ultrasound-based date is preferred.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Why ultrasound can change the date
          </h2>
          <p>
            An early first-trimester ultrasound (before 14 weeks) measures the baby&apos;s
            crown-rump length (CRL) and is the most accurate way to date a pregnancy — accurate to
            within about 5–7 days. If the ultrasound-based EDD differs from the LMP-based EDD by
            more than 5–7 days in the first trimester, most providers switch to the ultrasound date.
            Later ultrasounds (second and third trimester) are less accurate for dating because
            babies grow at different rates; a &ldquo;big&rdquo; baby on a 20-week ultrasound does
            not mean the due date should move earlier.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Conception date and IVF transfers
          </h2>
          <p>
            If you know the conception date exactly (from ovulation tracking or IVF), the EDD is
            calculated differently:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-brand-ink">Known conception date:</strong> EDD = conception
              date + 266 days (38 weeks from conception)
            </li>
            <li>
              <strong className="text-brand-ink">IVF Day-5 embryo transfer:</strong> EDD = transfer
              date + 261 days (because the embryo is already 5 days old when transferred)
            </li>
            <li>
              <strong className="text-brand-ink">IVF Day-3 embryo transfer:</strong> EDD = transfer
              date + 263 days
            </li>
          </ul>
          <p>
            IVF dates are the most accurate because the conception date is known to the day. For
            natural conception, the LMP is used because most people do not track ovulation exactly.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Trimesters and milestones
          </h2>
          <p>
            Pregnancy is divided into three trimesters, each about 13 weeks:
          </p>
          <div className="overflow-hidden rounded-xl border border-brand">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  <th className="px-4 py-3">Trimester</th>
                  <th className="px-4 py-3 text-right">Weeks</th>
                  <th className="px-4 py-3">Key milestones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-brand-ink">
                <tr>
                  <td className="px-4 py-3 font-medium">First</td>
                  <td className="px-4 py-3 text-right tabular-nums">1 – 13</td>
                  <td className="px-4 py-3">Heartbeat detectable (week 6), end of first trimester (week 13)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Second</td>
                  <td className="px-4 py-3 text-right tabular-nums">14 – 27</td>
                  <td className="px-4 py-3">Anatomy scan (week 20), viability (week 24)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Third</td>
                  <td className="px-4 py-3 text-right tabular-nums">28 – 40</td>
                  <td className="px-4 py-3">Early term (37), full term (39), overdue (41+)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-semibold text-brand-ink">
            How to calculate your own due date
          </h2>
          <p>
            Calnivo&apos;s{" "}
            <Link
              href="/calculators/pregnancy"
              className="font-medium text-brand-accent-deep hover:underline"
            >
              Pregnancy Calculator
            </Link>{" "}
            uses Naegele&apos;s rule with cycle-length adjustment. Enter your LMP and cycle length,
            and it shows your EDD, the estimated conception date, current gestational age, and a
            milestone timeline. For IVF dates, use the{" "}
            <Link
              href="/calculators/due-date"
              className="font-medium text-brand-accent-deep hover:underline"
            >
              Due Date Calculator
            </Link>{" "}
            which supports LMP and conception-based inputs.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Important disclaimer</h2>
          <p>
            This article is for educational purposes only and is not medical advice. Pregnancy
            dating should be confirmed by a healthcare provider using LMP and early ultrasound.
            Only about 5% of babies arrive on their exact due date; the full-term window is 37–42
            weeks. Always consult your obstetrician or midwife for pregnancy-related questions.
          </p>

          <div className="mt-8 rounded-xl border border-brand bg-gradient-to-br from-accent/30 to-white p-5">
            <p className="text-sm font-semibold text-brand-ink">Calculate your due date</p>
            <p className="mt-1 text-sm text-brand-muted">
              Enter your last menstrual period and cycle length in Calnivo&apos;s pregnancy
              calculator to see your estimated due date and milestone timeline.
            </p>
            <Link
              href="/calculators/pregnancy"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-[1.03]"
            >
              Open Pregnancy Calculator →
            </Link>
          </div>
        </div>

        <ArticleTrustFooter
          author="Mohammed Khan"
          reviewer="Hammad Khan"
          updatedDate="November 2026"
          sources={[
            {
              name: "ACOG — Methods for estimating the due date (Committee Opinion 700)",
              url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date",
            },
            {
              name: "ACOG — Length of pregnancy and due date",
              url: "https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy",
            },
            {
              name: "CDC — Pregnancy and reproductive health",
              url: "https://www.cdc.gov/pregnancy/index.html",
            },
          ]}
        />
      </article>
    </Layout>
  );
}
