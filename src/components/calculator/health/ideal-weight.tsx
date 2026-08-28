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

const LB_PER_KG = 2.2046226218;
const IN_PER_CM = 0.3937007874;

type HeightUnit = "cm" | "ft";

interface Formula {
  key: string;
  name: string;
  year: string;
  // returns ideal weight in kg given gender and height (cm)
  calc: (gender: "male" | "female", heightCm: number) => number;
}

const FORMULAS: Formula[] = [
  {
    key: "hamwi",
    name: "Hamwi",
    year: "1964",
    calc: (g, h) => {
      const inches = h * IN_PER_CM;
      const over = Math.max(0, inches - 60); // inches over 5 ft
      return g === "male" ? 48.0 + 2.7 * over : 45.5 + 2.2 * over;
    },
  },
  {
    key: "devine",
    name: "Devine",
    year: "1974",
    calc: (g, h) => {
      const inches = h * IN_PER_CM;
      const over = Math.max(0, inches - 60);
      return g === "male" ? 50.0 + 2.3 * over : 45.5 + 2.3 * over;
    },
  },
  {
    key: "robinson",
    name: "Robinson",
    year: "1983",
    calc: (g, h) => {
      const inches = h * IN_PER_CM;
      const over = Math.max(0, inches - 60);
      return g === "male" ? 52.0 + 1.9 * over : 49.0 + 1.7 * over;
    },
  },
  {
    key: "miller",
    name: "Miller",
    year: "1983",
    calc: (g, h) => {
      const inches = h * IN_PER_CM;
      const over = Math.max(0, inches - 60);
      return g === "male" ? 56.2 + 1.41 * over : 53.1 + 1.36 * over;
    },
  },
];

function UnitToggle<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex shrink-0 rounded-lg border border-brand bg-brand-canvas p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
            (value === o.value
              ? "bg-white text-brand-ink shadow-sm"
              : "text-brand-muted hover:text-brand-ink")
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [heightCm, setHeightCm] = useState("175");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");

  const heightValCm =
    heightUnit === "cm"
      ? parseNum(heightCm)
      : (parseNum(heightFt) * 12 + parseNum(heightIn)) * 2.54;

  const fmtWeight = (kg: number) =>
    weightUnit === "kg"
      ? `${fmtNum(kg, 1)} kg`
      : `${fmtNum(kg * LB_PER_KG, 1)} lb`;

  const results = FORMULAS.map((f) => ({
    ...f,
    kg: f.calc(gender, heightValCm),
  }));

  const avgKg =
    results.reduce((acc, r) => acc + r.kg, 0) / results.length;
  const hasResult = heightValCm > 0;

  // Healthy BMI range (18.5-24.9) reference
  const bmiMinKg = 18.5 * Math.pow(heightValCm / 100, 2);
  const bmiMaxKg = 24.9 * Math.pow(heightValCm / 100, 2);

  return (
    <div className="space-y-6">
      <CalcCard title="Your details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Gender">
            <SelectInput
              value={gender}
              onChange={(e) => setGender(e.target.value as "male" | "female")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </SelectInput>
          </Field>

          <Field label="Height">
            <div className="flex gap-2">
              <UnitToggle
                value={heightUnit}
                onChange={setHeightUnit}
                options={[
                  { value: "cm", label: "cm" },
                  { value: "ft", label: "ft/in" },
                ]}
              />
              {heightUnit === "cm" ? (
                <TextInput
                  type="number"
                  min={0}
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="175"
                />
              ) : (
                <div className="flex flex-1 gap-2">
                  <TextInput
                    type="number"
                    min={0}
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    placeholder="ft"
                    aria-label="feet"
                  />
                  <TextInput
                    type="number"
                    min={0}
                    max={11}
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    placeholder="in"
                    aria-label="inches"
                  />
                </div>
              )}
            </div>
          </Field>

          <Field label="Display weight in">
            <div className="flex gap-2">
              <UnitToggle
                value={weightUnit}
                onChange={setWeightUnit}
                options={[
                  { value: "kg", label: "kg" },
                  { value: "lb", label: "lb" },
                ]}
              />
            </div>
          </Field>
        </div>
      </CalcCard>

      {hasResult && (
        <CalcCard title="Results">
          <ResultCard
            label="Average ideal weight"
            value={fmtWeight(avgKg)}
            sub={`Mean of Hamwi, Devine, Robinson & Miller formulas`}
          />

          <div className="mt-5 overflow-hidden rounded-lg border border-brand">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-brand-muted">
                  <th className="px-3 py-2 font-medium">Formula</th>
                  <th className="px-3 py-2 font-medium">Year</th>
                  <th className="px-3 py-2 text-right font-medium">Ideal weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-brand-ink">
                {results.map((r) => (
                  <tr key={r.key}>
                    <td className="px-3 py-2 font-medium">{r.name}</td>
                    <td className="px-3 py-2 text-brand-muted tabular-nums">
                      {r.year}
                    </td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums">
                      {fmtWeight(r.kg)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-brand-canvas">
                  <td className="px-3 py-2 font-semibold text-brand-ink">
                    Average
                  </td>
                  <td className="px-3 py-2 text-brand-muted">—</td>
                  <td className="px-3 py-2 text-right font-bold tabular-nums text-brand-accent-deep">
                    {fmtWeight(avgKg)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg border border-brand bg-brand-canvas p-3">
            <div className="text-xs font-medium text-brand-muted">
              Healthy BMI weight range (BMI 18.5 – 24.9)
            </div>
            <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
              {fmtWeight(bmiMinKg)} – {fmtWeight(bmiMaxKg)}
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-brand bg-brand-canvas p-3 text-xs leading-relaxed text-brand-muted">
            All four formulas are based on height and gender. They were
            originally derived from insurance mortality data and assume average
            body composition — your ideal weight may differ based on muscle
            mass, frame size and age. Treat results as a starting range, not a
            prescription.
          </div>
        </CalcCard>
      )}
    </div>
  );
}
