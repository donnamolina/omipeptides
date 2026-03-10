"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { BlogPost } from "@/types";

const blogImages = [
  "/images/blog/article-hero-1.png",
  "/images/blog/article-hero-2.png",
  "/images/lifestyle/lifestyle-wellness.png",
];

export default function BlogPreview({ posts: blogPosts }: { posts: BlogPost[] }) {
  return (
    <section className="bg-neutral-100 py-24 lg:py-32 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-midnight-ink md:text-5xl">
                FROM THE LAB
              </h2>
              <p className="mt-4 text-neutral-600">
                Latest research and insights
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden items-center gap-1 text-sm font-medium text-coral-punch transition-colors hover:text-coral-punch/80 md:flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-[var(--radius-lg)] bg-surface-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <div className="relative h-48 overflow-hidden bg-neutral-200">
                  <Image
                    src={blogImages[i % blogImages.length]}
                    alt={`Featured image for ${post.title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <span
                    className="inline-flex rounded-[var(--radius-full)] bg-coral-punch/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-coral-punch"
                  >
                    {post.category}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-bold leading-tight text-midnight-ink line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-xs text-neutral-400">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-coral-punch"
          >
            View all articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
