"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Activity, Dumbbell } from "lucide-react";

export interface Protocol {
  id: string;
  protocolType: "wellness" | "recovery" | "athletic";
  title: string;
  dose: string;
  frequency: string;
  duration: string;
  description: string;
}

const tabs = [
  { key: "wellness" as const, label: "Wellness", Icon: Heart },
  { key: "recovery" as const, label: "Recovery", Icon: Activity },
  { key: "athletic" as const, label: "Athletic", Icon: Dumbbell },
];

export default function ResearchProtocols({
  protocols,
  productName,
}: {
  protocols: Protocol[];
  productName: string;
}) {
  const [activeTab, setActiveTab] = useState<"wellness" | "recovery" | "athletic">("wellness");

  const activeProtocol = protocols.find((p) => p.protocolType === activeTab);

  if (protocols.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
          Research Protocols
        </p>
        <h2 className="mt-2 font-heading text-2xl font-bold text-midnight-ink">
          Suggested Dosage Guidelines
        </h2>
        <p className="mt-2 text-base text-neutral-600">
          Select your research goal to view the recommended protocol. All dosages are for research reference only.
        </p>
      </div>

      {/* Tab selector */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {tabs.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`inline-flex items-center gap-2 rounded-[var(--radius-full)] px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === key
                ? "bg-midnight-ink text-white"
                : "border border-stone bg-surface-white text-midnight-ink hover:opacity-70"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Protocol card */}
      <AnimatePresence mode="wait">
        {activeProtocol && (
          <motion.div
            key={activeProtocol.protocolType}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="rounded-[var(--radius-lg)] border border-stone bg-surface-white p-6 md:p-8"
          >
            {/* Title row */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-midnight-ink">
                {activeTab === "wellness" && <Heart className="h-5 w-5 text-white" />}
                {activeTab === "recovery" && <Activity className="h-5 w-5 text-white" />}
                {activeTab === "athletic" && <Dumbbell className="h-5 w-5 text-white" />}
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-midnight-ink">
                  {activeProtocol.title}
                </h3>
                <p className="text-sm text-warm-gray">for {productName}</p>
              </div>
            </div>

            {/* Stat boxes */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
              <div className="rounded-[var(--radius-md)] bg-soft-sand p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">Dose</p>
                <p className="mt-1 font-heading text-xl font-semibold text-midnight-ink">
                  {activeProtocol.dose}
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] bg-soft-sand p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">Frequency</p>
                <p className="mt-1 font-heading text-xl font-semibold text-midnight-ink">
                  {activeProtocol.frequency}
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] bg-soft-sand p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">Duration</p>
                <p className="mt-1 font-heading text-xl font-semibold text-midnight-ink">
                  {activeProtocol.duration}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-neutral-600 mb-6">
              {activeProtocol.description}
            </p>

            {/* Divider */}
            <div className="h-px bg-stone mb-4" />

            {/* Disclaimer */}
            <p className="text-sm italic text-warm-gray">
              ⚠️ These dosages are provided for research reference only. Not medical advice. Consult applicable regulations in your jurisdiction.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
