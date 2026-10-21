"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "calnivo:consent";

type ConsentChoice = "accepted" | "rejected" | null;

/**
 * Consent-gated Google Analytics 4 banner.
 *
 * Per the Privacy/Legal Audit (P0): GA4 must NOT load until the user grants
 * consent. This component shows a cookie banner on first visit with clear
 * "Accept analytics" and "Reject optional analytics" choices.
 *
 * The parent (layout.tsx) checks the consent state before loading gtag.js.
 * If consent is "rejected" or null, no GA4 scripts load — no network
 * requests, no cookies.
 */
export function ConsentBanner() {
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [show, setShow] = useState(false);

  // Read stored consent on mount
  // Read stored consent on mount — use lazy initializer instead of effect+setState
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY) as ConsentChoice;
        if (stored === "accepted" || stored === "rejected") {
          setChoice(stored);
        } else {
          setShow(true);
        }
      } catch {
        setShow(true);
      }
      setInitialized(true);
    }, 500);
    return () => window.clearTimeout(id);
  }, []);

  const decide = useCallback((decision: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, decision);
    } catch {
      /* noop */
    }
    setChoice(decision);
    setShow(false);
    // If accepted, reload to trigger GA4 script load
    if (decision === "accepted" && typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  // Allow changing preference later (called from footer)
  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    setChoice(null);
    setShow(true);
  }, []);

  // Expose reset function globally for footer "Privacy settings" button
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { __calnivoResetConsent?: () => void }).__calnivoResetConsent = resetConsent;
    }
  }, [resetConsent]);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="no-print fixed bottom-0 left-0 right-0 z-[200] border-t border-brand bg-white/95 backdrop-blur-md shadow-brand-lg"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent-deep" />
          <p className="text-xs leading-relaxed text-brand-muted">
            Calnivo uses Google Analytics to understand which calculators are
            useful. Calculator inputs and results stay in your browser and are
            never sent anywhere.{" "}
            <Link href="/privacy" className="font-medium text-brand-accent-deep hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide("rejected")}
            className="rounded-lg border border-brand bg-white px-4 py-2 text-xs font-semibold text-brand-ink transition-colors hover:bg-accent/40"
          >
            Reject
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-lg bg-brand-accent-gradient px-4 py-2 text-xs font-semibold text-white shadow-accent transition-transform hover:scale-[1.03]"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Check if the user has accepted analytics consent.
 * Called by layout.tsx to decide whether to load GA4 scripts.
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}
