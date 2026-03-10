import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Peptides | Omipeptides",
  description:
    "Browse our complete catalog of research-grade peptides. Recovery, anti-aging, performance, and weight management — all third-party tested.",
  alternates: { canonical: "https://omipeptides.com/products" },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
