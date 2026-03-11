import { Product } from "@/types";

export const products: Product[] = [
  // Recovery
  {
    id: "bpc-157",
    name: "BPC-157",
    slug: "bpc-157",
    category: "recovery-healing",
    price: 89.99,
    compareAtPrice: 109.99,
    description:
      "Body Protection Compound-157 is a pentadecapeptide derived from human gastric juice. It has demonstrated remarkable regenerative properties in preclinical studies, with research focusing on tissue repair mechanisms across tendons, ligaments, muscles, and the gastrointestinal tract.",
    shortDescription:
      "Widely studied peptide in tissue repair and gastrointestinal research.",
    scienceDescription:
      "BPC-157 works by upregulating growth factor expression (VEGF, EGF) and promoting angiogenesis — the formation of new blood vessels. It modulates the nitric oxide system and has shown cytoprotective effects on the GI lining in preclinical models. Over 100 preclinical studies support its regenerative profile.",
    benefits: [
      "Studied for tendon and ligament repair mechanisms",
      "Researched for gut lining cytoprotection",
      "Investigated for anti-inflammatory pathways",
      "Shown to promote angiogenesis in preclinical models",
    ],
    dosage: {
      amount: "250-500mcg",
      frequency: "1-2x daily",
      timing: "Morning and/or evening",
      instructions:
        "Reconstitute with bacteriostatic water. Store at 2-8°C. For research use only. Refer to published literature for experimental protocols.",
    },
    images: {
      primary: "/images/products/bpc-157.jpg",
      gallery: ["/images/products/bpc-157.jpg"],
    },
    inStock: true,
    stockLevel: "high",
    tags: ["best-seller", "gut-health", "injury-recovery"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 108,
    rating: 4.9,
    reviewCount: 342,
    relatedSlugs: ["tb-500", "kpv"],
  },
  {
    id: "tb-500",
    name: "TB-500",
    slug: "tb-500",
    category: "recovery-healing",
    price: 79.99,
    description:
      "Thymosin Beta-4 is a naturally occurring peptide found in virtually all human and animal cells. TB-500 is a synthetic version studied for its role in tissue repair signaling, inflammatory response modulation, and cellular migration mechanisms.",
    shortDescription:
      "Research peptide studied for tissue repair and inflammation pathways.",
    scienceDescription:
      "TB-500 upregulates actin, a cell-building protein essential for tissue repair. It promotes cell migration, blood vessel growth, and reduces inflammatory cytokines in preclinical models. Studies show particular interest for cardiac and muscular tissue repair research.",
    benefits: [
      "Researched for tissue repair signaling mechanisms",
      "Studied for inflammatory cytokine modulation",
      "Investigated for cellular migration promotion",
      "Subject of cardiac tissue research",
    ],
    dosage: {
      amount: "2-5mg",
      frequency: "2x per week",
      timing: "Any time of day",
      instructions:
        "Reconstitute with bacteriostatic water. Store at 2-8°C. For research use only. Often studied alongside BPC-157 in preclinical protocols.",
    },
    images: {
      primary: "/images/products/tb-500.jpg",
      gallery: ["/images/products/tb-500.jpg"],
    },
    inStock: true,
    stockLevel: "high",
    tags: ["best-seller", "inflammation", "mobility", "tissue-repair"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 67,
    rating: 4.8,
    reviewCount: 218,
    relatedSlugs: ["bpc-157", "kpv"],
  },
  {
    id: "kpv",
    name: "KPV",
    slug: "kpv",
    category: "recovery-healing",
    price: 69.99,
    description:
      "KPV is a tripeptide derived from alpha-MSH with notable anti-inflammatory properties observed in preclinical research. It targets inflammatory pathways at the cellular level, with particular research interest in gut inflammation and dermatological models.",
    shortDescription:
      "Tripeptide researched for anti-inflammatory pathway modulation.",
    scienceDescription:
      "KPV inhibits NF-κB signaling, one of the master regulators of inflammation. It enters cells and directly modulates inflammatory gene expression. Preclinical studies show efficacy in reducing intestinal inflammation markers in experimental models.",
    benefits: [
      "Researched for NF-κB pathway inhibition",
      "Studied for gut mucosa models",
      "Investigated in dermatological research",
      "Subject of immune response modulation studies",
    ],
    dosage: {
      amount: "200-500mcg",
      frequency: "1-2x daily",
      timing: "With or without food",
      instructions:
        "Available in multiple research formulations. Store at 2-8°C after reconstitution. For research use only.",
    },
    images: {
      primary: "/images/products/kpv.jpg",
      gallery: ["/images/products/kpv.jpg"],
    },
    inStock: true,
    stockLevel: "high",
    tags: ["anti-inflammatory", "gut-health", "skin"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 42,
    rating: 4.7,
    reviewCount: 156,
    relatedSlugs: ["bpc-157", "tb-500"],
  },

  // Anti-Aging
  {
    id: "ghk-cu",
    name: "GHK-Cu",
    slug: "ghk-cu",
    category: "longevity-brain",
    price: 94.99,
    compareAtPrice: 119.99,
    description:
      "GHK-Cu is a naturally occurring copper peptide that declines with age. It is one of the most well-studied peptides in skin cell regeneration mechanisms, wound healing research, and cellular-level aging pathway studies.",
    shortDescription:
      "Research peptide studied for its role in skin cell regeneration mechanisms.",
    scienceDescription:
      "GHK-Cu modulates over 4,000 genes, resetting them toward a healthier expression pattern in research models. It stimulates collagen and elastin synthesis pathways, promotes stem cell activity, and reduces oxidative damage markers. Studies demonstrate it can influence age-related gene expression patterns.",
    benefits: [
      "Studied for collagen and elastin synthesis pathways",
      "Researched for wound healing mechanisms",
      "Investigated for tissue remodeling signaling",
      "Subject of antioxidant and DNA repair research",
    ],
    dosage: {
      amount: "1-2mg",
      frequency: "1x daily",
      timing: "Evening preferred",
      instructions:
        "Reconstitute with bacteriostatic water. Store at 2-8°C. For research use only. Refer to published protocols for experimental applications.",
    },
    images: {
      primary: "/images/products/ghk-cu.jpg",
      gallery: ["/images/products/ghk-cu.jpg"],
    },
    inStock: true,
    stockLevel: "high",
    tags: ["best-seller", "skin", "collagen", "anti-aging"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 134,
    rating: 4.9,
    reviewCount: 287,
    relatedSlugs: ["epithalon", "foxo4-dri"],
  },
  {
    id: "epithalon",
    name: "Epithalon",
    slug: "epithalon",
    category: "longevity-brain",
    price: 119.99,
    description:
      "Epithalon (Epitalon) is a synthetic tetrapeptide researched for its ability to activate telomerase, the enzyme responsible for maintaining telomere length — one of the most fundamental markers studied in biological aging research.",
    shortDescription:
      "Tetrapeptide studied for telomerase activation and telomere biology.",
    scienceDescription:
      "Epithalon activates telomerase in human somatic cells in laboratory settings, directly addressing one of the hallmarks of aging research. In studies by Dr. Vladimir Khavinson, it increased telomere length markers and showed life-extension effects in animal models. It also regulates melatonin production pathways in research settings.",
    benefits: [
      "Researched for telomerase enzyme activation",
      "Studied for telomere length maintenance mechanisms",
      "Investigated for circadian rhythm pathway modulation",
      "Subject of immune function research",
    ],
    dosage: {
      amount: "5-10mg",
      frequency: "1x daily",
      timing: "Evening",
      instructions:
        "Reconstitute with bacteriostatic water. Store at 2-8°C. For research use only. Typical research protocols reference 10-20 day cycles.",
    },
    images: {
      primary: "/images/products/epithalon.jpg",
      gallery: ["/images/products/epithalon.jpg"],
    },
    inStock: true,
    stockLevel: "low",
    tags: ["telomeres", "longevity", "sleep"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 89,
    rating: 4.8,
    reviewCount: 198,
    relatedSlugs: ["ghk-cu", "foxo4-dri"],
  },
  {
    id: "foxo4-dri",
    name: "FOXO4-DRI",
    slug: "foxo4-dri",
    category: "longevity-brain",
    price: 149.99,
    description:
      "FOXO4-DRI is a modified peptide researched for its ability to selectively induce apoptosis in senescent cells while leaving healthy cells unaffected in preclinical models — making it one of the most studied senolytic research compounds.",
    shortDescription:
      "Senolytic research peptide studied for senescent cell clearance.",
    scienceDescription:
      "FOXO4-DRI works by disrupting the FOXO4-p53 interaction that keeps senescent cells alive. By blocking this survival signal, it triggers selective apoptosis of damaged, non-functional cells in research models. Animal studies showed restored fitness markers, fur density, and organ function in aged subjects.",
    benefits: [
      "Researched for selective senescent cell apoptosis",
      "Studied for tissue rejuvenation pathways",
      "Investigated for organ function in aging models",
      "Subject of senolytic combination studies",
    ],
    dosage: {
      amount: "5mg/kg",
      frequency: "3x per week",
      timing: "Morning",
      instructions:
        "Reconstitute with bacteriostatic water. Store at 2-8°C. For research use only. Advanced research compound — refer to published protocols.",
    },
    images: {
      primary: "/images/products/foxo4-dri.jpg",
      gallery: ["/images/products/foxo4-dri.jpg"],
    },
    inStock: true,
    stockLevel: "low",
    tags: ["senolytic", "longevity", "advanced"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 23,
    rating: 4.7,
    reviewCount: 94,
    relatedSlugs: ["epithalon", "ghk-cu"],
  },

  // Performance
  {
    id: "cjc-1295",
    name: "CJC-1295",
    slug: "cjc-1295",
    category: "growth-hormone-anti-aging",
    price: 99.99,
    compareAtPrice: 124.99,
    description:
      "CJC-1295 is a synthetic analog of growth hormone-releasing hormone (GHRH) studied for its ability to stimulate sustained, pulsatile release of growth hormone in research models. Frequently researched alongside Ipamorelin for synergistic effects.",
    shortDescription:
      "Research compound studied for growth hormone secretagogue activity.",
    scienceDescription:
      "CJC-1295 with DAC (Drug Affinity Complex) extends its half-life to 6-8 days, providing sustained GH elevation in research models. It works by mimicking GHRH at the pituitary, stimulating natural GH secretion patterns. Studies show 200-1000% increases in GH output without desensitization in experimental settings.",
    benefits: [
      "Researched for growth hormone secretion pathways",
      "Studied for lean mass metabolism mechanisms",
      "Investigated for fat metabolism pathways",
      "Subject of recovery and sleep cycle research",
    ],
    dosage: {
      amount: "100mcg",
      frequency: "1x daily",
      timing: "Evening",
      instructions:
        "Reconstitute with bacteriostatic water. Store at 2-8°C. For research use only. Frequently studied alongside Ipamorelin in published protocols.",
    },
    images: {
      primary: "/images/products/cjc-1295.jpg",
      gallery: ["/images/products/cjc-1295.jpg"],
    },
    inStock: true,
    stockLevel: "high",
    tags: ["best-seller", "growth-hormone", "muscle", "fat-loss"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 76,
    rating: 4.9,
    reviewCount: 412,
    relatedSlugs: ["ipamorelin", "tesamorelin"],
  },
  {
    id: "ipamorelin",
    name: "Ipamorelin",
    slug: "ipamorelin",
    category: "growth-hormone-anti-aging",
    price: 84.99,
    description:
      "Ipamorelin is a selective growth hormone secretagogue studied for its ability to stimulate GH release without significantly affecting cortisol or prolactin levels — making it one of the most selective GH research peptides available.",
    shortDescription:
      "Selective GH secretagogue studied for targeted growth hormone release.",
    scienceDescription:
      "Ipamorelin acts on the ghrelin receptor (GHS-R) in the pituitary to trigger GH release in research models. Unlike other GH secretagogues, it does not stimulate cortisol, ACTH, or prolactin at comparable doses. This selectivity profile makes it a preferred compound in growth hormone research.",
    benefits: [
      "Researched for selective GH release mechanisms",
      "Studied for body composition pathways",
      "Investigated for sleep cycle research",
      "Notable selectivity profile in research models",
    ],
    dosage: {
      amount: "200-300mcg",
      frequency: "2-3x daily",
      timing: "Morning and evening",
      instructions:
        "Reconstitute with bacteriostatic water. Store at 2-8°C. For research use only. Most commonly studied alongside CJC-1295 in research protocols.",
    },
    images: {
      primary: "/images/products/ipamorelin.jpg",
      gallery: ["/images/products/ipamorelin.jpg"],
    },
    inStock: true,
    stockLevel: "high",
    tags: ["best-seller", "growth-hormone", "sleep", "body-composition"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 58,
    rating: 4.8,
    reviewCount: 326,
    relatedSlugs: ["cjc-1295", "tesamorelin"],
  },
  {
    id: "tesamorelin",
    name: "Tesamorelin",
    slug: "tesamorelin",
    category: "growth-hormone-anti-aging",
    price: 129.99,
    description:
      "Tesamorelin is a GHRH analog extensively studied in clinical trials for its effects on visceral adipose tissue. It has the most extensive human clinical trial data of any GHRH analog currently available for research.",
    shortDescription:
      "GHRH analog with extensive clinical trial data on visceral fat research.",
    scienceDescription:
      "Tesamorelin stimulates pituitary GH release with documented effects on visceral adipose tissue (VAT) in clinical trials. In Phase III clinical trials, it reduced trunk fat by 15-18% and improved lipid profiles. It is the only GHRH analog with this level of human clinical trial documentation.",
    benefits: [
      "Extensive clinical trial data on visceral fat pathways",
      "Studied for lipid profile mechanisms",
      "Researched for IGF-1 pathway activation",
      "Most clinically documented GHRH analog",
    ],
    dosage: {
      amount: "2mg",
      frequency: "1x daily",
      timing: "Morning",
      instructions:
        "Reconstitute with bacteriostatic water. Store at 2-8°C. For research use only. Clinical trial protocols reference 12-26 week study periods.",
    },
    images: {
      primary: "/images/products/tesamorelin.jpg",
      gallery: ["/images/products/tesamorelin.jpg"],
    },
    inStock: true,
    stockLevel: "high",
    tags: ["best-seller", "fat-loss", "clinical-grade", "visceral-fat"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 94,
    rating: 4.9,
    reviewCount: 267,
    relatedSlugs: ["cjc-1295", "aod-9604"],
  },

  // Weight Management
  {
    id: "aod-9604",
    name: "AOD-9604",
    slug: "aod-9604",
    category: "glp1-weight-loss",
    price: 74.99,
    description:
      "AOD-9604 is a modified fragment of human growth hormone (HGH fragment 177-191) studied specifically for fat metabolism pathways without the growth-promoting effects observed with full HGH in research models.",
    shortDescription:
      "HGH fragment researched for targeted fat metabolism mechanisms.",
    scienceDescription:
      "AOD-9604 stimulates lipolysis (fat breakdown) and inhibits lipogenesis (fat accumulation) by mimicking the fat-reducing region of HGH in research models. Importantly, it does not affect blood sugar or tissue growth pathways. It has received GRAS status from the FDA for oral formulations.",
    benefits: [
      "Researched for lipolysis stimulation mechanisms",
      "Studied for lipogenesis inhibition pathways",
      "No observed effects on blood sugar or growth pathways",
      "FDA GRAS status for oral formulations",
    ],
    dosage: {
      amount: "300mcg",
      frequency: "1x daily",
      timing: "Morning",
      instructions:
        "Reconstitute with bacteriostatic water. Store at 2-8°C. For research use only. Refer to published literature for experimental protocols.",
    },
    images: {
      primary: "/images/products/aod-9604.jpg",
      gallery: ["/images/products/aod-9604.jpg"],
    },
    inStock: true,
    stockLevel: "high",
    tags: ["fat-loss", "body-composition", "safe-profile"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 45,
    rating: 4.7,
    reviewCount: 189,
    relatedSlugs: ["5-amino-1mq", "mots-c"],
  },
  {
    id: "5-amino-1mq",
    name: "5-Amino-1MQ",
    slug: "5-amino-1mq",
    category: "glp1-weight-loss",
    price: 89.99,
    description:
      "5-Amino-1MQ is a small molecule that blocks NNMT, a key enzyme in fat cell metabolism. Research demonstrates that inhibiting NNMT shifts adipocyte activity from lipid storage toward energy expenditure pathways.",
    shortDescription:
      "NNMT inhibitor researched for adipocyte metabolism modulation.",
    scienceDescription:
      "5-Amino-1MQ is a selective NNMT (nicotinamide N-methyltransferase) inhibitor. NNMT is overexpressed in adipose tissue and contributes to metabolic dysfunction. Inhibiting it increases NAD+ and SAM levels in adipocytes, affecting fat cell size and energy expenditure in preclinical models. Studies show significant weight changes without dietary modification in animal models.",
    benefits: [
      "Researched for NNMT enzyme inhibition",
      "Studied for cellular energy expenditure mechanisms",
      "Investigated for adipocyte size modulation",
      "Subject of NAD+ metabolism research",
    ],
    dosage: {
      amount: "50-100mg",
      frequency: "1-2x daily",
      timing: "Morning",
      instructions:
        "Oral research compound. Store at room temperature in a dry place. For research use only.",
    },
    images: {
      primary: "/images/products/5-amino-1mq.jpg",
      gallery: ["/images/products/5-amino-1mq.jpg"],
    },
    inStock: true,
    stockLevel: "high",
    tags: ["metabolism", "fat-loss", "oral"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 28,
    rating: 4.6,
    reviewCount: 143,
    relatedSlugs: ["aod-9604", "mots-c"],
  },
  {
    id: "mots-c",
    name: "MOTS-c",
    slug: "mots-c",
    category: "glp1-weight-loss",
    price: 109.99,
    description:
      "MOTS-c is a mitochondrial-derived peptide studied as an exercise mimetic — research demonstrates AMPK activation and improved metabolic homeostasis in preclinical models.",
    shortDescription:
      "Mitochondrial peptide researched for AMPK pathway activation.",
    scienceDescription:
      "MOTS-c is encoded in the mitochondrial genome and acts as a cellular signaling molecule. It activates AMPK (the master metabolic switch), improves glucose uptake, and enhances fatty acid oxidation in research models. It has been shown to prevent diet-induced obesity in animal models and is frequently referenced as an exercise mimetic in published literature.",
    benefits: [
      "Researched for AMPK metabolic pathway activation",
      "Studied for insulin sensitivity mechanisms",
      "Investigated for fatty acid oxidation pathways",
      "Subject of exercise mimetic research",
    ],
    dosage: {
      amount: "5-10mg",
      frequency: "3-5x per week",
      timing: "Morning",
      instructions:
        "Reconstitute with bacteriostatic water. Store at 2-8°C. For research use only. Refer to published protocols for experimental dosing.",
    },
    images: {
      primary: "/images/products/mots-c.jpg",
      gallery: ["/images/products/mots-c.jpg"],
    },
    inStock: true,
    stockLevel: "low",
    tags: ["metabolism", "exercise-mimetic", "mitochondrial"],
    purity: "99.7%",
    thirdPartyTested: true,
    studiesCount: 36,
    rating: 4.8,
    reviewCount: 112,
    relatedSlugs: ["aod-9604", "5-amino-1mq"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.tags.includes("best-seller"));
}
