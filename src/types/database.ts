export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category: "glp1-weight-loss" | "recovery-healing" | "growth-hormone-anti-aging" | "longevity-brain" | "skin-beauty" | "metabolic-other" | "blends-stacks" | "accessories-supplies";
          price: number;
          compare_at_price: number | null;
          description: string;
          short_description: string;
          science_description: string;
          benefits: string[];
          dosage: {
            amount: string;
            frequency: string;
            timing: string;
            instructions: string;
          };
          image_primary: string;
          image_gallery: string[];
          in_stock: boolean;
          stock_level: "high" | "low" | "out" | null;
          tags: string[];
          purity: string;
          third_party_tested: boolean;
          studies_count: number;
          rating: number;
          review_count: number;
          related_slugs: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          category: "glp1-weight-loss" | "recovery-healing" | "growth-hormone-anti-aging" | "longevity-brain" | "skin-beauty" | "metabolic-other" | "blends-stacks" | "accessories-supplies";
          price: number;
          compare_at_price?: number | null;
          description: string;
          short_description: string;
          science_description: string;
          benefits: string[];
          dosage: {
            amount: string;
            frequency: string;
            timing: string;
            instructions: string;
          };
          image_primary: string;
          image_gallery?: string[];
          in_stock?: boolean;
          stock_level?: "high" | "low" | "out" | null;
          tags?: string[];
          purity: string;
          third_party_tested?: boolean;
          studies_count?: number;
          rating?: number;
          review_count?: number;
          related_slugs?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          category?: "glp1-weight-loss" | "recovery-healing" | "growth-hormone-anti-aging" | "longevity-brain" | "skin-beauty" | "metabolic-other" | "blends-stacks" | "accessories-supplies";
          price?: number;
          compare_at_price?: number | null;
          description?: string;
          short_description?: string;
          science_description?: string;
          benefits?: string[];
          dosage?: {
            amount: string;
            frequency: string;
            timing: string;
            instructions: string;
          };
          image_primary?: string;
          image_gallery?: string[];
          in_stock?: boolean;
          stock_level?: "high" | "low" | "out" | null;
          tags?: string[];
          purity?: string;
          third_party_tested?: boolean;
          studies_count?: number;
          rating?: number;
          review_count?: number;
          related_slugs?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          address_line1: string | null;
          address_line2: string | null;
          city: string | null;
          state: string | null;
          zip: string | null;
          country: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          zip?: string | null;
          country?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          zip?: string | null;
          country?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
          subtotal: number;
          shipping: number;
          tax: number;
          total: number;
          discount_code: string | null;
          discount_amount: number | null;
          shipping_address: {
            full_name: string;
            address_line1: string;
            address_line2?: string;
            city: string;
            state: string;
            zip: string;
            country: string;
          };
          stripe_payment_intent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
          subtotal: number;
          shipping: number;
          tax: number;
          total: number;
          discount_code?: string | null;
          discount_amount?: number | null;
          shipping_address: {
            full_name: string;
            address_line1: string;
            address_line2?: string;
            city: string;
            state: string;
            zip: string;
            country: string;
          };
          stripe_payment_intent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
          subtotal?: number;
          shipping?: number;
          tax?: number;
          total?: number;
          discount_code?: string | null;
          discount_amount?: number | null;
          shipping_address?: {
            full_name: string;
            address_line1: string;
            address_line2?: string;
            city: string;
            state: string;
            zip: string;
            country: string;
          };
          stripe_payment_intent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_slug: string;
          product_image: string;
          price: number;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_slug: string;
          product_image: string;
          price: number;
          quantity: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          product_slug?: string;
          product_image?: string;
          price?: number;
          quantity?: number;
          created_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          category: string;
          author_name: string;
          author_avatar: string;
          author_bio: string;
          author_role: string;
          featured_image: string;
          published_at: string;
          updated_at: string | null;
          read_time: number;
          tags: string[];
          related_slugs: string[];
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          category: string;
          author_name: string;
          author_avatar: string;
          author_bio: string;
          author_role: string;
          featured_image: string;
          published_at?: string;
          updated_at?: string | null;
          read_time: number;
          tags?: string[];
          related_slugs?: string[];
          published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          category?: string;
          author_name?: string;
          author_avatar?: string;
          author_bio?: string;
          author_role?: string;
          featured_image?: string;
          published_at?: string;
          updated_at?: string | null;
          read_time?: number;
          tags?: string[];
          related_slugs?: string[];
          published?: boolean;
          created_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          author: string;
          avatar: string | null;
          product_name: string;
          product_slug: string;
          rating: number;
          verified: boolean;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote: string;
          author: string;
          avatar?: string | null;
          product_name: string;
          product_slug: string;
          rating: number;
          verified?: boolean;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          quote?: string;
          author?: string;
          avatar?: string | null;
          product_name?: string;
          product_slug?: string;
          rating?: number;
          verified?: boolean;
          date?: string;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          display_order: number;
          parent_landing_category: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          display_order?: number;
          parent_landing_category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          display_order?: number;
          parent_landing_category?: string | null;
          created_at?: string;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          size_label: string;
          price: number;
          compare_at_price: number | null;
          in_stock: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          size_label: string;
          price: number;
          compare_at_price?: number | null;
          in_stock?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          size_label?: string;
          price?: number;
          compare_at_price?: number | null;
          in_stock?: boolean;
          display_order?: number;
          created_at?: string;
        };
      };
      waitlist: {
        Row: {
          id: string;
          email: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          product_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
