"use client";

import { useSyncExternalStore, useCallback } from "react";
import {
  CALCULATOR_MAP,
  type CalculatorMeta,
} from "@/lib/calculators/registry";

const STORAGE_KEY = "calnivo:favorites";
const EVENT = "calnivo:favorites-change";

function readRaw(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is string => typeof x === "string" && !!CALCULATOR_MAP[x],
    );
  } catch {
    return [];
  }
}

function writeRaw(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {
    /* noop */
  }
}

let cachedSnapshot: string[] = [];
let cachedKey = "";

function getSnapshot(): string[] {
  const raw =
    typeof window === "undefined" ? "[]" : localStorage.getItem(STORAGE_KEY) ?? "[]";
  if (raw !== cachedKey) {
    cachedKey = raw;
    cachedSnapshot = readRaw();
  }
  return cachedSnapshot;
}

function getServerSnapshot(): string[] {
  return [];
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    cachedKey = "";
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
 * Track the user's favorited calculators in localStorage. Exposes the
 * resolved CalculatorMeta list plus toggle and check helpers. Used by the
 * calculator page sidebar and the homepage favorites strip.
 */
export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const metas: CalculatorMeta[] = ids
    .map((id) => CALCULATOR_MAP[id])
    .filter(Boolean);

  const isFavorite = useCallback(
    (id: string) => readRaw().includes(id),
    [],
  );

  const toggleFavorite = useCallback((id: string) => {
    if (!CALCULATOR_MAP[id]) return;
    const current = readRaw();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    writeRaw(next);
  }, []);

  const clear = useCallback(() => {
    writeRaw([]);
  }, []);

  return {
    metas,
    favorites: metas,
    hasFavorites: metas.length > 0,
    isFavorite,
    toggleFavorite,
    clear,
  };
}
