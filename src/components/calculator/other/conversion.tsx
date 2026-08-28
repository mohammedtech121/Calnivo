"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import {
  CalcCard,
  Field,
  ResultCard,
  SelectInput,
  TextInput,
} from "@/components/calculator/CalculatorShell";
import { fmtNum, parseNum } from "@/lib/format";

type Category = "length" | "weight" | "temperature" | "volume" | "speed";

// All conversions defined "to base unit" then back out.
interface Unit {
  id: string;
  label: string;
  // For linear categories: factor to multiply by to convert this unit → base unit.
  // For temperature, we instead use functions.
  toBase?: (v: number) => number;
  fromBase?: (v: number) => number;
  factor?: number;
}

const LENGTH: Unit[] = [
  { id: "m", label: "Meter (m)", factor: 1 },
  { id: "km", label: "Kilometer (km)", factor: 1000 },
  { id: "cm", label: "Centimeter (cm)", factor: 0.01 },
  { id: "mm", label: "Millimeter (mm)", factor: 0.001 },
  { id: "mi", label: "Mile (mi)", factor: 1609.344 },
  { id: "yd", label: "Yard (yd)", factor: 0.9144 },
  { id: "ft", label: "Foot (ft)", factor: 0.3048 },
  { id: "in", label: "Inch (in)", factor: 0.0254 },
];

const WEIGHT: Unit[] = [
  { id: "kg", label: "Kilogram (kg)", factor: 1 },
  { id: "g", label: "Gram (g)", factor: 0.001 },
  { id: "mg", label: "Milligram (mg)", factor: 1e-6 },
  { id: "lb", label: "Pound (lb)", factor: 0.45359237 },
  { id: "oz", label: "Ounce (oz)", factor: 0.028349523125 },
  { id: "t", label: "Metric tonne (t)", factor: 1000 },
];

const VOLUME: Unit[] = [
  { id: "L", label: "Liter (L)", factor: 1 },
  { id: "mL", label: "Milliliter (mL)", factor: 0.001 },
  { id: "gal", label: "US Gallon (gal)", factor: 3.785411784 },
  { id: "qt", label: "US Quart (qt)", factor: 0.946352946 },
  { id: "pt", label: "US Pint (pt)", factor: 0.473176473 },
  { id: "cup", label: "US Cup", factor: 0.2365882365 },
  { id: "floz", label: "US Fluid Ounce (fl oz)", factor: 0.0295735295625 },
];

const SPEED: Unit[] = [
  { id: "mps", label: "Meter / second (m/s)", factor: 1 },
  { id: "kmh", label: "Kilometer / hour (km/h)", factor: 1 / 3.6 },
  { id: "mph", label: "Mile / hour (mph)", factor: 0.44704 },
  { id: "knot", label: "Knot (kn)", factor: 0.514444444 },
];

// Temperature uses offsets and scale; base unit = Celsius.
const TEMP: Unit[] = [
  {
    id: "C",
    label: "Celsius (°C)",
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  {
    id: "F",
    label: "Fahrenheit (°F)",
    toBase: (v) => ((v - 32) * 5) / 9,
    fromBase: (v) => (v * 9) / 5 + 32,
  },
  {
    id: "K",
    label: "Kelvin (K)",
    toBase: (v) => v - 273.15,
    fromBase: (v) => v + 273.15,
  },
];

const CATEGORY_UNITS: Record<Category, Unit[]> = {
  length: LENGTH,
  weight: WEIGHT,
  temperature: TEMP,
  volume: VOLUME,
  speed: SPEED,
};

const CATEGORY_LABELS: Record<Category, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  volume: "Volume",
  speed: "Speed",
};

function convert(value: number, from: Unit, to: Unit): number {
  if (from.factor !== undefined && to.factor !== undefined) {
    const base = value * from.factor;
    return base / to.factor;
  }
  // temperature
  const base = (from.toBase as (v: number) => number)(value);
  return (to.fromBase as (v: number) => number)(base);
}

export default function ConversionCalculator() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState<string>("1");
  const [fromId, setFromId] = useState<string>("m");
  const [toId, setToId] = useState<string>("ft");

  const units = CATEGORY_UNITS[category];
  const from = units.find((u) => u.id === fromId) ?? units[0];
  const to = units.find((u) => u.id === toId) ?? units[1];

  const inputNum = parseNum(value);
  const result = useMemo(() => convert(inputNum, from, to), [inputNum, from, to]);

  // When switching category, reset unit selections to the first two of that category.
  function changeCategory(c: Category) {
    setCategory(c);
    const us = CATEGORY_UNITS[c];
    setFromId(us[0].id);
    setToId(us[1].id);
  }

  function swap() {
    setFromId(toId);
    setToId(fromId);
  }

  // Build a "common conversions" preview table
  const preview = useMemo(
    () =>
      units.map((u) => ({
        unit: u,
        value: convert(inputNum, from, u),
      })),
    [units, inputNum, from],
  );

  return (
    <div className="space-y-6">
      <CalcCard title="Inputs">
        <Field label="Category">
          <div className="flex flex-wrap gap-1">
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
              <button
                key={c}
                onClick={() => changeCategory(c)}
                className={
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors " +
                  (category === c
                    ? "bg-brand-accent-gradient text-white shadow-accent"
                    : "border border-brand bg-white text-brand-muted hover:bg-accent/50 hover:text-brand-ink")
                }
              >
                {CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
        </Field>

        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div className="space-y-3">
            <Field label="From value">
              <TextInput
                type="number"
                inputMode="decimal"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="tabular-nums"
              />
            </Field>
            <Field label="From unit">
              <SelectInput
                value={fromId}
                onChange={(e) => setFromId(e.target.value)}
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </SelectInput>
            </Field>
          </div>

          <button
            onClick={swap}
            className="mx-auto mb-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand bg-white text-brand-muted shadow-brand hover:bg-accent/50 hover:text-brand-ink"
            aria-label="Swap units"
            title="Swap units"
          >
            <ArrowDownUp className="h-4 w-4" />
          </button>

          <div className="space-y-3">
            <Field label="To value (read-only)">
              <TextInput
                readOnly
                value={fmtNum(result, 8)}
                className="tabular-nums font-semibold text-brand-accent-deep"
              />
            </Field>
            <Field label="To unit">
              <SelectInput
                value={toId}
                onChange={(e) => setToId(e.target.value)}
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </SelectInput>
            </Field>
          </div>
        </div>
      </CalcCard>

      <CalcCard title="Result">
        <ResultCard
          label={`${fmtNum(inputNum, 6)} ${from?.label ?? ""}`}
          value={`${fmtNum(result, 6)}`}
          sub={`= ${to?.label ?? ""}`}
        />
      </CalcCard>

      <CalcCard title="All Conversions">
        <div className="overflow-hidden rounded-lg border border-brand">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left text-xs font-medium uppercase tracking-wide text-brand-muted">
                <th className="px-3 py-2">Unit</th>
                <th className="px-3 py-2 text-right tabular-nums">Value</th>
              </tr>
            </thead>
            <tbody>
              {preview.map(({ unit, value: v }) => (
                <tr
                  key={unit.id}
                  className={
                    "border-t border-brand " +
                    (unit.id === to?.id ? "bg-accent/30" : "")
                  }
                >
                  <td className="px-3 py-2 text-brand-ink">{unit.label}</td>
                  <td className="px-3 py-2 text-right font-semibold tabular-nums text-brand-ink">
                    {fmtNum(v, 8)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CalcCard>
    </div>
  );
}
