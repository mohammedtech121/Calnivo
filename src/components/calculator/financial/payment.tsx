"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  SelectInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, fmtNum, parseNum } from "@/lib/format";

const FREQ: Record<string, { label: string; perYear: number }> = {
  monthly: { label: "Monthly", perYear: 12 },
  quarterly: { label: "Quarterly", perYear: 4 },
  semiannual: { label: "Semi-annual", perYear: 2 },
  annual: { label: "Annual", perYear: 1 },
};

export default function PaymentCalculator() {
  const [amount, setAmount] = useState("20000");
  const [termMonths, setTermMonths] = useState("60");
  const [rate, setRate] = useState("7");
  const [freq, setFreq] = useState("monthly");

  const r = useMemo(() => {
    const P = parseNum(amount);
    const months = parseNum(termMonths);
    const perYear = FREQ[freq].perYear;
    const periodsPerYear = perYear;
    const monthsPerPeriod = 12 / perYear;
    const n = monthsPerPeriod > 0 ? months / monthsPerPeriod : 0;
    const periodRate = parseNum(rate) / 100 / periodsPerYear;
    let payment = 0;
    if (n <= 0) {
      payment = 0;
    } else if (periodRate === 0) {
      payment = P / n;
    } else if (periodRate <= -1) {
      payment = 0;
    } else {
      const f = Math.pow(1 + periodRate, n);
      if (!isFinite(f)) {
        payment = P * periodRate; // asymptotic
      } else if (f !== 1) {
        payment = (P * periodRate * f) / (f - 1);
      } else {
        payment = P / n;
      }
    }
    if (!isFinite(payment)) payment = 0;
    const totalPaid = payment * n;
    const totalInterest = totalPaid - P;
    const monthlyEquiv = payment / monthsPerPeriod;
    return {
      payment,
      n: Math.round(n),
      totalPaid,
      totalInterest,
      monthlyEquiv,
      periodLabel: FREQ[freq].label.toLowerCase(),
    };
  }, [amount, termMonths, rate, freq]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Inputs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Loan Amount">
              <TextInput
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Field>
            <Field label="Term (months)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={termMonths}
                onChange={(e) => setTermMonths(e.target.value)}
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
            <Field label="Compounding Frequency">
              <SelectInput value={freq} onChange={(e) => setFreq(e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="semiannual">Semi-annual</option>
                <option value="annual">Annual</option>
              </SelectInput>
            </Field>
          </div>
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label={`Payment per ${r.periodLabel} period`}
            value={fmtMoney(r.payment)}
            sub={`${fmtNum(r.n, 0)} periods • ${fmtMoney(r.totalPaid)} total`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Total Interest"
              value={fmtMoney(r.totalInterest)}
              highlight={false}
            />
            <ResultCard
              label="Monthly Equivalent"
              value={fmtMoney(r.monthlyEquiv)}
              highlight={false}
            />
          </div>
        </div>
      </div>

      <CalcCard title="Payment Summary">
        <p className="text-sm leading-relaxed text-brand-muted">
          Payment frequency matches the compounding frequency you select. The
          effective monthly equivalent makes it easier to compare this loan
          against a standard monthly-payment loan.
        </p>
      </CalcCard>
    </div>
  );
}
