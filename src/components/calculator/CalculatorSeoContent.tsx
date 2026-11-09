import Link from "next/link";
import {
  type CalculatorMeta,
} from "@/lib/calculators/registry";
import {
  Calculator,
  Lightbulb,
  ListChecks,
  Sigma,
  BookOpen,
  ShieldAlert,
  ExternalLink,
  ClipboardCheck,
} from "lucide-react";

interface Props {
  meta: CalculatorMeta;
}

/**
 * SERVER-RENDERED SEO content for calculator pages.
 *
 * This component renders the keyword-rich content (definition, formula,
 * how-to, example, FAQ, related links) as static HTML so crawlers and AI
 * search systems can index it WITHOUT executing JavaScript.
 *
 * The interactive calculator UI remains a separate client component.
 *
 * AdSense Fix 1 — the new optional blocks (resultGuide, method, limits,
 * sources, lastReviewed) render FIRST and give each page unique value: what
 * each output means, the exact method and assumptions, when the result
 * misleads, primary sources, and a visible last-reviewed date. The legacy
 * generic blocks render below for calculators that have not yet been
 * rewritten with the new structure.
 */
export function CalculatorSeoContent({ meta }: Props) {
  const seo = meta.seo;
  if (!seo) return null;

  return (
    <section className="mt-10 space-y-8" aria-label="About this calculator">
      {/* ── Fix 1: new per-calculator content blocks ─────────────────────── */}

      {seo.resultGuide && seo.resultGuide.length > 0 && (
        <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-brand-ink">
            <Lightbulb className="h-6 w-6 text-brand-accent-deep" />
            What your result means
          </h2>
          <div className="mt-3 space-y-3">
            {seo.resultGuide.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-brand-muted">
                {p}
              </p>
            ))}
          </div>
        </article>
      )}

      {seo.method && (
        <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-ink">
            <Sigma className="h-5 w-5 text-brand-accent-deep" />
            Method &amp; assumptions
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">
            {seo.method.formula}
          </p>
          {seo.method.assumptions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                What we assume
              </h3>
              <ul className="mt-2 space-y-1.5">
                {seo.method.assumptions.map((a, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[15px] leading-relaxed text-brand-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent-deep"
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {seo.method.excludes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                What is not included
              </h3>
              <ul className="mt-2 space-y-1.5">
                {seo.method.excludes.map((e, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[15px] leading-relaxed text-brand-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-muted"
                    />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      )}

      {/* ── Legacy blocks (definition / formula / how-to / example / FAQ) ── */}

      {seo.definition && (
        <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-brand-ink">
            <Lightbulb className="h-6 w-6 text-brand-accent-deep" />
            What is the {meta.name}?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">
            {seo.definition}
          </p>
        </article>
      )}

      {seo.formula && !seo.method && (
        <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-ink">
            <Sigma className="h-5 w-5 text-brand-accent-deep" />
            {meta.name} formula
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">
            {seo.formula}
          </p>
        </article>
      )}

      {seo.howToUse?.length > 0 && (
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
      )}

      {seo.example && (
        <article className="rounded-2xl border border-brand bg-gradient-to-br from-accent/40 to-white p-6 shadow-brand sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-ink">
            <Calculator className="h-5 w-5 text-brand-accent-deep" />
            Example calculation
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">
            {seo.example}
          </p>
        </article>
      )}

      {seo.limits && seo.limits.length > 0 && (
        <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-ink">
            <ShieldAlert className="h-5 w-5 text-brand-accent-deep" />
            Limits &amp; common mistakes
          </h2>
          <ul className="mt-4 space-y-2.5">
            {seo.limits.map((l, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-[15px] leading-relaxed text-brand-muted"
              >
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-muted" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </article>
      )}

      {seo.faqs?.length > 0 && (
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

      {seo.sources && seo.sources.length > 0 && (
        <article className="rounded-2xl border border-brand bg-white p-6 shadow-brand sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-brand-ink">
            <BookOpen className="h-5 w-5 text-brand-accent-deep" />
            Sources
          </h2>
          <ul className="mt-4 space-y-2">
            {seo.sources.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-deep" />
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-[15px] leading-relaxed text-brand-accent-deep underline decoration-brand/40 underline-offset-2 hover:decoration-brand-accent-deep"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </article>
      )}

      {seo.lastReviewed && (
        <p className="flex items-center gap-2 px-1 text-xs text-brand-muted">
          <ClipboardCheck className="h-3.5 w-3.5 text-brand-accent-deep" />
          <span>
            Last reviewed: {formatReviewDate(seo.lastReviewed)}. Spotted an
            error?{" "}
            <Link
              href="/contact"
              className="font-medium text-brand-accent-deep underline decoration-brand/40 underline-offset-2 hover:decoration-brand-accent-deep"
            >
              Tell us
            </Link>{" "}
            and we will correct it.
          </span>
        </p>
      )}
    </section>
  );
}

/** Format an ISO date (YYYY-MM-DD) as e.g. "20 November 2026". */
function formatReviewDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
