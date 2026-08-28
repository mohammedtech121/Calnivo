"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  ResultCard,
  SelectInput,
  TextInput,
} from "@/components/calculator/CalculatorShell";
import { fmtNum, parseNum } from "@/lib/format";

type Shape = "slab" | "footing" | "column" | "hole";

// Bag yields (cubic feet per bag)
const BAG_YIELDS = [
  { label: "40 lb bag", cubicFeet: 0.3 },
  { label: "60 lb bag", cubicFeet: 0.45 },
  { label: "80 lb bag", cubicFeet: 0.6 },
  { label: "90 lb bag", cubicFeet: 0.675 },
];

// Unit options for dimension entry
const DIM_UNITS = [
  { label: "in", toFt: 1 / 12 },
  { label: "ft", toFt: 1 },
  { label: "cm", toFt: 1 / 30.48 },
  { label: "m", toFt: 1 / 0.3048 },
];

export default function ConcreteCalculator() {
  const [shape, setShape] = useState<Shape>("slab");
  const [length, setLength] = useState<string>("10");
  const [width, setWidth] = useState<string>("10");
  const [depth, setDepth] = useState<string>("4");
  const [diameter, setDiameter] = useState<string>("12");
  const [height, setHeight] = useState<string>("8");
  const [quantity, setQuantity] = useState<string>("1");
  const [unit, setUnit] = useState<string>("in");
  const [bagIdx, setBagIdx] = useState<number>(2); // 80lb default
  const [waste, setWaste] = useState<string>("5");

  const toFt = DIM_UNITS.find((u) => u.label === unit)?.toFt ?? 1;
  const wastePct = parseNum(waste);

  const vol = useMemo(() => {
    const qty = Math.max(1, Math.round(parseNum(quantity)));
    const L = parseNum(length) * toFt;
    const W = parseNum(width) * toFt;
    const D = parseNum(depth) * toFt;
    const dia = parseNum(diameter) * toFt;
    const h = parseNum(height) * toFt;
    let cf = 0;
    if (shape === "slab" || shape === "footing") {
      cf = L * W * D;
    } else if (shape === "column") {
      // square column: L x W x h
      cf = L * W * h;
    } else if (shape === "hole") {
      // round hole / cylindrical column: π × (dia/2)² × h
      cf = Math.PI * (dia / 2) ** 2 * h;
    }
    return { cubicFeet: cf * qty, qty };
  }, [shape, length, width, depth, diameter, height, quantity, toFt]);

  const cubicFeet = vol.cubicFeet;
  const cubicYards = cubicFeet / 27;
  const cubicMeters = cubicFeet * 0.0283168;
  const bagYield = BAG_YIELDS[bagIdx].cubicFeet;
  const bagsExact = bagYield > 0 ? cubicFeet / bagYield : 0;
  const bagsWithWaste = bagsExact * (1 + wastePct / 100);
  const bagsRounded = Math.ceil(bagsWithWaste);

  return (
    <div className="space-y-6">
      <CalcCard title="Inputs">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Shape">
            <SelectInput
              value={shape}
              onChange={(e) => setShape(e.target.value as Shape)}
            >
              <option value="slab">Slab</option>
              <option value="footing">Footing</option>
              <option value="column">Column (square)</option>
              <option value="hole">Hole / Round column</option>
            </SelectInput>
          </Field>
          <Field label="Measurement unit">
            <SelectInput
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              {DIM_UNITS.map((u) => (
                <option key={u.label} value={u.label}>
                  {u.label}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Quantity">
            <TextInput
              type="number"
              inputMode="numeric"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
              className="tabular-nums"
            />
          </Field>
        </div>

        <div className="mt-4">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-brand-muted">
            Dimensions
          </div>
          {(shape === "slab" || shape === "footing") && (
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Length">
                <TextInput
                  type="number"
                  inputMode="decimal"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="tabular-nums"
                />
              </Field>
              <Field label="Width">
                <TextInput
                  type="number"
                  inputMode="decimal"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="tabular-nums"
                />
              </Field>
              <Field label={shape === "footing" ? "Depth / thickness" : "Depth / thickness"}>
                <TextInput
                  type="number"
                  inputMode="decimal"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  className="tabular-nums"
                />
              </Field>
            </div>
          )}
          {shape === "column" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Side A (length)">
                <TextInput
                  type="number"
                  inputMode="decimal"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="tabular-nums"
                />
              </Field>
              <Field label="Side B (width)">
                <TextInput
                  type="number"
                  inputMode="decimal"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="tabular-nums"
                />
              </Field>
              <Field label="Height">
                <TextInput
                  type="number"
                  inputMode="decimal"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="tabular-nums"
                />
              </Field>
            </div>
          )}
          {shape === "hole" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Diameter">
                <TextInput
                  type="number"
                  inputMode="decimal"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  className="tabular-nums"
                />
              </Field>
              <Field label="Depth / height">
                <TextInput
                  type="number"
                  inputMode="decimal"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="tabular-nums"
                />
              </Field>
            </div>
          )}
        </div>
      </CalcCard>

      <CalcCard title="Bag Estimate">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Bag size">
            <SelectInput
              value={bagIdx}
              onChange={(e) => setBagIdx(parseInt(e.target.value, 10))}
            >
              {BAG_YIELDS.map((b, i) => (
                <option key={b.label} value={i}>
                  {b.label} (~{b.cubicFeet} cu ft each)
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Extra waste %">
            <TextInput
              type="number"
              inputMode="decimal"
              value={waste}
              onChange={(e) => setWaste(e.target.value)}
              className="tabular-nums"
            />
          </Field>
        </div>
      </CalcCard>

      <CalcCard title="Results">
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Bags needed"
            value={String(bagsRounded)}
            sub={`${BAG_YIELDS[bagIdx].label} · incl. ${wastePct}% waste`}
          />
          <ResultCard
            label="Volume"
            value={`${fmtNum(cubicYards, 3)} yd³`}
            sub={`${fmtNum(cubicFeet, 2)} cu ft · ${fmtNum(cubicMeters, 3)} m³`}
            highlight={false}
          />
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-brand">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left text-xs font-medium uppercase tracking-wide text-brand-muted">
                <th className="px-3 py-2">Metric</th>
                <th className="px-3 py-2 text-right tabular-nums">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-brand">
                <td className="px-3 py-2 text-brand-ink">Cubic feet</td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-brand-ink">
                  {fmtNum(cubicFeet, 2)} ft³
                </td>
              </tr>
              <tr className="border-t border-brand">
                <td className="px-3 py-2 text-brand-ink">Cubic yards</td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-brand-ink">
                  {fmtNum(cubicYards, 3)} yd³
                </td>
              </tr>
              <tr className="border-t border-brand">
                <td className="px-3 py-2 text-brand-ink">Cubic meters</td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-brand-ink">
                  {fmtNum(cubicMeters, 3)} m³
                </td>
              </tr>
              <tr className="border-t border-brand">
                <td className="px-3 py-2 text-brand-ink">
                  Bags ({BAG_YIELDS[bagIdx].label}), exact
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-brand-ink">
                  {fmtNum(bagsExact, 2)}
                </td>
              </tr>
              <tr className="border-t border-brand">
                <td className="px-3 py-2 text-brand-ink">
                  Bags (incl. {wastePct}% waste), rounded up
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-brand-accent-deep">
                  {bagsRounded}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CalcCard>
    </div>
  );
}
