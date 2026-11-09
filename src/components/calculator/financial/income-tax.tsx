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
import { ResultActions } from "@/components/calculator/ResultActions";
import { ExplainResult } from "@/components/calculator/ExplainResult";
import { ExpandableSection } from "@/components/calculator/ExpandableSection";
import { LocalHistory } from "@/components/calculator/LocalHistory";

type FilingStatus = "single" | "married" | "head";
type TaxYear = "2025" | "2026";

interface Bracket {
  rate: number;
  upto: number; // upper bound of this bracket (Infinity for top)
}

// IRS 2025 federal tax brackets (Rev. Proc. 2024-40, taxes filed in 2026)
const BRACKETS_2025: Record<FilingStatus, Bracket[]> = {
  single: [
    { rate: 10, upto: 11925 },
    { rate: 12, upto: 48475 },
    { rate: 22, upto: 103350 },
    { rate: 24, upto: 197300 },
    { rate: 32, upto: 250525 },
    { rate: 35, upto: 626350 },
    { rate: 37, upto: Infinity },
  ],
  married: [
    { rate: 10, upto: 23850 },
    { rate: 12, upto: 96950 },
    { rate: 22, upto: 206700 },
    { rate: 24, upto: 394600 },
    { rate: 32, upto: 501050 },
    { rate: 35, upto: 751300 },
    { rate: 37, upto: Infinity },
  ],
  head: [
    { rate: 10, upto: 17000 },
    { rate: 12, upto: 64850 },
    { rate: 22, upto: 103350 },
    { rate: 24, upto: 197300 },
    { rate: 32, upto: 250500 },
    { rate: 35, upto: 626350 },
    { rate: 37, upto: Infinity },
  ],
};

// IRS 2026 federal tax brackets (Rev. Proc. 2025-32, taxes filed in 2027)
const BRACKETS_2026: Record<FilingStatus, Bracket[]> = {
  single: [
    { rate: 10, upto: 12400 },
    { rate: 12, upto: 50450 },
    { rate: 22, upto: 107650 },
    { rate: 24, upto: 205500 },
    { rate: 32, upto: 261000 },
    { rate: 35, upto: 652750 },
    { rate: 37, upto: Infinity },
  ],
  married: [
    { rate: 10, upto: 24800 },
    { rate: 12, upto: 100900 },
    { rate: 22, upto: 215300 },
    { rate: 24, upto: 411000 },
    { rate: 32, upto: 522000 },
    { rate: 35, upto: 783100 },
    { rate: 37, upto: Infinity },
  ],
  head: [
    { rate: 10, upto: 17650 },
    { rate: 12, upto: 67450 },
    { rate: 22, upto: 107650 },
    { rate: 24, upto: 205500 },
    { rate: 32, upto: 261400 },
    { rate: 35, upto: 652750 },
    { rate: 37, upto: Infinity },
  ],
};

function getBrackets(year: TaxYear): Record<FilingStatus, Bracket[]> {
  return year === "2026" ? BRACKETS_2026 : BRACKETS_2025;
}

const LABELS: Record<FilingStatus, string> = {
  single: "Single",
  married: "Married Filing Jointly",
  head: "Head of Household",
};

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState("85000");
  const [status, setStatus] = useState<FilingStatus>("single");
  const [taxYear, setTaxYear] = useState<TaxYear>("2026");

  const r = useMemo(() => {
    const taxable = Math.max(0, parseNum(income));
    const brackets = getBrackets(taxYear)[status];
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
  }, [income, status, taxYear]);

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
            <Field label="Tax Year">
              <SelectInput
                value={taxYear}
                onChange={(e) => setTaxYear(e.target.value as TaxYear)}
              >
                <option value="2026">2026 (filed in 2027)</option>
                <option value="2025">2025 (filed in 2026)</option>
              </SelectInput>
            </Field>
          </div>
          <p className="mt-3 text-xs text-brand-muted">
            Using <strong className="text-brand-ink">IRS {taxYear} federal income tax brackets</strong> for {LABELS[status]}.
            {taxYear === "2026" ? " Taxes filed in 2027." : " Taxes filed in 2026."} State taxes, most deductions and
            credits are not included. Actual tax liability depends on your specific situation —
            consult a qualified tax professional.
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

      <ResultActions summaryText="Calnivo calculation result" disabled={false} />

      <ExpandableSection
        title="Compare scenarios"
        subtitle="See how different inputs affect your result"
        badge="A/B"
      >
        <p className="text-sm text-brand-muted">Enter different values above to compare scenarios. Results update automatically.</p>
      </ExpandableSection>

      <LocalHistory calculatorId="income-tax" />
    </div>
  );
}
