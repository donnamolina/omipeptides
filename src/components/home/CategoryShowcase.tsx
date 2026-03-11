"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { categories } from "@/data/categories";

const gridSpans = [
  "md:col-span-7", // Recovery — wider left
  "md:col-span-5", // Anti-Aging — narrower right
  "md:col-span-5", // Performance — narrower left
  "md:col-span-7", // Weight Mgmt — wider right
];

const MotionLink = motion.create(Link);

export default function CategoryShowcase() {
  return (
    <section
      className="py-24 lg:py-32 px-6 lg:px-8"
      style={{ overflow: "visible" }}
    >
      <div className="mx-auto max-w-7xl" style={{ overflow: "visible" }}>
        <ScrollReveal>
          <h2 className="font-heading text-center text-4xl font-bold tracking-tight text-midnight-ink md:text-5xl">
            FIND YOUR PROTOCOL
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-neutral-600">
            Explore our research-grade peptide catalog organized by area of
            scientific investigation.
          </p>
        </ScrollReveal>

        <div
          className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12"
          style={{ gridAutoRows: "auto", overflow: "visible" }}
        >
          {categories.map((category, i) => (
            <div key={category.id} className={gridSpans[i]}>
              <ScrollReveal delay={i * 0.15} className="h-full">
                <CategoryCard category={category} />
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
}: {
  category: (typeof categories)[number];
}) {
  return (
    <MotionLink
      href={`/products?category=${category.slug}`}
      className="group relative block rounded-[var(--radius-lg)] border border-stone bg-soft-sand p-8 pb-12"
      style={{
        minHeight: "240px",
      }}
      initial={false}
      whileHover={{
        y: -8,
        boxShadow: "0 0 40px rgba(197,245,54,0.25), 0 8px 24px rgba(45,38,32,0.10)",
        transition: { duration: 0.35, ease: "easeOut" },
      }}
    >
      {/* Animated gradient border — rotates on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: "1px",
          background: `linear-gradient(
            var(--border-angle, 0deg),
            rgba(197,245,54,0.6),
            transparent 40%,
            transparent 60%,
            rgba(197,245,54,0.6)
          )`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          animation: "border-rotate 3s linear infinite",
        }}
      />

      {/* Spacer to push content down */}
      <div className="h-24 md:h-32" />

      <h3 className="font-heading text-2xl font-bold leading-relaxed text-midnight-ink md:text-3xl">
        {category.name}
      </h3>
      <p className="mt-2 text-sm text-neutral-600">{category.tagline}</p>

      {/* Explore arrow — slides right on hover */}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-midnight-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </MotionLink>
  );
}
