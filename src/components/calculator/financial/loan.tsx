"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  SelectInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, fmtPct, parseNum } from "@/lib/format";
import { ProportionBar } from "./_shared";
import { CopyResultButton } from "@/components/calculator/CopyResultButton";
import { ResultActions } from "@/components/calculator/ResultActions";
import { ExplainResult } from "@/components/calculator/ExplainResult";
import { ExpandableSection } from "@/components/calculator/ExpandableSection";
import { ScenarioBuilder } from "@/components/calculator/ScenarioBuilder";
import { LocalHistory } from "@/components/calculator/LocalHistory";

// Shared compute for scenarios — same formula as the main calc (spec §3)
function computeLoan(inputs: Record<string, string>): Record<string, string> {
  const P = parseNum(inputs.amount ?? "0");
  const months = (inputs.termUnit ?? "years") === "years" ? parseNum(inputs.term ?? "0") * 12 : parseNum(inputs.term ?? "0");
  const monthlyRate = parseNum(inputs.rate ?? "0") / 100 / 12;
  let monthly = 0;
  if (months <= 0) monthly = 0;
  else if (monthlyRate === 0) monthly = P / months;
  else if (monthlyRate <= -1) monthly = 0;
  else { const f = Math.pow(1 + monthlyRate, months); monthly = isFinite(f) && f !== 1 ? (P * monthlyRate * f) / (f - 1) : P / months; }
  if (!isFinite(monthly)) monthly = 0;
  const totalPaid = monthly * months;
  const totalInterest = totalPaid - P;
  return { monthly: fmtMoney(monthly), totalInterest: fmtMoney(totalInterest), totalPaid: fmtMoney(totalPaid) };
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState("25000");
  const [term, setTerm] = useState("5");
  const [termUnit, setTermUnit] = useState<"years" | "months">("years");
  const [rate, setRate] = useState("8.5");

  const r = useMemo(() => {
    const P = parseNum(amount);
    const months =
      termUnit === "years" ? parseNum(term) * 12 : parseNum(term);
    const monthlyRate = parseNum(rate) / 100 / 12;
    let monthly = 0;
    if (months <= 0) {
      monthly = 0;
    } else if (monthlyRate === 0) {
      monthly = P / months;
    } else if (monthlyRate <= -1) {
      monthly = 0;
    } else {
      const f = Math.pow(1 + monthlyRate, months);
      if (!isFinite(f)) {
        monthly = P * monthlyRate; // asymptotic
      } else if (f !== 1) {
        monthly = (P * monthlyRate * f) / (f - 1);
      } else {
        monthly = P / months;
      }
    }
    if (!isFinite(monthly)) monthly = 0;
    const totalPaid = monthly * months;
    const totalInterest = totalPaid - P;
    return { P, months, monthly, totalPaid, totalInterest };
  }, [amount, term, termUnit, rate]);

  const copyText = useMemo(() => {
    return [
      "Calnivo Loan Calculator",
      "",
      `Loan Amount: ${fmtMoney(r.P)}`,
      `Interest Rate: ${parseNum(rate)}% / yr`,
      `Term: ${term} ${termUnit}`,
      "",
      `Monthly Payment: ${fmtMoney(r.monthly)}`,
      `Total Interest: ${fmtMoney(r.totalInterest)}`,
      `Total Paid: ${fmtMoney(r.totalPaid)}`,
      "",
      "Calculated with Calnivo",
      "https://calnivocalc.com/calculators/loan",
    ].join("\n");
  }, [r, rate, term, termUnit]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CalcCard title="Loan Details">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Loan Amount">
              <TextInput
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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
            <Field label="Term">
              <TextInput
                type="text"
                inputMode="decimal"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </Field>
            <Field label="Term Unit">
              <SelectInput
                value={termUnit}
                onChange={(e) =>
                  setTermUnit(e.target.value as "years" | "months")
                }
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </SelectInput>
            </Field>
          </div>
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label="Monthly Payment"
            value={fmtMoney(r.monthly)}
            sub={`${r.months} payments • ${fmtMoney(r.totalPaid)} total`}
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
          <div className="flex justify-end">
            <CopyResultButton getText={() => copyText} disabled={!r.monthly} />
          </div>
          <ResultActions summaryText={copyText} disabled={!r.monthly} />
        </div>
      </div>

      {r.monthly > 0 && (
        <ExplainResult>
          A <strong>{fmtMoney(r.P)}</strong> loan at <strong>{parseNum(rate)}%</strong> over{" "}
          <strong>{term} {termUnit}</strong> costs you <strong>{fmtMoney(r.monthly)}</strong>/month.
          Over the full term you&apos;ll pay <strong>{fmtMoney(r.totalInterest)}</strong> in interest —
          that&apos;s <strong>{r.P > 0 ? ((r.totalInterest / r.P) * 100).toFixed(0) : 0}%</strong> of the
          original loan amount.
        </ExplainResult>
      )}

      <CalcCard title="Principal vs Interest">
        <ProportionBar
          segments={[
            { label: "Principal", value: r.P, color: "#FF6A00" },
            { label: "Interest", value: r.totalInterest, color: "#17232D" },
          ]}
        />
        <p className="mt-3 text-xs text-brand-muted">
          Interest makes up{" "}
          <span className="font-semibold text-brand-ink">
            {r.totalPaid > 0 ? fmtPct((r.totalInterest / r.totalPaid) * 100) : "0%"}
          </span>{" "}
          of your total payments over the life of the loan.
        </p>
      </CalcCard>

      <ExpandableSection
        title="Compare scenarios"
        subtitle="See how different amounts, rates, or terms affect your payment"
        badge="A/B"
      >
        <ScenarioBuilder
          compute={computeLoan}
          baseInputs={{ amount, term, termUnit, rate }}
          resultKeys={[
            { key: "monthly", label: "Monthly Payment" },
            { key: "totalInterest", label: "Total Interest" },
            { key: "totalPaid", label: "Total Paid" },
          ]}
          inputFields={[
            { key: "amount", label: "Loan $" },
            { key: "rate", label: "Rate %" },
            { key: "term", label: "Term" },
          ]}
        />
      </ExpandableSection>

      <LocalHistory calculatorId="loan" />
    </div>
  );
}
