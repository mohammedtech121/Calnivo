"use client";

import { useState } from "react";
import { Search, X, ChevronRight } from "lucide-react";
import { useCalcNav } from "@/store/calculator-nav";
import { searchCalculators, type CalculatorMeta } from "@/lib/calculators/registry";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [focused, setFocused] = useState(false);
  const { query, setQuery, go, setHome } = useCalcNav();

  const results: CalculatorMeta[] = focused && query ? searchCalculators(query).slice(0, 8) : [];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand bg-brand-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Logo onClick={setHome} />

        {/* Search */}
        <div className="relative ml-auto flex-1 max-w-md">
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl border bg-white px-3 py-2 transition-all",
              focused
                ? "border-brand-accent ring-2 ring-brand-accent/20"
                : "border-brand hover:border-brand-muted/40",
            )}
          >
            <Search className="h-4 w-4 shrink-0 text-brand-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Search 40+ calculators…"
              className="w-full bg-transparent text-sm text-brand-ink placeholder:text-brand-muted/70 outline-none"
            />
            {query && (
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setQuery("")}
                className="text-brand-muted hover:text-brand-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results dropdown */}
          {results.length > 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-brand bg-white shadow-brand-lg">
              <ul className="max-h-80 overflow-y-auto scroll-thin py-1.5">
                {results.map((r) => {
                  const Icon = r.icon;
                  return (
                    <li key={r.id}>
                      <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => go(r.id)}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-accent/60"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/70 text-brand-accent-deep">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-brand-ink">
                            {r.name}
                          </span>
                          <span className="block truncate text-xs text-brand-muted">
                            {r.short}
                          </span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-brand-muted/60" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {focused && query && results.length === 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-xl border border-brand bg-white px-4 py-3 text-sm text-brand-muted shadow-brand-lg">
              No calculators match &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Sign in */}
        <button className="hidden shrink-0 items-center gap-2 rounded-xl bg-brand-accent-gradient px-4 py-2 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-[1.03] sm:flex">
          Sign in
        </button>
        <button
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-accent-gradient text-white shadow-accent sm:hidden"
          aria-label="Sign in"
        >
          <span className="text-xs font-bold">SI</span>
        </button>
      </div>
    </header>
  );
}
