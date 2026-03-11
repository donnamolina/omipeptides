"use client";

import Link from "next/link";
import { ShoppingBag, FlaskConical } from "lucide-react";
import { Product } from "@/types";
import { useCartStore, formatPrice } from "@/store/cart";
import { motion } from "framer-motion";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  "recovery-healing": "#4ECDC4",
  "longevity-brain": "#C49CFF",
  "growth-hormone-anti-aging": "#FF8A5C",
  "glp1-weight-loss": "#7ED957",
  "skin-beauty": "#C49CFF",
  "metabolic-other": "#FF8A5C",
  "blends-stacks": "#4ECDC4",
  "accessories-supplies": "#9B9189",
};

const categoryLabels: Record<string, string> = {
  "recovery-healing": "Recovery",
  "longevity-brain": "Longevity",
  "growth-hormone-anti-aging": "Growth Hormone",
  "glp1-weight-loss": "Weight Loss",
  "skin-beauty": "Skin & Beauty",
  "metabolic-other": "Metabolic",
  "blends-stacks": "Blends",
  "accessories-supplies": "Accessories",
};

interface ProductCardProps {
  product: Product;
}

const stockConfig = {
  high: { color: "#22C55E", label: "In Stock" },
  low: { color: "#F59E0B", label: "Low Stock — Order Soon" },
  out: { color: "#EF4444", label: "Out of Stock" },
} as const;

function getStockLevel(product: Product): "high" | "low" | "out" {
  if (!product.inStock) return "out";
  return product.stockLevel ?? "high";
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const currency = useCartStore((s) => s.currency);
  const [added, setAdded] = useState(false);

  const categoryColor = categoryColors[product.category] ?? "#FF5C39";
  const stock = getStockLevel(product);
  const isOutOfStock = stock === "out";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-neutral-200 bg-surface-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
        style={
          {
            "--_glow-color": categoryColor,
          } as React.CSSProperties
        }
      >
        {/* Hover glow using category color */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: `0 0 24px 2px ${categoryColor}33, 0 0 48px 4px ${categoryColor}1A`,
          }}
        />

        {/* Best Seller badge */}
        {product.tags.includes("best-seller") && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-coral-punch px-3 py-1 font-heading text-xs font-bold uppercase tracking-wide text-white">
            Best Seller
          </span>
        )}

        {/* Category badge */}
        <span
          className="inline-flex w-fit items-center rounded-[var(--radius-full)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
          style={{ background: categoryColor }}
        >
          {categoryLabels[product.category]}
        </span>

        {/* Product image placeholder */}
        <div className={`mt-4 flex h-[220px] w-full flex-col items-center justify-center rounded-xl bg-neutral-100 transition-transform duration-300 group-hover:scale-105${isOutOfStock ? " opacity-60" : ""}`}>
          <FlaskConical className="h-12 w-12 text-stone" />
        </div>

        {/* Product info */}
        <div className="mt-4 flex-1">
          <h3 className="font-heading text-lg font-bold text-midnight-ink">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Price + ATC */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-midnight-ink">
              {formatPrice(product.price, currency)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-neutral-400 line-through">
                {formatPrice(product.compareAtPrice, currency)}
              </span>
            )}
          </div>

          {/* Add to Cart button: hidden by default, slides up on card hover */}
          <motion.button
            onClick={handleAddToCart}
            whileTap={isOutOfStock ? undefined : { scale: 0.9 }}
            disabled={isOutOfStock}
            className={`relative z-10 flex h-10 w-10 translate-y-4 items-center justify-center rounded-[var(--radius-md)] border transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${
              isOutOfStock
                ? "border-neutral-300 text-neutral-300 cursor-not-allowed opacity-0"
                : "border-coral-punch text-coral-punch opacity-0 hover:bg-coral-punch hover:text-white"
            }`}
          >
            {added ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm"
              >
                ✓
              </motion.span>
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
          </motion.button>
        </div>

        {/* Stock status */}
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: stockConfig[stock].color }}
          />
          <span className="text-xs" style={{ color: stockConfig[stock].color }}>
            {stockConfig[stock].label}
          </span>
        </div>

        {/* Purity badge */}
        <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400">
          <span className="font-mono">{product.purity} pure</span>
          <span>·</span>
          <span>{product.studiesCount} studies</span>
          <span>·</span>
          <span>★ {product.rating}</span>
        </div>

        {/* Research disclaimer */}
        <p className="mt-2 text-xs italic text-neutral-400">
          For research use only
        </p>
      </div>
    </Link>
  );
}
