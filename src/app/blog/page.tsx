import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Research Hub — Peptide Science & Protocols | Omipeptides",
  description:
    "Deep dives into peptide science, research protocols, and the latest clinical studies. Evidence-based educational resources for researchers.",
  alternates: { canonical: "https://omipeptides.com/blog" },
};

import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { getBlogPosts } from "@/lib/supabase/queries";

const blogImages = [
  "/images/blog/article-hero-1.png",
  "/images/blog/article-hero-2.png",
  "/images/lifestyle/lifestyle-wellness.png",
];

export default async function BlogPage() {
  let blogPosts: Awaited<ReturnType<typeof getBlogPosts>> = [];
  try {
    blogPosts = await getBlogPosts();
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
  }
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  if (!featured) {
    return (
      <>
        <Navbar />
        <main className="pt-20">
          <section className="py-16 lg:py-24 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="font-heading text-5xl font-bold tracking-tight text-midnight-ink md:text-6xl">
                RESEARCH HUB
              </h1>
              <p className="mt-4 text-lg text-neutral-600">
                No articles published yet. Check back soon.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <h1 className="font-heading text-5xl font-bold tracking-tight text-midnight-ink md:text-6xl">
                RESEARCH HUB
              </h1>
              <p className="mt-4 max-w-lg text-lg text-neutral-600">
                Deep dives into peptide science, protocols, and the latest research.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Article */}
        <section className="px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group block overflow-hidden rounded-[var(--radius-lg)] bg-midnight-ink transition-all hover:shadow-[var(--shadow-xl)]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={blogImages[0]}
                      alt={featured.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12">
                    <span className="inline-flex rounded-[var(--radius-full)] bg-electric-lime/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-electric-lime">
                      {featured.category}
                    </span>
                    <h2 className="mt-4 font-heading text-2xl font-bold text-white md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-sm text-neutral-400 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="mt-6 flex items-center gap-3 text-xs text-neutral-400">
                      <span>{featured.author.name}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {featured.readTime} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Article Grid */}
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {rest.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.1}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block overflow-hidden rounded-[var(--radius-lg)] bg-surface-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                  >
                    <div className="relative h-48 overflow-hidden bg-neutral-100">
                      <Image
                        src={blogImages[(i + 1) % blogImages.length]}
                        alt={`Featured image for ${post.title}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-flex rounded-[var(--radius-full)] bg-coral-punch/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-coral-punch">
                        {post.category}
                      </span>
                      <h3 className="mt-3 font-heading text-lg font-bold leading-tight text-midnight-ink">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <NewsletterCTA />
      </main>
      <Footer />
    </>
  );
}
