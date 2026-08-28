"use client";

import { useState } from "react";
import { addDays, differenceInDays, format, parseISO, isValid } from "date-fns";
import {
  CalcCard,
  Field,
  TextInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtNum, clamp } from "@/lib/format";

type Mode = "due" | "birth";

function ModeToggle({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  const modes: { value: Mode; label: string }[] = [
    { value: "due", label: "Due date" },
    { value: "birth", label: "Birth date" },
  ];
  return (
    <div className="flex gap-1 rounded-lg border border-brand bg-brand-canvas p-1">
      {modes.map((m) => (
        <button
          key={m.value}
          type="button"
          onClick={() => setMode(m.value)}
          className={
            "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
            (mode === m.value
              ? "bg-brand-accent-gradient text-white shadow-accent"
              : "text-brand-muted hover:text-brand-ink")
          }
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

export default function PregnancyConceptionCalculator() {
  const [mode, setMode] = useState<Mode>("due");
  const [inputDate, setInputDate] = useState(
    format(addDays(new Date(), 140), "yyyy-MM-dd"),
  );

  const input = parseISO(inputDate);
  const valid = isValid(input);

  // EDD = LMP + 280 days; conception = LMP + 14 days = EDD - 266 days
  // For birth date input, treat birth date as the actual delivery date —
  // conception is still birthDate - 266 (gestation ~38 weeks from conception).
  const conception = valid ? addDays(input, -266) : null;
  const lmp = valid ? addDays(input, -280) : null;

  // Ovulation window: conception ±2 days (most fertile window)
  const ovulationStart = valid ? addDays(conception!, -2) : null;
  const ovulationEnd = valid ? addDays(conception!, 2) : null;

  const today = new Date();
  const daysSinceConception = valid
    ? mode === "birth"
      ? differenceInDays(today, conception!)
      : differenceInDays(today, conception!)
    : 0;
  const gestWeeks = Math.floor(
    (daysSinceConception + 14) / 7,
  ); // gestational age = LMP-based, ~ conception + 2 weeks
  const gestDayOfWeek = (daysSinceConception + 14) % 7;

  const fmtDate = (d: Date | null) =>
    d && isValid(d) ? format(d, "MMM d, yyyy") : "—";

  const progressPct = clamp(((daysSinceConception + 14) / 280) * 100, 0, 100);

  return (
    <div className="space-y-6">
      <CalcCard title="Your details">
        <div className="space-y-4">
          <ModeToggle mode={mode} setMode={setMode} />
          <Field
            label={mode === "due" ? "Estimated due date" : "Date of birth"}
          >
            <TextInput
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
            />
          </Field>
        </div>
      </CalcCard>

      {valid && (
        <CalcCard title="Results">
          <ResultCard
            label="Estimated conception date"
            value={fmtDate(conception)}
            sub={`LMP ≈ ${fmtDate(lmp)}`}
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Estimated LMP
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink">
                {fmtDate(lmp)}
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                Conception − 14 days
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Ovulation window
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink">
                {fmtDate(ovulationStart)} – {fmtDate(ovulationEnd)}
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                Most fertile days
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Current gestational age
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {gestWeeks > 0 ? `${gestWeeks}w ${gestDayOfWeek}d` : "Pre-conception"}
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                Day {daysSinceConception + 14} of 280
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="mb-2 flex items-baseline justify-between">
              <div className="text-xs font-medium text-brand-muted">
                Pregnancy progress
              </div>
              <div className="text-xs text-brand-muted tabular-nums">
                {fmtNum(progressPct, 1)}%
              </div>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full bg-brand-accent-gradient"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Timeline
            </div>
            <div className="overflow-hidden rounded-lg border border-brand">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left text-brand-muted">
                    <th className="px-3 py-2 font-medium">Event</th>
                    <th className="px-3 py-2 text-right font-medium">Date</th>
                    <th className="px-3 py-2 text-right font-medium">Days from conception</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-brand-ink">
                  <tr>
                    <td className="px-3 py-2 font-medium">Last menstrual period</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtDate(lmp)}
                    </td>
                    <td className="px-3 py-2 text-right text-brand-muted tabular-nums">
                      −14
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">
                      Ovulation window starts
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtDate(ovulationStart)}
                    </td>
                    <td className="px-3 py-2 text-right text-brand-muted tabular-nums">
                      −2
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Conception (estimate)</td>
                    <td className="px-3 py-2 text-right tabular-nums font-semibold">
                      {fmtDate(conception)}
                    </td>
                    <td className="px-3 py-2 text-right text-brand-muted tabular-nums">
                      0
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Ovulation window ends</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtDate(ovulationEnd)}
                    </td>
                    <td className="px-3 py-2 text-right text-brand-muted tabular-nums">
                      +2
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">
                      {mode === "birth" ? "Date of birth" : "Estimated due date"}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums font-semibold">
                      {fmtDate(input)}
                    </td>
                    <td className="px-3 py-2 text-right text-brand-muted tabular-nums">
                      +266
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-brand bg-brand-canvas p-3 text-xs leading-relaxed text-brand-muted">
            Conception is back-calculated as <strong>due date − 266 days</strong>
            (38 weeks gestation from conception). Sperm can live up to 5 days
            inside the body and the egg survives about 24 hours after
            ovulation, so conception may have occurred on any day in the
            fertile window shown above. Estimates are approximate.
          </div>
        </CalcCard>
      )}
    </div>
  );
}
