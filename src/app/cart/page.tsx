"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, ArrowLeft, ShoppingBag, Check, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCartStore, formatPrice, getItemPrice } from "@/store/cart";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [researchConfirmed, setResearchConfirmed] = useState(false);
  const { items, removeItem, updateQuantity, getSubtotal, currency } = useCartStore();

  useEffect(() => setMounted(true), []);

  const subtotal = getSubtotal();
  const shipping = subtotal > 150 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="mx-auto max-w-5xl px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-midnight-ink md:text-5xl">
            YOUR CART
          </h1>

          {!mounted ? (
            <div className="mt-16 text-center">
              <p className="text-neutral-400">Loading cart...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="mt-16 text-center">
              <ShoppingBag className="mx-auto h-16 w-16 text-neutral-200" />
              <p className="mt-4 text-lg text-neutral-600">Your cart is empty</p>
              <Link
                href="/products"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-coral-punch px-8 text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)]"
              >
                Shop Peptides
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 rounded-[var(--radius-lg)] border border-neutral-200 bg-surface-white p-4"
                  >
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-neutral-100">
                      <FlaskConical className="h-10 w-10 text-stone" />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-heading text-sm font-bold text-midnight-ink hover:text-coral-punch transition-colors"
                        >
                          {item.product.name}{item.sizeLabel ? ` — ${item.sizeLabel}` : ""}
                        </Link>
                        <p className="text-xs text-neutral-400">
                          {item.product.shortDescription}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center rounded-[var(--radius-sm)] border border-neutral-200">
                          <button
                            onClick={() =>
                              updateQuantity(item.variantId ? `${item.productId}:${item.variantId}` : item.productId, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center text-sm text-neutral-600 hover:text-midnight-ink"
                          >
                            -
                          </button>
                          <span className="flex h-8 w-8 items-center justify-center font-mono text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.variantId ? `${item.productId}:${item.variantId}` : item.productId, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center text-sm text-neutral-600 hover:text-midnight-ink"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-semibold text-midnight-ink">
                            {formatPrice(getItemPrice(item) * item.quantity, currency)}
                          </span>
                          <button
                            onClick={() => removeItem(item.variantId ? `${item.productId}:${item.variantId}` : item.productId)}
                            aria-label={`Remove ${item.product.name} from cart`}
                            className="text-neutral-400 transition-colors hover:text-error"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="h-fit rounded-[var(--radius-lg)] border border-neutral-200 bg-surface-white p-6">
                <h3 className="font-heading text-lg font-bold text-midnight-ink">
                  Order Summary
                </h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatPrice(subtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className="font-mono">
                      {shipping === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        formatPrice(shipping, currency)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-neutral-400">
                      Free BAC water on orders over {formatPrice(150, currency)}
                    </p>
                  )}
                  <div className="border-t border-neutral-200 pt-3">
                    <div className="flex justify-between font-semibold text-midnight-ink">
                      <span>Total</span>
                      <span className="font-mono">{formatPrice(total, currency)}</span>
                    </div>
                  </div>
                </div>

                {/* Research confirmation checkbox */}
                <label className="mt-6 flex cursor-pointer items-start gap-3">
                  <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={researchConfirmed}
                      onChange={(e) => setResearchConfirmed(e.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="flex h-5 w-5 items-center justify-center rounded border border-neutral-300 transition-colors peer-checked:border-coral-punch peer-checked:bg-coral-punch peer-focus-visible:ring-2 peer-focus-visible:ring-coral-punch peer-focus-visible:ring-offset-2">
                      {researchConfirmed && <Check className="h-3 w-3 text-white" />}
                    </span>
                  </span>
                  <span className="text-xs leading-relaxed text-neutral-600">
                    I confirm I am 18+ and all products are for research purposes only. Not for human consumption.
                  </span>
                </label>

                {researchConfirmed ? (
                  <Link
                    href="/checkout"
                    className="mt-4 flex h-12 w-full items-center justify-center rounded-[var(--radius-md)] bg-coral-punch text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)] active:scale-[0.98]"
                  >
                    Proceed to Checkout
                  </Link>
                ) : (
                  <span
                    className="mt-4 flex h-12 w-full cursor-not-allowed items-center justify-center rounded-[var(--radius-md)] bg-neutral-200 text-sm font-semibold text-neutral-400"
                    aria-disabled="true"
                  >
                    Proceed to Checkout
                  </span>
                )}

                <Link
                  href="/products"
                  className="mt-3 flex items-center justify-center gap-1 text-xs text-neutral-400 hover:text-midnight-ink transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" /> Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
