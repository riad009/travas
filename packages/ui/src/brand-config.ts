// Aqurion Brand Configuration
// Central source of truth for all Aqurion properties brand data

export interface BrandConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  altDomains?: string[];
  tier: 1 | 2 | 3;
  category: string;
  accentColor: string;
  gradient: string;
  icon: string;
  launchDate?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

export const AQURION_BRANDS: BrandConfig[] = [
  // ── TIER 1: Corporate & Primary Brand ──────────────────────────
  {
    id: "aqurion-holdings",
    name: "Aqurion Holdings",
    tagline: "Building the Future of Digital Business",
    description:
      "Aqurion Holdings is the parent company driving innovation across technology, finance, marketing, and beyond. We build world-class digital platforms and services.",
    domain: "Aqurion.NET",
    tier: 1,
    category: "Corporate",
    accentColor: "#6C63FF",
    gradient: "linear-gradient(135deg, #0F0C29 0%, #302B63 50%, #24243E 100%)",
    icon: "◈",
  },
  {
    id: "aqurion-ai",
    name: "Aqurion AI",
    tagline: "Intelligence Without Limits",
    description:
      "Aqurion AI delivers cutting-edge artificial intelligence solutions that transform businesses. From machine learning to generative AI, we power the next era of intelligent automation.",
    domain: "Aqurion.AI",
    tier: 1,
    category: "Technology",
    accentColor: "#00D4FF",
    gradient: "linear-gradient(135deg, #000428 0%, #004E92 100%)",
    icon: "◎",
  },
  {
    id: "aqurion-dev",
    name: "Aqurion Development",
    tagline: "Code That Scales. Products That Win.",
    description:
      "Aqurion Development is a full-service software development firm specializing in web, mobile, and enterprise platforms. We turn ideas into market-ready products.",
    domain: "AqurionDev.com",
    tier: 1,
    category: "Technology",
    accentColor: "#00FF88",
    gradient: "linear-gradient(135deg, #0A0A0A 0%, #0D1B2A 50%, #1B4332 100%)",
    icon: "⬡",
  },
  {
    id: "travis-roque-soto",
    name: "Travis Roque Soto",
    tagline: "Entrepreneur. Innovator. Visionary.",
    description:
      "Travis Roque Soto is a serial entrepreneur and technology executive driving the Aqurion ecosystem. Find his portfolio, insights, and entrepreneurial journey here.",
    domain: "TravisRoqueSoto.ME",
    tier: 1,
    category: "Personal",
    accentColor: "#F5A623",
    gradient: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
    icon: "⬟",
  },
  {
    id: "aqurion-sa",
    name: "Aqurion South America",
    tagline: "Connecting Latin America to the Digital Economy",
    description:
      "Aqurion South America bridges the gap between global digital innovation and Latin American markets, providing localized technology solutions for the region.",
    domain: "AqurionSA.LAT",
    altDomains: ["AqurionSA.CO"],
    tier: 1,
    category: "Regional",
    accentColor: "#FFD700",
    gradient: "linear-gradient(135deg, #0D0D0D 0%, #1A0A2E 50%, #2D1B69 100%)",
    icon: "◉",
  },

  // ── TIER 2: Business Divisions ──────────────────────────────────
  {
    id: "aqurion-marketing",
    name: "Aqurion Marketing",
    tagline: "Amplify Your Brand. Accelerate Growth.",
    description:
      "Aqurion Marketing is a full-service digital marketing agency providing SEO, social media, paid advertising, content strategy, and brand development.",
    domain: "AqurionMarketing.com",
    altDomains: ["Aqurion.click"],
    tier: 2,
    category: "Marketing",
    accentColor: "#FF6B6B",
    gradient: "linear-gradient(135deg, #1A0A0A 0%, #2D1515 50%, #FF6B6B22 100%)",
    icon: "◆",
  },
  {
    id: "aqurion-financial",
    name: "Aqurion Financial",
    tagline: "Smart Capital. Smarter Future.",
    description:
      "Aqurion Financial provides innovative fintech solutions, investment services, and financial technology platforms for businesses and individuals.",
    domain: "AqurionFi.com",
    tier: 2,
    category: "Finance",
    accentColor: "#4ECDC4",
    gradient: "linear-gradient(135deg, #0A1A1A 0%, #0D2626 50%, #4ECDC422 100%)",
    icon: "◇",
  },
  {
    id: "aqurion-directory",
    name: "Aqurion Directory",
    tagline: "Every Business. One Place.",
    description:
      "Aqurion Pages is the comprehensive business directory platform connecting consumers with verified local and national businesses across all industries.",
    domain: "AqurionPages.com",
    altDomains: ["Aqurion.Shop", "Aqurion.directory"],
    tier: 2,
    category: "Directory",
    accentColor: "#A78BFA",
    gradient: "linear-gradient(135deg, #0D0A1A 0%, #1A1230 50%, #A78BFA22 100%)",
    icon: "⬡",
  },
  {
    id: "aqurion-marketplace",
    name: "Aqurion Stores",
    tagline: "Buy. Sell. Thrive.",
    description:
      "AqurionMarketplace is the premier e-commerce platform for businesses to create and manage online stores, reach millions of customers, and grow revenue.",
    domain: "AqurionMarketplace.com",
    altDomains: ["Aqurion.store"],
    tier: 2,
    category: "Commerce",
    accentColor: "#F59E0B",
    gradient: "linear-gradient(135deg, #1A1400 0%, #2D2200 50%, #F59E0B22 100%)",
    icon: "◈",
  },
  {
    id: "aqurion-sales",
    name: "Aqurion Sales",
    tagline: "Close More. Earn More.",
    description:
      "Aqurion Sales delivers cutting-edge CRM tools, sales automation, and lead generation solutions to help businesses convert prospects into loyal customers.",
    domain: "AqurionSales.com",
    tier: 2,
    category: "Sales",
    accentColor: "#10B981",
    gradient: "linear-gradient(135deg, #0A1A12 0%, #0D261A 50%, #10B98122 100%)",
    icon: "◉",
  },
  {
    id: "aqurion-ps",
    name: "Property Services",
    tagline: "Real Estate. Reimagined.",
    description:
      "Aqurion Property Services provides technology-driven real estate solutions including property management, listings, tenant portals, and investment analytics.",
    domain: "AqurionPS.com",
    tier: 2,
    category: "Real Estate",
    accentColor: "#3B82F6",
    gradient: "linear-gradient(135deg, #0A0E1A 0%, #0D1626 50%, #3B82F622 100%)",
    icon: "⬟",
  },

  // ── TIER 3: Industry Verticals ──────────────────────────────────
  {
    id: "aqurion-home",
    name: "Home Services",
    tagline: "Your Home. Our Expertise.",
    description:
      "Aqurion Home connects homeowners with top-rated professionals for every home service need — from repairs and renovation to cleaning and landscaping.",
    domain: "AqurionHome.com",
    tier: 3,
    category: "Home Services",
    accentColor: "#F97316",
    gradient: "linear-gradient(135deg, #1A0E00 0%, #261500 50%, #F9731622 100%)",
    icon: "⌂",
  },
  {
    id: "aqurion-atm",
    name: "Automotive",
    tagline: "Drive Smarter. Service Better.",
    description:
      "AqurionATM powers the automotive industry with digital tools for dealerships, repair shops, and consumers — from inventory management to service booking.",
    domain: "AqurionATM.com",
    tier: 3,
    category: "Automotive",
    accentColor: "#EF4444",
    gradient: "linear-gradient(135deg, #1A0A0A 0%, #260D0D 50%, #EF444422 100%)",
    icon: "⚙",
  },
  {
    id: "aqurion-file",
    name: "Professional Services",
    tagline: "Expertise On Demand.",
    description:
      "AqurionFile connects clients with verified legal, accounting, consulting, and professional service providers with streamlined scheduling and document management.",
    domain: "AqurionFile.com",
    tier: 3,
    category: "Professional Services",
    accentColor: "#8B5CF6",
    gradient: "linear-gradient(135deg, #0E0A1A 0%, #160D26 50%, #8B5CF622 100%)",
    icon: "◻",
  },
  {
    id: "aqurion-leisure",
    name: "Travel & Leisure",
    tagline: "Explore Without Limits.",
    description:
      "AqurionLeisure is your gateway to unforgettable travel experiences, leisure activities, and curated adventure packages around the globe.",
    domain: "AqurionLeisure.com",
    tier: 3,
    category: "Travel",
    accentColor: "#06B6D4",
    gradient: "linear-gradient(135deg, #000E1A 0%, #001626 50%, #06B6D422 100%)",
    icon: "◎",
  },
  {
    id: "aqurion-travel",
    name: "Aqurion TravelSuite",
    tagline: "Complete Travel Management, Redefined.",
    description:
      "AqurionTravel is a comprehensive travel management platform for both corporate and leisure travelers — booking, itinerary management, and expense tracking in one suite.",
    domain: "AqurionTravel.com",
    tier: 3,
    category: "Travel Technology",
    accentColor: "#0EA5E9",
    gradient: "linear-gradient(135deg, #000A14 0%, #00121E 50%, #0EA5E922 100%)",
    icon: "✦",
  },
  {
    id: "aqurion-wellness",
    name: "Fitness & Wellness",
    tagline: "Live Well. Move More.",
    description:
      "AqurionWellness connects fitness enthusiasts with gyms, trainers, wellness coaches, and health services. Your personalized path to a healthier life starts here.",
    domain: "AqurionWellness.com",
    tier: 3,
    category: "Health & Wellness",
    accentColor: "#22C55E",
    gradient: "linear-gradient(135deg, #001A0A 0%, #002614 50%, #22C55E22 100%)",
    icon: "◈",
  },
  {
    id: "aqurion-animal",
    name: "Animal Services",
    tagline: "Because They Deserve the Best.",
    description:
      "AqurionAnimal is the premier platform for pet owners, breeders, and veterinary professionals — connecting animals with the care, products, and services they need.",
    domain: "AqurionAnimal.com",
    tier: 3,
    category: "Animal Services",
    accentColor: "#84CC16",
    gradient: "linear-gradient(135deg, #0A1400 0%, #121E00 50%, #84CC1622 100%)",
    icon: "⬡",
  },
  {
    id: "aqurion-services",
    name: "Security & Municipal Services",
    tagline: "Safety. Reliability. Community.",
    description:
      "AqurionServices powers security, utility, and municipal service providers with digital platforms for scheduling, dispatch, compliance, and citizen engagement.",
    domain: "AqurionServices.com",
    tier: 3,
    category: "Security & Municipal",
    accentColor: "#64748B",
    gradient: "linear-gradient(135deg, #0A0C0E 0%, #141820 50%, #64748B22 100%)",
    icon: "◇",
  },
  {
    id: "aqurion-burser",
    name: "Education & Non-Profit",
    tagline: "Empower. Educate. Elevate.",
    description:
      "AqurionBurser serves educational institutions, associations, and non-profits with digital tools for membership management, fundraising, learning platforms, and administration.",
    domain: "AqurionBurser.com",
    tier: 3,
    category: "Education & Non-Profit",
    accentColor: "#EC4899",
    gradient: "linear-gradient(135deg, #1A0010 0%, #260016 50%, #EC489922 100%)",
    icon: "◆",
  },
  {
    id: "aqurion-fintech-lab",
    name: "Fintech Lab & Internships",
    tagline: "Learn. Launch. Lead.",
    description:
      "AqurionFintechLab is the gateway for the next generation of tech and finance professionals — internships, mentorship programs, and hands-on fintech experience.",
    domain: "AqurionFintechLab.com",
    tier: 3,
    category: "Education & Career",
    accentColor: "#7C3AED",
    gradient: "linear-gradient(135deg, #0D0A1A 0%, #160D2A 50%, #7C3AED22 100%)",
    icon: "⬟",
  },
  {
    id: "aqurion-hospitality",
    name: "Hospitality Services",
    tagline: "Exceptional Experiences, Every Stay.",
    description:
      "AqurionHospitality provides digital solutions for hotels, restaurants, event venues, and hospitality businesses to deliver 5-star experiences at every touchpoint.",
    domain: "AqurionHospitality.com",
    tier: 3,
    category: "Hospitality",
    accentColor: "#D97706",
    gradient: "linear-gradient(135deg, #1A1000 0%, #261800 50%, #D9770622 100%)",
    icon: "◉",
  },
  {
    id: "aqurion-rc",
    name: "Retail & Commerce",
    tagline: "Retail Transformed.",
    description:
      "AqurionRC empowers retail businesses with omnichannel commerce solutions, inventory management, POS systems, and consumer analytics for the modern marketplace.",
    domain: "AqurionRC.com",
    tier: 3,
    category: "Retail",
    accentColor: "#F43F5E",
    gradient: "linear-gradient(135deg, #1A0008 0%, #260010 50%, #F43F5E22 100%)",
    icon: "◈",
  },
  {
    id: "aqurion-creative",
    name: "Design & Creative",
    tagline: "Where Vision Becomes Reality.",
    description:
      "AqurionCreative is a premier creative studio offering graphic design, branding, UI/UX, video production, and digital content creation for brands that demand excellence.",
    domain: "AqurionCreative.com",
    tier: 3,
    category: "Creative",
    accentColor: "#A855F7",
    gradient: "linear-gradient(135deg, #0D0014 0%, #16001E 50%, #A855F722 100%)",
    icon: "✦",
  },
];

export function getBrandById(id: string): BrandConfig | undefined {
  return AQURION_BRANDS.find((b) => b.id === id);
}

export function getBrandsByTier(tier: 1 | 2 | 3): BrandConfig[] {
  return AQURION_BRANDS.filter((b) => b.tier === tier);
}

export const AQURION_HOLDING_BRAND = AQURION_BRANDS[0]!;
