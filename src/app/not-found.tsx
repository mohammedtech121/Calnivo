import Link from "next/link";
import { Calculator, Home, Search } from "lucide-react";

export const metadata = {
  title: "Page not found | Calnivo",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-canvas">
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-accent-gradient shadow-accent">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-6xl font-bold tracking-tight text-brand-ink">404</h1>
          <h2 className="mt-2 text-xl font-semibold text-brand-ink">
            This page could not be found
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of these
            instead:
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-[1.03]"
            >
              <Home className="h-4 w-4" />
              Go home
            </Link>
            <Link
              href="/#popular"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-accent/50"
            >
              <Search className="h-4 w-4" />
              Browse calculators
            </Link>
          </div>
          <p className="mt-8 text-xs text-brand-muted">
            Calnivo has 40+ free calculators — finance, health, math, and everyday utilities.
          </p>
        </div>
      </main>
    </div>
  );
}
