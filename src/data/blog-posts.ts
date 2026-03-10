import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "bp1",
    title: "BPC-157: The Complete Science Guide to the Body Protection Compound",
    slug: "bpc-157-complete-guide",
    excerpt:
      "An in-depth look at the research behind BPC-157, its mechanisms of action, and what the clinical data actually shows about this remarkable peptide.",
    content: "",
    category: "Recovery",
    author: {
      name: "Dr. Elena Vasquez",
      avatar: "/images/authors/elena.jpg",
      bio: "Biochemist and peptide researcher with 12 years of experience in regenerative medicine.",
      role: "Chief Science Officer",
    },
    featuredImage: "/images/blog/bpc-157-guide.jpg",
    publishedAt: "2026-02-20",
    readTime: 12,
    tags: ["BPC-157", "recovery", "research"],
    relatedSlugs: ["tb-500-vs-bpc-157", "peptide-stacking-guide"],
  },
  {
    id: "bp2",
    title: "The Science of Telomere Length: How Epithalon Works",
    slug: "epithalon-telomere-science",
    excerpt:
      "Telomere shortening is one of the nine hallmarks of aging. Here's how Epithalon activates telomerase and what that means for biological age reversal.",
    content: "",
    category: "Anti-Aging",
    author: {
      name: "Dr. Elena Vasquez",
      avatar: "/images/authors/elena.jpg",
      bio: "Biochemist and peptide researcher with 12 years of experience in regenerative medicine.",
      role: "Chief Science Officer",
    },
    featuredImage: "/images/blog/epithalon-telomeres.jpg",
    publishedAt: "2026-02-10",
    readTime: 9,
    tags: ["epithalon", "telomeres", "anti-aging", "longevity"],
    relatedSlugs: ["bpc-157-complete-guide", "peptide-stacking-guide"],
  },
  {
    id: "bp3",
    title: "Peptide Stacking 101: Building Your Optimal Protocol",
    slug: "peptide-stacking-guide",
    excerpt:
      "Not all peptides should be combined. Learn which peptides work synergistically, which to cycle, and how to design an optimal research protocol.",
    content: "",
    category: "Education",
    author: {
      name: "James Chen",
      avatar: "/images/authors/james.jpg",
      bio: "Biohacking educator and former competitive athlete. Runs one of the largest peptide communities online.",
      role: "Head of Education",
    },
    featuredImage: "/images/blog/stacking-guide.jpg",
    publishedAt: "2026-01-28",
    readTime: 15,
    tags: ["stacking", "protocols", "education", "guide"],
    relatedSlugs: ["bpc-157-complete-guide", "epithalon-telomere-science"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
