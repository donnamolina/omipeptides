"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getSiteUrl } from "@/lib/utils";

export default function SignupForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${getSiteUrl()}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // If email confirmation is required, the user will have identities as empty
    // or the session will be null. Show a confirmation message in that case.
    if (data.user && data.user.identities?.length === 0) {
      setError("An account with this email already exists.");
      setLoading(false);
      return;
    }

    if (data.session) {
      // Email confirmation disabled — user is signed in immediately
      router.push("/");
      router.refresh();
    } else {
      // Email confirmation enabled — show success message
      setSuccess(true);
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-[var(--radius-lg)] border border-neutral-200 bg-surface-white p-8 shadow-[var(--shadow-md)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-electric-lime/20">
            <svg
              className="h-7 w-7 text-midnight-ink"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold text-midnight-ink">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            We sent a confirmation link to{" "}
            <span className="font-medium text-midnight-ink">{email}</span>.
            Click the link to activate your account.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-block text-sm font-semibold text-coral-punch transition-colors hover:text-coral-punch/80"
          >
            Back to log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-[var(--radius-lg)] border border-neutral-200 bg-surface-white p-8 shadow-[var(--shadow-md)]">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-midnight-ink">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Join Omipeptides and explore research-grade peptides.
        </p>

        {error && (
          <div className="mt-6 rounded-[var(--radius-md)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="mb-1.5 block text-sm font-medium text-midnight-ink"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Smith"
              className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-midnight-ink"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-midnight-ink"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-midnight-ink"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-[var(--radius-md)] bg-coral-punch text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-coral-punch transition-colors hover:text-coral-punch/80"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
