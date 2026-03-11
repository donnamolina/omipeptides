"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

const SESSION_KEY = "omipeptides-exit-intent-shown";
const SUBSCRIBED_KEY = "email_subscribed";
const AGE_VERIFIED_KEY = "omipeptides-age-verified";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = useCallback(() => {
    setShow(false);
    sessionStorage.setItem(SESSION_KEY, "true");
  }, []);

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth <= 768) return;
    // Already shown this session
    if (sessionStorage.getItem(SESSION_KEY)) return;
    // Already subscribed
    if (localStorage.getItem(SUBSCRIBED_KEY)) return;
    // Age gate not passed yet
    if (!localStorage.getItem(AGE_VERIFIED_KEY)) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem(SESSION_KEY, "true");
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    // Small delay so it doesn't fire immediately on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("email_subscribers")
        .insert({ email: email.trim().toLowerCase() });

      if (error) {
        if (error.code === "23505") {
          // Already subscribed — treat as success
          localStorage.setItem(SUBSCRIBED_KEY, "true");
          setStatus("success");
        } else {
          setErrorMsg("Something went wrong. Please try again.");
          setStatus("error");
        }
        return;
      }

      localStorage.setItem(SUBSCRIBED_KEY, "true");
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-midnight-ink/50 backdrop-blur-sm px-6"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-[var(--shadow-xl)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="text-center py-4">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-coral-punch/10">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--coral-punch)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-midnight-ink">
                  You&apos;re in!
                </h3>
                <p className="mt-2 font-body text-base text-neutral-600">
                  Check your inbox for your 10% code
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-heading text-2xl font-bold text-midnight-ink">
                  Wait — Get 10% Off
                </h2>
                <p className="mt-3 font-body text-base text-neutral-600">
                  Join 2,500+ researchers. Get 10% off your first order + weekly research updates.
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-[var(--radius-md)] border border-neutral-200 bg-white px-4 py-3 font-body text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-coral-punch focus:ring-2 focus:ring-coral-punch/20"
                  />
                  <label className="sr-only">Email address</label>

                  {status === "error" && errorMsg && (
                    <p className="mt-2 text-sm text-error">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-4 w-full rounded-[var(--radius-md)] bg-coral-punch py-3 font-heading text-sm font-bold text-white transition-all hover:shadow-[var(--shadow-lg)] active:scale-[0.98] disabled:opacity-60"
                  >
                    {status === "loading" ? "Submitting..." : "Claim My 10%"}
                  </button>
                </form>

                <button
                  onClick={handleClose}
                  className="mt-3 block w-full text-center font-body text-sm text-neutral-400 transition-colors hover:text-neutral-600"
                >
                  No thanks
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
