# Calnivo — Free Online Calculators

A Calculator.net-style calculator platform rebuilt with a premium SaaS/fintech
design system. **40+ calculators** across finance, fitness, health, math and
everyday utilities — all running 100% client-side, no backend required.

**Live:** https://calnivocalc.com

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York)
- **State:** Zustand (SPA navigation), React hooks
- **Math engine:** Custom tokenizer → shunting-yard → RPN evaluator
- **Icons:** Lucide React

## Design system (Calnivo)

| Token | Value | Usage |
|---|---|---|
| Background | `#FAF9F6` | page canvas |
| Surface | `#FFFFFF` | cards |
| Ink | `#17232D` | headings & body text |
| Accent | `#F4511E → #FF6A00` (gradient) | primary CTA |
| Muted | `#66727C` | secondary text |
| Border | `#E5E7E9` | dividers |

## Calculators

- **Financial (15):** Mortgage, Loan, Auto Loan, Interest, Payment, Retirement,
  Amortization, Investment, Inflation, Finance (TVM), Income Tax, Compound
  Interest, Salary, Interest Rate, Sales Tax
- **Fitness & Health (9):** BMI, Calorie, Body Fat, BMR, Ideal Weight, Pace,
  Pregnancy, Pregnancy Conception, Due Date
- **Math (6):** Scientific, Fraction, Percentage, Random Number, Triangle,
  Standard Deviation
- **Other (10):** Age, Date, Time, Hours, GPA, Grade, Concrete, Subnet,
  Password Generator, Unit Conversion

## Local development

```bash
bun install
bun run dev      # http://localhost:3000
bun run lint     # eslint
bun run build    # production build
```

## Deployment (Netlify)

The app is a fully static SPA — no server runtime, no database. Netlify
auto-detects Next.js via `@netlify/plugin-nextjs` (pinned in `netlify.toml`).

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project → GitHub**.
3. Build command: `bun run build` · Publish directory: `.next` (auto-detected).
4. Deploy. Done — every `git push` triggers an auto-deploy.

## Adding Firebase (optional)

The site is intentionally free with no sign-up. The calculators need no
backend, no database, and no authentication — by design.

If you ever want to add user accounts or cloud-synced history later:

1. `bun add firebase`
2. Initialize in `src/lib/firebase.ts`
3. Add a sign-in component and wire it into `src/components/layout/Header.tsx`.

The 40 calculators will keep working without any changes.

## Project structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # root layout (SEO, JSON-LD, skip link)
│   ├── page.tsx              # SPA router (home ↔ calculator view)
│   ├── globals.css           # Calnivo design tokens
│   ├── sitemap.ts            # dynamic sitemap (home + 40 calculators)
│   └── robots.ts             # dynamic robots.txt
├── store/
│   └── calculator-nav.ts     # Zustand SPA navigation store
├── lib/
│   ├── calculators/
│   │   ├── registry.ts       # 40-calculator metadata + search
│   │   └── math-engine.ts    # expression evaluator
│   └── format.ts             # money/number/percent helpers
└── components/
    ├── layout/                # Header, Footer, Logo
    ├── home/                  # HomePage + ScientificCalculator widget
    └── calculator/            # CalculatorShell + 40 calculator components
        ├── financial/         # 15
        ├── health/            # 9
        ├── math/              # 6
        └── other/             # 10
```

## License

© 2008–2026 Calnivo. All rights reserved.
