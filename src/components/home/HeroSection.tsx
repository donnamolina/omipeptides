"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, FlaskConical, Gift, QrCode, Users } from "lucide-react";

const rotatingWords = [
  { text: "UPGRADE", color: "#FF5C39" },
  { text: "RECOVERY", color: "#A0522D" },
  { text: "EVOLUTION", color: "#D4913A" },
  { text: "ADVANTAGE", color: "#C75B7A" },
];

const headlineWords = ["YOUR", "BODY'S", "NEXT"];

const wordPullUpVariants = {
  hidden: { y: 40, opacity: 0, filter: "blur(8px)" },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: i * 0.2,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentWord = rotatingWords[wordIndex];

  const subheadlineDelay = 0.8;
  const ctaDelay = 1.0;

  return (
    <section className="relative flex min-h-[calc(100vh-280px)] items-center justify-center overflow-x-clip bg-warm-cream px-4 sm:px-6 lg:px-8 pt-20 pb-0 -mt-8">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute h-[800px] w-[800px] rounded-full bg-coral-punch/[0.10] blur-[120px]"
          style={{
            top: "5%",
            right: "-10%",
            animation: "meshDrift1 16s ease-in-out infinite",
          }}
        />
        <div
          className="absolute h-[700px] w-[700px] rounded-full bg-electric-lime/[0.12] blur-[120px]"
          style={{
            bottom: "0%",
            left: "-5%",
            animation: "meshDrift2 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute h-[500px] w-[500px] rounded-full bg-ocean-teal/[0.08] blur-[100px]"
          style={{
            top: "30%",
            left: "40%",
            animation: "meshDrift3 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute h-[400px] w-[400px] rounded-full bg-coral-punch/[0.08] blur-[100px]"
          style={{
            bottom: "20%",
            right: "20%",
            animation: "meshDrift4 18s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Headline with word-by-word staggered pull-up reveal */}
        <div>
          <div className="font-heading text-[clamp(2.5rem,8vw,8rem)] font-extrabold leading-[0.9] tracking-tight text-midnight-ink">
            <div className="flex flex-wrap items-center justify-center gap-x-[0.3em]">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block"
                  custom={i}
                  variants={wordPullUpVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Rotating word with blur transition — same font size as headline */}
          <div className="relative h-[clamp(2.5rem,8vw,8rem)]">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord.text}
                className="absolute inset-0 flex items-center justify-center font-heading text-[clamp(2.5rem,8vw,8rem)] font-extrabold leading-[0.9] tracking-tight"
                style={{ color: currentWord.color }}
                initial={{ y: 80, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -80, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {currentWord.text}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Subheadline */}
        <motion.p
          className="mx-auto mt-8 max-w-xl text-lg text-neutral-600 md:text-xl"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: subheadlineDelay }}
        >
          Research-grade peptides. 99.7% purity. Janoshik verified. Shipped worldwide.
        </motion.p>

        {/* Social proof */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-neutral-600"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: subheadlineDelay + 0.2 }}
        >
          <Users className="h-4 w-4 text-coral-punch" />
          <span>
            Trusted by <span className="font-mono font-semibold text-midnight-ink">2,500+</span> researchers worldwide
          </span>
        </motion.div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <motion.div
            className="w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: ctaDelay }}
          >
            <Link
              href="/products"
              className="inline-flex h-14 w-full min-w-[200px] items-center justify-center rounded-[var(--radius-md)] bg-coral-punch px-10 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-lg)] active:scale-[0.98] sm:w-auto"
            >
              Shop Peptides
            </Link>
          </motion.div>
          <motion.div
            className="w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: ctaDelay + 0.15 }}
          >
            <Link
              href="/blog"
              className="inline-flex h-12 w-full items-center justify-center rounded-[var(--radius-md)] border-2 border-coral-punch/60 px-8 text-sm font-semibold text-coral-punch transition-all hover:bg-coral-punch hover:text-white active:scale-[0.98] sm:w-auto"
            >
              Learn the Science
            </Link>
          </motion.div>
        </div>

        {/* Trust line */}
        <motion.p
          className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-neutral-600"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: ctaDelay + 0.4 }}
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-coral-punch" />
            Third-Party Tested
          </span>
          <span className="text-neutral-300">·</span>
          <span className="inline-flex items-center gap-1.5">
            <FlaskConical className="h-4 w-4 text-coral-punch" />
            99.7% Purity
          </span>
          <span className="text-neutral-300">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Gift className="h-4 w-4 text-coral-punch" />
            Free BAC Water $150+
          </span>
          <span className="text-neutral-300">·</span>
          <span className="inline-flex items-center gap-1.5">
            <QrCode className="h-4 w-4 text-coral-punch" />
            Janoshik Verified
          </span>
        </motion.p>
      </div>

    </section>
  );
}
