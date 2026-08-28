"use client";

import { useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtNum, parseNum, clamp } from "@/lib/format";

type SolveMode = "pace" | "time" | "distance";
type DistanceUnit = "km" | "mi";

const MI_PER_KM = 0.6213711922;

function parseDurationToSeconds(input: string): number {
  const s = input.trim();
  if (!s) return 0;
  // supports "hh:mm:ss", "mm:ss", "mm", or seconds as a plain number
  if (s.includes(":")) {
    const parts = s.split(":").map((p) => parseNum(p));
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 1) return parts[0];
  }
  return parseNum(s); // raw seconds if no colon; treat as minutes if user types like "5"
}

function formatDuration(seconds: number): string {
  if (!isFinite(seconds) || seconds <= 0) return "—";
  const s = Math.round(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}

function formatPace(secondsPerUnit: number): string {
  if (!isFinite(secondsPerUnit) || secondsPerUnit <= 0) return "—";
  const total = Math.round(secondsPerUnit);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

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

function ModeToggle({
  mode,
  setMode,
}: {
  mode: SolveMode;
  setMode: (m: SolveMode) => void;
}) {
  const modes: { value: SolveMode; label: string }[] = [
    { value: "pace", label: "Distance + Time → Pace" },
    { value: "time", label: "Distance + Pace → Time" },
    { value: "distance", label: "Time + Pace → Distance" },
  ];
  return (
    <div className="flex flex-wrap gap-1 rounded-lg border border-brand bg-brand-canvas p-1">
      {modes.map((m) => (
        <button
          key={m.value}
          type="button"
          onClick={() => setMode(m.value)}
          className={
            "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm " +
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

export default function PaceCalculator() {
  const [mode, setMode] = useState<SolveMode>("pace");
  const [unit, setUnit] = useState<DistanceUnit>("km");

  const [distance, setDistance] = useState("10");
  const [timeStr, setTimeStr] = useState("00:50:00");
  const [paceStr, setPaceStr] = useState("5:00");

  const distKm =
    unit === "km" ? parseNum(distance) : parseNum(distance) / MI_PER_KM;
  const totalSeconds = parseDurationToSeconds(timeStr);

  // Pace string -> seconds per km
  const paceSecondsPerKm = (() => {
    const parts = paceStr.trim().split(":").map((p) => parseNum(p));
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0] * 60; // treat as min if single number
  })();

  // Compute the unknown depending on mode
  const computed = (() => {
    if (mode === "pace") {
      // pace = time / distance
      if (distKm <= 0 || totalSeconds <= 0) return null;
      const secPerKm = totalSeconds / distKm;
      const secPerUnit = unit === "km" ? secPerKm : secPerKm / MI_PER_KM;
      const speed = distKm / (totalSeconds / 3600); // km/h
      const speedMph = speed * MI_PER_KM;
      return {
        pacePerUnit: secPerUnit,
        speedKmH: speed,
        speedMph: speedMph,
        outDistance: distKm,
        outSeconds: totalSeconds,
      };
    }
    if (mode === "time") {
      // time = pace × distance
      if (distKm <= 0 || paceSecondsPerKm <= 0) return null;
      const totalSec = paceSecondsPerKm * distKm;
      const secPerUnit =
        unit === "km" ? paceSecondsPerKm : paceSecondsPerKm / MI_PER_KM;
      const speed = distKm / (totalSec / 3600);
      return {
        pacePerUnit: secPerUnit,
        speedKmH: speed,
        speedMph: speed * MI_PER_KM,
        outDistance: distKm,
        outSeconds: totalSec,
      };
    }
    // distance = time / pace
    if (totalSeconds <= 0 || paceSecondsPerKm <= 0) return null;
    const dKm = totalSeconds / paceSecondsPerKm;
    const secPerUnit =
      unit === "km" ? paceSecondsPerKm : paceSecondsPerKm / MI_PER_KM;
    const speed = dKm / (totalSeconds / 3600);
    return {
      pacePerUnit: secPerUnit,
      speedKmH: speed,
      speedMph: speed * MI_PER_KM,
      outDistance: dKm,
      outSeconds: totalSeconds,
    };
  })();

  const speedLabel = unit === "km" ? "km/h" : "mph";
  const speedVal = unit === "km" ? computed?.speedKmH : computed?.speedMph;
  const paceLabel = `min/${unit}`;

  // Split times (every 1 unit, up to distance)
  const splitCount = computed
    ? Math.min(20, Math.max(1, Math.floor(computed.outDistance)))
    : 0;
  const splits = computed
    ? Array.from({ length: splitCount }, (_, i) => {
        const splitDist = i + 1;
        const splitSeconds =
          (mode === "distance" ? computed.outSeconds / computed.outDistance : 0) ||
          (mode === "pace"
            ? totalSeconds * (splitDist / distKm)
            : paceSecondsPerKm * splitDist);
        return { km: splitDist, seconds: splitSeconds };
      })
    : [];

  return (
    <div className="space-y-6">
      <CalcCard title="Solve for">
        <ModeToggle mode={mode} setMode={setMode} />
        <div className="mt-4">
          <Field label="Distance unit">
            <div className="flex gap-2">
              <UnitToggle
                value={unit}
                onChange={setUnit}
                options={[
                  { value: "km", label: "kilometres (km)" },
                  { value: "mi", label: "miles (mi)" },
                ]}
              />
            </div>
          </Field>
        </div>
      </CalcCard>

      <CalcCard title="Your details">
        <div className="grid gap-4 sm:grid-cols-2">
          {mode !== "distance" && (
            <Field label={`Distance (${unit})`}>
              <TextInput
                type="number"
                min={0}
                step="0.01"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="10"
              />
            </Field>
          )}

          {mode === "pace" && (
            <Field
              label="Time"
              hint="Format: hh:mm:ss or mm:ss"
            >
              <TextInput
                type="text"
                value={timeStr}
                onChange={(e) => setTimeStr(e.target.value)}
                placeholder="00:50:00"
              />
            </Field>
          )}

          {mode === "time" && (
            <Field label={`Pace (min/${unit})`} hint="Format: mm:ss">
              <TextInput
                type="text"
                value={paceStr}
                onChange={(e) => setPaceStr(e.target.value)}
                placeholder="5:00"
              />
            </Field>
          )}

          {mode === "distance" && (
            <>
              <Field label="Time" hint="Format: hh:mm:ss or mm:ss">
                <TextInput
                  type="text"
                  value={timeStr}
                  onChange={(e) => setTimeStr(e.target.value)}
                  placeholder="00:50:00"
                />
              </Field>
              <Field label={`Pace (min/${unit})`} hint="Format: mm:ss">
                <TextInput
                  type="text"
                  value={paceStr}
                  onChange={(e) => setPaceStr(e.target.value)}
                  placeholder="5:00"
                />
              </Field>
            </>
          )}
        </div>
      </CalcCard>

      {computed ? (
        <CalcCard title="Results">
          <ResultCard
            label={
              mode === "pace"
                ? `Pace per ${unit}`
                : mode === "time"
                  ? "Total time"
                  : `Distance covered`
            }
            value={
              mode === "pace"
                ? `${formatPace(computed.pacePerUnit)} ${paceLabel}`
                : mode === "time"
                  ? formatDuration(computed.outSeconds)
                  : `${fmtNum(unit === "km" ? computed.outDistance : computed.outDistance * MI_PER_KM, 2)} ${unit}`
            }
            sub={`Speed ${fmtNum(speedVal ?? 0, 2)} ${speedLabel}`}
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Pace per {unit}
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {formatPace(computed.pacePerUnit)} {paceLabel}
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                Speed
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {fmtNum(speedVal ?? 0, 2)} {speedLabel}
              </div>
            </div>
            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="text-xs font-medium text-brand-muted">
                {mode === "distance" ? "Distance" : "Total time"}
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-ink tabular-nums">
                {mode === "distance"
                  ? `${fmtNum(
                      unit === "km"
                        ? computed.outDistance
                        : computed.outDistance * MI_PER_KM,
                      2,
                    )} ${unit}`
                  : formatDuration(computed.outSeconds)}
              </div>
            </div>
          </div>

          {splits.length > 0 && (
            <div className="mt-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Split times (cumulative)
              </div>
              <div className="overflow-hidden rounded-lg border border-brand">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 text-left text-brand-muted">
                      <th className="px-3 py-2 font-medium">{unit}</th>
                      <th className="px-3 py-2 text-right font-medium">Time</th>
                      <th className="px-3 py-2 text-right font-medium">Lap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-brand-ink">
                    {splits.map((s, i) => {
                      const lapSec =
                        i === 0
                          ? s.seconds
                          : s.seconds - splits[i - 1].seconds;
                      return (
                        <tr key={s.km}>
                          <td className="px-3 py-2 font-medium tabular-nums">
                            {s.km} {unit}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums">
                            {formatDuration(s.seconds)}
                          </td>
                          <td className="px-3 py-2 text-right text-brand-muted tabular-nums">
                            {formatDuration(lapSec)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CalcCard>
      ) : (
        <div className="rounded-lg border border-dashed border-brand bg-white px-4 py-6 text-center text-sm text-brand-muted">
          Enter all required fields above to compute your {mode}.
        </div>
      )}
    </div>
  );
}
