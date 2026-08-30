"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fmtNum } from "@/lib/format";

interface Stats {
  n: number;
  sum: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  range: number;
  popVar: number;
  popStd: number;
  sampleVar: number;
  sampleStd: number;
  sorted: number[];
}

// Cap the number of parsed values to keep the browser responsive. Anything
// beyond this is ignored with a visible notice (see UI below). 10k is more
// than enough for any realistic dataset and keeps sort + reduce under ~20ms.
const MAX_VALUES = 10_000;

function parseList(raw: string): { nums: number[]; totalTokens: number } {
  const tokens = raw
    .split(/[\s,;|\t\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const totalTokens = tokens.length;
  const allValid = tokens.map((s) => Number(s)).filter((n) => isFinite(n));
  // Distinguish "invalid" (non-numeric) from "capped" (valid but beyond the
  // cap). We only count invalid tokens up to MAX_VALUES so the capped count
  // is computed correctly.
  const invalidCount = tokens.length - allValid.length;
  const nums = allValid.slice(0, MAX_VALUES);
  const cappedCount = Math.max(0, allValid.length - MAX_VALUES);
  return { nums, totalTokens, invalidCount, cappedCount };
}

function computeStats(nums: number[]): Stats | null {
  if (nums.length === 0) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((s, x) => s + x, 0);
  const mean = sum / n;
  const median =
    n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[(n - 1) / 2];
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;

  const sumSqDiff = sorted.reduce((s, x) => s + (x - mean) ** 2, 0);
  const popVar = sumSqDiff / n;
  const popStd = Math.sqrt(popVar);
  // Sample variance requires at least 2 data points (denominator n−1).
  // For n === 1, sample variance / std dev are mathematically undefined
  // (division by zero). Return NaN so the display layer renders "—" rather
  // than misleading the user with a value of 0.
  const sampleVar = n > 1 ? sumSqDiff / (n - 1) : NaN;
  const sampleStd = n > 1 ? Math.sqrt(sampleVar) : NaN;

  return {
    n,
    sum,
    mean,
    median,
    min,
    max,
    range,
    popVar,
    popStd,
    sampleVar,
    sampleStd,
    sorted,
  };
}

export default function StandardDeviationCalculator() {
  const [raw, setRaw] = useState("4, 8, 15, 16, 23, 42");

  const parsed = useMemo(() => parseList(raw), [raw]);
  const stats = useMemo(() => computeStats(parsed.nums), [parsed]);
  const invalidCount = parsed.invalidCount;
  const cappedCount = parsed.cappedCount;

  return (
    <div className="space-y-6">
      <CalcCard title="Inputs">
        <Field label="Data set" hint="Separate numbers with commas, spaces or newlines">
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={5}
            placeholder="4, 8, 15, 16, 23, 42"
            className="w-full rounded-lg border border-brand bg-white px-3 py-2 font-mono text-sm text-brand-ink outline-none transition-all placeholder:text-brand-muted/60 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
          />
        </Field>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-brand-muted">
          <span>
            <span className="font-semibold text-brand-ink">
              {parsed.nums.length}
            </span>{" "}
            valid value{parsed.nums.length === 1 ? "" : "s"}
          </span>
          {invalidCount > 0 && (
            <span className="rounded-md bg-accent/40 px-2 py-0.5 font-medium text-brand-accent-deep">
              {invalidCount} skipped (non-numeric)
            </span>
          )}
          {cappedCount > 0 && (
            <span className="rounded-md bg-accent/40 px-2 py-0.5 font-medium text-brand-accent-deep">
              {cappedCount} ignored (capped at {MAX_VALUES.toLocaleString()} values)
            </span>
          )}
        </div>
      </CalcCard>

      <CalcCard title="Results">
        {!stats ? (
          <div className="rounded-lg border border-dashed border-brand bg-white px-4 py-6 text-center text-sm text-brand-muted">
            Enter at least one number above to compute statistics.
          </div>
        ) : (
          <>
            <ResultCard
              label={`Mean of ${stats.n} value${stats.n === 1 ? "" : "s"}`}
              value={fmtNum(stats.mean, 4)}
              sub={`Sample std dev s = ${fmtNum(stats.sampleStd, 4)} · Population σ = ${fmtNum(stats.popStd, 4)}`}
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Stat label="Count (n)" value={String(stats.n)} />
              <Stat label="Sum (Σx)" value={fmtNum(stats.sum, 4)} />
              <Stat label="Mean (x̄)" value={fmtNum(stats.mean, 4)} />
              <Stat label="Median" value={fmtNum(stats.median, 4)} />
              <Stat label="Min" value={fmtNum(stats.min, 4)} />
              <Stat label="Max" value={fmtNum(stats.max, 4)} />
              <Stat label="Range" value={fmtNum(stats.range, 4)} />
              <Stat
                label="Population variance (σ²)"
                value={fmtNum(stats.popVar, 4)}
              />
              <Stat
                label="Sample variance (s²)"
                value={fmtNum(stats.sampleVar, 4)}
              />
              <Stat
                label="Population std dev (σ)"
                value={fmtNum(stats.popStd, 4)}
              />
              <Stat
                label="Sample std dev (s)"
                value={fmtNum(stats.sampleStd, 4)}
              />
              <Stat
                label="Coefficient of variation"
                value={
                  stats.mean !== 0 && isFinite(stats.sampleStd)
                    ? `${fmtNum((stats.sampleStd / Math.abs(stats.mean)) * 100, 4)}%`
                    : "—"
                }
              />
            </div>

            <div className="mt-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Formulas used
              </div>
              <ul className="grid gap-2 text-xs text-brand-muted sm:grid-cols-2">
                <li className="rounded-lg border border-brand bg-brand-canvas p-3 font-mono">
                  σ² = Σ(x − μ)² ÷ n
                </li>
                <li className="rounded-lg border border-brand bg-brand-canvas p-3 font-mono">
                  s² = Σ(x − x̄)² ÷ (n − 1)
                </li>
                <li className="rounded-lg border border-brand bg-brand-canvas p-3 font-mono">
                  σ = √σ²
                </li>
                <li className="rounded-lg border border-brand bg-brand-canvas p-3 font-mono">
                  s = √s²
                </li>
              </ul>
            </div>
          </>
        )}
      </CalcCard>

      {stats && (
        <CalcCard title="Sorted data">
          <div className="max-h-96 overflow-y-auto scroll-thin">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-16">#</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Deviation (x − x̄)</TableHead>
                  <TableHead className="text-right">(x − x̄)²</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.sorted.map((v, i) => {
                  const dev = v - stats.mean;
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs text-brand-muted tabular-nums">
                        {i + 1}
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium text-brand-ink tabular-nums">
                        {fmtNum(v, 6)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-brand-muted tabular-nums">
                        {dev >= 0 ? "+" : ""}
                        {fmtNum(dev, 6)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-brand-muted tabular-nums">
                        {fmtNum(dev * dev, 6)}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="border-t-2 border-brand bg-brand-canvas/60 font-semibold">
                  <TableCell colSpan={2} className="text-right text-brand-ink">
                    Sum of squares (Σ(x − x̄)²)
                  </TableCell>
                  <TableCell className="text-right" colSpan={2}>
                    <span className="font-mono text-brand-accent-deep tabular-nums">
                      {fmtNum(
                        stats.sorted.reduce((s, x) => s + (x - stats.mean) ** 2, 0),
                        6,
                      )}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CalcCard>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-brand bg-brand-canvas p-3">
      <div className="text-xs font-medium text-brand-muted">{label}</div>
      <div className="mt-1 font-mono text-base font-semibold text-brand-ink tabular-nums">
        {value}
      </div>
    </div>
  );
}
