"use client";

import { useState } from "react";
import { addDays, differenceInDays, format, parseISO, isValid } from "date-fns";
import {
  CalcCard,
  Field,
  TextInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtNum, parseNum, clamp } from "@/lib/format";

export default function DueDateCalculator() {
  const defaultLmp = format(addDays(new Date(), -70), "yyyy-MM-dd");
  const [lmpStr, setLmpStr] = useState(defaultLmp);
  const [cycleLen, setCycleLen] = useState("28");

  const lmp = parseISO(lmpStr);
  const cycle = parseNum(cycleLen);
  const cycleAdj = cycle - 28;

  const valid = isValid(lmp) && cycle > 0;

  const edd = valid ? addDays(lmp, 280 + cycleAdj) : null;
  const today = new Date();
  const gestDays = valid ? differenceInDays(today, lmp) : 0;
  const gestWeeks = Math.floor(gestDays / 7);
  const gestDayOfWeek = gestDays % 7;

  const daysRemaining = edd ? differenceInDays(edd, today) : 0;
  const weeksRemaining = Math.floor(Math.abs(daysRemaining) / 7);
  const daysRemainder = Math.abs(daysRemaining) % 7;

  const progressPct = clamp((gestDays / 280) * 100, 0, 100);

  const trimester = !valid
    ? "—"
    : gestDays < 91
      ? "First trimester"
      : gestDays < 189
        ? "Second trimester"
        : "Third trimester";

  // Trimester boundaries relative to LMP
  const trimester1End = valid ? addDays(lmp, 91) : null;
  const trimester2End = valid ? addDays(lmp, 189) : null;
  const trimester3End = edd;

  const fmtDate = (d: Date | null) =>
    d && isValid(d) ? format(d, "MMM d, yyyy") : "—";

  return (
    <div className="space-y-6">
      <CalcCard title="Your details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First day of last menstrual period (LMP)">
            <TextInput
              type="date"
              value={lmpStr}
              onChange={(e) => setLmpStr(e.target.value)}
            />
          </Field>
          <Field
            label="Average cycle length (days)"
            hint="Adjusts due date for non-28-day cycles"
          >
            <TextInput
              type="number"
              min={20}
              max={45}
              value={cycleLen}
              onChange={(e) => setCycleLen(e.target.value)}
            />
          </Field>
        </div>
      </CalcCard>

      {valid && (
        <CalcCard title="Results">
          <ResultCard
            label="Estimated due date"
            value={fmtDate(edd)}
            sub={
              daysRemaining >= 0
                ? `${weeksRemaining}w ${daysRemainder}d remaining`
                : `${weeksRemaining}w ${daysRemainder}d past due`
            }
          />

          {/* Big countdown */}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Days until due
              </div>
              <div className="mt-1 text-2xl font-bold text-brand-accent-deep tabular-nums">
                {fmtNum(Math.abs(daysRemaining), 0)}
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                {daysRemaining >= 0 ? "days remaining" : "days past due"}
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Gestational age
              </div>
              <div className="mt-1 text-2xl font-bold text-brand-ink tabular-nums">
                {gestWeeks}<span className="text-base font-semibold">w</span>{" "}
                {gestDayOfWeek}<span className="text-base font-semibold">d</span>
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                Day {gestDays} of 280
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Current trimester
              </div>
              <div className="mt-1 text-lg font-bold text-brand-ink">
                {trimester}
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                {gestDays < 91
                  ? "Weeks 1–13"
                  : gestDays < 189
                    ? "Weeks 14–27"
                    : "Weeks 28–40"}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="mb-2 flex items-baseline justify-between">
              <div className="text-xs font-medium text-brand-muted">
                Pregnancy progress (0–40 weeks)
              </div>
              <div className="text-xs text-brand-muted tabular-nums">
                {fmtNum(progressPct, 1)}% · week {gestWeeks} of 40
              </div>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full bg-brand-accent-gradient"
                style={{ width: `${progressPct}%` }}
              />
              {/* Trimester tick marks */}
              <div className="absolute inset-0 flex">
                <div className="flex w-full">
                  <div className="relative" style={{ width: `${(91 / 280) * 100}%` }}>
                    <span className="absolute -top-1 right-0 h-6 w-px bg-brand-border" />
                  </div>
                  <div
                    className="relative"
                    style={{ width: `${((189 - 91) / 280) * 100}%` }}
                  >
                    <span className="absolute -top-1 right-0 h-6 w-px bg-brand-border" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-brand-muted">
              <span>LMP · Week 0</span>
              <span>T1 end · {fmtDate(trimester1End)}</span>
              <span>T2 end · {fmtDate(trimester2End)}</span>
              <span>EDD · {fmtDate(trimester3End)}</span>
            </div>
          </div>

          {/* Trimester table */}
          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Trimester schedule
            </div>
            <div className="overflow-hidden rounded-lg border border-brand">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left text-brand-muted">
                    <th className="px-3 py-2 font-medium">Trimester</th>
                    <th className="px-3 py-2 font-medium">Weeks</th>
                    <th className="px-3 py-2 text-right font-medium">Start</th>
                    <th className="px-3 py-2 text-right font-medium">End</th>
                    <th className="px-3 py-2 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-brand-ink">
                  <tr>
                    <td className="px-3 py-2 font-medium">First</td>
                    <td className="px-3 py-2 text-brand-muted">1 – 13</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtDate(lmp)}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtDate(trimester1End)}
                    </td>
                    <td className="px-3 py-2 text-right text-xs">
                      {gestDays < 91 ? "In progress" : "Complete"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Second</td>
                    <td className="px-3 py-2 text-brand-muted">14 – 27</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtDate(addDays(lmp, 92))}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtDate(trimester2End)}
                    </td>
                    <td className="px-3 py-2 text-right text-xs">
                      {gestDays < 91
                        ? "Upcoming"
                        : gestDays < 189
                          ? "In progress"
                          : "Complete"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Third</td>
                    <td className="px-3 py-2 text-brand-muted">28 – 40</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtDate(addDays(lmp, 190))}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmtDate(trimester3End)}
                    </td>
                    <td className="px-3 py-2 text-right text-xs">
                      {gestDays < 189
                        ? "Upcoming"
                        : gestDays < 280
                          ? "In progress"
                          : "Complete"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-brand bg-brand-canvas p-3 text-xs leading-relaxed text-brand-muted">
            <strong className="text-brand-ink">Method:</strong> Naegele&apos;s
            rule — Estimated Due Date = LMP + 280 days (40 weeks), adjusted by
            (cycle length − 28) days for non-average cycles. Averages only;
            consult your provider for clinical dating via ultrasound.
          </div>
        </CalcCard>
      )}
    </div>
  );
}
