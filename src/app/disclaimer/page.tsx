import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export const metadata = {
  title: "Disclaimer — Financial, Health & General Use",
  description:
    "Calnivo's disclaimer: calculator results are estimates for informational purposes only. Not financial, medical, or legal advice. Verify critical values independently.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Disclaimer
        </h1>
        <p className="mt-2 text-sm text-brand-muted">Last updated: October 2026</p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          {/* General */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">General</h2>
            <p className="mt-2">
              All calculators on Calnivo are provided for general informational and educational
              purposes only. Results are <strong className="text-brand-ink">estimates</strong>{" "}
              based on the inputs you provide and standard mathematical formulas. They are not a
              guarantee of any outcome and should not be relied upon as the sole basis for
              decisions.
            </p>
          </section>

          {/* Financial */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">
              Financial calculators
            </h2>
            <p className="mt-2">
              Mortgage, loan, investment, retirement, tax, and other financial calculators produce
              estimates that depend on interest rates, loan terms, tax brackets, and assumptions
              that vary by lender, jurisdiction, and date. Tax calculators use IRS 2024 federal
              brackets (taxes filed in 2025) for the United States and do not include state taxes,
              most deductions, or credits.
            </p>
            <p className="mt-2">
              <strong className="text-brand-ink">
                These results are not financial, lending, investment, insurance, or tax advice.
              </strong>{" "}
              Actual loan terms, APRs, investment returns, and tax liabilities depend on your
              specific circumstances, credit profile, lender, jurisdiction, and market conditions.
              Consult a qualified financial advisor, lender, or tax professional before making
              financial decisions.
            </p>
          </section>

          {/* Health */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Health calculators</h2>
            <p className="mt-2">
              BMI, calorie, body fat, BMR, ideal weight, pace, pregnancy, and due date
              calculators produce educational estimates using standard formulas (such as
              Mifflin-St Jeor, U.S. Navy body fat, Naegele&apos;s rule). These tools apply to
              adults aged 20 and over (unless otherwise stated) and use general reference ranges.
            </p>
            <p className="mt-2">
              <strong className="text-brand-ink">
                These results are not a medical diagnosis, health assessment, or medical advice.
              </strong>{" "}
              Body composition, calorie needs, and pregnancy dates vary significantly between
              individuals. Do not use these tools as a substitute for a licensed healthcare
              provider, especially for pregnancy, symptoms, minors, or treatment decisions.
            </p>
          </section>

          {/* Math + utilities */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">
              Mathematical and utility calculators
            </h2>
            <p className="mt-2">
              Results from scientific, fraction, percentage, triangle, standard deviation, age,
              date, time, hours, GPA, grade, concrete, subnet, password generator, and conversion
              calculators depend on input validity, assumptions, units, time zone handling, and
              rounding conventions.
            </p>
            <p className="mt-2">
              <strong className="text-brand-ink">
                Verify critical engineering, construction, network, and safety-related values
                independently.
              </strong>{" "}
              Do not rely on this site for construction specifications, network configurations, or
              any application where calculation errors could cause harm or loss.
            </p>
          </section>

          {/* No guarantee */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">No guarantee of accuracy</h2>
            <p className="mt-2">
              While we test calculators for accuracy, we make no warranty that calculations are
              error-free, complete, or applicable to your situation. Always review input units,
              assumptions, and edge cases. If you find a calculation error, please{" "}
              <Link
                href="/contact"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                contact us
              </Link>
              .
            </p>
          </section>

          {/* Third-party */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Third-party links</h2>
            <p className="mt-2">
              Calnivo may link to third-party websites (such as Google, Netlify, or reference
              sources). We are not responsible for the content, privacy practices, or accuracy of
              any third-party sites.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Contact</h2>
            <p className="mt-2">
              Questions about this disclaimer?{" "}
              <Link
                href="/contact"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                Get in touch
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </Layout>
  );
}
