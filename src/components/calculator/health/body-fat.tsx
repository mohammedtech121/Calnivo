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

type LengthUnit = "cm" | "in";

const IN_PER_CM = 0.3937007874;

interface BfRange {
  label: string;
  min: number;
  max: number;
  color: string;
}

const MEN_RANGES: BfRange[] = [
  { label: "Essential", min: 2, max: 5, color: "#0EA5A4" },
  { label: "Athlete", min: 5, max: 13, color: "#10B981" },
  { label: "Fitness", min: 13, max: 17, color: "#84CC16" },
  { label: "Average", min: 17, max: 25, color: "#F4511E" },
  { label: "Obese", min: 25, max: 50, color: "#DC2626" },
];

const WOMEN_RANGES: BfRange[] = [
  { label: "Essential", min: 10, max: 13, color: "#0EA5A4" },
  { label: "Athlete", min: 13, max: 20, color: "#10B981" },
  { label: "Fitness", min: 20, max: 24, color: "#84CC16" },
  { label: "Average", min: 24, max: 31, color: "#F4511E" },
  { label: "Obese", min: 31, max: 50, color: "#DC2626" },
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

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("30");
  const [heightCm, setHeightCm] = useState("175");
  const [heightIn, setHeightIn] = useState("69");
  const [heightUnit, setHeightUnit] = useState<LengthUnit>("cm");

  const [neckCm, setNeckCm] = useState("38");
  const [neckIn, setNeckIn] = useState("15");
  const [waistCm, setWaistCm] = useState("85");
  const [waistIn, setWaistIn] = useState("33.5");
  const [hipCm, setHipCm] = useState("95");
  const [hipIn, setHipIn] = useState("37.4");

  const [circUnit, setCircUnit] = useState<LengthUnit>("cm");

  const toCm = (cm: string, inches: string, unit: LengthUnit) =>
    unit === "cm" ? parseNum(cm) : parseNum(inches) / IN_PER_CM;

  const heightValCm = toCm(heightCm, heightIn, heightUnit);
  const neckValCm = toCm(neckCm, neckIn, circUnit);
  const waistValCm = toCm(waistCm, waistIn, circUnit);
  const hipValCm = toCm(hipCm, hipIn, circUnit);

  const log10 = (n: number) => Math.log(n) / Math.LN10;

  let bfPct = NaN;
  let bfError = "";

  if (heightValCm > 0 && neckValCm > 0 && waistValCm > 0) {
    if (gender === "male") {
      const diff = waistValCm - neckValCm;
      if (diff > 0) {
        const denom =
          1.0324 -
          0.19077 * log10(diff) +
          0.15456 * log10(heightValCm);
        bfPct = 495 / denom - 450;
      } else {
        bfError = "Waist must be larger than neck circumference.";
      }
    } else {
      const sum = waistValCm + hipValCm - neckValCm;
      if (sum > 0 && hipValCm > 0) {
        const denom =
          1.29579 -
          0.35004 * log10(sum) +
          0.221 * log10(heightValCm);
        bfPct = 495 / denom - 450;
      } else {
        bfError = "Waist + hip must be larger than neck circumference.";
      }
    }
  }

  const bfClamped = isFinite(bfPct) ? clamp(bfPct, 0, 60) : NaN;
  const ranges = gender === "male" ? MEN_RANGES : WOMEN_RANGES;
  const activeRange = ranges.find((r) => bfClamped >= r.min && bfClamped < r.max);

  // Mass estimates (need weight for lean/fat mass)
  const [weightKg, setWeightKg] = useState("70");
  const [weightLb, setWeightLb] = useState("154");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const weightValKg =
    weightUnit === "kg" ? parseNum(weightKg) : parseNum(weightLb) / 2.2046226218;

  // Mass breakdown only valid when weight > 0 and BF% is finite.
  const massValid = isFinite(bfClamped) && weightValKg > 0;
  const fatMassKg = massValid ? (bfClamped / 100) * weightValKg : NaN;
  const leanMassKg = massValid ? weightValKg - fatMassKg : NaN;

  const fmtMass = (kg: number) =>
    weightUnit === "kg"
      ? `${fmtNum(kg, 1)} kg`
      : `${fmtNum(kg * 2.2046226218, 1)} lb`;

  // Scale bar position
  const scaleMin = ranges[0].min;
  const scaleMax = ranges[ranges.length - 1].max;
  const markerPct = isFinite(bfClamped)
    ? clamp(((bfClamped - scaleMin) / (scaleMax - scaleMin)) * 100, 0, 100)
    : 0;

  const hasResult = isFinite(bfClamped) && !bfError;

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
          <Field label="Age">
            <TextInput
              type="number"
              min={0}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Field>

          <Field label="Height">
            <div className="flex gap-2">
              <UnitToggle
                value={heightUnit}
                onChange={setHeightUnit}
                options={[
                  { value: "cm", label: "cm" },
                  { value: "in", label: "in" },
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
                <TextInput
                  type="number"
                  min={0}
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  placeholder="69"
                />
              )}
            </div>
          </Field>

          <Field label="Weight (for mass breakdown)">
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

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
            Circumferences
          </div>
          <UnitToggle
            value={circUnit}
            onChange={setCircUnit}
            options={[
              { value: "cm", label: "cm" },
              { value: "in", label: "in" },
            ]}
          />
        </div>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Neck circumference">
            {circUnit === "cm" ? (
              <TextInput
                type="number"
                min={0}
                value={neckCm}
                onChange={(e) => setNeckCm(e.target.value)}
                placeholder="38"
              />
            ) : (
              <TextInput
                type="number"
                min={0}
                value={neckIn}
                onChange={(e) => setNeckIn(e.target.value)}
                placeholder="15"
              />
            )}
          </Field>
          <Field label="Waist circumference">
            {circUnit === "cm" ? (
              <TextInput
                type="number"
                min={0}
                value={waistCm}
                onChange={(e) => setWaistCm(e.target.value)}
                placeholder="85"
              />
            ) : (
              <TextInput
                type="number"
                min={0}
                value={waistIn}
                onChange={(e) => setWaistIn(e.target.value)}
                placeholder="33.5"
              />
            )}
          </Field>
          {gender === "female" && (
            <Field label="Hip circumference">
              {circUnit === "cm" ? (
                <TextInput
                  type="number"
                  min={0}
                  value={hipCm}
                  onChange={(e) => setHipCm(e.target.value)}
                  placeholder="95"
                />
              ) : (
                <TextInput
                  type="number"
                  min={0}
                  value={hipIn}
                  onChange={(e) => setHipIn(e.target.value)}
                  placeholder="37.4"
                />
              )}
            </Field>
          )}
        </div>
      </CalcCard>

      {bfError && (
        <div className="rounded-lg border border-brand bg-accent/40 px-4 py-3 text-sm text-brand-accent-deep">
          {bfError}
        </div>
      )}

      {hasResult && (
        <CalcCard title="Results">
          <ResultCard
            label="Body fat percentage"
            value={`${fmtNum(bfClamped, 1)} %`}
            sub={activeRange?.label ?? "—"}
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">Fat mass</div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {fmtMass(fatMassKg)}
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                {fmtNum(bfClamped, 1)}% of body weight
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">Lean mass</div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {fmtMass(leanMassKg)}
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                {fmtNum(100 - bfClamped, 1)}% of body weight
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">Body fat category</div>
              <div className="mt-1 text-sm font-semibold text-brand-ink">
                {activeRange?.label ?? "—"}
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                {gender === "male" ? "Male ranges" : "Female ranges"}
              </div>
            </div>
          </div>

          {/* Body fat scale bar */}
          <div className="mt-6">
            <div className="mb-2 flex items-baseline justify-between">
              <div className="text-xs font-medium text-brand-muted">
                Body fat scale ({gender === "male" ? "men" : "women"})
              </div>
              <div className="text-xs text-brand-muted tabular-nums">
                {scaleMin} – {scaleMax}%
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -top-1 z-10 -translate-x-1/2"
                style={{ left: `${markerPct}%` }}
              >
                <div className="h-0 w-0 border-x-[6px] border-t-[7px] border-x-transparent border-t-brand-ink" />
              </div>
              <div className="relative h-5 w-full overflow-hidden rounded-lg">
                <div className="absolute inset-0 flex">
                  {ranges.map((r) => (
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
              <div className="mt-1.5 flex justify-between text-xs text-brand-muted tabular-nums">
                {ranges.map((r) => (
                  <span key={r.min}>{r.min}</span>
                ))}
                <span>{scaleMax}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
              {ranges.map((r) => (
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
                  {r.label} ({r.min}–{r.max}%)
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-brand bg-brand-canvas p-3 text-xs leading-relaxed text-brand-muted">
            <strong className="text-brand-ink">Method:</strong> U.S. Navy
            circumference method. Estimates body fat from height and key
            circumference measurements. For accuracy, measure on bare skin at
            the narrowest point of the neck and at the level of the navel
            (waist). For women, measure hips at the widest point.
          </div>
        </CalcCard>
      )}
    </div>
  );
}
