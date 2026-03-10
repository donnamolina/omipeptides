# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Omipeptides — a premium peptide e-commerce site built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4. Brand identity: Coral Punch (#FF5C39) + Electric Lime (#C5F536) on Warm Cream (#FAF7F2) background.

## Commands

- `npm run dev` — Start dev server on port 3000 (Turbopack)
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — Run ESLint

No test framework is configured. If the dev server hangs (Turbopack compilation issue), use `npm run build && npm run start` as a fallback.

## Architecture

### Routing (App Router)

All pages live in `src/app/`. Dynamic routes (`/products/[slug]`, `/blog/[slug]`) use a **server component → client component split**: `page.tsx` is an async server component that awaits `params`, exports `generateMetadata` for SEO, renders JSON-LD structured data, and passes `slug` to a `*Client.tsx` component marked `"use client"`.

Client-only pages (`/products`, `/cart`, `/checkout`) cannot export metadata directly, so they use a sibling `layout.tsx` that exports the metadata and returns `children` unchanged.

Routes: `/`, `/products`, `/products/[slug]`, `/cart`, `/checkout`, `/blog`, `/blog/[slug]`, `/about`, `/terms`, `/privacy`, `/contact`.

### Design System

Defined entirely in `src/app/globals.css` using CSS custom properties. Tailwind CSS v4 connects via `@theme inline` block — **there is no tailwind.config file**. All custom colors, shadows, radii, and animations are declared as CSS variables (e.g., `--coral-punch`, `--shadow-glow`, `--radius-md`).

Three fonts loaded via `next/font/google` in `layout.tsx`:
- **Syne** (`--font-heading`) — display/headings
- **Plus Jakarta Sans** (`--font-body`) — body text
- **JetBrains Mono** (`--font-mono`) — data/science numbers

### State Management

Zustand store in `src/store/cart.ts` with `persist` middleware (localStorage key: `"omipeptides-cart"`). The store holds both cart items and the selected currency (`"USD" | "THB"`).

Uses a `_hydrated` flag with `onRehydrateStorage` callback to prevent hydration mismatches. Any component reading cart state must use a `mounted` state guard:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);
// Render cart count only when mounted
```

Failing to do this breaks client-side navigation entirely.

### Currency System

`formatPrice(amountUSD, currency)` is exported from `src/store/cart.ts`. All prices are stored in USD; THB conversion uses a hardcoded rate (×34). Every price display across the site must use `formatPrice()` — never raw `$${price.toFixed(2)}`.

### Static Data

All product, blog, category, and testimonial data lives in `src/data/` as TypeScript files with helper functions (e.g., `getProductBySlug`, `getProductsByCategory`). Types are in `src/types/index.ts`.

### Key Patterns

- **`cn()` utility** (`src/lib/utils.ts`): merges Tailwind classes via `clsx` + `tailwind-merge`. Use for all conditional class composition.
- **ScrollReveal** (`src/components/shared/ScrollReveal.tsx`): Framer Motion wrapper for scroll-triggered animations. Pass `className="h-full"` when used inside grid layouts.
- **CSS variables for design tokens**: Use `var(--radius-md)`, `var(--shadow-lg)`, etc. in className strings rather than hardcoded values.
- **Path alias**: `@/*` maps to `./src/*`.
- **Images**: Static assets in `public/images/` organized by section. Product images are per-category (`recovery-category.png`), not per-product.
- **SEO**: Root layout sets `metadataBase`, OG defaults, and Twitter card defaults. Per-page metadata is either a static `metadata` export or dynamic `generateMetadata`. Product and blog detail pages include JSON-LD structured data via `<script type="application/ld+json">`.
- **Accessibility**: Global `:focus-visible` styles in globals.css. All icon-only buttons have `aria-label`. Form inputs use visually-hidden labels (`.sr-only` class).
