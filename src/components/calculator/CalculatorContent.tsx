"use client";

import { CALCULATOR_MAP, CATEGORY_META } from "@/lib/calculators/registry";
import { useCalcNav } from "@/store/calculator-nav";
import { Calculator, ChevronRight, Lightbulb, ListChecks, Sigma } from "lucide-react";
import { useEffect } from "react";

interface Props {
  id: string;
}

/**
 * Renders keyword-rich SEO content below each calculator:
 *  - "What is X?" definition (H2)
 *  - Formula explanation
 *  - How to use (steps)
 *  - Worked example
 *  - FAQ (with FAQPage JSON-LD injected into <head>)
 *  - Related searches (internal links to other calculators)
 *
 * This content is the single biggest SEO lever for a calculator site — it
 * gives crawlers unique, indexable, keyword-rich text per calculator and
 * surfaces the tool for long-tail queries ("how to calculate X",
 * "X formula", "X with steps", etc.).
 */
export function CalculatorContent({ id }: Props) {
  const meta = CALCULATOR_MAP[id];
  const go = useCalcNav((s) => s.go);
  const seo = meta?.seo;

  // Inject FAQPage structured data for rich results.
  useEffect(() => {
    if (!seo?.faqs?.length) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-calnivo-faq", "true");
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seo.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [seo]);

  if (!meta || !seo) return null;

  const catMeta = CATEGORY_META[meta.category];

  // Resolve related calculators from the same category (other than this one).
  const sameCategoryRelated = Object.values(CALCULATOR_MAP)
    .filter((c) => c.category === meta.category && c.id !== id)
    .slice(0, 6);

  return (
    <section className="mt-10 space-y-8" aria-label="About this calculator">
      {/* What is X? */}
      <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-brand-ink">
          <Lightbulb className="h-6 w-6 text-brand-accent-deep" />
          What is the {meta.name}?
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">
          {seo.definition}
        </p>
      </article>

      {/* Formula */}
      <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-ink">
          <Sigma className="h-5 w-5 text-brand-accent-deep" />
          {meta.name} formula
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">
          {seo.formula}
        </p>
      </article>

      {/* How to use */}
      <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-ink">
          <ListChecks className="h-5 w-5 text-brand-accent-deep" />
          How to use the {meta.short} calculator
        </h2>
        <ol className="mt-4 space-y-3">
          {seo.howToUse.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-accent-gradient text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5 text-[15px] leading-relaxed text-brand-muted">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </article>

      {/* Example */}
      <article className="rounded-2xl border border-brand bg-gradient-to-br from-accent/40 to-white p-6 shadow-brand sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-ink">
          <Calculator className="h-5 w-5 text-brand-accent-deep" />
          Example calculation
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">
          {seo.example}
        </p>
      </article>

      {/* FAQ */}
      {seo.faqs.length > 0 && (
        <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-brand-ink">
            Frequently asked questions
          </h2>
          <dl className="mt-4 space-y-5">
            {seo.faqs.map((f, i) => (
              <div key={i} className="border-b border-brand pb-4 last:border-0 last:pb-0">
                <dt className="font-semibold text-brand-ink">{f.q}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-brand-muted">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </article>
      )}

      {/* Related searches / internal links */}
      <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
        <h2 className="text-xl font-bold tracking-tight text-brand-ink">
          More {catMeta.label.toLowerCase()}
        </h2>
        <p className="mt-2 text-sm text-brand-muted">
          Explore related {meta.category} calculators on Calnivo:
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {sameCategoryRelated.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.id}>
                <button
                  onClick={() => go(c.id)}
                  className="group flex w-full items-center gap-2.5 rounded-lg border border-brand bg-brand-canvas px-3 py-2.5 text-left text-sm transition-colors hover:border-brand-accent hover:bg-accent/40"
                >
                  <Icon className="h-4 w-4 shrink-0 text-brand-muted group-hover:text-brand-accent-deep" />
                  <span className="flex-1 font-medium text-brand-ink group-hover:text-brand-accent-deep">
                    {c.name}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-brand-muted/40 group-hover:text-brand-accent-deep" />
                </button>
              </li>
            );
          })}
        </ul>
      </article>

      {/* Related search terms (text — helps long-tail SEO) */}
      {seo.relatedSearches.length > 0 && (
        <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
          <h2 className="text-lg font-bold tracking-tight text-brand-ink">
            People also search for
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {seo.relatedSearches.map((term, i) => (
              <li
                key={i}
                className="rounded-full border border-brand bg-brand-canvas px-3 py-1 text-xs font-medium text-brand-muted"
              >
                {term}
              </li>
            ))}
          </ul>
        </article>
      )}
    </section>
  );
}
