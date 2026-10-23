"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import {
  subscribeConsent,
  getCurrentConsent,
  type ConsentChoice,
} from "./ConsentBanner";

const GA_ID = "G-L38QJ6QYWQ";

/**
 * Client-only GA4 loader with reactive consent.
 *
 * Per the Privacy/Consent Audit Fix Report P0-01:
 * - GA4 loads ONLY after user accepts consent
 * - If user withdraws consent, GA4 is immediately disabled (no reload needed)
 * - Uses subscribeConsent() for reactive state sharing with ConsentBanner
 * - No duplicate GA4 initialization
 */
export function AnalyticsLoader() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // Check initial consent
    const id = window.setTimeout(() => {
      const initial = getCurrentConsent();
      setConsented(initial === "accepted");
    }, 0);

    // Subscribe to consent changes — reactively enable/disable
    const unsubscribe = subscribeConsent((choice: ConsentChoice) => {
      setConsented(choice === "accepted");
    });

    return () => {
      window.clearTimeout(id);
      unsubscribe();
    };
  }, []);

  // When consent is withdrawn, remove gtag from window to stop further events
  useEffect(() => {
    if (!consented && typeof window !== "undefined") {
      // Clear dataLayer to prevent further events
      const w = window as unknown as { dataLayer?: unknown[] };
      if (w.dataLayer) {
        w.dataLayer.length = 0;
      }
      // Remove GA cookies (best-effort)
      document.cookie.split(";").forEach((c) => {
        const eq = c.indexOf("=");
        const name = c.slice(0, eq > -1 ? eq : c.length).trim();
        if (name.startsWith("_ga") || name.startsWith("_gid") || name.startsWith("_gat")) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
      });
    }
  }, [consented]);

  if (!consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
