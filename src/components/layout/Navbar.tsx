"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, ChevronDown, LogOut, User, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore, type Currency } from "@/store/cart";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const categories = [
  { label: "GLP-1 / Weight Loss", href: "/products?category=glp1-weight-loss" },
  { label: "Recovery & Healing", href: "/products?category=recovery-healing" },
  { label: "Growth Hormone / Anti-Aging", href: "/products?category=growth-hormone-anti-aging" },
  { label: "Longevity & Brain", href: "/products?category=longevity-brain" },
  { label: "Skin & Beauty", href: "/products?category=skin-beauty" },
  { label: "Metabolic & Other", href: "/products?category=metabolic-other" },
  { label: "Blends & Stacks", href: "/products?category=blends-stacks" },
  { label: "Accessories & Supplies", href: "/products?category=accessories-supplies" },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const currency = useCartStore((s) => s.currency);
  const setCurrency = useCartStore((s) => s.setCurrency);
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const catRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayCount = mounted ? itemCount : 0;

  const userDisplayName = user
    ? user.user_metadata?.full_name?.split(" ")[0] ||
      user.email?.charAt(0).toUpperCase() ||
      "U"
    : null;

  const userInitial = user
    ? (user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()
    : null;

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    setMobileOpen(false);
    router.refresh();
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-warm-cream/80 backdrop-blur-xl shadow-[0_1px_0_rgba(232,224,216,0.8)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center">
            {/* Logo */}
            <Link href="/" className="shrink-0 group flex items-center gap-2">
              <span className="font-heading text-2xl font-extrabold tracking-tight text-midnight-ink">
                OMI
                <span className="text-coral-punch">PEPTIDES</span>
              </span>
            </Link>

            {/* Desktop Nav — centered */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-8">
              <NavLink href="/">Home</NavLink>

              {/* Shop Dropdown */}
              <div ref={catRef} className="relative">
                <button
                  onClick={() => setCatOpen(!catOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-neutral-600 transition-opacity hover:opacity-70"
                >
                  Shop
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-300",
                      catOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {catOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 rounded-[var(--radius-lg)] border border-neutral-200 bg-white p-2 shadow-[var(--shadow-lg)]"
                    >
                      <Link
                        href="/products"
                        onClick={() => setCatOpen(false)}
                        className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold text-midnight-ink transition-opacity hover:opacity-70"
                      >
                        All Products
                      </Link>
                      <div className="my-1 h-px bg-neutral-200" />
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setCatOpen(false)}
                          className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm text-neutral-600 transition-opacity hover:opacity-70"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink href="/blog">Research</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>

            {/* Right Side */}
            <div className="ml-auto md:ml-0 shrink-0 flex items-center gap-3">
              {/* Shop Now CTA */}
              <Link
                href="/products"
                className="hidden md:inline-flex h-10 items-center justify-center rounded-[var(--radius-md)] bg-coral-punch px-5 text-sm font-semibold text-white transition-opacity hover:opacity-80 active:opacity-70"
              >
                Shop Now
              </Link>

              {/* Auth: Log In link or User Menu */}
              {mounted && (
                <>
                  {user ? (
                    <div ref={userMenuRef} className="relative hidden md:block">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm font-medium text-neutral-600 transition-opacity hover:opacity-70"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral-punch text-[11px] font-semibold text-white">
                          {userInitial}
                        </span>
                        <span className="max-w-[80px] truncate">{userDisplayName}</span>
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-300",
                            userMenuOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {userMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            className="absolute right-0 top-full mt-3 w-48 rounded-[var(--radius-md)] border border-neutral-200 bg-white/95 backdrop-blur-lg p-2 shadow-[var(--shadow-lg)]"
                          >
                            <Link
                              href="/account"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm text-neutral-600 transition-opacity hover:opacity-70"
                            >
                              <User className="h-4 w-4" />
                              My Account
                            </Link>
                            <Link
                              href="/account/orders"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm text-neutral-600 transition-opacity hover:opacity-70"
                            >
                              <Package className="h-4 w-4" />
                              My Orders
                            </Link>
                            <div className="my-1 h-px bg-neutral-200" />
                            <button
                              onClick={handleSignOut}
                              className="flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm text-neutral-600 transition-opacity hover:opacity-70"
                            >
                              <LogOut className="h-4 w-4" />
                              Log Out
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="hidden md:inline-flex text-sm font-medium text-neutral-600 transition-opacity hover:opacity-70"
                    >
                      Log In
                    </Link>
                  )}
                </>
              )}

              {/* Currency Toggle — dropdown on mobile, toggle on desktop */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="flex md:hidden h-10 rounded-[var(--radius-md)] border border-neutral-200 bg-transparent px-2 text-xs font-semibold text-neutral-600 outline-none"
                aria-label="Select currency"
              >
                <option value="USD">US$</option>
                <option value="DOP">RD$</option>
              </select>
              <button
                onClick={() => setCurrency(currency === "USD" ? "DOP" : "USD")}
                className="hidden md:flex h-10 items-center gap-1 rounded-[var(--radius-md)] border border-neutral-200 px-2.5 text-xs font-semibold text-neutral-600 transition-opacity hover:opacity-70"
                title={`Switch to ${currency === "USD" ? "Dominican Pesos" : "US Dollar"}`}
                aria-label={`Currency: ${currency}. Switch to ${currency === "USD" ? "Dominican Pesos" : "US Dollar"}`}
              >
                <span className={cn("transition-opacity", currency === "USD" ? "opacity-100" : "opacity-40")}>US$</span>
                <span className="text-neutral-300">/</span>
                <span className={cn("transition-opacity", currency === "DOP" ? "opacity-100" : "opacity-40")}>RD$</span>
              </button>

              <button
                onClick={openCart}
                aria-label="Shopping cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] transition-colors hover:bg-neutral-100"
              >
                <ShoppingBag className="h-5 w-5 text-midnight-ink" />
                <AnimatePresence>
                  {displayCount > 0 && (
                    <motion.span
                      key={displayCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-coral-punch text-[10px] font-bold text-white"
                    >
                      {displayCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] md:hidden hover:bg-neutral-100 transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5 text-midnight-ink" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5 text-midnight-ink" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-midnight-ink/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 bg-warm-cream p-8 pt-24 shadow-[var(--shadow-xl)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-5">
                <MobileNavLink href="/" onClick={() => setMobileOpen(false)}>
                  Home
                </MobileNavLink>
                {/* Mobile Shop Accordion */}
                <div>
                  <button
                    onClick={() => setMobileCatOpen(!mobileCatOpen)}
                    className="flex w-full items-center justify-between font-heading text-2xl font-bold text-midnight-ink transition-opacity hover:opacity-70"
                  >
                    Shop
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        mobileCatOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileCatOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 flex flex-col gap-3 pl-4 border-l-2 border-coral-punch/20">
                          <Link
                            href="/products"
                            onClick={() => setMobileOpen(false)}
                            className="text-base font-semibold text-midnight-ink transition-opacity hover:opacity-70"
                          >
                            All Products
                          </Link>
                          {categories.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-base font-medium text-neutral-600 transition-opacity hover:opacity-70"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <MobileNavLink href="/blog" onClick={() => setMobileOpen(false)}>
                  Research
                </MobileNavLink>
                <MobileNavLink href="/about" onClick={() => setMobileOpen(false)}>
                  About
                </MobileNavLink>

                <div className="mt-2 h-px bg-neutral-200" />

                <MobileNavLink href="/cart" onClick={() => setMobileOpen(false)}>
                  Cart {displayCount > 0 && `(${displayCount})`}
                </MobileNavLink>

                {/* Mobile Auth Links */}
                {mounted && (
                  <>
                    {user ? (
                      <>
                        <MobileNavLink href="/account" onClick={() => setMobileOpen(false)}>
                          My Account
                        </MobileNavLink>
                        <MobileNavLink href="/account/orders" onClick={() => setMobileOpen(false)}>
                          My Orders
                        </MobileNavLink>
                        <button
                          onClick={handleSignOut}
                          className="text-left font-heading text-2xl font-bold text-neutral-600 transition-opacity hover:opacity-70"
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <MobileNavLink href="/auth/login" onClick={() => setMobileOpen(false)}>
                        Log In
                      </MobileNavLink>
                    )}
                  </>
                )}

                <Link
                  href="/products"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-coral-punch text-sm font-semibold text-white transition-opacity hover:opacity-80 active:opacity-70"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-neutral-600 transition-opacity hover:opacity-70"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="font-heading text-2xl font-bold text-midnight-ink transition-opacity hover:opacity-70"
    >
      {children}
    </Link>
  );
}
