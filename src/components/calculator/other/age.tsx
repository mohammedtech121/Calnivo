"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  format,
  isValid,
  parse,
} from "date-fns";
import {
  CalcCard,
  CalcButton,
  Field,
  ResultCard,
  TextInput,
} from "@/components/calculator/CalculatorShell";
import { fmtNum } from "@/lib/format";

const DOW = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function todayStr(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export default function AgeCalculator() {
  const [birth, setBirth] = useState<string>("2000-01-01");
  const [ageAt, setAgeAt] = useState<string>(todayStr());

  const result = useMemo(() => {
    const b = parse(birth, "yyyy-MM-dd", new Date());
    const a = parse(ageAt, "yyyy-MM-dd", new Date());
    if (!isValid(b) || !isValid(a)) return null;
    if (a < b) return { error: "Age-at date must be on or after birth date." } as const;

    const years = differenceInYears(a, b);
    const afterYears = addMonths(b, years * 12);
    const months = differenceInMonths(a, afterYears);
    const afterMonths = addMonths(afterYears, months);
    const days = differenceInDays(a, afterMonths);

    const totalMonths = years * 12 + months;
    const totalDays = differenceInCalendarDays(a, b);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    const bornDow = DOW[b.getDay()];

    // Next birthday: same month/day as birth, but in the year after `a` (or this year if not yet passed)
    let nextBday = new Date(a.getFullYear(), b.getMonth(), b.getDate());
    if (nextBday <= a) {
      nextBday = new Date(a.getFullYear() + 1, b.getMonth(), b.getDate());
    }
    const daysToBday = differenceInCalendarDays(nextBday, a);
    const bdayDow = DOW[nextBday.getDay()];

    return {
      years,
      months,
      days,
      totalMonths,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      bornDow,
      daysToBday,
      bdayDow,
      nextBday: format(nextBday, "MMM d, yyyy"),
    };
  }, [birth, ageAt]);

  return (
    <div className="space-y-6">
      <CalcCard title="Inputs">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Birth Date">
            <TextInput
              type="date"
              value={birth}
              max={todayStr()}
              onChange={(e) => setBirth(e.target.value)}
            />
          </Field>
          <Field label="Age at Date">
            <TextInput
              type="date"
              value={ageAt}
              onChange={(e) => setAgeAt(e.target.value)}
            />
          </Field>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <CalcButton
            variant="secondary"
            onClick={() => setAgeAt(todayStr())}
            className="px-3 py-1.5 text-xs"
          >
            Use today
          </CalcButton>
        </div>
      </CalcCard>

      {!result ? (
        <CalcCard title="Results">
          <p className="text-sm text-brand-muted">Enter valid dates to see results.</p>
        </CalcCard>
      ) : "error" in result ? (
        <CalcCard title="Results">
          <p className="text-sm text-red-600">{result.error}</p>
        </CalcCard>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <ResultCard label="Years" value={String(result.years)} />
            <ResultCard label="Months" value={String(result.months)} />
            <ResultCard label="Days" value={String(result.days)} />
          </div>

          <CalcCard title="Totals">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Stat label="Total months" value={fmtNum(result.totalMonths, 0)} />
              <Stat label="Total weeks" value={fmtNum(result.totalWeeks, 0)} />
              <Stat label="Total days" value={fmtNum(result.totalDays, 0)} />
              <Stat label="Total hours" value={fmtNum(result.totalHours, 0)} />
              <Stat label="Total minutes" value={fmtNum(result.totalMinutes, 0)} />
              <Stat label="Born on" value={result.bornDow} />
            </div>
          </CalcCard>

          <CalcCard title="Next Birthday">
            <div className="grid gap-3 sm:grid-cols-3">
              <ResultCard
                label="Days to next birthday"
                value={String(result.daysToBday)}
                sub={`${result.nextBday} · ${result.bdayDow}`}
              />
              <Stat
                label="Next birthday"
                value={result.nextBday}
                hint={result.bdayDow}
              />
              <Stat
                label="Day of week"
                value={result.bdayDow}
                hint={result.bornDow === result.bdayDow ? "Same as birth day" : ""}
              />
            </div>
          </CalcCard>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-brand bg-white p-3">
      <div className="text-xs font-medium text-brand-muted">{label}</div>
      <div className="mt-1 text-lg font-semibold text-brand-ink tabular-nums">
        {value}
      </div>
      {hint && <div className="mt-0.5 text-xs text-brand-muted">{hint}</div>}
    </div>
  );
}
