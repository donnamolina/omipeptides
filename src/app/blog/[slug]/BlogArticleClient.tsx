"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { createClient } from "@/lib/supabase/client";
import { BlogPost } from "@/types";

function mapBlogPost(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    excerpt: row.excerpt as string,
    content: row.content as string,
    category: row.category as string,
    author: {
      name: row.author_name as string,
      avatar: row.author_avatar as string,
      bio: row.author_bio as string,
      role: row.author_role as string,
    },
    featuredImage: row.featured_image as string,
    publishedAt: row.published_at as string,
    updatedAt: (row.updated_at as string) ?? undefined,
    readTime: row.read_time as number,
    tags: row.tags as string[],
    relatedSlugs: row.related_slugs as string[],
  };
}

export default function BlogArticleClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (!error && data) {
        const p = mapBlogPost(data);
        setPost(p);

        if (p.relatedSlugs && p.relatedSlugs.length > 0) {
          const { data: relData } = await supabase
            .from("blog_posts")
            .select("*")
            .in("slug", p.relatedSlugs)
            .eq("published", true);
          if (relData) setRelatedPosts(relData.map(mapBlogPost));
        }
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center pt-20">
          <p className="text-neutral-400">Loading article...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-midnight-ink">
              Article Not Found
            </h1>
            <Link
              href="/blog"
              className="mt-4 inline-block text-coral-punch hover:underline"
            >
              Back to Research Hub
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1 text-xs text-neutral-400">
            <Link href="/" className="hover:text-midnight-ink transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-midnight-ink transition-colors">Research Hub</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-midnight-ink line-clamp-1">{post.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <section className="mx-auto max-w-3xl px-6 lg:px-8 py-8">
          <ScrollReveal>
            <span className="inline-flex rounded-[var(--radius-full)] bg-coral-punch/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-coral-punch">
              {post.category}
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-midnight-ink md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <span className="font-medium text-midnight-ink">{post.author.name}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} min read
              </span>
            </div>
          </ScrollReveal>
        </section>

        {/* Featured image */}
        <section className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="relative h-64 overflow-hidden rounded-[var(--radius-lg)] bg-neutral-100 md:h-96">
            <Image
              src="/images/blog/article-hero-1.png"
              alt={`Featured image for ${post.title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
              className="object-cover"
            />
          </div>
        </section>

        {/* Article Body */}
        <section className="mx-auto max-w-3xl px-6 lg:px-8 py-12">
          <div className="max-w-none text-neutral-600">
            {/* Educational disclaimer */}
            <div className="mb-8 rounded-[var(--radius-md)] border border-stone bg-soft-sand px-4 py-3">
              <p className="text-xs text-neutral-400 italic">
                This article is for informational and educational purposes only and does not constitute medical advice.
              </p>
            </div>

            <p className="text-lg leading-relaxed">
              {post.excerpt}
            </p>
            <h2 className="mt-10 font-heading text-2xl font-bold text-midnight-ink">
              Understanding the Mechanism
            </h2>
            <p className="mt-4 text-base leading-relaxed">
              Peptides are short chains of amino acids that serve as signaling molecules in the body. Unlike full proteins, their smaller size allows them to be absorbed more efficiently and target specific biological pathways. Each peptide in our catalog has been selected based on a robust body of preclinical and clinical evidence.
            </p>
            <h2 className="mt-10 font-heading text-2xl font-bold text-midnight-ink">
              What the Research Shows
            </h2>
            <p className="mt-4 text-base leading-relaxed">
              The growing body of peer-reviewed literature continues to validate what early adopters in the biohacking community have observed. From tissue regeneration to metabolic optimization, peptides represent one of the most promising frontiers in personalized health protocols.
            </p>
            <h2 className="mt-10 font-heading text-2xl font-bold text-midnight-ink">
              Protocol Considerations
            </h2>
            <p className="mt-4 text-base leading-relaxed">
              As with any bioactive compound, proper dosing, timing, and cycling are critical to achieving optimal results. We recommend working with a qualified healthcare provider to develop a protocol tailored to your individual goals and health status. All products are intended for research purposes only.
            </p>
          </div>
        </section>

        {/* Author Bio */}
        <section className="mx-auto max-w-3xl px-6 lg:px-8 pb-12">
          <div className="rounded-[var(--radius-lg)] bg-neutral-100 p-6 flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral-200" role="img" aria-label={`Photo of ${post.author.name}`}>
              <span className="text-xs font-semibold text-neutral-400" aria-hidden="true">
                {post.author.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-midnight-ink">
                {post.author.name}
              </p>
              <p className="text-xs text-neutral-400">{post.author.role}</p>
              <p className="mt-2 text-sm text-neutral-600">{post.author.bio}</p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-3xl px-6 lg:px-8 pb-16">
            <h2 className="font-heading text-2xl font-bold text-midnight-ink">
              Related Articles
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {relatedPosts.map(
                (related) =>
                  related && (
                    <Link
                      key={related.id}
                      href={`/blog/${related.slug}`}
                      className="group rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white p-4 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-sm)]"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-coral-punch">
                        {related.category}
                      </span>
                      <h3 className="mt-1 font-heading text-sm font-bold text-midnight-ink line-clamp-2">
                        {related.title}
                      </h3>
                      <span className="mt-2 flex items-center gap-1 text-xs text-neutral-400">
                        <Clock className="h-3 w-3" /> {related.readTime} min
                      </span>
                    </Link>
                  )
              )}
            </div>
          </section>
        )}

        <NewsletterCTA />
      </main>
      <Footer />
    </>
  );
}
