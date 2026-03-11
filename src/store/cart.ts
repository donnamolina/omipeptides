import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "@/types";

export type Currency = "USD" | "THB";

const THB_RATE = 34;

export function formatPrice(amountUSD: number, currency: Currency): string {
  if (currency === "THB") {
    return `฿${(amountUSD * THB_RATE).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
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
  addItem: (product: Product, quantity?: number, variantId?: string, sizeLabel?: string, variantPrice?: number) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  setCurrency: (currency: Currency) => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  setHydrated: () => void;
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

      setHydrated: () => set({ _hydrated: true }),

      addItem: (product, quantity = 1, variantId, sizeLabel, variantPrice) => {
        set((state) => {
          const key = cartKey(product.id, variantId);
          const existing = state.items.find(
            (item) => cartKey(item.productId, item.variantId) === key
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                cartKey(item.productId, item.variantId) === key
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
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
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
