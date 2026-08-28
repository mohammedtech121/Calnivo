"use client";

import { useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  CalcButton,
} from "@/components/calculator/CalculatorShell";
import { parseNum, clamp } from "@/lib/format";

type SortMode = "none" | "asc" | "desc";

function secureRandomUint32(): number {
  if (
    typeof globalThis !== "undefined" &&
    globalThis.crypto &&
    typeof globalThis.crypto.getRandomValues === "function"
  ) {
    const arr = new Uint32Array(1);
    globalThis.crypto.getRandomValues(arr);
    return arr[0];
  }
  return Math.floor(Math.random() * 0x100000000);
}

/** Returns a random integer in [min, max] inclusive using rejection sampling. */
function randomIntInclusive(min: number, max: number): number {
  const span = max - min + 1;
  // span must be a positive integer <= 2^32
  if (span <= 0) return min;
  // Mask to nearest power-of-2 upper bound, then reject overflow
  const mask = span - 1;
  let x: number;
  let tries = 0;
  do {
    x = secureRandomUint32() & 0xffffffff;
    tries++;
    if (tries > 100) return min + (x % span);
  } while (span > 1 && x >= span - (0x100000000 % span));
  return min + (mask === 0 ? 0 : (x % span));
}

function pickUnique(min: number, max: number, count: number): number[] {
  // Generate `count` unique integers in [min, max].
  const span = max - min + 1;
  if (count > span) return [];
  // For small spans, swap-shuffle; for large, use a Set.
  if (span <= 10_000) {
    const pool = Array.from({ length: span }, (_, i) => min + i);
    // Fisher–Yates
    for (let i = pool.length - 1; i > 0; i--) {
      const j = randomIntInclusive(0, i);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  }
  const out = new Set<number>();
  let safety = 0;
  while (out.size < count && safety < count * 20) {
    out.add(randomIntInclusive(min, max));
    safety++;
  }
  return Array.from(out);
}

export default function RandomNumberCalculator() {
  const [minStr, setMinStr] = useState("1");
  const [maxStr, setMaxStr] = useState("100");
  const [countStr, setCountStr] = useState("1");
  const [unique, setUnique] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("none");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);

  const min = Math.round(parseNum(minStr));
  const max = Math.round(parseNum(maxStr));
  const count = clamp(Math.round(parseNum(countStr)), 1, 10_000);
  const span = Math.abs(max - min) + 1;

  const handleGenerate = () => {
    setError(null);
    if (!isFinite(min) || !isFinite(max)) {
      setError("Min and Max must be valid numbers.");
      setNumbers([]);
      setGenerated(true);
      return;
    }
    if (min > max) {
      setError(`Min (${min}) must be ≤ Max (${max}).`);
      setNumbers([]);
      setGenerated(true);
      return;
    }
    if (count < 1) {
      setError("How many must be at least 1.");
      setNumbers([]);
      setGenerated(true);
      return;
    }

    let result: number[];
    if (unique) {
      if (count > span) {
        setError(
          `Cannot generate ${count} unique numbers from a range of only ${span} value${span === 1 ? "" : "s"} (${min}–${max}). Increase the range or disable "Unique".`,
        );
        setNumbers([]);
        setGenerated(true);
        return;
      }
      result = pickUnique(min, max, count);
    } else {
      result = Array.from({ length: count }, () =>
        randomIntInclusive(min, max),
      );
    }

    if (sortMode === "asc") result = [...result].sort((a, b) => a - b);
    if (sortMode === "desc") result = [...result].sort((a, b) => b - a);

    setNumbers(result);
    setGenerated(true);
  };

  return (
    <div className="space-y-6">
      <CalcCard title="Inputs">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Minimum">
            <TextInput
              type="number"
              value={minStr}
              onChange={(e) => setMinStr(e.target.value)}
              placeholder="1"
            />
          </Field>
          <Field label="Maximum">
            <TextInput
              type="number"
              value={maxStr}
              onChange={(e) => setMaxStr(e.target.value)}
              placeholder="100"
            />
          </Field>
          <Field label="How many">
            <TextInput
              type="number"
              value={countStr}
              onChange={(e) => setCountStr(e.target.value)}
              min={1}
              max={10000}
              placeholder="1"
            />
          </Field>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Unique?">
            <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-brand bg-brand-canvas px-3 py-2.5">
              <input
                type="checkbox"
                checked={unique}
                onChange={(e) => setUnique(e.target.checked)}
                className="h-4 w-4 rounded border-brand text-brand-accent-deep focus:ring-brand-accent/30"
              />
              <span className="text-sm text-brand-ink">
                No duplicates (unique numbers only)
              </span>
            </label>
          </Field>
          <Field label="Sort order">
            <div className="flex gap-1 rounded-lg border border-brand bg-brand-canvas p-1">
              {(["none", "asc", "desc"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSortMode(s)}
                  className={
                    "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
                    (sortMode === s
                      ? "bg-brand-accent-gradient text-white shadow-accent"
                      : "text-brand-muted hover:text-brand-ink")
                  }
                >
                  {s === "none" ? "As drawn" : s === "asc" ? "↑ Asc" : "↓ Desc"}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="mt-5">
          <CalcButton onClick={handleGenerate} className="w-full sm:w-auto">
            Generate {count > 1 ? `${count} numbers` : "a number"}
          </CalcButton>
        </div>
      </CalcCard>

      <CalcCard title="Results">
        {error ? (
          <div className="rounded-lg border border-dashed border-brand bg-accent/40 px-4 py-6 text-center text-sm font-medium text-brand-accent-deep">
            {error}
          </div>
        ) : !generated ? (
          <div className="rounded-lg border border-dashed border-brand bg-white px-4 py-6 text-center text-sm text-brand-muted">
            Set your range above and press Generate to draw random numbers.
          </div>
        ) : numbers.length === 0 ? (
          <div className="rounded-lg border border-dashed border-brand bg-white px-4 py-6 text-center text-sm text-brand-muted">
            No numbers were generated.
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-center justify-between text-xs text-brand-muted">
              <span>
                Range {min}–{max} · {unique ? "Unique" : "Duplicates allowed"}
                {sortMode !== "none" && ` · Sorted ${sortMode}`}
              </span>
              <span>{numbers.length} result(s)</span>
            </div>

            {numbers.length === 1 ? (
              <div className="rounded-xl bg-brand-accent-gradient p-6 text-center shadow-accent">
                <div className="text-xs font-medium text-white/80">
                  Random number
                </div>
                <div className="mt-1 font-mono text-4xl font-bold tracking-tight text-white tabular-nums">
                  {numbers[0]}
                </div>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto scroll-thin">
                <div className="flex flex-wrap gap-2">
                  {numbers.map((n, i) => (
                    <span
                      key={`${i}-${n}`}
                      className="rounded-lg border border-brand bg-brand-canvas px-3 py-1.5 font-mono text-sm font-semibold text-brand-ink tabular-nums"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {numbers.length > 1 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <SummaryStat
                  label="Min"
                  value={String(Math.min(...numbers))}
                />
                <SummaryStat
                  label="Max"
                  value={String(Math.max(...numbers))}
                />
                <SummaryStat
                  label="Mean"
                  value={(
                    numbers.reduce((s, n) => s + n, 0) / numbers.length
                  ).toFixed(2)}
                />
                <SummaryStat label="Count" value={String(numbers.length)} />
              </div>
            )}
          </>
        )}
      </CalcCard>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-brand bg-brand-canvas p-3">
      <div className="text-xs font-medium text-brand-muted">{label}</div>
      <div className="mt-1 font-mono text-sm font-semibold text-brand-ink tabular-nums">
        {value}
      </div>
    </div>
  );
}
