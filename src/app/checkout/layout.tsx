import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Omipeptides",
  description: "Complete your order for science-backed research peptides.",
  alternates: { canonical: "https://omipeptides.com/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
