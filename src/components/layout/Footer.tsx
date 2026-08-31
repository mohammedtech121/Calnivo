"use client";

import { useCalcNav } from "@/store/calculator-nav";
import { Logo } from "./Logo";

const FOOTER_LINKS = [
  { label: "About Us", id: "about" },
  { label: "Sitemap", id: "sitemap" },
  { label: "Terms of Use", id: "terms" },
  { label: "Privacy Policy", id: "privacy" },
] as const;

// Current year — update when bumping the copyright. Kept as a constant (not
// `new Date().getFullYear()`) to avoid SSR/CSR hydration mismatches around
// year boundaries and across timezones. Calnivo is client-rendered anyway.
const CURRENT_YEAR = 2026;

export function Footer() {
  const setHome = useCalcNav((s) => s.setHome);
  return (
    <footer className="mt-auto border-t border-brand bg-brand-canvas">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-brand-muted">
            <span>© 2008 - {CURRENT_YEAR} Calnivo</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Free online calculators</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {FOOTER_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={setHome}
                className="text-sm text-brand-muted transition-colors hover:text-brand-accent-deep"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
        <p className="mt-5 text-center text-xs leading-relaxed text-brand-muted/80 sm:text-left">
          Calnivo&apos;s sole focus is to provide fast, comprehensive, convenient, free online
          calculators across finance, fitness, health, math and everyday utilities. All tools are
          completely free, with no registration required.
        </p>
      </div>
    </footer>
  );
}

export function FooterLogo() {
  return <Logo />;
}
