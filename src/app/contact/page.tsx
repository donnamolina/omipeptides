import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Omipeptides",
  description: "Get in touch with the Omipeptides team for questions about peptide products, orders, or research inquiries.",
  alternates: { canonical: "https://omipeptides.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-heading text-5xl font-bold tracking-tight text-midnight-ink md:text-6xl">
              CONTACT US
            </h1>
            <p className="mt-6 text-lg text-neutral-600">
              Have questions about our products, your order, or peptide
              research? We&apos;re here to help.
            </p>

            <div className="mt-12 rounded-[var(--radius-lg)] border border-neutral-200 bg-surface-white p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coral-punch/10">
                  <Mail className="h-5 w-5 text-coral-punch" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Email us at</p>
                  <p className="font-heading text-lg font-bold text-midnight-ink">
                    support@omipeptides.com
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-neutral-600">
                We typically respond within 24 hours during business days.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
