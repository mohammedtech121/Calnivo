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

export interface CalculatorFaq {
  q: string;
  a: string;
}

export interface CalculatorSeo {
  /** 1-2 sentence definition shown as an H2 "What is X?" section — keyword-rich. */
  definition: string;
  /** Plain-language formula explanation (the math itself, not code). */
  formula: string;
  /** Step-by-step how-to-use instructions (3-5 steps). */
  howToUse: string[];
  /** A concrete worked example with real numbers. */
  example: string;
  /** FAQ entries — each becomes a Q/A in FAQ structured data. 3-6 items. */
  faqs: CalculatorFaq[];
  /** Related/LSI search terms people also search for. */
  relatedSearches: string[];
}

export interface CalculatorMeta {
  id: string;
  name: string;
  category: CalculatorCategory;
  short: string;
  description: string;
  icon: LucideIcon;
  keywords: string[];
  /** SEO content block — rendered on the calculator page for crawlers + users. */
  seo?: CalculatorSeo;
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
    seo: {
      definition:
        "A mortgage calculator is a free online tool that estimates your monthly mortgage payment, including principal, interest, property taxes, and insurance. Use it to compare loan scenarios and see how down payment, interest rate, and loan term affect your total cost over the life of the loan.",
      formula:
        "The monthly payment formula is M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12), and n is the number of monthly payments (loan term in years × 12). Property taxes, homeowners insurance, and PMI (when the down payment is under 20%) are added on top of the principal-and-interest payment to get your full PITI payment.",
      howToUse: [
        "Enter the home price and your down payment amount or percentage.",
        "Enter the annual interest rate (use a current 30-year fixed rate from a lender).",
        "Choose the loan term — 15, 20, or 30 years.",
        "Add annual property taxes, homeowners insurance, and HOA dues for a true monthly cost.",
        "Toggle PMI on if your down payment is under 20%.",
      ],
      example:
        "For a $400,000 home with 20% down ($80,000) on a 30-year fixed mortgage at 6.5% interest, the loan principal is $320,000. The monthly principal-and-interest payment is $2,022.82, total interest over the life of the loan is about $408,215, and the total amount paid is $728,215.",
      faqs: [
        {
          q: "How is a mortgage payment calculated?",
          a: "Mortgage payments are calculated using the amortization formula M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan amount, r is the monthly interest rate, and n is the total number of monthly payments. Property taxes, insurance, and PMI are then added to the principal-and-interest payment.",
        },
        {
          q: "What is the difference between APR and interest rate on a mortgage?",
          a: "The interest rate is the cost of borrowing the principal, while the APR includes the interest rate plus lender fees, discount points, and other closing costs expressed as an annual rate. APR is the better number to use when comparing loan offers.",
        },
        {
          q: "How much house can I afford with a $5,000 monthly payment?",
          a: "If taxes, insurance, and PMI add roughly $400–$700 per month, a $5,000 total payment supports about $650,000–$720,000 of loan principal at 6.5% on a 30-year mortgage. Lenders typically cap your total housing payment at 28% of gross monthly income.",
        },
        {
          q: "Is it better to put 20% down on a house?",
          a: "Putting 20% down eliminates private mortgage insurance (PMI), lowers your monthly payment, and reduces total interest paid. However, it ties up more cash and may not be optimal if you could invest that money at a higher return than your mortgage rate.",
        },
      ],
      relatedSearches: [
        "mortgage calculator with taxes and insurance",
        "mortgage calculator with PMI",
        "monthly mortgage payment estimator",
        "30 year mortgage calculator",
        "15 year mortgage calculator",
        "mortgage payoff calculator",
        "how much house can I afford calculator",
      ],
    },
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
    seo: {
      definition:
        "A loan calculator is a free online tool that estimates the monthly payment, total interest, and total cost of any fixed-rate loan — including personal loans, student loans, and debt consolidation loans. Use it to compare offers, model extra payments, and see exactly what a loan will cost you over its full term.",
      formula:
        "The monthly payment uses the standard amortization formula M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments. Total interest = (M × n) − P.",
      howToUse: [
        "Enter the total loan amount you want to borrow.",
        "Enter the annual interest rate (APR) quoted by the lender.",
        "Enter the loan term in months or years.",
        "Optionally add an extra monthly payment to see how much faster the loan is paid off.",
        "Review the monthly payment, total interest, and total cost.",
      ],
      example:
        "For a $25,000 personal loan at 9.5% APR over 5 years (60 months), the monthly payment is $525.13, total interest paid is $6,507.80, and the total cost is $31,507.80.",
      faqs: [
        {
          q: "What is a good APR for a personal loan?",
          a: "For borrowers with good credit (700+ FICO), personal loan APRs typically range from 7% to 12%. Borrowers with excellent credit may qualify for rates below 7%, while fair-credit borrowers often see 18% or higher.",
        },
        {
          q: "How is interest on a personal loan calculated?",
          a: "Personal loans use amortizing interest: each monthly payment covers interest on the remaining balance first, with the remainder reducing principal. Early payments are mostly interest; later payments are mostly principal.",
        },
        {
          q: "How much would a $10,000 loan cost per month?",
          a: "A $10,000 loan at 10% APR for 3 years costs $322.67 per month, with total interest of about $1,616. The same loan over 5 years drops the payment to $212.47 but raises total interest to $2,748.",
        },
        {
          q: "Does paying extra on a loan reduce the monthly payment?",
          a: "No — extra payments shorten the loan term rather than lowering the monthly payment, unless you recast or refinance the loan. Each extra dollar goes directly against principal, saving future interest.",
        },
      ],
      relatedSearches: [
        "personal loan calculator",
        "loan calculator with extra payments",
        "monthly payment calculator",
        "loan payoff calculator",
        "simple interest loan calculator",
        "debt consolidation calculator",
        "loan interest calculator",
      ],
    },
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
    seo: {
      definition:
        "An auto loan calculator is a free online tool that estimates your monthly car payment and total interest based on vehicle price, down payment, trade-in value, APR, and loan term. Use it to compare financing offers from dealers, banks, and credit unions before you walk onto the lot.",
      formula:
        "Monthly payment = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the amount financed (vehicle price − down payment − trade-in value, plus any taxes and fees rolled into the loan), r is the monthly interest rate (APR ÷ 12), and n is the loan term in months.",
      howToUse: [
        "Enter the vehicle purchase price.",
        "Add your down payment and the trade-in value of your current car.",
        "Enter the APR (use a pre-approved rate from your bank or credit union).",
        "Choose a loan term — typically 36, 48, 60, 72, or 84 months.",
        "Review the monthly payment, total interest, and total cost of the loan.",
      ],
      example:
        "For a $35,000 car with $5,000 down and a $3,000 trade-in at 6.0% APR for 60 months, the amount financed is $27,000. The monthly payment is $521.99, and total interest over 5 years is $4,319.40.",
      faqs: [
        {
          q: "What is a good APR for a car loan?",
          a: "For borrowers with good credit (700+), new-car APRs typically range from 5% to 7% and used-car APRs from 6% to 9%. Borrowers with excellent credit can sometimes get 0%–4% promotional financing from manufacturers.",
        },
        {
          q: "Is a 72-month or 84-month car loan a good idea?",
          a: "Longer terms lower your monthly payment but sharply increase total interest and increase the risk of being 'upside down' on the loan — owing more than the car is worth. Most financial advisors recommend keeping auto loans at 60 months or shorter.",
        },
        {
          q: "Should I use dealer financing or a bank loan?",
          a: "Get pre-approved by a bank or credit union first so you know your rate, then ask the dealer to beat it. Dealers sometimes mark up the rate for profit, but manufacturers also offer subsidized 0% or low-APR deals that banks can't match.",
        },
        {
          q: "How does a trade-in affect my car loan?",
          a: "Your trade-in reduces the amount you need to finance, lowering your monthly payment and total interest. In most U.S. states, the trade-in value also reduces the sales-tax basis on the new vehicle.",
        },
      ],
      relatedSearches: [
        "auto loan calculator with trade in",
        "car payment calculator",
        "used car loan calculator",
        "auto loan APR calculator",
        "car loan payoff calculator",
        "84 month auto loan calculator",
        "auto loan estimator with taxes and fees",
      ],
    },
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
    seo: {
      definition:
        "An interest calculator is a free online tool that computes simple and compound interest earned on a principal amount over time. Use it to estimate the growth of a savings deposit, certificate of deposit (CD), bond, or any interest-bearing account.",
      formula:
        "Simple interest is I = P × r × t, where P is principal, r is the annual interest rate, and t is the time in years. Compound interest uses A = P × (1 + r/n)^(n × t), where n is the number of compounding periods per year, and total interest = A − P.",
      howToUse: [
        "Enter the principal amount you're depositing or investing.",
        "Enter the annual interest rate as a percentage.",
        "Enter the time period in years.",
        "Choose the compounding frequency (annually, quarterly, monthly, or daily).",
        "Compare the simple-interest and compound-interest results side by side.",
      ],
      example:
        "$10,000 invested at 5% annual interest compounded monthly for 10 years grows to $16,470.09 — earning $6,470.09 in compound interest. The same deposit with simple interest would earn only $5,000.",
      faqs: [
        {
          q: "What is the difference between simple and compound interest?",
          a: "Simple interest is calculated only on the original principal, while compound interest is calculated on the principal plus any interest already earned. Over time, compounding produces significantly more growth, especially with frequent compounding periods.",
        },
        {
          q: "How much will $10,000 be worth in 20 years at 5%?",
          a: "$10,000 invested at 5% compounded monthly for 20 years grows to $27,126.40 — earning $17,126.40 in interest. Compounded annually, the same deposit grows to $26,532.98.",
        },
        {
          q: "How is savings account interest calculated?",
          a: "Most savings accounts use daily compounding: A = P × (1 + r/365)^(365 × t). The annual percentage yield (APY) accounts for this compounding, so a 4.50% APY already includes the effect of daily compounding on the stated rate.",
        },
        {
          q: "Is interest on a savings account taxable?",
          a: "Yes — interest earned in a savings account, CD, or money market fund is taxed as ordinary income at the federal level, and usually at the state level too. The bank issues a Form 1099-INT for interest over $10 in a calendar year.",
        },
      ],
      relatedSearches: [
        "simple interest calculator",
        "compound interest calculator",
        "savings account interest calculator",
        "CD interest calculator",
        "monthly interest calculator",
        "interest rate calculator",
        "annual interest calculator",
      ],
    },
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
    seo: {
      definition:
        "A payment calculator is a free online tool that calculates the periodic payment for any loan based on principal, interest rate, number of periods, and compounding frequency. It handles flexible payment schedules — weekly, biweekly, monthly, quarterly, or annual — and any compounding convention.",
      formula:
        "For periodic compounding, M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the principal, r is the periodic interest rate (annual rate ÷ periods per year), and n is the total number of payments. Total paid = M × n, and total interest = (M × n) − P.",
      howToUse: [
        "Enter the loan principal amount.",
        "Enter the annual interest rate.",
        "Enter the total number of payments or the loan term.",
        "Choose the payment and compounding frequency (weekly, monthly, quarterly, or annually).",
        "Review the periodic payment, total interest, and total cost.",
      ],
      example:
        "For a $15,000 loan at 8% APR repaid in 36 monthly payments, the monthly payment is $470.01, with total interest of $1,920.36 over the 3-year term and a total cost of $16,920.36.",
      faqs: [
        {
          q: "How do you calculate monthly payment on a loan?",
          a: "Use the amortization formula M = P × [r(1+r)^n] / [(1+r)^n − 1], with r as the monthly rate (annual ÷ 12) and n as the number of monthly payments. Most spreadsheet apps also have a PMT(rate, nper, pv) function that does the same thing.",
        },
        {
          q: "What is the formula for monthly payment with simple interest?",
          a: "For a simple-interest installment loan, monthly payment = (P + P × r × t) / n, where P is principal, r is the annual rate, t is years, and n is the number of monthly payments. This is the standard formula used for many auto loans in the U.S.",
        },
        {
          q: "How does payment frequency affect total interest?",
          a: "More frequent payments (e.g., biweekly instead of monthly) reduce total interest because principal is paid down sooner. Switching from monthly to biweekly on a 30-year mortgage typically cuts 5–7 years off the term.",
        },
        {
          q: "What is the difference between APR and interest rate?",
          a: "The interest rate is the cost of borrowing the principal. The APR includes the interest rate plus lender fees and points, expressed as an annualized rate. APR is the better number for comparing loan offers side by side.",
        },
      ],
      relatedSearches: [
        "monthly payment calculator",
        "loan payment calculator",
        "biweekly payment calculator",
        "weekly payment calculator",
        "simple interest payment calculator",
        "PMT calculator",
        "installment loan calculator",
      ],
    },
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
    seo: {
      definition:
        "A retirement calculator is a free online tool that projects how much you'll have saved by retirement age based on your current savings, monthly contributions, expected rate of return, and years to retirement. Use it to see if you're on track and to model Social Security, 401(k) match, and IRA scenarios side by side.",
      formula:
        "Future value combines a present-value amount and a series of contributions: FV = P × (1+r)^t + PMT × [((1+r)^t − 1) / r], where P is current savings, PMT is the monthly contribution, r is the monthly return (annual return ÷ 12), and t is the number of months until retirement.",
      howToUse: [
        "Enter your current retirement savings balance.",
        "Enter your monthly contribution (include any employer 401(k) match).",
        "Enter the expected annual return (6–7% is a common pre-retirement assumption).",
        "Enter the number of years until you retire.",
        "Review the projected balance, total contributions, and total growth.",
      ],
      example:
        "A 35-year-old with $50,000 saved, contributing $500 per month at a 7% annual return until age 65 (30 years), would retire with about $1,015,776 — $230,000 from contributions ($50K starting balance + $180K monthly) and $785,776 from investment growth.",
      faqs: [
        {
          q: "How much money do I need to retire?",
          a: "A common rule of thumb is 25× your annual expenses — the so-called '4% rule.' If you plan to spend $60,000 per year in retirement, aim for $1.5 million saved. Many retirees also factor in Social Security, pensions, and home equity.",
        },
        {
          q: "How much should I contribute to my 401(k) per month?",
          a: "At minimum, contribute enough to get your full employer match — that's free money. After that, aim for 15% of gross income (including the match) split between a 401(k) and Roth IRA for tax diversification.",
        },
        {
          q: "What is a good rate of return for retirement planning?",
          a: "Most planners use 6–7% real return (after inflation) for a stock-heavy portfolio. Use a more conservative 4–5% if your mix is bond-heavy or if you're within a few years of retirement.",
        },
        {
          q: "How does Social Security factor into retirement income?",
          a: "Social Security replaces about 40% of pre-retirement income for an average earner, with benefits starting as early as age 62 (reduced) or as late as age 70 (increased). Many retirees delay claiming to age 67 or 70 to lock in a higher monthly payment.",
        },
      ],
      relatedSearches: [
        "retirement calculator with social security",
        "401k calculator",
        "retirement savings calculator",
        "FIRE calculator",
        "Roth IRA calculator",
        "retirement income calculator",
        "how much do I need to retire calculator",
      ],
    },
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
    seo: {
      definition:
        "An amortization calculator is a free online tool that builds a full payment schedule showing how each payment splits between principal and interest, plus the remaining loan balance after each period. Use it to see exactly how much interest you'll pay each month, year, or over the life of any loan — and how extra payments change the schedule.",
      formula:
        "Each period: interest = remaining balance × periodic rate; principal = payment − interest; new balance = old balance − principal. The fixed payment is M = P × [r(1+r)^n] / [(1+r)^n − 1]. Extra payments apply directly to principal, shortening the term and reducing total interest.",
      howToUse: [
        "Enter the loan amount.",
        "Enter the annual interest rate.",
        "Enter the loan term in years or months.",
        "Optionally add an extra monthly or one-time principal payment.",
        "Review the amortization schedule by month or by year.",
      ],
      example:
        "A $200,000 loan at 6% interest over 30 years has a monthly payment of $1,199.10. The first payment splits into $1,000 of interest and $199.10 of principal. Adding $200 per month in extra principal pays off the loan in 252 months (about 21 years instead of 30) and saves roughly $79,100 in interest.",
      faqs: [
        {
          q: "How is an amortization schedule calculated?",
          a: "For each period, interest = current balance × periodic rate. The principal portion of the payment = total payment − interest. Subtract the principal from the balance and repeat for the next period. The fixed payment is calculated so the balance hits zero on the last period.",
        },
        {
          q: "Why does interest decrease over the life of a loan?",
          a: "Interest is charged on the remaining balance. As each payment reduces principal, the next period's interest is computed on a smaller balance, so a larger share of each payment goes to principal. This is why early payments are mostly interest and late payments are mostly principal.",
        },
        {
          q: "How do extra payments affect an amortization schedule?",
          a: "Extra payments apply directly to principal, which reduces every future interest charge. This shortens the loan term and lowers total interest, but it doesn't lower the required monthly payment unless you refinance or recast the loan.",
        },
        {
          q: "What is the difference between amortization and simple interest?",
          a: "Amortizing loans recalculate interest each period on the remaining balance (so principal grows over time). Simple-interest installment loans compute total interest up front and divide it evenly across payments. Both are common in auto lending — read the contract carefully.",
        },
      ],
      relatedSearches: [
        "amortization calculator with extra payments",
        "amortization schedule calculator",
        "loan amortization table",
        "monthly amortization schedule",
        "mortgage amortization calculator",
        "amortization schedule with balloon payment",
        "free printable amortization schedule",
      ],
    },
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
    seo: {
      definition:
        "An investment calculator is a free online tool that estimates the future value of an investment based on an initial deposit, regular contributions, expected rate of return, and time horizon. Use it to model stocks, ETFs, mutual funds, and other growth investments and to see the long-term power of compound growth.",
      formula:
        "Future value = P × (1+r)^t + PMT × [((1+r)^t − 1) / r], where P is the initial investment, PMT is the periodic contribution, r is the periodic return, and t is the number of periods. For monthly contributions, divide the annual return by 12 and multiply the years by 12.",
      howToUse: [
        "Enter your initial investment amount.",
        "Enter your regular contribution amount and frequency (monthly or annually).",
        "Enter the expected annual rate of return.",
        "Enter the time horizon in years.",
        "Review the future value, total contributions, and total investment growth.",
      ],
      example:
        "$10,000 invested today plus $300 per month at an 8% annual return for 25 years grows to about $358,645 — $100,000 from contributions ($10K starting + $90K monthly) and $258,645 from investment growth.",
      faqs: [
        {
          q: "What is a good return on investment?",
          a: "Historically, the U.S. stock market (S&P 500) has returned about 10% per year before inflation, or about 7% after inflation. Bonds return around 4–5%, while high-yield savings and CDs typically return 3–5% in a normal rate environment.",
        },
        {
          q: "How much will $10,000 be worth in 20 years at 7%?",
          a: "$10,000 invested at 7% compounded monthly for 20 years grows to $40,389.40 — about a 4× return. Adding $300 per month over the same period brings the final balance to roughly $191,000.",
        },
        {
          q: "How do I calculate investment growth with monthly contributions?",
          a: "Use FV = P × (1+r)^t + PMT × [((1+r)^t − 1) / r], with r as the monthly return (annual ÷ 12) and t as the number of months. Spreadsheet apps also have a FV(rate, nper, pmt, pv) function for this.",
        },
        {
          q: "Does investment income get taxed?",
          a: "In taxable brokerage accounts, yes — long-term capital gains (held over one year) are taxed at 0%, 15%, or 20% depending on income, while short-term gains are taxed as ordinary income. Tax-advantaged accounts like IRAs and 401(k)s defer or eliminate this tax.",
        },
      ],
      relatedSearches: [
        "investment growth calculator",
        "ROI calculator",
        "future value calculator",
        "investment calculator with monthly contributions",
        "compound investment calculator",
        "stock investment calculator",
        "lump sum investment calculator",
      ],
    },
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
    seo: {
      definition:
        "An inflation calculator is a free online tool that shows how the purchasing power of money changes over time due to inflation. Use it to see what a past dollar amount is worth today, to project what today's money will be worth in the future, or to compare historical prices across decades.",
      formula:
        "Future value adjusted for inflation = P × (1 + i)^t, where P is the original amount, i is the annual inflation rate, and t is the number of years. To find today's purchasing power of a future amount, divide by (1 + i)^t.",
      howToUse: [
        "Enter the original dollar amount.",
        "Enter the annual inflation rate (the long-term U.S. average is about 3%).",
        "Enter the number of years.",
        "Choose whether to compute future cost or present value.",
        "Review the adjusted amount and the loss of purchasing power.",
      ],
      example:
        "$100 in 2000 has the same buying power as about $181 in 2024, reflecting an average annual inflation rate of roughly 2.5%. Conversely, $100 today at 3% inflation will have the buying power of only about $74 in 10 years.",
      faqs: [
        {
          q: "How is inflation calculated?",
          a: "The U.S. Bureau of Labor Statistics tracks the Consumer Price Index (CPI), a basket of goods and services. Year-over-year inflation = (CPI this year − CPI last year) ÷ CPI last year × 100%.",
        },
        {
          q: "What is the average U.S. inflation rate?",
          a: "Over the last 30 years, U.S. inflation has averaged about 2.5% per year. From 2021–2023 it spiked to 6–8%, the highest since the early 1980s, before easing back toward the Federal Reserve's 2% target.",
        },
        {
          q: "How much will $100,000 be worth in 20 years at 3% inflation?",
          a: "At 3% annual inflation, $100,000 today has the buying power of about $55,368 in 20 years — nearly half its current purchasing power. This is why long-term investments need to outpace inflation.",
        },
        {
          q: "What's the difference between CPI and PCE inflation?",
          a: "CPI measures what urban consumers pay for a fixed basket of goods. PCE (Personal Consumption Expenditures) covers a broader range of spending and is the Federal Reserve's preferred inflation gauge. PCE typically runs about 0.3 percentage points lower than CPI.",
        },
      ],
      relatedSearches: [
        "inflation calculator",
        "historical inflation calculator",
        "purchasing power calculator",
        "CPI inflation calculator",
        "future inflation calculator",
        "cost of living calculator",
        "dollar value over time calculator",
      ],
    },
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
    seo: {
      definition:
        "A finance calculator is a free online tool that solves the time value of money (TVM) equation for any one of five variables: present value (PV), future value (FV), periodic payment (PMT), interest rate, or number of periods. It's the same model used in finance courses and on HP and Texas Instruments financial calculators.",
      formula:
        "The TVM equation is PV × (1+r)^n + PMT × [((1+r)^n − 1) / r] + FV = 0, where r is the periodic rate and n is the number of periods. Solving for any one variable (when the other four are known) lets you compute loan payments, savings goals, mortgage payoffs, and break-even returns.",
      howToUse: [
        "Choose which variable to solve for: PV, FV, PMT, rate, or number of periods.",
        "Enter the known values for the other four variables.",
        "Set the periodic interest rate and number of periods.",
        "Optionally toggle beginning-of-period vs end-of-period payments.",
        "Review the solved variable and the full TVM breakdown.",
      ],
      example:
        "To save $50,000 over 10 years with a 7% annual return compounded monthly, you need to deposit about $289 per month. The $50,000 breaks down as roughly $34,685 in total contributions and $15,315 in investment growth.",
      faqs: [
        {
          q: "What is the time value of money?",
          a: "The time value of money (TVM) is the principle that a dollar today is worth more than a dollar tomorrow because today's dollar can be invested to earn interest. TVM formulas let you compare cash flows that happen at different points in time.",
        },
        {
          q: "What is the difference between present value and future value?",
          a: "Present value (PV) is what a future cash flow is worth today, discounted at a given rate. Future value (FV) is what a present amount will grow to over time at a given rate. The two are linked by FV = PV × (1+r)^n.",
        },
        {
          q: "How do you calculate PMT on a financial calculator?",
          a: "Enter N (number of periods), I/Y (periodic interest rate as a percent, not decimal), and PV (present value as a negative number for an outflow), then compute PMT. On a TI BA II Plus, set P/Y = 1 for clarity.",
        },
        {
          q: "What is the TVM formula used for in real life?",
          a: "TVM is used for mortgage and auto loan payments, retirement projections, bond pricing, lease-vs-buy decisions, business project valuation (NPV/IRR), and any scenario where money moves across time periods at a known rate.",
        },
      ],
      relatedSearches: [
        "time value of money calculator",
        "TVM calculator",
        "present value calculator",
        "future value calculator",
        "PMT calculator",
        "NPV calculator",
        "financial calculator online",
      ],
    },
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
    seo: {
      definition:
        "An income tax calculator is a free online tool that estimates your federal income tax owed based on taxable income, filing status, and the current IRS tax brackets. Use it to estimate your tax liability, marginal tax rate, and effective tax rate for the 2024 tax year.",
      formula:
        "The U.S. uses progressive tax brackets: each portion of taxable income is taxed at the rate for the bracket it falls into. Tax = Σ (income portion in bracket × bracket rate). Your marginal rate is the rate on your last dollar earned; your effective rate = total tax ÷ taxable income.",
      howToUse: [
        "Enter your taxable income (after deductions and pre-tax contributions).",
        "Choose your filing status: single, married filing jointly, head of household, or married filing separately.",
        "Enter any tax credits or additional deductions.",
        "Optionally add a state income tax rate for a full liability estimate.",
        "Review federal tax owed, marginal rate, and effective rate.",
      ],
      example:
        "A single filer with $85,000 of taxable income in 2024 owes about $13,753 in federal income tax — an effective rate of 16.2% and a marginal rate of 22%.",
      faqs: [
        {
          q: "How are federal income tax brackets calculated?",
          a: "The U.S. uses a progressive system: each chunk of your taxable income is taxed at the rate for its bracket. A single filer at $85,000 in 2024 pays 10% on the first $11,600, 12% on income from $11,601 to $47,150, and 22% on income from $47,151 to $85,000.",
        },
        {
          q: "What is the difference between marginal and effective tax rate?",
          a: "Marginal rate is the rate on your next dollar of income (the bracket your top dollar falls in). Effective rate is your total tax divided by total taxable income — it's always lower than your marginal rate because lower brackets are taxed less.",
        },
        {
          q: "What is the standard deduction for 2024?",
          a: "For 2024 the standard deduction is $14,600 for single filers and married filing separately, $29,200 for married filing jointly, and $21,900 for head of household. Most taxpayers take the standard deduction rather than itemizing.",
        },
        {
          q: "How much tax do I owe on $100,000 of income?",
          a: "A single filer with $100,000 of taxable income in 2024 owes about $17,053 in federal income tax — an effective rate of 17.1%. If $100,000 is your gross income and you take the $14,600 standard deduction, your taxable income drops to $85,400 and your federal tax falls to about $13,841.",
        },
      ],
      relatedSearches: [
        "income tax calculator 2024",
        "federal income tax calculator",
        "tax bracket calculator",
        "marginal tax rate calculator",
        "take home pay calculator",
        "state income tax calculator",
        "self employment tax calculator",
      ],
    },
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
    seo: {
      definition:
        "A compound interest calculator is a free online tool that shows how your savings or investment grows when interest is added to the principal and itself earns interest. Use it to see the long-term effect of compounding frequency, regular deposits, and a higher contribution rate.",
      formula:
        "Compound interest uses A = P × (1 + r/n)^(n × t), where P is principal, r is the annual rate, n is compounding periods per year, and t is years. With monthly deposits PMT, add PMT × [((1 + r/n)^(n × t) − 1) / (r/n)]. Total interest earned = A − P − (PMT × n × t).",
      howToUse: [
        "Enter the initial deposit (principal).",
        "Enter the annual interest rate.",
        "Choose the compounding frequency (daily, monthly, quarterly, or annually).",
        "Enter any regular monthly contributions you plan to add.",
        "Enter the time horizon in years, then review the final balance, total contributions, and interest earned.",
      ],
      example:
        "$5,000 invested at 7% compounded monthly, with $250 added each month for 20 years, grows to about $150,428. That breaks down to $65,000 in total contributions ($5,000 initial + $60,000 monthly) and $85,428 in compound interest.",
      faqs: [
        {
          q: "How is compound interest calculated?",
          a: "Use A = P × (1 + r/n)^(n × t), where P is principal, r is the annual rate, n is compounding periods per year, and t is years. For monthly compounding, set n = 12. The total interest earned is A minus the principal.",
        },
        {
          q: "How much will $10,000 be worth in 20 years at 5% compound interest?",
          a: "$10,000 invested at 5% compounded monthly for 20 years grows to $27,126.40 — earning $17,126.40 in interest. Compounded annually, it grows to $26,532.98, showing how compounding frequency matters.",
        },
        {
          q: "What is the difference between simple and compound interest?",
          a: "Simple interest is earned only on the original principal. Compound interest is earned on the principal plus any previously earned interest. Over long periods, compounding produces dramatically more growth than simple interest.",
        },
        {
          q: "What is the Rule of 72?",
          a: "The Rule of 72 estimates how long it takes money to double: divide 72 by the annual interest rate. At 8% annual return, money doubles in about 9 years (72 ÷ 8). At 6%, it takes 12 years.",
        },
      ],
      relatedSearches: [
        "compound interest calculator with monthly contributions",
        "compound interest calculator daily",
        "savings compound interest calculator",
        "compound interest calculator with withdrawals",
        "Rule of 72 calculator",
        "compound growth calculator",
        "investment compound interest calculator",
      ],
    },
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
    seo: {
      definition:
        "A salary calculator is a free online tool that converts your pay between hourly, daily, weekly, monthly, and annual amounts. Use it to compare job offers, calculate overtime pay, and see exactly what an hourly wage adds up to over a year.",
      formula:
        "Annual salary = hourly rate × hours per week × weeks per year (typically 52). Monthly salary = annual ÷ 12. Weekly = hourly × hours per week. Daily = hourly × hours per day. For overtime, pay 1.5× the hourly rate for hours above 40 in a week under U.S. federal law.",
      howToUse: [
        "Enter your hourly rate or annual salary.",
        "Enter the number of hours you work per week.",
        "Enter weeks worked per year (default is 52).",
        "Optionally add overtime hours and the overtime rate.",
        "Review equivalent pay across all time periods.",
      ],
      example:
        "A $25/hour wage working 40 hours per week for 52 weeks equals an annual salary of $52,000 — about $4,333.33 per month, $1,000 per week, and $200 per day. Adding 5 hours of overtime each week at time-and-a-half raises annual pay to $61,750.",
      faqs: [
        {
          q: "How do I calculate my annual salary from an hourly rate?",
          a: "Multiply your hourly rate by the hours you work per week, then by the number of weeks per year. At 40 hours/week for 52 weeks, $25/hour = $25 × 40 × 52 = $52,000 per year.",
        },
        {
          q: "How much is $20 an hour annually?",
          a: "At 40 hours per week for 52 weeks, $20/hour equals $41,600 per year — about $3,466.67 per month. If you take 2 weeks unpaid vacation, annual pay drops to $40,000.",
        },
        {
          q: "How is overtime pay calculated?",
          a: "Under U.S. federal law, non-exempt employees earn 1.5× their regular hourly rate for any hours worked above 40 in a workweek. So a $20/hour worker earns $30/hour for each overtime hour.",
        },
        {
          q: "What is the difference between gross and net salary?",
          a: "Gross salary is your pay before taxes and deductions. Net (take-home) salary is what hits your bank account after federal and state taxes, Social Security, Medicare, health insurance, and retirement contributions are withheld. Net is typically 70–80% of gross.",
        },
      ],
      relatedSearches: [
        "hourly to salary calculator",
        "annual salary calculator",
        "salary to hourly calculator",
        "paycheck calculator",
        "take home pay calculator",
        "overtime calculator",
        "monthly income calculator",
      ],
    },
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
    seo: {
      definition:
        "An interest rate calculator is a free online tool that determines the effective annual interest rate (APR) of a loan from the loan amount, monthly payment, and term. Use it to compare financing offers, evaluate the true cost of credit, and check that a quoted rate matches the actual payments.",
      formula:
        "Solve for r in M = P × [r(1+r)^n] / [(1+r)^n − 1], where M is the monthly payment, P is the principal, and n is the number of months. The result r is the monthly rate; multiply by 12 (or compound) to get the APR. There is no closed-form solution — the rate is solved numerically (typically Newton's method).",
      howToUse: [
        "Enter the loan amount (principal).",
        "Enter the monthly payment you're making.",
        "Enter the loan term in months or years.",
        "Click calculate to solve for the APR.",
        "Optionally add fees to compute the true APR including closing costs.",
      ],
      example:
        "A $20,000 loan repaid with $482.66 monthly payments over 48 months has an effective APR of about 7.42%. Borrowers can use this to compare dealer financing against credit-union loans when the stated rate is unclear or hidden in fees.",
      faqs: [
        {
          q: "How do you calculate the interest rate on a loan?",
          a: "If you know the loan amount, monthly payment, and term, solve for r in the amortization formula M = P × [r(1+r)^n] / [(1+r)^n − 1]. There's no algebraic solution — financial calculators use iterative methods like Newton's method or bisection.",
        },
        {
          q: "What is the difference between APR and APY?",
          a: "APR (annual percentage rate) is the simple annual rate charged on a loan, ignoring compounding within the year. APY (annual percentage yield) is the effective annual rate that includes compounding. For a 12% nominal rate compounded monthly, APY = (1 + 0.12/12)^12 − 1 = 12.68%.",
        },
        {
          q: "What is a good APR for a personal loan?",
          a: "Borrowers with good credit typically see personal loan APRs of 7–12%. Borrowers with excellent credit (760+) can sometimes qualify for rates below 7%, while fair-credit borrowers (640–699) often receive 18% or higher.",
        },
        {
          q: "Is a lower APR always better?",
          a: "Usually yes, but check the term. A 36-month loan at 9% APR often costs less total interest than a 72-month loan at 6% APR, because the longer term means more months of interest charges. Always compare total cost, not just the rate.",
        },
      ],
      relatedSearches: [
        "APR calculator",
        "effective interest rate calculator",
        "annual interest rate calculator",
        "APY calculator",
        "loan rate calculator",
        "interest rate converter",
        "nominal vs effective interest rate calculator",
      ],
    },
  },
  {
    id: "sales-tax",
    name: "Sales Tax Calculator",
    category: "financial",
    short: "Sales Tax",
    description: "Quickly add sales tax to any purchase amount.",
    icon: Receipt,
    keywords: ["sales tax", "vat", "purchase"],
    seo: {
      definition:
        "A sales tax calculator is a free online tool that adds sales tax (or VAT) to any purchase amount, or reverses a tax-included price to find the pre-tax amount. Use it to compute the final price at checkout across U.S. states, Canadian provinces, and VAT-charging countries.",
      formula:
        "Total = amount × (1 + rate), where rate is the sales tax rate as a decimal (e.g., 7.25% = 0.0725). To reverse a tax-included total back to its pre-tax amount, divide the total by (1 + rate). The tax portion = total − pre-tax amount.",
      howToUse: [
        "Enter the purchase amount.",
        "Enter the sales tax rate as a percentage (e.g., 7.25 for California).",
        "Choose whether the amount entered is pre-tax or tax-included.",
        "Optionally add a second tax (e.g., state + local, or VAT + excise).",
        "Review the tax amount and the final total cost.",
      ],
      example:
        "A $50 purchase in a state with 7.25% sales tax adds $3.63 in tax, for a total of $53.63. Reversing it: a $100 tax-included receipt at 8% sales tax breaks down to $92.59 of goods plus $7.41 of tax.",
      faqs: [
        {
          q: "How do I calculate sales tax on a purchase?",
          a: "Multiply the pre-tax amount by the sales tax rate (as a decimal), then add the result to the original amount. For a $50 purchase at 7.25% tax: $50 × 0.0725 = $3.63 tax, for a total of $53.63.",
        },
        {
          q: "How do I back out sales tax from a total?",
          a: "Divide the tax-included total by (1 + rate). For an $80 receipt at 8% tax: $80 ÷ 1.08 = $74.07 pre-tax, and $80 − $74.07 = $5.93 tax. This is useful for expense reports and bookkeeping.",
        },
        {
          q: "Which U.S. state has the highest sales tax?",
          a: "As of 2024, California has the highest state-level sales tax rate at 7.25%. When combined with local city and county taxes, some California cities reach over 10.5% — the highest combined rates in the country.",
        },
        {
          q: "What's the difference between sales tax and VAT?",
          a: "Sales tax is charged only at the final retail sale to a consumer. VAT (value-added tax) is charged at each stage of production but credited back to businesses, so the final consumer effectively pays it. VAT rates in Europe range from 17% (Luxembourg) to 27% (Hungary).",
        },
      ],
      relatedSearches: [
        "sales tax calculator by state",
        "reverse sales tax calculator",
        "VAT calculator",
        "tax inclusive vs tax exclusive calculator",
        "California sales tax calculator",
        "Texas sales tax calculator",
        "combined state and local sales tax calculator",
      ],
    },
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
    seo: {
      definition:
        "A BMI calculator is a free online tool that calculates your Body Mass Index (BMI) from your height and weight. BMI is a widely used screening metric that classifies adults as underweight, normal weight, overweight, or obese.",
      formula:
        "BMI = weight (kg) ÷ height (m)². In imperial units: BMI = 703 × weight (lb) ÷ height (in)². Standard adult categories: underweight < 18.5, normal weight 18.5–24.9, overweight 25–29.9, obese 30+.",
      howToUse: [
        "Choose your preferred units — metric (kg, cm) or imperial (lb, in).",
        "Enter your height in the height field.",
        "Enter your current body weight.",
        "Click Calculate to see your BMI value and the category it falls into.",
        "Use the BMI chart to compare your result to the healthy range for your height.",
      ],
      example:
        "For an adult who is 70 kg and 175 cm tall: BMI = 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = 22.9, which falls in the Normal weight range (18.5–24.9).",
      faqs: [
        {
          q: "What is a healthy BMI?",
          a: "A healthy BMI for most adults is between 18.5 and 24.9. Below 18.5 is considered underweight, 25–29.9 is overweight, and 30 or higher falls in the obese range.",
        },
        {
          q: "How accurate is the BMI calculator?",
          a: "BMI is a quick screening tool that works for most adults, but it does not directly measure body fat. Very muscular athletes may register as overweight despite low fat, and older adults can have a normal BMI but high body fat. BMI is a screening metric, not a diagnostic of body fatness or health — consult a doctor for personal advice.",
        },
        {
          q: "Does BMI work for children and teens?",
          a: "For children and teens aged 2–19, BMI is plotted on age- and sex-specific CDC growth charts and reported as a percentile rather than a fixed category.",
        },
        {
          q: "What BMI should a 5'9\" man aim for?",
          a: "For an adult who is 5'9\" (175 cm), a weight between roughly 125–168 lb (56.7–76.2 kg) places BMI in the 18.5–24.9 normal range.",
        },
      ],
      relatedSearches: [
        "BMI chart",
        "healthy BMI range",
        "BMI calculator for men",
        "BMI calculator for women",
        "BMI calculator kg",
        "ideal weight by height",
        "body fat percentage",
      ],
    },
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
    seo: {
      definition:
        "A calorie calculator estimates how many calories you need each day based on your age, sex, height, weight, and activity level. It uses the Mifflin-St Jeor equation to compute your Total Daily Energy Expenditure (TDEE) for weight maintenance, loss, or gain.",
      formula:
        "BMR (Mifflin-St Jeor): Men = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5. Women = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161. TDEE = BMR × activity factor (1.2 sedentary, 1.375 light, 1.55 moderate, 1.725 very active, 1.9 extra active). Subtract ~500 kcal/day to lose about 1 lb per week.",
      howToUse: [
        "Select your sex and enter your age, height, and current weight.",
        "Choose your daily activity level, from sedentary to extra active.",
        "Pick a goal — maintain, lose, or gain weight.",
        "Click Calculate to see your daily calorie target and macronutrient breakdown.",
        "Track your intake against the target using a food diary or app.",
      ],
      example:
        "A 30-year-old male, 80 kg, 178 cm, with moderate activity: BMR = 10×80 + 6.25×178 − 5×30 + 5 = 800 + 1112.5 − 150 + 5 = 1767.5 kcal. TDEE = 1767.5 × 1.55 = 2739 kcal/day. To lose 1 lb/week, target ~2239 kcal/day.",
      faqs: [
        {
          q: "How many calories should I eat a day?",
          a: "Adult women typically need 1,600–2,400 kcal/day and adult men 2,000–3,000 kcal/day, depending on age, size, and activity level. Use the calculator to get a number tailored to your stats and goal.",
        },
        {
          q: "What is TDEE?",
          a: "TDEE (Total Daily Energy Expenditure) is the total calories you burn in a day, including BMR plus activity, digestion, and exercise. Eating below TDEE creates a deficit for weight loss; eating above it creates a surplus for weight gain.",
        },
        {
          q: "How accurate is a calorie calculator?",
          a: "The Mifflin-St Jeor equation used here is within about 10% of measured values for most adults. Calorie calculators are estimates, not exact prescriptions — adjust by 100–200 kcal based on real-world results and talk to a registered dietitian for personalized guidance.",
        },
        {
          q: "How big a deficit do I need to lose 1 lb per week?",
          a: "A deficit of about 500 kcal/day (3,500 kcal/week) is the classic estimate for losing ~1 lb of body fat per week, though real losses vary with water, muscle, and metabolic adaptation.",
        },
      ],
      relatedSearches: [
        "calorie calculator for weight loss",
        "TDEE calculator",
        "Mifflin St Jeor calculator",
        "how many calories to lose weight",
        "macro calculator",
        "maintenance calories",
        "BMR vs TDEE",
      ],
    },
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
    seo: {
      definition:
        "A body fat calculator estimates your body fat percentage using the U.S. Navy circumference method. By entering your neck, waist, and (for women) hip measurements along with height and sex, you get a fast, tape-measure-based alternative to DEXA scans and skinfold calipers.",
      formula:
        "Navy method for men: %BF = 495 ÷ (1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)) − 450. For women: %BF = 495 ÷ (1.29579 − 0.35004 × log10(waist + hip − neck) + 0.22100 × log10(height)) − 450. All measurements in cm. Healthy body fat is typically 10–20% for men and 18–28% for women.",
      howToUse: [
        "Select your biological sex — the formula differs for men and women.",
        "Enter your height in cm or inches.",
        "Measure and enter your neck circumference at the narrowest point.",
        "Measure your waist at the navel (and hip at the widest point, for women).",
        "Click Calculate to view your body fat percentage and category.",
      ],
      example:
        "For a man with waist 84 cm, neck 38 cm, height 178 cm: log10(46) = 1.6628 and log10(178) = 2.2504. %BF = 495 ÷ (1.0324 − 0.19077×1.6628 + 0.15456×2.2504) − 450 = 495 ÷ (1.0324 − 0.3171 + 0.3479) − 450 = 495 ÷ 1.0632 − 450 ≈ 15.6% body fat (fitness range).",
      faqs: [
        {
          q: "What is a good body fat percentage?",
          a: "For men, 10–20% is generally considered healthy; for women, 18–28%. Athletes often sit lower (men 6–13%, women 14–20%), while above 25% for men or 32% for women is typically classed as obese.",
        },
        {
          q: "How accurate is the Navy body fat calculator?",
          a: "The U.S. Navy circumference method is usually within 3–4% of DEXA results when measurements are taken correctly. For best accuracy, measure at the same time of day, exhale fully before reading the waist, and have a friend help. Body fat calculators are estimates — consult a healthcare professional for clinical assessment.",
        },
        {
          q: "How do I measure waist and neck for the Navy method?",
          a: "Measure the neck just below the larynx and the waist at the navel (men) or natural waistline (women), keeping the tape horizontal and snug but not compressing the skin. For women, also measure the hips at the widest point.",
        },
        {
          q: "Is body fat percentage better than BMI?",
          a: "Body fat percentage directly measures composition, while BMI only uses height and weight. Body fat is more informative for athletes, older adults, and anyone muscular whose BMI may look high despite low fat.",
        },
      ],
      relatedSearches: [
        "body fat calculator navy method",
        "body fat percentage chart",
        "body fat calculator men",
        "body fat calculator women",
        "how to measure body fat",
        "healthy body fat percentage",
        "army body fat calculator",
      ],
    },
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
    seo: {
      definition:
        "A BMR calculator estimates your Basal Metabolic Rate — the number of calories your body burns at complete rest just to keep vital functions like breathing, circulation, and cell production running. BMR is the largest single component of your daily calorie burn and the starting point for any TDEE or calorie deficit plan.",
      formula:
        "Mifflin-St Jeor (the most accurate formula for most people): Men = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(yrs) + 5. Women = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(yrs) − 161. The result is calories per day at rest. Multiply by an activity factor to estimate TDEE.",
      howToUse: [
        "Select your sex (the formula constant differs).",
        "Enter your age in years.",
        "Enter your height in cm or feet/inches.",
        "Enter your weight in kg or pounds.",
        "Click Calculate to see your daily BMR in calories.",
      ],
      example:
        "For a 28-year-old female, 65 kg, 165 cm: BMR = 10×65 + 6.25×165 − 5×28 − 161 = 650 + 1031.25 − 140 − 161 = 1380 kcal/day at complete rest.",
      faqs: [
        {
          q: "What is a good BMR?",
          a: "There is no single 'good' BMR — it depends on age, sex, height, and weight. Adult women typically fall around 1,200–1,600 kcal/day and adult men 1,500–2,000 kcal/day. A higher BMR means your body burns more calories at rest, often due to greater muscle mass.",
        },
        {
          q: "What is the difference between BMR and TDEE?",
          a: "BMR is calories burned at complete rest; TDEE multiplies BMR by your activity level to estimate total daily burn. TDEE is what you compare your food intake against for weight management.",
        },
        {
          q: "Which BMR formula is most accurate?",
          a: "The Mifflin-St Jeor equation, used by this calculator, is considered the most accurate for the general population. The older Harris-Benedict and Katch-McArdle (lean-mass) formulas are alternatives for specific cases.",
        },
        {
          q: "Can I eat below my BMR to lose weight?",
          a: "Eating well below BMR is generally not recommended without medical supervision because it can slow metabolism, reduce muscle mass, and cause nutrient shortfalls. A moderate deficit of 300–500 kcal/day from TDEE is safer for sustainable fat loss — consult a doctor or dietitian for personalized advice.",
        },
      ],
      relatedSearches: [
        "BMR calculator Mifflin St Jeor",
        "basal metabolic rate calculator",
        "BMR vs TDEE",
        "how to increase BMR",
        "BMR calculator for women",
        "BMR calculator for men",
        "resting calorie burn",
      ],
    },
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
    seo: {
      definition:
        "An ideal weight calculator estimates your healthy target body weight using several established formulas based on height and sex. It returns multiple reference values — Devine, Robinson, Miller, and Hamwi — so you can compare ranges rather than rely on a single number.",
      formula:
        "Devine (most cited): Men = 50 kg + 2.3 kg per inch over 5 ft; Women = 45.5 kg + 2.3 kg per inch over 5 ft. Robinson: Men = 52 kg + 1.9 kg/in; Women = 49 kg + 1.7 kg/in. Miller: Men = 56.2 kg + 1.41 kg/in; Women = 53.1 kg + 1.36 kg/in. Hamwi: Men = 48 kg + 2.7 kg/in; Women = 45.5 kg + 2.2 kg/in.",
      howToUse: [
        "Select your biological sex.",
        "Enter your height in feet and inches or in centimeters.",
        "Click Calculate to view ideal weights from four formulas.",
        "Compare the values and use the range as a healthy target zone.",
        "Adjust expectations for muscle mass, bone structure, and age.",
      ],
      example:
        "For a 5'9\" (69-inch) male using the Devine formula: ideal weight = 50 + 2.3 × (69 − 60) = 50 + 20.7 = 70.7 kg (about 156 lb). The Robinson formula gives 50 + 1.9×9 = 69.1 kg, and Hamwi gives 48 + 2.7×9 = 72.3 kg.",
      faqs: [
        {
          q: "How do I calculate my ideal body weight?",
          a: "The Devine formula is the most widely used: men = 50 kg + 2.3 kg for each inch over 5 ft; women = 45.5 kg + 2.3 kg per inch over 5 ft. This calculator shows four formulas side-by-side for comparison.",
        },
        {
          q: "What is a healthy weight for my height?",
          a: "A healthy weight usually corresponds to a BMI between 18.5 and 24.9. For example, a 5'7\" adult has a healthy range of roughly 118–159 lb (53.5–72.3 kg). The ideal weight calculator narrows this to a single target value per formula.",
        },
        {
          q: "Which ideal weight formula is best?",
          a: "The Devine formula is the most cited in clinical settings, but Robinson, Miller, and Hamwi each give slightly different targets. Use the calculator's range as a guide rather than a strict goal.",
        },
        {
          q: "Does frame size matter for ideal weight?",
          a: "Yes — people with a small frame should aim near the lower end of the range, and those with a large frame near the upper end. The formulas above assume a medium frame; consult a healthcare provider for individualized guidance.",
        },
      ],
      relatedSearches: [
        "ideal weight calculator by height",
        "healthy weight for 5'7 female",
        "Devine formula ideal weight",
        "ideal body weight calculator",
        "how much should I weigh",
        "height weight chart",
        "Robinson formula weight",
      ],
    },
  },
  {
    id: "pace",
    name: "Pace Calculator",
    category: "health",
    short: "Pace",
    description: "Compute your running pace, time or distance.",
    icon: Timer,
    keywords: ["pace", "running", "speed"],
    seo: {
      definition:
        "A pace calculator computes your running pace, total time, or distance covered based on the two values you enter. Whether you are training for a 5K, marathon, or simply tracking a jog, it converts between min/mi, min/km, mph, and km/h so you can hit your target splits.",
      formula:
        "Pace = Time ÷ Distance. Time = Pace × Distance. Distance = Time ÷ Pace. To convert min/km to min/mi, multiply by 1.609; to convert min/mi to min/km, divide by 1.609. Speed in mph = 60 ÷ pace (min/mi).",
      howToUse: [
        "Enter any two of distance, time, and pace.",
        "Choose your preferred units (miles or kilometers).",
        "Click Calculate to solve for the third value.",
        "Use the results to plan race splits or training runs.",
      ],
      example:
        "A runner completes a 10K (6.21 miles) in 50 minutes. Pace = 50 ÷ 6.21 = 8.05 min/mi = 8:03 per mile, or 5:00 per kilometer. Equivalent speed = 60 ÷ 8.05 = 7.45 mph (12 km/h).",
      faqs: [
        {
          q: "What is a good running pace?",
          a: "For recreational runners, a pace between 9:00 and 12:00 per mile (5:35–7:27 per km) is typical. Competitive amateur men average 7:00–8:30 min/mi and women 8:00–9:30 min/mi; elite marathoners run under 5:30 per mile.",
        },
        {
          q: "How do I calculate my pace per mile?",
          a: "Divide total time by total distance. For example, 40 minutes over 4 miles = 40 ÷ 4 = 10:00 per mile. This calculator handles the math and unit conversion automatically.",
        },
        {
          q: "How do I convert min/km to min/mi?",
          a: "Multiply min/km by 1.609 to get min/mi. A 5:00/km pace is roughly 8:03/mi. Conversely, divide min/mi by 1.609 to get min/km.",
        },
        {
          q: "What pace do I need to finish a marathon in 4 hours?",
          a: "A 4-hour marathon needs an average pace of 9:09 per mile (5:41 per km) across the 26.2-mile (42.2 km) distance.",
        },
      ],
      relatedSearches: [
        "pace calculator running",
        "running pace calculator km",
        "marathon pace calculator",
        "5k pace calculator",
        "min per mile calculator",
        "race time predictor",
        "running speed calculator",
      ],
    },
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
    seo: {
      definition:
        "A pregnancy calculator estimates how far along you are by counting weeks from the first day of your last menstrual period (LMP). It shows your current gestational age, trimester, and key milestones such as the end of the first trimester, viability, and full term.",
      formula:
        "Gestational age = (today's date − LMP date) in days ÷ 7, expressed as weeks + days. A full-term pregnancy lasts 40 weeks (280 days). Trimesters: 1st = weeks 1–13, 2nd = weeks 14–27, 3rd = weeks 28–40. Full term is 39–40 weeks; 37–38 weeks is early term.",
      howToUse: [
        "Enter the first day of your last menstrual period.",
        "Optionally enter your average cycle length for a more accurate estimate.",
        "Click Calculate to see your current gestational age in weeks and days.",
        "Review your trimester and upcoming milestone dates.",
      ],
      example:
        "If your LMP was January 1 and today is March 15 (73 days later), you are 73 ÷ 7 = 10 weeks and 3 days pregnant, placing you in week 11 of the first trimester.",
      faqs: [
        {
          q: "How is pregnancy calculated in weeks?",
          a: "Pregnancy is counted from the first day of your last menstrual period, not from conception. So at conception you are technically about 2 weeks pregnant, and a full-term pregnancy lasts about 40 weeks (280 days) from LMP.",
        },
        {
          q: "Which trimester is the hardest?",
          a: "Many find the first trimester (weeks 1–13) the toughest due to nausea, fatigue, and hormone changes. The second trimester (weeks 14–27) is often called the honeymoon phase, and the third (weeks 28–40) brings physical discomfort as the baby grows.",
        },
        {
          q: "How many weeks is full term?",
          a: "Full term is 39 weeks 0 days through 40 weeks 6 days. Births at 37–38 weeks are 'early term,' 41 weeks is 'late term,' and 42+ weeks is 'post term.'",
        },
        {
          q: "Is the pregnancy calculator accurate?",
          a: "Counting from LMP is accurate for women with regular 28-day cycles but can be off by a week or more if cycles are irregular. An early ultrasound (before 12 weeks) gives the most precise dating — discuss results with your OB-GYN.",
        },
      ],
      relatedSearches: [
        "pregnancy week calculator",
        "how many weeks pregnant am I",
        "pregnancy due date calculator",
        "pregnancy trimesters",
        "pregnancy calendar",
        "LMP calculator",
        "pregnancy calculator by weeks",
      ],
    },
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
    seo: {
      definition:
        "A pregnancy conception calculator estimates the date your baby was likely conceived based on your due date, last menstrual period, or birth date. Because ovulation usually happens about 14 days before the next period, conception is estimated around that window.",
      formula:
        "Conception date ≈ LMP + 14 days (for a 28-day cycle). If you only know the due date: Conception ≈ Due Date − 38 weeks (because the due date is LMP + 40 weeks, and conception is ~LMP + 2 weeks). For cycles shorter or longer than 28 days, adjust by (cycle length − 28) days.",
      howToUse: [
        "Enter either your due date, the first day of your last period, or your baby's birth date.",
        "Optionally enter your average menstrual cycle length.",
        "Click Calculate to see the estimated conception date and fertile window.",
      ],
      example:
        "If your due date is October 10, the estimated conception date is October 10 − 38 weeks = approximately January 25. The fertile window would have been around January 20–27, with ovulation most likely on or near January 25.",
      faqs: [
        {
          q: "How do I calculate my conception date?",
          a: "If you know your due date, subtract 38 weeks. If you know your last menstrual period, add about 14 days (for a 28-day cycle). For longer or shorter cycles, adjust by (cycle length − 28) days. Ultrasound dating gives the most precise estimate.",
        },
        {
          q: "Can the conception date be wrong?",
          a: "Yes — sperm can survive up to 5 days in the reproductive tract and ovulation timing varies, so conception can occur within a several-day window. The calculator provides an estimate, not an exact date.",
        },
        {
          q: "What is the fertile window?",
          a: "The fertile window is the 5 days before ovulation plus the day of ovulation itself — about 6 days each cycle. Conception is most likely when intercourse happens in this window.",
        },
        {
          q: "How accurate is conception dating from LMP?",
          a: "For women with regular 28-day cycles, LMP-based conception dating is reasonably close. For irregular cycles, an early first-trimester ultrasound is far more accurate. Consult your healthcare provider for personalized dating.",
        },
      ],
      relatedSearches: [
        "conception calculator",
        "conception date calculator by due date",
        "when did I conceive",
        "reverse due date calculator",
        "ovulation and conception calculator",
        "fertility window calculator",
        "conception calculator by LMP",
      ],
    },
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
    seo: {
      definition:
        "A due date calculator estimates when your baby will be born using Naegele's rule, based on the first day of your last menstrual period. The result includes your estimated delivery date, current gestational age, and the number of weeks remaining until birth.",
      formula:
        "Naegele's rule: Due Date = LMP + 280 days (equivalently, LMP + 9 months + 7 days). For cycles shorter or longer than 28 days, adjust by (cycle length − 28) days. For IVF pregnancies: Due Date = transfer date + 266 days for a day-5 embryo, or + 263 days for a day-3 embryo.",
      howToUse: [
        "Enter the first day of your last menstrual period.",
        "Optionally enter your average cycle length (defaults to 28 days).",
        "Click Calculate to see your estimated due date.",
        "Review your current gestational age and remaining weeks.",
      ],
      example:
        "If your LMP was January 1 and your cycle is 28 days, your estimated due date is January 1 + 280 days = October 8. With a 30-day cycle, add 2 days for an October 10 due date.",
      faqs: [
        {
          q: "How is my due date calculated?",
          a: "Most due dates use Naegele's rule: add 280 days (9 months + 7 days) to the first day of your last menstrual period. An early first-trimester ultrasound is even more accurate, especially for irregular cycles.",
        },
        {
          q: "How accurate is a due date calculator?",
          a: "Naegele's rule is right within about a week for women with regular 28-day cycles, but only about 5% of babies arrive on their exact due date. Most are born within two weeks of it — your provider may revise the date after an ultrasound.",
        },
        {
          q: "Can my due date change after an ultrasound?",
          a: "Yes. If an early ultrasound (especially before 12 weeks) shows a size different from your LMP-based date by more than 5–7 days, your OB-GYN may adjust the due date to match the ultrasound measurements.",
        },
        {
          q: "What if I conceived through IVF?",
          a: "For IVF, the due date is calculated from the embryo transfer date: add 266 days for a day-5 blastocyst transfer or 263 days for a day-3 embryo transfer. Tell your provider the exact transfer date and embryo age.",
        },
      ],
      relatedSearches: [
        "pregnancy due date calculator",
        "due date calculator by LMP",
        "Naegele's rule calculator",
        "IVF due date calculator",
        "due date calculator by conception date",
        "pregnancy week calculator",
        "when am I due",
      ],
    },
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
    seo: {
      definition:
        "A scientific calculator is a free online tool that evaluates mathematical expressions including trigonometric functions (sin, cos, tan), logarithms (ln, log), powers, roots, factorials, and constants like π and e. Use it for algebra, calculus prep, physics, and engineering calculations — no download or sign-in required.",
      formula:
        "Expressions are evaluated using the standard order of operations (PEMDAS): Parentheses → Exponents → Multiplication/Division (left-to-right) → Addition/Subtraction (left-to-right). Trigonometric functions accept degrees by default (switch to radians for calculus); log is base-10, ln is the natural logarithm (base e); n! = 1·2·3·…·n with 0! = 1; powers use a^b = exp(b·ln(a)); roots via sqrt(x) or x^(1/n).",
      howToUse: [
        "Tap buttons or type to build an expression — the live preview shows the evaluated result as you go.",
        "Use the DEG/RAD toggle to switch trig input between degrees (default) and radians.",
        "Insert constants with the π and e buttons; use ^ for exponents and ! for factorials.",
        "Press = to commit the result, AC to clear, or the back arrow to delete the last token.",
        "If the expression is undefined (e.g., 1/0, log(-1), asin(2)), the display shows 'Error' in red — fix the expression and re-evaluate.",
      ],
      example:
        "Evaluate sin(30) + cos(60) − 2^3 in DEG mode. sin(30) = 0.5, cos(60) = 0.5, 2^3 = 8. Result = 0.5 + 0.5 − 8 = −7. The live preview confirms −7 instantly, including the proper order-of-operations handling of the exponent before the subtraction.",
      faqs: [
        {
          q: "How does the scientific calculator handle degrees vs radians?",
          a: "By default, trig functions (sin, cos, tan) interpret their argument as degrees, which matches most homework problems. Toggle the DEG/RAD switch to radians for calculus work (derivatives and integrals of trig functions are defined in radians). Inverse trig functions (asin, acos, atan) return degrees in DEG mode and radians in RAD mode.",
        },
        {
          q: "What is the order of operations used?",
          a: "The engine follows standard PEMDAS: parentheses first, then exponents (^) and factorials (!), then multiplication and division left-to-right, then addition and subtraction left-to-right. So 10 − 4 × 2 = 2, not 12, because the multiplication is performed before the subtraction.",
        },
        {
          q: "How is −2² evaluated?",
          a: "As −(2²) = −4. The exponent operator binds tighter than unary minus, matching Google Calculator, Wolfram Alpha, and most math libraries. To square a negative number, write (−2)^2 = 4 explicitly.",
        },
        {
          q: "What's the difference between log and ln?",
          a: "log is the common logarithm base 10 (so log(100) = 2), and ln is the natural logarithm base e ≈ 2.71828 (so ln(e) = 1). Use ln for calculus and continuous-growth problems; use log for pH, decibels, and Richter-scale calculations.",
        },
        {
          q: "Does the calculator support keyboard input?",
          a: "Yes — type numbers, operators (+, −, *, /), parentheses, ^ for exponents, and the constants pi and e directly. The live preview re-evaluates on every keystroke so you can confirm the result before pressing =.",
        },
      ],
      relatedSearches: [
        "online scientific calculator with sin cos tan",
        "free scientific calculator no download",
        "scientific calculator with fractions",
        "degree to radian converter",
        "natural logarithm calculator",
        "factorial calculator",
        "exponent calculator with e",
      ],
    },
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
    seo: {
      definition:
        "A fraction calculator is a free online tool that adds, subtracts, multiplies and divides fractions — including mixed numbers and improper fractions — and shows step-by-step results so you can follow the work. It's ideal for homework, recipes, carpentry, and any problem involving ratios.",
      formula:
        "Operations on a/b and c/d: addition/subtraction use the lowest common denominator LCD = lcm(b, d), giving (a·d ± c·b)/(b·d), then reduce by gcd. Multiplication: (a/b)·(c/d) = (a·c)/(b·d). Division: (a/b) ÷ (c/d) = (a·d)/(b·c), provided c ≠ 0. The final fraction is reduced by gcd(numerator, denominator) and the sign is normalized to the numerator.",
      howToUse: [
        "Enter the first fraction's numerator and denominator (use a negative numerator for negative fractions).",
        "Pick an operation: add (+), subtract (−), multiply (×), or divide (÷).",
        "Enter the second fraction's numerator and denominator.",
        "Read the reduced fraction, its decimal equivalent, and the step-by-step breakdown showing the LCD and cross-multiplication.",
        "If you divide by a fraction whose numerator is 0, the calculator shows a clear 'Cannot divide by zero' message.",
      ],
      example:
        "Compute 1/2 × 2/3. Multiplication gives (1×2)/(2×3) = 2/6. Reduce by gcd(2,6) = 2 → 1/3. Decimal: 1 ÷ 3 ≈ 0.333333. The steps panel shows each multiplication and the reduction.",
      faqs: [
        {
          q: "How do I add fractions with unlike denominators?",
          a: "Find the lowest common denominator (LCD) — the least common multiple of the two denominators — then rewrite each fraction with that denominator and add the numerators. For 1/4 + 1/6 the LCD is 12, so 3/12 + 2/12 = 5/12. The calculator does this automatically and shows the LCD in the steps.",
        },
        {
          q: "How are fractions reduced to lowest terms?",
          a: "After computing the result, the calculator divides both the numerator and denominator by their greatest common divisor (gcd). For example, 6/8 → gcd(6,8) = 2 → 3/4. The sign is moved to the numerator so the denominator is always positive.",
        },
        {
          q: "Can I use improper fractions and mixed numbers?",
          a: "Yes. Enter any integer numerator and a non-zero denominator — improper fractions like 7/4 are accepted directly and reduce normally. For mixed numbers, convert first (e.g., 2 1/3 = 7/3) or compute the whole and fractional parts separately and add them.",
        },
        {
          q: "What happens when I divide by zero?",
          a: "Division by a fraction whose numerator is 0 is mathematically undefined, so the calculator displays 'Cannot divide by a zero numerator (the second fraction is 0)' instead of producing Infinity or NaN. A zero denominator in either input is rejected with 'Denominators must be non-zero'.",
        },
        {
          q: "How does the fraction calculator handle negative fractions?",
          a: "The sign is normalized to the numerator — so 1/(−2) is treated internally as −1/2 before any operation. The result is similarly normalized so the denominator is always positive and the sign sits on the numerator.",
        },
      ],
      relatedSearches: [
        "fraction calculator with steps",
        "adding fractions calculator",
        "subtracting fractions calculator",
        "multiply fractions calculator",
        "divide fractions calculator",
        "simplify fractions calculator",
        "mixed number calculator",
        "improper fraction calculator",
      ],
    },
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
    seo: {
      definition:
        "A percentage calculator is a free online tool that solves the four most common percentage problems: what is X% of Y, X is what percent of Y, the percent change between two values, and increase or decrease a value by X%. Use it for discounts, tips, taxes, grades, and growth rates.",
      formula:
        "To find X% of Y: result = (X ÷ 100) × Y. To find what percent X is of Y: % = (X ÷ Y) × 100. Percent change from X to Y = ((Y − X) ÷ X) × 100 — positive means increase, negative means decrease. To increase or decrease Y by X%: result = Y × (1 ± X/100).",
      howToUse: [
        "Choose the mode that matches your problem: '% of value', '% of total', '% change', or '± %'.",
        "Enter the two values the mode asks for (e.g., the percentage X and the base value Y).",
        "For 'Increase / decrease', also pick the direction (+ to grow, − to shrink).",
        "Read the result, the worked formula, and the plain-language summary.",
        "If you compute percent change from 0, the calculator shows '—' with a 'Starting value (X) must be non-zero' hint (dividing by zero is undefined).",
      ],
      example:
        "What is 15% of 200? result = (15 ÷ 100) × 200 = 0.15 × 200 = 30. So 15% of 200 is 30. The steps panel also displays the decimal form (0.15) and the formula '(X ÷ 100) × Y = result'.",
      faqs: [
        {
          q: "How do I calculate percentage increase?",
          a: "Use the formula ((new − old) ÷ old) × 100. For example, a price going from $80 to $100 is ((100 − 80) ÷ 80) × 100 = 25% increase. Switch to the '% change' mode, enter X = 80 and Y = 100, and the calculator returns '▲ 25% increase'.",
        },
        {
          q: "What is the percent change formula?",
          a: "Percent change = ((new value − old value) ÷ old value) × 100. A positive result is an increase; a negative result is a decrease. The old value must be non-zero — percent change from 0 is mathematically undefined (infinite).",
        },
        {
          q: "How is percentage difference different from percentage change?",
          a: "Percentage change compares one value to a fixed baseline (old → new) and is directional. Percentage difference compares two values with no clear baseline and uses their average as the denominator: |a − b| ÷ ((a + b)/2) × 100. This calculator computes percentage change; for a difference, average the two values yourself and use the '% of total' mode.",
        },
        {
          q: "Can I calculate a discount or tip percentage?",
          a: "Yes. For a 20% discount on a $50 item, use '± %' mode with Y = 50, X = 20, and direction − → result $40 (the discount is $10). For an 18% tip on a $32 check, use '% of value' with X = 18 and Y = 32 → $5.76.",
        },
        {
          q: "Why does the calculator show '—' for percent change from zero?",
          a: "Percent change divides by the starting value, so starting from 0 means dividing by 0, which is undefined (approaches infinity). Rather than displaying 'Infinity', the calculator shows '—' with the hint 'Starting value (X) must be non-zero'.",
        },
      ],
      relatedSearches: [
        "percentage increase calculator",
        "percentage change calculator",
        "percentage decrease calculator",
        "percent change formula",
        "percentage of a number",
        "percentage difference calculator",
        "tip calculator percentage",
        "discount percentage calculator",
      ],
    },
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
    seo: {
      definition:
        "A random number generator is a free online tool that produces one or more random integers inside a custom range. Use it for raffles, classrooms, dice-style games, sampling, and 'pick a number' decisions — with an optional 'no repeats' mode that guarantees every result is unique.",
      formula:
        "Each number is drawn with uniform probability using the browser's cryptographic random source (crypto.getRandomValues) and rejection sampling: a random 32-bit integer is rolled, and any value that would bias the modulo result is discarded and re-rolled. For 'no repeats' mode, a Fisher–Yates shuffle of the full range (small spans) or a Set-based draw (large spans) guarantees distinct results with no repeats.",
      howToUse: [
        "Enter the minimum and maximum values that bound the range (both inclusive).",
        "Set how many numbers you want to generate.",
        "Toggle 'No repeats' if every number must be unique — the count cannot exceed the range size.",
        "Optionally choose to sort the results ascending or descending.",
        "Click Generate to draw a fresh batch; each click produces a new independent set.",
      ],
      example:
        "Generate 5 unique random numbers between 1 and 100. Set Min = 1, Max = 100, Count = 5, toggle 'No repeats' on, and click Generate. A typical result is [17, 42, 63, 84, 91] — five distinct integers, each uniformly distributed in [1, 100] with no repeats.",
      faqs: [
        {
          q: "Can the random number generator avoid repeats?",
          a: "Yes — turn on 'No repeats' before generating. The calculator then draws without replacement so every number in the batch is unique. If you ask for more unique numbers than the range can hold (e.g., 10 unique numbers from 1–5), it shows a clear error explaining the range is too small.",
        },
        {
          q: "How do I generate a random number between 1 and 100?",
          a: "Set Min = 1, Max = 100, and Count = 1, then click Generate. Each click returns a fresh integer in [1, 100] inclusive. For a 'random number generator 1-100' with multiple draws, set Count to however many you need.",
        },
        {
          q: "Is the generator truly random?",
          a: "It uses the browser's cryptographic random source (window.crypto.getRandomValues with a Uint32Array) combined with rejection sampling. That makes the output uniformly distributed and unpredictable — suitable for raffles, sampling, and decisions. (For cryptographic secrets like passwords, use a dedicated password generator.)",
        },
        {
          q: "What's the largest range I can use?",
          a: "The range (max − min + 1) can be as large as 2^32 (about 4.3 billion). For non-unique draws there is no practical cap; for unique draws, large ranges use a Set-based algorithm so memory stays proportional to the count you request, not the range size.",
        },
        {
          q: "Why can't I generate 10 unique numbers from a range of 1 to 5?",
          a: "A range of 1–5 only contains 5 distinct integers, so it's impossible to draw 10 unique values. The calculator detects this and shows 'Cannot generate 10 unique numbers from a range of only 5 values (1–5)' instead of returning duplicates.",
        },
      ],
      relatedSearches: [
        "random number generator no repeats",
        "random number generator 1-100",
        "random number picker",
        "random number 1-10",
        "random number 1-1000",
        "lottery number generator",
        "raffle number generator",
        "random sample generator",
      ],
    },
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
    seo: {
      definition:
        "A triangle calculator is a free online tool that solves any triangle from three known parts — sides, angles, or a mix — and finds the missing sides, angles, area, perimeter, and type (right, acute, obtuse, equilateral, isosceles, or scalene). It supports SSS, SAS, ASA, and AAS input.",
      formula:
        "SSS uses the Law of Cosines: A = arccos((b² + c² − a²) ÷ (2bc)), and similarly for B and C; angles sum to 180°. SAS uses the Law of Cosines to find the third side: a² = b² + c² − 2bc·cos(A). ASA/AAS use the Law of Sines: a/sin(A) = b/sin(B) = c/sin(C). Area is found with Heron's formula: s = (a+b+c)/2, area = √(s(s−a)(s−b)(s−c)).",
      howToUse: [
        "Select the solve mode that matches what you know: SSS (three sides), SAS (two sides + included angle), ASA (two angles + included side), or AAS (two angles + non-included side).",
        "Enter the three known values in the input fields that appear.",
        "Read the solved triangle: all three sides, all three angles, perimeter, and area.",
        "Check the classification chip to see if the triangle is right, acute, or obtuse by angles and equilateral, isosceles, or scalene by sides.",
        "If your inputs are impossible (e.g., sides that violate the triangle inequality), the calculator shows a clear error rather than silent garbage.",
      ],
      example:
        "Solve an SSS triangle with sides 3, 4, 5. Law of Cosines: A = arccos((4² + 5² − 3²)/(2·4·5)) = arccos(32/40) = 36.87°; B = arccos((3² + 5² − 4²)/(2·3·5)) = 53.13°; C = 180 − 36.87 − 53.13 = 90°. Heron: s = 6, area = √(6·3·2·1) = √36 = 6. Result: a 3-4-5 right triangle with area 6.",
      faqs: [
        {
          q: "How do I solve a right triangle?",
          a: "If you know the two legs, use SSS after computing the hypotenuse with the Pythagorean theorem c = √(a² + b²), or use SAS with the included 90° angle. If you know one leg and the hypotenuse, use SSS or the Pythagorean theorem to get the other leg. The calculator handles right triangles just like any other — it also labels them 'Right' in the classification chip when one angle is exactly 90°.",
        },
        {
          q: "What is the triangle inequality?",
          a: "The sum of any two sides must be greater than the third (a + b > c, a + c > b, b + c > a). If your three sides violate this — for example 1, 2, 3 or 1, 2, 10 — no triangle exists, and the calculator returns 'Triangle inequality violated' instead of producing nonsensical angles.",
        },
        {
          q: "How does the calculator find angles from three sides?",
          a: "It uses the Law of Cosines: A = arccos((b² + c² − a²)/(2bc)). This is more numerically stable than the Law of Sines for SSS because it avoids the ambiguous 'SSA' case. The third angle is always 180° minus the other two, guaranteeing they sum to exactly 180°.",
        },
        {
          q: "Does the calculator work in degrees or radians?",
          a: "All angles are entered and displayed in degrees — the most natural unit for geometry and trigonometry homework. Internally, the conversion is handled by the standard π/180 factor; you do not need to switch modes.",
        },
        {
          q: "What is Heron's formula for the area?",
          a: "Given sides a, b, c, first compute the semiperimeter s = (a + b + c)/2, then the area is √(s(s − a)(s − b)(s − c)). For the 3-4-5 triangle: s = 6, so area = √(6·3·2·1) = √36 = 6. The calculator guards against tiny floating-point negative values inside the sqrt with Math.max(0, …).",
        },
      ],
      relatedSearches: [
        "triangle solver calculator",
        "right triangle calculator",
        "triangle angle calculator",
        "law of cosines calculator",
        "law of sines calculator",
        "heron's formula calculator",
        "pythagorean theorem calculator",
        "sss triangle calculator",
      ],
    },
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
    seo: {
      definition:
        "A standard deviation calculator is a free online tool that computes the mean, median, variance, standard deviation, range, and other descriptive statistics for a list of numbers. It reports both population (σ) and sample (s) standard deviation so you can choose the right one for your dataset.",
      formula:
        "Mean μ = (Σxᵢ)/n. Population variance σ² = Σ(xᵢ − μ)² / n, population std dev σ = √σ². Sample variance s² = Σ(xᵢ − x̄)² / (n − 1), sample std dev s = √s². The sample formulas use n − 1 (Bessel's correction) to give an unbiased estimate when your data is a sample of a larger population. Coefficient of variation CV = (σ / μ) × 100%.",
      howToUse: [
        "Paste or type your data set, separated by spaces, commas, semicolons, or newlines.",
        "The calculator parses every numeric token, ignores non-numeric junk, and shows the count it used.",
        "Read the summary: n, sum, mean, median, min, max, range, population and sample variance, and population and sample standard deviation.",
        "Choose population (σ) when your data is the entire population, or sample (s) when it's a sample of a larger population.",
        "Datasets up to 10,000 values are supported; anything beyond is ignored with a visible notice.",
      ],
      example:
        "For the data set 2, 4, 4, 4, 5, 5, 7, 9: n = 8, sum = 40, mean μ = 5. Sum of squared deviations = (9+1+1+1+0+0+4+16) = 32. Population variance σ² = 32/8 = 4, so σ = 2. Sample variance s² = 32/7 ≈ 4.571, so s ≈ 2.138. The classic textbook example returns the textbook answer.",
      faqs: [
        {
          q: "What is the difference between sample and population standard deviation?",
          a: "Population standard deviation σ uses divisor n and is correct when your data IS the entire population. Sample standard deviation s uses divisor n − 1 (Bessel's correction) and is the unbiased estimator when your data is a SAMPLE of a larger population. Use s for surveys, experiments, and any data drawn from a bigger group; use σ only when you have every member of the population.",
        },
        {
          q: "When is standard deviation undefined?",
          a: "Sample standard deviation requires at least 2 data points because the formula divides by n − 1; with n = 1 the divisor is 0. The calculator shows '—' for sample variance and sample std dev when there's only one value (population std dev is correctly 0, since a single value has no spread).",
        },
        {
          q: "How do I enter my data?",
          a: "Separate numbers with any of: spaces, commas, semicolons, pipes, tabs, or newlines. Non-numeric tokens are ignored and a count badge shows how many valid numbers were used, so you can safely paste a column from a spreadsheet even if it has headers or blanks.",
        },
        {
          q: "What is the coefficient of variation (CV)?",
          a: "CV = (σ / μ) × 100% — the standard deviation expressed as a percentage of the mean. It's a unitless measure of relative spread that lets you compare variability across datasets with different units or scales. The calculator shows '—' when the mean is 0 or the sample is too small.",
        },
        {
          q: "How is the median computed?",
          a: "The data is sorted ascending. If n is odd, the median is the middle value; if n is even, it's the average of the two middle values. For 2, 4, 4, 4, 5, 5, 7, 9 (n = 8), the two middle values are 4 and 5, so the median is 4.5.",
        },
      ],
      relatedSearches: [
        "sample standard deviation calculator",
        "population standard deviation calculator",
        "variance calculator",
        "mean median mode calculator",
        "standard deviation formula",
        "bessel's correction calculator",
        "descriptive statistics calculator",
        "coefficient of variation calculator",
      ],
    },
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
    seo: {
      definition:
        "An age calculator is a free online tool that calculates your exact age in years, months, and days from your date of birth. It also shows total days, weeks, and hours lived, plus a countdown to your next birthday.",
      formula:
        "Age is calculated as the difference between two dates: age = age-at date − birth date. Years are counted as full 365-day cycles (plus leap days), months as full calendar-month cycles, and days as the remainder. Total days lived = (age-at date − birth date) in milliseconds ÷ 86,400,000.",
      howToUse: [
        "Enter your date of birth in the 'Birth Date' field.",
        "Optionally change the 'Age At Date' to calculate age as of a past or future date (defaults to today).",
        "Click Calculate to see your age in years, months and days.",
        "Review the totals below: total days, weeks, hours lived, and days until your next birthday.",
      ],
      example:
        "If you were born on 1995-06-15 and today is 2024-11-20, your age is 29 years, 5 months and 5 days. You have lived 10,755 total days (approximately 1,536 weeks or 258,120 hours), and your next birthday is in 207 days.",
      faqs: [
        {
          q: "How do I calculate my exact age?",
          a: "Subtract your date of birth from today's date. Years come from full year cycles, months from full calendar-month cycles between the two dates, and days are the leftover remainder. Our calculator does this automatically.",
        },
        {
          q: "How many days old am I?",
          a: "Take the difference in milliseconds between today and your birth date and divide by 86,400,000 (the number of milliseconds in a day). The 'total days lived' field in this calculator shows that number directly.",
        },
        {
          q: "Does the age calculator account for leap years?",
          a: "Yes. We use calendar-aware date arithmetic, so every February 29 is handled correctly. The total-days figure includes all leap days that occurred between your birth date and the age-at date.",
        },
        {
          q: "Can I calculate age at a future date?",
          a: "Yes. Change the 'Age At Date' to any future date and the calculator will tell you how old you will be on that day, plus how many days remain until then.",
        },
        {
          q: "How is age in months calculated?",
          a: "Months are counted as full calendar-month cycles between the two dates. For example, from January 15 to April 14 is 2 months and 30 days, not 3 months, because the 15th of April has not yet been reached.",
        },
      ],
      relatedSearches: [
        "date of birth calculator",
        "age in days calculator",
        "birthday calculator",
        "age difference calculator",
        "how old am I",
        "chronological age calculator",
        "days until my birthday",
        "age in months calculator",
      ],
    },
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
    seo: {
      definition:
        "A date calculator is a free online tool that adds or subtracts days, weeks, months and years from any starting date, and also calculates the exact duration between two dates in days, weeks, months and years.",
      formula:
        "For date arithmetic, full calendar cycles are added or subtracted from the start date. Date difference = end date − start date, expressed in days; weeks = days ÷ 7, and years/months are derived from calendar-aware month-by-month counting so leap years and variable month lengths are handled correctly.",
      howToUse: [
        "Pick a mode: 'Add/Subtract' to shift a date, or 'Duration' to measure between two dates.",
        "Enter your start date (and end date, if in Duration mode).",
        "Choose the units to add or subtract (days, weeks, months or years) and enter the amount.",
        "Click Calculate to see the resulting date plus a breakdown of total days, weeks, months and years.",
        "Use the result to plan deadlines, leases, project milestones or countdowns.",
      ],
      example:
        "Adding 90 days to 2024-01-01 gives 2024-03-31 (a leap year, so February has 29 days). The duration between 2023-03-14 and 2024-11-20 is 1 year, 8 months and 6 days, equal to 617 days or approximately 88 weeks.",
      faqs: [
        {
          q: "How do I add days to a date?",
          a: "Enter the start date, choose 'Add', enter the number of days and click Calculate. Our calculator walks the calendar day-by-day so month lengths and leap years are handled correctly.",
        },
        {
          q: "How many days are between two dates?",
          a: "Switch to Duration mode, enter both dates and click Calculate. The result shows the exact difference in days, plus the equivalent in weeks, months and years.",
        },
        {
          q: "Does the date calculator handle leap years?",
          a: "Yes. We use real calendar arithmetic, so February 29 in leap years is counted correctly. For example, adding 1 year to 2024-02-29 returns 2025-02-28 because 2025 is not a leap year.",
        },
        {
          q: "Can I subtract months from a date?",
          a: "Yes. Pick 'Subtract', choose months, enter the amount and Calculate. The result rolls back the calendar month-by-month and adjusts the day if needed (e.g. March 31 − 1 month = February 28 or 29).",
        },
        {
          q: "What is a business day calculator?",
          a: "A business-day calculator counts only Monday–Friday and optionally skips public holidays. This tool counts calendar days; for business-day math, exclude weekends manually from the total.",
        },
      ],
      relatedSearches: [
        "date difference calculator",
        "days between dates",
        "add days to date calculator",
        "date duration calculator",
        "weeks between two dates",
        "subtract days from date",
        "calendar calculator",
        "leap year calculator",
      ],
    },
  },
  {
    id: "time",
    name: "Time Calculator",
    category: "other",
    short: "Time",
    description: "Add and subtract hours, minutes and seconds.",
    icon: Clock,
    keywords: ["time", "hours", "minutes"],
    seo: {
      definition:
        "A time calculator is a free online tool that adds and subtracts hours, minutes and seconds — perfect for totaling timesheets, run splits, video durations or any time-based arithmetic.",
      formula:
        "Times are normalized to a single unit (seconds), summed or subtracted, then converted back to h:mm:ss form. 1 hour = 60 minutes = 3,600 seconds; the calculator carries minutes into hours and seconds into minutes automatically when a value exceeds 60.",
      howToUse: [
        "Pick the operation: Add or Subtract.",
        "Enter the first time as h:mm:ss (e.g. 02:30:15).",
        "Enter the second time the same way.",
        "Click Calculate to see the total in h:mm:ss form plus a decimal-hours equivalent.",
        "Chain multiple times by reusing the result as the new first input.",
      ],
      example:
        "Adding 02:45:30 + 01:20:45 = 04:06:15 (4 hours, 6 minutes, 15 seconds), which equals 4.1042 decimal hours. Subtracting 01:30:00 from 03:15:00 gives 01:45:00.",
      faqs: [
        {
          q: "How do I add hours and minutes?",
          a: "Convert both values to minutes, add them, then convert back: divide total minutes by 60 for hours and use the remainder for minutes. This calculator does that automatically with h:mm:ss inputs.",
        },
        {
          q: "What is decimal time?",
          a: "Decimal time expresses the minutes portion of a duration as a fraction of an hour. 30 minutes = 0.5 hours, 15 minutes = 0.25 hours, so 2:30 becomes 2.5 decimal hours — useful for payroll and billing.",
        },
        {
          q: "How many seconds are in an hour?",
          a: "One hour = 60 minutes × 60 seconds = 3,600 seconds. To convert hours to seconds, multiply by 3,600; to convert seconds to hours, divide by 3,600.",
        },
        {
          q: "Can I subtract a larger time from a smaller one?",
          a: "Yes. The calculator will return the absolute difference in h:mm:ss form. If you need signed results (negative time), subtract smaller-from-larger manually first.",
        },
        {
          q: "How do I total a timesheet with multiple entries?",
          a: "Add the first two times, then use the result as the first input and add the next time. Repeat for each entry. For paid hours, convert the final h:mm:ss to decimal hours and multiply by your hourly rate.",
        },
      ],
      relatedSearches: [
        "time duration calculator",
        "add hours and minutes",
        "decimal hours calculator",
        "time addition calculator",
        "timesheet calculator",
        "h:mm:ss calculator",
        "minutes to hours converter",
        "elapsed time calculator",
      ],
    },
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
    seo: {
      definition:
        "An hours calculator is a free work-hours calculator that totals the hours and minutes between a start time and end time, automatically deducting unpaid breaks so you can fill in a timesheet or payroll in seconds.",
      formula:
        "Worked hours = (end time − start time) − break time. If end time is earlier than start time (overnight shift), 24 hours are added before subtracting. Decimal hours = total minutes ÷ 60; pay = decimal hours × hourly rate.",
      howToUse: [
        "Enter your Start Time (clock-in) and End Time (clock-out) using the 12-hour or 24-hour picker.",
        "Enter unpaid Break Time (lunch or rest) to be deducted from the total.",
        "If you worked an overnight shift, the calculator wraps past midnight automatically.",
        "Click Calculate to see total hours in h:mm format plus decimal hours.",
        "Optionally multiply decimal hours by your hourly rate to get gross pay.",
      ],
      example:
        "Clock in at 08:30, clock out at 17:15, with a 45-minute lunch break. Elapsed = 8 hours 45 minutes; subtracting the break gives 8 hours 0 minutes worked, equal to 8.0 decimal hours. At $22/hr that is $176.00 gross for the day.",
      faqs: [
        {
          q: "How do I calculate work hours with breaks?",
          a: "Subtract your start time from your end time to get elapsed time, then subtract any unpaid break. This calculator does both in one step — just enter the break minutes and the result is your paid hours.",
        },
        {
          q: "How are overnight shifts calculated?",
          a: "If your end time is earlier than your start time (e.g. 22:00 → 06:00), the calculator adds 24 hours to the end time before subtracting, so the elapsed time comes out correctly as 8 hours.",
        },
        {
          q: "What are decimal hours?",
          a: "Decimal hours convert the minutes portion of a duration into a fraction of an hour. 8 hours 15 minutes = 8.25 decimal hours. Payroll systems use decimal hours because they multiply cleanly by an hourly rate.",
        },
        {
          q: "How do I convert hours and minutes to decimal?",
          a: "Divide the minutes by 60 and add to the hours. For 7 hours 45 minutes: 45 ÷ 60 = 0.75, so 7.75 decimal hours. The calculator shows both formats side by side.",
        },
        {
          q: "Does this calculator track overtime?",
          a: "It calculates total daily hours; overtime depends on your local labor law (typically hours over 40 in a U.S. workweek or over 8 in a California day). Multiply any hours above that threshold by 1.5 (or 2.0) times your regular rate.",
        },
      ],
      relatedSearches: [
        "work hours calculator with breaks",
        "timesheet calculator",
        "time card calculator",
        "hours worked calculator",
        "decimal hours calculator",
        "clock in clock out calculator",
        "overtime calculator",
        "payroll hours calculator",
      ],
    },
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
    seo: {
      definition:
        "A GPA calculator computes your grade point average on a 4.0 scale by weighting each course's grade points by its credit hours and dividing by the total credits attempted, giving you an accurate semester or cumulative GPA.",
      formula:
        "GPA = Σ(grade_point × credit_hours) ÷ Σ(credit_hours). On a 4.0 scale, A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0. Pluses add 0.3 and minuses subtract 0.3 (e.g. A− = 3.7, B+ = 3.3), except A+ which usually stays 4.0.",
      howToUse: [
        "For each course, enter the letter grade you received (A, A−, B+, etc.).",
        "Enter the credit hours for that course (typically 3 or 4).",
        "Add additional rows for every course in the term.",
        "Click Calculate to see your term GPA, total credits and total grade points.",
        "To find cumulative GPA, combine every course across all terms in one list.",
      ],
      example:
        "Three courses: A (4 credits) = 4.0 × 4 = 16.0 points; B+ (3 credits) = 3.3 × 3 = 9.9 points; C (3 credits) = 2.0 × 3 = 6.0 points. Total points = 31.9; total credits = 10; GPA = 31.9 ÷ 10 = 3.19.",
      faqs: [
        {
          q: "How is GPA calculated on a 4.0 scale?",
          a: "Multiply each course's grade point (A=4.0, B=3.0, C=2.0, D=1.0, F=0) by its credit hours, sum these across all courses, then divide by the total credit hours attempted. The result is your GPA on a 4.0 scale.",
        },
        {
          q: "How do I calculate my cumulative GPA?",
          a: "List every course from every term, multiply each grade point by its credits, sum them all, and divide by total credits attempted. Entering all courses at once gives the same cumulative GPA as your transcript.",
        },
        {
          q: "What is a good GPA?",
          a: "A 3.5 GPA (B+ average) is generally considered strong and qualifies for many scholarships and graduate programs. A 3.7+ is competitive for top-tier graduate schools; 3.0 is a common minimum for honor rolls and some programs.",
        },
        {
          q: "How do AP, IB or honors credits affect GPA?",
          a: "Many high schools add 1.0 to the grade point for honors/AP/IB courses (so an A becomes 5.0). College policies vary — some cap the boost. Check your school's weighting policy and adjust grade points accordingly.",
        },
        {
          q: "Does an F affect my GPA?",
          a: "Yes. An F earns 0 grade points but the credits still count in the denominator, so it pulls your GPA down sharply. A 3-credit F combined with a 3-credit A gives (4.0×3 + 0×3) ÷ 6 = 2.0 GPA for those two courses.",
        },
      ],
      relatedSearches: [
        "GPA calculator 4.0 scale",
        "college GPA calculator",
        "cumulative GPA calculator",
        "grade point average calculator",
        "weighted GPA calculator",
        "semester GPA calculator",
        "GPA calculator with credits",
        "how to calculate GPA",
      ],
    },
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
    seo: {
      definition:
        "A final grade calculator works backwards from your target class average to tell you the score you need on remaining assignments or the final exam — based on weighted categories like homework, quizzes, midterms and finals.",
      formula:
        "If current grade = Σ(category_score × category_weight) so far, then needed_score = (target − Σ(earned_weight)) ÷ remaining_weight. The calculator solves for the score required on the final exam or remaining category to reach your target.",
      howToUse: [
        "Enter your current overall grade (%) and how much it is worth (e.g. 80% of the class is complete so far).",
        "Enter your target final grade (%) — the overall average you want to finish with.",
        "Enter the weight (%) of the remaining assignment or final exam.",
        "Click Calculate to see the minimum score you need on the final to hit your target.",
        "Compare the needed score to the max possible to see if your goal is realistic.",
      ],
      example:
        "Your current grade is 85% and 75% of the class is complete. The final exam is worth 25%. To finish with a 90%: needed = (90 − 85 × 0.75) ÷ 0.25 = (90 − 63.75) ÷ 0.25 = 105%. Since 105% is impossible, you cannot reach 90% — a realistic max is 85 × 0.75 + 100 × 0.25 = 88.75%.",
      faqs: [
        {
          q: "How do I calculate my final grade?",
          a: "Multiply each category score by its weight, sum those products, and divide by the total weight. For example, if homework is 90% worth 40% and exams are 80% worth 60%, final grade = 90×0.4 + 80×0.6 = 84%.",
        },
        {
          q: "What score do I need on my final exam?",
          a: "Use this formula: needed = (target_grade − current_grade × current_weight) ÷ final_weight. Our calculator does the algebra for you — enter your current grade, the weights, and your target, and it returns the score needed.",
        },
        {
          q: "How are weighted grades calculated?",
          a: "Each category (homework, quizzes, tests) has a weight that sums to 100%. Multiply each category average by its weight and add them up. A 90% homework average at 40% weight contributes 36 points to your final grade.",
        },
        {
          q: "Is a 90% an A?",
          a: "On the standard U.S. scale, 90–92% is an A−, 93–96% is an A, and 97–100% is an A+. Some schools use 93 as the A threshold. Check your syllabus for the exact cutoffs your instructor uses.",
        },
        {
          q: "Can I still get an A if my current grade is a B?",
          a: "It depends on how much of the class is left. Use the calculator: if the score needed on the final is over 100%, an A is mathematically out of reach; if it's between 0 and 100%, the A is still achievable with strong performance.",
        },
      ],
      relatedSearches: [
        "final grade calculator",
        "what do I need on my final",
        "weighted grade calculator",
        "grade calculator with weights",
        "class grade calculator",
        "final exam score calculator",
        "target grade calculator",
        "semester grade calculator",
      ],
    },
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
    seo: {
      definition:
        "A concrete calculator estimates the volume of concrete needed for slabs, footings, columns, steps and curbs in cubic yards, cubic feet and cubic meters — and tells you how many 60 lb or 80 lb bags to buy.",
      formula:
        "Volume = length × width × depth (in feet) = cubic feet. Cubic yards = cubic feet ÷ 27 (because 1 yard³ = 27 ft³). Bags needed = cubic feet ÷ yield per bag (a 60 lb bag yields ~0.45 ft³; an 80 lb bag yields ~0.60 ft³). Always add 5–10% for spillage and uneven subgrade.",
      howToUse: [
        "Choose your shape: slab, footing, column (round), or column (square).",
        "Enter the dimensions in feet and inches (or meters if using metric).",
        "Enter the depth or thickness of the pour.",
        "Click Calculate to see volume in cubic yards, cubic feet and cubic meters.",
        "Use the bag count to order 60 lb or 80 lb pre-mixed bags from the home center.",
      ],
      example:
        "A 10 ft × 10 ft patio slab, 4 inches (0.333 ft) thick: volume = 10 × 10 × 0.333 = 33.3 ft³ = 1.23 yd³. With a 10% safety margin, order 1.4 yd³ (about 56 eighty-pound bags, since each yields 0.60 ft³).",
      faqs: [
        {
          q: "How many bags of concrete do I need?",
          a: "Divide the cubic feet of your pour by the yield per bag. An 80 lb bag yields about 0.60 ft³, a 60 lb bag yields about 0.45 ft³. For a 33.3 ft³ slab you need 56 eighty-pound bags (33.3 ÷ 0.60), plus 10% extra for waste.",
        },
        {
          q: "How do I calculate cubic yards of concrete?",
          a: "Multiply length × width × depth (all in feet) to get cubic feet, then divide by 27 to get cubic yards. Add 5–10% for spillage. Order in quarter-yard increments from a ready-mix supplier.",
        },
        {
          q: "How thick should a concrete slab be?",
          a: "Patios and walkways: 4 inches. Driveways (residential): 4–6 inches. Footings: at least 8 inches and below the frost line. Heavy loads or commercial slabs: 6+ inches with rebar reinforcement.",
        },
        {
          q: "How much does a yard of concrete weigh?",
          a: "One cubic yard of cured concrete weighs about 4,050 lb (≈1,835 kg). Wet concrete is similar. A typical 10-cubic-yard ready-mix truck carries about 40,500 lb, so make sure your driveway or subgrade can support the load.",
        },
        {
          q: "Should I order by the bag or by the truck?",
          a: "Bagged concrete (60 or 80 lb) makes sense for pours under about 1 cubic yard. For anything larger — slabs, driveways, footings — ready-mix delivery is faster, cheaper per yard, and avoids the labor of mixing dozens of bags by hand.",
        },
      ],
      relatedSearches: [
        "concrete yardage calculator",
        "concrete bag calculator",
        "how many bags of concrete do I need",
        "concrete slab calculator",
        "cubic yards of concrete calculator",
        "concrete footing calculator",
        "ready mix concrete calculator",
        "concrete column calculator",
      ],
    },
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
    seo: {
      definition:
        "A subnet calculator takes an IP address with CIDR notation (e.g. 192.168.1.1/24) and instantly returns the network address, broadcast address, subnet mask, wildcard mask and the range of usable host IPs.",
      formula:
        "Subnet mask = 32-bit mask with the first `prefix` bits set to 1 (e.g. /24 → 255.255.255.0). Network address = IP AND mask. Broadcast address = network OR NOT(mask). Total hosts = 2^(32 − prefix); usable hosts = total − 2 (network and broadcast are reserved).",
      howToUse: [
        "Enter the IPv4 address (e.g. 192.168.1.1).",
        "Enter the CIDR prefix length (0–32) after the slash, or pick from common presets (/24, /16, /8).",
        "Click Calculate to see the network address, broadcast, mask and host range.",
        "Use the wildcard mask for ACLs on Cisco-style equipment and the host count for capacity planning.",
        "For multiple subnets, repeat with each CIDR block.",
      ],
      example:
        "For IP 192.168.1.1/24: the network address is 192.168.1.0, the broadcast address is 192.168.1.255, the subnet mask is 255.255.255.0, the wildcard mask is 0.0.0.255, and there are 254 usable host addresses (192.168.1.1 through 192.168.1.254).",
      faqs: [
        {
          q: "What is a /24 subnet?",
          a: "A /24 (CIDR prefix 24) uses 24 bits for the network portion and 8 bits for hosts, giving a subnet mask of 255.255.255.0 and 2^8 − 2 = 254 usable host addresses. It is the most common home and small-office subnet.",
        },
        {
          q: "How do I find the network and broadcast address?",
          a: "Bitwise AND the IP with the subnet mask to get the network address; bitwise OR the network address with the wildcard (inverse) mask to get the broadcast. For 192.168.1.1/24: network = 192.168.1.0, broadcast = 192.168.1.255.",
        },
        {
          q: "How many usable hosts are in a subnet?",
          a: "Calculate 2^(32 − prefix) and subtract 2 (for the reserved network and broadcast addresses). A /24 has 254 usable hosts; a /26 has 62; a /30 has 2 (commonly used for point-to-point links).",
        },
        {
          q: "What is CIDR notation?",
          a: "CIDR (Classless Inter-Domain Routing) notation writes an IP followed by a slash and the prefix length, e.g. 10.0.0.0/8. The prefix length is the number of leading 1 bits in the subnet mask, which replaces the older class A/B/C system.",
        },
        {
          q: "What is a wildcard mask?",
          a: "A wildcard mask is the inverse of a subnet mask (every bit flipped) and is used in Cisco ACLs and OSPF configuration. For 255.255.255.0, the wildcard mask is 0.0.0.255, meaning the last octet is ignored when matching addresses.",
        },
      ],
      relatedSearches: [
        "subnet calculator CIDR",
        "IP subnet calculator",
        "IPv4 subnet calculator",
        "network and broadcast address calculator",
        "CIDR to subnet mask converter",
        "subnet mask calculator",
        "wildcard mask calculator",
        "how many hosts in a subnet",
      ],
    },
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
    seo: {
      definition:
        "A strong password generator creates random, high-entropy passwords using a configurable mix of uppercase letters, lowercase letters, digits and symbols — protecting your accounts from brute-force and dictionary attacks.",
      formula:
        "Password entropy in bits = length × log2(charset_size). Lowercase-only (26 chars) at 12 characters = 12 × log2(26) ≈ 56 bits. Mixed case + digits + symbols (94 chars) at 16 characters = 16 × log2(94) ≈ 105 bits — strong enough to defeat any offline cracking attempt.",
      howToUse: [
        "Set the desired password length (16+ characters recommended).",
        "Tick the character classes to include: uppercase, lowercase, digits, symbols.",
        "Optionally exclude ambiguous characters (l, I, 1, O, 0) for readability.",
        "Click Generate to create a new random password.",
        "Copy the result and paste it into a password manager — never reuse it across sites.",
      ],
      example:
        "With all 4 character classes enabled at 16 characters, the generator produces passwords like 'K7#mQ2$vL9&pX5@n'. This password has an alphabet size of 94, giving entropy = 16 × log2(94) ≈ 105 bits — equivalent to a 1-in-10^31 chance of being guessed.",
      faqs: [
        {
          q: "What makes a strong password?",
          a: "Length, randomness and uniqueness. Use at least 12–16 characters drawn from a mix of uppercase, lowercase, digits and symbols, generated by a cryptographic random source. Never reuse passwords across accounts.",
        },
        {
          q: "How long should my password be?",
          a: "Aim for 16+ characters with all character classes enabled, which gives ~100 bits of entropy — well beyond the reach of any modern GPU cracking rig. Length matters more than complexity: a 20-char lowercase password is stronger than an 8-char complex one.",
        },
        {
          q: "How is password entropy calculated?",
          a: "Entropy (bits) = length × log2(charset_size). A 12-character password using all 94 printable ASCII characters has 12 × 6.55 ≈ 79 bits of entropy. Each additional bit doubles the cracking difficulty.",
        },
        {
          q: "Are random passwords safer than passphrases?",
          a: "Both can be very secure. Random passwords are shorter for the same entropy; passphrases (4–6 random words) are easier to type and remember. For a password manager, use random passwords — you copy-paste them anyway.",
        },
        {
          q: "Should I use a different password for every site?",
          a: "Yes, always. If one site is breached, attackers try the leaked password against your other accounts (credential stuffing). A password manager plus this generator makes unique-per-site passwords effortless.",
        },
      ],
      relatedSearches: [
        "strong password generator",
        "random password generator",
        "secure password generator",
        "password strength checker",
        "memorable password generator",
        "passphrase generator",
        "password entropy calculator",
        "16 character password generator",
      ],
    },
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
    seo: {
      definition:
        "A unit conversion calculator instantly converts between units of length, weight, temperature, volume, area, speed and more — including metric ↔ imperial conversions for everyday tasks and engineering work.",
      formula:
        "Most conversions use a multiplicative factor: result = input × conversion_factor (e.g. 1 inch = 2.54 cm exactly). Temperature uses an offset: °F = °C × 9/5 + 32, °C = (°F − 32) × 5/9, K = °C + 273.15.",
      howToUse: [
        "Pick the measurement type: length, weight, temperature, volume, area or speed.",
        "Choose the unit you are converting from and enter the value.",
        "Choose the unit you are converting to.",
        "Click Convert to see the result with full precision.",
        "Swap the units with one click to convert back.",
      ],
      example:
        "Converting 10 inches to centimeters: 10 × 2.54 = 25.4 cm. Converting 100 °F to Celsius: (100 − 32) × 5/9 = 37.78 °C. Converting 1 mile to kilometers: 1 × 1.609344 = 1.609 km. Converting 1 gallon (US) to liters: 1 × 3.78541 = 3.785 L.",
      faqs: [
        {
          q: "How do I convert Celsius to Fahrenheit?",
          a: "Multiply the Celsius temperature by 9/5 (1.8) and add 32. For 20 °C: 20 × 1.8 + 32 = 68 °F. This calculator handles the offset automatically — just pick the units.",
        },
        {
          q: "How many centimeters are in an inch?",
          a: "Exactly 2.54 cm = 1 inch, by international definition. To convert inches to centimeters multiply by 2.54; to convert centimeters to inches divide by 2.54 (or multiply by 0.3937).",
        },
        {
          q: "How do I convert kilograms to pounds?",
          a: "Multiply kilograms by 2.20462 to get pounds (1 kg = 2.20462 lb). To go the other way, multiply pounds by 0.453592. For everyday use, 1 kg ≈ 2.2 lb is close enough.",
        },
        {
          q: "What is the difference between US and imperial gallons?",
          a: "1 US gallon = 3.78541 liters; 1 imperial (UK) gallon = 4.54609 liters. The imperial gallon is about 20% larger. This calculator uses US gallons by default — select imperial gallons if you are in the UK.",
        },
        {
          q: "How do I convert miles per hour to kilometers per hour?",
          a: "Multiply mph by 1.609344 to get km/h. So 60 mph = 96.56 km/h. To convert km/h to mph, divide by 1.609344 (or multiply by 0.621371): 100 km/h ≈ 62.14 mph.",
        },
      ],
      relatedSearches: [
        "unit conversion calculator",
        "length weight temperature converter",
        "metric to imperial converter",
        "cm to inches converter",
        "kg to lbs converter",
        "Celsius to Fahrenheit converter",
        "miles to km converter",
        "gallons to liters converter",
      ],
    },
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
