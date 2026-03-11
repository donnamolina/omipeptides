export type ProductCategory =
  | 'glp1-weight-loss'
  | 'recovery-healing'
  | 'growth-hormone-anti-aging'
  | 'longevity-brain'
  | 'skin-beauty'
  | 'metabolic-other'
  | 'blends-stacks'
  | 'accessories-supplies';

export interface ProductVariant {
  id: string;
  productId: string;
  sizeLabel: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  displayOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  scienceDescription: string;
  benefits: string[];
  dosage: {
    amount: string;
    frequency: string;
    timing: string;
    instructions: string;
  };
  images: {
    primary: string;
    gallery: string[];
  };
  inStock: boolean;
  stockLevel?: 'high' | 'low' | 'out';
  tags: string[];
  purity: string;
  thirdPartyTested: boolean;
  studiesCount: number;
  rating: number;
  reviewCount: number;
  relatedSlugs: string[];
  variants?: ProductVariant[];
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  variantId?: string;
  sizeLabel?: string;
  variantPrice?: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  discountCode?: string;
  discountAmount?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: Author;
  featuredImage: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  tags: string[];
  relatedSlugs: string[];
}

export interface Author {
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  displayOrder: number;
  parentLandingCategory: string | null;
}

// Legacy type for landing page bento grid
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  color: string;
  icon: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  avatar?: string;
  productName: string;
  productSlug: string;
  rating: number;
  verified: boolean;
  date: string;
}
