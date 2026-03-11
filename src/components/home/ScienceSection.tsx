"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Stat data                                                          */
/* ------------------------------------------------------------------ */
const stats = [
  { value: 500, suffix: "+", label: "Clinical Studies Referenced", decimals: 0 },
  { value: 99.7, suffix: "%", label: "Purity Guaranteed", decimals: 1 },
  { value: 100, suffix: "%", label: "Third-Party Tested", decimals: 0 },
];

/* ------------------------------------------------------------------ */
/*  Inline animated counter (Framer Motion spring-based)               */
/* ------------------------------------------------------------------ */
function SpringCounter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 25, mass: 1 });
  const display = useTransform(springVal, (v) => `${v.toFixed(decimals)}${suffix}`);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, motionVal, target]);

  /* Subscribe to display changes and write to the DOM directly for perf */
  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return unsubscribe;
  }, [display]);

  return (
    <span
      ref={ref}
      className="relative inline-block font-mono text-5xl font-bold text-white md:text-6xl"
    >
      0{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function ScienceSection() {
  return (
    <section className="relative overflow-hidden bg-midnight-ink py-24 lg:py-32 px-6 lg:px-8">
      {/* ---------- Floating particles (deterministic) ---------- */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/[0.05]"
            style={{
              top: `${(i * 37 + 13) % 100}%`,
              left: `${(i * 53 + 7) % 100}%`,
            }}
            animate={{
              y: [0, -12, 0, 10, 0],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{
              duration: 6 + (i * 17) % 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i * 11) % 4,
            }}
          />
        ))}
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Headline */}
        <ScrollReveal>
          <h2 className="font-heading text-center text-4xl font-bold tracking-tight text-white md:text-5xl">
            BACKED BY RESEARCH,
            <br />
            <span className="text-coral-punch">NOT HYPE</span>
          </h2>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:mt-24">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.15}>
              <div className="text-center">
                <SpringCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
                <p className="mt-4 text-sm text-neutral-400">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
