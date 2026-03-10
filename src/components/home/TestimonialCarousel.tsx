"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { Testimonial } from "@/types";

const AUTO_ADVANCE_MS = 5000;
const SWIPE_THRESHOLD = 50;

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
    scale: 0.96,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    scale: 0.96,
  }),
};

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgressKey((k) => k + 1);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setProgressKey((k) => k + 1);
    }, AUTO_ADVANCE_MS);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      resetTimer();
    },
    [current, resetTimer]
  );

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    resetTimer();
  }, [resetTimer]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
    resetTimer();
  }, [resetTimer]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD) {
        next();
      } else if (info.offset.x > SWIPE_THRESHOLD) {
        prev();
      }
    },
    [next, prev]
  );

  const t = testimonials[current];

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="font-heading text-center text-4xl font-bold tracking-tight text-midnight-ink md:text-5xl">
            TRUSTED BY RESEARCHERS
          </h2>
        </ScrollReveal>

        <div className="relative mt-16">
          {/* Card */}
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-surface-white p-8 md:p-12 shadow-[var(--shadow-sm)]">
            {/* Quote icon watermark */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute top-4 left-4 h-24 w-24 text-coral-punch/[0.06] md:h-32 md:w-32"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M30 60c-8.3 0-15-6.7-15-15s6.7-15 15-15c1.2 0 2.3.2 3.4.4C31.2 22.8 24.4 18 18 18v-8c14.4 0 27 11.6 27 26 0 13.3-6.7 24-15 24zm40 0c-8.3 0-15-6.7-15-15s6.7-15 15-15c1.2 0 2.3.2 3.4.4C71.2 22.8 64.4 18 58 18v-8c14.4 0 27 11.6 27 26 0 13.3-6.7 24-15 24z" />
            </svg>

            {/* Subtle dot pattern background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, currentColor 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.35, ease: "easeInOut" },
                  x: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                  scale: { duration: 0.4, ease: "easeOut" },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                className="relative z-10 cursor-grab text-center active:cursor-grabbing"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-coral-punch text-coral-punch"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mt-6 text-lg leading-relaxed text-neutral-600 md:text-xl italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="mt-6">
                  <p className="font-heading text-sm font-bold text-midnight-ink">
                    {t.author}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {t.productName} ·{" "}
                    {t.verified && "Verified Buyer"}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-surface-white shadow-[var(--shadow-md)] transition-colors hover:bg-neutral-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-midnight-ink" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-surface-white shadow-[var(--shadow-md)] transition-colors hover:bg-neutral-100"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-midnight-ink" />
          </button>

          {/* Dots with progress bar */}
          <div className="mt-6 flex justify-center items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden ${
                  i === current
                    ? "w-8 bg-coral-punch/25"
                    : "w-2 bg-neutral-200 hover:bg-neutral-400"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                {i === current && (
                  <motion.span
                    key={progressKey}
                    className="absolute inset-y-0 left-0 rounded-full bg-coral-punch"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: AUTO_ADVANCE_MS / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
