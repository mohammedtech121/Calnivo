"use client";

import { useState, useCallback, useRef } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  /** Plain-text summary to copy. Keep concise — inputs + key results + a link. */
  getText: () => string;
  /** Disable when no result exists yet. */
  disabled?: boolean;
  /** Optional label override (default: "Copy result"). */
  label?: string;
  className?: string;
}

/**
 * Reusable "Copy result" button.
 *
 * - Uses the async Clipboard API when available (navigator.clipboard.writeText).
 * - Falls back to a hidden <textarea> + document.execCommand("copy") for older
 *   browsers and insecure contexts (HTTP).
 * - Shows a "✓ Copied" success state for 2 seconds (color + text + aria-live).
 * - Keyboard accessible (native <button>), visible focus ring, disabled state.
 * - Never exposes raw internal state — the parent passes a clean getText().
 */
export function CopyResultButton({ getText, disabled, label = "Copy result", className }: Props) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    if (disabled) return;
    const text = getText();
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      } else {
        // Legacy fallback for non-secure contexts / older browsers.
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        ta.style.pointerEvents = "none";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      }
    } catch {
      ok = false;
    }
    if (ok) {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  }, [disabled, getText]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled}
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 disabled:cursor-not-allowed disabled:opacity-40",
        copied
          ? "border-transparent bg-brand-accent-gradient text-white shadow-accent"
          : "border-brand bg-white text-brand-ink hover:border-brand-accent hover:bg-accent/40",
        className,
      )}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
      <span className="sr-only">{copied ? "Result copied to clipboard" : "Copy result to clipboard"}</span>
    </button>
  );
}
