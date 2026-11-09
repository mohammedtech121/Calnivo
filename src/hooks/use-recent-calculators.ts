"use client";

import { useSyncExternalStore, useCallback } from "react";
import { CALCULATOR_MAP, type CalculatorMeta } from "@/lib/calculators/registry";

const STORAGE_KEY = "calnivo:recent";
const MAX_ITEMS = 6;
const EVENT = "calnivo:recent-change";

export interface RecentItem {
  id: string;
  ts: number;
}

function readRaw(): RecentItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (x): x is RecentItem =>
          x &&
          typeof x.id === "string" &&
          typeof x.ts === "number" &&
          !!CALCULATOR_MAP[x.id],
      )
      .slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

function writeRaw(items: RecentItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {
    /* noop — quota or privacy mode */
  }
}

// Cache the latest snapshot so getSnapshot returns a stable reference until
// the data actually changes (required by useSyncExternalStore).
let cachedSnapshot: RecentItem[] = [];
let cachedKey = "";

function getSnapshot(): RecentItem[] {
  const raw = typeof window === "undefined" ? "[]" : localStorage.getItem(STORAGE_KEY) ?? "[]";
  if (raw !== cachedKey) {
    cachedKey = raw;
    cachedSnapshot = readRaw();
  }
  return cachedSnapshot;
}

function getServerSnapshot(): RecentItem[] {
  return [];
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    cachedKey = ""; // invalidate cache
    callback();
  };
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

/**
 * Track recently visited calculators in localStorage and expose the resolved
 * CalculatorMeta list for rendering. Used by the homepage "Recently used"
 * section. Uses useSyncExternalStore for correct concurrent-React behavior.
 */
export function useRecentCalculators() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const metas: CalculatorMeta[] = items
    .map((it) => CALCULATOR_MAP[it.id])
    .filter(Boolean);

  const record = useCallback((id: string) => {
    if (!CALCULATOR_MAP[id]) return;
    const current = readRaw().filter((x) => x.id !== id);
    current.unshift({ id, ts: Date.now() });
    writeRaw(current);
  }, []);

  const clear = useCallback(() => {
    writeRaw([]);
  }, []);

  return { metas, record, clear, hasItems: metas.length > 0 };
}
