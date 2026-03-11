import type { Metadata } from "next";
import nextDynamic from "next/dynamic";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Premium Research Peptides | Omipeptides",
  description:
    "Premium research-grade peptides for scientific investigation. Third-party tested, 99.7% purity guaranteed. COA with every order.",
  alternates: { canonical: "https://omipeptides.com" },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { getFeaturedProducts, getTestimonials, getBlogPosts } from "@/lib/supabase/queries";

const HowItWorks = nextDynamic(() => import("@/components/home/HowItWorks"));
const ScienceSection = nextDynamic(() => import("@/components/home/ScienceSection"));
const TestimonialCarousel = nextDynamic(() => import("@/components/home/TestimonialCarousel"));
const BlogPreview = nextDynamic(() => import("@/components/home/BlogPreview"));
const NewsletterCTA = nextDynamic(() => import("@/components/home/NewsletterCTA"));

export default async function Home() {
  let featuredProducts: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = [];
  let blogPosts: Awaited<ReturnType<typeof getBlogPosts>> = [];

  try {
    [featuredProducts, testimonials, blogPosts] = await Promise.all([
      getFeaturedProducts(),
      getTestimonials(),
      getBlogPosts(),
    ]);
  } catch (err) {
    console.error("Failed to fetch data from Supabase:", err);
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CategoryShowcase />
        <FeaturedProducts products={featuredProducts} />
        <HowItWorks />
        <ScienceSection />
        <TestimonialCarousel testimonials={testimonials} />
        <BlogPreview posts={blogPosts} />
        <NewsletterCTA />
      </main>
      <Footer />
    </>
  );
}
