"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, parseNum } from "@/lib/format";

export default function AutoLoanCalculator() {
  const [price, setPrice] = useState("32000");
  const [downPayment, setDownPayment] = useState("6000");
  const [tradeIn, setTradeIn] = useState("4000");
  const [salesTax, setSalesTax] = useState("7.25");
  const [term, setTerm] = useState("60");
  const [rate, setRate] = useState("6.9");

  const r = useMemo(() => {
    const p = parseNum(price);
    const dp = parseNum(downPayment);
    const ti = parseNum(tradeIn);
    const taxRate = parseNum(salesTax) / 100;
    const months = parseNum(term);
    const financed = Math.max(0, p - dp - ti);
    // Sales tax is typically assessed on (price - trade-in)
    const taxAmount = Math.max(0, p - ti) * taxRate;
    const monthlyRate = parseNum(rate) / 100 / 12;
    let monthly = 0;
    if (monthlyRate === 0) {
      monthly = months > 0 ? financed / months : 0;
    } else {
      const f = Math.pow(1 + monthlyRate, months);
      monthly = (financed * monthlyRate * f) / (f - 1);
    }
    const totalPaid = monthly * months;
    const totalInterest = totalPaid - financed;
    const totalCost = dp + ti + totalPaid + taxAmount;
    return {
      financed,
      taxAmount,
      monthly,
      totalPaid,
      totalInterest,
      totalCost,
      months,
    };
  }, [price, downPayment, tradeIn, salesTax, term, rate]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Vehicle & Loan">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Vehicle Price">
              <TextInput
                type="text"
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Field>
            <Field label="Down Payment">
              <TextInput
                type="text"
                inputMode="decimal"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
              />
            </Field>
            <Field label="Trade-in Value">
              <TextInput
                type="text"
                inputMode="decimal"
                value={tradeIn}
                onChange={(e) => setTradeIn(e.target.value)}
              />
            </Field>
            <Field label="Sales Tax (%)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={salesTax}
                onChange={(e) => setSalesTax(e.target.value)}
              />
            </Field>
            <Field label="Loan Term (months)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </Field>
            <Field label="Interest Rate (% / yr)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Field>
          </div>
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label="Monthly Payment"
            value={fmtMoney(r.monthly)}
            sub={`${r.months} months • ${fmtMoney(r.financed)} financed`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Total Interest"
              value={fmtMoney(r.totalInterest)}
              highlight={false}
            />
            <ResultCard
              label="Sales Tax"
              value={fmtMoney(r.taxAmount)}
              highlight={false}
            />
            <ResultCard
              label="Total Loan Paid"
              value={fmtMoney(r.totalPaid)}
              highlight={false}
            />
            <ResultCard
              label="Total Cost (incl. tax)"
              value={fmtMoney(r.totalCost)}
              highlight={false}
            />
          </div>
        </div>
      </div>

      <CalcCard title="Cost Summary">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Amount Financed" value={fmtMoney(r.financed)} />
          <Stat label="Down + Trade-in" value={fmtMoney(parseNum(downPayment) + parseNum(tradeIn))} />
          <Stat label="Interest" value={fmtMoney(r.totalInterest)} />
          <Stat label="Sales Tax" value={fmtMoney(r.taxAmount)} />
        </div>
        <p className="mt-3 text-xs text-brand-muted">
          Sales tax is computed on the vehicle price minus trade-in value. The
          total cost includes your down payment, trade-in value, all loan
          payments and sales tax.
        </p>
      </CalcCard>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-brand bg-brand-canvas p-3">
      <div className="text-xs text-brand-muted">{label}</div>
      <div className="mt-1 text-lg font-semibold tabular-nums text-brand-ink">
        {value}
      </div>
    </div>
  );
}
