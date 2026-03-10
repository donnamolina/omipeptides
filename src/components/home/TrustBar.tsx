"use client";

import { Shield, FlaskConical, Award, Users } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const trustItems = [
  {
    icon: Shield,
    label: "Third-Party Tested",
  },
  {
    icon: FlaskConical,
    label: "99.7% Purity",
  },
  {
    icon: Award,
    label: "500+ Studies Referenced",
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-100 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-6">
            {/* Counter headline */}
            <p className="text-center text-sm font-medium text-neutral-600">
              Trusted by{" "}
              <span className="font-mono font-semibold text-midnight-ink">
                <AnimatedCounter target={10000} suffix="+" />
              </span>{" "}
              <span className="inline-flex items-center gap-1">
                <Users className="inline h-4 w-4" /> researchers
              </span>
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {trustItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-neutral-600"
                >
                  <item.icon className="h-5 w-5 text-ocean-teal" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
