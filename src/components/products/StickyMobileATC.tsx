"use client";

import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice, type Currency } from "@/store/cart";

interface StickyMobileATCProps {
  productName: string;
  sizeLabel?: string;
  price: number;
  currency: Currency;
  onAddToCart: () => void;
  visible: boolean;
}

export default function StickyMobileATC({
  productName,
  sizeLabel,
  price,
  currency,
  onAddToCart,
  visible,
}: StickyMobileATCProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="flex h-[60px] items-center justify-between border-t border-stone bg-white px-3 shadow-[var(--shadow-lg)]">
            <p className="min-w-0 flex-1 truncate font-heading text-sm font-bold text-midnight-ink">
              {productName}
            </p>

            <p className="shrink-0 px-3 text-center text-xs text-neutral-600">
              {sizeLabel && (
                <span className="mr-1 font-medium">{sizeLabel}</span>
              )}
              <span className="font-mono font-semibold text-midnight-ink">
                {formatPrice(price, currency)}
              </span>
            </p>

            <button
              onClick={onAddToCart}
              className="flex shrink-0 items-center gap-1.5 rounded-[var(--radius-md)] bg-coral-punch px-4 py-2 text-xs font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)] active:scale-95"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="font-heading">Add to Cart</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
