"use client";

import { useState, useCallback } from "react";
import { Share2, Printer, FileText, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  /** Plain-text summary for share/download fallback. */
  summaryText: string;
  /** Filename for the download (without extension). */
  filename?: string;
  /** Disable when no result exists. */
  disabled?: boolean;
}

/**
 * Result actions: Share (copy URL), Print (browser print), Save (visual PDF).
 * Per the Print+Visual Save spec: PRINT shows only the calculator content
 * (via .printable-area CSS), SAVE generates a visual PDF using the browser's
 * print-to-PDF capability with a date-stamped filename.
 *
 * Both Print and Save use the browser's native print system (window.print()),
 * but Save also sets a suggested filename and can trigger a "Save as PDF"
 * flow. The actual visual representation is handled by the print CSS in
 * globals.css (.printable-area — hides all website chrome).
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

  // Save = print with a suggested PDF filename.
  // The browser's "Save as PDF" destination will use the document title
  // (which we temporarily set to the filename) as the default save name.
  const handleSave = useCallback(() => {
    if (disabled || typeof window === "undefined") return;

    // Build the filename: calnivo-[name]-[date].pdf
    const date = new Date().toISOString().slice(0, 10);
    const cleanName = filename
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const pdfFilename = `calnivo-${cleanName}-${date}`;

    // Temporarily set the document title so "Save as PDF" uses it as filename
    const originalTitle = document.title;
    document.title = pdfFilename;

    // Add a small delay so the title change is picked up
    setTimeout(() => {
      window.print();
      // Restore the original title after print dialog closes
      setTimeout(() => {
        document.title = originalTitle;
      }, 500);
    }, 100);
  }, [disabled, filename]);

  const btnClass = cn(
    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 disabled:cursor-not-allowed disabled:opacity-40",
    "border-brand bg-white text-brand-ink hover:border-brand-accent hover:bg-accent/40",
  );

  return (
    <div className="no-print flex flex-wrap gap-2">
      <button
        type="button"
        onClick={handleShare}
        disabled={disabled}
        className={cn(btnClass, shared && "border-transparent bg-brand-accent-gradient text-white shadow-accent")}
        aria-label="Share result link"
      >
        {shared ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
        {shared ? "Link copied" : "Share"}
      </button>
      <button
        type="button"
        onClick={handlePrint}
        disabled={disabled}
        className={btnClass}
        aria-label="Print calculation"
      >
        <Printer className="h-3.5 w-3.5" />
        Print
      </button>
      <button
        type="button"
        onClick={handleSave}
        disabled={disabled}
        className={btnClass}
        aria-label="Save as PDF"
      >
        <FileText className="h-3.5 w-3.5" />
        Save PDF
      </button>
    </div>
  );
}
