"use client";

import { useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  SelectInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtNum, parseNum } from "@/lib/format";

type Op = "add" | "sub" | "mul" | "div";

const OPS: { value: Op; label: string; symbol: string }[] = [
  { value: "add", label: "Add (+)", symbol: "+" },
  { value: "sub", label: "Subtract (−)", symbol: "−" },
  { value: "mul", label: "Multiply (×)", symbol: "×" },
  { value: "div", label: "Divide (÷)", symbol: "÷" },
];

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

interface Reduced {
  num: number;
  den: number;
}

function reduce(num: number, den: number): Reduced {
  if (!isFinite(num) || !isFinite(den)) return { num: NaN, den: NaN };
  if (den === 0) return { num: NaN, den: 0 };
  const sign = den < 0 ? -1 : 1;
  const n = Math.round(Math.abs(num)) * sign;
  const d = Math.round(Math.abs(den));
  const g = gcd(n, d);
  return { num: n / g, den: d / g };
}

interface Step {
  title: string;
  detail: string;
}

interface CalcResult {
  raw: { num: number; den: number };
  reduced: Reduced;
  decimal: number;
  steps: Step[];
  error?: string;
}

function fmtFraction(n: number, d: number): string {
  if (!isFinite(n) || !isFinite(d)) return "—";
  if (d === 0) return "undefined (division by zero)";
  if (n === 0) return "0";
  if (d === 1) return `${n}`;
  const sign = n < 0 ? "-" : "";
  return `${sign}${Math.abs(n)}/${Math.abs(d)}`;
}

function compute(
  aNum: number,
  aDen: number,
  bNum: number,
  bDen: number,
  op: Op,
): CalcResult {
  const steps: Step[] = [];
  if (aDen === 0 || bDen === 0) {
    return {
      raw: { num: NaN, den: 0 },
      reduced: { num: NaN, den: 0 },
      decimal: NaN,
      steps,
      error: "Denominators must be non-zero.",
    };
  }

  let rawNum: number;
  let rawDen: number;

  if (op === "add" || op === "sub") {
    const opSym = op === "add" ? "+" : "−";
    const lcd = aDen * bDen;
    const aScaled = aNum * bDen;
    const bScaled = op === "add" ? bNum * aDen : -bNum * aDen;
    steps.push({
      title: `Find a common denominator`,
      detail: `LCD of ${aDen} and ${bDen} is ${lcd}.`,
    });
    steps.push({
      title: `Rewrite fractions`,
      detail: `${aNum}/${aDen} = (${aNum}×${bDen})/${aDen}×${bDen} = ${aScaled}/${lcd} and ${bNum}/${bDen} = (${bNum}×${aDen})/${bDen}×${aDen} = ${bNum * aDen}/${lcd}.`,
    });
    rawNum = aScaled + bScaled;
    rawDen = lcd;
    steps.push({
      title: `${opSym} the numerators`,
      detail: `${aScaled} ${opSym} ${bNum * aDen} = ${rawNum} over ${lcd}.`,
    });
  } else if (op === "mul") {
    steps.push({
      title: "Multiply numerators and denominators",
      detail: `(${aNum} × ${bNum}) / (${aDen} × ${bDen}) = ${aNum * bNum} / ${aDen * bDen}.`,
    });
    rawNum = aNum * bNum;
    rawDen = aDen * bDen;
  } else {
    // divide — multiply by the reciprocal
    if (bNum === 0) {
      return {
        raw: { num: NaN, den: 0 },
        reduced: { num: NaN, den: 0 },
        decimal: NaN,
        steps,
        error: "Cannot divide by a zero numerator (the second fraction is 0).",
      };
    }
    steps.push({
      title: "Multiply by the reciprocal",
      detail: `Reciprocal of ${bNum}/${bDen} is ${bDen}/${bNum}. So ${aNum}/${aDen} × ${bDen}/${bNum} = ${aNum * bDen}/${aDen * bNum}.`,
    });
    rawNum = aNum * bDen;
    rawDen = aDen * bNum;
  }

  const reduced = reduce(rawNum, rawDen);
  if (isFinite(reduced.num) && isFinite(reduced.den) && reduced.den !== 0) {
    const g = gcd(rawNum, rawDen);
    steps.push({
      title: "Reduce to lowest terms",
      detail: `GCD of ${rawNum} and ${rawDen} is ${g}. Divide both by ${g} → ${reduced.num}/${reduced.den}.`,
    });
  }

  const decimal = rawNum / rawDen;
  return {
    raw: { num: rawNum, den: rawDen },
    reduced,
    decimal,
    steps,
  };
}

export default function FractionCalculator() {
  const [aNum, setANum] = useState("1");
  const [aDen, setADen] = useState("2");
  const [bNum, setBNum] = useState("3");
  const [bDen, setBDen] = useState("4");
  const [op, setOp] = useState<Op>("add");

  const aN = parseNum(aNum);
  const aD = parseNum(aDen);
  const bN = parseNum(bNum);
  const bD = parseNum(bDen);

  const result = compute(aN, aD, bN, bD, op);
  const opSym = OPS.find((o) => o.value === op)!.symbol;

  return (
    <div className="space-y-6">
      <CalcCard title="Inputs">
        <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <FractionInput
            label="Fraction A"
            num={aNum}
            den={aDen}
            onNum={setANum}
            onDen={setADen}
          />

          <div className="flex flex-col gap-2">
            <Field label="Operation">
              <SelectInput
                value={op}
                onChange={(e) => setOp(e.target.value as Op)}
              >
                {OPS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <div className="hidden text-center text-2xl font-bold text-brand-accent-deep sm:block">
              {opSym}
            </div>
          </div>

          <FractionInput
            label="Fraction B"
            num={bNum}
            den={bDen}
            onNum={setBNum}
            onDen={setBDen}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {OPS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => setOp(o.value)}
              className={
                "rounded-lg border border-brand px-3 py-1.5 text-sm font-medium transition-colors " +
                (op === o.value
                  ? "bg-brand-accent-gradient text-white shadow-accent"
                  : "bg-white text-brand-ink hover:bg-accent/50")
              }
            >
              {o.symbol} {o.label}
            </button>
          ))}
        </div>
      </CalcCard>

      <CalcCard title="Results">
        {result.error ? (
          <div className="rounded-lg border border-dashed border-brand bg-accent/40 px-4 py-6 text-center text-sm font-medium text-brand-accent-deep">
            {result.error}
          </div>
        ) : (
          <>
            <ResultCard
              label={`${aNum}/${aDen} ${opSym} ${bNum}/${bDen} =`}
              value={fmtFraction(result.reduced.num, result.reduced.den)}
              sub={`Decimal ≈ ${fmtNum(result.decimal, 6)}`}
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Stat
                label="Unreduced"
                value={fmtFraction(result.raw.num, result.raw.den)}
              />
              <Stat
                label="Reduced"
                value={fmtFraction(result.reduced.num, result.reduced.den)}
              />
              <Stat
                label="Decimal"
                value={fmtNum(result.decimal, 6)}
              />
            </div>

            {result.steps.length > 0 && (
              <div className="mt-6">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Step-by-step working
                </div>
                <ol className="space-y-3">
                  {result.steps.map((s, i) => (
                    <li
                      key={i}
                      className="flex gap-3 rounded-lg border border-brand bg-brand-canvas p-3"
                    >
                      <span className="flex h-6 w-6 shrink-0 place-items-center justify-center rounded-full bg-brand-accent-gradient text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-brand-ink">
                          {s.title}
                        </div>
                        <div className="mt-0.5 text-xs leading-relaxed text-brand-muted">
                          {s.detail}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </>
        )}
      </CalcCard>
    </div>
  );
}

function FractionInput({
  label,
  num,
  den,
  onNum,
  onDen,
}: {
  label: string;
  num: string;
  den: string;
  onNum: (v: string) => void;
  onDen: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <TextInput
          type="number"
          value={num}
          onChange={(e) => onNum(e.target.value)}
          className="text-center"
          placeholder="numerator"
        />
        <span className="text-2xl font-bold text-brand-muted">/</span>
        <TextInput
          type="number"
          value={den}
          onChange={(e) => onDen(e.target.value)}
          className="text-center"
          placeholder="denominator"
        />
      </div>
    </Field>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-brand bg-brand-canvas p-3">
      <div className="text-xs font-medium text-brand-muted">{label}</div>
      <div className="mt-1 font-mono text-sm font-semibold text-brand-ink tabular-nums">
        {value}
      </div>
    </div>
  );
}
