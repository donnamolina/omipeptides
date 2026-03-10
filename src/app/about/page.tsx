import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us | Omipeptides",
  description:
    "Learn about Omipeptides — our mission to provide science-backed, third-party tested research peptides with 99.7% purity guaranteed.",
  alternates: { canonical: "https://omipeptides.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-heading text-5xl font-bold tracking-tight text-midnight-ink md:text-6xl">
              ABOUT US
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Omipeptides was founded on a simple premise: the research
              community deserves access to high-purity peptides backed by
              real science, not marketing hype.
            </p>

            <h2 className="mt-12 font-heading text-2xl font-bold text-midnight-ink">
              Our Mission
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              We bridge the gap between cutting-edge peptide science and the
              researchers who need reliable, high-purity compounds.
              Every product we offer is third-party tested, with certificates
              of analysis available on request.
            </p>

            <h2 className="mt-12 font-heading text-2xl font-bold text-midnight-ink">
              Quality Standards
            </h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-neutral-600">
              <p>
                We maintain the highest standards in the industry:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>99.7%+ purity on every batch</li>
                <li>Independent third-party HPLC and mass spectrometry testing</li>
                <li>GMP-compliant manufacturing facilities</li>
                <li>Full certificates of analysis available</li>
              </ul>
            </div>

            <h2 className="mt-12 font-heading text-2xl font-bold text-midnight-ink">
              Research First
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Our product pages reference over 500 clinical studies. We believe
              in transparency — every claim we make is backed by peer-reviewed
              research. Visit our{" "}
              <Link
                href="/blog"
                className="text-coral-punch hover:underline"
              >
                Research Hub
              </Link>{" "}
              for in-depth science breakdowns.
            </p>

            <div className="mt-16 rounded-[var(--radius-lg)] bg-midnight-ink p-8">
              <p className="text-xs uppercase tracking-wider text-neutral-400">
                Disclaimer
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                All products sold by Omipeptides are intended strictly for
                laboratory and research use only. They are not intended for
                human consumption, medical use, veterinary use, or as dietary
                supplements. Not FDA approved. No therapeutic claims are made.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
