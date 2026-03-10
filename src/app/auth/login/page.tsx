import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In | Omipeptides",
  description:
    "Log in to your Omipeptides account to manage orders, track shipments, and access exclusive peptide research.",
  alternates: { canonical: "https://omipeptides.com/auth/login" },
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-16 lg:px-8">
          <Suspense>
            <LoginForm />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
