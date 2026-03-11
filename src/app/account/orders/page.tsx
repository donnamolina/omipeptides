"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { User, Package, ChevronRight, ChevronDown, Loader2, ShoppingBag } from "lucide-react";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  status: string;
  total: number;
  currency: string;
  order_items: OrderItem[];
}

function getStatusStyle(status: string): { bg: string; text: string } {
  switch (status.toLowerCase()) {
    case "pending":
      return { bg: "rgba(245,158,11,0.1)", text: "#F59E0B" };
    case "confirmed":
    case "processing":
      return { bg: "rgba(78,205,196,0.1)", text: "#4ECDC4" };
    case "shipped":
    case "delivered":
      return { bg: "rgba(34,197,94,0.1)", text: "#22C55E" };
    case "cancelled":
    case "refunded":
      return { bg: "rgba(239,68,68,0.1)", text: "#EF4444" };
    default:
      return { bg: "rgba(155,145,137,0.1)", text: "#9B9189" };
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCurrency(amount: number, currency: string): string {
  if (currency === "DOP") {
    return `RD$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function OrdersPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    async function loadOrders() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setOrders(data as Order[]);
      }

      setLoading(false);
    }

    loadOrders();
  }, [mounted]);

  function toggleOrder(orderId: string) {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  }

  if (!mounted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-warm-cream pt-20" />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-cream pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-midnight-ink">
              MY ORDERS
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              View and track all your past and current orders.
            </p>
          </div>

          {/* Navigation tabs */}
          <div className="mb-8 flex gap-2">
            <Link
              href="/account"
              className="flex items-center gap-2 rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-midnight-ink"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
            <Link
              href="/account/orders"
              className="flex items-center gap-2 rounded-[var(--radius-md)] bg-coral-punch/10 px-4 py-2.5 text-sm font-semibold text-coral-punch"
            >
              <Package className="h-4 w-4" />
              Orders
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-coral-punch" />
            </div>
          ) : orders.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-neutral-200 bg-white py-20 shadow-[var(--shadow-md)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <ShoppingBag className="h-7 w-7 text-neutral-400" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-midnight-ink">
                No orders yet
              </h3>
              <p className="mt-2 text-sm text-neutral-500">
                Once you place an order, it will appear here.
              </p>
              <Link
                href="/products"
                className="mt-6 h-12 inline-flex items-center rounded-[var(--radius-md)] bg-coral-punch px-8 text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)] active:scale-[0.98]"
              >
                Browse Products
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ) : (
            /* Orders list */
            <div className="space-y-4">
              {orders.map((order) => {
                const statusStyle = getStatusStyle(order.status);
                const isExpanded = expandedOrder === order.id;
                const itemCount = order.order_items?.length ?? 0;

                return (
                  <div
                    key={order.id}
                    className="rounded-[var(--radius-lg)] border border-neutral-200 bg-white shadow-[var(--shadow-md)] transition-shadow hover:shadow-[var(--shadow-lg)]"
                  >
                    {/* Order header - clickable */}
                    <button
                      onClick={() => toggleOrder(order.id)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-heading text-base font-bold text-midnight-ink">
                            {order.order_number}
                          </span>
                          <span
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize"
                            style={{
                              backgroundColor: statusStyle.bg,
                              color: statusStyle.text,
                            }}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
                          <span>{formatDate(order.created_at)}</span>
                          <span className="hidden sm:inline text-neutral-300">|</span>
                          <span>
                            {itemCount} {itemCount === 1 ? "item" : "items"}
                          </span>
                          <span className="hidden sm:inline text-neutral-300">|</span>
                          <span className="font-semibold text-midnight-ink">
                            {formatCurrency(order.total, order.currency)}
                          </span>
                        </div>
                      </div>

                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-neutral-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Expanded line items */}
                    {isExpanded && order.order_items && order.order_items.length > 0 && (
                      <div className="border-t border-neutral-100 px-5 pb-5 pt-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                              <th className="pb-3">Product</th>
                              <th className="pb-3 text-center">Qty</th>
                              <th className="pb-3 text-right">Unit Price</th>
                              <th className="pb-3 text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {order.order_items.map((item) => (
                              <tr key={item.id}>
                                <td className="py-3 text-midnight-ink font-medium">
                                  {item.product_name}
                                </td>
                                <td className="py-3 text-center text-neutral-600">
                                  {item.quantity}
                                </td>
                                <td className="py-3 text-right text-neutral-600">
                                  {formatCurrency(item.unit_price, order.currency)}
                                </td>
                                <td className="py-3 text-right font-semibold text-midnight-ink">
                                  {formatCurrency(item.total, order.currency)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
