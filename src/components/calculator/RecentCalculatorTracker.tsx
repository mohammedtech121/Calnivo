"use client";

import { useEffect } from "react";
import { useRecentCalculators } from "@/hooks/use-recent-calculators";

/**
 * Mounts inside a calculator page and records the visit in the user's
 * localStorage "recently used" list. Renders nothing visible.
 */
export function RecentCalculatorTracker({ id }: { id: string }) {
  const { record } = useRecentCalculators();
  useEffect(() => {
    record(id);
  }, [id, record]);
  return null;
}
