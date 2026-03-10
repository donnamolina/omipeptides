import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart | Omipeptides",
  description: "Review your selected peptides and proceed to checkout.",
  alternates: { canonical: "https://omipeptides.com/cart" },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
