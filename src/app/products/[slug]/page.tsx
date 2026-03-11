import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { getProductBySlug } from "@/lib/supabase/queries";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let product: Awaited<ReturnType<typeof getProductBySlug>> = null;
  try {
    product = await getProductBySlug(slug);
  } catch {
    // fallback metadata
  }
  if (!product) return { title: "Product Not Found | Omipeptides" };
  return {
    title: `${product.name} — ${product.category.charAt(0).toUpperCase() + product.category.slice(1).replace("-", " ")} Peptide | Omipeptides`,
    description:
      product.shortDescription +
      " Third-party tested, " +
      product.purity +
      " purity.",
    alternates: { canonical: `https://omipeptides.com/products/${slug}` },
    openGraph: {
      title: product.name + " | Omipeptides",
      description: product.shortDescription,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product: Awaited<ReturnType<typeof getProductBySlug>> = null;
  try {
    product = await getProductBySlug(slug);
  } catch (err) {
    console.error("Failed to fetch product:", err);
  }

  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: `https://omipeptides.com/images/og-default.png`,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "USD",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient slug={slug} />
    </>
  );
}
