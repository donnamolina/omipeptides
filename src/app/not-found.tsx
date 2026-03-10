import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-warm-cream px-6">
      <span className="font-mono text-8xl font-bold text-neutral-200">
        404
      </span>
      <h1 className="mt-4 font-heading text-2xl font-bold text-midnight-ink">
        Page Not Found
      </h1>
      <p className="mt-2 text-neutral-600">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-coral-punch px-8 text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-lg)]"
      >
        Back to Home
      </Link>
    </main>
  );
}
