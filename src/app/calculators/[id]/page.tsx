import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CALCULATORS,
  CALCULATOR_MAP,
  CATEGORY_META,
} from "@/lib/calculators/registry";
import { Layout } from "@/components/layout/Layout";

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

  // Breadcrumb structured data — helps Google show breadcrumbs in search
  // results and improves crawlability.
  const breadcrumb = {
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
        name: CATEGORY_META[meta.category].label,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Layout calculatorId={id} />
    </>
  );
}
