import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "@/types";

export type Currency = "USD" | "DOP";

let _dopRate = 63; // fallback, overwritten by server-fetched rate

/** Called once from the root layout to set the live rate */
export function setDopRate(rate: number) {
  _dopRate = rate;
}

export function formatPrice(amountUSD: number, currency: Currency): string {
  if (currency === "DOP") {
    return `RD$${(amountUSD * _dopRate).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  return `$${amountUSD.toFixed(2)}`;
}

/** Returns the effective price for a cart item (variant price or base product price) */
export function getItemPrice(item: CartItem): number {
  return item.variantPrice ?? item.product.price;
}

interface CartStore {
  items: CartItem[];
  currency: Currency;
  _hydrated: boolean;
  isCartOpen: boolean;
  addItem: (product: Product, quantity?: number, variantId?: string, sizeLabel?: string, variantPrice?: number) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  setCurrency: (currency: Currency) => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  setHydrated: () => void;
  openCart: () => void;
  closeCart: () => void;
}

/** Unique key for a cart item: productId + variantId */
function cartKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}:${variantId}` : productId;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      currency: "USD" as Currency,
      _hydrated: false,
      isCartOpen: false,

      setHydrated: () => set({ _hydrated: true }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addItem: (product, quantity = 1, variantId, sizeLabel, variantPrice) => {
        set((state) => {
          const key = cartKey(product.id, variantId);
          const existing = state.items.find(
            (item) => cartKey(item.productId, item.variantId) === key
          );
          if (existing) {
            return {
              isCartOpen: true,
              items: state.items.map((item) =>
                cartKey(item.productId, item.variantId) === key
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            isCartOpen: true,
            items: [
              ...state.items,
              { productId: product.id, product, quantity, variantId, sizeLabel, variantPrice },
            ],
          };
        });
      },

      removeItem: (key) => {
        set((state) => ({
          items: state.items.filter(
            (item) => cartKey(item.productId, item.variantId) !== key
          ),
        }));
      },

      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            cartKey(item.productId, item.variantId) === key
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      setCurrency: (currency) => set({ currency }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + getItemPrice(item) * item.quantity,
          0
        );
      },
    }),
    {
      name: "omipeptides-cart",
      partialize: (state) => ({
        items: state.items,
        currency: state.currency,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
