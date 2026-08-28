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

export default function InvestmentCalculator() {
  const [initial, setInitial] = useState("10000");
  const [monthly, setMonthly] = useState("250");
  const [years, setYears] = useState("20");
  const [rate, setRate] = useState("8");

  const r = useMemo(() => {
    const P = parseNum(initial);
    const PMT = parseNum(monthly);
    const y = parseNum(years);
    const months = y * 12;
    const monthlyRate = parseNum(rate) / 100 / 12;
    let fv = P;
    if (monthlyRate === 0) {
      fv = P + PMT * months;
    } else {
      const f = Math.pow(1 + monthlyRate, months);
      fv = P * f + PMT * ((f - 1) / monthlyRate);
    }
    const invested = P + PMT * months;
    const earnings = fv - invested;
    return { P, PMT, months, y, fv, invested, earnings };
  }, [initial, monthly, years, rate]);

  const chartData = useMemo(() => {
    const P = parseNum(initial);
    const PMT = parseNum(monthly);
    const monthlyRate = parseNum(rate) / 100 / 12;
    const y = parseNum(years);
    const data: number[] = [];
    for (let i = 0; i <= y; i++) {
      const m = i * 12;
      if (monthlyRate === 0) {
        data.push(P + PMT * m);
      } else {
        const f = Math.pow(1 + monthlyRate, m);
        data.push(P * f + PMT * ((f - 1) / monthlyRate));
      }
    }
    return data;
  }, [initial, monthly, rate, years]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Investment Inputs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Initial Investment">
              <TextInput
                type="text"
                inputMode="decimal"
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
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
            <Field label="Years">
              <TextInput
                type="text"
                inputMode="decimal"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </Field>
            <Field label="Expected Return (% / yr)">
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
            label="Future Value"
            value={fmtMoney(r.fv)}
            sub={`After ${fmtNum(r.y, 0)} years`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Total Invested"
              value={fmtMoney(r.invested)}
              highlight={false}
            />
            <ResultCard
              label="Total Earnings"
              value={fmtMoney(r.earnings)}
              highlight={false}
            />
          </div>
        </div>
      </div>

      <CalcCard title="Growth Over Time">
        <LineChart data={chartData} />
        <div className="mt-2 flex justify-between text-xs text-brand-muted">
          <span>Today</span>
          <span>Year {fmtNum(r.y, 0)}</span>
        </div>
      </CalcCard>
    </div>
  );
}
