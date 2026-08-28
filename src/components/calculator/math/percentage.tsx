"use client";

import { useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtNum, parseNum } from "@/lib/format";

type Mode = "of" | "isWhat" | "change" | "incrDecr";

interface ModeDef {
  value: Mode;
  label: string;
  short: string;
}

const MODES: ModeDef[] = [
  { value: "of", label: "What is X% of Y?", short: "% of value" },
  { value: "isWhat", label: "X is what % of Y?", short: "% of total" },
  { value: "change", label: "% change from X to Y", short: "% change" },
  { value: "incrDecr", label: "Increase / decrease Y by X%", short: "± %" },
];

interface ModeResult {
  value: number;
  display: string;
  sub: string;
  formula: string;
  extra?: { label: string; value: string }[];
}

function compute(
  mode: Mode,
  a: string,
  b: string,
  sign: "up" | "down",
): ModeResult | null {
  const x = parseNum(a);
  const y = parseNum(b);

  if (mode === "of") {
    // What is X% of Y?  -> X/100 * Y
    const r = (x / 100) * y;
    return {
      value: r,
      display: fmtNum(r, 4),
      sub: `${fmtNum(x, 4)}% of ${fmtNum(y, 4)}`,
      formula: "(X ÷ 100) × Y = result",
    };
  }

  if (mode === "isWhat") {
    // X is what % of Y? -> X/Y*100
    if (y === 0) {
      return {
        value: NaN,
        display: "—",
        sub: "Cannot divide by 0",
        formula: "(X ÷ Y) × 100 = %",
      };
    }
    const r = (x / y) * 100;
    return {
      value: r,
      display: `${fmtNum(r, 4)}%`,
      sub: `${fmtNum(x, 4)} is ${fmtNum(r, 4)}% of ${fmtNum(y, 4)}`,
      formula: "(X ÷ Y) × 100 = %",
    };
  }

  if (mode === "change") {
    // % change from X to Y -> (Y-X)/X*100
    if (x === 0) {
      return {
        value: NaN,
        display: "—",
        sub: "Starting value (X) must be non-zero",
        formula: "((Y − X) ÷ X) × 100 = % change",
      };
    }
    const diff = y - x;
    const r = (diff / x) * 100;
    const dir = r > 0 ? "increase" : r < 0 ? "decrease" : "no change";
    const arrow = r > 0 ? "▲" : r < 0 ? "▼" : "—";
    return {
      value: r,
      display: `${arrow} ${fmtNum(Math.abs(r), 4)}% ${dir}`,
      sub: `${fmtNum(x, 4)} → ${fmtNum(y, 4)} (Δ ${fmtNum(diff, 4)})`,
      formula: "((Y − X) ÷ X) × 100 = % change",
      extra: [
        { label: "Absolute change", value: fmtNum(diff, 4) },
        {
          label: "Direction",
          value: r > 0 ? "Increase" : r < 0 ? "Decrease" : "No change",
        },
      ],
    };
  }

  // incrDecr: Increase/decrease Y by X%
  const factor = sign === "up" ? 1 + x / 100 : 1 - x / 100;
  const r = y * factor;
  const label = sign === "up" ? "Increase" : "Decrease";
  const arrow = sign === "up" ? "▲" : "▼";
  return {
    value: r,
    display: fmtNum(r, 4),
    sub: `${label} ${fmtNum(y, 4)} by ${fmtNum(x, 4)}% ${arrow}`,
    formula: `Y × (1 ${sign === "up" ? "+" : "−"} X÷100) = ${label.toLowerCase()}d value`,
    extra: [
      {
        label: "Multiplier",
        value: fmtNum(factor, 6),
      },
      {
        label: "Absolute change",
        value: fmtNum(r - y, 4),
      },
    ],
  };
}

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("20");
  const [b, setB] = useState("150");
  const [sign, setSign] = useState<"up" | "down">("up");

  const res = compute(mode, a, b, sign);

  return (
    <div className="space-y-6">
      <CalcCard title="Mode">
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMode(m.value)}
              className={
                "rounded-lg border border-brand px-3 py-1.5 text-sm font-medium transition-colors " +
                (mode === m.value
                  ? "bg-brand-accent-gradient text-white shadow-accent"
                  : "bg-white text-brand-ink hover:bg-accent/50")
              }
            >
              {m.label}
            </button>
          ))}
        </div>
      </CalcCard>

      <CalcCard title="Inputs">
        {mode === "of" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="X (percent)">
              <TextInput
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="20"
              />
            </Field>
            <Field label="Y (value)">
              <TextInput
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="150"
              />
            </Field>
          </div>
        )}

        {mode === "isWhat" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="X (part)">
              <TextInput
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="30"
              />
            </Field>
            <Field label="Y (total)">
              <TextInput
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="150"
              />
            </Field>
          </div>
        )}

        {mode === "change" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="X (original / from)">
              <TextInput
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="100"
              />
            </Field>
            <Field label="Y (new / to)">
              <TextInput
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="125"
              />
            </Field>
          </div>
        )}

        {mode === "incrDecr" && (
          <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
            <Field label="X (percent)">
              <TextInput
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="15"
              />
            </Field>
            <Field label="Y (value)">
              <TextInput
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="200"
              />
            </Field>
            <Field label="Direction">
              <div className="flex gap-1 rounded-lg border border-brand bg-brand-canvas p-1">
                <button
                  type="button"
                  onClick={() => setSign("up")}
                  className={
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
                    (sign === "up"
                      ? "bg-brand-accent-gradient text-white shadow-accent"
                      : "text-brand-muted hover:text-brand-ink")
                  }
                >
                  ▲ Increase
                </button>
                <button
                  type="button"
                  onClick={() => setSign("down")}
                  className={
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
                    (sign === "down"
                      ? "bg-brand-accent-gradient text-white shadow-accent"
                      : "text-brand-muted hover:text-brand-ink")
                  }
                >
                  ▼ Decrease
                </button>
              </div>
            </Field>
          </div>
        )}

        <p className="mt-4 text-xs text-brand-muted">
          <span className="font-semibold text-brand-ink">Formula: </span>
          {res?.formula ?? ""}
        </p>
      </CalcCard>

      <CalcCard title="Result">
        {res && (
          <>
            <ResultCard
              label={MODES.find((m) => m.value === mode)!.short}
              value={res.display}
              sub={res.sub}
            />
            {res.extra && res.extra.length > 0 && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {res.extra.map((e) => (
                  <div
                    key={e.label}
                    className="rounded-lg border border-brand bg-brand-canvas p-3"
                  >
                    <div className="text-xs font-medium text-brand-muted">
                      {e.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                      {e.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CalcCard>
    </div>
  );
}
