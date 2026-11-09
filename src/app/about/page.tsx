import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import {
  Calculator,
  Heart,
  Lock,
  Zap,
  Mail,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "About Calnivo — Founders Mohammed Khan & Hammad Khan",
  description:
    "Calnivo was founded by Mohammed Khan and Hammad Khan. Learn about our mission to build accurate, understandable and useful online calculators for finance, health, math and everyday use.",
  alternates: { canonical: "https://calnivocalc.com/about" },
  authors: [{ name: "Mohammed Khan" }],
  openGraph: {
    title: "About Calnivo — Founders Mohammed Khan & Hammad Khan",
    description:
      "Calnivo was founded by Mohammed Khan and Hammad Khan. Learn about our mission to build accurate, understandable and useful online calculators.",
    url: "https://calnivocalc.com/about",
    siteName: "Calnivo",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Calnivo — Founders Mohammed Khan & Hammad Khan",
    description:
      "Calnivo was founded by Mohammed Khan and Hammad Khan. Learn about our mission.",
  },
};

export default function AboutPage() {
  // Page-specific Organization JSON-LD — reinforces founder connection on /about
  const aboutOrgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://calnivocalc.com/#organization",
    name: "Calnivo",
    url: "https://calnivocalc.com/",
    logo: "https://calnivocalc.com/calnivo-logo.png",
    description:
      "Calnivo is an online calculator platform founded by Mohammed Khan and Hammad Khan.",
    founder: [
      {
        "@type": "Person",
        name: "Mohammed Khan",
        jobTitle: "Founder",
      },
      {
        "@type": "Person",
        name: "Hammad Khan",
        jobTitle: "Founder",
      },
    ],
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutOrgLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          About Calnivo
        </h1>

        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-brand-muted">
          {/* About Calnivo */}
          <section>
            <p>
              Calnivo is a free online calculator platform. Every calculator runs
              entirely in your browser, shows the formula it follows, and
              explains what the result means so you can check it against your
              own situation. We started in 2026 and we add and recheck tools
              over time. If you find a mistake,{" "}
              <Link
                href="/contact"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                tell us
              </Link>{" "}
              and we will correct it and note the change on our{" "}
              <Link
                href="/methodology"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                methodology and corrections page
              </Link>
              .
            </p>
          </section>

          {/* Our Story */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Our Story</h2>
            <p className="mt-2">
              Calnivo was founded by{" "}
              <strong className="text-brand-ink">Mohammed Khan</strong> and{" "}
              <strong className="text-brand-ink">Hammad Khan</strong>. We started
              the platform because most calculator sites return a number and stop
              there — they do not explain how the result is reached, what it
              leaves out, or when it can mislead. We wanted to build something
              that helps users understand a calculation, explore different
              scenarios, and decide with confidence.
            </p>
            <p className="mt-2">
              Every page states the formula it follows, the assumptions it
              makes, and the limits of the result. Calculations run
              client-side, so your inputs never leave your device. We are a
              small team and we recheck tools as tax tables, medical guidance
              and financial formulas change.
            </p>
          </section>

          {/* Meet the Founders */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">
              Meet the Founders
            </h2>
            <p className="mt-2">
              Calnivo has two founders. Each is responsible for a distinct part
              of the platform, and each calculator page and article is authored
              and reviewed by one named founder.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* Mohammed Khan */}
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-brand-accent-gradient text-white shadow-accent">
                  <span className="text-lg font-bold">MK</span>
                </div>
                <h3 className="text-lg font-semibold text-brand-ink">
                  Mohammed Khan
                </h3>
                <p className="text-sm font-medium text-brand-accent-deep">
                  Co-founder · Engineering &amp; content
                </p>
                <p className="mt-2 text-sm text-brand-muted">
                  Mohammed builds and maintains the calculators. He writes the
                  step-by-step explanations and worked examples you see on each
                  page, checks every formula against its primary source, and
                  runs the automated tests in our repository before a calculator
                  is published. He is the named author on the calculator pages.
                </p>
              </div>
              {/* Hammad Khan */}
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-brand-accent-gradient text-white shadow-accent">
                  <span className="text-lg font-bold">HK</span>
                </div>
                <h3 className="text-lg font-semibold text-brand-ink">
                  Hammad Khan
                </h3>
                <p className="text-sm font-medium text-brand-accent-deep">
                  Co-founder · Research &amp; editorial
                </p>
                <p className="mt-2 text-sm text-brand-muted">
                  Hammad directs the calculator roadmap and reviews the
                  long-form articles. He researches primary sources (IRS, CFPB,
                  CDC, ACOG, NIST, WHO), confirms the figures against
                  independent calculations, and edits every article for clarity
                  and accuracy before it is published. He is the named author
                  on the blog and legal pages.
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-brand-muted">
              We do not currently use an outside medical or financial reviewer.
              Pages are labelled “authored” and “reviewed” by the two founders
              rather than “medically reviewed” or “financially reviewed”,
              because we cannot claim a credential we do not hold. When a page
              needs a qualified outside reviewer, we name them with their real
              qualification — until then we avoid the claim.
            </p>
          </section>

          {/* Why We Built Calnivo */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">
              Why We Built Calnivo
            </h2>
            <p className="mt-2">
              We wanted to build a calculator platform that goes beyond simply
              returning a number. Calnivo is designed around a simple
              experience:{" "}
              <strong className="text-brand-ink">
                Calculate → Analyze → Compare → Simulate → Understand → Decide
              </strong>
              .
            </p>
          </section>

          {/* Our Approach */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Our Approach</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <Zap className="h-6 w-6 text-brand-accent-deep" />
                <h3 className="mt-2 font-semibold text-brand-ink">Accuracy</h3>
                <p className="mt-1 text-sm text-brand-muted">
                  We use standard formulas, state our assumptions on each page,
                  and correct mistakes openly. Every calculator is checked
                  against reference examples before release — see our{" "}
                  <Link
                    href="/methodology"
                    className="font-medium text-brand-accent-deep hover:underline"
                  >
                    methodology page
                  </Link>{" "}
                  for how.
                </p>
              </div>
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <Calculator className="h-6 w-6 text-brand-accent-deep" />
                <h3 className="mt-2 font-semibold text-brand-ink">Clarity</h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Present calculations and results in a way that is easy to
                  understand, with the formula, the assumptions and the limits
                  stated in plain language on every page.
                </p>
              </div>
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <Heart className="h-6 w-6 text-brand-accent-deep" />
                <h3 className="mt-2 font-semibold text-brand-ink">
                  Useful Analysis
                </h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Add breakdowns, charts, comparisons, scenarios and projections
                  when they genuinely help users — not for their own sake.
                </p>
              </div>
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <Lock className="h-6 w-6 text-brand-accent-deep" />
                <h3 className="mt-2 font-semibold text-brand-ink">
                  Simple Experience
                </h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Keep the interface focused and easy to use. All calculations
                  run in your browser; your inputs are never sent to a server.
                </p>
              </div>
            </div>
          </section>

          {/* Accountability */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">
              How we stay accountable
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <ShieldCheck className="h-6 w-6 text-brand-accent-deep" />
                <h3 className="mt-2 font-semibold text-brand-ink">
                  Methodology &amp; corrections
                </h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Our{" "}
                  <Link
                    href="/methodology"
                    className="font-medium text-brand-accent-deep hover:underline"
                  >
                    methodology page
                  </Link>{" "}
                  lists every calculator with its formula, source and last
                  review date, and keeps a dated corrections log of every change
                  we have made.
                </p>
              </div>
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <Mail className="h-6 w-6 text-brand-accent-deep" />
                <h3 className="mt-2 font-semibold text-brand-ink">
                  Report an error
                </h3>
                <p className="mt-1 text-sm text-brand-muted">
                  If a result looks wrong,{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-brand-accent-deep hover:underline"
                  >
                    email us
                  </Link>{" "}
                  at hello@calnivocalc.com. We investigate, fix and publish the
                  correction with a date.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Contact</h2>
            <p className="mt-2">
              Questions about Calnivo?{" "}
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
      </div>
    </Layout>
  );
}
