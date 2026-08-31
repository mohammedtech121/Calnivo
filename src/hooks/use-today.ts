"use client";

import { useSyncExternalStore } from "react";
import { format } from "date-fns";

/**
 * Returns today's date as a "yyyy-MM-dd" string in a hydration-safe way.
 *
 * Why this exists: `new Date()` called during render produces different values
 * on the server vs the client (different runtimes / timezones / sub-second
 * timing), which triggers React hydration warnings. `useSyncExternalStore`
 * solves this by letting us return a stable server snapshot (`""`) and only
 * compute the real date on the client.
 *
 * Returns `""` during SSR and the first client render, then the real date
 * after hydration completes.
 */
const emptySubscribe = () => () => {};

export function useToday(): string {
  return useSyncExternalStore(
    emptySubscribe,
    () => format(new Date(), "yyyy-MM-dd"),
    () => "",
  );
}
