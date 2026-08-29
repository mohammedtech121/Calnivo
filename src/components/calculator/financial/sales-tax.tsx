"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  SelectInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, parseNum } from "@/lib/format";

export default function SalesTaxCalculator() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("7.25");
  const [mode, setMode] = useState<"before" | "after">("before");

  const r = useMemo(() => {
    const a = parseNum(amount);
    const taxRate = parseNum(rate) / 100;
    let net = a;
    let tax = 0;
    let total = a;
    if (mode === "before") {
      // Amount is before tax; tax added on top
      net = a;
      tax = a * taxRate;
      total = a + tax;
    } else {
      // Amount is tax-inclusive; back out the tax
      // Guard against taxRate = -1 (division by zero) and other pathological cases
      if (taxRate <= -1) {
        net = a;
        tax = 0;
        total = a;
      } else {
        net = a / (1 + taxRate);
        tax = a - net;
        total = a;
      }
    }
    if (!isFinite(net)) net = a;
    if (!isFinite(tax)) tax = 0;
    if (!isFinite(total)) total = a;
    return { net, tax, total };
  }, [amount, rate, mode]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Inputs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Amount">
              <TextInput
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Field>
            <Field label="Sales Tax Rate (%)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Field>
            <Field label="Is the amount before or after tax?">
              <SelectInput
                value={mode}
                onChange={(e) => setMode(e.target.value as "before" | "after")}
              >
                <option value="before">Before tax (add tax)</option>
                <option value="after">After tax (extract tax)</option>
              </SelectInput>
            </Field>
          </div>
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label={mode === "before" ? "Total (with tax)" : "Net (before tax)"}
            value={fmtMoney(mode === "before" ? r.total : r.net)}
            sub={`At ${parseNum(rate)}% sales tax`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Tax Amount"
              value={fmtMoney(r.tax)}
              highlight={false}
            />
            <ResultCard
              label={mode === "before" ? "Net Amount" : "Total Amount"}
              value={fmtMoney(mode === "before" ? r.net : r.total)}
              highlight={false}
            />
          </div>
        </div>
      </div>

      <CalcCard title="Breakdown">
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Net (pre-tax)" value={fmtMoney(r.net)} />
          <Stat label="Sales Tax" value={fmtMoney(r.tax)} />
          <Stat label="Total" value={fmtMoney(r.total)} />
        </div>
        <p className="mt-3 text-xs text-brand-muted">
          {mode === "before"
            ? "You entered the pre-tax amount. Sales tax is computed and added on top."
            : "You entered the tax-inclusive total. The pre-tax amount is backed out by dividing by (1 + rate)."}
        </p>
      </CalcCard>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-brand bg-brand-canvas p-3 text-center">
      <div className="text-xs uppercase tracking-wide text-brand-muted">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tabular-nums text-brand-ink">
        {value}
      </div>
    </div>
  );
}
