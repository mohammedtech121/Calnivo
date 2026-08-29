"use client";

import { useState, useMemo, useEffect } from "react";
import { evaluate, type AngleMode } from "@/lib/calculators/math-engine";
import { cn } from "@/lib/utils";

type Btn = {
  label: string;
  insert?: string;
  action?: "equals" | "back" | "ac" | "toggle-sign" | "rnd" | "m-plus" | "m-minus" | "m-recall";
  kind?: "num" | "op" | "fn" | "fn2" | "accent" | "equals";
  span?: boolean;
};

const ROWS: Btn[][] = [
  [
    { label: "sin", insert: "sin(", kind: "fn" },
    { label: "cos", insert: "cos(", kind: "fn" },
    { label: "tan", insert: "tan(", kind: "fn" },
    { label: "Deg", kind: "fn2" },
    { label: "Rad", kind: "fn2" },
  ],
  [
    { label: "sin⁻¹", insert: "asin(", kind: "fn" },
    { label: "cos⁻¹", insert: "acos(", kind: "fn" },
    { label: "tan⁻¹", insert: "atan(", kind: "fn" },
    { label: "π", insert: "pi", kind: "fn" },
    { label: "e", insert: "e", kind: "fn" },
  ],
  [
    { label: "xʸ", insert: "^", kind: "fn" },
    { label: "x³", insert: "^3", kind: "fn" },
    { label: "x²", insert: "^2", kind: "fn" },
    { label: "eˣ", insert: "exp(", kind: "fn" },
    { label: "10ˣ", insert: "10^", kind: "fn" },
  ],
  [
    { label: "ʸ√x", insert: "^(1/", kind: "fn" },
    { label: "∛x", insert: "cbrt(", kind: "fn" },
    { label: "√x", insert: "sqrt(", kind: "fn" },
    { label: "ln", insert: "ln(", kind: "fn" },
    { label: "log", insert: "log(", kind: "fn" },
  ],
  [
    { label: "(", insert: "(", kind: "fn" },
    { label: ")", insert: ")", kind: "fn" },
    { label: "1/x", insert: "^-1", kind: "fn" },
    { label: "%", insert: "/100", kind: "fn" },
    { label: "n!", insert: "!", kind: "fn" },
  ],
  [
    { label: "7", insert: "7", kind: "num" },
    { label: "8", insert: "8", kind: "num" },
    { label: "9", insert: "9", kind: "num" },
    { label: "+", insert: "+", kind: "op" },
    { label: "Back", action: "back", kind: "op" },
  ],
  [
    { label: "4", insert: "4", kind: "num" },
    { label: "5", insert: "5", kind: "num" },
    { label: "6", insert: "6", kind: "num" },
    { label: "–", insert: "-", kind: "op" },
    { label: "Ans", insert: "Ans", kind: "op" },
  ],
  [
    { label: "1", insert: "1", kind: "num" },
    { label: "2", insert: "2", kind: "num" },
    { label: "3", insert: "3", kind: "num" },
    { label: "×", insert: "*", kind: "op" },
    { label: "M+", action: "m-plus", kind: "op" },
  ],
  [
    { label: "0", insert: "0", kind: "num" },
    { label: ".", insert: ".", kind: "num" },
    { label: "EXP", insert: "e", kind: "fn" },
    { label: "/", insert: "/", kind: "op" },
    { label: "M-", action: "m-minus", kind: "op" },
  ],
  [
    { label: "±", action: "toggle-sign", kind: "fn" },
    { label: "RND", action: "rnd", kind: "fn" },
    { label: "AC", action: "ac", kind: "op" },
    { label: "=", action: "equals", kind: "equals" },
    { label: "MR", action: "m-recall", kind: "op" },
  ],
];

export function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [mode, setMode] = useState<AngleMode>("deg");
  const [ans, setAns] = useState<number>(0);
  const [memory, setMemory] = useState<number>(0);

  // Live preview of the current expression, computed during render.
  const preview = useMemo(() => {
    if (!expr.trim()) return { value: "0", error: null as string | null };
    // If the expression itself is an error sentinel (set after pressing "=" on
    // a mathematically undefined input), display "Error" rather than trying to
    // re-evaluate the literal string "Error".
    if (expr === "Error" || expr.startsWith("Error")) {
      return { value: "Error", error: "Math error" };
    }
    try {
      const subbed = expr.replace(/Ans/g, String(ans));
      const v = evaluate(subbed, mode);
      if (!isFinite(v)) return { value: "Error", error: "Math error" };
      return { value: formatResult(v), error: null };
    } catch {
      // keep preview silent while typing an incomplete expression
      return { value: "", error: null };
    }
  }, [expr, ans, mode]);

  const result = preview.value;
  const error = preview.error;

  const handleBtn = (b: Btn) => {
    if (b.action) {
      switch (b.action) {
        case "equals": {
          try {
            const subbed = expr.replace(/Ans/g, String(ans));
            const v = evaluate(subbed, mode);
            if (!isFinite(v)) {
              setExpr("Error");
              return;
            }
            setExpr(formatResult(v));
            setAns(v);
          } catch (e) {
            setExpr(e instanceof Error ? `Error: ${e.message}` : "Error");
          }
          return;
        }
        case "back":
          setExpr((p) => p.slice(0, -1));
          return;
        case "ac":
          setExpr("");
          return;
        case "toggle-sign":
          setExpr((p) => (p.startsWith("-") ? p.slice(1) : p ? "-" + p : "-"));
          return;
        case "rnd":
          setExpr((p) => p + Math.random().toFixed(6));
          return;
        case "m-plus":
          try {
            const v = evaluate(expr.replace(/Ans/g, String(ans)), mode);
            setMemory((m) => m + v);
          } catch {
            /* noop */
          }
          return;
        case "m-minus":
          try {
            const v = evaluate(expr.replace(/Ans/g, String(ans)), mode);
            setMemory((m) => m - v);
          } catch {
            /* noop */
          }
          return;
        case "m-recall":
          setExpr((p) => p + String(memory));
          return;
      }
    }
    if (b.label === "Deg" || b.label === "Rad") {
      setMode(b.label === "Deg" ? "deg" : "rad");
      return;
    }
    if (b.insert !== undefined) {
      setExpr((p) => p + b.insert);
    }
  };

  // Keyboard support (legitimate external-system subscription)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (/[0-9.]/.test(k)) { setExpr((p) => p + k); e.preventDefault(); return; }
      if (["+", "-", "*", "/", "(", ")", "^", "%"].includes(k)) {
        setExpr((p) => p + k); e.preventDefault(); return;
      }
      if (k === "Enter" || k === "=") { handleBtn({ label: "=", action: "equals", kind: "equals" }); e.preventDefault(); return; }
      if (k === "Backspace") { setExpr((p) => p.slice(0, -1)); e.preventDefault(); return; }
      if (k === "Escape") { setExpr(""); e.preventDefault(); return; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expr, ans, mode]);

  return (
    <div className="w-full rounded-2xl border border-brand bg-white p-4 shadow-brand sm:p-5">
      {/* Display */}
      <div className="rounded-xl bg-[#17232D] p-4 sm:p-5">
        <div className="flex items-center justify-between text-[11px] text-white/50">
          <span>{mode === "deg" ? "DEG" : "RAD"}</span>
          <span className="tabular-nums">
            M: {memory.toFixed(2)} · Ans: {formatResult(ans)}
          </span>
        </div>
        <div className="mt-2 min-h-[28px] break-all text-right font-mono text-sm text-white/70">
          {expr || "\u00A0"}
        </div>
        <div
          className={cn(
            "mt-1 break-all text-right font-mono text-3xl font-semibold tracking-tight sm:text-4xl",
            error ? "text-red-400" : "text-white",
          )}
        >
          {result || "0"}
        </div>
        {error && (
          <div className="mt-1 text-right text-xs text-red-400">{error}</div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-3 grid grid-cols-5 gap-2">
        {ROWS.flat().map((b, idx) => (
          <button
            key={idx}
            onClick={() => handleBtn(b)}
            className={cn(
              "flex h-12 items-center justify-center rounded-lg text-sm font-medium transition-all active:scale-95 sm:h-13",
              btnClass(b, mode, b.label === "Deg" ? mode === "deg" : b.label === "Rad" ? mode === "rad" : false),
            )}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function btnClass(b: Btn, _mode: AngleMode, active: boolean): string {
  switch (b.kind) {
    case "num":
      return "bg-[#F7F6F3] text-brand-ink hover:bg-[#EFEEEA]";
    case "op":
      return "bg-[#F0EFEB] text-brand-ink hover:bg-[#E7E5E0] font-semibold";
    case "fn":
      return "bg-[#FFF1E8] text-brand-accent-deep hover:bg-[#FFE3D1]";
    case "fn2":
      return active
        ? "bg-brand-accent-gradient text-white shadow-accent"
        : "bg-[#F0EFEB] text-brand-muted hover:bg-[#E7E5E0]";
    case "equals":
      return "bg-brand-accent-gradient text-white shadow-accent hover:brightness-105 text-base";
    case "accent":
      return "bg-[#FFF1E8] text-brand-accent-deep hover:bg-[#FFE3D1]";
    default:
      return "bg-[#F0EFEB] text-brand-ink hover:bg-[#E7E5E0]";
  }
}

function formatResult(v: number): string {
  if (!isFinite(v)) return "Error";
  const abs = Math.abs(v);
  if (abs !== 0 && (abs < 1e-6 || abs >= 1e15)) return v.toExponential(8);
  // limit floating noise
  const r = parseFloat(v.toPrecision(12));
  return String(r);
}
