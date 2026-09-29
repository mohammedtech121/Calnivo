import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Calculator, Heart, Lock, Zap } from "lucide-react";

export const metadata = {
  title: "About — Founders, Mission & Our Story",
  description:
    "Learn about Calnivo, founded by Hammad Khan and Mohammed Khan, and our mission to build accurate, understandable and useful online calculators.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          About Calnivo
        </h1>

        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-brand-muted">
          {/* About Calnivo */}
          <section>
            <p>
              Calnivo is an online calculator platform designed to make calculations easier to
              perform, understand and explore. Our calculators combine clear inputs, accurate
              calculation methods, useful explanations, visual results and practical analysis.
            </p>
          </section>

          {/* Our Story */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Our Story</h2>
            <p className="mt-2">
              Calnivo was founded by <strong className="text-brand-ink">Hammad Khan</strong> and{" "}
              <strong className="text-brand-ink">Mohammed Khan</strong>, who started the platform
              together with a shared goal of making online calculations more accurate,
              understandable and useful.
            </p>
            <p className="mt-2">
              We believe a calculator should do more than return a number. Where appropriate,
              Calnivo helps users understand how a result is calculated, explore different
              scenarios, compare outcomes, visualize results and understand the assumptions behind
              a calculation.
            </p>
            <p className="mt-2">
              Our platform is being developed across finance, health, mathematics and everyday
              calculations, with a focus on accuracy, clarity, useful analysis and a simple user
              experience.
            </p>
          </section>

          {/* Meet the Founders */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Meet the Founders</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* Mohammed Khan — left side */}
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-brand-accent-gradient text-white shadow-accent">
                  <span className="text-lg font-bold">MK</span>
                </div>
                <h3 className="text-lg font-semibold text-brand-ink">Mohammed Khan</h3>
                <p className="text-sm font-medium text-brand-accent-deep">Founder, Calnivo</p>
                <p className="mt-2 text-sm text-brand-muted">
                  Mohammed Khan is one of the founders of Calnivo and contributes to the development
                  of the platform.
                </p>
              </div>
              {/* Hammad Khan — right side */}
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-brand-accent-gradient text-white shadow-accent">
                  <span className="text-lg font-bold">HK</span>
                </div>
                <h3 className="text-lg font-semibold text-brand-ink">Hammad Khan</h3>
                <p className="text-sm font-medium text-brand-accent-deep">Founder, Calnivo</p>
                <p className="mt-2 text-sm text-brand-muted">
                  Hammad Khan is one of the founders of Calnivo and contributes to the research and
                  direction of the platform.
                </p>
              </div>
            </div>
          </section>

          {/* Why We Built Calnivo */}
          <section>
            <h2 className="text-xl font-semibold text-brand-ink">Why We Built Calnivo</h2>
            <p className="mt-2">
              We wanted to build a calculator platform that goes beyond simply returning a number.
              Calnivo is designed around a simple experience:{" "}
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
                  Use appropriate formulas, transparent assumptions and repeatable testing.
                </p>
              </div>
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <Calculator className="h-6 w-6 text-brand-accent-deep" />
                <h3 className="mt-2 font-semibold text-brand-ink">Clarity</h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Present calculations and results in a way that is easy to understand.
                </p>
              </div>
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <Heart className="h-6 w-6 text-brand-accent-deep" />
                <h3 className="mt-2 font-semibold text-brand-ink">Useful Analysis</h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Add breakdowns, charts, comparisons, scenarios and projections when they genuinely
                  help users.
                </p>
              </div>
              <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand">
                <Lock className="h-6 w-6 text-brand-accent-deep" />
                <h3 className="mt-2 font-semibold text-brand-ink">Simple Experience</h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Keep the interface focused and easy to use.
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
