import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Calculator, Heart, Lock, Zap } from "lucide-react";

export const metadata = {
  title: "About — Free Online Calculators",
  description:
    "Calnivo is a free, no-sign-up calculator website with 40+ tools across finance, fitness, health, math and everyday utilities. All calculations run locally in your browser.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          About Calnivo
        </h1>
        <p className="mt-3 text-lg text-brand-muted">
          Fast, accurate, free online calculators — no registration, no ads in the way, no data
          collected.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
            <Zap className="h-6 w-6 text-brand-accent-deep" />
            <h3 className="mt-2 font-semibold text-brand-ink">40+ calculators</h3>
            <p className="mt-1 text-sm text-brand-muted">
              Finance, fitness, health, math, and everyday utilities — all free.
            </p>
          </div>
          <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
            <Lock className="h-6 w-6 text-brand-accent-deep" />
            <h3 className="mt-2 font-semibold text-brand-ink">Private by design</h3>
            <p className="mt-1 text-sm text-brand-muted">
              Every calculation runs in your browser. Your inputs never leave your device.
            </p>
          </div>
          <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
            <Calculator className="h-6 w-6 text-brand-accent-deep" />
            <h3 className="mt-2 font-semibold text-brand-ink">Accurate formulas</h3>
            <p className="mt-1 text-sm text-brand-muted">
              Each calculator is tested for accuracy with verified math formulas.
            </p>
          </div>
          <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
            <Heart className="h-6 w-6 text-brand-accent-deep" />
            <h3 className="mt-2 font-semibold text-brand-ink">No sign-up needed</h3>
            <p className="mt-1 text-sm text-brand-muted">
              Use every tool instantly. No accounts, no paywalls, no tracking.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Our mission</h2>
            <p className="mt-2">
              Calnivo&apos;s sole focus is to provide fast, comprehensive, convenient, free online
              calculators across finance, fitness, health, math, and everyday utilities. Our goal is
              to become the one-stop, go-to site for people who need to make quick calculations —
              without registration, without ads cluttering the tools, and without your financial
              data leaving your browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">How we&apos;re different</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong className="text-brand-ink">100% client-side:</strong> no backend, no
                database, no API calls. The math runs in your browser.
              </li>
              <li>
                <strong className="text-brand-ink">No accounts:</strong> every calculator works
                instantly, no sign-up wall.
              </li>
              <li>
                <strong className="text-brand-ink">Transparent formulas:</strong> each calculator
                page explains the formula, shows a worked example, and answers common questions.
              </li>
              <li>
                <strong className="text-brand-ink">Privacy-first:</strong> we don&apos;t collect
                your inputs. Read our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-brand-accent-deep hover:underline"
                >
                  privacy policy
                </Link>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Important disclaimer</h2>
            <p className="mt-2">
              Calculators are provided for informational purposes only and are not financial,
              medical, or legal advice. For real decisions, consult a qualified professional. See
              our{" "}
              <Link
                href="/terms"
                className="font-medium text-brand-accent-deep hover:underline"
              >
                terms of use
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Contact</h2>
            <p className="mt-2">
              Found a bug, have a calculator request, or want to partner?{" "}
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
