import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Calnivo's privacy policy. Calculator inputs run in your browser. We use Google Analytics 4 with consent. Read the full details here.",
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
          Last updated: October 2026
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          {/* Short version */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">The short version</h2>
            <p className="mt-2">
              <strong className="text-brand-ink">Calculator inputs and results stay in your
              browser.</strong> Calnivo does not transmit, store, or process the numbers you enter
              into any calculator. However, the website itself uses hosting services and, with your
              consent, Google Analytics to collect basic usage statistics. This policy explains
              exactly what is and isn&apos;t processed.
            </p>
          </section>

          {/* Calculator inputs */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Calculator inputs and results</h2>
            <p className="mt-2">
              All calculations (mortgage payments, BMI, compound interest, password generation,
              etc.) run entirely in your browser using JavaScript. The values you type into
              calculator fields are never sent to our servers, Google Analytics, or any third
              party. There is no database that stores your calculator inputs. You do not need to
              register or sign in to use any tool.
            </p>
            <p className="mt-2">
              We do NOT collect or transmit: your name, email, financial values you enter (loan
              amounts, income, etc.), health measurements, calculation history, generated
              passwords, or any personal information you type into a calculator.
            </p>
          </section>

          {/* Analytics — single accurate section */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">
              Google Analytics 4
            </h2>
            <p className="mt-2">
              Calnivo uses <strong className="text-brand-ink">Google Analytics 4</strong> (GA4,
              Measurement ID: G-L38QJ6QYWQ) to collect basic, aggregate usage statistics — such as
              which calculator pages are visited, approximate geographic region, and general device
              type. This helps us understand which tools are useful and improve the site.
            </p>
            <p className="mt-2">
              <strong className="text-brand-ink">GA4 does not load until you grant consent.</strong>{" "}
              When you first visit Calnivo, you will see a consent banner asking whether you accept
              analytics tracking. If you reject, no GA4 scripts load, no GA4 cookies are set, and
              no usage data is sent to Google. If you accept, GA4 may use cookies or similar
              technologies to track your session.
            </p>
            <p className="mt-2">
              Google Analytics processes usage and technical information that may include: pages
              visited, duration, approximate location (country/region), browser type, and referral
              source. This data is processed by Google under{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                rel="noopener noreferrer"
                target="_blank"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                Google&apos;s privacy policy
              </a>
              . We do not send calculator inputs, results, health data, financial values, or
              generated passwords to Google Analytics.
            </p>
            <p className="mt-2">
              You can change your analytics preference at any time by clicking{" "}
              &ldquo;Privacy settings&rdquo; in the footer. You can also use the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                rel="noopener noreferrer"
                target="_blank"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>{" "}
              or configure your browser to block third-party cookies.
            </p>
          </section>

          {/* Hosting */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Hosting</h2>
            <p className="mt-2">
              The website is hosted on Netlify. Netlify&apos;s servers may log standard request
              metadata (IP address, browser type, timestamp) for security and uptime purposes, as
              described in{" "}
              <a
                href="https://www.netlify.com/privacy-policy/"
                rel="noopener noreferrer"
                target="_blank"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                Netlify&apos;s privacy policy
              </a>
              . We do not control or have access to those logs. Retention of hosting logs is
              governed by Netlify&apos;s configuration and documentation.
            </p>
          </section>

          {/* Email contact */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Contacting Calnivo</h2>
            <p className="mt-2">
              If you email us at{" "}
              <a
                href="mailto:hello@calnivocalc.com"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                hello@calnivocalc.com
              </a>
              , the contents of your message and your email address are necessarily transmitted to
              our email provider. We do not share your email with third parties for marketing.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Children</h2>
            <p className="mt-2">
              Calnivo is intended for general use by adults. We do not knowingly collect personal
              information from children. If you believe a child has provided personal information
              to us, please contact us and we will take appropriate action.
            </p>
          </section>

          {/* Privacy requests */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Your privacy rights</h2>
            <p className="mt-2">
              Depending on your location (e.g., EEA, UK, California), you may have rights to
              access, correct, or request deletion of personal data. Since Calnivo does not maintain
              a user database and calculator inputs are not transmitted, most personal data we may
              process is limited to analytics and hosting metadata. To make a privacy request,
              contact us at{" "}
              <a
                href="mailto:hello@calnivocalc.com"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                hello@calnivocalc.com
              </a>{" "}
              or via our{" "}
              <Link
                href="/contact"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                contact page
              </Link>
              . Your rights depend on applicable law.
            </p>
          </section>

          {/* Retention */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Data retention</h2>
            <p className="mt-2">
              Calculator inputs are not retained at all — they exist only in your browser session.
              Google Analytics data retention depends on the GA4 property configuration (you can
              review Google&apos;s documentation for default retention periods). Hosting logs are
              managed by Netlify according to their policies. We do not maintain a separate database
              of user data.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Changes to this policy</h2>
            <p className="mt-2">
              If we change this privacy policy, we will update the &ldquo;Last updated&rdquo; date
              at the top of this page and review whether material changes require a new consent
              prompt.
            </p>
          </section>

          {/* Contact */}
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
