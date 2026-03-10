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

interface CartStore {
  items: CartItem[];
  currency: Currency;
  _hydrated: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCurrency: (currency: Currency) => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  setHydrated: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      currency: "USD" as Currency,
      _hydrated: false,

      setHydrated: () => set({ _hydrated: true }),

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === product.id
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { productId: product.id, product, quantity },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
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
          (total, item) => total + item.product.price * item.quantity,
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
