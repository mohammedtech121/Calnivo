/**
 * Pure financial math functions — extracted from the React calculator
 * components so they can be unit-tested independently (AdSense Fix 12).
 *
 * Every function here is the single source of truth for its formula. The
 * calculator components call these same functions, so the worked examples on
 * each page and the test reference cases can never disagree.
 *
 * All functions are pure (no side effects, no I/O) and operate on plain
 * numbers so they are trivial to test with `bun test`.
 */

/** Standard amortizing monthly payment.
 *
 * M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is principal, r is the monthly
 * interest rate (annual ÷ 12), and n is the number of monthly payments.
 *
 * Returns the level monthly payment that pays the loan off exactly over the
 * term. Returns NaN for invalid inputs (P ≤ 0 or n ≤ 0); returns P/n when the
 * rate is zero (interest-free loan).
 */
export function monthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number,
): number {
  if (principal <= 0 || termMonths <= 0) return NaN;
  const r = annualRate / 12;
  if (r === 0) return principal / termMonths;
  const f = Math.pow(1 + r, termMonths);
  return (principal * r * f) / (f - 1);
}

/** Total interest paid over the life of a level-payment loan. */
export function totalInterest(
  principal: number,
  annualRate: number,
  termMonths: number,
): number {
  const m = monthlyPayment(principal, annualRate, termMonths);
  if (!isFinite(m)) return NaN;
  return m * termMonths - principal;
}

/** Solve for the monthly interest rate implied by a given payment and term.
 *
 * Finds r in M = P × [r(1+r)^n] / [(1+r)^n − 1] using bisection then
 * Newton-Raphson refinement. Returns the monthly rate as a decimal (e.g.
 * 0.00618 for ~0.618%/month). Returns NaN when inputs are invalid or the
 * payment is too small to ever pay off the principal.
 */
export function solveMonthlyRate(
  principal: number,
  monthlyPayment: number,
  termMonths: number,
): number {
  if (principal <= 0 || monthlyPayment <= 0 || termMonths <= 0) return NaN;
  if (monthlyPayment * termMonths < principal) return NaN;

  const P = principal;
  const PMT = monthlyPayment;
  const n = termMonths;

  const f = (rr: number): number => {
    if (rr === 0) return P - PMT * n;
    const p = Math.pow(1 + rr, n);
    return P * rr * p - PMT * (p - 1);
  };
  const df = (rr: number): number => {
    if (rr === 0) return P - (PMT * n * (n - 1)) / 2;
    const p = Math.pow(1 + rr, n);
    const dp = n * Math.pow(1 + rr, n - 1);
    return P * (p + rr * dp) - PMT * dp;
  };

  let lo = 0.0;
  let hi = 1.0;
  let flo = f(lo);
  let fhi = f(hi);
  while (flo * fhi > 0 && hi < 1e6) {
    hi *= 2;
    fhi = f(hi);
  }
  if (flo * fhi > 0) return NaN;

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
  return g;
}

/** Nominal APR = monthly rate × 12 × 100 (the rate lenders quote). */
export function nominalApr(monthlyRate: number): number {
  return monthlyRate * 12 * 100;
}

/** APY (effective annual rate) = (1 + monthly rate)^12 − 1, as a percent. */
export function apy(monthlyRate: number): number {
  return (Math.pow(1 + monthlyRate, 12) - 1) * 100;
}

/** Future value with optional regular contributions (ordinary annuity).
 *
 * A = P × (1 + r/n)^(n·t) + PMT × [((1 + r/n)^(n·t) − 1) / (r/n)]
 *
 * P is the principal, r the annual rate (decimal), n the compounding periods
 * per year, t the number of years, and PMT the contribution per compounding
 * period (made at the end of each period).
 */
export function compoundInterest(
  principal: number,
  annualRate: number,
  periodsPerYear: number,
  years: number,
  contribution = 0,
): number {
  const i = annualRate / periodsPerYear;
  const periods = periodsPerYear * years;
  const fvPrincipal = principal * Math.pow(1 + i, periods);
  if (contribution === 0 || i === 0) {
    return i === 0
      ? principal + contribution * periods
      : fvPrincipal;
  }
  const fvContributions = contribution * ((Math.pow(1 + i, periods) - 1) / i);
  return fvPrincipal + fvContributions;
}

// ── IRS income tax brackets ────────────────────────────────────────────────
// Must match the tables in src/components/calculator/financial/income-tax.tsx.

export interface Bracket {
  rate: number;
  upto: number;
}

export const BRACKETS_2025: Record<string, Bracket[]> = {
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

export const BRACKETS_2026: Record<string, Bracket[]> = {
  single: [
    { rate: 10, upto: 12400 },
    { rate: 12, upto: 50400 },
    { rate: 22, upto: 105700 },
    { rate: 24, upto: 201775 },
    { rate: 32, upto: 256225 },
    { rate: 35, upto: 640600 },
    { rate: 37, upto: Infinity },
  ],
  married: [
    { rate: 10, upto: 24800 },
    { rate: 12, upto: 100800 },
    { rate: 22, upto: 211400 },
    { rate: 24, upto: 403550 },
    { rate: 32, upto: 512450 },
    { rate: 35, upto: 1281300 },
    { rate: 37, upto: Infinity },
  ],
  head: [
    { rate: 10, upto: 17650 },
    { rate: 12, upto: 67450 },
    { rate: 22, upto: 105700 },
    { rate: 24, upto: 201775 },
    { rate: 32, upto: 256225 },
    { rate: 35, upto: 640600 },
    { rate: 37, upto: Infinity },
  ],
};

/** Progressive federal income tax across the given brackets.
 *
 * Returns { tax, marginalRate, effectiveRate } where tax is the total federal
 * tax owed, marginalRate is the rate on the last dollar earned, and
 * effectiveRate is the average rate (tax ÷ taxable × 100).
 */
export function federalIncomeTax(
  taxableIncome: number,
  brackets: Bracket[],
): { tax: number; marginalRate: number; effectiveRate: number } {
  const taxable = Math.max(0, taxableIncome);
  let remaining = taxable;
  let prev = 0;
  let tax = 0;
  let marginal = brackets[0]?.rate ?? 0;
  for (const b of brackets) {
    const width = b.upto - prev;
    const inBracket = Math.min(remaining, width);
    if (inBracket > 0) {
      tax += inBracket * (b.rate / 100);
      marginal = b.rate;
      remaining -= inBracket;
      if (remaining <= 0) break;
    }
    prev = b.upto;
  }
  const effectiveRate = taxable > 0 ? (tax / taxable) * 100 : 0;
  return { tax, marginalRate: marginal, effectiveRate };
}

/** BMI from metric (kg, m). */
export function bmiMetric(weightKg: number, heightM: number): number {
  if (heightM <= 0 || weightKg <= 0) return NaN;
  return weightKg / (heightM * heightM);
}

/** BMI from imperial (lb, in) — uses the 703 constant. */
export function bmiImperial(weightLb: number, heightIn: number): number {
  if (heightIn <= 0 || weightLb <= 0) return NaN;
  return (703 * weightLb) / (heightIn * heightIn);
}
