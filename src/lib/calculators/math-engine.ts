// Lightweight math expression engine: tokenizer -> shunting yard -> RPN eval.
// Supports + - * / ^ %, parentheses, functions, postfix factorial, constants.

export type AngleMode = "deg" | "rad";

type Tok =
  | { t: "num"; v: number }
  | { t: "op"; v: string }
  | { t: "postfix"; v: "!" }
  | { t: "func"; v: string }
  | { t: "const"; v: string }
  | { t: "lparen" }
  | { t: "rparen" }
  | { t: "comma" };

const FUNCS = new Set([
  "sin", "cos", "tan",
  "asin", "acos", "atan",
  "sinh", "cosh", "tanh",
  "ln", "log", "sqrt", "cbrt", "exp",
  "abs", "floor", "ceil", "round", "fact",
]);

const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
};

const PREC: Record<string, number> = {
  "+": 1, "-": 1,
  "*": 2, "/": 2, "%mod": 2,
  "^": 4,
  neg: 3,
  "!": 5, // postfix factorial, highest
};

const RIGHT_ASSOC = new Set(["^", "neg"]);

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (!Number.isInteger(n)) return gamma(n + 1);
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

// Lanczos approximation of Gamma (for non-integer factorial)
function gamma(z: number): number {
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

function tokenize(expr: string): Tok[] {
  const tokens: Tok[] = [];
  let i = 0;
  const s = expr.replace(/\s+/g, "");
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i + 1;
      if (j < s.length && (s[j] === "e" || s[j] === "E")) {
        const after = s[j + 1];
        if (after === "+" || after === "-" || /[0-9]/.test(after)) {
          j++;
          if (s[j] === "+" || s[j] === "-") j++;
          while (j < s.length && /[0-9]/.test(s[j])) j++;
        }
      }
      const numStr = s.slice(i, j);
      const v = parseFloat(numStr);
      if (!isFinite(v)) throw new Error(`Invalid number: ${numStr}`);
      tokens.push({ t: "num", v });
      i = j;
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[a-zA-Z0-9_]/.test(s[j])) j++;
      const name = s.slice(i, j).toLowerCase();
      i = j;
      if (FUNCS.has(name)) tokens.push({ t: "func", v: name });
      else if (name in CONSTANTS) tokens.push({ t: "const", v: name });
      else throw new Error(`Unknown identifier: ${name}`);
      continue;
    }
    if (c === "(") { tokens.push({ t: "lparen" }); i++; continue; }
    if (c === ")") { tokens.push({ t: "rparen" }); i++; continue; }
    if (c === ",") { tokens.push({ t: "comma" }); i++; continue; }
    if (c === "!") { tokens.push({ t: "postfix", v: "!" }); i++; continue; }
    if ("+-*/^%".includes(c)) {
      const prev = tokens[tokens.length - 1];
      const isUnary = !prev || prev.t === "op" || prev.t === "lparen" || prev.t === "comma";
      if ((c === "-" || c === "+") && isUnary) {
        if (c === "-") tokens.push({ t: "op", v: "neg" });
      } else {
        tokens.push({ t: "op", v: c === "%" ? "%mod" : c });
      }
      i++;
      continue;
    }
    throw new Error(`Unexpected character: ${c}`);
  }
  return tokens;
}

function toRPN(tokens: Tok[]): Tok[] {
  const out: Tok[] = [];
  const stack: Tok[] = [];
  for (const tok of tokens) {
    if (tok.t === "num" || tok.t === "const") {
      out.push(tok);
    } else if (tok.t === "postfix") {
      out.push(tok);
    } else if (tok.t === "func") {
      stack.push(tok);
    } else if (tok.t === "comma") {
      while (stack.length && stack[stack.length - 1].t !== "lparen") {
        out.push(stack.pop()!);
      }
    } else if (tok.t === "op") {
      while (stack.length) {
        const top = stack[stack.length - 1];
        if (top.t === "func") { out.push(stack.pop()!); continue; }
        if (top.t === "postfix") { out.push(stack.pop()!); continue; }
        if (top.t === "op") {
          const pTop = PREC[top.v];
          const pCur = PREC[tok.v];
          if (pTop > pCur || (pTop === pCur && !RIGHT_ASSOC.has(tok.v))) {
            out.push(stack.pop()!);
            continue;
          }
        }
        break;
      }
      stack.push(tok);
    } else if (tok.t === "lparen") {
      stack.push(tok);
    } else if (tok.t === "rparen") {
      while (stack.length && stack[stack.length - 1].t !== "lparen") {
        out.push(stack.pop()!);
      }
      if (!stack.length) throw new Error("Mismatched parentheses");
      stack.pop();
      if (stack.length && stack[stack.length - 1].t === "func") {
        out.push(stack.pop()!);
      }
    }
  }
  while (stack.length) {
    const t = stack.pop()!;
    if (t.t === "lparen" || t.t === "rparen") throw new Error("Mismatched parentheses");
    out.push(t);
  }
  return out;
}

function evalRPN(rpn: Tok[], mode: AngleMode): number {
  const st: number[] = [];
  const toRad = (x: number) => (mode === "deg" ? (x * Math.PI) / 180 : x);
  const fromRad = (x: number) => (mode === "deg" ? (x * 180) / Math.PI : x);
  for (const tok of rpn) {
    if (tok.t === "num") st.push(tok.v);
    else if (tok.t === "const") st.push(CONSTANTS[tok.v]);
    else if (tok.t === "postfix") {
      if (tok.v === "!") {
        const a = st.pop();
        if (a === undefined) throw new Error("Malformed expression");
        st.push(factorial(a));
      }
    } else if (tok.t === "op") {
      if (tok.v === "neg") {
        const a = st.pop() ?? 0;
        st.push(-a);
        continue;
      }
      const b = st.pop();
      const a = st.pop();
      if (a === undefined || b === undefined) throw new Error("Malformed expression");
      switch (tok.v) {
        case "+": st.push(a + b); break;
        case "-": st.push(a - b); break;
        case "*": st.push(a * b); break;
        case "/": st.push(a / b); break;
        case "^": st.push(Math.pow(a, b)); break;
        case "%mod": st.push(a % b); break;
      }
    } else if (tok.t === "func") {
      const a = st.pop();
      if (a === undefined) throw new Error("Malformed expression");
      switch (tok.v) {
        case "fact": st.push(factorial(a)); break;
        case "sin": st.push(Math.sin(toRad(a))); break;
        case "cos": st.push(Math.cos(toRad(a))); break;
        case "tan": st.push(Math.tan(toRad(a))); break;
        case "asin": st.push(fromRad(Math.asin(clampUnit(a)))); break;
        case "acos": st.push(fromRad(Math.acos(clampUnit(a)))); break;
        case "atan": st.push(fromRad(Math.atan(a))); break;
        case "sinh": st.push(Math.sinh(a)); break;
        case "cosh": st.push(Math.cosh(a)); break;
        case "tanh": st.push(Math.tanh(a)); break;
        case "ln": st.push(Math.log(a)); break;
        case "log": st.push(Math.log10(a)); break;
        case "sqrt": st.push(Math.sqrt(a)); break;
        case "cbrt": st.push(Math.cbrt(a)); break;
        case "exp": st.push(Math.exp(a)); break;
        case "abs": st.push(Math.abs(a)); break;
        case "floor": st.push(Math.floor(a)); break;
        case "ceil": st.push(Math.ceil(a)); break;
        case "round": st.push(Math.round(a)); break;
        default: throw new Error(`Unknown function: ${tok.v}`);
      }
    }
  }
  const res = st.pop();
  if (st.length > 0) throw new Error("Malformed expression");
  return res ?? 0;
}

function clampUnit(x: number) {
  // guard asin/acos domain [-1, 1] against tiny float overflow
  if (x > 1 && x < 1.0000001) return 1;
  if (x < -1 && x > -1.0000001) return -1;
  return x;
}

// Public API
export function evaluate(expr: string, mode: AngleMode): number {
  if (!expr.trim()) return 0;
  const e = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/π/g, "pi")
    .replace(/√/g, "sqrt");
  const tokens = tokenize(e);
  const rpn = toRPN(tokens);
  return evalRPN(rpn, mode);
}
