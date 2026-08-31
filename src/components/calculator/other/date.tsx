"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  differenceInCalendarDays,
  differenceInMonths,
  differenceInYears,
  format,
  isValid,
  parse,
} from "date-fns";
import {
  CalcCard,
  Field,
  ResultCard,
  SelectInput,
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

function todayStr() {
  return format(new Date(), "yyyy-MM-dd");
}

type Unit = "days" | "weeks" | "months" | "years";
type Mode = "add" | "duration";

export default function DateCalculator() {
  const [mode, setMode] = useState<Mode>("add");

  return (
    <div className="space-y-6">
      <CalcCard title="Mode">
        <div className="inline-flex rounded-lg border border-brand bg-brand-canvas p-1">
          {(["add", "duration"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={
                "rounded-md px-4 py-1.5 text-sm font-medium transition-colors " +
                (mode === m
                  ? "bg-brand-accent-gradient text-white shadow-accent"
                  : "text-brand-muted hover:text-brand-ink")
              }
            >
              {m === "add" ? "Add / Subtract" : "Duration between"}
            </button>
          ))}
        </div>
      </CalcCard>

      {mode === "add" ? <AddMode /> : <DurationMode />}
    </div>
  );
}

function AddMode() {
  const [start, setStart] = useState<string>("2024-01-01");
  const [amount, setAmount] = useState<string>("30");
  const [unit, setUnit] = useState<Unit>("days");
  const [dir, setDir] = useState<"add" | "sub">("add");

  const result = useMemo(() => {
    if (!start) return null;
    const d = parse(start, "yyyy-MM-dd", new Date());
    if (!isValid(d)) return null;
    const n = parseInt(amount || "0", 10);
    if (!isFinite(n)) return null;
    const signed = dir === "add" ? n : -n;
    let r = d;
    if (unit === "days") r = addDays(d, signed);
    else if (unit === "weeks") r = addWeeks(d, signed);
    else if (unit === "months") r = addMonths(d, signed);
    else r = addYears(d, signed);
    if (!isValid(r)) return null;
    return { date: r, dow: DOW[r.getDay()] };
  }, [start, amount, unit, dir]);

  return (
    <>
      <CalcCard title="Inputs">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Start Date">
            <TextInput
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </Field>
          <Field label="Direction">
            <SelectInput
              value={dir}
              onChange={(e) => setDir(e.target.value as "add" | "sub")}
            >
              <option value="add">Add (+)</option>
              <option value="sub">Subtract (−)</option>
            </SelectInput>
          </Field>
          <Field label="Amount">
            <TextInput
              type="number"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Field>
          <Field label="Unit">
            <SelectInput
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </SelectInput>
          </Field>
        </div>
      </CalcCard>

      <CalcCard title="Result">
        {!result ? (
          <p className="text-sm text-brand-muted">Enter a valid start date.</p>
        ) : (
          <ResultCard
            label="Resulting date"
            value={format(result.date, "MMM d, yyyy")}
            sub={`${result.dow} · ${format(result.date, "yyyy-MM-dd")}`}
          />
        )}
      </CalcCard>
    </>
  );
}

function DurationMode() {
  const [start, setStart] = useState<string>("2024-01-01");
  const [end, setEnd] = useState<string>("2024-12-31");

  const result = useMemo(() => {
    if (!start || !end) return null;
    const a = parse(start, "yyyy-MM-dd", new Date());
    const b = parse(end, "yyyy-MM-dd", new Date());
    if (!isValid(a) || !isValid(b)) return null;

    // Order so a <= b
    const lo = a <= b ? a : b;
    const hi = a <= b ? b : a;
    const totalDays = differenceInCalendarDays(hi, lo);
    const totalWeeks = Math.floor(totalDays / 7);
    const remDays = totalDays - totalWeeks * 7;

    const months = differenceInMonths(hi, lo);
    const afterMonths = addMonths(lo, months);
    const extraDays = differenceInCalendarDays(hi, afterMonths);

    const years = differenceInYears(hi, lo);
    const afterYears = addMonths(lo, years * 12);
    const remMonths = differenceInMonths(hi, afterYears);
    const afterRemMonths = addMonths(afterYears, remMonths);
    const remDaysY = differenceInCalendarDays(hi, afterRemMonths);

    // Business days (Mon-Fri) inclusive of both endpoints — computed via O(1) math
    // rather than eachDayOfInterval to handle arbitrarily large ranges safely.
    const businessDays = countBusinessDays(lo, hi);

    return {
      totalDays,
      totalWeeks,
      remDays,
      months,
      extraDays,
      years,
      remMonths,
      remDaysY,
      businessDays,
      dowStart: DOW[lo.getDay()],
      dowEnd: DOW[hi.getDay()],
    };
  }, [start, end]);

  return (
    <>
      <CalcCard title="Inputs">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Start Date">
            <TextInput
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </Field>
          <Field label="End Date">
            <TextInput
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </Field>
        </div>
      </CalcCard>

      <CalcCard title="Duration">
        {!result ? (
          <p className="text-sm text-brand-muted">Enter valid dates.</p>
        ) : (
          <div className="space-y-3">
            <ResultCard
              label="Total days"
              value={fmtNum(result.totalDays, 0)}
              sub={`${result.dowStart} → ${result.dowEnd}`}
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Stat
                label="Weeks + days"
                value={`${fmtNum(result.totalWeeks, 0)} wk ${result.remDays} d`}
              />
              <Stat
                label="Months + days"
                value={`${result.months} mo ${result.extraDays} d`}
              />
              <Stat
                label="Years + months + days"
                value={`${result.years} yr ${result.remMonths} mo ${result.remDaysY} d`}
              />
              <Stat label="Business days (Mon–Fri)" value={fmtNum(result.businessDays, 0)} />
              <Stat
                label="Weekend days"
                value={fmtNum(result.totalDays + 1 - result.businessDays, 0)}
              />
              <Stat
                label="Hours"
                value={fmtNum((result.totalDays + 1) * 24, 0)}
              />
            </div>
          </div>
        )}
      </CalcCard>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-brand bg-white p-3">
      <div className="text-xs font-medium text-brand-muted">{label}</div>
      <div className="mt-1 text-base font-semibold text-brand-ink tabular-nums">
        {value}
      </div>
    </div>
  );
}

/**
 * Count Mon-Fri weekdays in the inclusive [lo, hi] interval using O(1) math.
 * Mirrors the inclusive semantics of date-fns `eachDayOfInterval({start:lo,end:hi})`
 * so the displayed weekend count (= (totalDays + 1) - businessDays) remains correct.
 */
function countBusinessDays(lo: Date, hi: Date): number {
  if (lo > hi) return 0;
  const totalDaysInclusive = differenceInCalendarDays(hi, lo) + 1;
  const fullWeeks = Math.floor(totalDaysInclusive / 7);
  const remainder = totalDaysInclusive % 7;
  let businessDays = fullWeeks * 5;
  // lo.getDay(): 0=Sun, 1=Mon, ... 6=Sat
  for (let i = 0; i < remainder; i++) {
    const dow = (lo.getDay() + i) % 7;
    if (dow !== 0 && dow !== 6) businessDays += 1;
  }
  return businessDays;
}
