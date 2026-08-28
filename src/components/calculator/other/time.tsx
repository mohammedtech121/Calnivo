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
import { fmtNum } from "@/lib/format";

type Op = "+" | "-";

interface Entry {
  id: number;
  time: string; // HH:MM:SS
  op: Op;
}

let nextId = 3;

function parseHMS(s: string): number | null {
  // returns total seconds, or null if invalid
  const m = s.trim().match(/^(\d+):([0-5]?\d)(?::([0-5]?\d))?$/);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const sec = m[3] ? parseInt(m[3], 10) : 0;
  return h * 3600 + min * 60 + sec;
}

function fmtHMS(totalSec: number): string {
  const neg = totalSec < 0;
  let s = Math.abs(Math.round(totalSec));
  const h = Math.floor(s / 3600);
  s -= h * 3600;
  const m = Math.floor(s / 60);
  s -= m * 60;
  return `${neg ? "-" : ""}${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function TimeCalculator() {
  const [entries, setEntries] = useState<Entry[]>([
    { id: 1, time: "01:30:00", op: "+" },
    { id: 2, time: "00:45:30", op: "+" },
  ]);
  const [start, setStart] = useState<string>("00:00:00");

  const total = useMemo(() => {
    let acc = parseHMS(start) ?? 0;
    for (const e of entries) {
      const v = parseHMS(e.time);
      if (v === null) return null;
      acc += e.op === "+" ? v : -v;
    }
    return acc;
  }, [entries, start]);

  function addRow() {
    setEntries((prev) => [
      ...prev,
      { id: nextId++, time: "00:00:00", op: "+" },
    ]);
  }
  function removeRow(id: number) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }
  function update(id: number, patch: Partial<Entry>) {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
  }

  const totalValid = total !== null;
  const hours = totalValid ? (total as number) / 3600 : 0;
  const minutes = totalValid ? (total as number) / 60 : 0;

  return (
    <div className="space-y-6">
      <CalcCard title="Inputs">
        <Field label="Starting time (HH:MM:SS)">
          <TextInput
            type="text"
            value={start}
            placeholder="00:00:00"
            onChange={(e) => setStart(e.target.value)}
          />
        </Field>

        <div className="mt-5">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-brand-muted">
            Add / subtract times
          </div>
          <div className="space-y-2">
            {entries.map((e) => {
              const parsed = parseHMS(e.time);
              return (
                <div key={e.id} className="grid grid-cols-12 gap-2">
                  <div className="col-span-3 sm:col-span-2">
                    <SelectInput
                      value={e.op}
                      onChange={(ev) =>
                        update(e.id, { op: ev.target.value as Op })
                      }
                    >
                      <option value="+">+ Add</option>
                      <option value="-">− Sub</option>
                    </SelectInput>
                  </div>
                  <div className="col-span-7 sm:col-span-8">
                    <TextInput
                      type="text"
                      value={e.time}
                      placeholder="HH:MM:SS"
                      onChange={(ev) => update(e.id, { time: ev.target.value })}
                      className="tabular-nums"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <button
                      onClick={() => removeRow(e.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand bg-white text-brand-muted hover:bg-accent/50 hover:text-red-600"
                      aria-label="Remove row"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="col-span-12 -mt-1 text-xs text-brand-muted">
                    {parsed === null && e.time
                      ? "⚠ Format must be HH:MM:SS (or H:MM)"
                      : `= ${fmtNum(parsed ?? 0, 0)} seconds`}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3">
            <CalcButton variant="secondary" onClick={addRow} className="px-3 py-2 text-xs">
              <span className="inline-flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Add row
              </span>
            </CalcButton>
          </div>
        </div>
      </CalcCard>

      <CalcCard title="Results">
        {!totalValid ? (
          <p className="text-sm text-red-600">
            Some time values are invalid. Use format <code>HH:MM:SS</code>.
          </p>
        ) : (
          <div className="space-y-3">
            <ResultCard
              label="Total time"
              value={fmtHMS(total as number)}
              sub={
                (total as number) < 0
                  ? "Negative result — subtractions exceeded additions."
                  : undefined
              }
            />
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat label="Decimal hours" value={fmtNum(hours, 4)} />
              <Stat label="Decimal minutes" value={fmtNum(minutes, 2)} />
              <Stat label="Total seconds" value={fmtNum(total as number, 0)} />
            </div>
          </div>
        )}
      </CalcCard>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-brand bg-white p-3">
      <div className="text-xs font-medium text-brand-muted">{label}</div>
      <div className="mt-1 text-base font-semibold text-brand-ink tabular-nums">
        {value}
      </div>
    </div>
  );
}
