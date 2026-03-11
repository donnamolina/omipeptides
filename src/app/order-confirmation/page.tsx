"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight, UserPlus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") ?? "N/A";
  const isGuest = searchParams.get("guest") === "true";

  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-10 w-10 text-success" />
        </div>
      </div>

      <h1 className="mt-6 font-heading text-3xl font-bold text-midnight-ink md:text-4xl">
        Order Received
      </h1>

      <div className="mt-6 rounded-[var(--radius-lg)] border border-neutral-200 bg-surface-white p-6">
        <p className="text-xs uppercase tracking-wider text-neutral-400">
          Order Number
        </p>
        <p className="mt-1 font-mono text-2xl font-bold text-midnight-ink">
          {orderNumber}
        </p>
      </div>

      <div className="mt-6 rounded-[var(--radius-lg)] border border-stone bg-soft-sand p-4">
        <div className="flex items-start gap-3">
          <Package className="mt-0.5 h-5 w-5 shrink-0 text-ocean-teal" />
          <p className="text-sm leading-relaxed text-neutral-600 text-left">
            Your order has been received and is pending payment.
            You will receive payment instructions at your {isGuest ? "provided" : "registered"} email shortly.
          </p>
        </div>
      </div>

      {/* Guest CTA — create account to track order */}
      {isGuest && (
        <div className="mt-6 rounded-[var(--radius-lg)] border-2 border-coral-punch/20 bg-coral-punch/5 p-5">
          <div className="flex items-start gap-3">
            <UserPlus className="mt-0.5 h-5 w-5 shrink-0 text-coral-punch" />
            <div className="text-left">
              <p className="text-sm font-semibold text-midnight-ink">
                Create an account to track your order
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                Sign up to view order history, get updates, and check out faster next time.
              </p>
            </div>
          </div>
          <Link
            href="/auth/signup"
            className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-coral-punch px-5 text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)]"
          >
            Create Account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      <p className="mt-6 text-xs text-neutral-400">
        All products are for research use only. Not for human consumption.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        {!isGuest && (
          <Link
            href="/account/orders"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-coral-punch px-6 text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)]"
          >
            View My Orders <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        <Link
          href="/products"
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] border-2 border-neutral-200 px-6 text-sm font-semibold text-neutral-600 transition-opacity hover:opacity-80"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <Suspense fallback={<div className="text-center text-neutral-400">Loading...</div>}>
            <OrderConfirmationContent />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
