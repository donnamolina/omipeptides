export type ProductCategory = 'recovery' | 'anti-aging' | 'performance' | 'weight-management';

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
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
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
