import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { ArticleTrustFooter } from "@/components/blog/ArticleTrustFooter";

export const metadata = {
  title: "How Concrete Bag Counts Really Work (With a Verified Example)",
  description:
    "A 10×10 ft slab at 4 inches deep needs 33.3 cubic feet of concrete — about 56 bags of 80 lb (0.6 cu ft each), or 62 bags with 10% waste. Learn the exact formula and how bag yield works.",
  alternates: { canonical: "/blog/how-concrete-bag-counts-work" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Concrete Bag Counts Really Work (With a Verified Example)",
  url: "https://calnivocalc.com/blog/how-concrete-bag-counts-work",
  datePublished: "2026-11-17",
  dateModified: "2026-11-17",
  author: {
    "@type": "Person",
    name: "Mohammed Khan",
    url: "https://calnivocalc.com/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Calnivo",
    logo: {
      "@type": "ImageObject",
      url: "https://calnivocalc.com/calnivo-logo.png",
    },
  },
};

export default function Article() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <Link href="/blog" className="text-sm text-brand-accent-deep hover:underline">
          ← Back to blog
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          How Concrete Bag Counts Really Work (With a Verified Example)
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          November 2026 · 6 min read · By Mohammed Khan
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-brand-muted">
          <p>
            Pouring a small concrete slab — a shed pad, a patio, a footing — usually means buying
            bagged concrete from a hardware store and mixing it yourself. The hard part is not the
            mixing; it is figuring out how many bags to buy. This article walks through the exact
            math using a real example, so you can buy the right number of bags the first time and
            avoid a mid-pour trip to the store.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">The example slab</h2>
          <p>
            We use a common DIY project: a{" "}
            <strong className="text-brand-ink">10 ft × 10 ft slab, 4 inches thick</strong>. This is
            a typical shed base or small patio pad. Here is the math step by step:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong className="text-brand-ink">Convert the thickness to feet:</strong> 4 inches ÷
              12 = 0.333 ft
            </li>
            <li>
              <strong className="text-brand-ink">Multiply the dimensions in feet:</strong> 10 × 10 ×
              0.333 = <strong className="text-brand-ink">33.3 cubic feet</strong>
            </li>
            <li>
              <strong className="text-brand-ink">Convert to cubic yards</strong> (concrete is
              often sold by the yard for large pours): 33.3 ÷ 27 ={" "}
              <strong className="text-brand-ink">1.23 cubic yards</strong>
            </li>
            <li>
              <strong className="text-brand-ink">Convert to cubic meters</strong> (for metric
              projects): 33.3 × 0.0283 = <strong className="text-brand-ink">0.94 cubic meters</strong>
            </li>
          </ol>

          <h2 className="text-xl font-semibold text-brand-ink">
            How many bags do you need?
          </h2>
          <p>
            Bagged concrete is sold by weight, but what matters is the{" "}
            <strong className="text-brand-ink">yield</strong> — how much volume each bag produces
            when mixed with water. The two common bag sizes:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong className="text-brand-ink">80 lb bag</strong> yields about{" "}
              <strong className="text-brand-ink">0.6 cubic feet</strong> of mixed concrete
            </li>
            <li>
              <strong className="text-brand-ink">60 lb bag</strong> yields about{" "}
              <strong className="text-brand-ink">0.45 cubic feet</strong> of mixed concrete
            </li>
          </ul>
          <p>For our 33.3 cubic foot slab:</p>
          <div className="overflow-hidden rounded-xl border border-brand">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  <th className="px-4 py-3">Bag size</th>
                  <th className="px-4 py-3 text-right">Yield per bag</th>
                  <th className="px-4 py-3 text-right">Bags needed (exact)</th>
                  <th className="px-4 py-3 text-right">Bags with 10% waste</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-brand-ink">
                <tr>
                  <td className="px-4 py-3">80 lb</td>
                  <td className="px-4 py-3 text-right tabular-nums">0.60 cu ft</td>
                  <td className="px-4 py-3 text-right tabular-nums">55.6 → 56</td>
                  <td className="px-4 py-3 text-right tabular-nums">62</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">60 lb</td>
                  <td className="px-4 py-3 text-right tabular-nums">0.45 cu ft</td>
                  <td className="px-4 py-3 text-right tabular-nums">74.1 → 75</td>
                  <td className="px-4 py-3 text-right tabular-nums">82</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-brand-muted">
            Bags with waste = ceiling(exact bags × 1.10). The 10% waste factor covers spillage,
            uneven subgrade, and overpour at the edges.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Why the waste factor matters</h2>
          <p>
            The exact calculation says 55.6 bags, so you might buy 56. But in practice you will
            spill some, the subgrade is never perfectly flat, and the slab edges often need a
            little extra to fill low spots. A{" "}
            <strong className="text-brand-ink">10% waste factor</strong> is the industry standard
            for bagged concrete — it pushes 56 bags to 62. Running out of concrete mid-pour is far
            more expensive than buying 6 extra bags: a cold joint (where fresh concrete meets
            partially-set concrete) creates a weak plane that can crack under load.
          </p>
          <p>
            For larger pours (over 2 cubic yards, roughly 90 bags), ordering ready-mix delivered
            by truck is usually cheaper than buying bags — and far less labor. The break-even is
            around 1.5 cubic yards for most markets.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            Other shapes: footings, columns, holes
          </h2>
          <p>
            The same volume math applies to other shapes, just with different formulas:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-brand-ink">Rectangular footing:</strong> length × width ×
              depth, all in feet. A 12 in × 12 in × 8 in footing = 1 × 1 × 0.667 = 0.667 cu ft.
            </li>
            <li>
              <strong className="text-brand-ink">Round column:</strong> π × (diameter ÷ 2)² ×
              height. A 10 in diameter, 4 ft tall column = π × (0.417)² × 4 = 2.18 cu ft.
            </li>
            <li>
              <strong className="text-brand-ink">Round post hole:</strong> π × (diameter ÷ 2)² ×
              depth. A 10 in diameter, 36 in deep hole = π × (0.417)² × 3 = 1.64 cu ft per hole.
            </li>
          </ul>
          <p>
            For holes, multiply by the number of holes to get the total volume, then divide by the
            bag yield and add the waste factor.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Water and mixing</h2>
          <p>
            The bag yield (0.6 cu ft for an 80 lb bag) assumes you mix with the{" "}
            <strong className="text-brand-ink">recommended amount of water</strong> — usually about
            3 quarts per 80 lb bag. Too much water makes the concrete weaker and more prone to
            cracking; too little makes it unworkable. Follow the water ratio on the bag exactly.
            Adding a full gallon instead of 3 quarts can drop the strength by 20% or more.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">
            How to model your own pour
          </h2>
          <p>
            Calnivo&apos;s{" "}
            <Link
              href="/calculators/concrete"
              className="font-medium text-brand-accent-deep hover:underline"
            >
              Concrete Calculator
            </Link>{" "}
            handles all the shape variants (slab, footing, column, round hole), converts between
            cubic feet, yards and meters, and computes the exact bag count plus the 10% waste
            rounded-up total. Enter your dimensions and it does the math instantly.
          </p>

          <h2 className="text-xl font-semibold text-brand-ink">Important disclaimer</h2>
          <p>
            This article is for educational purposes. Bag yields vary slightly by manufacturer and
            mix design. Structural concrete (load-bearing walls, foundations) should be specified
            by a licensed engineer and may require ready-mix with a specific compressive strength
            (e.g. 3000 or 4000 psi). Always follow local building codes and consult a qualified
            contractor for structural projects.
          </p>

          <div className="mt-8 rounded-xl border border-brand bg-gradient-to-br from-accent/30 to-white p-5">
            <p className="text-sm font-semibold text-brand-ink">
              Calculate your own bag count
            </p>
            <p className="mt-1 text-sm text-brand-muted">
              Enter your slab dimensions in Calnivo&apos;s concrete calculator to get the exact bag
              count, cubic yards, and waste-adjusted total.
            </p>
            <Link
              href="/calculators/concrete"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-[1.03]"
            >
              Open Concrete Calculator →
            </Link>
          </div>
        </div>

        <ArticleTrustFooter
          author="Mohammed Khan"
          reviewer="Hammad Khan"
          updatedDate="November 2026"
          sources={[
            {
              name: "NIST — Guide for the Use of the International System of Units (SI)",
              url: "https://www.nist.gov/pml/special-publication-811",
            },
            {
              name: "ACI — American Concrete Institute: guidelines for residential concrete",
              url: "https://www.concrete.org/topics/concretetopics/topicdetail/concrete%20basics",
            },
          ]}
        />
      </article>
    </Layout>
  );
}
