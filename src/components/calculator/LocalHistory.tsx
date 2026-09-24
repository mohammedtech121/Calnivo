"use client";

import { useState, useEffect, useCallback } from "react";
import { History, Trash2 } from "lucide-react";

export interface HistoryEntry {
  id: string;
  calculatorId: string;
  calculatorName: string;
  summary: string;
  timestamp: number;
}

interface Props {
  /** The calculator ID (used to filter history by calculator). */
  calculatorId: string;
  /** Called when the user clicks a history entry to restore it. */
  onRestore?: (entry: HistoryEntry) => void;
  /** Max entries to keep per calculator (default 10). */
  maxEntries?: number;
}

const STORAGE_KEY = "calnivo:history";

/**
 * Local Recent History.
 * Per the Master Spec §7: "Local Recent History: restore previous calculations
 * without an account."
 *
 * Stores calculation summaries in localStorage (no server, no account).
 * The parent calls `saveToHistory()` to add an entry; this component
 * renders the list and calls `onRestore` when the user clicks an entry.
 *
 * Privacy: only stores calculation summaries (text), never raw inputs
 * for password generators or other sensitive tools.
 */
export function LocalHistory({ calculatorId, onRestore, maxEntries = 10 }: Props) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [open, setOpen] = useState(false);

  const refreshHistory = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const all: HistoryEntry[] = JSON.parse(raw);
      setEntries(all.filter((e) => e.calculatorId === calculatorId).slice(0, maxEntries));
    } catch {
      /* corrupt storage — ignore */
    }
  }, [calculatorId, maxEntries]);

  // Refresh on mount + when calculatorId changes.
  useEffect(() => {
    const id = window.setTimeout(refreshHistory, 0);
    return () => window.clearTimeout(id);
  }, [refreshHistory]);

  const clearHistory = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const all: HistoryEntry[] = JSON.parse(raw);
      const filtered = all.filter((e) => e.calculatorId !== calculatorId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      setEntries([]);
    } catch {
      /* noop */
    }
  }, [calculatorId]);

  if (entries.length === 0) return null;

  return (
    <div className="rounded-xl border border-brand bg-white shadow-brand">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left transition-colors hover:bg-accent/30"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5">
          <History className="h-4 w-4 text-brand-muted" />
          <span className="text-sm font-semibold text-brand-ink">Recent calculations</span>
          <span className="rounded-full bg-accent/60 px-2 py-0.5 text-xs font-medium text-brand-accent-deep">
            {entries.length}
          </span>
        </div>
      </button>
      {open && (
        <div className="border-t border-brand px-5 py-3">
          <div className="space-y-1.5 max-h-48 overflow-y-auto scroll-thin">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onRestore?.(entry)}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent/30"
              >
                <span className="block text-brand-ink line-clamp-2">{entry.summary}</span>
                <span className="mt-0.5 block text-xs text-brand-muted">
                  {new Date(entry.timestamp).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={clearHistory}
            className="mt-2 flex items-center gap-1.5 text-xs text-brand-muted hover:text-red-600"
          >
            <Trash2 className="h-3 w-3" />
            Clear history
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Helper: save a calculation to local history.
 * Call this from any calculator after a result is computed.
 */
export function saveToHistory(entry: Omit<HistoryEntry, "id" | "timestamp">) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all: HistoryEntry[] = raw ? JSON.parse(raw) : [];
    // Don't store password generator results
    if (entry.calculatorId === "password-generator") return;
    const newEntry: HistoryEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
    };
    // Keep only the latest 50 entries globally, newest first
    all.unshift(newEntry);
    const trimmed = all.slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    /* localStorage full or unavailable — ignore */
  }
}
