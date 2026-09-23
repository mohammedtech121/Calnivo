"use client";

import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  /** Optional subtitle shown next to the title in muted text. */
  subtitle?: string;
  /** Controlled open state (optional — defaults to uncontrolled). */
  open?: boolean;
  /** Default open state for uncontrolled mode. */
  defaultOpen?: boolean;
  /** Called when the user toggles the section. */
  onToggle?: (open: boolean) => void;
  /** Badge text shown on the right (e.g. "3 scenarios"). */
  badge?: string;
  children: React.ReactNode;
}

/**
 * Progressive-disclosure wrapper.
 *
 * Per the Master Implementation Spec §4: advanced features go inside
 * clearly labeled expandable sections so the primary calculator and
 * primary result stay visible without scrolling through advanced controls.
 *
 * Uses the existing Calnivo card style + brand colors. No new CSS patterns.
 */
export function ExpandableSection({
  title,
  subtitle,
  open: controlledOpen,
  defaultOpen = false,
  onToggle,
  badge,
  children,
}: Props) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen ?? internalOpen;

  const toggle = useCallback(() => {
    const next = !isOpen;
    if (controlledOpen === undefined) setInternalOpen(next);
    onToggle?.(next);
  }, [isOpen, controlledOpen, onToggle]);

  return (
    <div className="rounded-xl border border-brand bg-white shadow-brand">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-accent/30"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="min-w-0">
            <span className="block text-sm font-semibold text-brand-ink">{title}</span>
            {subtitle && (
              <span className="block text-xs text-brand-muted truncate">{subtitle}</span>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {badge && (
            <span className="rounded-full bg-accent/60 px-2.5 py-0.5 text-xs font-medium text-brand-accent-deep">
              {badge}
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-brand-muted transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </button>
      {isOpen && (
        <div className="border-t border-brand px-5 py-4">{children}</div>
      )}
    </div>
  );
}
