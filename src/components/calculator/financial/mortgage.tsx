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
import { DonutChart, LabeledLineChart } from "./_shared";
import { CopyResultButton } from "@/components/calculator/CopyResultButton";

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
    if (n <= 0) {
      pi = 0;
    } else if (monthlyRate === 0) {
      pi = principal / n;
    } else if (monthlyRate <= -1) {
      // Pathological negative rate — no meaningful amortization
      pi = 0;
    } else {
      const f = Math.pow(1 + monthlyRate, n);
      if (!isFinite(f)) {
        // Math.pow overflowed — use asymptotic formula (f → ∞ ⇒ pi → principal × monthlyRate)
        pi = principal * monthlyRate;
      } else if (f !== 1) {
        pi = (principal * monthlyRate * f) / (f - 1);
      } else {
        pi = principal / n;
      }
    }
    if (!isFinite(pi)) pi = 0;

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

  // Balance-over-time: same amortization formula, sampled yearly (max ~31 points).
  // Derived from the same r.pi / principal / monthlyRate — no duplicate logic.
  const balanceOverTime = useMemo(() => {
    if (!r.pi || !r.principal || r.n <= 0) return [];
    const monthlyRate = parseNum(rate) / 100 / 12;
    const years = Math.ceil(r.n / 12);
    const pts: { x: string; y: number }[] = [];
    pts.push({ x: "Yr 0", y: Math.round(r.principal) });
    for (let y = 1; y <= years && y <= 31; y++) {
      const month = y * 12;
      if (monthlyRate === 0) {
        pts.push({ x: `Yr ${y}`, y: Math.max(0, Math.round(r.principal - r.pi * month)) });
      } else {
        const f = Math.pow(1 + monthlyRate, month);
        const bal = (r.principal * f - r.pi * (f - 1) / monthlyRate);
        pts.push({ x: `Yr ${y}`, y: Math.max(0, Math.round(bal)) });
      }
    }
    return pts;
  }, [r.pi, r.principal, r.n, rate]);

  const copyText = useMemo(() => {
    return [
      "Calnivo Mortgage Calculator",
      "",
      `Home Price: ${fmtMoney(r.home)}`,
      `Down Payment: ${fmtMoney(parseNum(downPayment))}${downUnit === "pct" ? " (" + parseNum(downPayment) + "%)" : ""}`,
      `Loan Term: ${loanYears} years`,
      `Interest Rate: ${parseNum(rate)}%`,
      "",
      `Monthly Payment: ${fmtMoney(r.totalMonthly)}`,
      `Loan Principal: ${fmtMoney(r.principal)}`,
      `Total of Payments: ${fmtMoney(grandTotal)}`,
      "",
      "Calculated with Calnivo",
      "https://calnivocalc.com/calculators/mortgage",
    ].join("\n");
  }, [r, homePrice, downPayment, downUnit, loanYears, rate, grandTotal]);

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
          <div className="flex justify-end">
            <CopyResultButton getText={() => copyText} disabled={!r.totalMonthly} />
          </div>
        </div>
      </div>

      {balanceOverTime.length > 0 && (
        <CalcCard title="Loan balance over time">
          <p className="mb-3 text-sm text-brand-muted">
            How your loan principal declines year-by-year. Over the {loanYears}-year term you&apos;ll
            pay approximately <strong className="text-brand-ink">{fmtMoney(grandTotal - r.principal)}</strong> in
            total payments, of which <strong className="text-brand-ink">{fmtMoney(totalPi - r.principal)}</strong> is interest.
          </p>
          <LabeledLineChart
            points={balanceOverTime}
            yLabel="Balance ($)"
            formatY={(n) => (n >= 1000 ? "$" + Math.round(n / 1000) + "k" : "$" + Math.round(n))}
          />
        </CalcCard>
      )}

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
