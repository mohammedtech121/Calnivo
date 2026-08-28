"use client";

import { useState } from "react";
import {
  addDays,
  differenceInDays,
  format,
  parseISO,
  isValid,
} from "date-fns";
import {
  CalcCard,
  Field,
  TextInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtNum, parseNum, clamp } from "@/lib/format";

interface Milestone {
  label: string;
  week: number;
  day: number;
  desc: string;
}

const MILESTONES: Milestone[] = [
  { label: "First heartbeat", week: 6, day: 0, desc: "Embryonic heartbeat often detectable" },
  { label: "End of 1st trimester", week: 13, day: 0, desc: "Risk of miscarriage drops sharply" },
  { label: "Anatomy scan", week: 20, day: 0, desc: "Detailed ultrasound usually performed" },
  { label: "Viability", week: 24, day: 0, desc: "Survival possible with intensive care" },
  { label: "End of 2nd trimester", week: 27, day: 0, desc: "Third & final trimester begins" },
  { label: "Early term", week: 37, day: 0, desc: "Considered early-term delivery" },
  { label: "Full term", week: 39, day: 0, desc: "Ideal delivery window opens" },
  { label: "Estimated due date", week: 40, day: 0, desc: "40 weeks from LMP" },
];

export default function PregnancyCalculator() {
  // Default LMP: 8 weeks ago from today
  const defaultLmp = format(addDays(new Date(), -56), "yyyy-MM-dd");
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

  const trimester = !valid
    ? "—"
    : gestDays < 91
      ? "1st trimester"
      : gestDays < 189
        ? "2nd trimester"
        : "3rd trimester";

  const daysUntilDue = edd ? differenceInDays(edd, today) : 0;
  const progressPct = clamp((gestDays / 280) * 100, 0, 100);

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
            hint="Adjusted EDD uses LMP + 280 + (cycle − 28)"
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
            sub={`${fmtNum(Math.abs(daysUntilDue), 0)} days ${
              daysUntilDue >= 0 ? "remaining" : "past due"
            }`}
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Gestational age
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {gestWeeks}w {gestDayOfWeek}d
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                Day {gestDays} of 280
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Current trimester
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink">
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
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Conception estimate
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink">
                {fmtDate(addDays(lmp, 14))}
              </div>
              <div className="mt-0.5 text-xs text-brand-muted">
                ≈ LMP + 14 days
              </div>
            </div>
          </div>

          {/* Pregnancy progress bar */}
          <div className="mt-5">
            <div className="mb-2 flex items-baseline justify-between">
              <div className="text-xs font-medium text-brand-muted">
                Pregnancy progress
              </div>
              <div className="text-xs text-brand-muted tabular-nums">
                {fmtNum(progressPct, 1)}% · week {gestWeeks} of 40
              </div>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full bg-brand-accent-gradient"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-xs text-brand-muted tabular-nums">
              <span>Week 0</span>
              <span>Week 13</span>
              <span>Week 27</span>
              <span>Week 40</span>
            </div>
          </div>

          {/* Milestone table */}
          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Key milestones
            </div>
            <div className="overflow-hidden rounded-lg border border-brand">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left text-brand-muted">
                    <th className="px-3 py-2 font-medium">Milestone</th>
                    <th className="px-3 py-2 font-medium">Week</th>
                    <th className="px-3 py-2 text-right font-medium">Date</th>
                    <th className="px-3 py-2 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-brand-ink">
                  {MILESTONES.map((m) => {
                    const days = m.week * 7 + m.day + cycleAdj;
                    const date = addDays(lmp, days);
                    const isPast = gestDays >= days;
                    return (
                      <tr key={m.label}>
                        <td className="px-3 py-2">
                          <div className="font-medium">{m.label}</div>
                          <div className="text-xs text-brand-muted">
                            {m.desc}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-brand-muted tabular-nums">
                          {m.week}w{m.day}d
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {format(date, "MMM d, yyyy")}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <span
                            className={
                              "inline-block rounded-full px-2 py-0.5 text-xs font-medium " +
                              (isPast
                                ? "bg-accent/60 text-brand-accent-deep"
                                : "bg-muted/60 text-brand-muted")
                            }
                          >
                            {isPast ? "Reached" : "Upcoming"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-brand bg-brand-canvas p-3 text-xs leading-relaxed text-brand-muted">
            Estimated due date is calculated using Naegele&apos;s rule
            (LMP + 280 days), adjusted for cycle length. Only about 5% of babies
            are born on their due date — most arrive within two weeks of it.
            Always consult your healthcare provider for clinical dating.
          </div>
        </CalcCard>
      )}
    </div>
  );
}
