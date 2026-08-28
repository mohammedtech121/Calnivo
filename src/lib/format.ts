export function fmtMoney(n: number, opts?: { decimals?: number; currency?: string }) {
  const decimals = opts?.decimals ?? 2;
  const currency = opts?.currency ?? "USD";
  if (!isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function fmtNum(n: number, decimals = 2) {
  if (!isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function fmtPct(n: number, decimals = 2) {
  if (!isFinite(n)) return "—";
  return `${n.toFixed(decimals)}%`;
}

export function parseNum(v: string | number | undefined | null): number {
  if (typeof v === "number") return v;
  if (!v) return 0;
  const cleaned = String(v).replace(/[^0-9.\-]/g, "");
  const n = parseFloat(cleaned);
  return isFinite(n) ? n : 0;
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
