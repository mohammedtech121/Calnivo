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

type Formula = "mifflin" | "harris" | "katch";

const FORMULAS: { value: Formula; label: string }[] = [
  { value: "mifflin", label: "Mifflin-St Jeor" },
  { value: "harris", label: "Harris-Benedict (revised)" },
  { value: "katch", label: "Katch-McArdle (uses body fat %)" },
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

export default function BMRCalculator() {
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightCm, setHeightCm] = useState("175");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [weightKg, setWeightKg] = useState("70");
  const [weightLb, setWeightLb] = useState("154");
  const [formula, setFormula] = useState<Formula>("mifflin");
  const [bfPct, setBfPct] = useState("20");

  const heightInCmVal =
    heightUnit === "cm"
      ? parseNum(heightCm)
      : (parseNum(heightFt) * 12 + parseNum(heightIn)) * 2.54;
  const weightInKgVal =
    weightUnit === "kg" ? parseNum(weightKg) : parseNum(weightLb) / LB_PER_KG;
  const ageNum = parseNum(age);
  const bfPctNum = parseNum(bfPct);

  const leanMassKg = weightInKgVal * (1 - bfPctNum / 100);

  const all = {
    mifflin:
      heightInCmVal > 0 && weightInKgVal > 0 && ageNum > 0
        ? gender === "male"
          ? 10 * weightInKgVal + 6.25 * heightInCmVal - 5 * ageNum + 5
          : 10 * weightInKgVal + 6.25 * heightInCmVal - 5 * ageNum - 161
        : NaN,
    harris:
      heightInCmVal > 0 && weightInKgVal > 0 && ageNum > 0
        ? gender === "male"
          ? 88.362 + 13.397 * weightInKgVal + 4.799 * heightInCmVal - 5.677 * ageNum
          : 447.593 + 9.247 * weightInKgVal + 3.098 * heightInCmVal - 4.33 * ageNum
        : NaN,
    katch:
      weightInKgVal > 0 && bfPctNum > 0 && bfPctNum < 100
        ? 370 + 21.6 * leanMassKg
        : NaN,
  } as const;

  const primary = all[formula];
  const hasResult = isFinite(primary) && primary > 0;

  // Simple activity multipliers (info only)
  const activityMultipliers = [
    { label: "Sedentary", factor: 1.2 },
    { label: "Light", factor: 1.375 },
    { label: "Moderate", factor: 1.55 },
    { label: "Active", factor: 1.725 },
    { label: "Very active", factor: 1.9 },
  ];

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

          <Field label="Formula">
            <SelectInput
              value={formula}
              onChange={(e) => setFormula(e.target.value as Formula)}
            >
              {FORMULAS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </SelectInput>
          </Field>

          {formula === "katch" && (
            <Field label="Body fat %" hint="Required for Katch-McArdle">
              <TextInput
                type="number"
                min={0}
                max={100}
                step="0.1"
                value={bfPct}
                onChange={(e) => setBfPct(e.target.value)}
                placeholder="20"
              />
            </Field>
          )}
        </div>
      </CalcCard>

      {hasResult && (
        <CalcCard title="Results">
          <ResultCard
            label={`BMR — ${FORMULAS.find((f) => f.value === formula)?.label}`}
            value={`${fmtNum(primary, 0)} kcal/day`}
            sub="Calories burned at complete rest, 24 h"
          />

          {/* All-formulas comparison table */}
          <div className="mt-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
              All formulas compared
            </div>
            <div className="overflow-hidden rounded-lg border border-brand">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left text-brand-muted">
                    <th className="px-3 py-2 font-medium">Formula</th>
                    <th className="px-3 py-2 text-right font-medium">BMR (kcal)</th>
                    <th className="px-3 py-2 text-right font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-brand-ink">
                  <tr className={formula === "mifflin" ? "bg-accent/40" : ""}>
                    <td className="px-3 py-2 font-medium">Mifflin-St Jeor</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {isFinite(all.mifflin) ? fmtNum(all.mifflin, 0) : "—"}
                    </td>
                    <td className="px-3 py-2 text-right text-xs text-brand-muted">
                      Most accurate general formula
                    </td>
                  </tr>
                  <tr className={formula === "harris" ? "bg-accent/40" : ""}>
                    <td className="px-3 py-2 font-medium">Harris-Benedict</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {isFinite(all.harris) ? fmtNum(all.harris, 0) : "—"}
                    </td>
                    <td className="px-3 py-2 text-right text-xs text-brand-muted">
                      Classic (1984 revision)
                    </td>
                  </tr>
                  <tr className={formula === "katch" ? "bg-accent/40" : ""}>
                    <td className="px-3 py-2 font-medium">Katch-McArdle</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {isFinite(all.katch) ? fmtNum(all.katch, 0) : "—"}
                    </td>
                    <td className="px-3 py-2 text-right text-xs text-brand-muted">
                      Lean-mass based (BF% required)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* TDEE reference */}
          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Estimated TDEE (calories/day to maintain)
            </div>
            <div className="grid gap-3 sm:grid-cols-5">
              {activityMultipliers.map((a) => (
                <div
                  key={a.label}
                  className="rounded-lg border border-brand bg-brand-canvas p-3"
                >
                  <div className="text-xs font-medium text-brand-muted">
                    {a.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                    {fmtNum(primary * a.factor, 0)}
                  </div>
                  <div className="mt-0.5 text-xs text-brand-muted">
                    ×{a.factor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CalcCard>
      )}
    </div>
  );
}
