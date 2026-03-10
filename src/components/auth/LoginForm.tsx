"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const callbackError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    callbackError === "callback_failed"
      ? "Authentication failed. Please try again."
      : ""
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-[var(--radius-lg)] border border-neutral-200 bg-surface-white p-8 shadow-[var(--shadow-md)]">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-midnight-ink">
          Log In
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Welcome back. Sign in to your account.
        </p>

        {error && (
          <div className="mt-6 rounded-[var(--radius-md)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-coral-punch transition-colors hover:text-coral-punch/80"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-[var(--radius-md)] bg-coral-punch text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-coral-punch transition-colors hover:text-coral-punch/80"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
