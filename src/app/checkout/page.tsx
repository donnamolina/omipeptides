"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Check } from "lucide-react";
import { useCartStore, formatPrice, getItemPrice } from "@/store/cart";
import { createClient } from "@/lib/supabase/client";

const categoryProductImages: Record<string, string> = {
  "recovery-healing": "/images/products/recovery-category.png",
  "longevity-brain": "/images/products/anti-aging-category.png",
  "growth-hormone-anti-aging": "/images/products/performance-category.png",
  "glp1-weight-loss": "/images/products/weight-management-category.png",
  "skin-beauty": "/images/products/anti-aging-category.png",
  "metabolic-other": "/images/products/weight-management-category.png",
  "blends-stacks": "/images/products/performance-category.png",
  "accessories-supplies": "/images/products/recovery-category.png",
};

function generateOrderNumber() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "OMI-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [researchConfirmed, setResearchConfirmed] = useState(false);
  const { items, getSubtotal, currency, clearCart } = useCartStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => setMounted(true), []);

  const subtotal = mounted ? getSubtotal() : 0;
  const shipping = subtotal > 150 ? 0 : 9.99;
  const total = subtotal + shipping;
  const displayItems = mounted ? items : [];

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!researchConfirmed) {
      setError("Please confirm research use before placing your order.");
      return;
    }

    if (!form.firstName || !form.lastName || !form.address || !form.city || !form.state || !form.zip) {
      setError("Please fill in all shipping fields.");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login?redirect=/checkout");
        return;
      }

      const orderNumber = generateOrderNumber();
      const shippingAddress = {
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country || "US",
      };

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          status: "pending",
          payment_status: "pending",
          subtotal,
          shipping,
          tax: 0,
          total,
          currency,
          shipping_address: shippingAddress,
          customer_email: user.email,
          customer_name: `${form.firstName} ${form.lastName}`,
          research_confirmation: true,
          age_confirmation: true,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_name: item.sizeLabel ? `${item.product.name} — ${item.sizeLabel}` : item.product.name,
        product_slug: item.product.slug,
        quantity: item.quantity,
        unit_price: getItemPrice(item),
        total_price: getItemPrice(item) * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and redirect to confirmation
      clearCart();
      router.push(`/order-confirmation?order=${orderNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Minimal nav */}
      <nav className="border-b border-neutral-200 bg-warm-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="font-heading text-xl font-extrabold text-midnight-ink">
              OMI<span className="text-coral-punch">PEPTIDES</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-midnight-ink transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> Back to cart
            </Link>
          </div>
        </div>
      </nav>

      <main className="bg-warm-cream">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Checkout Form */}
            <div className="lg:col-span-3">
              <h1 className="font-heading text-3xl font-bold text-midnight-ink">
                Checkout
              </h1>

              {error && (
                <div className="mt-4 rounded-[var(--radius-md)] border border-error/20 bg-error/5 px-4 py-3 text-sm text-error">
                  {error}
                </div>
              )}

              <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
                {/* Shipping */}
                <div>
                  <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-neutral-400">
                    Shipping Address
                  </h2>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="first-name" className="sr-only">First name</label>
                      <input
                        id="first-name"
                        type="text"
                        placeholder="First name"
                        required
                        value={form.firstName}
                        onChange={(e) => updateForm("firstName", e.target.value)}
                        className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)] placeholder:text-neutral-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="sr-only">Last name</label>
                      <input
                        id="last-name"
                        type="text"
                        placeholder="Last name"
                        required
                        value={form.lastName}
                        onChange={(e) => updateForm("lastName", e.target.value)}
                        className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)] placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                  <label htmlFor="address" className="sr-only">Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    required
                    value={form.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    className="mt-3 h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)] placeholder:text-neutral-400"
                  />
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="city" className="sr-only">City</label>
                      <input
                        id="city"
                        type="text"
                        placeholder="City"
                        required
                        value={form.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                        className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)] placeholder:text-neutral-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="sr-only">State</label>
                      <input
                        id="state"
                        type="text"
                        placeholder="State"
                        required
                        value={form.state}
                        onChange={(e) => updateForm("state", e.target.value)}
                        className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)] placeholder:text-neutral-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="sr-only">ZIP code</label>
                      <input
                        id="zip"
                        type="text"
                        placeholder="ZIP"
                        required
                        value={form.zip}
                        onChange={(e) => updateForm("zip", e.target.value)}
                        className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)] placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                  <label htmlFor="country" className="sr-only">Country</label>
                  <input
                    id="country"
                    type="text"
                    placeholder="Country (default: US)"
                    value={form.country}
                    onChange={(e) => updateForm("country", e.target.value)}
                    className="mt-3 h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)] placeholder:text-neutral-400"
                  />
                </div>

                {/* Research confirmation */}
                <label className="flex cursor-pointer items-start gap-3">
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
                    I confirm I am 18+ and all products are for research purposes only. Not for human consumption. I agree to the{" "}
                    <Link href="/terms" className="text-coral-punch hover:underline">Terms of Service</Link>.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!researchConfirmed || submitting || displayItems.length === 0}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-coral-punch text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock className="h-4 w-4" />
                  {submitting ? "Placing Order..." : `Place Research Order · ${formatPrice(total, currency)}`}
                </button>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-[var(--radius-lg)] border border-neutral-200 bg-surface-white p-6">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-neutral-400">
                  Order Summary
                </h3>

                <div className="mt-4 space-y-3">
                  {displayItems.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-white">
                        <Image
                          src={categoryProductImages[item.product.category]}
                          alt={`${item.product.name} peptide product`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-midnight-ink">
                          {item.product.name}{item.sizeLabel ? ` — ${item.sizeLabel}` : ""}
                        </p>
                        <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-mono text-sm text-midnight-ink">
                        {formatPrice(getItemPrice(item) * item.quantity, currency)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-neutral-200 pt-4 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatPrice(subtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className="font-mono">
                      {shipping === 0 ? "Free" : formatPrice(shipping, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200 pt-2 font-semibold text-midnight-ink">
                    <span>Total</span>
                    <span className="font-mono">{formatPrice(total, currency)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-neutral-200 bg-warm-cream py-6">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 text-center text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} Omipeptides. All rights reserved.
        </div>
      </footer>
    </>
  );
}
