"use client";

import { ScientificCalculator } from "@/components/home/ScientificCalculator";
import { CalcCard } from "@/components/calculator/CalculatorShell";

interface TipItem {
  expr: string;
  result: string;
  note?: string;
}

const TIPS: TipItem[] = [
  { expr: "sin(30)", result: "0.5", note: "Trigonometry (Deg mode)" },
  { expr: "cos(60)", result: "0.5", note: "Trigonometry (Deg mode)" },
  { expr: "log(100)", result: "2", note: "Common log (base 10)" },
  { expr: "ln(e)", result: "1", note: "Natural log" },
  { expr: "2^10", result: "1024", note: "Powers" },
  { expr: "5!", result: "120", note: "Factorial (postfix)" },
  { expr: "sqrt(144)", result: "12", note: "Square root" },
  { expr: "pi", result: "3.14159…", note: "Constant π" },
  { expr: "e", result: "2.71828…", note: "Euler's number" },
  { expr: "10^3", result: "1000", note: "Exponential" },
  { expr: "1/0", result: "Error", note: "Division by zero handled" },
];

const FEATURES: { label: string; desc: string }[] = [
  {
    label: "Deg / Rad toggle",
    desc: "Switch between degrees and radians for all trigonometric functions.",
  },
  {
    label: "Memory keys (M+, M−, MR)",
    desc: "Accumulate values into memory and recall them into the current expression.",
  },
  {
    label: "Ans key",
    desc: "Reuse the last evaluated result inside a new expression by typing Ans.",
  },
  {
    label: "Keyboard support",
    desc: "Type digits, operators, Enter (=), Backspace and Esc (AC) directly.",
  },
];

export default function ScientificCalculatorPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <CalcCard title="Calculator" className="lg:max-w-xl">
        <ScientificCalculator />
      </CalcCard>

      <div className="space-y-6">
        <CalcCard title="Usage tips">
          <p className="mb-4 text-sm leading-relaxed text-brand-muted">
            Click a tile to try these examples — they demonstrate the supported
            functions, constants and operators. Make sure the <strong>Deg</strong>
            / <strong>Rad</strong> toggle matches the example you want.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {TIPS.map((t) => (
              <li
                key={t.expr}
                className="rounded-lg border border-brand bg-brand-canvas p-3"
              >
                <div className="font-mono text-sm font-semibold text-brand-ink">
                  {t.expr}
                </div>
                <div className="mt-0.5 font-mono text-xs text-brand-accent-deep">
                  = {t.result}
                </div>
                {t.note && (
                  <div className="mt-1 text-xs text-brand-muted">{t.note}</div>
                )}
              </li>
            ))}
          </ul>
        </CalcCard>

        <CalcCard title="Features">
          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f.label} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-accent-gradient" />
                <div>
                  <div className="text-sm font-semibold text-brand-ink">
                    {f.label}
                  </div>
                  <div className="text-xs leading-relaxed text-brand-muted">
                    {f.desc}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CalcCard>

        <CalcCard title="Reference">
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <ReferenceBlock
              title="Functions"
              items={[
                "sin cos tan",
                "asin acos atan",
                "sinh cosh tanh",
                "ln (natural log)",
                "log (base 10)",
                "sqrt cbrt",
                "exp abs floor ceil round",
                "fact / n!",
              ]}
            />
            <ReferenceBlock
              title="Operators & constants"
              items={[
                "+ − × ÷",
                "^ (power)",
                "% (modulo)",
                "! (factorial)",
                "( ) grouping",
                "pi (π ≈ 3.14159)",
                "e (Euler ≈ 2.71828)",
                "Ans (last answer)",
              ]}
            />
          </div>
        </CalcCard>
      </div>
    </div>
  );
}

function ReferenceBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-brand bg-brand-canvas p-3">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
        {title}
      </div>
      <ul className="space-y-1 font-mono text-xs text-brand-ink">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
