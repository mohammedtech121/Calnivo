"use client";

import { CalculatorShell } from "./CalculatorShell";
import { CALCULATOR_MAP } from "@/lib/calculators/registry";
import {
  FinancialCalculators,
  HealthCalculators,
  MathCalculators,
  OtherCalculators,
} from "./registry";

export function CalculatorPage({ id }: { id: string }) {
  const meta = CALCULATOR_MAP[id];
  if (!meta) {
    return (
      <div className="mx-auto max-w-[800px] px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-brand-ink">Calculator not found</h1>
        <p className="mt-2 text-brand-muted">This calculator doesn&apos;t exist yet.</p>
      </div>
    );
  }

  const Comp =
    meta.category === "financial"
      ? FinancialCalculators[id]
      : meta.category === "health"
        ? HealthCalculators[id]
        : meta.category === "math"
          ? MathCalculators[id]
          : OtherCalculators[id];

  return (
    <CalculatorShell id={id}>
      {Comp ? <Comp /> : <ComingSoon name={meta.name} />}
    </CalculatorShell>
  );
}

function ComingSoon({ name }: { name: string }) {
  return (
    <div className="rounded-xl border border-dashed border-brand bg-white p-10 text-center">
      <p className="text-brand-ink font-semibold">{name}</p>
      <p className="mt-1 text-sm text-brand-muted">This calculator is being polished.</p>
    </div>
  );
}
