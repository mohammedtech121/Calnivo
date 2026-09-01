import Link from "next/link";
import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import {
  CALCULATORS,
  CATEGORY_META,
  type CalculatorCategory,
} from "@/lib/calculators/registry";

export const metadata: Metadata = {
  title: "All Calculators — Browse 40+ Free Online Tools",
  description:
    "Browse all 40+ free online calculators on Calnivo. Finance, fitness, health, math, and everyday utilities — all 100% client-side, no sign-up required.",
  alternates: { canonical: "/calculators" },
};

const CATEGORY_ORDER: CalculatorCategory[] = ["financial", "health", "math", "other"];

export default function AllCalculatorsPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-1.5 text-sm text-brand-muted"
        >
          <Link href="/" className="hover:text-brand-ink">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-brand-ink">All Calculators</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          All {CALCULATORS.length} Calculators
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-muted">
          Browse every free online calculator on Calnivo. Filter by category, or jump straight to
          the tool you need. All calculators run 100% in your browser — no sign-up, no data
          collected.
        </p>

        {/* Category quick-jump */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORY_ORDER.map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            return (
              <a
                key={cat}
                href={`#category-${cat}`}
                className="inline-flex items-center gap-2 rounded-full border border-brand bg-white px-4 py-1.5 text-sm font-medium text-brand-ink transition-colors hover:border-brand-accent hover:bg-accent/40"
              >
                <Icon className="h-4 w-4 text-brand-accent-deep" />
                {meta.label.replace(" Calculators", "")}
              </a>
            );
          })}
        </div>

        {/* Category sections */}
        <div className="mt-10 space-y-12">
          {CATEGORY_ORDER.map((cat) => {
            const meta = CATEGORY_META[cat];
            const items = CALCULATORS.filter((c) => c.category === cat);
            const Icon = meta.icon;
            return (
              <section key={cat} id={`category-${cat}`} className="scroll-mt-20">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-accent-gradient text-white shadow-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-brand-ink">
                      {meta.label}
                    </h2>
                    <p className="text-sm text-brand-muted">{meta.blurb}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((c) => {
                    const CIcon = c.icon;
                    return (
                      <Link
                        key={c.id}
                        href={`/calculators/${c.id}`}
                        className="group flex flex-col gap-3 rounded-xl border border-brand bg-white p-5 shadow-brand transition-all hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-brand-lg"
                      >
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-brand-accent-deep">
                          <CIcon className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-semibold text-brand-ink group-hover:text-brand-accent-deep">
                            {c.name}
                          </h3>
                          <p className="mt-1 text-sm text-brand-muted line-clamp-2">
                            {c.description}
                          </p>
                        </div>
                        <span className="mt-auto text-xs font-medium text-brand-accent-deep">
                          Open calculator →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Trust footer */}
        <div className="mt-14 rounded-2xl border border-brand bg-gradient-to-br from-accent/40 to-white p-6 shadow-brand sm:p-8">
          <h2 className="text-lg font-bold text-brand-ink">Why Calnivo?</h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">
            Every calculator runs locally in your browser — no backend, no database, no tracking.
            Results are estimates for planning purposes. For financial or medical decisions,
            consult a qualified professional. Read our{" "}
            <Link
              href="/privacy"
              className="font-medium text-brand-accent-deep hover:underline"
            >
              privacy policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms"
              className="font-medium text-brand-accent-deep hover:underline"
            >
              terms
            </Link>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
}
