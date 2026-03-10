import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Omipeptides",
  description: "How Omipeptides collects, uses, and protects your personal information.",
  alternates: { canonical: "https://omipeptides.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-heading text-5xl font-bold tracking-tight text-midnight-ink md:text-6xl">
              PRIVACY POLICY
            </h1>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-600">
              <p>
                Omipeptides respects your privacy and is committed to
                protecting your personal information.
              </p>
              <h2 className="font-heading text-xl font-bold text-midnight-ink">
                Information We Collect
              </h2>
              <p>
                We collect information you provide directly: name, email,
                shipping address, and payment details when placing an order.
                We also collect usage data through cookies for analytics and
                site improvement.
              </p>
              <h2 className="font-heading text-xl font-bold text-midnight-ink">
                How We Use Your Information
              </h2>
              <p>
                Your information is used solely to process orders, communicate
                about your purchases, send newsletters you&apos;ve opted into,
                and improve our services.
              </p>
              <h2 className="font-heading text-xl font-bold text-midnight-ink">
                Data Protection
              </h2>
              <p>
                We use industry-standard encryption and security measures to
                protect your data. We never sell or share your personal
                information with third parties for marketing purposes.
              </p>
              <p className="text-sm text-neutral-400">
                Last updated: March 2026
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
