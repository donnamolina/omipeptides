"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { categories } from "@/data/categories";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Product, ProductCategory } from "@/types";
import { createClient } from "@/lib/supabase/client";

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    category: row.category as ProductCategory,
    price: row.price as number,
    compareAtPrice: (row.compare_at_price as number) ?? undefined,
    description: row.description as string,
    shortDescription: row.short_description as string,
    scienceDescription: row.science_description as string,
    benefits: row.benefits as string[],
    dosage: row.dosage as Product["dosage"],
    images: {
      primary: row.image_primary as string,
      gallery: row.image_gallery as string[],
    },
    inStock: row.in_stock as boolean,
    stockLevel: (row.stock_level as Product["stockLevel"]) ?? undefined,
    tags: row.tags as string[],
    purity: row.purity as string,
    thirdPartyTested: row.third_party_tested as boolean,
    studiesCount: row.studies_count as number,
    rating: row.rating as number,
    reviewCount: row.review_count as number,
    relatedSlugs: row.related_slugs as string[],
  };
}

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("category")
        .order("name");

      if (!error && data) {
        setProducts(data.map(mapProduct));
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <h1 className="font-heading text-5xl font-bold tracking-tight text-midnight-ink md:text-6xl">
                OUR PEPTIDES
              </h1>
              <p className="mt-4 max-w-lg text-lg text-neutral-600">
                Every product is third-party tested with 99.7%+ purity.
                Research-grade compounds for scientific investigation.
              </p>
            </ScrollReveal>

            {/* Category filters */}
            <div className="mt-10 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-[var(--radius-full)] px-5 py-2 text-sm font-medium transition-all ${
                  activeCategory === "all"
                    ? "bg-coral-punch text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`rounded-[var(--radius-full)] px-5 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat.slug
                      ? "bg-coral-punch text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="pb-24 lg:pb-32 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-[420px] animate-pulse rounded-[var(--radius-lg)] bg-neutral-100" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((product, i) => (
                    <ScrollReveal key={product.id} delay={i * 0.05} className="h-full">
                      <ProductCard product={product} />
                    </ScrollReveal>
                  ))}
                </div>
                {filtered.length === 0 && (
                  <p className="text-center text-neutral-400 mt-12">
                    No products found in this category.
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductCatalogContent />
    </Suspense>
  );
}
