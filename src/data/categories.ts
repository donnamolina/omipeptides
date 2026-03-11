import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "recovery",
    name: "Recovery",
    slug: "recovery-healing",
    description:
      "Peptides studied for their role in tissue repair mechanisms, inflammatory response modulation, and gastrointestinal research.",
    tagline: "Advanced tissue repair research.",
    color: "#4ECDC4",
    icon: "Heart",
    productCount: 3,
  },
  {
    id: "anti-aging",
    name: "Anti-Aging",
    slug: "longevity-brain",
    description:
      "Peptides investigated for cellular repair pathways, collagen synthesis mechanisms, and telomere biology research.",
    tagline: "Cellular longevity research.",
    color: "#C49CFF",
    icon: "Sparkles",
    productCount: 3,
  },
  {
    id: "performance",
    name: "Performance",
    slug: "growth-hormone-anti-aging",
    description:
      "Peptides researched for growth hormone secretagogue activity, lean mass metabolism, and physical performance pathways.",
    tagline: "Performance optimization research.",
    color: "#FF8A5C",
    icon: "Zap",
    productCount: 3,
  },
  {
    id: "weight-management",
    name: "Weight Management",
    slug: "glp1-weight-loss",
    description:
      "Peptides studied for fat metabolism mechanisms, AMPK pathway activation, and metabolic homeostasis research.",
    tagline: "Metabolic pathway research.",
    color: "#7ED957",
    icon: "Scale",
    productCount: 3,
  },
];
