"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  SelectInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, parseNum } from "@/lib/format";
import { LabeledLineChart } from "./_shared";
import { CopyResultButton } from "@/components/calculator/CopyResultButton";

const FREQ: Record<
  string,
  { label: string; n: number; continuous?: boolean }
> = {
  annual: { label: "Annually", n: 1 },
  semi: { label: "Semi-annually", n: 2 },
  quarterly: { label: "Quarterly", n: 4 },
  monthly: { label: "Monthly", n: 12 },
  daily: { label: "Daily", n: 365 },
  continuous: { label: "Continuous", n: Infinity },
};

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("6");
  const [freq, setFreq] = useState("monthly");
  const [years, setYears] = useState("10");
  const [monthlyContribution, setMonthlyContribution] = useState("200");

  const r = useMemo(() => {
    const P = parseNum(principal);
    const annualRate = parseNum(rate) / 100;
    const t = parseNum(years);
    const PMT = parseNum(monthlyContribution);
    const fInfo = FREQ[freq];
    const isContinuous = fInfo.continuous === true;
    let final = P;
    let principalTotal = P + PMT * 12 * t;

    if (isContinuous) {
      // P·e^(rt) + monthly contributions treated as continuous stream
      const ert = Math.exp(annualRate * t);
      if (isFinite(ert)) {
        final = P * ert;
        if (annualRate > 0 && PMT > 0) {
          final += PMT * 12 * ((ert - 1) / annualRate);
        } else if (PMT > 0) {
          final += PMT * 12 * t;
        }
      } else {
        final = P;
      }
    } else {
      const n = fInfo.n;
      if (n > 0 && annualRate > -n) {
        const periods = n * t;
        const periodRate = annualRate / n;
        const base = 1 + periodRate;
        if (base > 0 || Number.isInteger(periods)) {
          const f = Math.pow(base, periods);
          if (isFinite(f)) {
            final = P * f;
            // Monthly contributions compounded at the chosen frequency
            const pmtPerPeriod = (PMT * 12) / n;
            if (periodRate !== 0) {
              final += pmtPerPeriod * ((f - 1) / periodRate);
            } else {
              final += pmtPerPeriod * periods;
            }
          } else {
            final = P;
          }
        }
      }
    }
    if (!isFinite(final)) final = P;
    const interest = final - principalTotal;
    return { P, PMT, final, principalTotal, interest, t, isContinuous };
  }, [principal, rate, freq, years, monthlyContribution]);

  const chartPoints = useMemo(() => {
    const P = parseNum(principal);
    const annualRate = parseNum(rate) / 100;
    const t = Math.min(Math.round(parseNum(years)), 100); // cap iterations
    const PMT = parseNum(monthlyContribution);
    const fInfo = FREQ[freq];
    const pts: { x: string; y: number }[] = [];
    // Sample yearly; for long durations, sample every few years to avoid crowding.
    const step = t > 30 ? Math.ceil(t / 15) : 1;
    for (let y = 0; y <= t; y += step) {
      let v = P;
      if (fInfo.continuous === true) {
        const ert = Math.exp(annualRate * y);
        if (isFinite(ert)) {
          v = P * ert;
          if (annualRate > 0 && PMT > 0) v += PMT * 12 * ((ert - 1) / annualRate);
          else if (PMT > 0) v += PMT * 12 * y;
        }
      } else {
        const n = fInfo.n;
        if (n > 0 && annualRate > -n) {
          const periods = n * y;
          const periodRate = annualRate / n;
          const base = 1 + periodRate;
          if (base > 0 || Number.isInteger(periods)) {
            const f = Math.pow(base, periods);
            if (isFinite(f)) {
              v = P * f;
              const pmtPerPeriod = (PMT * 12) / n;
              if (periodRate !== 0) v += pmtPerPeriod * ((f - 1) / periodRate);
              else v += pmtPerPeriod * periods;
            }
          }
        }
      }
      if (!isFinite(v)) v = P;
      pts.push({ x: `Yr ${y}`, y: Math.round(v) });
    }
    return pts;
  }, [principal, rate, freq, years, monthlyContribution]);

  const copyText = useMemo(() => {
    return [
      "Calnivo Compound Interest Calculator",
      "",
      `Principal: ${fmtMoney(r.P)}`,
      `Annual Rate: ${parseNum(rate)}%`,
      `Compounding: ${r.isContinuous ? "Continuous" : FREQ[freq].label}`,
      `Years: ${r.t}`,
      r.PMT ? `Monthly Contribution: ${fmtMoney(r.PMT)}` : "",
      "",
      `Final Balance: ${fmtMoney(r.final)}`,
      `Total Principal: ${fmtMoney(r.principalTotal)}`,
      `Total Interest: ${fmtMoney(r.interest)}`,
      "",
      "Projected value, not guaranteed. Calculated with Calnivo",
      "https://calnivocalc.com/calculators/compound-interest",
    ].filter(Boolean).join("\n");
  }, [r, rate, freq]);

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
            <Field label="Annual Interest Rate (%)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Field>
            <Field label="Compounding Frequency">
              <SelectInput value={freq} onChange={(e) => setFreq(e.target.value)}>
                <option value="annual">Annually</option>
                <option value="semi">Semi-annually</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
                <option value="continuous">Continuous</option>
              </SelectInput>
            </Field>
            <Field label="Years">
              <TextInput
                type="text"
                inputMode="decimal"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </Field>
            <Field label="Monthly Contribution (optional)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />
            </Field>
          </div>
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label="Final Balance"
            value={fmtMoney(r.final)}
            sub={`${r.isContinuous ? "Continuously" : FREQ[freq].label + " compounded"} • ${r.t} yrs`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Total Principal"
              value={fmtMoney(r.principalTotal)}
              highlight={false}
            />
            <ResultCard
              label="Total Interest"
              value={fmtMoney(r.interest)}
              highlight={false}
            />
          </div>
          <div className="flex justify-end">
            <CopyResultButton getText={() => copyText} disabled={!isFinite(r.final)} />
          </div>
        </div>
      </div>

      {chartPoints.length > 1 && (
        <CalcCard title="Account value over time">
          <p className="mb-3 text-sm text-brand-muted">
            Projected growth of your <strong className="text-brand-ink">{fmtMoney(r.principalTotal)}</strong> in
            contributions to <strong className="text-brand-ink">{fmtMoney(r.final)}</strong> over {r.t} years —
            earning <strong className="text-brand-ink">{fmtMoney(r.interest)}</strong> in interest. Projected value, not guaranteed.
          </p>
          <LabeledLineChart
            points={chartPoints}
            yLabel="Value ($)"
            formatY={(n) => (n >= 1000 ? "$" + Math.round(n / 1000) + "k" : "$" + Math.round(n))}
          />
        </CalcCard>
      )}
    </div>
  );
}
