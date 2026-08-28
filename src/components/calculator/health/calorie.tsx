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

const ACTIVITY_FACTORS: { value: string; label: string; factor: number }[] = [
  { value: "1.2", label: "Sedentary (little or no exercise)", factor: 1.2 },
  {
    value: "1.375",
    label: "Lightly active (1–3 days/week)",
    factor: 1.375,
  },
  {
    value: "1.55",
    label: "Moderately active (3–5 days/week)",
    factor: 1.55,
  },
  { value: "1.725", label: "Very active (6–7 days/week)", factor: 1.725 },
  {
    value: "1.9",
    label: "Extra active (physical job + training)",
    factor: 1.9,
  },
];

const GOALS: { value: string; label: string; delta: number }[] = [
  { value: "lose", label: "Lose weight (−500 kcal/day)", delta: -500 },
  { value: "maintain", label: "Maintain weight", delta: 0 },
  { value: "gain", label: "Gain weight (+500 kcal/day)", delta: 500 },
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

export default function CalorieCalculator() {
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightCm, setHeightCm] = useState("175");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [weightKg, setWeightKg] = useState("70");
  const [weightLb, setWeightLb] = useState("154");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");

  const heightInCmVal =
    heightUnit === "cm"
      ? parseNum(heightCm)
      : (parseNum(heightFt) * 12 + parseNum(heightIn)) * 2.54;
  const weightInKgVal =
    weightUnit === "kg" ? parseNum(weightKg) : parseNum(weightLb) / LB_PER_KG;
  const ageNum = parseNum(age);

  const bmr =
    heightInCmVal > 0 && weightInKgVal > 0 && ageNum > 0
      ? gender === "male"
        ? 10 * weightInKgVal + 6.25 * heightInCmVal - 5 * ageNum + 5
        : 10 * weightInKgVal + 6.25 * heightInCmVal - 5 * ageNum - 161
      : 0;

  const factor =
    ACTIVITY_FACTORS.find((a) => a.value === activity)?.factor ?? 1.55;
  const tdee = bmr * factor;

  const delta = GOALS.find((g) => g.value === goal)?.delta ?? 0;
  const daily = Math.max(0, tdee + delta);

  // Macro split 30% protein / 40% carbs / 30% fat
  const proteinG = (daily * 0.3) / 4; // 4 kcal/g
  const carbsG = (daily * 0.4) / 4; // 4 kcal/g
  const fatG = (daily * 0.3) / 9; // 9 kcal/g

  // Weekly weight change projection (approx 7700 kcal ≈ 1 kg fat)
  const weeklyKcal = delta * 7;
  const weeklyKg = weeklyKcal / 7700;

  const hasResult = bmr > 0;

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

          <Field label="Activity level">
            <SelectInput
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              {ACTIVITY_FACTORS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </SelectInput>
          </Field>

          <Field label="Goal">
            <SelectInput
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              {GOALS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
      </CalcCard>

      {hasResult && (
        <CalcCard title="Results">
          <ResultCard
            label="Daily calorie target"
            value={`${fmtNum(daily, 0)} kcal`}
            sub={`BMR ${fmtNum(bmr, 0)} · TDEE ${fmtNum(tdee, 0)}`}
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">BMR</div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {fmtNum(bmr, 0)} kcal
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                Mifflin-St Jeor
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">TDEE</div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {fmtNum(tdee, 0)} kcal
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                Activity ×{factor}
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Weekly change
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {delta === 0
                  ? "Maintain"
                  : `${delta < 0 ? "−" : "+"}${fmtNum(
                      Math.abs(weeklyKg),
                      2,
                    )} kg/wk`}
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                Approx (7700 kcal ≈ 1 kg)
              </div>
            </div>
          </div>

          {/* Macro split table */}
          <div className="mt-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Macro split (30 / 40 / 30)
            </div>
            <div className="overflow-hidden rounded-lg border border-brand">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left text-brand-muted">
                    <th className="px-3 py-2 font-medium">Macro</th>
                    <th className="px-3 py-2 font-medium">% of calories</th>
                    <th className="px-3 py-2 text-right font-medium">Grams/day</th>
                    <th className="px-3 py-2 text-right font-medium">Calories</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-brand-ink">
                  <tr>
                    <td className="px-3 py-2 font-medium">Protein</td>
                    <td className="px-3 py-2 text-brand-muted">30%</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtNum(proteinG, 0)} g
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtNum(daily * 0.3, 0)} kcal
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Carbs</td>
                    <td className="px-3 py-2 text-brand-muted">40%</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtNum(carbsG, 0)} g
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtNum(daily * 0.4, 0)} kcal
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Fat</td>
                    <td className="px-3 py-2 text-brand-muted">30%</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtNum(fatG, 0)} g
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtNum(daily * 0.3, 0)} kcal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CalcCard>
      )}
    </div>
  );
}
