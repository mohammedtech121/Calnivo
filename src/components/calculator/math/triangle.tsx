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

type SolveMode = "SSS" | "SAS" | "ASA" | "AAS";

const MODES: { value: SolveMode; label: string }[] = [
  { value: "SSS", label: "SSS — three sides" },
  { value: "SAS", label: "SAS — two sides + included angle" },
  { value: "ASA", label: "ASA — two angles + included side" },
  { value: "AAS", label: "AAS — two angles + non-included side" },
];

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

interface Triangle {
  a: number;
  b: number;
  c: number;
  A: number; // degrees
  B: number;
  C: number;
  perimeter: number;
  area: number;
}

function classifyBySides(a: number, b: number, c: number): string {
  const eps = 1e-6;
  const eqAB = Math.abs(a - b) < eps;
  const eqBC = Math.abs(b - c) < eps;
  const eqAC = Math.abs(a - c) < eps;
  if (eqAB && eqBC) return "Equilateral";
  if (eqAB || eqBC || eqAC) return "Isosceles";
  return "Scalene";
}

function classifyByAngles(A: number, B: number, C: number): string {
  const eps = 1e-6;
  const max = Math.max(A, B, C);
  if (Math.abs(max - 90) < eps) return "Right";
  if (max > 90 + eps) return "Obtuse";
  return "Acute";
}

function solve(
  mode: SolveMode,
  v: { a: string; b: string; c: string; A: string; B: string },
): { triangle?: Triangle; error?: string } {
  const a = parseNum(v.a);
  const b = parseNum(v.b);
  const c = parseNum(v.c);
  const A = parseNum(v.A);
  const B = parseNum(v.B);

  if (mode === "SSS") {
    if (a <= 0 || b <= 0 || c <= 0)
      return { error: "All three sides must be positive numbers." };
    if (a + b <= c || a + c <= b || b + c <= a)
      return {
        error:
          "Triangle inequality violated: the sum of any two sides must be greater than the third.",
      };
    const A_ = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * RAD;
    const B_ = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * RAD;
    const C_ = 180 - A_ - B_;
    const s = (a + b + c) / 2;
    const area = Math.sqrt(
      Math.max(0, s * (s - a) * (s - b) * (s - c)),
    );
    return {
      triangle: { a, b, c, A: A_, B: B_, C: C_, perimeter: a + b + c, area },
    };
  }

  if (mode === "SAS") {
    // given b, c, A (sides b, c and the angle between them is A)
    if (b <= 0 || c <= 0) return { error: "Sides b and c must be positive." };
    if (A <= 0 || A >= 180)
      return { error: "Angle A must be between 0° and 180° (exclusive)." };
    const a_ = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A * DEG));
    if (a_ <= 0) return { error: "Could not compute the third side." };
    const B_ = Math.acos((a_ * a_ + c * c - b * b) / (2 * a_ * c)) * RAD;
    const C_ = 180 - A - B_;
    const s = (a_ + b + c) / 2;
    const area = Math.sqrt(
      Math.max(0, s * (s - a_) * (s - b) * (s - c)),
    );
    return {
      triangle: {
        a: a_,
        b,
        c,
        A,
        B: B_,
        C: C_,
        perimeter: a_ + b + c,
        area,
      },
    };
  }

  // ASA & AAS share: compute the third angle first
  if (A <= 0 || B <= 0 || A + B >= 180)
    return { error: "Angles A and B must each be positive and sum to less than 180°." };
  const C_ = 180 - A - B;

  if (mode === "ASA") {
    // given A, B, c (c is the side between A and B)
    if (c <= 0) return { error: "Side c must be positive." };
    const sinC = Math.sin(C_ * DEG);
    if (sinC <= 1e-12) return { error: "Angle C is too close to 0° to solve." };
    const a_ = (c * Math.sin(A * DEG)) / sinC;
    const b_ = (c * Math.sin(B * DEG)) / sinC;
    const s = (a_ + b_ + c) / 2;
    const area = Math.sqrt(
      Math.max(0, s * (s - a_) * (s - b_) * (s - c)),
    );
    return {
      triangle: {
        a: a_,
        b: b_,
        c,
        A,
        B,
        C: C_,
        perimeter: a_ + b_ + c,
        area,
      },
    };
  }

  // AAS: given A, B, a (non-included side)
  if (a <= 0) return { error: "Side a must be positive." };
  const sinA = Math.sin(A * DEG);
  if (sinA <= 1e-12) return { error: "Angle A is too close to 0° to solve." };
  const b_ = (a * Math.sin(B * DEG)) / sinA;
  const c_ = (a * Math.sin(C_ * DEG)) / sinA;
  const s = (a + b_ + c_) / 2;
  const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b_) * (s - c_)));
  return {
    triangle: {
      a,
      b: b_,
      c: c_,
      A,
      B,
      C: C_,
      perimeter: a + b_ + c_,
      area,
    },
  };
}

function TriangleSketch({ t }: { t: Triangle }) {
  // Place A at left-bottom, B at right-bottom (base = side c, opposite C),
  // C at top: Cx = Ax + b·cos(A), Cy = Ay - b·sin(A)
  const W = 320;
  const H = 240;
  const padding = 50;
  const usableW = W - padding * 2;
  const usableH = H - padding * 2;

  // Geometric coordinates (local math-style coords: Y up)
  const baseLen = t.c;
  const cxLocal = t.b * Math.cos(t.A * DEG);
  const cyLocal = t.b * Math.sin(t.A * DEG);

  // Local bounding box: x in [0, baseLen], y in [cyLocal, 0]
  const localMinX = Math.min(0, baseLen, cxLocal);
  const localMaxX = Math.max(0, baseLen, cxLocal);
  const localMinY = Math.min(0, cyLocal);
  const localMaxY = Math.max(0, cyLocal);
  const localW = Math.max(1e-6, localMaxX - localMinX);
  const localH = Math.max(1e-6, localMaxY - localMinY);

  // Scale to fit usable area, preserving aspect ratio
  const scale = Math.min(usableW / localW, usableH / localH);
  const offsetX = padding + (usableW - localW * scale) / 2 - localMinX * scale;
  const offsetY = padding + (usableH - localH * scale) / 2 - localMinY * scale;

  const toPx = (lx: number, ly: number): [number, number] => [
    offsetX + lx * scale,
    H - (offsetY + ly * scale),
  ];

  const [ax, ay] = toPx(0, 0);
  const [bx, by] = toPx(baseLen, 0);
  const [cx, cy] = toPx(cxLocal, cyLocal);

  // Midpoints for side labels (opposite vertex labels: side a ↔ vertex A → label between B & C)
  const midBC = [(bx + cx) / 2, (by + cy) / 2] as const;
  const midAC = [(ax + cx) / 2, (ay + cy) / 2] as const;
  const midAB = [(ax + bx) / 2, (ay + by) / 2] as const;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mx-auto h-auto w-full max-w-md"
      role="img"
      aria-label="Triangle sketch"
    >
      <defs>
        <marker
          id="tri-vertex"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <circle cx="3" cy="3" r="2.5" fill="#17232D" />
        </marker>
      </defs>

      {/* triangle edges */}
      <polygon
        points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
        fill="#FFF1E8"
        stroke="#F4511E"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* vertex dots */}
      <circle cx={ax} cy={ay} r="4" fill="#17232D" />
      <circle cx={bx} cy={by} r="4" fill="#17232D" />
      <circle cx={cx} cy={cy} r="4" fill="#17232D" />

      {/* vertex labels: A opposite side a (BC), B opposite side b (AC), C opposite side c (AB) */}
      {/* Place A near vertex A (bottom-left), etc. */}
      <text
        x={ax - 14}
        y={ay + 4}
        className="fill-[#17232D]"
        fontSize="13"
        fontWeight="700"
      >
        A
      </text>
      <text
        x={bx + 8}
        y={by + 4}
        className="fill-[#17232D]"
        fontSize="13"
        fontWeight="700"
      >
        B
      </text>
      <text
        x={cx}
        y={cy - 10}
        className="fill-[#17232D]"
        fontSize="13"
        fontWeight="700"
        textAnchor="middle"
      >
        C
      </text>

      {/* side labels — side a (opposite A) is between B & C, etc. */}
      <text
        x={midBC[0]}
        y={midBC[1]}
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
        className="fill-[#F4511E]"
        dx={6}
      >
        a
      </text>
      <text
        x={midAC[0]}
        y={midAC[1]}
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
        className="fill-[#F4511E]"
        dx={-8}
      >
        b
      </text>
      <text
        x={midAB[0]}
        y={midAB[1] + 14}
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
        className="fill-[#F4511E]"
      >
        c
      </text>

      {/* angle arc indicators */}
      <AngleArc x={ax} y={ay} r={18} fromDeg={0} toDeg={t.A} flipY />
      <AngleArc
        x={bx}
        y={by}
        r={18}
        fromDeg={180 - t.B}
        toDeg={180}
        flipY
      />
      <AngleArc
        x={cx}
        y={cy}
        r={18}
        fromDeg={-90 - t.C / 2}
        sweepDeg={t.C}
        flipY
      />
    </svg>
  );
}

function AngleArc({
  x,
  y,
  r,
  fromDeg,
  toDeg,
  sweepDeg,
  flipY,
}: {
  x: number;
  y: number;
  r: number;
  fromDeg?: number;
  toDeg?: number;
  sweepDeg?: number;
  flipY?: boolean;
}) {
  let start = fromDeg ?? 0;
  let end = toDeg ?? (sweepDeg ?? 0);
  if (sweepDeg !== undefined) {
    end = start + sweepDeg;
  }
  const pts: string[] = [];
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    const ang = ((start + ((end - start) * i) / steps) * Math.PI) / 180;
    const py = flipY ? -Math.sin(ang) : Math.sin(ang);
    const px = Math.cos(ang);
    pts.push(`${x + px * r},${y + py * r}`);
  }
  return (
    <polyline
      points={pts.join(" ")}
      fill="none"
      stroke="#66727C"
      strokeWidth="1"
      strokeDasharray="2 2"
    />
  );
}

export default function TriangleCalculator() {
  const [mode, setMode] = useState<SolveMode>("SSS");
  const [a, setSideA] = useState("5");
  const [b, setSideB] = useState("6");
  const [c, setSideC] = useState("7");
  const [A, setAngleA] = useState("45");
  const [B, setAngleB] = useState("60");

  const result = solve(mode, { a, b, c, A, B });

  return (
    <div className="space-y-6">
      <CalcCard title="Given (solve mode)">
        <Field label="What do you know?">
          <SelectInput
            value={mode}
            onChange={(e) => setMode(e.target.value as SolveMode)}
          >
            {MODES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </SelectInput>
        </Field>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {mode === "SSS" && (
            <>
              <Field label="Side a">
                <TextInput
                  type="number"
                  value={a}
                  onChange={(e) => setSideA(e.target.value)}
                  placeholder="5"
                />
              </Field>
              <Field label="Side b">
                <TextInput
                  type="number"
                  value={b}
                  onChange={(e) => setSideB(e.target.value)}
                  placeholder="6"
                />
              </Field>
              <Field label="Side c">
                <TextInput
                  type="number"
                  value={c}
                  onChange={(e) => setSideC(e.target.value)}
                  placeholder="7"
                />
              </Field>
            </>
          )}

          {mode === "SAS" && (
            <>
              <Field label="Side b">
                <TextInput
                  type="number"
                  value={b}
                  onChange={(e) => setSideB(e.target.value)}
                  placeholder="6"
                />
              </Field>
              <Field label="Side c">
                <TextInput
                  type="number"
                  value={c}
                  onChange={(e) => setSideC(e.target.value)}
                  placeholder="7"
                />
              </Field>
              <Field label="Angle A (degrees, included between b and c)">
                <TextInput
                  type="number"
                  value={A}
                  onChange={(e) => setAngleA(e.target.value)}
                  placeholder="45"
                />
              </Field>
            </>
          )}

          {mode === "ASA" && (
            <>
              <Field label="Angle A (degrees)">
                <TextInput
                  type="number"
                  value={A}
                  onChange={(e) => setAngleA(e.target.value)}
                  placeholder="45"
                />
              </Field>
              <Field label="Angle B (degrees)">
                <TextInput
                  type="number"
                  value={B}
                  onChange={(e) => setAngleB(e.target.value)}
                  placeholder="60"
                />
              </Field>
              <Field label="Side c (included between A and B)">
                <TextInput
                  type="number"
                  value={c}
                  onChange={(e) => setSideC(e.target.value)}
                  placeholder="7"
                />
              </Field>
            </>
          )}

          {mode === "AAS" && (
            <>
              <Field label="Angle A (degrees)">
                <TextInput
                  type="number"
                  value={A}
                  onChange={(e) => setAngleA(e.target.value)}
                  placeholder="45"
                />
              </Field>
              <Field label="Angle B (degrees)">
                <TextInput
                  type="number"
                  value={B}
                  onChange={(e) => setAngleB(e.target.value)}
                  placeholder="60"
                />
              </Field>
              <Field label="Side a (opposite angle A)">
                <TextInput
                  type="number"
                  value={a}
                  onChange={(e) => setSideA(e.target.value)}
                  placeholder="5"
                />
              </Field>
            </>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMode(m.value)}
              className={
                "rounded-lg border border-brand px-3 py-1.5 text-sm font-medium transition-colors " +
                (mode === m.value
                  ? "bg-brand-accent-gradient text-white shadow-accent"
                  : "bg-white text-brand-ink hover:bg-accent/50")
              }
            >
              {m.value}
            </button>
          ))}
        </div>
      </CalcCard>

      <CalcCard title="Results">
        {result.error ? (
          <div className="rounded-lg border border-dashed border-brand bg-accent/40 px-4 py-6 text-center text-sm font-medium text-brand-accent-deep">
            {result.error}
          </div>
        ) : result.triangle ? (
          <ResultBody t={result.triangle} />
        ) : null}
      </CalcCard>

      {result.triangle && (
        <CalcCard title="Sketch">
          <TriangleSketch t={result.triangle} />
          <p className="mt-3 text-center text-xs text-brand-muted">
            Sides are labelled with the letter opposite their vertex (side a is
            opposite angle A, etc.). Dashed arcs mark the interior angles.
          </p>
        </CalcCard>
      )}
    </div>
  );
}

function ResultBody({ t }: { t: Triangle }) {
  const sideType = classifyBySides(t.a, t.b, t.c);
  const angleType = classifyByAngles(t.A, t.B, t.C);
  return (
    <>
      <ResultCard
        label="Triangle type"
        value={`${sideType} · ${angleType}`}
        sub={`Perimeter ${fmtNum(t.perimeter, 4)} · Area ${fmtNum(t.area, 4)}`}
      />

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Side a" value={fmtNum(t.a, 4)} />
        <Stat label="Side b" value={fmtNum(t.b, 4)} />
        <Stat label="Side c" value={fmtNum(t.c, 4)} />
        <Stat label="Angle A" value={`${fmtNum(t.A, 4)}°`} />
        <Stat label="Angle B" value={`${fmtNum(t.B, 4)}°`} />
        <Stat label="Angle C" value={`${fmtNum(t.C, 4)}°`} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Perimeter" value={fmtNum(t.perimeter, 4)} />
        <Stat label="Area (Heron)" value={fmtNum(t.area, 4)} />
        <Stat
          label="Sum of angles"
          value={`${fmtNum(t.A + t.B + t.C, 4)}°`}
        />
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-brand bg-brand-canvas p-3">
      <div className="text-xs font-medium text-brand-muted">{label}</div>
      <div className="mt-1 font-mono text-sm font-semibold text-brand-ink tabular-nums">
        {value}
      </div>
    </div>
  );
}
