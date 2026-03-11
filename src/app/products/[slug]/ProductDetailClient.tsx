"use client";

import Link from "next/link";
import { ChevronRight, ChevronDown, ShoppingBag, Shield, FlaskConical, Check, AlertTriangle, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import ScrollReveal from "@/components/shared/ScrollReveal";
import StickyMobileATC from "@/components/products/StickyMobileATC";
import { useCartStore, formatPrice } from "@/store/cart";
import { createClient } from "@/lib/supabase/client";
import { Product, ProductCategory, ProductVariant } from "@/types";

const categoryLabels: Record<string, string> = {
  "recovery-healing": "Recovery & Healing",
  "longevity-brain": "Longevity & Brain",
  "growth-hormone-anti-aging": "Growth Hormone & Anti-Aging",
  "glp1-weight-loss": "GLP-1 & Weight Loss",
  "skin-beauty": "Skin & Beauty",
  "metabolic-other": "Metabolic & Other",
  "blends-stacks": "Blends & Stacks",
  "accessories-supplies": "Accessories & Supplies",
};

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

export default function ProductDetailClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const currency = useCartStore((s) => s.currency);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("how-it-works");
  const [imageHovered, setImageHovered] = useState(false);
  const { ref: atcRef, inView: atcInView } = useInView({ threshold: 0 });

  useEffect(() => {
    async function fetchProduct() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        const p = mapProduct(data);

        // Fetch product variants
        const { data: variantData } = await supabase
          .from("product_variants")
          .select("*")
          .eq("product_id", data.id)
          .order("display_order");

        if (variantData && variantData.length > 0) {
          const mapped: ProductVariant[] = variantData.map((v: Record<string, unknown>) => ({
            id: v.id as string,
            productId: v.product_id as string,
            sizeLabel: v.size_label as string,
            price: Number(v.price),
            compareAtPrice: v.compare_at_price ? Number(v.compare_at_price) : undefined,
            inStock: v.in_stock as boolean,
            displayOrder: v.display_order as number,
          }));
          p.variants = mapped;
          setVariants(mapped);
          setSelectedVariant(mapped[0]);
        }

        setProduct(p);

        // Fetch related products
        if (p.relatedSlugs && p.relatedSlugs.length > 0) {
          const { data: relData } = await supabase
            .from("products")
            .select("*")
            .in("slug", p.relatedSlugs);
          if (relData) setRelatedProducts(relData.map(mapProduct));
        }
      }
      setLoading(false);
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center pt-20">
          <p className="text-neutral-400">Loading product...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-midnight-ink">
              Product Not Found
            </h1>
            <Link
              href="/products"
              className="mt-4 inline-block text-coral-punch hover:underline"
            >
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const displayCompareAtPrice = selectedVariant ? selectedVariant.compareAtPrice : product.compareAtPrice;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant?.id, selectedVariant?.sizeLabel, selectedVariant?.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const scienceSections = [
    {
      id: "how-it-works",
      title: "How It Works",
      content: product.scienceDescription,
    },
    {
      id: "benefits",
      title: "Key Benefits",
      content: product.benefits.join("\n"),
    },
    {
      id: "dosage",
      title: "Dosage & Protocol",
      content: `${product.dosage.amount} · ${product.dosage.frequency}\n\nTiming: ${product.dosage.timing}\n\n${product.dosage.instructions}`,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1 text-xs text-neutral-400">
            <Link href="/" className="hover:text-midnight-ink transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-midnight-ink transition-colors">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-midnight-ink">{product.name}</span>
          </nav>
        </div>

        {/* Product Hero */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-8 lg:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Image with hover zoom */}
            <ScrollReveal direction="left">
              <div
                className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-white cursor-zoom-in"
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
              >
                <motion.div
                  animate={{ scale: imageHovered ? 1.08 : 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex h-full w-full flex-col items-center justify-center bg-neutral-100"
                >
                  <FlaskConical className="h-16 w-16 text-stone" />
                  <p className="mt-3 text-xs text-warm-gray">Product image coming soon</p>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal direction="right">
              <div>
                <span className="inline-flex rounded-[var(--radius-full)] bg-coral-punch/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-coral-punch">
                  {categoryLabels[product.category]}
                </span>

                <h1 className="mt-4 font-heading text-4xl font-bold text-midnight-ink md:text-5xl">
                  {product.name}
                </h1>

                <p className="mt-4 text-lg text-neutral-600">
                  {product.description}
                </p>

                {/* Trust badges */}
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                    <Shield className="h-4 w-4 text-ocean-teal" />
                    <span className="font-mono">{product.purity} Pure</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                    <FlaskConical className="h-4 w-4 text-ocean-teal" />
                    <span>{product.studiesCount} Studies</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                    <Check className="h-4 w-4 text-ocean-teal" />
                    <span>Third-Party Tested</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-8 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-midnight-ink">
                    {formatPrice(displayPrice, currency)}
                  </span>
                  {displayCompareAtPrice && (
                    <span className="text-lg text-neutral-400 line-through">
                      {formatPrice(displayCompareAtPrice, currency)}
                    </span>
                  )}
                </div>

                {/* Variant Selector */}
                {variants.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      Size
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          disabled={!variant.inStock}
                          className={`rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium transition-all ${
                            selectedVariant?.id === variant.id
                              ? "bg-midnight-ink text-white"
                              : "border border-neutral-200 text-neutral-600 hover:border-neutral-400"
                          } ${!variant.inStock ? "opacity-40 cursor-not-allowed" : ""}`}
                        >
                          {variant.sizeLabel} — {formatPrice(variant.price, currency)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity + ATC */}
                <div ref={atcRef} className="mt-6 flex items-center gap-4">
                  <div className="flex items-center rounded-[var(--radius-md)] border border-neutral-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="flex h-12 w-12 items-center justify-center text-lg text-neutral-600 hover:text-midnight-ink transition-colors"
                    >
                      -
                    </button>
                    <span className="flex h-12 w-12 items-center justify-center font-mono text-sm font-medium text-midnight-ink">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                      className="flex h-12 w-12 items-center justify-center text-lg text-neutral-600 hover:text-midnight-ink transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-coral-punch text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)]"
                  >
                    <AnimatePresence mode="wait">
                      {added ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="h-4 w-4" /> Added to Cart
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag className="h-4 w-4" /> Add to Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                {/* Stock status */}
                <p className="mt-3 text-xs text-neutral-400">
                  {product.stockLevel === "low" ? (
                    <span className="text-warning">Low stock — order soon</span>
                  ) : (
                    <span className="text-success">In stock · Ships within 24h</span>
                  )}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Science Accordion — Upgraded with smooth animations */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
          <h2 className="font-heading text-2xl font-bold text-midnight-ink">
            The Science
          </h2>
          <div className="mt-6 space-y-2">
            {scienceSections.map((section) => {
              const isOpen = openSection === section.id;
              return (
                <div
                  key={section.id}
                  className="rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenSection(isOpen ? null : section.id)
                    }
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-neutral-100/50"
                  >
                    <span className="font-heading text-sm font-bold text-midnight-ink">
                      {section.title}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <ChevronDown className="h-4 w-4 text-neutral-400" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="border-t border-neutral-200 px-5 py-4">
                          <p className="text-sm leading-relaxed text-neutral-600 whitespace-pre-line">
                            {section.content}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dosage Card */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
          <ScrollReveal>
            <div className="rounded-[var(--radius-lg)] bg-midnight-ink p-8">
              <h3 className="font-heading text-lg font-bold text-white">
                Dosage Protocol
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400">Amount</p>
                  <p className="mt-1 font-mono text-lg font-medium text-electric-lime">
                    {product.dosage.amount}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400">Frequency</p>
                  <p className="mt-1 font-mono text-lg font-medium text-white">
                    {product.dosage.frequency}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400">Timing</p>
                  <p className="mt-1 font-mono text-lg font-medium text-white">
                    {product.dosage.timing}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400">Purity</p>
                  <p className="mt-1 font-mono text-lg font-medium text-electric-lime">
                    {product.purity}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Research Disclaimer */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-8">
          <div className="rounded-[var(--radius-lg)] border border-stone bg-soft-sand p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              <p className="text-xs leading-relaxed text-neutral-600">
                <span className="font-semibold text-midnight-ink">Research Use Only</span> — This product is intended for laboratory and research purposes only. Not for human consumption. Not FDA approved. No therapeutic claims are made. By purchasing, you confirm this product is for legitimate research purposes.
              </p>
            </div>
          </div>
        </section>

        {/* Certificate of Analysis */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
          <div className="rounded-[var(--radius-lg)] border border-neutral-200 bg-surface-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-ocean-teal/10">
                <FileText className="h-5 w-5 text-ocean-teal" />
              </div>
              <div>
                <p className="text-sm font-semibold text-midnight-ink">Certificate of Analysis</p>
                <p className="text-xs text-neutral-400">COA documentation available upon request.</p>
                <p className="text-xs text-neutral-400">
                  Contact: <span className="text-ocean-teal">research@omipeptides.com</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products — Horizontal scroll with snap */}
        {relatedProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
            <h2 className="font-heading text-2xl font-bold text-midnight-ink">
              Related Peptides
            </h2>
            <div className="mt-8 -mx-6 px-6 lg:mx-0 lg:px-0">
              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible">
                {relatedProducts.map(
                  (p) =>
                    p && (
                      <div
                        key={p.id}
                        className="min-w-[280px] snap-start lg:min-w-0"
                      >
                        <ScrollReveal className="h-full">
                          <ProductCard product={p} />
                        </ScrollReveal>
                      </div>
                    )
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      <StickyMobileATC
        productName={product.name}
        sizeLabel={selectedVariant?.sizeLabel}
        price={displayPrice}
        currency={currency}
        onAddToCart={handleAddToCart}
        visible={!atcInView}
      />
      <Footer />
    </>
  );
}
