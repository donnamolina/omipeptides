"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, FileCheck, Mail, X, Check, FlaskConical } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/client";
import { useCartStore, formatPrice } from "@/store/cart";
import { Product, ProductVariant, ProductCategory, CatalogCategory } from "@/types";

/* ------------------------------------------------------------------ */
/*  Supabase row → app type mappers                                   */
/* ------------------------------------------------------------------ */
function mapVariant(row: Record<string, unknown>): ProductVariant {
  return {
    id: row.id as string,
    productId: row.product_id as string,
    sizeLabel: row.size_label as string,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price != null ? Number(row.compare_at_price) : undefined,
    inStock: row.in_stock as boolean,
    displayOrder: row.display_order as number,
  };
}

function mapProduct(row: Record<string, unknown>): Product {
  const rawVariants = (row.product_variants as Record<string, unknown>[] | null) ?? [];
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    category: row.category as ProductCategory,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price != null ? Number(row.compare_at_price) : undefined,
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
    variants: rawVariants.map(mapVariant),
  };
}

function mapCategory(row: Record<string, unknown>): CatalogCategory {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: (row.description as string) ?? null,
    displayOrder: row.display_order as number,
    parentLandingCategory: (row.parent_landing_category as string) ?? null,
  };
}

/* ------------------------------------------------------------------ */
/*  Loading skeleton                                                  */
/* ------------------------------------------------------------------ */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[480px] animate-pulse rounded-[var(--radius-lg)] bg-neutral-100"
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Notify Me Modal                                                   */
/* ------------------------------------------------------------------ */
function NotifyMeModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setError("");

    const supabase = createClient();
    const { error: insertError } = await supabase.from("waitlist").insert({
      email: email.trim(),
      product_id: product.id,
      product_name: product.name,
    });

    setSubmitting(false);
    if (insertError) {
      setError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-midnight-ink/40" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-[var(--radius-lg)] bg-surface-white p-6 shadow-[var(--shadow-xl)]">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-neutral-400 hover:text-midnight-ink"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {success ? (
          <div className="text-center py-4">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
              <Check className="h-5 w-5 text-success" />
            </div>
            <p className="mt-3 font-heading text-lg font-bold text-midnight-ink">
              You&apos;re on the list!
            </p>
            <p className="mt-1 text-sm text-neutral-600">
              We&apos;ll notify you when {product.name} is available.
            </p>
          </div>
        ) : (
          <>
            <p className="font-heading text-lg font-bold text-midnight-ink">
              Get notified
            </p>
            <p className="mt-1 text-sm text-neutral-600">
              Enter your email and we&apos;ll let you know when{" "}
              <span className="font-medium">{product.name}</span> is back in stock.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                ref={inputRef}
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 flex-1 rounded-[var(--radius-md)] border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-midnight-ink transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="h-10 rounded-[var(--radius-md)] bg-coral-punch px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "..." : "Notify Me"}
              </button>
            </form>
            {error && <p className="mt-2 text-xs text-error">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product Card                                                      */
/* ------------------------------------------------------------------ */
function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const currency = useCartStore((s) => s.currency);
  const [added, setAdded] = useState(false);
  const [showNotify, setShowNotify] = useState(false);

  const sortedVariants = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return [];
    return [...product.variants].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [product.variants]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    sortedVariants[0]
  );

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;

  function handleVariantChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = sortedVariants.find((v) => v.id === e.target.value);
    setSelectedVariant(v);
  }

  function handleAdd() {
    addItem(
      product,
      1,
      selectedVariant?.id,
      selectedVariant?.sizeLabel,
      selectedVariant?.price
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <>
      <div className="relative flex flex-col bg-soft-sand rounded-[var(--radius-lg)] overflow-hidden h-full">
        {/* COA badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-xs text-ocean-teal bg-ocean-teal/10 rounded px-2 py-1">
          <FileCheck className="h-3 w-3" />
          COA
        </div>

        {/* Image area */}
        <Link href={`/products/${product.slug}`} className="relative block h-48 bg-neutral-100">
          {!product.inStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-midnight-ink/50">
              <span className="text-xs font-semibold uppercase tracking-wider text-white">
                Out of Stock
              </span>
            </div>
          )}
          <div className="flex h-full w-full items-center justify-center bg-neutral-100">
            <FlaskConical className="h-12 w-12 text-stone" />
          </div>
        </Link>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
            {product.category.replace(/-/g, " ")}
          </span>
          <Link href={`/products/${product.slug}`} className="hover:text-coral-punch transition-colors">
            <h3 className="font-heading text-lg font-semibold text-midnight-ink">{product.name}</h3>
          </Link>
          <p className="text-sm text-neutral-600 line-clamp-2">{product.shortDescription}</p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <span>Purity {product.purity}</span>
            {sortedVariants.length > 0 && (
              <span>
                Sizes {sortedVariants.length} option{sortedVariants.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Variant selector */}
          {sortedVariants.length > 0 && (
            <select
              value={selectedVariant?.id ?? ""}
              onChange={handleVariantChange}
              className="h-9 text-sm border border-neutral-200 rounded-[var(--radius-md)] bg-white px-2 w-full"
            >
              {sortedVariants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.sizeLabel} — {formatPrice(v.price, currency)}
                </option>
              ))}
            </select>
          )}

          {/* Spacer to push price + button to bottom */}
          <div className="mt-auto" />

          {/* Price + Add */}
          <div className="flex items-center justify-between pt-2">
            <span className="font-heading text-xl font-bold text-midnight-ink">
              {formatPrice(displayPrice, currency)}
            </span>
            {product.inStock ? (
              <button
                onClick={handleAdd}
                className={`rounded-[var(--radius-md)] h-9 px-4 text-sm font-medium transition-colors ${
                  added
                    ? "bg-success text-white"
                    : "bg-midnight-ink text-white hover:opacity-90"
                }`}
              >
                {added ? "Added!" : "+ Add"}
              </button>
            ) : (
              <button
                onClick={() => setShowNotify(true)}
                className="flex items-center gap-1.5 bg-transparent border border-neutral-300 text-neutral-600 rounded-[var(--radius-md)] h-9 px-4 text-sm font-medium transition-colors hover:bg-neutral-50"
              >
                <Mail className="h-3.5 w-3.5" />
                Notify Me
              </button>
            )}
          </div>

          <p className="text-[10px] text-neutral-400 italic">For research use only</p>
        </div>
      </div>

      {showNotify && (
        <NotifyMeModal product={product} onClose={() => setShowNotify(false)} />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main catalog content                                              */
/* ------------------------------------------------------------------ */
function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [products, setProducts] = useState<Product[]>([]);
  const [catalogCategories, setCatalogCategories] = useState<CatalogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  // Fetch products + categories from Supabase
  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const [productsRes, categoriesRes] = await Promise.all([
        supabase
          .from("products")
          .select("*, product_variants(*)")
          .order("category")
          .order("name"),
        supabase.from("categories").select("*").order("display_order"),
      ]);

      if (!productsRes.error && productsRes.data) {
        setProducts(productsRes.data.map(mapProduct));
      }
      if (!categoriesRes.error && categoriesRes.data) {
        setCatalogCategories(categoriesRes.data.map(mapCategory));
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Filtering: category + search
  const filtered = useMemo(() => {
    let result = products;

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, products, search]);

  const inStockProducts = useMemo(() => filtered.filter((p) => p.inStock), [filtered]);
  const outOfStockProducts = useMemo(() => filtered.filter((p) => !p.inStock), [filtered]);

  // Count products per category
  const countByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) {
      map[p.category] = (map[p.category] || 0) + 1;
    }
    return map;
  }, [products]);

  // Grouped products for "All Products" view
  const groupedByCategory = useMemo(() => {
    if (activeCategory !== "all") return null;
    const groups: { category: CatalogCategory; products: Product[] }[] = [];
    for (const cat of catalogCategories) {
      const catProducts = inStockProducts.filter((p) => p.category === cat.slug);
      if (catProducts.length > 0) {
        groups.push({ category: cat, products: catProducts });
      }
    }
    // Include products whose category is not in catalogCategories
    const mappedSlugs = new Set(catalogCategories.map((c) => c.slug));
    const uncategorized = inStockProducts.filter((p) => !mappedSlugs.has(p.category));
    if (uncategorized.length > 0) {
      groups.push({
        category: {
          id: "other",
          name: "Other",
          slug: "other",
          description: null,
          displayOrder: 999,
          parentLandingCategory: null,
        },
        products: uncategorized,
      });
    }
    return groups;
  }, [activeCategory, catalogCategories, inStockProducts]);

  const totalInStock = useMemo(() => products.filter((p) => p.inStock).length, [products]);

  /* ---- Sidebar button ---- */
  function SidebarButton({
    label,
    count,
    value,
  }: {
    label: string;
    count: number;
    value: string;
  }) {
    const active = activeCategory === value;
    return (
      <button
        onClick={() => setActiveCategory(value)}
        className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors ${
          active
            ? "bg-midnight-ink text-white rounded-[var(--radius-md)] font-medium"
            : "text-neutral-600 hover:bg-neutral-100 rounded-[var(--radius-md)]"
        }`}
      >
        <span>{label}</span>
        <span
          className={`text-xs ${active ? "text-white/70" : "text-neutral-400"}`}
        >
          {count}
        </span>
      </button>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* ---- Header ---- */}
        <section className="px-6 pt-16 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              Research Catalog
            </p>
            <h1 className="mt-2 font-heading text-4xl font-bold text-midnight-ink md:text-5xl">
              All Peptides
            </h1>
            <p className="mt-3 text-sm text-neutral-600">
              {products.length} products &middot; {totalInStock} available now &middot;
              Pharmaceutical-grade &ge;98% purity &middot; COA included
            </p>

            {/* ---- Search ---- */}
            <div className="relative mt-6">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search peptides..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white pl-10 pr-4 text-sm outline-none focus:border-midnight-ink transition-colors"
              />
            </div>
          </div>
        </section>

        {/* ---- Two-column layout ---- */}
        <section className="px-6 py-10 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            {/* Mobile pills */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
              <button
                onClick={() => setActiveCategory("all")}
                className={`flex-shrink-0 rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-midnight-ink text-white"
                    : "bg-neutral-100 text-neutral-600"
                }`}
              >
                All ({products.length})
              </button>
              {catalogCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`flex-shrink-0 whitespace-nowrap rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === cat.slug
                      ? "bg-midnight-ink text-white"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {cat.name} ({countByCategory[cat.slug] ?? 0})
                </button>
              ))}
            </div>

            <div className="flex gap-10">
              {/* Desktop sidebar */}
              <aside className="hidden w-64 flex-shrink-0 lg:block">
                <p className="mb-3 text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Categories
                </p>
                <nav className="flex flex-col gap-1">
                  <SidebarButton label="All Products" count={products.length} value="all" />
                  {catalogCategories.map((cat) => (
                    <SidebarButton
                      key={cat.id}
                      label={cat.name}
                      count={countByCategory[cat.slug] ?? 0}
                      value={cat.slug}
                    />
                  ))}
                </nav>
              </aside>

              {/* Product grid */}
              <div className="min-w-0 flex-1">
                {loading ? (
                  <SkeletonGrid />
                ) : (
                  <>
                    {/* Grouped view when "All Products" */}
                    {activeCategory === "all" && groupedByCategory ? (
                      <div className="space-y-12">
                        {groupedByCategory.map((group) => (
                          <div key={group.category.id}>
                            <h2 className="font-heading text-xl font-bold text-midnight-ink">
                              {group.category.name}
                            </h2>
                            {group.category.description && (
                              <p className="mt-1 text-sm text-neutral-500">
                                {group.category.description}
                              </p>
                            )}
                            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                              {group.products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Flat grid for single category */
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {inStockProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    )}

                    {/* Coming Soon section */}
                    {outOfStockProducts.length > 0 && (
                      <div className="mt-16">
                        <p className="mb-4 text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                          Coming Soon
                        </p>
                        <div className="grid grid-cols-1 gap-6 opacity-70 sm:grid-cols-2 lg:grid-cols-3">
                          {outOfStockProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty state */}
                    {filtered.length === 0 && (
                      <p className="mt-12 text-center text-neutral-400">
                        No products found. Try a different search or category.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Page export with Suspense boundary for useSearchParams             */
/* ------------------------------------------------------------------ */
export default function ProductsPage() {
  return (
    <Suspense>
      <ProductCatalogContent />
    </Suspense>
  );
}
