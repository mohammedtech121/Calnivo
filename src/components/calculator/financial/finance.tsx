"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  SelectInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, fmtNum, fmtPct, parseNum } from "@/lib/format";

type SolveFor = "PV" | "FV" | "PMT" | "Rate" | "N";

export default function FinanceCalculator() {
  const [solveFor, setSolveFor] = useState<SolveFor>("PMT");
  const [pv, setPv] = useState("10000");
  const [fv, setFv] = useState("0");
  const [pmt, setPmt] = useState("-500");
  const [rate, setRate] = useState("6");
  const [n, setN] = useState("60");

  const result = useMemo(() => {
    const PV = parseNum(pv);
    const FV = parseNum(fv);
    const PMT = parseNum(pmt);
    const r = parseNum(rate) / 100; // decimal per period
    const N = parseNum(n);

    if (solveFor === "PV") {
      let v: number;
      if (r === 0) v = -(FV + PMT * N);
      else {
        const f = Math.pow(1 + r, N);
        v = -(FV + PMT * ((f - 1) / r)) / f;
      }
      return { value: v, fmtAs: "money" as const };
    }
    if (solveFor === "FV") {
      let v: number;
      if (r === 0) v = -(PV + PMT * N);
      else {
        const f = Math.pow(1 + r, N);
        v = -(PV * f + PMT * ((f - 1) / r));
      }
      return { value: v, fmtAs: "money" as const };
    }
    if (solveFor === "PMT") {
      let v: number;
      if (r === 0) v = N > 0 ? -(FV + PV) / N : 0;
      else {
        const f = Math.pow(1 + r, N);
        v = (-(FV + PV * f) * r) / (f - 1);
      }
      return { value: v, fmtAs: "money" as const };
    }
    if (solveFor === "N") {
      if (r === 0) {
        if (PMT === 0) return { value: NaN, fmtAs: "num" as const };
        return { value: -(FV + PV) / PMT, fmtAs: "num" as const };
      }
      const num = PMT / r - FV;
      const den = PV + PMT / r;
      const x = num / den;
      if (x <= 0 || (1 + r) <= 0) return { value: NaN, fmtAs: "num" as const };
      return { value: Math.log(x) / Math.log(1 + r), fmtAs: "num" as const };
    }
    // Solve for Rate — Newton-Raphson with bisection fallback
    // f(r) = PV*(1+r)^N + PMT*((1+r)^N - 1)/r + FV = 0
    const f = (rr: number): number => {
      if (rr === 0) return PV + PMT * N + FV;
      const p = Math.pow(1 + rr, N);
      return PV * p + PMT * ((p - 1) / rr) + FV;
    };
    const df = (rr: number): number => {
      if (rr === 0) {
        return PV * N + PMT * (N * (N - 1)) / 2;
      }
      const p = Math.pow(1 + rr, N);
      const dp = N * Math.pow(1 + rr, N - 1);
      const dPmtFactor = (dp * rr - (p - 1)) / (rr * rr);
      return PV * dp + PMT * dPmtFactor;
    };

    let guess = 0.01;
    for (let i = 0; i < 100; i++) {
      const fv0 = f(guess);
      const dv = df(guess);
      if (Math.abs(dv) < 1e-12) break;
      const next = guess - fv0 / dv;
      if (!isFinite(next)) break;
      if (Math.abs(next - guess) < 1e-10) {
        guess = next;
        break;
      }
      guess = next;
    }
    // Sanity check; if Newton diverged, fall back to bisection in (0, 10)
    if (!isFinite(guess) || Math.abs(f(guess)) > 1e-3 || guess <= -0.99 || guess > 10) {
      let lo = 0.0;
      let hi = 1.0;
      let flo = f(lo);
      let fhi = f(hi);
      // Expand upper bound until sign changes (or cap)
      while (flo * fhi > 0 && hi < 1e6) {
        hi *= 2;
        fhi = f(hi);
      }
      if (flo * fhi > 0) {
        return { value: NaN, fmtAs: "pct" as const };
      }
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
      guess = mid;
    }
    return { value: guess * 100, fmtAs: "pct" as const };
  }, [solveFor, pv, fv, pmt, rate, n]);

  const fmtVal = (v: number, fmtAs: "money" | "num" | "pct") => {
    if (!isFinite(v)) return "No solution";
    if (fmtAs === "money") return fmtMoney(v);
    if (fmtAs === "pct") return fmtPct(v, 4);
    return fmtNum(v, 2);
  };

  const isSolved = (k: SolveFor) => solveFor === k;

  return (
    <div className="space-y-4">
      <CalcCard title="Time Value of Money">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Solve For">
            <SelectInput
              value={solveFor}
              onChange={(e) => setSolveFor(e.target.value as SolveFor)}
            >
              <option value="PMT">Payment (PMT)</option>
              <option value="PV">Present Value (PV)</option>
              <option value="FV">Future Value (FV)</option>
              <option value="N">Number of Periods (N)</option>
              <option value="Rate">Rate per Period (%)</option>
            </SelectInput>
          </Field>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-brand-muted">
          Enter the four known values below (use a negative sign for cash
          outflows). The selected variable is solved automatically.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Present Value (PV)">
            <TextInput
              type="text"
              inputMode="decimal"
              value={pv}
              disabled={isSolved("PV")}
              onChange={(e) => setPv(e.target.value)}
              className={isSolved("PV") ? "opacity-60" : ""}
            />
          </Field>
          <Field label="Future Value (FV)">
            <TextInput
              type="text"
              inputMode="decimal"
              value={fv}
              disabled={isSolved("FV")}
              onChange={(e) => setFv(e.target.value)}
              className={isSolved("FV") ? "opacity-60" : ""}
            />
          </Field>
          <Field label="Payment (PMT)">
            <TextInput
              type="text"
              inputMode="decimal"
              value={pmt}
              disabled={isSolved("PMT")}
              onChange={(e) => setPmt(e.target.value)}
              className={isSolved("PMT") ? "opacity-60" : ""}
            />
          </Field>
          <Field label="Number of Periods (N)">
            <TextInput
              type="text"
              inputMode="decimal"
              value={n}
              disabled={isSolved("N")}
              onChange={(e) => setN(e.target.value)}
              className={isSolved("N") ? "opacity-60" : ""}
            />
          </Field>
          <Field label="Rate per Period (%)">
            <TextInput
              type="text"
              inputMode="decimal"
              value={rate}
              disabled={isSolved("Rate")}
              onChange={(e) => setRate(e.target.value)}
              className={isSolved("Rate") ? "opacity-60" : ""}
            />
          </Field>
        </div>
      </CalcCard>

      <CalcCard title="Result">
        <ResultCard
          label={`Solved: ${solveFor}`}
          value={fmtVal(result.value, result.fmtAs)}
          sub="Based on the inputs above"
        />
        <p className="mt-3 text-xs leading-relaxed text-brand-muted">
          The TVM equation is{" "}
          <span className="font-mono text-brand-ink">
            PV·(1+r)ᴺ + PMT·((1+r)ᴺ−1)/r + FV = 0
          </span>
          . Rate is the periodic rate — multiply by 12 to convert a monthly
          period rate into APR.
        </p>
      </CalcCard>
    </div>
  );
}
