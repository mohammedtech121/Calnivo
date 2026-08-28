"use client";

import { useCallback, useMemo, useState } from "react";
import { Check as CheckIcon, Copy, RefreshCw } from "lucide-react";
import {
  CalcCard,
  CalcButton,
  Field,
  ResultCard,
} from "@/components/calculator/CalculatorShell";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { fmtNum } from "@/lib/format";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.?/~";
const AMBIGUOUS = "0O1lI|`";

interface Options {
  length: number;
  upper: boolean;
  lower: boolean;
  digits: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  excludeSimilar: boolean;
}

function secureRandomInt(maxExclusive: number): number {
  // maxExclusive up to 256 → uniform selection using rejection sampling
  if (maxExclusive <= 0) return 0;
  const max = 256 - (256 % maxExclusive);
  const buf = new Uint8Array(1);
  let x = 0;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= max);
  return x % maxExclusive;
}

function buildAlphabet(opts: Options): string {
  let s = "";
  if (opts.upper) s += UPPER;
  if (opts.lower) s += LOWER;
  if (opts.digits) s += DIGITS;
  if (opts.symbols) s += SYMBOLS;
  if (opts.excludeAmbiguous) {
    s = s
      .split("")
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }
  if (opts.excludeSimilar) {
    s = s
      .split("")
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }
  return s;
}

function generate(opts: Options): string {
  const alphabet = buildAlphabet(opts);
  if (!alphabet) return "";
  const len = opts.length;
  const out: string[] = [];

  // Ensure at least one of each selected set when possible
  const required: string[] = [];
  let sets: string[] = [];
  if (opts.upper) sets.push(UPPER);
  if (opts.lower) sets.push(LOWER);
  if (opts.digits) sets.push(DIGITS);
  if (opts.symbols) sets.push(SYMBOLS);
  if (opts.excludeAmbiguous || opts.excludeSimilar) {
    sets = sets.map((s) =>
      s
        .split("")
        .filter((c) => !AMBIGUOUS.includes(c))
        .join(""),
    );
  }
  if (len >= sets.length) {
    for (const set of sets) {
      required.push(set[secureRandomInt(set.length)]);
    }
  }
  while (required.length < len) {
    required.push(alphabet[secureRandomInt(alphabet.length)]);
  }
  // Fisher-Yates shuffle
  for (let i = required.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [required[i], required[j]] = [required[j], required[i]];
  }
  return required.join("");
}

function strength(pw: string, opts: Options): {
  score: number; // 0-4
  label: string;
  entropyBits: number;
} {
  if (!pw) return { score: 0, label: "—", entropyBits: 0 };
  const variety =
    (/[a-z]/.test(pw) ? 26 : 0) +
    (/[A-Z]/.test(pw) ? 26 : 0) +
    (/[0-9]/.test(pw) ? 10 : 0) +
    (/[^a-zA-Z0-9]/.test(pw) ? 32 : 0);
  const entropyBits = pw.length * Math.log2(Math.max(variety, 1));

  let score: number;
  if (entropyBits < 28) score = 0;
  else if (entropyBits < 36) score = 1;
  else if (entropyBits < 60) score = 2;
  else if (entropyBits < 128) score = 3;
  else score = 4;

  const labels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
  // Reduce score if not enough variety
  const setsSelected =
    (opts.upper ? 1 : 0) + (opts.lower ? 1 : 0) + (opts.digits ? 1 : 0) + (opts.symbols ? 1 : 0);
  if (setsSelected <= 1 && score > 1) score = 1;
  if (opts.length < 8 && score > 1) score = 1;

  return { score, label: labels[score], entropyBits };
}

const STRENGTH_COLORS = ["#DC2626", "#F4511E", "#F59E0B", "#22C55E", "#15803D"];

export default function PasswordGenerator() {
  const [opts, setOpts] = useState<Options>({
    length: 16,
    upper: true,
    lower: true,
    digits: true,
    symbols: true,
    excludeAmbiguous: false,
    excludeSimilar: false,
  });
  const [password, setPassword] = useState<string>(() =>
    generate({
      length: 16,
      upper: true,
      lower: true,
      digits: true,
      symbols: true,
      excludeAmbiguous: false,
      excludeSimilar: false,
    }),
  );
  const [copied, setCopied] = useState(false);

  const alphabetSize = useMemo(() => buildAlphabet(opts).length, [opts]);
  const strengthInfo = useMemo(
    () => strength(password, opts),
    [password, opts],
  );

  const regenerate = useCallback(() => {
    setPassword(generate(opts));
  }, [opts]);

  function setOpt<K extends keyof Options>(key: K, value: Options[K]) {
    setOpts((prev) => {
      // Ensure at least one character set remains on
      const next: Options = { ...prev, [key]: value };
      const anySet = next.upper || next.lower || next.digits || next.symbols;
      if (!anySet) return prev;
      return next;
    });
  }

  async function copy() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback - select and prompt
      setCopied(false);
    }
  }

  const ticks = [4, 8, 16, 24, 32, 48, 64];

  return (
    <div className="space-y-6">
      <CalcCard title="Options">
        <Field label={`Password length: ${opts.length}`}>
          <Slider
            value={[opts.length]}
            min={4}
            max={64}
            step={1}
            onValueChange={(v) => setOpts((p) => ({ ...p, length: v[0] }))}
          />
          <div className="mt-2 flex justify-between text-[10px] font-medium uppercase tracking-wide text-brand-muted">
            {ticks.map((t) => (
              <span key={t} className="tabular-nums">{t}</span>
            ))}
          </div>
        </Field>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <CheckRow
            label="Uppercase (A–Z)"
            checked={opts.upper}
            onChange={(c) => setOpt("upper", c)}
          />
          <CheckRow
            label="Lowercase (a–z)"
            checked={opts.lower}
            onChange={(c) => setOpt("lower", c)}
          />
          <CheckRow
            label="Numbers (0–9)"
            checked={opts.digits}
            onChange={(c) => setOpt("digits", c)}
          />
          <CheckRow
            label="Symbols (!@#$…)"
            checked={opts.symbols}
            onChange={(c) => setOpt("symbols", c)}
          />
          <CheckRow
            label="Exclude ambiguous (0 O 1 l I | `)"
            checked={opts.excludeAmbiguous}
            onChange={(c) => setOpt("excludeAmbiguous", c)}
          />
          <CheckRow
            label="Exclude similar characters"
            checked={opts.excludeSimilar}
            onChange={(c) => setOpt("excludeSimilar", c)}
          />
        </div>
      </CalcCard>

      <CalcCard title="Generated Password">
        <div className="rounded-xl border border-brand bg-brand-canvas p-4">
          <div className="font-mono text-2xl font-semibold break-all tracking-wide text-brand-ink sm:text-3xl">
            {password || <span className="text-brand-muted">—</span>}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <CalcButton onClick={regenerate}>
            <span className="inline-flex items-center gap-1.5">
              <RefreshCw className="h-4 w-4" />
              Generate
            </span>
          </CalcButton>
          <CalcButton variant="secondary" onClick={copy}>
            <span className="inline-flex items-center gap-1.5">
              {copied ? <CheckIcon className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </span>
          </CalcButton>
        </div>
      </CalcCard>

      <CalcCard title="Strength">
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Strength"
            value={strengthInfo.label}
            sub={`${fmtNum(strengthInfo.entropyBits, 1)} bits of entropy`}
          />
          <div className="rounded-xl border border-brand bg-white p-4">
            <div className="text-xs font-medium text-brand-muted">Strength meter</div>
            <div className="mt-3 flex h-2 gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-colors"
                  style={{
                    backgroundColor:
                      i <= strengthInfo.score
                        ? STRENGTH_COLORS[strengthInfo.score]
                        : "#E5E7E9",
                  }}
                />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="text-brand-muted">Alphabet size</div>
              <div className="text-right font-medium tabular-nums text-brand-ink">
                {alphabetSize} chars
              </div>
              <div className="text-brand-muted">Possible combinations</div>
              <div className="text-right font-medium tabular-nums text-brand-ink">
                {alphabetSize > 0
                  ? `${fmtNum(
                      Math.log2(alphabetSize) * opts.length,
                      0,
                    )} bits`
                  : "—"}
              </div>
              <div className="text-brand-muted">Time to crack (offline)</div>
              <div className="text-right font-medium tabular-nums text-brand-ink">
                {strengthInfo.entropyBits < 40
                  ? "seconds"
                  : strengthInfo.entropyBits < 60
                    ? "minutes"
                    : strengthInfo.entropyBits < 80
                      ? "days"
                      : strengthInfo.entropyBits < 120
                        ? "centuries"
                        : "millennia"}
              </div>
            </div>
          </div>
        </div>
      </CalcCard>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (c: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-brand bg-white p-3 transition-colors hover:bg-accent/30">
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => onChange(v === true)}
      />
      <span className="text-sm text-brand-ink">{label}</span>
    </label>
  );
}
