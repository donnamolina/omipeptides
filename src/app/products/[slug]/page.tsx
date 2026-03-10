import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/supabase/queries";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
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
  const product = await getProductBySlug(slug);

  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: `https://omipeptides.com/images/products/${product.category}-category.png`,
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
