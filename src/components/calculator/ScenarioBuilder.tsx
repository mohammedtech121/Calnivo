"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface ScenarioConfig {
  id: string;
  label: string;
  /** The input values for this scenario (key → value). */
  inputs: Record<string, string>;
}

export interface ScenarioResult {
  id: string;
  label: string;
  /** Key results to compare (key → formatted string). */
  results: Record<string, string>;
  /** Optional highlight: which results changed meaningfully from the base. */
  deltas?: Record<string, string>;
}

interface Props {
  /**
   * Function that takes a scenario config (inputs) and computes the results.
   * The parent provides this — it uses the SAME calculation engine as the
   * primary calculator (no duplicate logic, per spec §3).
   */
  compute: (inputs: Record<string, string>) => Record<string, string>;
  /** The base scenario inputs (from the primary calculator). */
  baseInputs: Record<string, string>;
  /** Which result keys to show in the comparison. */
  resultKeys: { key: string; label: string }[];
  /** Labels for the input fields that can be varied. */
  inputFields: { key: string; label: string }[];
  /** The base scenario label (default: "Base"). */
  baseLabel?: string;
}

/**
 * Scenario Builder: Base + up to 2 alternatives.
 * Per the Master Spec §7: "Scenario Builder: Base + up to two alternatives."
 *
 * The parent passes a `compute` function that uses the same calculation
 * engine as the primary calculator. This prevents duplicate formula logic
 * (spec §3: "Do not duplicate calculation logic between scenarios").
 *
 * UI: compact comparison table inside an ExpandableSection (parent wraps it).
 * Uses Calnivo card/table styles. No new visual patterns.
 */
export function ScenarioBuilder({
  compute,
  baseInputs,
  resultKeys,
  inputFields,
  baseLabel = "Base",
}: Props) {
  const [altInputs, setAltInputs] = useState<
    Record<string, Record<string, string>>
  >({
    alt1: { ...baseInputs },
    alt2: { ...baseInputs },
  });

  const updateAlt = useCallback(
    (altId: string, key: string, value: string) => {
      setAltInputs((prev) => ({
        ...prev,
        [altId]: { ...prev[altId], [key]: value },
      }));
    },
    [],
  );

  const scenarios: ScenarioResult[] = [
    {
      id: "base",
      label: baseLabel,
      results: compute(baseInputs),
    },
    {
      id: "alt1",
      label: "Scenario A",
      results: compute(altInputs.alt1),
    },
    {
      id: "alt2",
      label: "Scenario B",
      results: compute(altInputs.alt2),
    },
  ];

  // Calculate deltas (difference from base) for alt1 and alt2
  const baseResults = scenarios[0].results;
  scenarios[1].deltas = computeDeltas(baseResults, scenarios[1].results);
  scenarios[2].deltas = computeDeltas(baseResults, scenarios[2].results);

  return (
    <div className="space-y-4">
      {/* Scenario input editors */}
      <div className="grid gap-4 sm:grid-cols-2">
        {(["alt1", "alt2"] as const).map((altId, idx) => (
          <div key={altId} className="rounded-lg border border-brand bg-brand-canvas p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Scenario {idx === 0 ? "A" : "B"}
            </p>
            <div className="space-y-2">
              {inputFields.map((field) => (
                <div key={field.key} className="flex items-center justify-between gap-2">
                  <label className="text-xs text-brand-muted">{field.label}</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={altInputs[altId][field.key] ?? ""}
                    onChange={(e) => updateAlt(altId, field.key, e.target.value)}
                    className="w-28 rounded border border-brand bg-white px-2 py-1 text-right text-sm text-brand-ink outline-none focus:border-brand-accent"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto rounded-lg border border-brand scroll-thin">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0">
            <tr>
              <th className="bg-muted/50 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Result
              </th>
              {scenarios.map((s) => (
                <th
                  key={s.id}
                  className="bg-muted/50 px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-brand-muted"
                >
                  {s.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resultKeys.map((rk) => (
              <tr key={rk.key} className="border-t border-brand">
                <td className="px-3 py-2 text-brand-muted">{rk.label}</td>
                {scenarios.map((s) => {
                  const val = s.results[rk.key] ?? "—";
                  const delta = s.deltas?.[rk.key];
                  const hasDelta = delta && delta !== "0" && s.id !== "base";
                  return (
                    <td
                      key={s.id}
                      className="px-3 py-2 text-right tabular-nums text-brand-ink"
                    >
                      <span className="font-medium">{val}</span>
                      {hasDelta && (
                        <span
                          className={cn(
                            "ml-1 text-xs",
                            delta.startsWith("-") ? "text-red-600" : "text-brand-accent-deep",
                          )}
                        >
                          ({delta.startsWith("-") ? "" : "+"}{delta})
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function computeDeltas(
  base: Record<string, string>,
  alt: Record<string, string>,
): Record<string, string> {
  const deltas: Record<string, string> = {};
  for (const key of Object.keys(base)) {
    const b = parseFloat(base[key]?.replace(/[^0-9.\-]/g, "") || "0");
    const a = parseFloat(alt[key]?.replace(/[^0-9.\-]/g, "") || "0");
    if (isFinite(b) && isFinite(a)) {
      const d = a - b;
      deltas[key] = Math.abs(d) < 0.01 ? "0" : d.toFixed(2);
    }
  }
  return deltas;
}
