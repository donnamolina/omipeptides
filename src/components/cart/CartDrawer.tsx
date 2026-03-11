"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, FlaskConical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, formatPrice, getItemPrice } from "@/store/cart";

function cartKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}:${variantId}` : productId;
}

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const isOpen = useCartStore((s) => s.isCartOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const currency = useCartStore((s) => s.currency);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getSubtotal = useCartStore((s) => s.getSubtotal);

  useEffect(() => setMounted(true), []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key closes drawer
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const amountToFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-midnight-ink/30"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute right-0 top-0 h-full w-full max-w-[400px] bg-surface-white shadow-[var(--shadow-xl)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-lg font-bold text-midnight-ink">
                  Your Cart
                </h2>
                {itemCount > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-coral-punch px-1.5 text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] transition-opacity hover:opacity-70"
                aria-label="Close cart"
              >
                <X className="h-5 w-5 text-neutral-600" />
              </button>
            </div>

            {items.length === 0 ? (
              /* Empty State */
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
                <ShoppingBag className="h-12 w-12 text-neutral-400" />
                <p className="font-heading text-lg font-bold text-midnight-ink">
                  Your cart is empty
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-coral-punch px-6 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                >
                  Shop Peptides
                </Link>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="space-y-4">
                    {items.map((item) => {
                      const key = cartKey(item.productId, item.variantId);
                      const price = getItemPrice(item);
                      return (
                        <div key={key} className="flex gap-3">
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-sm)] bg-neutral-100">
                            <FlaskConical className="h-7 w-7 text-stone" />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium text-midnight-ink leading-tight">
                                  {item.product.name}
                                </p>
                                {item.sizeLabel && (
                                  <p className="text-xs text-neutral-400 mt-0.5">{item.sizeLabel}</p>
                                )}
                              </div>
                              <button
                                onClick={() => removeItem(key)}
                                className="shrink-0 p-1 text-neutral-400 transition-colors hover:text-error"
                                aria-label={`Remove ${item.product.name}`}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-1">
                              <div className="flex items-center rounded-[var(--radius-sm)] border border-neutral-200">
                                <button
                                  onClick={() => updateQuantity(key, item.quantity - 1)}
                                  className="flex h-7 w-7 items-center justify-center text-neutral-400 transition-colors hover:text-midnight-ink"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="flex h-7 w-5 items-center justify-center text-xs font-semibold text-midnight-ink">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(key, item.quantity + 1)}
                                  className="flex h-7 w-7 items-center justify-center text-neutral-400 transition-colors hover:text-midnight-ink"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <span className="font-mono text-sm font-medium text-midnight-ink">
                                {formatPrice(price * item.quantity, currency)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-neutral-200 px-6 py-4 space-y-4">
                  {/* Free BAC Water progress */}
                  {amountToFree > 0 && (
                    <div>
                      <p className="text-xs font-medium text-neutral-600">
                        Add {formatPrice(amountToFree, currency)} more for free BAC Water!
                      </p>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                        <div
                          className="h-full rounded-full bg-coral-punch transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {amountToFree <= 0 && (
                    <p className="text-xs font-medium text-success">
                      You qualify for free BAC Water!
                    </p>
                  )}

                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-600">Subtotal</span>
                    <span className="font-mono text-base font-semibold text-midnight-ink">
                      {formatPrice(subtotal, currency)}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="flex h-12 flex-1 items-center justify-center rounded-[var(--radius-md)] border-2 border-neutral-200 text-sm font-semibold text-neutral-600 transition-opacity hover:opacity-80"
                    >
                      View Cart
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="flex h-12 flex-1 items-center justify-center rounded-[var(--radius-md)] bg-coral-punch text-sm font-semibold text-white transition-opacity hover:opacity-80"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
