import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Omipeptides",
  description: "Terms of service for Omipeptides research peptide products.",
  alternates: { canonical: "https://omipeptides.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-heading text-5xl font-bold tracking-tight text-midnight-ink md:text-6xl">
              TERMS OF SERVICE
            </h1>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-600">
              <p>
                By accessing and using the Omipeptides website and purchasing
                our products, you agree to the following terms and conditions.
              </p>

              <h2 className="font-heading text-xl font-bold text-midnight-ink">
                Research Use Only
              </h2>
              <p>
                All products sold by Omipeptides are intended strictly for
                in-vitro research and laboratory use only. They are not
                approved for human consumption, medical use, veterinary use,
                or as dietary supplements. Products must not be used for
                diagnostic, therapeutic, or curative purposes.
              </p>

              <h2 className="font-heading text-xl font-bold text-midnight-ink">
                Eligibility
              </h2>
              <p>
                You must be at least 18 years of age to purchase products from
                Omipeptides. By placing an order, you confirm that you meet
                this requirement and that all products will be used for
                legitimate research purposes.
              </p>

              <h2 className="font-heading text-xl font-bold text-midnight-ink">
                Buyer Responsibility
              </h2>
              <p>
                The buyer assumes full responsibility for the use, handling,
                storage, and disposal of all products purchased from
                Omipeptides. Products must be handled by qualified personnel
                in appropriate laboratory settings.
              </p>

              <h2 className="font-heading text-xl font-bold text-midnight-ink">
                No Therapeutic Claims
              </h2>
              <p>
                Omipeptides makes no therapeutic, diagnostic, or curative
                claims regarding any products. All information provided on
                this website, including product descriptions, research
                references, and educational content, is for informational
                purposes only and does not constitute medical advice.
              </p>

              <h2 className="font-heading text-xl font-bold text-midnight-ink">
                FDA Disclaimer
              </h2>
              <p>
                Products sold by Omipeptides are not approved by the U.S. Food
                and Drug Administration (FDA) or any equivalent regulatory
                body. These products are not intended to diagnose, treat, cure,
                or prevent any disease.
              </p>

              <h2 className="font-heading text-xl font-bold text-midnight-ink">
                Right to Refuse Orders
              </h2>
              <p>
                Omipeptides reserves the right to refuse or cancel any order
                at its sole discretion, including orders that appear to be
                intended for non-research purposes.
              </p>

              <h2 className="font-heading text-xl font-bold text-midnight-ink">
                Limitation of Liability
              </h2>
              <p>
                Omipeptides is not liable for any misuse of products purchased
                from our platform. Buyers assume full responsibility for the
                use and handling of all products. In no event shall Omipeptides
                be liable for any indirect, incidental, or consequential
                damages arising from the use of our products.
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
