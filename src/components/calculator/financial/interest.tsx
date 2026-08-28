"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  SelectInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, fmtPct, parseNum } from "@/lib/format";

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("5");
  const [mode, setMode] = useState<"simple" | "compound">("compound");
  const [freq, setFreq] = useState("12");

  const r = useMemo(() => {
    const P = parseNum(principal);
    const annualRate = parseNum(rate) / 100;
    const t = parseNum(years);
    let total = P;
    let interest = 0;
    if (mode === "simple") {
      interest = P * annualRate * t;
      total = P + interest;
    } else {
      const n = parseNum(freq);
      total = P * Math.pow(1 + annualRate / n, n * t);
      interest = total - P;
    }
    return { P, total, interest };
  }, [principal, rate, years, mode, freq]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Inputs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Principal">
              <TextInput
                type="text"
                inputMode="decimal"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </Field>
            <Field label="Interest Rate (% / yr)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Field>
            <Field label="Time (years)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </Field>
            <Field label="Interest Type">
              <SelectInput
                value={mode}
                onChange={(e) => setMode(e.target.value as "simple" | "compound")}
              >
                <option value="simple">Simple Interest</option>
                <option value="compound">Compound Interest</option>
              </SelectInput>
            </Field>
            {mode === "compound" && (
              <Field label="Compounding Frequency">
                <SelectInput value={freq} onChange={(e) => setFreq(e.target.value)}>
                  <option value="1">Annually</option>
                  <option value="2">Semi-annually</option>
                  <option value="4">Quarterly</option>
                  <option value="12">Monthly</option>
                  <option value="365">Daily</option>
                </SelectInput>
              </Field>
            )}
          </div>
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label="Total Amount"
            value={fmtMoney(r.total)}
            sub={`Principal ${fmtMoney(r.P)} + interest ${fmtMoney(r.interest)}`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Interest Earned"
              value={fmtMoney(r.interest)}
              highlight={false}
            />
            <ResultCard
              label="Return on Principal"
              value={r.P > 0 ? fmtPct((r.interest / r.P) * 100) : "0%"}
              highlight={false}
            />
          </div>
        </div>
      </div>

      <CalcCard title="How It Works">
        <div className="space-y-2 text-sm leading-relaxed text-brand-muted">
          {mode === "simple" ? (
            <p>
              <span className="font-medium text-brand-ink">Simple interest</span>{" "}
              grows linearly: <span className="font-mono">I = P × r × t</span>.
              The principal stays flat and interest accrues at the same nominal
              rate each year.
            </p>
          ) : (
            <p>
              <span className="font-medium text-brand-ink">Compound interest</span>{" "}
              reinvests each period&apos;s interest:{" "}
              <span className="font-mono">A = P × (1 + r/n)^(n·t)</span>, where{" "}
              <span className="font-mono">n</span> is the number of compounding
              periods per year.
            </p>
          )}
        </div>
      </CalcCard>
    </div>
  );
}
