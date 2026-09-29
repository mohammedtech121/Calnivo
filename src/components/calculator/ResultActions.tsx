"use client";

import { useState, useCallback } from "react";
import { Share2, Printer, FileText, Check, Image as ImageIcon } from "lucide-react";
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
 * Result actions: Share, Print, Save PDF, Save Image.
 *
 * Per the Visual Save spec:
 * - Print = browser print (only .printable-area shows, via CSS)
 * - Save PDF = print with date-stamped filename (user selects "Save as PDF")
 * - Save Image = captures .printable-area as PNG using html-to-image
 * - Share = copies URL to clipboard
 *
 * All actions are client-side. No database, no authentication, no server.
 */
export function ResultActions({
  summaryText,
  filename = "calnivo-result",
  disabled,
}: Props) {
  const [shared, setShared] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleShare = useCallback(async () => {
    if (disabled) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href.split("?")[0]);
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

  const handleSavePDF = useCallback(() => {
    if (disabled || typeof window === "undefined") return;
    const date = new Date().toISOString().slice(0, 10);
    const cleanName = filename
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const originalTitle = document.title;
    document.title = `calnivo-${cleanName}-${date}`;
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 500);
    }, 100);
  }, [disabled, filename]);

  // Save as Image — captures the .printable-area as a PNG
  const handleSaveImage = useCallback(async () => {
    if (disabled || typeof window === "undefined") return;
    setSaving(true);
    try {
      const { toPng } = await import("html-to-image");
      const element = document.querySelector(".printable-area") as HTMLElement;
      if (!element) return;

      const date = new Date().toISOString().slice(0, 10);
      const cleanName = filename
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      const dataUrl = await toPng(element, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: "#FAF9F6",
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `calnivo-${cleanName}-${date}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      /* noop */
    } finally {
      setSaving(false);
    }
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
        onClick={handleSaveImage}
        disabled={disabled || saving}
        className={btnClass}
        aria-label="Save as image"
      >
        <ImageIcon className="h-3.5 w-3.5" />
        {saving ? "Saving…" : "Save Image"}
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
        onClick={handleSavePDF}
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
