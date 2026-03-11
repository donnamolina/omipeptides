import { createClient } from "./server";
import type { Product, BlogPost, Testimonial } from "@/types";
import type { Database } from "@/types/database";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];
type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];
// ---------------------------------------------------------------------------
// Mappers — convert snake_case DB rows to camelCase frontend types
// ---------------------------------------------------------------------------

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    description: row.description,
    shortDescription: row.short_description,
    scienceDescription: row.science_description,
    benefits: row.benefits,
    dosage: row.dosage,
    images: {
      primary: row.image_primary,
      gallery: row.image_gallery,
    },
    inStock: row.in_stock,
    stockLevel: row.stock_level ?? undefined,
    tags: row.tags,
    purity: row.purity,
    thirdPartyTested: row.third_party_tested,
    studiesCount: row.studies_count,
    rating: row.rating,
    reviewCount: row.review_count,
    relatedSlugs: row.related_slugs,
  };
}

function mapBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    author: {
      name: row.author_name,
      avatar: row.author_avatar,
      bio: row.author_bio,
      role: row.author_role,
    },
    featuredImage: row.featured_image,
    publishedAt: row.published_at,
    updatedAt: row.updated_at ?? undefined,
    readTime: row.read_time,
    tags: row.tags,
    relatedSlugs: row.related_slugs,
  };
}

function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    quote: row.quote,
    author: row.author,
    avatar: row.avatar ?? undefined,
    productName: row.product_name,
    productSlug: row.product_slug,
    rating: row.rating,
    verified: row.verified,
    date: row.date,
  };
}

// ---------------------------------------------------------------------------
// Product queries
// ---------------------------------------------------------------------------

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("category")
    .order("name");

  if (error) throw error;
  return (data ?? []).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // row not found
    throw error;
  }
  return data ? mapProduct(data) : null;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("name");

  if (error) throw error;
  return (data ?? []).map(mapProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .contains("tags", ["best-seller"])
    .limit(6);

  if (error) throw error;
  return (data ?? []).map(mapProduct);
}

export async function getRelatedProducts(slugs: string[]): Promise<Product[]> {
  if (slugs.length === 0) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("slug", slugs);

  if (error) throw error;
  return (data ?? []).map(mapProduct);
}

// ---------------------------------------------------------------------------
// Blog queries
// ---------------------------------------------------------------------------

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapBlogPost);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data ? mapBlogPost(data) : null;
}

export async function getRelatedBlogPosts(
  slugs: string[]
): Promise<BlogPost[]> {
  if (slugs.length === 0) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .in("slug", slugs)
    .eq("published", true);

  if (error) throw error;
  return (data ?? []).map(mapBlogPost);
}

// ---------------------------------------------------------------------------
// Testimonial queries
// ---------------------------------------------------------------------------

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapTestimonial);
}

// ---------------------------------------------------------------------------
// Order queries
// ---------------------------------------------------------------------------

export async function getUserOrders(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
