"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, fmtNum, parseNum } from "@/lib/format";
import { LineChart } from "./_shared";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("35");
  const [retireAge, setRetireAge] = useState("65");
  const [savings, setSavings] = useState("50000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("7");

  const r = useMemo(() => {
    const start = parseNum(currentAge);
    const end = parseNum(retireAge);
    const years = Math.max(0, end - start);
    const months = years * 12;
    const monthlyRate = parseNum(rate) / 100 / 12;
    const P = parseNum(savings);
    const PMT = parseNum(monthly);
    let fv = P;
    if (months <= 0) {
      fv = P;
    } else if (monthlyRate === 0) {
      fv = P + PMT * months;
    } else if (monthlyRate <= -1) {
      fv = P;
    } else {
      const f = Math.pow(1 + monthlyRate, months);
      fv = isFinite(f) ? P * f + PMT * ((f - 1) / monthlyRate) : P;
    }
    if (!isFinite(fv)) fv = P;
    const totalContributions = PMT * months;
    const totalGrowth = fv - P - totalContributions;
    return { years, months, P, PMT, fv, totalContributions, totalGrowth };
  }, [currentAge, retireAge, savings, monthly, rate]);

  const chartData = useMemo(() => {
    const monthlyRate = parseNum(rate) / 100 / 12;
    const P = parseNum(savings);
    const PMT = parseNum(monthly);
    const data: number[] = [];
    const maxY = Math.min(r.years, 100);
    for (let y = 0; y <= maxY; y++) {
      const m = y * 12;
      let v = P;
      if (monthlyRate === 0) {
        v = P + PMT * m;
      } else if (monthlyRate > -1) {
        const f = Math.pow(1 + monthlyRate, m);
        v = isFinite(f) ? P * f + PMT * ((f - 1) / monthlyRate) : P;
      }
      if (!isFinite(v)) v = P;
      data.push(v);
    }
    return data;
  }, [rate, savings, monthly, r.years]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Your Plan">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Current Age">
              <TextInput
                type="text"
                inputMode="decimal"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
              />
            </Field>
            <Field label="Retirement Age">
              <TextInput
                type="text"
                inputMode="decimal"
                value={retireAge}
                onChange={(e) => setRetireAge(e.target.value)}
              />
            </Field>
            <Field label="Current Savings">
              <TextInput
                type="text"
                inputMode="decimal"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
              />
            </Field>
            <Field label="Monthly Contribution">
              <TextInput
                type="text"
                inputMode="decimal"
                value={monthly}
                onChange={(e) => setMonthly(e.target.value)}
              />
            </Field>
            <Field label="Expected Annual Return (%)">
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
            label="Future Value at Retirement"
            value={fmtMoney(r.fv)}
            sub={`Over ${fmtNum(r.years, 0)} years of saving`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Total Contributions"
              value={fmtMoney(r.P + r.totalContributions)}
              highlight={false}
            />
            <ResultCard
              label="Investment Growth"
              value={fmtMoney(r.totalGrowth)}
              highlight={false}
            />
          </div>
        </div>
      </div>

      <CalcCard title="Projected Growth">
        <LineChart data={chartData} />
        <div className="mt-2 flex justify-between text-xs text-brand-muted">
          <span>Year 0</span>
          <span>Year {fmtNum(r.years, 0)}</span>
        </div>
      </CalcCard>
    </div>
  );
}
