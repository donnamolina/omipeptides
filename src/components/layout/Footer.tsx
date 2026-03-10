"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const footerLinks = {
  shop: [
    { href: "/products?category=recovery", label: "Recovery" },
    { href: "/products?category=anti-aging", label: "Anti-Aging" },
    { href: "/products?category=performance", label: "Performance" },
    { href: "/products?category=weight-management", label: "Weight Management" },
  ],
  learn: [
    { href: "/blog", label: "Research Hub" },
    { href: "/blog/peptide-stacking-guide", label: "Stacking Guide" },
  ],
  legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/contact", label: "Contact Us" },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <footer className="bg-midnight-ink text-neutral-200" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <span className="font-heading text-2xl font-extrabold tracking-tight text-white">
              OMI<span className="text-coral-punch">PEPTIDES</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Premium research-grade peptides. Third-party tested.
              Certificate of Analysis with every order.
            </p>
          </motion.div>

          {/* Shop */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-neutral-400">
              Shop
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Learn */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-neutral-400">
              Learn
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-neutral-400">
              Legal
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 border-t border-white/10 pt-8"
        >
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-neutral-400">
            Disclaimer: Products are sold strictly for laboratory and research use only. Not for human consumption, medical, or veterinary use. Not FDA approved. No therapeutic claims made. Must be 18+ to purchase.
          </p>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-neutral-400">
              &copy; {new Date().getFullYear()} Omipeptides. All rights reserved.
            </p>
            <p className="text-xs text-neutral-400">
              All products are for research purposes only.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-sm text-neutral-300 transition-colors duration-300 hover:text-electric-lime"
    >
      <span className="inline-block h-px w-0 bg-electric-lime transition-all duration-300 group-hover:w-3" />
      {children}
    </Link>
  );
}
