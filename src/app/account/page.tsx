"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { User, Package, ChevronRight, Check, AlertCircle, Loader2 } from "lucide-react";

export default function AccountPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredCurrency, setPreferredCurrency] = useState("USD");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      setUserEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name ?? "");
        setPhone(profile.phone ?? "");
        setPreferredCurrency(profile.preferred_currency ?? "USD");
        setStreet(profile.street ?? "");
        setCity(profile.city ?? "");
        setState(profile.state ?? "");
        setZip(profile.zip ?? "");
        setCountry(profile.country ?? "");
      }

      setLoading(false);
    }

    loadProfile();
  }, [mounted]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setFeedback({ type: "error", message: "You must be logged in to save changes." });
        setSaving(false);
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: fullName || null,
          phone: phone || null,
          preferred_currency: preferredCurrency,
          street: street || null,
          city: city || null,
          state: state || null,
          zip: zip || null,
          country: country || null,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        setFeedback({ type: "error", message: error.message });
      } else {
        setFeedback({ type: "success", message: "Profile updated successfully." });
      }
    } catch {
      setFeedback({ type: "error", message: "An unexpected error occurred." });
    } finally {
      setSaving(false);
    }
  }

  if (!mounted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-warm-cream pt-20" />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-warm-cream pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-midnight-ink">
              MY ACCOUNT
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Manage your profile, shipping address, and preferences.
            </p>
          </div>

          {/* Navigation tabs */}
          <div className="mb-8 flex gap-2">
            <Link
              href="/account"
              className="flex items-center gap-2 rounded-[var(--radius-md)] bg-coral-punch/10 px-4 py-2.5 text-sm font-semibold text-coral-punch"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
            <Link
              href="/account/orders"
              className="flex items-center gap-2 rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-midnight-ink"
            >
              <Package className="h-4 w-4" />
              Orders
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-coral-punch" />
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-8">
              {/* Feedback */}
              {feedback && (
                <div
                  className={`flex items-center gap-3 rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium ${
                    feedback.type === "success"
                      ? "bg-[#22C55E]/10 text-[#22C55E]"
                      : "bg-[#EF4444]/10 text-[#EF4444]"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <Check className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  )}
                  {feedback.message}
                </div>
              )}

              {/* Personal Info */}
              <section className="rounded-[var(--radius-lg)] border border-neutral-200 bg-white p-6 shadow-[var(--shadow-md)]">
                <h2 className="font-heading text-lg font-bold text-midnight-ink">
                  Personal Information
                </h2>
                <p className="mt-1 text-xs text-neutral-400">
                  {userEmail}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Preferred Currency
                    </label>
                    <select
                      value={preferredCurrency}
                      onChange={(e) => setPreferredCurrency(e.target.value)}
                      className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="DOP">DOP (RD$)</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="rounded-[var(--radius-lg)] border border-neutral-200 bg-white p-6 shadow-[var(--shadow-md)]">
                <h2 className="font-heading text-lg font-bold text-midnight-ink">
                  Shipping Address
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="123 Peptide Lane"
                      className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Santo Domingo"
                      className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      State / Province
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="10110"
                      className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Country
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Dominican Republic"
                      className="h-12 w-full rounded-[var(--radius-md)] border border-neutral-200 bg-surface-white px-4 text-sm text-midnight-ink outline-none transition-shadow placeholder:text-neutral-400 focus:shadow-[0_0_0_2px_rgba(255,92,57,0.3)]"
                    />
                  </div>
                </div>
              </section>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="h-12 rounded-[var(--radius-md)] bg-coral-punch px-8 text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
