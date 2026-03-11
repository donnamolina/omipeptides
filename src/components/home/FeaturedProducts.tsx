"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products;

  return (
    <section className="bg-soft-sand py-24 lg:py-32 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="font-heading text-center text-4xl font-bold tracking-tight text-midnight-ink md:text-5xl">
            BESTSELLERS
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-neutral-600">
            Most popular research compounds by order volume.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1} className="h-full">
              <ProductCard product={product} hideBestSellerBadge />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
