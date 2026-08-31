import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Calnivo's privacy policy. All calculators run 100% client-side. We collect no personal data, no financial inputs, and require no registration.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          Last updated: August 2026
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">The short version</h2>
            <p className="mt-2">
              Calnivo is a free calculator website. <strong className="text-brand-ink">All
              calculations run entirely in your browser.</strong> We do not collect, store, or
              transmit the numbers you enter into any calculator. We have no user accounts, no
              database, and no backend. You don&apos;t need to register or sign in to use any tool.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">What we don&apos;t collect</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Your name, email, or any personal information</li>
              <li>The financial values you enter into calculators (loan amounts, income, etc.)</li>
              <li>Your calculation history or results</li>
              <li>Cookies for tracking or advertising</li>
              <li>Account credentials (there are no accounts)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">What is processed locally</h2>
            <p className="mt-2">
              Every calculation (mortgage payments, BMI, compound interest, etc.) is computed by
              JavaScript running in your own browser. The values you type never leave your device.
              There is no server that receives your inputs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Analytics</h2>
            <p className="mt-2">
              Calnivo currently does not use Google Analytics, Facebook Pixel, or any third-party
              analytics or advertising scripts. If we add analytics in the future, this policy will
              be updated and we will use privacy-respecting, aggregate-only metrics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Hosting</h2>
            <p className="mt-2">
              The website is hosted on Netlify. Netlify&apos;s servers may log standard request
              metadata (IP address, browser type, timestamp) for security and uptime purposes, as
              described in their{" "}
              <a
                href="https://www.netlify.com/privacy-policy/"
                rel="noopener noreferrer"
                target="_blank"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                privacy policy
              </a>
              . We do not control or have access to those logs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Children&apos;s privacy</h2>
            <p className="mt-2">
              Calnivo is safe for users of all ages. We do not knowingly collect any information
              from children or anyone else.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Changes to this policy</h2>
            <p className="mt-2">
              If we change this privacy policy, we will update the &ldquo;Last updated&rdquo; date
              at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Contact</h2>
            <p className="mt-2">
              Questions about this policy?{" "}
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
