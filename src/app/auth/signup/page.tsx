import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up | Omipeptides",
  description:
    "Create your Omipeptides account to shop premium research peptides, track orders, and stay updated on new products.",
  alternates: { canonical: "https://omipeptides.com/auth/signup" },
};

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-16 lg:px-8">
          <SignupForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
