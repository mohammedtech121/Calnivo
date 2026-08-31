"use client";

import Link from "next/link";
import { useCalcNav } from "@/store/calculator-nav";
import { Logo } from "./Logo";

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
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
            <button onClick={setHome} className="transition-opacity hover:opacity-80">
              <Logo />
            </button>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-brand-muted transition-colors hover:text-brand-accent-deep"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-5 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-brand-muted">
            © 2008 - {CURRENT_YEAR} Calnivo · Free online calculators
          </p>
          <p className="text-xs text-brand-muted/80">
            Calculations run in your browser. No data collected.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function FooterLogo() {
  return <Logo />;
}
