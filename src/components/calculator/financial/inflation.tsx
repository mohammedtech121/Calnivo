"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, fmtPct, parseNum } from "@/lib/format";

export default function InflationCalculator() {
  const [amount, setAmount] = useState("10000");
  const [years, setYears] = useState("10");
  const [rate, setRate] = useState("3");

  const r = useMemo(() => {
    const a = parseNum(amount);
    const n = parseNum(years);
    const i = parseNum(rate) / 100;
    let factor = 0;
    if (i <= -1) {
      // Pathological deflation — value goes to 0 (purchasing power → ∞)
      factor = 0;
    } else if (i === 0) {
      factor = 1;
    } else {
      const base = 1 + i;
      if (base > 0 || Number.isInteger(n)) {
        factor = Math.pow(base, n);
        if (!isFinite(factor)) factor = base > 1 ? Number.MAX_VALUE : 0;
      } else {
        factor = 0;
      }
    }
    const futureCost = a * factor;
    // When factor is 0 (100% deflation), purchasing power is effectively unbounded.
    // Display the original amount as a safe proxy: at 100% deflation prices went to 0,
    // so $a today still buys $a worth of goods at the new (zero) price level.
    const purchasingPower =
      factor > 0 ? a / factor : a;
    const realValueLoss = factor > 0 ? (1 - 1 / factor) * 100 : -Infinity;
    return { a, n, i, factor, futureCost, purchasingPower, realValueLoss };
  }, [amount, years, rate]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Inputs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Current Amount">
              <TextInput
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Field>
            <Field label="Years">
              <TextInput
                type="text"
                inputMode="decimal"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </Field>
            <Field label="Inflation Rate (% / yr)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Field>
          </div>
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label="Future Cost (same goods)"
            value={fmtMoney(r.futureCost)}
            sub={`In ${r.n} years at ${fmtPct(r.i * 100)} inflation`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Purchasing Power"
              value={fmtMoney(r.purchasingPower)}
              highlight={false}
            />
            <ResultCard
              label="Real Value Loss"
              value={fmtPct(r.realValueLoss)}
              highlight={false}
            />
          </div>
        </div>
      </div>

      <CalcCard title="What This Means">
        <div className="space-y-3 text-sm leading-relaxed text-brand-muted">
          <p>
            An item costing{" "}
            <span className="font-medium text-brand-ink">{fmtMoney(r.a)}</span>{" "}
            today will likely cost{" "}
            <span className="font-medium text-brand-ink">
              {fmtMoney(r.futureCost)}
            </span>{" "}
            in {r.n} years if prices rise at {fmtPct(r.i * 100)} per year.
          </p>
          <p>
            Conversely, {fmtMoney(r.a)} you stash under the mattress today would
            have the buying power of just{" "}
            <span className="font-medium text-brand-ink">
              {fmtMoney(r.purchasingPower)}
            </span>{" "}
            after the same period.
          </p>
        </div>
      </CalcCard>
    </div>
  );
}
