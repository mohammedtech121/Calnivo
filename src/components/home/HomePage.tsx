"use client";

import { Search } from "lucide-react";
import { useCalcNav } from "@/store/calculator-nav";
import {
  CALCULATORS,
  CATEGORY_META,
  calculatorsByCategory,
  searchCalculators,
  type CalculatorCategory,
} from "@/lib/calculators/registry";
import { ScientificCalculator } from "./ScientificCalculator";
import { cn } from "@/lib/utils";

const CATEGORY_ORDER: CalculatorCategory[] = ["financial", "health", "math", "other"];

export function HomePage() {
  const { query, setQuery, go } = useCalcNav();
  const filtered = query.trim() ? searchCalculators(query) : null;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
      {/* Hero / scientific calculator */}
      <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand bg-white px-3 py-1 text-xs font-medium text-brand-muted shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            {CALCULATORS.length}+ free calculators · no sign-up
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl">
            Free Online <span className="text-brand-accent-gradient">Calculators</span>
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-muted">
            Fast, comprehensive, convenient calculators across finance, fitness, health, math and
            everyday utilities — built to help you make quick, confident decisions.
          </p>

          <div className="mt-6 max-w-xl">
            <SearchBar />
          </div>

          {/* Scientific calculator */}
          <div className="mt-8 max-w-xl">
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
                Scientific Calculator
              </h2>
            </div>
            <ScientificCalculator />
          </div>
        </div>

        {/* Side stats / trust panel */}
        <aside className="hidden lg:block">
          <div className="rounded-2xl border border-brand bg-white p-6 shadow-brand">
            <h3 className="text-lg font-semibold text-brand-ink">Why Calnivo?</h3>
            <ul className="mt-4 space-y-4 text-sm">
              {[
                ["100% Free", "Every tool, every time. No registration required."],
                ["Trusted logic", "Each calculator is tested for accuracy."],
                ["Privacy first", "All math happens in your browser."],
                ["40+ tools", "Finance, health, math & everyday utilities."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-accent-gradient" />
                  <span>
                    <span className="font-semibold text-brand-ink">{t}</span>
                    <span className="block text-brand-muted">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-brand pt-5 text-center">
              <Stat n={`${CALCULATORS.length}+`} l="Calculators" />
              <Stat n="4" l="Categories" />
              <Stat n="$0" l="Always free" />
            </div>
          </div>
        </aside>
      </section>

      {/* Search results OR category grid */}
      {filtered ? (
        <section className="mt-12">
          <h2 className="mb-1 text-xl font-semibold text-brand-ink">
            Search results for &ldquo;{query}&rdquo;
          </h2>
          <p className="mb-5 text-sm text-brand-muted">
            {filtered.length} calculator{filtered.length === 1 ? "" : "s"} found
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-brand bg-white p-10 text-center text-brand-muted">
              No calculators match your search. Try another term.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <CalcCard key={c.id} id={c.id} name={c.name} desc={c.description} icon={c.icon} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="mt-14">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
              Browse by category
            </h2>
            <p className="mt-2 text-brand-muted">
              Pick a category and jump straight into the calculator you need.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {CATEGORY_ORDER.map((cat) => (
              <CategoryColumn key={cat} cat={cat} onGo={go} />
            ))}
          </div>
        </section>
      )}

      {/* Mission statement */}
      <section className="mt-16">
        <div className="rounded-2xl border border-brand bg-white p-8 shadow-brand">
          <h2 className="text-xl font-bold text-brand-ink sm:text-2xl">
            One-stop, go-to site for quick calculations
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-muted">
            Calnivo&apos;s sole focus is to provide fast, comprehensive, convenient, free online
            calculators in a plethora of areas. Currently, we have around {CALCULATORS.length}{" "}
            calculators to help you &ldquo;do the math&rdquo; quickly in areas such as finance,
            fitness, health, math, and others, and we are still developing more. Our goal is to
            become the one-stop, go-to site for people who need to make quick calculations.
            Additionally, we believe the internet should be a source of free information — all of
            our tools and services are completely free, with no registration required.
          </p>
        </div>
      </section>
    </div>
  );
}

function SearchBar() {
  const { query, setQuery } = useCalcNav();
  return (
    <div className="flex items-center gap-2 rounded-xl border border-brand bg-white px-4 py-3 shadow-brand transition-all focus-within:border-brand-accent focus-within:ring-2 focus-within:ring-brand-accent/20">
      <Search className="h-5 w-5 shrink-0 text-brand-muted" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search calculators — e.g. mortgage, BMI, percentage…"
        className="w-full bg-transparent text-sm text-brand-ink placeholder:text-brand-muted/70 outline-none"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="text-xs font-medium text-brand-accent-deep hover:underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-xl font-bold text-brand-ink">{n}</div>
      <div className="text-xs text-brand-muted">{l}</div>
    </div>
  );
}

function CategoryColumn({
  cat,
  onGo,
}: {
  cat: CalculatorCategory;
  onGo: (id: string) => void;
}) {
  const meta = CATEGORY_META[cat];
  const items = calculatorsByCategory(cat);
  const Icon = meta.icon;
  return (
    <div className="rounded-2xl border border-brand bg-white p-5 shadow-brand transition-shadow hover:shadow-brand-lg">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-brand-accent-deep">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-base font-semibold leading-tight text-brand-ink">{meta.label}</h3>
          <p className="text-xs text-brand-muted">{meta.blurb}</p>
        </div>
      </div>
      <ul className="mt-4 space-y-0.5">
        {items.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => onGo(c.id)}
              className="group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm text-brand-ink transition-colors hover:bg-accent/60"
            >
              <span className="font-medium group-hover:text-brand-accent-deep">{c.short}</span>
              <span className="text-brand-muted/0 transition-colors group-hover:text-brand-accent-deep">
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CalcCard({
  id,
  name,
  desc,
  icon: Icon,
}: {
  id: string;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const go = useCalcNav((s) => s.go);
  return (
    <button
      onClick={() => go(id)}
      className={cn(
        "group flex flex-col gap-3 rounded-xl border border-brand bg-white p-5 text-left shadow-brand transition-all hover:-translate-y-0.5 hover:shadow-brand-lg",
      )}
    >
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-brand-accent-deep">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="font-semibold text-brand-ink group-hover:text-brand-accent-deep">{name}</h3>
        <p className="mt-1 text-sm text-brand-muted line-clamp-2">{desc}</p>
      </div>
    </button>
  );
}
