import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "Blog — Financial & Health Calculator Guides",
  description:
    "Learn how to use Calnivo's free online calculators with in-depth guides on mortgage payments, BMI, compound interest, retirement planning, and more.",
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
  },
  {
    slug: "understanding-bmi",
    title: "Understanding BMI: What It Means and How to Use It",
    excerpt:
      "Learn what BMI is, how it's calculated, what the categories mean, and why it's a screening tool — not a diagnosis. Includes a free BMI calculator.",
    date: "October 2026",
    category: "Health",
    readTime: "7 min",
  },
  {
    slug: "compound-interest-explained",
    title: "Compound Interest Explained: How Your Money Grows Over Time",
    excerpt:
      "Compound interest is the most powerful force in finance. Learn how it works, how to calculate it, and how small contributions can grow into significant wealth.",
    date: "October 2026",
    category: "Finance",
    readTime: "9 min",
  },
  {
    slug: "retirement-planning-guide",
    title: "Retirement Planning: How Much Do You Really Need?",
    excerpt:
      "A practical guide to retirement planning — how to estimate your retirement needs, understand withdrawal rates, and use Calnivo's retirement calculator.",
    date: "October 2026",
    category: "Finance",
    readTime: "10 min",
  },
  {
    slug: "how-many-calories-should-you-eat",
    title: "How Many Calories Should You Eat? A Guide to TDEE",
    excerpt:
      "Learn how to calculate your Total Daily Energy Expenditure (TDEE), understand BMR, and use Calnivo's free calorie calculator to reach your fitness goals.",
    date: "October 2026",
    category: "Health",
    readTime: "8 min",
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
          with free calculators you can use right away.
        </p>

        <div className="mt-10 space-y-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block rounded-2xl border border-brand bg-white p-6 shadow-brand transition-all hover:-translate-y-0.5 hover:shadow-brand-lg"
            >
              <div className="flex items-center gap-3 text-xs text-brand-muted">
                <span className="rounded-full bg-accent/60 px-2.5 py-0.5 font-medium text-brand-accent-deep">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {article.date}
                </span>
                <span>·</span>
                <span>{article.readTime} read</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-brand-ink hover:text-brand-accent-deep">
                {article.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {article.excerpt}
              </p>
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
