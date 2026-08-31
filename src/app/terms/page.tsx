import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export const metadata = {
  title: "Terms of Use",
  description:
    "Calnivo's terms of use. Calculators are provided for informational purposes only and are not financial, medical, or legal advice.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-brand-muted">Last updated: August 2026</p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Acceptance of terms</h2>
            <p className="mt-2">
              By using Calnivo (the &ldquo;Site&rdquo;), you agree to these Terms of Use. If you
              do not agree, please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">
              No financial, medical, or legal advice
            </h2>
            <p className="mt-2">
              All calculators on Calnivo are provided for general informational and educational
              purposes only. They produce estimates based on the inputs you provide and standard
              mathematical formulas. <strong className="text-brand-ink">Results are not
              financial advice, medical advice, legal advice, or a guarantee of any outcome.</strong>
            </p>
            <p className="mt-2">
              For financial decisions (mortgages, loans, investments, taxes), consult a qualified
              financial advisor, lender, or tax professional. For health decisions (BMI, body fat,
              calorie needs), consult a licensed healthcare provider. Actual loan terms, interest
              rates, tax brackets, and medical metrics depend on your specific circumstances and
              jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Accuracy of calculations</h2>
            <p className="mt-2">
              We test each calculator for accuracy and review the formulas regularly. However, we
              make no warranty that calculations are error-free, complete, or applicable to your
              situation. Always verify important results independently before relying on them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">No warranty</h2>
            <p className="mt-2">
              The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
              warranties of any kind, either express or implied, including but not limited to
              implied warranties of merchantability, fitness for a particular purpose, or
              non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Limitation of liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by law, Calnivo and its operators shall not be liable
              for any direct, indirect, incidental, consequential, or special damages arising from
              your use of, or reliance on, any calculator or content on this Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">External links</h2>
            <p className="mt-2">
              The Site may contain links to third-party websites. We are not responsible for the
              content, privacy practices, or accuracy of any third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Changes to these terms</h2>
            <p className="mt-2">
              We may update these Terms of Use from time to time. Continued use of the Site after
              changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Contact</h2>
            <p className="mt-2">
              Questions about these terms?{" "}
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
