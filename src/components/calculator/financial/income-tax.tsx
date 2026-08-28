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

type FilingStatus = "single" | "married" | "head";

interface Bracket {
  rate: number;
  upto: number; // upper bound of this bracket (Infinity for top)
}

const BRACKETS: Record<FilingStatus, Bracket[]> = {
  single: [
    { rate: 10, upto: 11600 },
    { rate: 12, upto: 47150 },
    { rate: 22, upto: 100525 },
    { rate: 24, upto: 191950 },
    { rate: 32, upto: 243725 },
    { rate: 35, upto: 609350 },
    { rate: 37, upto: Infinity },
  ],
  married: [
    { rate: 10, upto: 23200 },
    { rate: 12, upto: 94300 },
    { rate: 22, upto: 201050 },
    { rate: 24, upto: 383900 },
    { rate: 32, upto: 487450 },
    { rate: 35, upto: 731200 },
    { rate: 37, upto: Infinity },
  ],
  head: [
    { rate: 10, upto: 16550 },
    { rate: 12, upto: 63100 },
    { rate: 22, upto: 100500 },
    { rate: 24, upto: 191950 },
    { rate: 32, upto: 243700 },
    { rate: 35, upto: 609350 },
    { rate: 37, upto: Infinity },
  ],
};

const LABELS: Record<FilingStatus, string> = {
  single: "Single",
  married: "Married Filing Jointly",
  head: "Head of Household",
};

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState("85000");
  const [status, setStatus] = useState<FilingStatus>("single");

  const r = useMemo(() => {
    const taxable = Math.max(0, parseNum(income));
    const brackets = BRACKETS[status];
    let remaining = taxable;
    let prev = 0;
    let tax = 0;
    const breakdown: {
      rate: number;
      range: string;
      taxable: number;
      tax: number;
    }[] = [];
    let marginal = brackets[0]?.rate ?? 0;
    for (const b of brackets) {
      const width = b.upto - prev;
      const inBracket = Math.min(remaining, width);
      if (inBracket <= 0) {
        breakdown.push({
          rate: b.rate,
          range: `${fmtMoney(prev, { decimals: 0 })} – ${b.upto === Infinity ? "∞" : fmtMoney(b.upto, { decimals: 0 })}`,
          taxable: 0,
          tax: 0,
        });
      } else {
        const segTax = inBracket * (b.rate / 100);
        tax += segTax;
        marginal = b.rate;
        breakdown.push({
          rate: b.rate,
          range: `${fmtMoney(prev, { decimals: 0 })} – ${b.upto === Infinity ? "∞" : fmtMoney(b.upto, { decimals: 0 })}`,
          taxable: inBracket,
          tax: segTax,
        });
        remaining -= inBracket;
        if (remaining <= 0) {
          // After current bracket, push remaining (zero) brackets
          const idx = brackets.indexOf(b);
          for (let i = idx + 1; i < brackets.length; i++) {
            const nb = brackets[i];
            const pp = brackets[i - 1].upto;
            breakdown.push({
              rate: nb.rate,
              range: `${fmtMoney(pp, { decimals: 0 })} – ${nb.upto === Infinity ? "∞" : fmtMoney(nb.upto, { decimals: 0 })}`,
              taxable: 0,
              tax: 0,
            });
          }
          break;
        }
      }
      prev = b.upto;
    }
    const effective = taxable > 0 ? (tax / taxable) * 100 : 0;
    const takeHome = taxable - tax;
    return {
      taxable,
      tax,
      effective,
      marginal,
      takeHome,
      breakdown,
    };
  }, [income, status]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Tax Inputs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Taxable Income">
              <TextInput
                type="text"
                inputMode="decimal"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </Field>
            <Field label="Filing Status">
              <SelectInput
                value={status}
                onChange={(e) => setStatus(e.target.value as FilingStatus)}
              >
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
                <option value="head">Head of Household</option>
              </SelectInput>
            </Field>
          </div>
          <p className="mt-3 text-xs text-brand-muted">
            Using IRS 2024 federal income tax brackets for {LABELS[status]}.
            State taxes, deductions and credits are not included.
          </p>
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label="Federal Tax Owed"
            value={fmtMoney(r.tax)}
            sub={`${LABELS[status]} • taxable ${fmtMoney(r.taxable, { decimals: 0 })}`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Effective Rate"
              value={fmtPct(r.effective)}
              highlight={false}
            />
            <ResultCard
              label="Marginal Rate"
              value={fmtPct(r.marginal, 0)}
              highlight={false}
            />
            <ResultCard
              label="Take-Home"
              value={fmtMoney(r.takeHome)}
              highlight={false}
            />
            <ResultCard
              label="After-Tax %"
              value={r.taxable > 0 ? fmtPct(100 - r.effective) : "—"}
              highlight={false}
            />
          </div>
        </div>
      </div>

      <CalcCard title="Bracket Breakdown">
        <div className="overflow-hidden rounded-lg border border-brand">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted/50 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Rate
                </th>
                <th className="bg-muted/50 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Income Range
                </th>
                <th className="bg-muted/50 px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Taxed Amount
                </th>
                <th className="bg-muted/50 px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Tax Owed
                </th>
              </tr>
            </thead>
            <tbody>
              {r.breakdown.map((b, i) => (
                <tr
                  key={i}
                  className={`border-t border-brand ${
                    b.taxable > 0 ? "bg-white" : "opacity-50"
                  }`}
                >
                  <td className="px-3 py-2 font-medium text-brand-ink">
                    {b.rate}%
                  </td>
                  <td className="px-3 py-2 text-brand-muted">{b.range}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-brand-ink">
                    {fmtMoney(b.taxable)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-brand-ink">
                    {fmtMoney(b.tax)}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-brand bg-muted/30">
                <td colSpan={2} className="px-3 py-2 font-semibold text-brand-ink">
                  Total
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-brand-ink">
                  {fmtMoney(r.taxable)}
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-brand-ink">
                  {fmtMoney(r.tax)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-brand-muted">
          Marginal rate is the rate on your last dollar earned; effective rate
          is your average rate across all brackets (
          {fmtNum(r.tax, 0)} ÷ {fmtNum(r.taxable, 0)}).
        </p>
      </CalcCard>
    </div>
  );
}
