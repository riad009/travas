"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Rv({ children, d = 0 }: { children: React.ReactNode; d?: number }) {
  return <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: d, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

const heroStats = [
  { val: "200+", label: "Projects Delivered" },
  { val: "$500M+", label: "Platform Value" },
  { val: "50+", label: "Enterprise Clients" },
  { val: "12+", label: "Industries" },
  { val: "99.9%", label: "Uptime SLA" },
];

const painPoints = [
  "Vendors over-promise and under-deliver — scope creep, missed deadlines, and ballooning budgets are the norm, not the exception.",
  "Technology choices are made by salespeople, not engineers. You end up with a stack that won't scale.",
  "Communication gaps between business teams and developers lead to products that technically work but don't solve the actual problem.",
  "Post-launch support evaporates. The development partner moves on, your product stalls.",
  "Security, compliance, and accessibility are treated as afterthoughts — until they become audit findings.",
  "Dev teams build custom solutions for problems that already have proven, maintainable solutions.",
  "Internal teams lack the bandwidth for innovation because they're buried in maintenance and tech debt.",
  "White-label partners deliver generic templates that don't differentiate your offering in any meaningful way.",
  "Government contracts require compliance standards that most dev shops can't meet — and don't understand.",
];

const capabilities = [
  { icon: "🌐", title: "Full-Stack Web Development", desc: "Enterprise web applications, SaaS platforms, progressive web apps, and internal tools.", tech: "React, Next.js, Vue, Angular, Node.js, Python, Go, .NET" },
  { icon: "📱", title: "Mobile App Development", desc: "Native iOS/Android and cross-platform apps for consumer, enterprise, and government.", tech: "React Native, Flutter, Swift, Kotlin, Xamarin" },
  { icon: "🧠", title: "AI / ML Engineering", desc: "Custom AI models, NLP systems, computer vision, recommendation engines, and predictive analytics.", tech: "TensorFlow, PyTorch, scikit-learn, OpenAI, LangChain, Hugging Face" },
  { icon: "☁️", title: "Cloud & DevOps", desc: "Cloud architecture, migration, CI/CD pipelines, container orchestration, and infrastructure as code.", tech: "AWS, Azure, GCP, Kubernetes, Docker, Terraform, GitHub Actions" },
  { icon: "🔗", title: "API Development & Integration", desc: "RESTful and GraphQL APIs, microservices architecture, legacy system integration, and iPaaS.", tech: "Node.js, Go, Python, gRPC, GraphQL, Swagger/OpenAPI" },
  { icon: "🗄️", title: "Data Engineering & Analytics", desc: "Data pipelines, warehousing, real-time analytics, BI dashboards, and data lake architecture.", tech: "Snowflake, BigQuery, Apache Spark, Kafka, Airflow, dbt" },
  { icon: "🔒", title: "Cybersecurity Engineering", desc: "Security architecture, penetration testing, compliance engineering, and incident response.", tech: "OWASP, NIST, SOC 2, FedRAMP, SIEM, Zero Trust" },
  { icon: "🛒", title: "E-Commerce & Marketplace", desc: "Custom e-commerce platforms, marketplace development, and headless commerce solutions.", tech: "Shopify Plus, Medusa, Saleor, Stripe, Oracle Merchant Services" },
  { icon: "⛓️", title: "Blockchain & Web3", desc: "Smart contracts, DeFi protocols, NFT platforms, and enterprise blockchain solutions.", tech: "Solidity, Rust, Ethereum, Polygon, Solana, IPFS" },
  { icon: "🤖", title: "IoT & Embedded Systems", desc: "Connected device platforms, edge computing, sensor networks, and industrial IoT.", tech: "Arduino, Raspberry Pi, MQTT, AWS IoT, Azure IoT Hub" },
];

const govCapabilities = {
  federal: ["FedRAMP compliance engineering", "FISMA/NIST 800-53 implementation", "Section 508 accessibility (WCAG 2.1 AA)", "IL4/IL5 development for DoD", "PIV/CAC authentication", "ATO documentation and management", "Continuous monitoring systems"],
  stateLocal: ["State-specific compliance", "Citizen portal development", "GIS and mapping", "Emergency management systems", "Permitting and licensing", "Public records management"],
  vehicles: ["GSA MAS (Schedule 70)", "SEWP V", "CIO-SP3/SP4", "STARS III", "Alliant 2/3", "8(a) STARS III"],
};

const whiteLabelPartners = [
  { type: "Marketing & Design Agencies", desc: "Deliver custom web and mobile applications under your brand — from MVP to enterprise scale." },
  { type: "Management Consultancies", desc: "Extend technology implementation capabilities to your strategic advisory engagements." },
  { type: "System Integrators", desc: "Add custom development capacity to your integration projects without hiring." },
  { type: "Technology Resellers & VARs", desc: "Offer custom software development as a value-added service alongside your product portfolio." },
  { type: "Private Equity & Venture Capital", desc: "Technical due diligence, portfolio company development, and technology acceleration." },
  { type: "Franchise & Multi-Location Brands", desc: "Scalable technology platforms deployed across hundreds of locations with central management." },
];

const partnerModels = [
  { title: "Project-Based", desc: "Engage Aqurion Development for individual projects delivered under your brand." },
  { title: "Retainer-Based", desc: "Dedicated development capacity allocated monthly — scalable up or down." },
  { title: "Embedded Teams", desc: "Aqurion engineers work within your project management tools and workflows." },
  { title: "Revenue Share", desc: "Co-develop products and share in the revenue — ideal for building recurring SaaS." },
];

const staffModels = [
  { title: "Individual Specialists", desc: "Embed senior engineers, designers, or architects directly into your existing team." },
  { title: "Pod Teams", desc: "Complete cross-functional pods: PM + designer + frontend + backend + QA." },
  { title: "Full Project Teams", desc: "End-to-end delivery team with project management, architecture, development, QA, and DevOps." },
  { title: "Executive Augmentation", desc: "Fractional CTO, VP of Engineering, or Technical Advisor for strategic leadership." },
];

const industries = [
  { icon: "🏦", name: "Financial Services & FinTech", example: "Trading platforms, banking apps, payment processing, regulatory compliance" },
  { icon: "🏥", name: "Healthcare & Life Sciences", example: "EHR integration, telehealth platforms, clinical trials, HIPAA-compliant systems" },
  { icon: "🏛️", name: "Government & Public Sector", example: "FedRAMP portals, citizen services, defense systems, compliance engineering" },
  { icon: "🏠", name: "Real Estate & PropTech", example: "Property management, marketplace platforms, smart building systems" },
  { icon: "🛒", name: "E-Commerce & Retail", example: "Headless commerce, marketplace development, inventory optimization" },
  { icon: "🏨", name: "Hospitality & Travel", example: "Booking engines, revenue management, guest experience platforms" },
  { icon: "🎓", name: "Education & EdTech", example: "LMS platforms, adaptive learning, student success analytics" },
  { icon: "🚛", name: "Logistics & Supply Chain", example: "Route optimization, fleet management, warehouse automation" },
  { icon: "⚖️", name: "Legal & Professional Services", example: "Case management, document automation, compliance systems" },
  { icon: "🚗", name: "Automotive & Mobility", example: "Connected car platforms, dealership management, fleet intelligence" },
];

const caseStudies = [
  { tag: "FEDERAL GOVERNMENT", title: "FedRAMP-Authorized Citizen Services Portal — 4.2M Users", results: ["ATO achieved on first submission", "4.2M active users across 50 states", "99.99% uptime over 18 months", "Section 508 WCAG 2.1 AA compliant", "Processing 180K transactions/day"], color: "#6366F1" },
  { tag: "FINTECH — SERIES B", title: "Real-Time Trading Platform Handling $2.3B in Annual Volume", results: ["Sub-50ms order execution latency", "$2.3B annual transaction volume", "PCI DSS Level 1 certified", "99.99% uptime SLA achieved", "Scaled from 0 to 40K daily active users"], color: "#10B981" },
  { tag: "AGENCY — WHITE-LABEL", title: "Agency Launched Custom Dev Division — $4.2M Revenue in Year One", results: ["12 client projects delivered in year one", "$4.2M in new service revenue", "85 NPS across all delivered projects", "Zero missed deadlines", "Expanded from 2 developers to 14-person team"], color: "#EBD96B" },
  { tag: "STARTUP — MVP TO SCALE", title: "Pre-Revenue Startup to $8M ARR in 18 Months", results: ["MVP launched in 8 weeks", "Product-market fit achieved in 90 days", "$8M ARR by month 18", "Scaled from MVP to 150K+ users", "Series B raised at $120M valuation"], color: "#F59E0B" },
  { tag: "AI/ML ENGINEERING", title: "Enterprise Recommendation Engine — 340% Revenue Lift", results: ["340% increase in cross-sell revenue", "Recommendation accuracy: 89%", "Processing 2M+ recommendations/day", "A/B tested against 4 commercial solutions", "Deployed across 2,400 retail locations"], color: "#EF4444" },
  { tag: "STATE GOVERNMENT", title: "State-Wide Emergency Management Platform for 6.8M Residents", results: ["Serves 6.8M residents across 95 counties", "Alert delivery: under 90 seconds statewide", "Integrated with 14 state agencies", "Handles 500K+ simultaneous sessions", "Zero downtime during 3 major events"], color: "#3B82F6" },
  { tag: "HEALTHCARE", title: "Telehealth Platform Processing 1.2M Virtual Visits Annually", results: ["1.2M virtual visits/year", "HIPAA, SOC 2, and HITRUST certified", "Average wait time: under 3 minutes", "Patient satisfaction: 4.8/5.0", "Integrated with 6 major EHR systems"], color: "#EC4899" },
  { tag: "ENTERPRISE — STAFF AUG", title: "Fortune 100 Retailer Augmented Engineering Team by 45 Engineers", results: ["45 engineers deployed in 30 days", "Sprint velocity increased 2.8x", "Zero attrition in first 12 months", "Expanded to 3 additional product lines", "Client retained engagement for 2+ years"], color: "#8B5CF6" },
];

const processPhases = [
  { num: "01", title: "Discovery & Architecture", items: ["Stakeholder interviews & requirements gathering", "Technical architecture design", "Technology stack recommendation", "Infrastructure planning", "Security & compliance requirements"] },
  { num: "02", title: "Design & Prototyping", items: ["UX research and information architecture", "High-fidelity wireframes and prototypes", "Design system creation", "Usability testing", "Client review and iteration"] },
  { num: "03", title: "Development — Sprint-Based", items: ["2-week agile sprints", "Daily standups, weekly demos", "Code review and pair programming", "Continuous integration/deployment", "Progress tracking via client portal"] },
  { num: "04", title: "Quality Assurance", items: ["Automated testing (unit, integration, e2e)", "Manual testing and exploratory QA", "Performance and load testing", "Security penetration testing", "Accessibility auditing (WCAG 2.1)"] },
  { num: "05", title: "Deployment & Launch", items: ["Staged rollout strategy", "Infrastructure provisioning and hardening", "Data migration and validation", "Monitoring and alerting configuration", "Launch day support and war room"] },
  { num: "06", title: "Support & Optimization", items: ["24/7 monitoring and incident response", "Performance optimization", "Feature iteration based on user data", "Security patch management", "Capacity planning and scaling"] },
  { num: "07", title: "Evolution & Growth", items: ["Roadmap planning and prioritization", "New feature development", "Platform modernization", "Technology refreshment", "AI and automation integration"] },
];

const techStack = {
  "Frontend": ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
  "Backend": ["Node.js", "Python", "Go", "Rust", ".NET", "Java"],
  "Mobile": ["React Native", "Flutter", "Swift", "Kotlin"],
  "AI/ML": ["TensorFlow", "PyTorch", "OpenAI", "LangChain", "Hugging Face"],
  "Cloud": ["AWS", "Azure", "GCP", "Vercel", "Cloudflare"],
  "Data": ["PostgreSQL", "MongoDB", "Redis", "Snowflake", "BigQuery"],
  "DevOps": ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "ArgoCD"],
  "Security": ["OWASP", "SOC 2", "FedRAMP", "HIPAA", "PCI DSS"],
};

const testimonials = [
  { quote: "Aqurion Development didn't just build our platform — they architected the technical foundation that enabled our growth from 0 to $8M ARR. They operated as our CTO and engineering team simultaneously.", author: "CEO", company: "Series B FinTech Startup" },
  { quote: "We evaluated 14 development firms. Aqurion was the only one that understood both our technology requirements AND our federal compliance obligations. ATO on first submission.", author: "CIO", company: "Federal Agency (Cabinet-Level)" },
  { quote: "Our agency now generates $4.2M in custom development revenue — all built and delivered by Aqurion under our brand. Our clients have no idea, and that's exactly how it should be.", author: "Managing Partner", company: "Digital Agency (250+ Employees)" },
  { quote: "45 engineers deployed in 30 days. Zero attrition. Sprint velocity increased 2.8x. Aqurion's staff augmentation quality is unlike anything we've experienced.", author: "VP of Engineering", company: "Fortune 100 Retailer" },
  { quote: "The AI recommendation engine Aqurion built drives 34% of our total digital revenue. It outperformed four commercial solutions we evaluated — at a fraction of the cost.", author: "CDO", company: "National Retail Chain" },
];

const faqs = [
  { q: "What types of projects does Aqurion Development take on?", a: "Everything from MVPs and startup launches to multi-year enterprise platform development, government contracts, and white-label partnerships. Our sweet spot is complex, high-stakes software that requires both technical excellence and business understanding." },
  { q: "How do you handle government compliance (FedRAMP, FISMA, etc.)?", a: "We have dedicated compliance engineering teams with active experience across FedRAMP, FISMA/NIST 800-53, IL4/IL5, Section 508, and state-specific requirements. We've achieved ATO on first submission for multiple federal clients." },
  { q: "What does your white-label partnership look like?", a: "We operate entirely under your brand. Your clients never know we exist. We use your project management tools, attend your standups, and deliver through your processes. You retain the client relationship; we provide the technical execution." },
  { q: "How quickly can you start a new project?", a: "Team assembly: 1-2 weeks. Discovery and architecture: 2-3 weeks. First sprint: within 30 days of engagement. Staff augmentation can begin within 5-10 business days." },
  { q: "What's your pricing model?", a: "Project-based (fixed scope, fixed price), time-and-materials (flexible scope, monthly billing), retainer (dedicated capacity, monthly), and staff augmentation (per-engineer, monthly). Enterprise and government engagements are custom-quoted." },
  { q: "How do you ensure code quality?", a: "Mandatory code reviews, automated testing (unit, integration, e2e), static analysis, performance benchmarking, and security scanning on every PR. We maintain 80%+ test coverage on all projects." },
  { q: "Can you work with our existing development team?", a: "Absolutely. Staff augmentation, embedded teams, and technical advisory are core offerings. We integrate into your existing workflows, tools, and processes." },
  { q: "What industries do you specialize in?", a: "Financial services, healthcare, government, real estate, e-commerce, hospitality, education, logistics, legal, and automotive — with specialized compliance and domain expertise in each." },
  { q: "Do you provide ongoing support after launch?", a: "Yes. All projects include a post-launch support period. We offer ongoing retainers for monitoring, maintenance, feature development, and operations — with SLAs up to 99.99% uptime." },
];

export default function DevPage() {
  const bp = process.env.NODE_ENV === "development" ? "/dev" : "";
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedCase, setExpandedCase] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        .dv{background:#0A0A0A;color:#E5E5E5;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}
        .dv-grid-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;}

        .dv-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1rem 3rem;background:rgba(10,10,10,0.85);backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,0.04);}
        .dv-nav-logo{display:flex;align-items:center;gap:0.6rem;font-size:1rem;font-weight:700;text-decoration:none;color:#E5E5E5;}
        .dv-nav-logo img{width:32px;height:32px;border-radius:10px;}
        .dv-nav-links{display:flex;gap:2rem;}
        .dv-nav-link{font-size:0.82rem;font-weight:500;color:rgba(229,229,229,0.3);text-decoration:none;transition:color 0.2s;}
        .dv-nav-link:hover{color:#E5E5E5;}
        .dv-cta{padding:0.55rem 1.5rem;border-radius:50px;background:#10B981;color:#fff;font-weight:700;font-size:0.82rem;border:none;cursor:pointer;text-decoration:none;transition:all 0.3s;display:inline-block;}
        .dv-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(16,185,129,0.25);}
        .dv-ghost{padding:0.55rem 1.5rem;border-radius:50px;background:transparent;border:1px solid rgba(229,229,229,0.1);color:rgba(229,229,229,0.5);font-weight:600;font-size:0.82rem;text-decoration:none;transition:all 0.3s;display:inline-block;cursor:pointer;}
        .dv-ghost:hover{border-color:rgba(229,229,229,0.25);color:#E5E5E5;}

        .dv-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 4rem;position:relative;z-index:1;}
        .dv-eyebrow{display:inline-flex;align-items:center;gap:0.5rem;padding:0.4rem 1.2rem;border-radius:50px;font-size:0.7rem;font-weight:600;background:rgba(16,185,129,0.08);color:#10B981;border:1px solid rgba(16,185,129,0.12);margin-bottom:2rem;letter-spacing:0.04em;}
        .dv-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.8rem,6vw,4.5rem);font-weight:700;line-height:1.08;letter-spacing:-0.04em;margin-bottom:1.5rem;max-width:850px;}
        .dv-grad{background:linear-gradient(135deg,#10B981,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .dv-hero-sub{font-size:1.05rem;color:rgba(229,229,229,0.35);max-width:650px;line-height:1.8;margin-bottom:1.5rem;}
        .dv-hero-proof{font-size:0.75rem;color:rgba(229,229,229,0.2);margin-bottom:2.5rem;font-style:italic;}
        .dv-hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}

        .dv-stats{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;margin:0 3rem;border-radius:20px;overflow:hidden;background:rgba(255,255,255,0.03);position:relative;z-index:2;margin-top:-3rem;}
        .dv-stat{background:rgba(10,10,10,0.95);padding:2.5rem 1.5rem;text-align:center;}
        .dv-stat-val{font-family:'Space Grotesk',sans-serif;font-size:2rem;font-weight:700;color:#10B981;}
        .dv-stat-label{font-size:0.68rem;color:rgba(229,229,229,0.2);text-transform:uppercase;letter-spacing:0.12em;margin-top:0.25rem;}

        .dv-section{padding:6rem 2rem;max-width:1100px;margin:0 auto;position:relative;z-index:1;}
        .dv-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#10B981;margin-bottom:0.75rem;}
        .dv-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,2.8rem);font-weight:700;letter-spacing:-0.03em;margin-bottom:1rem;line-height:1.1;}
        .dv-subtitle{font-size:0.92rem;color:rgba(229,229,229,0.3);max-width:700px;line-height:1.8;margin-bottom:3rem;}

        /* PAIN */
        .dv-pain-grid{display:grid;gap:0.5rem;max-width:800px;}
        .dv-pain{display:flex;align-items:flex-start;gap:0.75rem;padding:0.9rem 1.25rem;border-radius:10px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.03);font-size:0.82rem;color:rgba(229,229,229,0.4);line-height:1.7;transition:all 0.3s;}
        .dv-pain:hover{border-color:rgba(239,68,68,0.12);transform:translateX(4px);}

        /* CAPABILITIES */
        .dv-caps{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;}
        .dv-cap{padding:2rem;border-radius:18px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.03);transition:all 0.3s;}
        .dv-cap:hover{transform:translateY(-4px);border-color:rgba(16,185,129,0.1);}
        .dv-cap-icon{font-size:1.3rem;margin-bottom:0.75rem;}
        .dv-cap-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.95rem;margin-bottom:0.4rem;}
        .dv-cap-desc{font-size:0.82rem;color:rgba(229,229,229,0.35);line-height:1.7;margin-bottom:0.5rem;}
        .dv-cap-tech{font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:rgba(16,185,129,0.5);line-height:1.5;}

        /* GOV SECTION */
        .dv-gov-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        .dv-gov-col{padding:1.5rem;border-radius:16px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.03);}
        .dv-gov-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.88rem;margin-bottom:0.75rem;color:#6366F1;}
        .dv-gov-list{list-style:none;display:grid;gap:0.3rem;}
        .dv-gov-list li{font-size:0.78rem;color:rgba(229,229,229,0.35);display:flex;align-items:center;gap:0.4rem;line-height:1.5;}

        /* WHITE LABEL */
        .dv-wl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
        .dv-wl{padding:1.5rem;border-radius:16px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.03);transition:all 0.3s;}
        .dv-wl:hover{border-color:rgba(235,217,107,0.1);}
        .dv-wl-type{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.88rem;margin-bottom:0.4rem;color:#EBD96B;}
        .dv-wl-desc{font-size:0.78rem;color:rgba(229,229,229,0.3);line-height:1.6;}

        /* MODELS */
        .dv-models{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
        .dv-model{padding:1.5rem;border-radius:16px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.03);}
        .dv-model-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.88rem;margin-bottom:0.4rem;}
        .dv-model-desc{font-size:0.78rem;color:rgba(229,229,229,0.3);line-height:1.6;}

        /* INDUSTRIES */
        .dv-industries{display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem;}
        .dv-industry{display:flex;align-items:flex-start;gap:0.75rem;padding:1rem 1.25rem;border-radius:12px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.03);transition:all 0.3s;}
        .dv-industry:hover{border-color:rgba(16,185,129,0.1);}
        .dv-industry-icon{font-size:1.2rem;flex-shrink:0;}
        .dv-industry-name{font-weight:700;font-size:0.85rem;margin-bottom:0.2rem;}
        .dv-industry-ex{font-size:0.72rem;color:rgba(229,229,229,0.25);line-height:1.4;}

        /* CASES */
        .dv-cases{display:grid;gap:0.75rem;}
        .dv-case{border-radius:16px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.03);overflow:hidden;transition:all 0.3s;cursor:pointer;}
        .dv-case:hover{border-color:rgba(16,185,129,0.08);}
        .dv-case-header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;gap:0.75rem;}
        .dv-case-tag{font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:0.2rem 0.6rem;border-radius:50px;color:#fff;flex-shrink:0;}
        .dv-case-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.92rem;flex:1;line-height:1.3;}
        .dv-case-toggle{color:rgba(229,229,229,0.15);transition:transform 0.3s;}
        .dv-case-body{padding:0 1.5rem 1.5rem;border-top:1px solid rgba(255,255,255,0.03);}
        .dv-case-results{list-style:none;display:grid;gap:0.3rem;margin-top:0.75rem;}
        .dv-case-results li{font-size:0.8rem;color:rgba(229,229,229,0.4);display:flex;align-items:center;gap:0.4rem;line-height:1.5;}

        /* PROCESS */
        .dv-process{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem;}
        .dv-phase{padding:1.5rem;border-radius:16px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.03);border-left:3px solid rgba(16,185,129,0.15);}
        .dv-phase-num{font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;color:rgba(16,185,129,0.15);margin-bottom:0.25rem;}
        .dv-phase-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.88rem;margin-bottom:0.75rem;}
        .dv-phase-list{list-style:none;display:grid;gap:0.2rem;}
        .dv-phase-list li{font-size:0.72rem;color:rgba(229,229,229,0.3);display:flex;align-items:center;gap:0.3rem;line-height:1.5;}

        /* TECH STACK */
        .dv-tech-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
        .dv-tech-group{padding:1.25rem;border-radius:14px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.03);}
        .dv-tech-group-title{font-family:'JetBrains Mono',monospace;font-weight:600;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;color:#10B981;margin-bottom:0.5rem;}
        .dv-tech-tags{display:flex;flex-wrap:wrap;gap:0.3rem;}
        .dv-tech-tag{padding:0.2rem 0.5rem;border-radius:6px;font-size:0.68rem;color:rgba(229,229,229,0.4);background:rgba(255,255,255,0.03);}

        /* TESTIMONIALS */
        .dv-testimonials{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;}
        .dv-test{padding:2rem;border-radius:18px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.03);transition:all 0.3s;}
        .dv-test:hover{border-color:rgba(16,185,129,0.08);}
        .dv-test-quote{font-size:0.85rem;color:rgba(229,229,229,0.4);line-height:1.8;margin-bottom:1rem;font-style:italic;}
        .dv-test-author{font-weight:700;font-size:0.82rem;}
        .dv-test-company{font-size:0.72rem;color:rgba(229,229,229,0.2);}

        /* FAQ */
        .dv-faq{max-width:700px;}
        .dv-faq-item{border-bottom:1px solid rgba(255,255,255,0.03);}
        .dv-faq-q{padding:1.25rem 0;font-weight:600;font-size:0.9rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;color:rgba(229,229,229,0.6);transition:color 0.2s;}
        .dv-faq-q:hover{color:#10B981;}
        .dv-faq-a{padding:0 0 1.25rem;font-size:0.82rem;color:rgba(229,229,229,0.3);line-height:1.8;}

        /* CTA SEC */
        .dv-cta-sec{text-align:center;padding:6rem 2rem;margin:0 3rem 4rem;border-radius:24px;border:1px solid rgba(16,185,129,0.08);position:relative;overflow:hidden;z-index:1;}
        .dv-cta-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(16,185,129,0.04),transparent);}
        .dv-cta-sec h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,2.8rem);font-weight:700;margin-bottom:1rem;position:relative;}
        .dv-cta-sec p{color:rgba(229,229,229,0.3);margin-bottom:2rem;max-width:550px;margin-left:auto;margin-right:auto;position:relative;line-height:1.7;font-size:0.88rem;}
        .dv-cta-btns{display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem;max-width:500px;margin:0 auto;position:relative;}
        .dv-cta-btn{padding:0.75rem 1.25rem;border-radius:14px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);color:rgba(229,229,229,0.6);font-weight:600;font-size:0.82rem;text-decoration:none;text-align:center;transition:all 0.3s;display:block;font-family:'Inter',sans-serif;cursor:pointer;}
        .dv-cta-btn:hover{border-color:rgba(16,185,129,0.2);color:#10B981;}

        .dv-footer{padding:3rem 2rem;max-width:1100px;margin:0 auto;position:relative;z-index:1;}
        .dv-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem;margin-bottom:2rem;}
        .dv-footer-brand{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;margin-bottom:0.5rem;}
        .dv-footer-desc{font-size:0.78rem;color:rgba(229,229,229,0.15);line-height:1.6;}
        .dv-footer-col-title{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(229,229,229,0.15);margin-bottom:0.75rem;}
        .dv-footer-link{display:block;font-size:0.78rem;color:rgba(229,229,229,0.2);text-decoration:none;padding:0.2rem 0;transition:color 0.2s;}
        .dv-footer-link:hover{color:#10B981;}
        .dv-footer-bottom{text-align:center;font-size:0.68rem;color:rgba(229,229,229,0.08);padding-top:2rem;border-top:1px solid rgba(255,255,255,0.03);}

        @media(max-width:768px){
          .dv-nav{padding:1rem 1.5rem;}.dv-nav-links{display:none;}
          .dv-stats{grid-template-columns:repeat(2,1fr);margin:0 1rem;margin-top:-2rem;}.dv-stats .dv-stat:last-child{display:none;}
          .dv-caps,.dv-gov-grid,.dv-wl-grid,.dv-industries,.dv-testimonials{grid-template-columns:1fr;}
          .dv-models,.dv-tech-grid{grid-template-columns:repeat(2,1fr);}
          .dv-cta-sec{margin:0 1rem 3rem;}
          .dv-cta-btns{grid-template-columns:1fr;}
          .dv-footer-grid{grid-template-columns:1fr;}
        }
      `}</style>

      <div className="dv">
        <div className="dv-grid-bg" />

        <nav className="dv-nav">
          <a href={`${bp}/`} className="dv-nav-logo"><img src={`${bp}/logos/aqurion-dev-icon.png`} alt="" />Aqurion Development</a>
          <div className="dv-nav-links">
            <a href="#capabilities" className="dv-nav-link">Capabilities</a>
            <a href="#cases" className="dv-nav-link">Case Studies</a>
            <a href="#process" className="dv-nav-link">Process</a>
            <a href="#contact" className="dv-nav-link">Contact</a>
          </div>
          <a href="#contact" className="dv-cta">Start a Project</a>
        </nav>

        {/* ═══ HERO ═══ */}
        <section className="dv-hero">
          <Rv><div className="dv-eyebrow">Enterprise Software Engineering • An Aqurion Holdings Company</div></Rv>
          <Rv d={0.1}><h1>We Build the Software That <span className="dv-grad">Builds Your Business</span>.</h1></Rv>
          <Rv d={0.2}><p className="dv-hero-sub">Aqurion Development is a full-service software engineering firm delivering custom platforms, AI-powered applications, cloud infrastructure, and enterprise solutions — for startups, mid-market companies, enterprises, and government agencies.</p></Rv>
          <Rv d={0.3}><p className="dv-hero-proof">200+ projects delivered. $500M+ in platform value. Serving 12+ industries. 99.9% uptime SLA.</p></Rv>
          <Rv d={0.4}><div className="dv-hero-btns"><a href="#contact" className="dv-cta" style={{ padding: "0.75rem 2rem" }}>Start a Project</a><a href="#capabilities" className="dv-ghost">View Capabilities →</a><a href="#cases" className="dv-ghost">See Case Studies →</a></div></Rv>
        </section>

        {/* ═══ STATS ═══ */}
        <Rv><div className="dv-stats">{heroStats.map(s => <div key={s.label} className="dv-stat"><div className="dv-stat-val">{s.val}</div><div className="dv-stat-label">{s.label}</div></div>)}</div></Rv>

        {/* ═══ PAIN POINTS ═══ */}
        <section className="dv-section">
          <Rv><div className="dv-label">The Problem</div><h2 className="dv-title">Most Development Partnerships Fail Before the First Line of Code.</h2></Rv>
          <Rv d={0.1}><p className="dv-subtitle">The software development industry has a trust problem. Here's what companies actually experience when they hire most development firms.</p></Rv>
          <div className="dv-pain-grid">{painPoints.map((p, i) => <Rv key={i} d={i * 0.03}><div className="dv-pain"><span style={{ color: "rgba(239,68,68,0.4)", flexShrink: 0 }}>✕</span> {p}</div></Rv>)}</div>
        </section>

        {/* ═══ CAPABILITIES ═══ */}
        <section id="capabilities" className="dv-section" style={{ textAlign: "center" }}>
          <Rv><div className="dv-label">Capabilities</div><h2 className="dv-title">Every Technology. Every Scale. One Engineering Partner.</h2></Rv>
          <div className="dv-caps">
            {capabilities.map((c, i) => (
              <Rv key={c.title} d={i * 0.05}><div className="dv-cap">
                <div className="dv-cap-icon">{c.icon}</div>
                <div className="dv-cap-title">{c.title}</div>
                <div className="dv-cap-desc">{c.desc}</div>
                <div className="dv-cap-tech">{c.tech}</div>
              </div></Rv>
            ))}
          </div>
        </section>

        {/* ═══ GOVERNMENT ═══ */}
        <section className="dv-section">
          <Rv><div className="dv-label">Government Contracting</div><h2 className="dv-title">Cleared. Compliant. Combat-Ready Code.</h2></Rv>
          <Rv d={0.1}><p className="dv-subtitle">Aqurion Development maintains active security clearances, compliance certifications, and contract vehicles required for federal and state government technology projects.</p></Rv>
          <div className="dv-gov-grid">
            <Rv><div className="dv-gov-col"><div className="dv-gov-title">Federal Capabilities</div><ul className="dv-gov-list">{govCapabilities.federal.map(c => <li key={c}><span style={{ color: "#6366F1" }}>▸</span> {c}</li>)}</ul></div></Rv>
            <Rv d={0.1}><div className="dv-gov-col"><div className="dv-gov-title">State & Local</div><ul className="dv-gov-list">{govCapabilities.stateLocal.map(c => <li key={c}><span style={{ color: "#6366F1" }}>▸</span> {c}</li>)}</ul></div></Rv>
            <Rv d={0.2}><div className="dv-gov-col"><div className="dv-gov-title">Contract Vehicles</div><ul className="dv-gov-list">{govCapabilities.vehicles.map(c => <li key={c}><span style={{ color: "#6366F1" }}>▸</span> {c}</li>)}</ul></div></Rv>
          </div>
        </section>

        {/* ═══ WHITE LABEL ═══ */}
        <section className="dv-section" style={{ textAlign: "center" }}>
          <Rv><div className="dv-label" style={{ color: "#EBD96B" }}>White-Label</div><h2 className="dv-title">Your Brand. Our Engineering. Their Delight.</h2></Rv>
          <Rv d={0.1}><p className="dv-subtitle" style={{ margin: "0 auto 2rem" }}>We operate as a silent engineering arm for agencies, consultancies, and technology companies who need world-class development capabilities delivered under their own brand.</p></Rv>
          <div className="dv-wl-grid">{whiteLabelPartners.map((w, i) => <Rv key={w.type} d={i * 0.06}><div className="dv-wl"><div className="dv-wl-type">{w.type}</div><div className="dv-wl-desc">{w.desc}</div></div></Rv>)}</div>
          <Rv><h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.1rem", margin: "3rem 0 1.5rem" }}>Partnership Models</h3></Rv>
          <div className="dv-models">{partnerModels.map((m, i) => <Rv key={m.title} d={i * 0.08}><div className="dv-model"><div className="dv-model-title">{m.title}</div><div className="dv-model-desc">{m.desc}</div></div></Rv>)}</div>
        </section>

        {/* ═══ STAFF AUG ═══ */}
        <section className="dv-section" style={{ textAlign: "center" }}>
          <Rv><div className="dv-label">Staff Augmentation</div><h2 className="dv-title">The Engineers You Need. The Scale You Want. The Quality You Deserve.</h2></Rv>
          <div className="dv-models">{staffModels.map((m, i) => <Rv key={m.title} d={i * 0.08}><div className="dv-model"><div className="dv-model-title">{m.title}</div><div className="dv-model-desc">{m.desc}</div></div></Rv>)}</div>
        </section>

        {/* ═══ INDUSTRIES ═══ */}
        <section className="dv-section" style={{ textAlign: "center" }}>
          <Rv><div className="dv-label">Industries</div><h2 className="dv-title">Deep Expertise Across 10 Critical Verticals.</h2></Rv>
          <div className="dv-industries">{industries.map((ind, i) => <Rv key={ind.name} d={i * 0.04}><div className="dv-industry"><span className="dv-industry-icon">{ind.icon}</span><div><div className="dv-industry-name">{ind.name}</div><div className="dv-industry-ex">{ind.example}</div></div></div></Rv>)}</div>
        </section>

        {/* ═══ CASE STUDIES ═══ */}
        <section id="cases" className="dv-section">
          <Rv><div className="dv-label">Case Studies</div><h2 className="dv-title">Real Projects. Real Scale. Real Results.</h2></Rv>
          <div className="dv-cases">
            {caseStudies.map((cs, i) => (
              <Rv key={i} d={i * 0.04}><div className="dv-case" onClick={() => setExpandedCase(expandedCase === i ? null : i)}>
                <div className="dv-case-header">
                  <span className="dv-case-tag" style={{ background: cs.color }}>{cs.tag}</span>
                  <div className="dv-case-title">{cs.title}</div>
                  <span className="dv-case-toggle" style={{ transform: expandedCase === i ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                </div>
                <AnimatePresence>{expandedCase === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                    <div className="dv-case-body"><ul className="dv-case-results">{cs.results.map((r, j) => <li key={j}><span style={{ color: cs.color }}>✓</span> {r}</li>)}</ul></div>
                  </motion.div>
                )}</AnimatePresence>
              </div></Rv>
            ))}
          </div>
        </section>

        {/* ═══ PROCESS ═══ */}
        <section id="process" className="dv-section">
          <Rv><div className="dv-label">Process</div><h2 className="dv-title">7-Phase Delivery Methodology. Proven Across 200+ Projects.</h2></Rv>
          <div className="dv-process">
            {processPhases.map((p, i) => (
              <Rv key={p.num} d={i * 0.05}><div className="dv-phase">
                <div className="dv-phase-num">{p.num}</div>
                <div className="dv-phase-title">{p.title}</div>
                <ul className="dv-phase-list">{p.items.map(it => <li key={it}><span style={{ color: "#10B981" }}>▸</span> {it}</li>)}</ul>
              </div></Rv>
            ))}
          </div>
        </section>

        {/* ═══ TECH STACK ═══ */}
        <section className="dv-section" style={{ textAlign: "center" }}>
          <Rv><div className="dv-label">Technology</div><h2 className="dv-title">Modern Stack. Battle-Tested Infrastructure.</h2></Rv>
          <div className="dv-tech-grid">
            {Object.entries(techStack).map(([group, techs], i) => (
              <Rv key={group} d={i * 0.05}><div className="dv-tech-group">
                <div className="dv-tech-group-title">{group}</div>
                <div className="dv-tech-tags">{techs.map(t => <span key={t} className="dv-tech-tag">{t}</span>)}</div>
              </div></Rv>
            ))}
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section className="dv-section" style={{ textAlign: "center" }}>
          <Rv><div className="dv-label">Testimonials</div><h2 className="dv-title">What Our Clients Say</h2></Rv>
          <div className="dv-testimonials">
            {testimonials.map((t, i) => (
              <Rv key={i} d={i * 0.06}><div className="dv-test">
                <div className="dv-test-quote">"{t.quote}"</div>
                <div className="dv-test-author">— {t.author}</div>
                <div className="dv-test-company">{t.company}</div>
              </div></Rv>
            ))}
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="dv-section">
          <Rv><div className="dv-label">FAQ</div><h2 className="dv-title">Questions We Answer Before You Ask.</h2></Rv>
          <div className="dv-faq">
            {faqs.map((f, i) => (
              <div key={i} className="dv-faq-item">
                <div className="dv-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>{f.q}<span style={{ color: "#10B981" }}>{openFaq === i ? "−" : "+"}</span></div>
                <AnimatePresence>{openFaq === i && <motion.div className="dv-faq-a" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>{f.a}</motion.div>}</AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <Rv><section id="contact" className="dv-cta-sec">
          <h2>Let's Build Something <span className="dv-grad">That Matters</span>.</h2>
          <p>Whether you need a full development team, a white-label partner, or a single architect to solve a critical challenge — we're ready.</p>
          <div className="dv-cta-btns">
            <a href="mailto:Build@AqurionDev.com" className="dv-cta-btn">🚀 Start a Custom Project</a>
            <a href="mailto:Build@AqurionDev.com" className="dv-cta-btn">🏛️ Government & Compliance</a>
            <a href="mailto:Build@AqurionDev.com" className="dv-cta-btn">🤝 White-Label Partnership</a>
            <a href="mailto:Build@AqurionDev.com" className="dv-cta-btn">👥 Staff Augmentation</a>
          </div>
        </section></Rv>

        {/* ═══ FOOTER ═══ */}
        <footer className="dv-footer">
          <div className="dv-footer-grid">
            <div><div className="dv-footer-brand">Aqurion Development</div><div className="dv-footer-desc">An Aqurion Holdings Company. Full-service software engineering for enterprises, startups, and government agencies.</div></div>
            <div><div className="dv-footer-col-title">Ecosystem</div><a href="https://Aqurion.net" className="dv-footer-link">Aqurion Holdings</a><a href="https://Aqurion.AI" className="dv-footer-link">Aqurion AI</a><a href="https://AquironSales.com" className="dv-footer-link">Sales</a><a href="https://AqurionMarketing.com" className="dv-footer-link">Marketing</a></div>
            <div><div className="dv-footer-col-title">Contact</div><a href="mailto:Build@AqurionDev.com" className="dv-footer-link">Build@AqurionDev.com</a><a href="tel:+18882787106" className="dv-footer-link">1-888-AQUR-10-N (Press 2)</a></div>
          </div>
          <div className="dv-footer-bottom">© {new Date().getFullYear()} Aqurion Development — An Aqurion Holdings Company</div>
        </footer>
      </div>
    </>
  );
}
