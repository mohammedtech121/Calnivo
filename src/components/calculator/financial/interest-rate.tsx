"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, fmtPct, fmtNum, parseNum } from "@/lib/format";

export default function InterestRateCalculator() {
  const [amount, setAmount] = useState("20000");
  const [payment, setPayment] = useState("400");
  const [term, setTerm] = useState("60");

  const r = useMemo(() => {
    const P = parseNum(amount);
    const PMT = parseNum(payment);
    const n = parseNum(term);

    // f(monthlyRate) = P*r*(1+r)^n - PMT*((1+r)^n - 1) = 0
    const f = (rr: number): number => {
      if (rr === 0) return P - PMT * n;
      const p = Math.pow(1 + rr, n);
      return P * rr * p - PMT * (p - 1);
    };
    const df = (rr: number): number => {
      if (rr === 0) {
        // derivative at r=0: P - PMT*n*(n-1)/2 (limit)
        return P - PMT * (n * (n - 1)) / 2;
      }
      const p = Math.pow(1 + rr, n);
      const dp = n * Math.pow(1 + rr, n - 1);
      return P * (p + rr * dp) - PMT * dp;
    };

    // Bisection search for monthly rate in (0, 1) — handles wide range robustly
    let lo = 0.0;
    let hi = 1.0; // 100% monthly rate ceiling
    let flo = f(lo);
    let fhi = f(hi);
    let monthlyRate = NaN;

    // Sanity: payment must be high enough to cover a 0% loan: PMT * n >= P
    if (PMT * n < P) {
      // Payment too small to ever pay off — no positive rate solution
      return {
        monthlyRate: NaN,
        apr: NaN,
        totalInterest: NaN,
        totalPaid: PMT * n,
        invalid: true as const,
      };
    }

    while (flo * fhi > 0 && hi < 1e6) {
      hi *= 2;
      fhi = f(hi);
    }
    if (flo * fhi <= 0) {
      let mid = 0;
      for (let i = 0; i < 200; i++) {
        mid = (lo + hi) / 2;
        const fm = f(mid);
        if (Math.abs(fm) < 1e-10) break;
        if (flo * fm < 0) {
          hi = mid;
          fhi = fm;
        } else {
          lo = mid;
          flo = fm;
        }
      }
      // Refine with a few Newton steps
      let g = mid;
      for (let i = 0; i < 50; i++) {
        const v = f(g);
        const d = df(g);
        if (Math.abs(d) < 1e-12) break;
        const next = g - v / d;
        if (!isFinite(next)) break;
        if (Math.abs(next - g) < 1e-12) {
          g = next;
          break;
        }
        g = next;
      }
      monthlyRate = g;
    }

    const apr = monthlyRate * 12 * 100;
    const totalPaid = PMT * n;
    const totalInterest = totalPaid - P;
    return {
      monthlyRate,
      apr,
      totalInterest,
      totalPaid,
      invalid: false as const,
    };
  }, [amount, payment, term]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Loan Inputs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Loan Amount">
              <TextInput
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Field>
            <Field label="Monthly Payment">
              <TextInput
                type="text"
                inputMode="decimal"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              />
            </Field>
            <Field label="Term (months)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </Field>
          </div>
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label="Annual Percentage Rate (APR)"
            value={isFinite(r.apr) ? fmtPct(r.apr, 3) : "—"}
            sub={
              r.invalid
                ? "Payment too small to pay off loan"
                : `Monthly rate ${isFinite(r.monthlyRate) ? fmtPct(r.monthlyRate * 100, 4) : "—"}`
            }
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Total Interest"
              value={fmtMoney(r.totalInterest)}
              highlight={false}
            />
            <ResultCard
              label="Total Paid"
              value={fmtMoney(r.totalPaid)}
              highlight={false}
            />
          </div>
        </div>
      </div>

      <CalcCard title="How It Works">
        <p className="text-sm leading-relaxed text-brand-muted">
          This calculator reverses the standard amortization formula to solve
          for the rate. With loan amount{" "}
          <span className="font-medium text-brand-ink">{fmtMoney(parseNum(amount), { decimals: 0 })}</span>
          , monthly payment{" "}
          <span className="font-medium text-brand-ink">{fmtMoney(parseNum(payment), { decimals: 2 })}</span>
          , and term{" "}
          <span className="font-medium text-brand-ink">{fmtNum(parseNum(term), 0)} months</span>, the
          effective APR is{" "}
          <span className="font-medium text-brand-ink">
            {isFinite(r.apr) ? fmtPct(r.apr, 3) : "not solvable"}
          </span>
          .
        </p>
      </CalcCard>
    </div>
  );
}
