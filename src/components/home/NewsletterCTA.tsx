"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";

function ConfettiDots() {
  const dots = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * 360;
    const distance = 40 + Math.random() * 60;
    const size = 4 + Math.random() * 5;
    const colors = ["#FF5C39", "#C5F536", "#0F1A2E", "#FF5C39", "#C5F536"];
    const color = colors[i % colors.length];
    const delay = Math.random() * 0.15;
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;

    return (
      <motion.span
        key={i}
        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        animate={{
          opacity: [1, 1, 0],
          x: [0, x * 0.6, x],
          y: [0, y * 0.6, y],
          scale: [1, 1.2, 0],
        }}
        transition={{
          duration: 0.7,
          delay,
          ease: "easeOut",
        }}
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          top: "50%",
          left: "50%",
          marginTop: -size / 2,
          marginLeft: -size / 2,
          pointerEvents: "none",
        }}
      />
    );
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      {dots}
    </div>
  );
}

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 px-6 lg:px-8">
      {/* Keyframe animations */}
      <style>{`
        @keyframes gradientBreathe {
          0% {
            background-position: 0% 50%;
            opacity: 0.6;
          }
          25% {
            opacity: 0.9;
          }
          50% {
            background-position: 100% 50%;
            opacity: 1;
          }
          75% {
            opacity: 0.9;
          }
          100% {
            background-position: 0% 50%;
            opacity: 0.6;
          }
        }
        @keyframes buttonGlow {
          0%, 100% {
            box-shadow: 0 0 8px 0 rgba(197, 245, 54, 0.3),
                         0 0 20px 0 rgba(197, 245, 54, 0.1);
          }
          50% {
            box-shadow: 0 0 16px 4px rgba(197, 245, 54, 0.5),
                         0 0 40px 8px rgba(197, 245, 54, 0.15);
          }
        }
      `}</style>

      {/* Animated breathing gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,92,57,0.08) 0%, #FAF7F2 30%, rgba(197,245,54,0.08) 50%, #FAF7F2 70%, rgba(255,92,57,0.08) 100%)",
          backgroundSize: "300% 300%",
          animation: "gradientBreathe 8s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-midnight-ink md:text-5xl">
            JOIN THE PEPTIDE
            <br />
            REVOLUTION
          </h2>
          <p className="mt-4 text-neutral-600">
            Get 10% off your first order + weekly research updates.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  scale: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  },
                }}
                className="relative mt-8 flex items-center justify-center gap-2 text-ocean-teal"
              >
                <motion.div
                  className="relative flex items-center justify-center gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 12,
                    delay: 0.1,
                  }}
                >
                  <div className="relative">
                    <CheckCircle className="h-6 w-6" />
                    <ConfettiDots />
                  </div>
                  <span className="font-medium">
                    Welcome to the revolution. Check your inbox.
                  </span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0"
              >
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-13 flex-1 rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-5 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(197,245,54,0.4)] sm:rounded-r-none sm:border-r-0"
                />
                <button
                  type="submit"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-midnight-ink px-6 text-sm font-semibold text-white transition-all hover:bg-midnight-ink/90 active:scale-[0.98] sm:rounded-l-none"
                  style={{
                    animation: "buttonGlow 2.5s ease-in-out infinite",
                  }}
                >
                  Subscribe <Send className="h-4 w-4" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
