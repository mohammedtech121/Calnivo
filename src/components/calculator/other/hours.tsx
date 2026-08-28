"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import {
  CalcCard,
  CalcButton,
  Field,
  ResultCard,
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
import { fmtMoney, fmtNum, parseNum } from "@/lib/format";

const DAY_LABELS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface DayRow {
  id: number;
  label: string;
  start: string; // HH:MM
  end: string; // HH:MM
  break: string; // minutes
}

let nextId = 7;

function parseHM(s: string): number | null {
  // returns minutes from midnight, or null
  const m = s.trim().match(/^(\d{1,2}):([0-5]?\d)$/);
  if (!m) return null;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}

function fmtHours(min: number): string {
  if (min < 0) return `-${fmtHours(-min)}`;
  const h = Math.floor(min / 60);
  const m = Math.round(min - h * 60);
  return `${h}:${String(m).padStart(2, "0")}`;
}

export default function HoursCalculator() {
  const [rows, setRows] = useState<DayRow[]>(
    DAY_LABELS.slice(0, 5).map((label, i) => ({
      id: i + 1,
      label,
      start: "09:00",
      end: "17:00",
      break: "30",
    })),
  );
  const [rate, setRate] = useState<string>("25");

  const computed = useMemo(() => {
    return rows.map((r) => {
      const start = parseHM(r.start);
      const end = parseHM(r.end);
      let worked = 0;
      let valid = start !== null && end !== null;
      if (valid) {
        let diff = (end as number) - (start as number);
        if (diff < 0) diff += 24 * 60; // overnight shift
        const br = parseNum(r.break);
        worked = Math.max(0, diff - br);
      }
      return { ...r, workedMin: worked, valid };
    });
  }, [rows]);

  const totalMin = computed.reduce((s, r) => s + r.workedMin, 0);
  const totalHours = totalMin / 60;
  const hourlyRate = parseNum(rate);
  const totalPay = totalHours * hourlyRate;

  function addRow() {
    setRows((prev) => [
      ...prev,
      { id: nextId++, label: `Custom ${prev.length + 1}`, start: "09:00", end: "17:00", break: "30" },
    ]);
  }
  function removeRow(id: number) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }
  function update(id: number, patch: Partial<DayRow>) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  }

  return (
    <div className="space-y-6">
      <CalcCard title="Inputs">
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 px-1 text-xs font-medium uppercase tracking-wide text-brand-muted">
            <div className="col-span-3 sm:col-span-2">Day</div>
            <div className="col-span-3 sm:col-span-3">Start</div>
            <div className="col-span-3 sm:col-span-3">End</div>
            <div className="col-span-2 sm:col-span-3">Break (min)</div>
            <div className="col-span-1"></div>
          </div>

          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-12 gap-2">
              <div className="col-span-3 sm:col-span-2">
                <TextInput
                  value={r.label}
                  onChange={(e) => update(r.id, { label: e.target.value })}
                />
              </div>
              <div className="col-span-3 sm:col-span-3">
                <TextInput
                  type="time"
                  value={r.start}
                  onChange={(e) => update(r.id, { start: e.target.value })}
                  className="tabular-nums"
                />
              </div>
              <div className="col-span-3 sm:col-span-3">
                <TextInput
                  type="time"
                  value={r.end}
                  onChange={(e) => update(r.id, { end: e.target.value })}
                  className="tabular-nums"
                />
              </div>
              <div className="col-span-2 sm:col-span-3">
                <TextInput
                  type="number"
                  inputMode="numeric"
                  value={r.break}
                  onChange={(e) => update(r.id, { break: e.target.value })}
                  className="tabular-nums"
                />
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <button
                  onClick={() => removeRow(r.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand bg-white text-brand-muted hover:bg-accent/50 hover:text-red-600"
                  aria-label="Remove day"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <CalcButton variant="secondary" onClick={addRow} className="px-3 py-2 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Add day
            </span>
          </CalcButton>

          <div className="w-full sm:w-40">
            <Field label="Hourly rate ($)">
              <TextInput
                type="number"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="tabular-nums"
              />
            </Field>
          </div>
        </div>
      </CalcCard>

      <CalcCard title="Per-Day Breakdown">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Day</TableHead>
              <TableHead className="tabular-nums">Start</TableHead>
              <TableHead className="tabular-nums">End</TableHead>
              <TableHead className="text-right tabular-nums">Break</TableHead>
              <TableHead className="text-right tabular-nums">Hours</TableHead>
              <TableHead className="text-right tabular-nums">Decimal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {computed.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium text-brand-ink">
                  {r.label}
                </TableCell>
                <TableCell className="tabular-nums text-brand-muted">
                  {r.start}
                </TableCell>
                <TableCell className="tabular-nums text-brand-muted">
                  {r.end}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {parseNum(r.break)} min
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  {r.valid ? fmtHours(r.workedMin) : "—"}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {r.valid ? fmtNum(r.workedMin / 60, 2) : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CalcCard>

      <CalcCard title="Results">
        <div className="grid gap-3 sm:grid-cols-3">
          <ResultCard
            label="Total hours"
            value={fmtHours(totalMin)}
            sub={`${fmtNum(totalHours, 2)} decimal hours`}
          />
          <ResultCard
            label="Total pay"
            value={fmtMoney(totalPay)}
            sub={`@ ${fmtMoney(hourlyRate)}/hr`}
            highlight={false}
          />
          <ResultCard
            label="Total break"
            value={`${fmtNum(
              computed.reduce((s, r) => s + parseNum(r.break), 0),
              0,
            )} min`}
            sub={`${rows.length} day${rows.length === 1 ? "" : "s"}`}
            highlight={false}
          />
        </div>
      </CalcCard>
    </div>
  );
}
