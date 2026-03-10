"use client";

import { Beaker, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ScrollReveal from "@/components/shared/ScrollReveal";

const steps = [
  {
    number: "01",
    icon: Beaker,
    title: "Choose Your Protocol",
    description:
      "Browse our catalog of research-grade peptides across recovery, anti-aging, performance, and metabolic research categories.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Follow the Science",
    description:
      "Every product page includes referenced clinical research, published protocols, and mechanism-of-action breakdowns.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Analyze the Results",
    description:
      "With 99.7% purity and third-party testing, every batch meets rigorous analytical standards. Quality verified by independent labs.",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      {/* Step number */}
      <motion.span
        className="font-mono text-6xl font-bold text-neutral-200"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.15 }}
      >
        {step.number}
      </motion.span>

      {/* Icon circle */}
      <motion.div
        className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-coral-punch/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.15 + 0.1 }}
      >
        <step.icon className="h-7 w-7 text-coral-punch" />
      </motion.div>

      {/* Title & description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
      >
        <h3 className="mt-6 font-heading text-xl font-bold text-midnight-ink">
          {step.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="font-heading text-center text-4xl font-bold tracking-tight text-midnight-ink md:text-5xl">
            HOW IT WORKS
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
