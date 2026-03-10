import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the base URL for the site. Works in both server and client contexts.
 * Priority: NEXT_PUBLIC_SITE_URL > VERCEL_URL > window.location.origin > localhost
 */
export function getSiteUrl(): string {
  // Explicit site URL (set in env)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Vercel preview/production deploys
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  // Client-side fallback
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // Local dev fallback
  return "http://localhost:3000";
}
