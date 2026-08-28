"use client";

import { useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  SelectInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtNum, parseNum, clamp } from "@/lib/format";

type HeightUnit = "cm" | "ft";
type WeightUnit = "kg" | "lb";

const LB_PER_KG = 2.2046226218;

interface BmiRange {
  label: string;
  min: number;
  max: number;
  color: string;
}

const RANGES: BmiRange[] = [
  { label: "Underweight", min: 15, max: 18.5, color: "#FBBF24" },
  { label: "Normal", min: 18.5, max: 25, color: "#10B981" },
  { label: "Overweight", min: 25, max: 30, color: "#F4511E" },
  { label: "Obese", min: 30, max: 40, color: "#DC2626" },
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

export default function BMICalculator() {
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");

  const [heightCm, setHeightCm] = useState("175");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");

  const [weightKg, setWeightKg] = useState("70");
  const [weightLb, setWeightLb] = useState("154");

  const heightInCmVal =
    heightUnit === "cm"
      ? parseNum(heightCm)
      : (parseNum(heightFt) * 12 + parseNum(heightIn)) * 2.54;
  const weightInKgVal =
    weightUnit === "kg" ? parseNum(weightKg) : parseNum(weightLb) / LB_PER_KG;

  const heightM = heightInCmVal / 100;
  const bmi =
    heightM > 0 && weightInKgVal > 0 ? weightInKgVal / (heightM * heightM) : 0;

  const activeRange = RANGES.find((r) => bmi >= r.min && bmi < r.max);
  const category = !bmi
    ? "—"
    : bmi < 18.5
      ? "Underweight"
      : bmi < 25
        ? "Normal weight"
        : bmi < 30
          ? "Overweight"
          : "Obese";

  const healthyMinKg = 18.5 * heightM * heightM;
  const healthyMaxKg = 24.9 * heightM * heightM;

  const fmtWeight = (kg: number) =>
    weightUnit === "kg"
      ? `${fmtNum(kg, 1)} kg`
      : `${fmtNum(kg * LB_PER_KG, 1)} lb`;

  const scaleMin = 15;
  const scaleMax = 40;
  const markerPct = clamp(
    ((bmi - scaleMin) / (scaleMax - scaleMin)) * 100,
    0,
    100,
  );

  const hasResult = bmi > 0;

  return (
    <div className="space-y-6">
      <CalcCard title="Your details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Age">
            <TextInput
              type="number"
              min={0}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Field>
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

          <Field label="Weight">
            <div className="flex gap-2">
              <UnitToggle
                value={weightUnit}
                onChange={setWeightUnit}
                options={[
                  { value: "kg", label: "kg" },
                  { value: "lb", label: "lb" },
                ]}
              />
              {weightUnit === "kg" ? (
                <TextInput
                  type="number"
                  min={0}
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="70"
                />
              ) : (
                <TextInput
                  type="number"
                  min={0}
                  value={weightLb}
                  onChange={(e) => setWeightLb(e.target.value)}
                  placeholder="154"
                />
              )}
            </div>
          </Field>
        </div>
      </CalcCard>

      {hasResult && (
        <CalcCard title="Results">
          <ResultCard
            label="Your BMI"
            value={fmtNum(bmi, 1)}
            sub={`${category} · BMI prime ${fmtNum(bmi / 25, 2)}`}
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Healthy weight range
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {fmtWeight(healthyMinKg)} – {fmtWeight(healthyMaxKg)}
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                BMI 18.5 – 24.9 for your height
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Weight to lose / gain to reach normal
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {weightInKgVal < healthyMinKg
                  ? `${fmtWeight(healthyMinKg - weightInKgVal)} to gain`
                  : weightInKgVal > healthyMaxKg
                    ? `${fmtWeight(weightInKgVal - healthyMaxKg)} to lose`
                    : "Already in healthy range"}
              </div>
            </div>
          </div>

          {/* BMI Scale Bar */}
          <div className="mt-6">
            <div className="mb-2 flex items-baseline justify-between">
              <div className="text-xs font-medium text-brand-muted">
                BMI scale
              </div>
              <div className="text-xs text-brand-muted tabular-nums">
                {scaleMin} – {scaleMax}
              </div>
            </div>

            <div className="relative">
              {/* Marker triangle */}
              <div
                className="absolute -top-1 z-10 -translate-x-1/2"
                style={{ left: `${markerPct}%` }}
              >
                <div className="h-0 w-0 border-x-[6px] border-t-[7px] border-x-transparent border-t-brand-ink" />
              </div>

              <div className="relative h-5 w-full overflow-hidden rounded-lg">
                <div className="absolute inset-0 flex">
                  {RANGES.map((r) => (
                    <div
                      key={r.label}
                      style={{
                        backgroundColor: r.color,
                        width: `${((r.max - r.min) / (scaleMax - scaleMin)) * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Tick labels */}
              <div className="mt-1.5 flex justify-between text-xs text-brand-muted tabular-nums">
                {[15, 18.5, 25, 30, 40].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
              {RANGES.map((r) => (
                <div
                  key={r.label}
                  className={
                    "flex items-center gap-1.5 text-xs " +
                    (activeRange === r
                      ? "font-semibold text-brand-ink"
                      : "text-brand-muted")
                  }
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: r.color }}
                  />
                  {r.label}
                </div>
              ))}
            </div>
          </div>
        </CalcCard>
      )}
    </div>
  );
}
