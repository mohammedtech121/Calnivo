import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export const metadata = {
  title: "Blog — Financial & Health Calculator Guides",
  description:
    "In-depth guides on mortgage payments, BMI, compound interest, retirement planning, and more. Written by Calnivo's founders and reviewed for accuracy.",
  alternates: { canonical: "/blog" },
};

const ARTICLES = [
  {
    slug: "how-to-calculate-mortgage-payment",
    title: "How to Calculate Your Mortgage Payment: A Complete Guide",
    excerpt:
      "Understand the mortgage payment formula, what factors affect your monthly payment, and how to use Calnivo's free mortgage calculator to plan your home purchase.",
    date: "October 2026",
    category: "Finance",
    readTime: "8 min",
    author: "Mohammed Khan",
    reviewer: "Hammad Khan",
    sources: ["CFPB", "Investopedia"],
  },
  {
    slug: "understanding-bmi",
    title: "Understanding BMI: What It Means and How to Use It",
    excerpt:
      "Learn what BMI is, how it's calculated, what the categories mean, and why it's a screening tool — not a diagnosis. Includes a free BMI calculator.",
    date: "October 2026",
    category: "Health",
    readTime: "7 min",
    author: "Mohammed Khan",
    reviewer: "Hammad Khan",
    sources: ["CDC", "WHO"],
  },
  {
    slug: "compound-interest-explained",
    title: "Compound Interest Explained: How Your Money Grows Over Time",
    excerpt:
      "Compound interest is the most powerful force in finance. Learn how it works, how to calculate it, and how small contributions can grow into significant wealth.",
    date: "October 2026",
    category: "Finance",
    readTime: "9 min",
    author: "Mohammed Khan",
    reviewer: "Hammad Khan",
    sources: ["Investopedia", "CFPB"],
  },
  {
    slug: "retirement-planning-guide",
    title: "Retirement Planning: How Much Do You Really Need?",
    excerpt:
      "A practical guide to retirement planning — how to estimate your retirement needs, understand withdrawal rates, and use Calnivo's retirement calculator.",
    date: "October 2026",
    category: "Finance",
    readTime: "10 min",
    author: "Mohammed Khan",
    reviewer: "Hammad Khan",
    sources: ["CFPB", "IRS Pub 590"],
  },
  {
    slug: "how-many-calories-should-you-eat",
    title: "How Many Calories Should You Eat? A Guide to TDEE",
    excerpt:
      "Learn how to calculate your Total Daily Energy Expenditure (TDEE), understand BMR, and use Calnivo's free calorie calculator to reach your fitness goals.",
    date: "October 2026",
    category: "Health",
    readTime: "8 min",
    author: "Mohammed Khan",
    reviewer: "Hammad Khan",
    sources: ["NIH", "Mifflin-St Jeor (1990)"],
  },
  {
    slug: "15-year-vs-30-year-mortgage",
    title: "15-Year vs 30-Year Mortgage: Which Costs Less?",
    excerpt:
      "Compare a 15-year vs 30-year mortgage on the same $320,000 loan at 6.5%. See the monthly payment, total interest, and total cost side-by-side, and learn which term fits your situation.",
    date: "November 2026",
    category: "Finance",
    readTime: "7 min",
    author: "Mohammed Khan",
    reviewer: "Hammad Khan",
    sources: ["CFPB", "Freddie Mac", "FDIC"],
  },
  {
    slug: "what-extra-200-a-month-does",
    title: "What an Extra $200 a Month Really Does to Your Mortgage",
    excerpt:
      "See exactly what happens when you add $200 a month to your mortgage payment. On a $320,000 loan at 6.5%, extra payments cut 6 years off the term and save over $100,000 in interest.",
    date: "November 2026",
    category: "Finance",
    readTime: "6 min",
    author: "Mohammed Khan",
    reviewer: "Hammad Khan",
    sources: ["CFPB", "FDIC"],
  },
  {
    slug: "nominal-vs-effective-interest-rate",
    title: "Nominal vs Effective Interest Rate: APR vs APY Explained",
    excerpt:
      "A 12% nominal APR is not the same as 12% APY. Learn the difference between nominal APR (what lenders quote) and APY (the true annual cost including compounding), with a worked example.",
    date: "November 2026",
    category: "Finance",
    readTime: "6 min",
    author: "Mohammed Khan",
    reviewer: "Hammad Khan",
    sources: ["CFPB", "Federal Reserve"],
  },
  {
    slug: "how-federal-tax-brackets-work",
    title: "How Federal Tax Brackets Work in 2026 (With a Worked Example)",
    excerpt:
      "The U.S. uses progressive tax brackets. Learn how marginal vs effective rates work on a $85,000 single filer in 2026, see the 2026 IRS brackets, and understand why a raise does not reduce your take-home.",
    date: "November 2026",
    category: "Finance",
    readTime: "8 min",
    author: "Mohammed Khan",
    reviewer: "Hammad Khan",
    sources: ["IRS Rev. Proc. 2025-32", "IRS"],
  },
  {
    slug: "does-compounding-frequency-matter",
    title: "Does Compounding Frequency Matter? Daily vs Monthly vs Annual",
    excerpt:
      "Does compounding frequency actually change your returns? See the real numbers: $10,000 at 5% for 20 years grows to $26,533 compounded annually vs $27,181 compounded daily — a $648 difference from the same rate.",
    date: "November 2026",
    category: "Finance",
    readTime: "6 min",
    author: "Mohammed Khan",
    reviewer: "Hammad Khan",
    sources: ["SEC", "FDIC", "Federal Reserve"],
  },
  {
    slug: "password-length-vs-complexity",
    title: "Password Length vs Complexity: Which Matters More?",
    excerpt:
      "A 16-character password from 94 symbols has 104.9 bits of entropy — strong enough to defeat any offline cracking attempt. Learn how length and complexity combine, and why length usually wins.",
    date: "November 2026",
    category: "Security",
    readTime: "7 min",
    author: "Mohammed Khan",
    reviewer: "Hammad Khan",
    sources: ["NIST SP 800-63B", "CISA"],
  },
];

export default function BlogPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Calnivo Blog
        </h1>
        <p className="mt-3 text-base text-brand-muted">
          In-depth guides on personal finance, health metrics, and math concepts —
          written by the founders of Calnivo and reviewed for accuracy.
        </p>

        <div className="mt-10 space-y-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block rounded-2xl border border-brand bg-white p-6 shadow-brand transition-all hover:-translate-y-0.5 hover:shadow-brand-lg"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-brand-muted">
                <span className="rounded-full bg-accent/60 px-2.5 py-0.5 font-medium text-brand-accent-deep">
                  {article.category}
                </span>
                <span>Updated: {article.date}</span>
                <span>·</span>
                <span>{article.readTime} read</span>
                <span>·</span>
                <span>By {article.author}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-brand-ink hover:text-brand-accent-deep">
                {article.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {article.excerpt}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-brand-muted">Sources:</span>
                {article.sources.map((src) => (
                  <span key={src} className="rounded bg-muted/50 px-2 py-0.5 text-xs font-medium text-brand-ink">
                    {src}
                  </span>
                ))}
              </div>
              <span className="mt-3 inline-block text-sm font-medium text-brand-accent-deep">
                Read article →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
