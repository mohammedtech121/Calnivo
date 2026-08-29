"use client";

import { ChevronRight, Home as HomeIcon, ArrowLeft, Search } from "lucide-react";
import { useCalcNav } from "@/store/calculator-nav";
import {
  CALCULATOR_MAP,
  calculatorsByCategory,
  type CalculatorCategory,
} from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function CalculatorShell({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const meta = CALCULATOR_MAP[id];
  const { setHome, go } = useCalcNav();
  const [query, setQuery] = useState("");
  if (!meta) return null;
  const Icon = meta.icon;
  const related = calculatorsByCategory(meta.category as CalculatorCategory)
    .filter((c) => c.id !== id)
    .slice(0, 7);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-1.5 text-sm text-brand-muted">
        <button
          onClick={setHome}
          className="flex items-center gap-1 rounded hover:text-brand-ink"
        >
          <HomeIcon className="h-3.5 w-3.5" />
          Home
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="capitalize">{meta.category}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-brand-ink">{meta.name}</span>
      </nav>

      <button
        onClick={setHome}
        className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-brand bg-white px-3 py-1.5 text-sm font-medium text-brand-ink shadow-sm transition-colors hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        All calculators
      </button>

      {/* Title */}
      <div className="mb-6 flex items-start gap-4">
        <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-accent-gradient text-white shadow-accent sm:grid">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
            {meta.name}
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-brand-muted">
            {meta.description}
          </p>
        </div>
      </div>

      {/* Body: calculator + sidebar */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">{children}</div>

        <aside className="space-y-4">
          {/* Search */}
          <div className="rounded-xl border border-brand bg-white p-3 shadow-brand">
            <div className="flex items-center gap-2 rounded-lg border border-brand bg-brand-canvas px-3 py-2">
              <Search className="h-4 w-4 text-brand-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* Related */}
          <div className="rounded-xl border border-brand bg-white p-4 shadow-brand">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">
              More {meta.category} calculators
            </h3>
            <ul className="space-y-1">
              {related.map((c) => {
                const CIcon = c.icon;
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => go(c.id)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm text-brand-ink transition-colors hover:bg-accent/60"
                    >
                      <CIcon className="h-4 w-4 shrink-0 text-brand-muted" />
                      <span className="font-medium">{c.short}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-xl border border-brand bg-gradient-to-br from-accent to-white p-4 shadow-brand">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-accent-deep">
              How this works
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-brand-muted">
              All calculations run locally in your browser — nothing is sent to a server. Results
              are estimates for planning purposes only and use standard formulas.
            </p>
            {meta.category === "financial" && (
              <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                Not financial advice. Actual loan terms, tax, and returns depend on your lender,
                jurisdiction, and market conditions. Verify with a qualified professional before
                making financial decisions.
              </p>
            )}
            {meta.category === "health" && (
              <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                For general wellness information only — not a medical diagnosis. Consult a
                healthcare professional for personal advice.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- Reusable building blocks for calculator authors ---------- */

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-brand-ink">
        {label}
        {hint && (
          <span className="text-xs font-normal text-brand-muted" title={hint}>
            ⓘ
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={cn(
        "w-full rounded-lg border border-brand bg-white px-3 py-2 text-sm text-brand-ink outline-none transition-all placeholder:text-brand-muted/60 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20",
        className,
      )}
    />
  );
}

export function SelectInput(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  const { className, children, ...rest } = props;
  return (
    <select
      {...rest}
      className={cn(
        "w-full rounded-lg border border-brand bg-white px-3 py-2 text-sm text-brand-ink outline-none transition-all focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20",
        className,
      )}
    >
      {children}
    </select>
  );
}

export function CalcButton({
  children,
  onClick,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.98]",
        variant === "primary"
          ? "bg-brand-accent-gradient text-white shadow-accent hover:brightness-105"
          : "border border-brand bg-white text-brand-ink hover:bg-accent/50",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function ResultCard({
  label,
  value,
  sub,
  highlight = true,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        highlight
          ? "border-transparent bg-brand-accent-gradient text-white shadow-accent"
          : "border-brand bg-white",
      )}
    >
      <div className={cn("text-xs font-medium", highlight ? "text-white/80" : "text-brand-muted")}>
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
      {sub && (
        <div className={cn("mt-0.5 text-xs", highlight ? "text-white/70" : "text-brand-muted")}>
          {sub}
        </div>
      )}
    </div>
  );
}

export function CalcCard({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-brand bg-white p-5 shadow-brand sm:p-6", className)}>
      {title && (
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-muted">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
