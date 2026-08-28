import {
  Home,
  Car,
  Banknote,
  Percent,
  CalendarClock,
  Landmark,
  TrendingUp,
  PiggyBank,
  LineChart,
  Receipt,
  Coins,
  Wallet,
  BadgeDollarSign,
  Scale,
  HeartPulse,
  Flame,
  Activity,
  PersonStanding,
  Target,
  Timer,
  Baby,
  Stethoscope,
  Calculator as CalcIcon,
  Divide,
  Hash,
  Shuffle,
  Triangle,
  Sigma,
  Cake,
  CalendarDays,
  Clock,
  Hourglass,
  GraduationCap,
  ClipboardCheck,
  HardHat,
  Network,
  KeyRound,
  ArrowLeftRight,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

export type CalculatorCategory =
  | "financial"
  | "health"
  | "math"
  | "other";

export interface CalculatorMeta {
  id: string;
  name: string;
  category: CalculatorCategory;
  short: string;
  description: string;
  icon: LucideIcon;
  keywords: string[];
}

export const CATEGORY_META: Record<
  CalculatorCategory,
  { label: string; blurb: string; icon: LucideIcon }
> = {
  financial: {
    label: "Financial Calculators",
    blurb: "Plan loans, mortgages, investments and taxes with confidence.",
    icon: Banknote,
  },
  health: {
    label: "Fitness & Health Calculators",
    blurb: "Track BMI, calories, body fat and key wellness metrics.",
    icon: HeartPulse,
  },
  math: {
    label: "Math Calculators",
    blurb: "Scientific tools for fractions, percentages and geometry.",
    icon: CalcIcon,
  },
  other: {
    label: "Other Calculators",
    blurb: "Everyday utilities for dates, time, grades and conversions.",
    icon: LayoutGrid,
  },
};

export const CALCULATORS: CalculatorMeta[] = [
  // ---------------- Financial ----------------
  {
    id: "mortgage",
    name: "Mortgage Calculator",
    category: "financial",
    short: "Mortgage",
    description:
      "Estimate your monthly mortgage payment, including principal, interest, taxes and insurance.",
    icon: Home,
    keywords: ["mortgage", "home loan", "house payment"],
  },
  {
    id: "loan",
    name: "Loan Calculator",
    category: "financial",
    short: "Loan",
    description:
      "Calculate monthly payments, total interest and payoff for any fixed-rate loan.",
    icon: Banknote,
    keywords: ["loan", "personal loan", "payment"],
  },
  {
    id: "auto-loan",
    name: "Auto Loan Calculator",
    category: "financial",
    short: "Auto Loan",
    description:
      "Figure out your monthly car payment and total interest over the loan term.",
    icon: Car,
    keywords: ["auto", "car loan", "vehicle"],
  },
  {
    id: "interest",
    name: "Interest Calculator",
    category: "financial",
    short: "Interest",
    description:
      "Compute simple and compound interest earned on a principal amount.",
    icon: Percent,
    keywords: ["interest", "simple", "earnings"],
  },
  {
    id: "payment",
    name: "Payment Calculator",
    category: "financial",
    short: "Payment",
    description:
      "General payment calculator for loans with flexible compounding options.",
    icon: Wallet,
    keywords: ["payment", "installment"],
  },
  {
    id: "retirement",
    name: "Retirement Calculator",
    category: "financial",
    short: "Retirement",
    description:
      "Project how much you will have saved by retirement based on contributions and growth.",
    icon: PiggyBank,
    keywords: ["retirement", "401k", "pension", "savings"],
  },
  {
    id: "amortization",
    name: "Amortization Calculator",
    category: "financial",
    short: "Amortization",
    description:
      "Generate a full amortization schedule showing principal and interest per period.",
    icon: CalendarClock,
    keywords: ["amortization", "schedule", "breakdown"],
  },
  {
    id: "investment",
    name: "Investment Calculator",
    category: "financial",
    short: "Investment",
    description:
      "Estimate the future value of an investment with regular contributions.",
    icon: TrendingUp,
    keywords: ["investment", "future value", "growth"],
  },
  {
    id: "inflation",
    name: "Inflation Calculator",
    category: "financial",
    short: "Inflation",
    description:
      "See how the purchasing power of money changes over time due to inflation.",
    icon: LineChart,
    keywords: ["inflation", "purchasing power"],
  },
  {
    id: "finance",
    name: "Finance Calculator",
    category: "financial",
    short: "Finance",
    description:
      "Solve for any variable in the TVM equation: PV, FV, PMT, rate or periods.",
    icon: Landmark,
    keywords: ["finance", "tvm", "time value"],
  },
  {
    id: "income-tax",
    name: "Income Tax Calculator",
    category: "financial",
    short: "Income Tax",
    description:
      "Estimate federal income tax owed based on taxable income and brackets.",
    icon: Receipt,
    keywords: ["tax", "income tax", "irs"],
  },
  {
    id: "compound-interest",
    name: "Compound Interest Calculator",
    category: "financial",
    short: "Compound Interest",
    description:
      "See how compound interest grows your savings over time with regular deposits.",
    icon: Coins,
    keywords: ["compound", "interest", "growth"],
  },
  {
    id: "salary",
    name: "Salary Calculator",
    category: "financial",
    short: "Salary",
    description:
      "Convert between hourly, daily, weekly, monthly and annual salary.",
    icon: BadgeDollarSign,
    keywords: ["salary", "wage", "annual", "hourly"],
  },
  {
    id: "interest-rate",
    name: "Interest Rate Calculator",
    category: "financial",
    short: "Interest Rate",
    description:
      "Determine the effective interest rate of a loan from payment and term.",
    icon: Percent,
    keywords: ["rate", "apr", "interest rate"],
  },
  {
    id: "sales-tax",
    name: "Sales Tax Calculator",
    category: "financial",
    short: "Sales Tax",
    description: "Quickly add sales tax to any purchase amount.",
    icon: Receipt,
    keywords: ["sales tax", "vat", "purchase"],
  },

  // ---------------- Fitness & Health ----------------
  {
    id: "bmi",
    name: "BMI Calculator",
    category: "health",
    short: "BMI",
    description:
      "Calculate your Body Mass Index and see which weight category you fall into.",
    icon: Scale,
    keywords: ["bmi", "body mass", "weight"],
  },
  {
    id: "calorie",
    name: "Calorie Calculator",
    category: "health",
    short: "Calorie",
    description:
      "Estimate daily calorie needs based on activity level and goals (TDEE).",
    icon: Flame,
    keywords: ["calorie", "tdee", "diet", "energy"],
  },
  {
    id: "body-fat",
    name: "Body Fat Calculator",
    category: "health",
    short: "Body Fat",
    description:
      "Estimate body fat percentage using the U.S. Navy circumference method.",
    icon: Activity,
    keywords: ["body fat", "navy", "composition"],
  },
  {
    id: "bmr",
    name: "BMR Calculator",
    category: "health",
    short: "BMR",
    description:
      "Calculate your Basal Metabolic Rate — calories burned at complete rest.",
    icon: HeartPulse,
    keywords: ["bmr", "metabolism", "resting"],
  },
  {
    id: "ideal-weight",
    name: "Ideal Weight Calculator",
    category: "health",
    short: "Ideal Weight",
    description:
      "Find your ideal body weight using several well-known formulas.",
    icon: PersonStanding,
    keywords: ["ideal weight", "healthy weight"],
  },
  {
    id: "pace",
    name: "Pace Calculator",
    category: "health",
    short: "Pace",
    description: "Compute your running pace, time or distance.",
    icon: Timer,
    keywords: ["pace", "running", "speed"],
  },
  {
    id: "pregnancy",
    name: "Pregnancy Calculator",
    category: "health",
    short: "Pregnancy",
    description:
      "Estimate your pregnancy timeline and key milestones from your last period.",
    icon: Baby,
    keywords: ["pregnancy", "due date", "weeks"],
  },
  {
    id: "pregnancy-conception",
    name: "Pregnancy Conception Calculator",
    category: "health",
    short: "Conception",
    description:
      "Estimate the likely date of conception based on the due date or birth date.",
    icon: Baby,
    keywords: ["conception", "pregnancy"],
  },
  {
    id: "due-date",
    name: "Due Date Calculator",
    category: "health",
    short: "Due Date",
    description:
      "Calculate your baby's estimated due date from your last menstrual period.",
    icon: Stethoscope,
    keywords: ["due date", "delivery", "pregnancy"],
  },

  // ---------------- Math ----------------
  {
    id: "scientific",
    name: "Scientific Calculator",
    category: "math",
    short: "Scientific",
    description:
      "A full scientific calculator with trig, logarithms, powers and memory.",
    icon: CalcIcon,
    keywords: ["scientific", "trig", "log", "power"],
  },
  {
    id: "fraction",
    name: "Fraction Calculator",
    category: "math",
    short: "Fraction",
    description:
      "Add, subtract, multiply and divide fractions with step-by-step results.",
    icon: Divide,
    keywords: ["fraction", "ratio"],
  },
  {
    id: "percentage",
    name: "Percentage Calculator",
    category: "math",
    short: "Percentage",
    description:
      "Solve common percentage problems: what is X% of Y, percent change, and more.",
    icon: Percent,
    keywords: ["percentage", "percent", "ratio"],
  },
  {
    id: "random-number",
    name: "Random Number Generator",
    category: "math",
    short: "Random Number",
    description:
      "Generate random numbers within a custom range, with optional uniqueness.",
    icon: Shuffle,
    keywords: ["random", "number", "generator"],
  },
  {
    id: "triangle",
    name: "Triangle Calculator",
    category: "math",
    short: "Triangle",
    description:
      "Solve triangles: find missing sides, angles, area and perimeter.",
    icon: Triangle,
    keywords: ["triangle", "geometry", "angle"],
  },
  {
    id: "standard-deviation",
    name: "Standard Deviation Calculator",
    category: "math",
    short: "Standard Deviation",
    description:
      "Compute mean, variance and standard deviation for a set of numbers.",
    icon: Sigma,
    keywords: ["standard deviation", "variance", "statistics"],
  },

  // ---------------- Other ----------------
  {
    id: "age",
    name: "Age Calculator",
    category: "other",
    short: "Age",
    description:
      "Calculate exact age in years, months, days and total days lived.",
    icon: Cake,
    keywords: ["age", "birthday", "years"],
  },
  {
    id: "date",
    name: "Date Calculator",
    category: "other",
    short: "Date",
    description:
      "Add or subtract days from a date, or find the duration between two dates.",
    icon: CalendarDays,
    keywords: ["date", "days", "duration"],
  },
  {
    id: "time",
    name: "Time Calculator",
    category: "other",
    short: "Time",
    description: "Add and subtract hours, minutes and seconds.",
    icon: Clock,
    keywords: ["time", "hours", "minutes"],
  },
  {
    id: "hours",
    name: "Hours Calculator",
    category: "other",
    short: "Hours",
    description:
      "Calculate hours worked between two times, including break deductions.",
    icon: Hourglass,
    keywords: ["hours", "work", "timesheet"],
  },
  {
    id: "gpa",
    name: "GPA Calculator",
    category: "other",
    short: "GPA",
    description:
      "Compute your grade point average across courses with credit weighting.",
    icon: GraduationCap,
    keywords: ["gpa", "grade", "school"],
  },
  {
    id: "grade",
    name: "Grade Calculator",
    category: "other",
    short: "Grade",
    description:
      "Find the final grade needed on remaining work to hit a target average.",
    icon: ClipboardCheck,
    keywords: ["grade", "class", "final"],
  },
  {
    id: "concrete",
    name: "Concrete Calculator",
    category: "other",
    short: "Concrete",
    description:
      "Estimate concrete volume needed for slabs, footing and columns in cubic yards.",
    icon: HardHat,
    keywords: ["concrete", "construction", "volume"],
  },
  {
    id: "subnet",
    name: "Subnet Calculator",
    category: "other",
    short: "Subnet",
    description:
      "Calculate network, broadcast, subnet mask and host range from an IP/CIDR.",
    icon: Network,
    keywords: ["subnet", "ip", "cidr", "network"],
  },
  {
    id: "password-generator",
    name: "Password Generator",
    category: "other",
    short: "Password Generator",
    description:
      "Create strong, random passwords with custom length and character sets.",
    icon: KeyRound,
    keywords: ["password", "generator", "security"],
  },
  {
    id: "conversion",
    name: "Conversion Calculator",
    category: "other",
    short: "Conversion",
    description:
      "Convert between units of length, weight, temperature and volume.",
    icon: ArrowLeftRight,
    keywords: ["conversion", "units", "convert"],
  },
];

export const CALCULATOR_MAP: Record<string, CalculatorMeta> = Object.fromEntries(
  CALCULATORS.map((c) => [c.id, c]),
);

export function calculatorsByCategory(cat: CalculatorCategory) {
  return CALCULATORS.filter((c) => c.category === cat);
}

export function searchCalculators(q: string): CalculatorMeta[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  return CALCULATORS.filter((c) => {
    const hay = (
      c.name +
      " " +
      c.short +
      " " +
      c.description +
      " " +
      c.keywords.join(" ")
    ).toLowerCase();
    return hay.includes(query);
  });
}
