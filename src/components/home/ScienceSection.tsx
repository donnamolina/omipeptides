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
      style={{
        textShadow: "0 0 40px rgba(197,245,54,0.3), 0 0 80px rgba(197,245,54,0.12)",
      }}
    >
      0{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated gradient line                                             */
/* ------------------------------------------------------------------ */
function PulseLine({ className }: { className?: string }) {
  return (
    <motion.div
      className={`pointer-events-none absolute h-px ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(197,245,54,0.25) 40%, rgba(197,245,54,0.5) 50%, rgba(197,245,54,0.25) 60%, transparent 100%)",
      }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
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
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/10"
            style={{
              top: `${(i * 37 + 13) % 100}%`,
              left: `${(i * 53 + 7) % 100}%`,
            }}
            animate={{
              y: [0, -12, 0, 10, 0],
              opacity: [0.15, 0.35, 0.15],
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

      {/* ---------- Animated gradient lines ---------- */}
      <PulseLine className="top-[18%] left-[5%] w-[35%]" />
      <PulseLine className="top-[45%] right-[8%] w-[28%]" />
      <PulseLine className="bottom-[22%] left-[12%] w-[40%]" />

      {/* ---------- Vertical pulse accents ---------- */}
      <motion.div
        className="pointer-events-none absolute left-[20%] top-[10%] h-[30%] w-px"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(197,245,54,0.2) 50%, transparent 100%)",
        }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="pointer-events-none absolute right-[15%] bottom-[10%] h-[25%] w-px"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(197,245,54,0.15) 50%, transparent 100%)",
        }}
        animate={{ opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      />

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Headline */}
        <ScrollReveal>
          <h2 className="font-heading text-center text-4xl font-bold tracking-tight text-white md:text-5xl">
            BACKED BY RESEARCH,
            <br />
            <span className="text-electric-lime">NOT HYPE</span>
          </h2>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.15}>
              <div className="group text-center">
                {/* Glow container */}
                <div
                  className="relative inline-flex items-center justify-center rounded-2xl px-6 py-4"
                  style={{
                    boxShadow: "0 0 60px rgba(197,245,54,0.15), 0 0 120px rgba(197,245,54,0.06)",
                  }}
                >
                  {/* Subtle ring pulse behind number */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                      border: "1px solid rgba(197,245,54,0.08)",
                    }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.8,
                    }}
                  />

                  <SpringCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>

                <p className="mt-4 text-sm text-neutral-400">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
