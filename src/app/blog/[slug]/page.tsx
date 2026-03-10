import type { Metadata } from "next";
import { getBlogPostBySlug } from "@/lib/supabase/queries";
import BlogArticleClient from "./BlogArticleClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found | Omipeptides" };
  return {
    title: `${post.title} | Omipeptides`,
    description: post.excerpt.slice(0, 155),
    alternates: { canonical: `https://omipeptides.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        author: { "@type": "Person", name: post.author.name },
        datePublished: post.publishedAt,
        image: "https://omipeptides.com/images/blog/article-hero-1.png",
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogArticleClient slug={slug} />
    </>
  );
}
