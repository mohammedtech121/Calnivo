"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* Donut chart using SVG stroke-dasharray segments */
export function DonutChart({
  data,
  size = 180,
  stroke = 26,
  centerLabel,
  centerValue,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
  stroke?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = data.reduce((s, d) => s + Math.max(0, d.value), 0) || 1;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const segments = data.map((d) => {
    const val = Math.max(0, d.value);
    const len = (val / total) * c;
    return { ...d, len };
  });
  // Purely functional: offset for segment i is sum of lengths of segments 0..i-1
  const offsets = segments.map((_, i) =>
    segments.slice(0, i).reduce((sum, s) => sum + s.len, 0),
  );
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shrink-0"
      >
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#F3F2EF"
            strokeWidth={stroke}
          />
          {segments.map((s, i) => (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${s.len} ${c - s.len}`}
              strokeDashoffset={-offsets[i]}
              strokeLinecap="butt"
            />
          ))}
        </g>
        {centerValue && (
          <text
            x="50%"
            y="46%"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-brand-ink"
            style={{ fontSize: 17, fontWeight: 700 }}
          >
            {centerValue}
          </text>
        )}
        {centerLabel && (
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-[#66727C]"
            style={{ fontSize: 10, fontWeight: 500 }}
          >
            {centerLabel}
          </text>
        )}
      </svg>
      <ul className="space-y-2 text-sm">
        {data.map((d, i) => {
          const pct = (Math.max(0, d.value) / total) * 100;
          return (
            <li key={i} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-brand-muted">
                <span
                  className="inline-block h-3 w-3 rounded-sm"
                  style={{ background: d.color }}
                />
                {d.label}
              </span>
              <span className="font-medium text-brand-ink tabular-nums">
                {pct.toFixed(1)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Simple SVG line chart with optional area fill */
export function LineChart({
  data,
  height = 180,
  color = "#FF6A00",
  fill = "rgba(255, 106, 0, 0.12)",
}: {
  data: number[];
  height?: number;
  color?: string;
  fill?: string;
}) {
  if (data.length === 0) return null;
  const width = 520;
  const pad = 10;
  const max = Math.max(...data, 0);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const step = (width - pad * 2) / Math.max(1, data.length - 1);
  const pts = data.map((d, i) => {
    const x = pad + i * step;
    const y = pad + (1 - (d - min) / range) * (height - pad * 2);
    return [x, y] as const;
  });
  const linePath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
  const fillPath = `${linePath} L${pts[pts.length - 1][0].toFixed(1)},${height - pad} L${pts[0][0].toFixed(1)},${height - pad} Z`;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      preserveAspectRatio="none"
      style={{ height }}
    >
      <path d={fillPath} fill={fill} stroke="none" />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Horizontal proportion bar with legend */
export function ProportionBar({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total =
    segments.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
  return (
    <div className="space-y-2">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted/40">
        {segments.map((s, i) => (
          <div
            key={i}
            style={{
              width: `${(Math.max(0, s.value) / total) * 100}%`,
              background: s.color,
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-brand-muted">
        {segments.map((s, i) => {
          const pct = (Math.max(0, s.value) / total) * 100;
          return (
            <span key={i} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ background: s.color }}
              />
              {s.label}{" "}
              <span className="font-medium text-brand-ink">
                {pct.toFixed(1)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* Table primitives styled to brand spec */
export function DataTable({
  headers,
  rows,
  className,
}: {
  headers: React.ReactNode[];
  rows: React.ReactNode[][];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-h-96 overflow-auto rounded-lg border border-brand scroll-thin",
        className,
      )}
    >
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 z-10">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="bg-muted/50 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="border-t border-brand">
              {r.map((c, ci) => (
                <td
                  key={ci}
                  className={cn(
                    "px-3 py-2 align-middle text-brand-ink",
                    ci > 0 && "text-right tabular-nums",
                  )}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
