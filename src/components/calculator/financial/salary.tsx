"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, fmtNum, parseNum } from "@/lib/format";

export default function SalaryCalculator() {
  const [wage, setWage] = useState("28");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [adjustVacation, setAdjustVacation] = useState(true);

  const r = useMemo(() => {
    const w = parseNum(wage);
    const hpw = parseNum(hoursPerWeek);
    // Standard year: 52 weeks × hoursPerWeek
    // Adjusted year: subtract 2 weeks vacation + 10 holidays ≈ 4 weeks
    const weeks = adjustVacation ? 50 : 52;
    const annualHours = weeks * hpw;
    const annual = w * annualHours;
    const monthly = annual / 12;
    const weekly = w * hpw;
    const daily = hpw > 0 ? (w * hpw) / 5 : 0;
    return {
      w,
      hpw,
      weeks,
      annualHours,
      annual,
      monthly,
      weekly,
      daily,
    };
  }, [wage, hoursPerWeek, adjustVacation]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Wage Inputs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Hourly Wage">
              <TextInput
                type="text"
                inputMode="decimal"
                value={wage}
                onChange={(e) => setWage(e.target.value)}
              />
            </Field>
            <Field label="Hours per Week">
              <TextInput
                type="text"
                inputMode="decimal"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
              />
            </Field>
          </div>
          <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-brand-ink">
            <input
              type="checkbox"
              checked={adjustVacation}
              onChange={(e) => setAdjustVacation(e.target.checked)}
              className="h-4 w-4 accent-[#FF6A00]"
            />
            Subtract 2 weeks vacation + 10 holidays
            <span className="text-xs text-brand-muted">
              ({adjustVacation ? "50 weeks/yr" : "52 weeks/yr"})
            </span>
          </label>
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label="Annual Salary"
            value={fmtMoney(r.annual, { decimals: 0 })}
            sub={`${fmtNum(r.annualHours, 0)} hours worked / year`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Monthly"
              value={fmtMoney(r.monthly, { decimals: 0 })}
              highlight={false}
            />
            <ResultCard
              label="Bi-weekly"
              value={fmtMoney(r.weekly * 2, { decimals: 0 })}
              highlight={false}
            />
            <ResultCard
              label="Weekly"
              value={fmtMoney(r.weekly, { decimals: 0 })}
              highlight={false}
            />
            <ResultCard
              label="Daily (5-day wk)"
              value={fmtMoney(r.daily, { decimals: 0 })}
              highlight={false}
            />
          </div>
        </div>
      </div>

      <CalcCard title="Salary Conversions">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <Stat label="Hourly" value={fmtMoney(r.w, { decimals: 2 })} />
          <Stat label="Daily" value={fmtMoney(r.daily, { decimals: 0 })} />
          <Stat label="Weekly" value={fmtMoney(r.weekly, { decimals: 0 })} />
          <Stat label="Monthly" value={fmtMoney(r.monthly, { decimals: 0 })} />
          <Stat label="Annual" value={fmtMoney(r.annual, { decimals: 0 })} />
        </div>
        <p className="mt-3 text-xs text-brand-muted">
          Calculations assume a 5-day workweek. Annual salary uses{" "}
          {r.weeks} working weeks and {fmtNum(r.hpw, 0)} hours per week.
        </p>
      </CalcCard>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-brand bg-brand-canvas p-3 text-center">
      <div className="text-xs uppercase tracking-wide text-brand-muted">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tabular-nums text-brand-ink">
        {value}
      </div>
    </div>
  );
}
