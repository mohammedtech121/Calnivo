"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "calnivo:consent";

type ConsentChoice = "accepted" | "rejected" | null;

export type { ConsentChoice };

// Reactive consent state shared between ConsentBanner and AnalyticsLoader.
// When the user withdraws consent, this immediately updates AnalyticsLoader
// so GA4 stops collecting — no page reload needed.
let externalListener: ((choice: ConsentChoice) => void) | null = null;

function getStoredConsent(): ConsentChoice {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") return stored;
    return null;
  } catch {
    return null;
  }
}

function setStoredConsent(choice: "accepted" | "rejected") {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* noop */
  }
  if (externalListener) externalListener(choice);
}

function clearStoredConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
  if (externalListener) externalListener(null);
}

/**
 * Subscribe to consent changes. Used by AnalyticsLoader to reactively
 * enable/disable GA4 when the user changes their preference.
 */
export function subscribeConsent(listener: (choice: ConsentChoice) => void) {
  externalListener = listener;
  return () => {
    externalListener = null;
  };
}

export function getCurrentConsent(): ConsentChoice {
  return getStoredConsent();
}

/**
 * Consent-gated Google Analytics 4 banner.
 *
 * Per the Privacy/Consent Audit Fix Report:
 * - P0-01: Withdrawal is reactive — AnalyticsLoader immediately disables GA4
 * - P1-03: Accept and Reject are equally prominent (no visual nudge)
 * - P2-08: Accessible (role=dialog, aria-label, keyboard focus)
 */
export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const stored = getStoredConsent();
      if (stored === null) {
        setShow(true);
      }
    }, 500);
    return () => window.clearTimeout(id);
  }, []);

  const decide = useCallback((decision: "accepted" | "rejected") => {
    setStoredConsent(decision);
    setShow(false);
  }, []);

  const resetConsent = useCallback(() => {
    clearStoredConsent();
    setShow(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { __calnivoResetConsent?: () => void }).__calnivoResetConsent = resetConsent;
    }
  }, [resetConsent]);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent — analytics choice"
      className="no-print fixed bottom-0 left-0 right-0 z-[200] border-t border-brand bg-white/95 backdrop-blur-md shadow-brand-lg"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent-deep" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-brand-muted">
            Calnivo uses Google Analytics to understand which calculators are
            useful. Calculator inputs and results stay in your browser and are
            never sent anywhere. Your choice is saved in this browser.{" "}
            <Link href="/privacy" className="font-medium text-brand-accent-deep hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          {/* Equal prominence — both buttons same style */}
          <button
            onClick={() => decide("rejected")}
            className="rounded-lg border border-brand bg-white px-4 py-2 text-xs font-semibold text-brand-ink transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
            aria-label="Reject optional analytics"
          >
            Reject
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-lg border border-brand bg-white px-4 py-2 text-xs font-semibold text-brand-ink transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
            aria-label="Accept analytics"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
