import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CALCULATORS,
  CALCULATOR_MAP,
  CATEGORY_META,
} from "@/lib/calculators/registry";
import { Layout } from "@/components/layout/Layout";
import { CalculatorSeoContent } from "@/components/calculator/CalculatorSeoContent";
import {
  FinancialCalculators,
  HealthCalculators,
  MathCalculators,
  OtherCalculators,
} from "@/components/calculator/registry";
import { ArrowLeft, ChevronRight } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meta = CALCULATOR_MAP[id];
  if (!meta) return { title: "Calculator not found" };

  const catMeta = CATEGORY_META[meta.category];
  const title = `${meta.name} — Free Online Calculator`;
  const description = meta.description;
  const url = `https://calnivocalc.com/calculators/${meta.id}`;

  return {
    title,
    description,
    alternates: { canonical: `/calculators/${meta.id}` },
    openGraph: {
      title,
      description,
      url,
      siteName: "Calnivo",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: [meta.short, meta.name, ...meta.keywords],
    other: {
      "article:section": catMeta.label,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meta = CALCULATOR_MAP[id];
  if (!meta) notFound();

  const catMeta = CATEGORY_META[meta.category];
  const Icon = meta.icon;

  // Resolve the interactive calculator component (a client component).
  const CalcComponent =
    meta.category === "financial"
      ? FinancialCalculators[id]
      : meta.category === "health"
        ? HealthCalculators[id]
        : meta.category === "math"
          ? MathCalculators[id]
          : OtherCalculators[id];

  // Server-rendered structured data.
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://calnivocalc.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: catMeta.label,
        item: `https://calnivocalc.com/calculators#category-${meta.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.name,
        item: `https://calnivocalc.com/calculators/${meta.id}`,
      },
    ],
  };

  const faqLd = meta.seo?.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: meta.seo.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  // Related calculators (same category, excluding current).
  const related = Object.values(CALCULATOR_MAP)
    .filter((c) => c.category === meta.category && c.id !== id)
    .slice(0, 7);

  return (
    <>
      {/* Server-rendered structured data (crawlable without JS) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <Layout>
        <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-1.5 text-sm text-brand-muted"
          >
            <Link href="/" className="hover:text-brand-ink">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <a
              href={`/calculators#category-${meta.category}`}
              className="capitalize hover:text-brand-ink"
            >
              {meta.category}
            </a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-brand-ink">{meta.name}</span>
          </nav>

          {/* Back button */}
          <Link
            href="/calculators"
            className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-brand bg-white px-3 py-1.5 text-sm font-medium text-brand-ink shadow-sm transition-colors hover:bg-accent/50"
          >
            <ArrowLeft className="h-4 w-4" />
            All calculators
          </Link>

          {/* Title (H1 — server-rendered, crawlable) */}
          <div className="mb-6 flex items-start gap-4">
            <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-accent-gradient text-white shadow-accent sm:grid">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
                {meta.name}
              </h1>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-brand-muted">
                {meta.description}
              </p>
            </div>
          </div>

          {/* Body: calculator + sidebar */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              {CalcComponent ? <CalcComponent /> : null}
            </div>

            <aside className="space-y-4">
              {/* Related */}
              <div className="rounded-xl border border-brand bg-white p-4 shadow-brand">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  More {meta.category} calculators
                </h3>
                <ul className="space-y-1">
                  {related.map((c) => {
                    const CIcon = c.icon;
                    return (
                      <li key={c.id}>
                        <Link
                          href={`/calculators/${c.id}`}
                          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm text-brand-ink transition-colors hover:bg-accent/60"
                        >
                          <CIcon className="h-4 w-4 shrink-0 text-brand-muted" />
                          <span className="font-medium">{c.short}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Trust disclaimer */}
              <div className="rounded-xl border border-brand bg-gradient-to-br from-accent to-white p-4 shadow-brand">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-accent-deep">
                  How this works
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                  All calculations run locally in your browser — nothing is sent to a server.
                  Results are estimates for planning purposes only and use standard formulas.
                </p>
                {meta.category === "financial" && (
                  <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                    Not financial advice. Actual loan terms, tax, and returns depend on your
                    lender, jurisdiction, and market conditions. Verify with a qualified
                    professional before making financial decisions.
                  </p>
                )}
                {meta.category === "health" && (
                  <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                    For general wellness information only — not a medical diagnosis. Consult a
                    healthcare professional for personal advice.
                  </p>
                )}
              </div>
            </aside>
          </div>

          {/* Server-rendered SEO content (definition, formula, how-to, example, FAQ, related) */}
          <CalculatorSeoContent meta={meta} />
        </div>
      </Layout>
    </>
  );
}
