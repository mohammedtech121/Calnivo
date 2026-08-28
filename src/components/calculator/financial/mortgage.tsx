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
import { DonutChart } from "./_shared";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("80000");
  const [downUnit, setDownUnit] = useState<"usd" | "pct">("usd");
  const [loanYears, setLoanYears] = useState("30");
  const [rate, setRate] = useState("6.8");
  const [includeCosts, setIncludeCosts] = useState(false);
  const [propertyTax, setPropertyTax] = useState("1.1");
  const [homeInsurance, setHomeInsurance] = useState("1400");
  const [hoa, setHoa] = useState("0");
  const [other, setOther] = useState("0");

  const r = useMemo(() => {
    const home = parseNum(homePrice);
    const dp =
      downUnit === "usd"
        ? parseNum(downPayment)
        : (parseNum(downPayment) / 100) * home;
    const principal = Math.max(0, home - dp);
    const annualRate = parseNum(rate);
    const monthlyRate = annualRate / 100 / 12;
    const n = parseNum(loanYears) * 12;
    let pi = 0;
    if (monthlyRate === 0) {
      pi = n > 0 ? principal / n : 0;
    } else {
      const f = Math.pow(1 + monthlyRate, n);
      pi = (principal * monthlyRate * f) / (f - 1);
    }

    const monthlyTax =
      includeCosts && home ? (home * (parseNum(propertyTax) / 100)) / 12 : 0;
    const monthlyIns =
      includeCosts ? parseNum(homeInsurance) / 12 : 0;
    const monthlyHoa = includeCosts ? parseNum(hoa) : 0;
    const monthlyOther = includeCosts ? parseNum(other) / 12 : 0;

    const totalMonthly = pi + monthlyTax + monthlyIns + monthlyHoa + monthlyOther;

    return {
      principal,
      pi,
      monthlyTax,
      monthlyIns,
      monthlyHoa,
      monthlyOther,
      totalMonthly,
      n,
      home,
    };
  }, [
    homePrice,
    downPayment,
    downUnit,
    loanYears,
    rate,
    includeCosts,
    propertyTax,
    homeInsurance,
    hoa,
    other,
  ]);

  const totalPi = r.pi * r.n;
  const totalTax = r.monthlyTax * r.n;
  const totalIns = r.monthlyIns * r.n;
  const totalHoa = r.monthlyHoa * r.n;
  const totalOther = r.monthlyOther * r.n;
  const grandTotal = r.totalMonthly * r.n;

  const donut = [
    { label: "Principal & Interest", value: r.pi, color: "#FF6A00" },
    { label: "Property Tax", value: r.monthlyTax, color: "#F4511E" },
    { label: "Insurance", value: r.monthlyIns, color: "#17232D" },
    { label: "HOA + Other", value: r.monthlyHoa + r.monthlyOther, color: "#C9A227" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Loan Inputs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Home Price">
              <TextInput
                type="text"
                inputMode="decimal"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
              />
            </Field>
            <Field label="Loan Program">
              <SelectInput
                value={loanYears}
                onChange={(e) => setLoanYears(e.target.value)}
              >
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="30">30 years</option>
              </SelectInput>
            </Field>
            <Field label="Down Payment">
              <TextInput
                type="text"
                inputMode="decimal"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
              />
            </Field>
            <Field label="Down Payment Unit">
              <SelectInput
                value={downUnit}
                onChange={(e) =>
                  setDownUnit(e.target.value as "usd" | "pct")
                }
              >
                <option value="usd">$ (dollars)</option>
                <option value="pct">% (percent)</option>
              </SelectInput>
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

          <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-brand-ink">
            <input
              type="checkbox"
              checked={includeCosts}
              onChange={(e) => setIncludeCosts(e.target.checked)}
              className="h-4 w-4 accent-[#FF6A00]"
            />
            Include taxes, insurance & HOA
          </label>

          {includeCosts && (
            <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-brand bg-brand-canvas p-3 sm:grid-cols-2">
              <Field label="Property Tax (% / yr)">
                <TextInput
                  type="text"
                  inputMode="decimal"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(e.target.value)}
                />
              </Field>
              <Field label="Home Insurance ($ / yr)">
                <TextInput
                  type="text"
                  inputMode="decimal"
                  value={homeInsurance}
                  onChange={(e) => setHomeInsurance(e.target.value)}
                />
              </Field>
              <Field label="HOA ($ / mo)">
                <TextInput
                  type="text"
                  inputMode="decimal"
                  value={hoa}
                  onChange={(e) => setHoa(e.target.value)}
                />
              </Field>
              <Field label="Other ($ / yr)">
                <TextInput
                  type="text"
                  inputMode="decimal"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
              </Field>
            </div>
          )}
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label="Monthly Payment"
            value={fmtMoney(r.totalMonthly)}
            sub={`Loan amount ${fmtMoney(r.principal)} • ${loanYears}-yr fixed`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Loan Principal"
              value={fmtMoney(r.principal)}
              highlight={false}
            />
            <ResultCard
              label="Total of Payments"
              value={fmtMoney(grandTotal)}
              highlight={false}
            />
          </div>
          <CalcCard>
            <DonutChart
              data={donut}
              centerLabel="/ month"
              centerValue={fmtMoney(r.totalMonthly, { decimals: 0 })}
            />
          </CalcCard>
        </div>
      </div>

      <CalcCard title="Payment Breakdown">
        <div className="overflow-hidden rounded-lg border border-brand">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted/50 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Component
                </th>
                <th className="bg-muted/50 px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Monthly
                </th>
                <th className="bg-muted/50 px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Total ({r.n} mo)
                </th>
              </tr>
            </thead>
            <tbody>
              <Row label="Principal & Interest" m={r.pi} t={totalPi} color="#FF6A00" />
              {includeCosts && (
                <>
                  <Row label="Property Tax" m={r.monthlyTax} t={totalTax} color="#F4511E" />
                  <Row label="Home Insurance" m={r.monthlyIns} t={totalIns} color="#17232D" />
                  <Row label="HOA" m={r.monthlyHoa} t={totalHoa} color="#C9A227" />
                  <Row label="Other" m={r.monthlyOther} t={totalOther} color="#66727C" />
                </>
              )}
              <tr className="border-t border-brand bg-muted/30">
                <td className="px-3 py-2 font-semibold text-brand-ink">Total</td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-brand-ink">
                  {fmtMoney(r.totalMonthly)}
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-brand-ink">
                  {fmtMoney(grandTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CalcCard>
    </div>
  );
}

function Row({
  label,
  m,
  t,
  color,
}: {
  label: string;
  m: number;
  t: number;
  color: string;
}) {
  return (
    <tr className="border-t border-brand">
      <td className="px-3 py-2 text-brand-ink">
        <span className="mr-2 inline-block h-2.5 w-2.5 rounded-sm align-middle" style={{ background: color }} />
        {label}
      </td>
      <td className="px-3 py-2 text-right tabular-nums text-brand-ink">{fmtMoney(m)}</td>
      <td className="px-3 py-2 text-right tabular-nums text-brand-ink">{fmtMoney(t)}</td>
    </tr>
  );
}
