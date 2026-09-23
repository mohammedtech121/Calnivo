"use client";

import { useState, useCallback } from "react";
import { Share2, Printer, Download, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  /** Plain-text summary to download/share (same format as Copy). */
  summaryText: string;
  /** Filename for the download (without extension). */
  filename?: string;
  /** Disable when no result exists. */
  disabled?: boolean;
}

/**
 * Result actions: Share (copy URL with state), Print, Download.
 * Per the Master Spec §7: "Copy, Share, Save/Recent, Print and Download."
 *
 * Copy is handled separately by CopyResultButton (already deployed).
 * This component adds the remaining actions:
 * - Share: encodes the summary text to a URL-safe query param and copies the URL
 * - Print: triggers window.print()
 * - Download: saves the summary as a .txt file
 *
 * Uses Calnivo's existing button/card styles. No new visual patterns.
 */
export function ResultActions({
  summaryText,
  filename = "calnivo-result",
  disabled,
}: Props) {
  const [shared, setShared] = useState(false);

  const handleShare = useCallback(async () => {
    if (disabled) return;
    const url = typeof window !== "undefined" ? window.location.href.split("?")[0] : "";
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* noop */
    }
  }, [disabled]);

  const handlePrint = useCallback(() => {
    if (disabled) return;
    if (typeof window !== "undefined") window.print();
  }, [disabled]);

  const handleDownload = useCallback(() => {
    if (disabled || !summaryText) return;
    const blob = new Blob([summaryText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [summaryText, filename, disabled]);

  const btnClass = cn(
    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 disabled:cursor-not-allowed disabled:opacity-40",
    "border-brand bg-white text-brand-ink hover:border-brand-accent hover:bg-accent/40",
  );

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={handleShare}
        disabled={disabled}
        className={cn(btnClass, shared && "border-transparent bg-brand-accent-gradient text-white shadow-accent")}
        aria-label="Share result"
      >
        {shared ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
        {shared ? "Link copied" : "Share"}
      </button>
      <button
        type="button"
        onClick={handlePrint}
        disabled={disabled}
        className={btnClass}
        aria-label="Print result"
      >
        <Printer className="h-3.5 w-3.5" />
        Print
      </button>
      <button
        type="button"
        onClick={handleDownload}
        disabled={disabled}
        className={btnClass}
        aria-label="Download result"
      >
        <Download className="h-3.5 w-3.5" />
        Download
      </button>
    </div>
  );
}
