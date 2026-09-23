"use client";

import { Lightbulb } from "lucide-react";

interface Props {
  /** The plain-language explanation, derived only from calculated values. */
  children: React.ReactNode;
}

/**
 * Renders a concise, calculation-derived explanation of the result.
 * Per the Master Spec §7 "Explain My Result": concise explanation based
 * only on calculated values and known assumptions.
 *
 * Visually: a subtle highlighted box with a lightbulb icon, using
 * Calnivo's existing accent/background styles. No new visual patterns.
 */
export function ExplainResult({ children }: Props) {
  return (
    <div className="flex gap-3 rounded-lg border border-brand bg-gradient-to-br from-accent/30 to-white p-4">
      <Lightbulb className="h-5 w-5 shrink-0 text-brand-accent-deep" />
      <div className="text-sm leading-relaxed text-brand-muted">{children}</div>
    </div>
  );
}
