import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omipeptides.com"),
  title: "Omipeptides — Premium Research Peptides",
  description:
    "Premium research-grade peptides for scientific investigation. Third-party tested, 99.7% purity guaranteed. COA with every order.",
  keywords: [
    "peptides",
    "BPC-157",
    "TB-500",
    "GHK-Cu",
    "wellness",
    "recovery",
    "anti-aging",
    "performance",
  ],
  openGraph: {
    title: "Omipeptides — Premium Research Peptides",
    description:
      "Premium research-grade peptides for scientific investigation. Third-party tested, 99.7% purity guaranteed. COA with every order.",
    url: "https://omipeptides.com",
    siteName: "Omipeptides",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omipeptides — Premium Research Peptides",
    description:
      "Premium research-grade peptides for scientific investigation. Third-party tested, 99.7% purity guaranteed. COA with every order.",
    images: ["/og-default.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

import AgeVerificationGate from "@/components/shared/AgeVerificationGate";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <AgeVerificationGate />
        {children}
      </body>
    </html>
  );
}
