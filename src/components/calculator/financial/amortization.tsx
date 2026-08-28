"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  TextInput,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { fmtMoney, fmtNum, fmtPct, parseNum } from "@/lib/format";
import { DataTable } from "./_shared";

export default function AmortizationCalculator() {
  const [amount, setAmount] = useState("250000");
  const [rate, setRate] = useState("6.8");
  const [years, setYears] = useState("30");
  const [startDate, setStartDate] = useState("");

  const r = useMemo(() => {
    const P = parseNum(amount);
    const months = parseNum(years) * 12;
    const monthlyRate = parseNum(rate) / 100 / 12;
    let monthly = 0;
    if (monthlyRate === 0) {
      monthly = months > 0 ? P / months : 0;
    } else {
      const f = Math.pow(1 + monthlyRate, months);
      monthly = (P * monthlyRate * f) / (f - 1);
    }
    const schedule: {
      month: number;
      date: string;
      principal: number;
      interest: number;
      balance: number;
    }[] = [];
    let balance = P;
    const start = startDate ? new Date(startDate) : null;
    for (let i = 1; i <= months && balance > 0.005; i++) {
      const interest = balance * monthlyRate;
      let principal = monthly - interest;
      if (principal > balance) principal = balance;
      balance = Math.max(0, balance - principal);
      let dateStr = `Month ${i}`;
      if (start && !isNaN(start.getTime())) {
        const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
        dateStr = d.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      }
      schedule.push({
        month: i,
        date: dateStr,
        principal,
        interest,
        balance,
      });
    }
    const totalPaid = monthly * months;
    const totalInterest = totalPaid - P;
    return { P, months, monthly, totalPaid, totalInterest, schedule };
  }, [amount, rate, years, startDate]);

  const rows = r.schedule.map((s) => [
    s.month,
    s.date,
    fmtMoney(s.principal),
    fmtMoney(s.interest),
    fmtMoney(s.balance),
  ]);

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
            <Field label="Interest Rate (% / yr)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Field>
            <Field label="Term (years)">
              <TextInput
                type="text"
                inputMode="decimal"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </Field>
            <Field label="Start Date (optional)">
              <TextInput
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Field>
          </div>
        </CalcCard>

        <div className="space-y-4">
          <ResultCard
            label="Monthly Payment"
            value={fmtMoney(r.monthly)}
            sub={`${fmtNum(r.months, 0)} payments • ${fmtMoney(r.totalPaid)} total`}
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Total Interest"
              value={fmtMoney(r.totalInterest)}
              highlight={false}
            />
            <ResultCard
              label="Interest / Principal"
              value={r.P > 0 ? fmtPct((r.totalInterest / r.P) * 100) : "0%"}
              highlight={false}
            />
          </div>
        </div>
      </div>

      <CalcCard title="Amortization Schedule">
        <DataTable
          headers={["#", "Date", "Principal", "Interest", "Balance"]}
          rows={rows}
        />
      </CalcCard>
    </div>
  );
}
