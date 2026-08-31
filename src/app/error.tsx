"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this would go to a secure logging service.
    // For now, just log to the console — no user-facing stack trace.
    console.error("Calnivo runtime error:", error.message);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-brand-canvas">
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent text-brand-accent-deep shadow-brand">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-brand-ink">
            Something went wrong
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            An unexpected error occurred while loading this page. Try again, or head back to the
            homepage. Your data is safe — all calculations run locally in your browser.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-[1.03]"
            >
              <RotateCcw className="h-4 w-4" />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-accent/50"
            >
              <Home className="h-4 w-4" />
              Go home
            </Link>
          </div>
          {error.digest && (
            <p className="mt-6 text-xs text-brand-muted/60">
              Error reference: <code className="font-mono">{error.digest}</code>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
