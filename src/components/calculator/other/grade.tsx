"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import {
  CalcCard,
  CalcButton,
  Field,
  ResultCard,
  SelectInput,
  TextInput,
} from "@/components/calculator/CalculatorShell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fmtNum, parseNum } from "@/lib/format";

type EarnedMode = "percent" | "ratio";

interface Comp {
  id: number;
  name: string;
  weight: string;
  mode: EarnedMode;
  earned: string; // percent if mode=percent, score if mode=ratio
  total: string; // total possible if mode=ratio
}

let nextId = 4;

export default function GradeCalculator() {
  const [comps, setComps] = useState<Comp[]>([
    { id: 1, name: "Homework", weight: "20", mode: "percent", earned: "92", total: "100" },
    { id: 2, name: "Midterm", weight: "25", mode: "percent", earned: "85", total: "100" },
    { id: 3, name: "Quizzes", weight: "15", mode: "percent", earned: "88", total: "100" },
  ]);
  const [target, setTarget] = useState<string>("90");
  const [finalWeight, setFinalWeight] = useState<string>("40");

  const computed = useMemo(() => {
    return comps.map((c) => {
      // Weights must be non-negative; clamp to 0 (defensive against "-10" / garbage input).
      const w = Math.max(0, parseNum(c.weight));
      let earnedPct: number;
      if (c.mode === "percent") {
        earnedPct = parseNum(c.earned);
      } else {
        const score = parseNum(c.earned);
        const total = parseNum(c.total) || 1;
        earnedPct = (score / total) * 100;
      }
      if (!isFinite(earnedPct)) earnedPct = 0;
      return { ...c, weightNum: w, earnedPct };
    });
  }, [comps]);

  const sumExistingWeights = computed.reduce((s, c) => s + c.weightNum, 0);
  const weightedEarned = computed.reduce((s, c) => s + c.weightNum * c.earnedPct, 0);
  const currentGrade = sumExistingWeights > 0 ? weightedEarned / sumExistingWeights : 0;
  const currentStanding = sumExistingWeights + parseNum(finalWeight) > 0
    ? weightedEarned / (sumExistingWeights + parseNum(finalWeight))
    : 0;

  const targetNum = Math.max(0, parseNum(target));
  const finalWeightNum = Math.max(0, parseNum(finalWeight));
  const totalAllWeight = sumExistingWeights + finalWeightNum;
  // neededFinal intentionally NaN when finalWeightNum is 0; UI displays "—".
  const neededFinal = finalWeightNum > 0
    ? (targetNum * totalAllWeight - weightedEarned) / finalWeightNum
    : NaN;

  // Letter grade from percent
  function letter(p: number): string {
    if (p >= 93) return "A";
    if (p >= 90) return "A-";
    if (p >= 87) return "B+";
    if (p >= 83) return "B";
    if (p >= 80) return "B-";
    if (p >= 77) return "C+";
    if (p >= 73) return "C";
    if (p >= 70) return "C-";
    if (p >= 67) return "D+";
    if (p >= 60) return "D";
    return "F";
  }

  function addComp() {
    setComps((prev) => [
      ...prev,
      { id: nextId++, name: "", weight: "10", mode: "percent", earned: "90", total: "100" },
    ]);
  }
  function removeComp(id: number) {
    setComps((prev) => prev.filter((c) => c.id !== id));
  }
  function update(id: number, patch: Partial<Comp>) {
    setComps((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  }

  const neededDisplay = isFinite(neededFinal)
    ? `${fmtNum(neededFinal, 2)}%`
    : "—";
  const neededHint = isFinite(neededFinal)
    ? neededFinal > 100
      ? "Not achievable — exceeds 100%."
      : neededFinal <= 0
        ? "You've already hit your target."
        : neededFinal >= 90
          ? "Tough but doable."
          : "Within reach."
    : "Enter a final exam weight.";

  return (
    <div className="space-y-6">
      <CalcCard title="Assessment Components">
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 px-1 text-xs font-medium uppercase tracking-wide text-brand-muted">
            <div className="col-span-4 sm:col-span-4">Name</div>
            <div className="col-span-3 sm:col-span-2">Weight %</div>
            <div className="col-span-2 sm:col-span-2">Mode</div>
            <div className="col-span-2 sm:col-span-3">Earned</div>
            <div className="col-span-1"></div>
          </div>

          {comps.map((c) => {
            const w = parseNum(c.weight);
            let earnedPct = 0;
            if (c.mode === "percent") earnedPct = parseNum(c.earned);
            else earnedPct = (parseNum(c.earned) / (parseNum(c.total) || 1)) * 100;
            return (
              <div key={c.id} className="grid grid-cols-12 gap-2">
                <div className="col-span-4 sm:col-span-4">
                  <TextInput
                    value={c.name}
                    placeholder="Component name"
                    onChange={(e) => update(c.id, { name: e.target.value })}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <TextInput
                    type="number"
                    inputMode="decimal"
                    value={c.weight}
                    onChange={(e) => update(c.id, { weight: e.target.value })}
                    className="tabular-nums"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <SelectInput
                    value={c.mode}
                    onChange={(e) =>
                      update(c.id, { mode: e.target.value as EarnedMode })
                    }
                  >
                    <option value="percent">%</option>
                    <option value="ratio">x/y</option>
                  </SelectInput>
                </div>
                <div className="col-span-2 sm:col-span-3">
                  {c.mode === "percent" ? (
                    <TextInput
                      type="number"
                      inputMode="decimal"
                      value={c.earned}
                      placeholder="0-100"
                      onChange={(e) => update(c.id, { earned: e.target.value })}
                      className="tabular-nums"
                    />
                  ) : (
                    <div className="flex items-center gap-1">
                      <TextInput
                        type="number"
                        inputMode="decimal"
                        value={c.earned}
                        onChange={(e) => update(c.id, { earned: e.target.value })}
                        className="tabular-nums"
                      />
                      <span className="text-brand-muted">/</span>
                      <TextInput
                        type="number"
                        inputMode="decimal"
                        value={c.total}
                        onChange={(e) => update(c.id, { total: e.target.value })}
                        className="tabular-nums"
                      />
                    </div>
                  )}
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <button
                    onClick={() => removeComp(c.id)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand bg-white text-brand-muted hover:bg-accent/50 hover:text-red-600"
                    aria-label="Remove component"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="col-span-12 -mt-1 flex justify-between px-1 text-xs text-brand-muted">
                  <span>
                    Weight: {fmtNum(w, 1)}%
                  </span>
                  <span>
                    Earned: <span className="font-medium text-brand-ink">{fmtNum(earnedPct, 2)}%</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <CalcButton variant="secondary" onClick={addComp} className="px-3 py-2 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Add component
            </span>
          </CalcButton>
        </div>
      </CalcCard>

      <CalcCard title="Target & Final Exam">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Target final grade (%)">
            <TextInput
              type="number"
              inputMode="decimal"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="tabular-nums"
            />
          </Field>
          <Field
            label="Final exam weight (%)"
            hint="Defaults to remaining weight to reach 100%"
          >
            <div className="flex gap-2">
              <TextInput
                type="number"
                inputMode="decimal"
                value={finalWeight}
                onChange={(e) => setFinalWeight(e.target.value)}
                className="tabular-nums"
              />
              <CalcButton
                variant="secondary"
                onClick={() =>
                  setFinalWeight(
                    String(Math.max(0, 100 - sumExistingWeights).toFixed(2)),
                  )
                }
                className="px-3 py-2 text-xs"
              >
                Use remaining
              </CalcButton>
            </div>
          </Field>
        </div>
        <p className="mt-3 text-xs text-brand-muted">
          Sum of existing component weights: <span className="font-medium text-brand-ink">{fmtNum(sumExistingWeights, 1)}%</span>
          {totalAllWeight !== 100 && (
            <span className="ml-2 text-amber-600">
              ({totalAllWeight < 100 ? "missing" : "extra"} {fmtNum(Math.abs(totalAllWeight - 100), 1)}%)
            </span>
          )}
        </p>
      </CalcCard>

      <CalcCard title="Results">
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Current weighted grade"
            value={`${fmtNum(currentGrade, 2)}%`}
            sub={`Letter: ${letter(currentGrade)} · ${fmtNum(currentStanding, 2)}% including 0 on remaining`}
          />
          <ResultCard
            label="Grade needed on final"
            value={neededDisplay}
            sub={neededHint}
            highlight={isFinite(neededFinal) && neededFinal > 0 && neededFinal <= 100}
          />
        </div>
      </CalcCard>

      <CalcCard title="Component Breakdown">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Component</TableHead>
              <TableHead className="text-right tabular-nums">Weight</TableHead>
              <TableHead className="text-right tabular-nums">Earned</TableHead>
              <TableHead className="text-right tabular-nums">Contribution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {computed.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium text-brand-ink">
                  {c.name || <span className="text-brand-muted italic">Untitled</span>}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {fmtNum(c.weightNum, 1)}%
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {fmtNum(c.earnedPct, 2)}%
                </TableCell>
                <TableCell className="text-right tabular-nums font-semibold">
                  {fmtNum((c.weightNum * c.earnedPct) / 100, 2)} pts
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CalcCard>
    </div>
  );
}
