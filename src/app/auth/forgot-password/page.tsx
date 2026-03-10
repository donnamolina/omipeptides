import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | Omipeptides",
  description:
    "Reset your Omipeptides account password. We'll send you a link to create a new one.",
  alternates: { canonical: "https://omipeptides.com/auth/forgot-password" },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-16 lg:px-8">
          <ForgotPasswordForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
