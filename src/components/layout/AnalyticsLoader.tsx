"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const STORAGE_KEY = "calnivo:consent";
const GA_ID = "G-L38QJ6QYWQ";

/**
 * Client-only GA4 loader.
 *
 * Renders GA4 scripts ONLY after the user has accepted analytics consent.
 * Checks localStorage on mount — if consent is "accepted", loads gtag.js.
 * If consent is not yet given or rejected, no scripts render (no network
 * requests, no cookies).
 */
export function AnalyticsLoader() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "accepted") {
          setConsented(true);
        }
      } catch {
        /* noop */
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

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
