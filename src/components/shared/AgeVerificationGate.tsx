"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "omipeptides-age-verified";

export default function AgeVerificationGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY);
    if (!verified) {
      setShow(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
  };

  const handleDeny = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-midnight-ink/80 backdrop-blur-md px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full max-w-md rounded-[var(--radius-lg)] bg-surface-white p-8 text-center shadow-[var(--shadow-xl)]"
          >
            {/* Logo */}
            <span className="font-heading text-2xl font-extrabold tracking-tight text-midnight-ink">
              OMI<span className="text-coral-punch">PEPTIDES</span>
            </span>

            <h2 className="mt-6 font-heading text-xl font-bold text-midnight-ink">
              Age Verification Required
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              You must be 18 years or older to access this website.
            </p>
            <p className="mt-2 text-xs text-neutral-400">
              All products are intended for laboratory and research use only.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleConfirm}
                className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-coral-punch px-6 text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)] active:scale-[0.98]"
              >
                I am 18+ — Enter Site
              </button>
              <button
                onClick={handleDeny}
                className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] border-2 border-neutral-200 px-6 text-sm font-semibold text-neutral-600 transition-all hover:border-neutral-300 hover:bg-neutral-100 active:scale-[0.98]"
              >
                I am under 18
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
