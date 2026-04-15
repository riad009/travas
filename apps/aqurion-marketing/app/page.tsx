"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Rv({ children, d = 0 }: { children: React.ReactNode; d?: number }) {
  return <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: d, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

const heroStats = [
  { val: "200+", label: "Brands Transformed" },
  { val: "50M+", label: "Impressions Generated" },
  { val: "340%", label: "Avg. Campaign ROI" },
  { val: "$12M+", label: "Client Revenue Growth" },
  { val: "12", label: "Industries Served" },
];

const painPoints = [
  "Marketing and sales operate in completely different systems — leads disappear before sales can act.",
  "Agencies produce beautiful creative with no connection to revenue outcomes.",
  "Ad spend is allocated based on gut feel, not real-time performance data.",
  "Content is created without an SEO strategy. SEO is executed without a content strategy.",
  "Email marketing is stuck in the era of blast-and-pray — same message, everyone, every time.",
  "Social media is treated as a brand awareness checkbox rather than a demand generation engine.",
  "Brands are built visually without a strategy — resulting in inconsistent messaging.",
  "AI tools are being adopted reactively, without a coherent strategy.",
];

const services = [
  { num: "01", title: "Brand Strategy & Identity", items: ["Brand discovery, competitive analysis, market positioning", "Logo design, visual identity systems, brand guidelines", "Brand voice, messaging architecture, copywriting", "Rebranding and brand refresh for established companies", "Packaging, print, and environmental design", "Employer brand development for recruiting"], color: "#EBD96B" },
  { num: "02", title: "Social Media Marketing", items: ["Full strategy — platform selection, audience targeting, content pillars", "Content creation: graphics, video, reels, carousels, stories", "Community management and engagement", "Influencer marketing — identification, outreach, measurement", "Paid social: Meta, LinkedIn, TikTok, X, Pinterest", "Social commerce strategy for e-commerce brands"], color: "#B4D7C4" },
  { num: "03", title: "Digital Marketing & Demand Gen", items: ["SEO — technical, on-page, and off-page", "Content marketing: blog, long-form, pillar pages", "PPC: Google Ads, Bing Ads, Shopping campaigns", "Conversion rate optimization (CRO)", "Marketing funnel design and ABM strategy", "Website design (with Aqurion Development)"], color: "#C4B4D7" },
  { num: "04", title: "AI Email Marketing & Automation", items: ["AI-driven drip campaigns and behavioral sequences", "Lead nurturing connected to Aqurion Sales CRM", "A/B testing for subject lines, content, timing", "Re-engagement campaigns for dormant subscribers", "Email deliverability audits and list hygiene", "Closed-loop attribution with CRM integration"], color: "#FFB4A2" },
  { num: "05", title: "AI Content Strategy & Creation", items: ["AI-assisted content aligned to search intent", "Whitepapers, e-books, case studies, reports", "Thought leadership for executives", "Video scriptwriting and podcast strategy", "Content distribution and syndication", "Performance analytics and optimization"], color: "#A8D8EA" },
  { num: "06", title: "Performance Marketing & Analytics", items: ["Full-funnel paid media management", "Attribution modeling: first-touch, multi-touch, data-driven", "Real-time dashboards tied to revenue outcomes", "Customer LTV modeling and CAC optimization", "Monthly reviews with strategic recommendations", "ROI reporting tied to sales pipeline"], color: "#B5EAD7" },
  { num: "07", title: "Marketing Technology & Integration", items: ["MarTech stack assessment and optimization", "CRM and marketing automation integration", "CDP strategy and implementation", "GA4, data warehouse, BI dashboard setup", "AI tool selection and workflow design", "Custom reporting infrastructure"], color: "#E2B4BD" },
];

const aiCapabilities = [
  { icon: "🎯", title: "Predictive Audience Intelligence", desc: "AI analyzes behavioral data, intent signals, and engagement history to build predictive audience models — targeting based on predicted behavior, not just demographics." },
  { icon: "✍️", title: "AI Content Creation at Scale", desc: "AI-assisted production of blog posts, social captions, email copy, ad creative, and video scripts — produced faster, tested continuously, optimized on performance." },
  { icon: "⚡", title: "Dynamic Campaign Optimization", desc: "AI makes real-time budget allocation decisions across channels — shifting spend toward highest-performing placements, audiences, and creative automatically, 24/7." },
  { icon: "🎭", title: "Personalization at Scale", desc: "Deliver personalized messaging across email, social, paid media, and web content at a scale no human team can replicate. Every segment gets messaging that speaks to their situation." },
  { icon: "📡", title: "Sentiment Analysis & Brand Monitoring", desc: "Real-time monitoring of brand mentions, competitor activity, and market sentiment powered by NLP. Issues identified before they become crises." },
  { icon: "🧪", title: "AI Creative Testing", desc: "Before launch, AI predicts creative performance. After launch, continuous A/B testing identifies winners and reallocates resources automatically." },
  { icon: "📊", title: "Revenue Attribution Intelligence", desc: "AI attribution models go beyond last-click to show how every marketing touchpoint contributes to revenue — connected to Aqurion Sales CRM data." },
];

const caseStudies = [
  { tag: "B2B SaaS — FULL-FUNNEL", title: "From Invisible to Industry Leader: Pipeline Grew 3x in Six Months", results: ["Organic traffic: 0 → 28,000/month", "340 MQLs from LinkedIn ABM — 82% SQL rate", "Pipeline: $1.2M → $3.8M", "Lead-to-demo: 8% → 23%"], color: "#EBD96B" },
  { tag: "E-COMMERCE — REBRAND", title: "65% Conversion Lift and $2.4M in Incremental Revenue", results: ["Conversion: 2.1% → 3.5% (65% lift)", "CAC decreased 45%", "ROAS: 2.1x → 3.8x", "Revenue: $8M → $10.4M year one"], color: "#B4D7C4" },
  { tag: "STARTUP — LAUNCH", title: "Zero to 12,000 Users in 90 Days Pre-Launch", results: ["12,000+ waitlist signups (4x goal)", "LinkedIn following grew to 8,400 organically", "Three earned media placements", "2,100 paying customers in 30 days post-launch"], color: "#C4B4D7" },
  { tag: "ENTERPRISE — ABM", title: "Fortune 500 Generates $22M Pipeline from ABM Program", results: ["$22M new pipeline in 12 months", "41/150 target accounts engaged (27%)", "8 net-new enterprise contracts closed", "Avg deal size: $1.4M"], color: "#FFB4A2" },
  { tag: "HOSPITALITY — LOCAL", title: "Multi-Location Restaurant Group: 400% Social Growth", results: ["Social following: 8,400 → 42,000 (400%)", "Email list built to 22,000 subscribers", "Same-store revenue up 22% avg", "New location: 3,000+ waitlist in 48 hours"], color: "#A8D8EA" },
  { tag: "SMB — PERSONAL BRAND", title: "Solo Consultant Grows to Team of Six in 18 Months", results: ["First client in 45 days", "$380K consulting revenue in year one", "LinkedIn: 11,200 followers organically", "Practice grew from solo to 6 in 18 months"], color: "#B5EAD7" },
];

const pricing = [
  { name: "Starter", price: "$2,999", period: "/month", desc: "For companies establishing their marketing foundation.", features: ["Brand strategy (2 sessions/month)", "Logo, guidelines & visual identity", "8 social posts/month", "2 blog posts/month", "Up to $1K ad spend management", "Basic SEO: on-page and local", "Email newsletter setup & deployment", "Monthly performance report", "Client portal access", "Email support — 24hr response"], pop: false },
  { name: "Growth", price: "$5,999", period: "/month", desc: "For companies ready to compete aggressively.", features: ["Full brand strategy (ongoing)", "16 social posts/month: graphics, video", "4 blog posts + 1 long-form asset/month", "Up to $5K ad spend across 2 channels", "Advanced SEO: technical + link building", "AI email marketing & automation", "Paid social advertising management", "Bi-weekly strategy calls", "Real-time campaign dashboard", "Aqurion Sales CRM integration", "Influencer outreach (5/month)", "Priority support — 4hr response"], pop: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "For organizations with complex needs.", features: ["Everything in Growth — unlimited", "Full AI marketing stack deployment", "ABM program design & management", "Unlimited content creation", "Custom ad spend — any budget/channel", "Dedicated senior account manager", "Weekly strategy sessions", "Custom revenue-tied dashboards", "Full Aqurion ecosystem integration", "Multi-location campaign management", "Earned media & PR program", "Quarterly brand & strategy review"], pop: false },
];

const testimonials = [
  { quote: "Aqurion Marketing transformed our digital presence completely. Every decision was tied to a business outcome. They understood our buyers, our market, and our pipeline metrics from day one.", author: "Sarah Chen — CMO", company: "TechVault Solutions", stat: "3x Qualified Leads" },
  { quote: "Their data-driven approach helped us build an engaged community of over 50,000 followers in four months — but more importantly, that community drove real revenue.", author: "Marcus Rivera — Founder", company: "Bloom Wellness", stat: "50K+ Followers" },
  { quote: "Aqurion was different from the first conversation — they asked about our pipeline and close rates before they asked about our logo. The ROI: $4.2M in attributable revenue, 320% ROAS.", author: "Lisa Park — VP Marketing", company: "Greystone Capital", stat: "$4.2M Revenue" },
  { quote: "Their SEO and LinkedIn ABM program put us in front of decision-makers we'd been trying to reach for years. We added $3.1M in new contracts from accounts that came through marketing.", author: "Derek Okonkwo — CEO", company: "Meridian Logistics", stat: "$3.1M Contracts" },
  { quote: "We launched with zero brand and zero audience. Aqurion built both in 90 days. Our investors specifically called out our marketing traction as a differentiator.", author: "Jamie Thornton — Co-Founder", company: "Apex HR Technologies", stat: "Series A Secured" },
];

const faqs = [
  { q: "What types of businesses does Aqurion Marketing work with?", a: "We work with businesses of all sizes across 12 industries — from pre-revenue startups to Fortune 500 enterprises. Our Starter plan is designed for businesses establishing their marketing foundation, and our Enterprise plan is built for complex, multi-market campaigns." },
  { q: "How is Aqurion Marketing different from a traditional agency?", a: "Three ways: we're part of the Aqurion ecosystem with native CRM and AI integration, we measure everything against revenue — not impressions, and we deploy AI across every discipline for capabilities most agencies can't offer." },
  { q: "How quickly will I see results?", a: "Paid media: 30–60 days. SEO and content: 90–180 days to compound, exponential over 12–24 months. Social and brand: 60–90 days. We set clear expectations for each channel and don't promise unrealistic timelines." },
  { q: "Do you require long-term contracts?", a: "Starter and Growth plans are month-to-month after an initial 3-month commitment. Enterprise engagements are 12-month partnerships. We deliver results that make clients want to stay." },
  { q: "Can you work with our existing marketing team?", a: "Absolutely. We function as a full outsourced department, a specialized partner, or a project-based resource — adapting to your structure." },
  { q: "How does the Aqurion Sales integration work?", a: "With Aqurion Sales CRM, integration is native and immediate. With third-party CRMs (HubSpot, Salesforce), we integrate via API or Zapier/Make. Closed deal data flows back for true revenue attribution." },
  { q: "What industries do you specialize in?", a: "B2B SaaS, financial services, professional services, healthcare, e-commerce, hospitality, real estate, education, automotive, logistics, legal, and media — across 12 industries." },
  { q: "Do you offer one-time project work?", a: "Yes — brand identity, campaign strategy, website design, and marketing audits. Many retainer relationships started as single projects." },
  { q: "How do you measure and report on performance?", a: "Real-time campaign dashboard, monthly performance reports with channel-by-channel attribution, and progress against revenue goals. Enterprise clients get weekly reporting and quarterly strategic reviews." },
  { q: "What does onboarding look like?", a: "Brand deep-dive, competitive analysis, audience development, channel/budget strategy, and a 90-day roadmap — typically a two-week process before campaigns go live." },
];

export default function MarketingPage() {
  const bp = process.env.NODE_ENV === "development" ? "/marketing" : "";
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedCase, setExpandedCase] = useState<number | null>(null);
  const [expandedSvc, setExpandedSvc] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        .mk{background:#0C0C0C;color:#fff;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}
        .mk-mesh{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 60% 50% at 30% 40%,rgba(235,217,107,0.03),transparent),radial-gradient(ellipse 50% 60% at 70% 60%,rgba(180,215,196,0.03),transparent);}
        .mk-content{position:relative;z-index:1;}

        .mk-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1rem 3rem;background:rgba(12,12,12,0.85);backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,0.04);}
        .mk-nav-logo{display:flex;align-items:center;gap:0.6rem;font-size:1rem;font-weight:700;text-decoration:none;color:#fff;}
        .mk-nav-logo img{width:32px;height:32px;border-radius:10px;}
        .mk-nav-links{display:flex;align-items:center;gap:2rem;}
        .mk-nav-link{font-size:0.82rem;font-weight:500;color:rgba(255,255,255,0.35);text-decoration:none;transition:color 0.2s;}
        .mk-nav-link:hover{color:#fff;}
        .mk-cta{padding:0.55rem 1.5rem;border-radius:50px;background:#EBD96B;color:#0C0C0C;font-weight:700;font-size:0.82rem;border:none;cursor:pointer;text-decoration:none;transition:all 0.3s;display:inline-block;}
        .mk-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(235,217,107,0.2);}

        .mk-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 4rem;position:relative;}
        .mk-hero-orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(235,217,107,0.06),transparent 70%);top:20%;left:50%;transform:translate(-50%,-50%);animation:mkOrb 6s ease-in-out infinite;}
        @keyframes mkOrb{0%,100%{transform:translate(-50%,-50%) scale(1);}50%{transform:translate(-50%,-50%) scale(1.15);}}
        .mk-eyebrow{display:inline-flex;align-items:center;gap:0.5rem;padding:0.4rem 1.2rem;border-radius:50px;font-size:0.7rem;font-weight:600;background:rgba(235,217,107,0.08);color:#EBD96B;border:1px solid rgba(235,217,107,0.12);margin-bottom:2rem;letter-spacing:0.04em;}
        .mk-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.8rem,6vw,4.5rem);font-weight:700;line-height:1.08;letter-spacing:-0.04em;margin-bottom:1.5rem;position:relative;max-width:800px;}
        .mk-grad{background:linear-gradient(135deg,#EBD96B,#B4D7C4,#C4B4D7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:300% 300%;animation:mkGrad 6s ease infinite;}
        @keyframes mkGrad{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
        .mk-hero-sub{font-size:1.05rem;color:rgba(255,255,255,0.35);max-width:620px;line-height:1.8;margin-bottom:1rem;position:relative;}
        .mk-hero-body{font-size:0.85rem;color:rgba(255,255,255,0.25);max-width:580px;line-height:1.7;margin-bottom:1.5rem;position:relative;}
        .mk-hero-proof{font-size:0.75rem;color:rgba(255,255,255,0.2);margin-bottom:2.5rem;font-style:italic;position:relative;}
        .mk-hero-btns{display:flex;gap:1rem;justify-content:center;position:relative;flex-wrap:wrap;}
        .mk-ghost{padding:0.55rem 1.5rem;border-radius:50px;background:transparent;border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.6);font-weight:600;font-size:0.82rem;text-decoration:none;transition:all 0.3s;cursor:pointer;display:inline-block;}
        .mk-ghost:hover{border-color:rgba(255,255,255,0.3);color:#fff;}

        .mk-stats{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;margin:0 3rem;border-radius:20px;overflow:hidden;background:rgba(255,255,255,0.04);position:relative;z-index:2;margin-top:-3rem;}
        .mk-stat{background:rgba(12,12,12,0.95);padding:2.5rem 1.5rem;text-align:center;}
        .mk-stat-val{font-family:'Space Grotesk',sans-serif;font-size:2rem;font-weight:700;color:#EBD96B;}
        .mk-stat-label{font-size:0.68rem;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.12em;margin-top:0.25rem;}

        .mk-section{padding:6rem 2rem;max-width:1100px;margin:0 auto;}
        .mk-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#EBD96B;margin-bottom:0.75rem;}
        .mk-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,2.8rem);font-weight:700;letter-spacing:-0.03em;margin-bottom:1rem;line-height:1.1;}
        .mk-subtitle{font-size:0.92rem;color:rgba(255,255,255,0.35);max-width:700px;line-height:1.8;margin-bottom:3rem;}

        /* PAIN */
        .mk-pain-grid{display:grid;gap:0.6rem;max-width:800px;}
        .mk-pain{display:flex;align-items:flex-start;gap:1rem;padding:1rem 1.25rem;border-radius:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);transition:all 0.3s;font-size:0.85rem;color:rgba(255,255,255,0.45);line-height:1.7;}
        .mk-pain:hover{border-color:rgba(239,68,68,0.15);transform:translateX(4px);}

        /* SERVICES */
        .mk-services{display:grid;gap:0.75rem;}
        .mk-svc{border-radius:18px;border:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);overflow:hidden;transition:all 0.3s;cursor:pointer;}
        .mk-svc:hover{border-color:rgba(235,217,107,0.12);}
        .mk-svc-header{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 2rem;gap:1rem;}
        .mk-svc-num{font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;opacity:0.12;margin-right:1rem;}
        .mk-svc-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.05rem;flex:1;}
        .mk-svc-toggle{font-size:1rem;color:rgba(255,255,255,0.2);transition:transform 0.3s;}
        .mk-svc-body{padding:0 2rem 1.5rem;}
        .mk-svc-list{list-style:none;display:grid;gap:0.35rem;}
        .mk-svc-list li{font-size:0.82rem;color:rgba(255,255,255,0.35);display:flex;align-items:center;gap:0.5rem;line-height:1.5;}

        /* AI CAPABILITIES */
        .mk-ai-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;}
        .mk-ai-card{padding:2rem;border-radius:18px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);transition:all 0.3s;}
        .mk-ai-card:hover{transform:translateY(-4px);border-color:rgba(235,217,107,0.12);}
        .mk-ai-icon{font-size:1.5rem;margin-bottom:0.75rem;}
        .mk-ai-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;margin-bottom:0.5rem;}
        .mk-ai-desc{font-size:0.82rem;color:rgba(255,255,255,0.35);line-height:1.7;}

        /* CASES */
        .mk-cases{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;}
        .mk-case{padding:2rem;border-radius:18px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);transition:all 0.3s;cursor:pointer;}
        .mk-case:hover{transform:translateY(-4px);border-color:rgba(235,217,107,0.1);}
        .mk-case-tag{font-size:0.62rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:0.2rem 0.6rem;border-radius:50px;display:inline-block;margin-bottom:0.75rem;}
        .mk-case-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.95rem;margin-bottom:1rem;line-height:1.4;}
        .mk-case-results{list-style:none;display:grid;gap:0.3rem;}
        .mk-case-results li{font-size:0.8rem;color:rgba(255,255,255,0.4);display:flex;align-items:center;gap:0.4rem;line-height:1.5;}

        /* PRICING */
        .mk-pricing{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        .mk-plan{padding:2.5rem;border-radius:24px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);transition:all 0.4s;}
        .mk-plan.pop{border-color:rgba(235,217,107,0.2);background:rgba(235,217,107,0.03);}
        .mk-plan:hover{transform:translateY(-4px);}
        .mk-pop-badge{font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#EBD96B;margin-bottom:0.5rem;}
        .mk-plan-name{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);}
        .mk-plan-price{font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;margin:0.5rem 0;}
        .mk-plan-price span{font-size:1rem;color:rgba(255,255,255,0.2);}
        .mk-plan-desc{font-size:0.82rem;color:rgba(255,255,255,0.25);margin-bottom:1.5rem;line-height:1.5;}
        .mk-plan-list{list-style:none;display:grid;gap:0.3rem;}
        .mk-plan-list li{padding:0.3rem 0;font-size:0.78rem;color:rgba(255,255,255,0.4);display:flex;align-items:flex-start;gap:0.4rem;line-height:1.4;}
        .mk-plan-btn{display:block;width:100%;padding:0.7rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:#fff;font-weight:600;font-size:0.82rem;cursor:pointer;margin-top:1.5rem;text-align:center;text-decoration:none;transition:all 0.3s;font-family:'Inter',sans-serif;}
        .mk-plan-btn:hover{background:rgba(255,255,255,0.04);}
        .mk-plan-btn.pop{background:#EBD96B;color:#0C0C0C;border:none;}
        .mk-plan-btn.pop:hover{box-shadow:0 8px 20px rgba(235,217,107,0.2);}

        /* TESTIMONIALS */
        .mk-testimonials{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;}
        .mk-test{padding:2rem;border-radius:18px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);transition:all 0.3s;}
        .mk-test:hover{border-color:rgba(235,217,107,0.1);}
        .mk-test-quote{font-size:0.88rem;color:rgba(255,255,255,0.45);line-height:1.8;margin-bottom:1.25rem;font-style:italic;}
        .mk-test-author{font-weight:700;font-size:0.82rem;color:#fff;}
        .mk-test-company{font-size:0.72rem;color:rgba(255,255,255,0.25);}
        .mk-test-stat{display:inline-block;margin-top:0.5rem;padding:0.2rem 0.6rem;border-radius:50px;font-size:0.62rem;font-weight:600;background:rgba(235,217,107,0.08);color:#EBD96B;}

        /* FAQ */
        .mk-faq{max-width:700px;}
        .mk-faq-item{border-bottom:1px solid rgba(255,255,255,0.04);}
        .mk-faq-q{padding:1.25rem 0;font-weight:600;font-size:0.92rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:color 0.2s;color:rgba(255,255,255,0.7);}
        .mk-faq-q:hover{color:#EBD96B;}
        .mk-faq-a{padding:0 0 1.25rem;font-size:0.85rem;color:rgba(255,255,255,0.35);line-height:1.8;}

        /* FINAL CTA */
        .mk-cta-sec{text-align:center;padding:6rem 2rem;margin:0 3rem 4rem;border-radius:24px;border:1px solid rgba(235,217,107,0.08);position:relative;overflow:hidden;}
        .mk-cta-sec::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(235,217,107,0.04),rgba(180,215,196,0.02));}
        .mk-cta-sec h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;margin-bottom:1rem;position:relative;}
        .mk-cta-sec p{color:rgba(255,255,255,0.35);margin-bottom:2rem;max-width:550px;margin-left:auto;margin-right:auto;position:relative;line-height:1.7;font-size:0.9rem;}
        .mk-trust{display:flex;flex-wrap:wrap;gap:0.75rem;justify-content:center;margin-top:2rem;position:relative;}
        .mk-trust-item{font-size:0.7rem;color:rgba(255,255,255,0.3);display:flex;align-items:center;gap:0.3rem;}

        .mk-footer{padding:3rem 2rem;max-width:1100px;margin:0 auto;}
        .mk-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem;margin-bottom:2rem;}
        .mk-footer-brand{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;margin-bottom:0.5rem;}
        .mk-footer-desc{font-size:0.78rem;color:rgba(255,255,255,0.2);line-height:1.6;}
        .mk-footer-col-title{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.2);margin-bottom:0.75rem;}
        .mk-footer-link{display:block;font-size:0.78rem;color:rgba(255,255,255,0.3);text-decoration:none;padding:0.2rem 0;transition:color 0.2s;}
        .mk-footer-link:hover{color:#EBD96B;}
        .mk-footer-bottom{text-align:center;font-size:0.68rem;color:rgba(255,255,255,0.1);padding-top:2rem;border-top:1px solid rgba(255,255,255,0.04);}

        @media(max-width:768px){
          .mk-nav{padding:1rem 1.5rem;}.mk-nav-links{display:none;}
          .mk-stats{grid-template-columns:repeat(2,1fr);margin:0 1rem;margin-top:-2rem;}.mk-stats .mk-stat:last-child{display:none;}
          .mk-ai-grid,.mk-cases,.mk-pricing,.mk-testimonials{grid-template-columns:1fr;}
          .mk-cta-sec{margin:0 1rem 3rem;}
          .mk-footer-grid{grid-template-columns:1fr;}
        }
      `}</style>

      <div className="mk">
        <div className="mk-mesh" />
        <div className="mk-content">
          <nav className="mk-nav">
            <a href={`${bp}/`} className="mk-nav-logo"><img src={`${bp}/logos/aqurion-marketing-icon.png`} alt="" />Aqurion Marketing</a>
            <div className="mk-nav-links">
              <a href="#services" className="mk-nav-link">Services</a>
              <a href="#cases" className="mk-nav-link">Work</a>
              <a href="#pricing" className="mk-nav-link">Pricing</a>
              <a href="#faq" className="mk-nav-link">FAQ</a>
            </div>
            <a href="#contact" className="mk-cta">Start a Project</a>
          </nav>

          {/* HERO */}
          <section className="mk-hero">
            <div className="mk-hero-orb" />
            <Rv><div className="mk-eyebrow">AI-Powered Marketing • Data-Driven Growth • An Aqurion Holdings Company</div></Rv>
            <Rv d={0.1}><h1>Marketing That <span className="mk-grad">Thinks, Adapts, and Performs</span> — While Your Team Focuses on Strategy.</h1></Rv>
            <Rv d={0.2}><p className="mk-hero-sub">Aqurion Marketing combines world-class brand strategy with AI-driven automation, predictive analytics, and cross-channel campaign intelligence — to build brands that stand out and campaigns that convert.</p></Rv>
            <Rv d={0.3}><p className="mk-hero-proof">200+ brands transformed. 50M+ impressions generated. 340% average campaign ROI. Across 12 industries.</p></Rv>
            <Rv d={0.4}><div className="mk-hero-btns"><a href="#contact" className="mk-cta" style={{ padding: "0.75rem 2.5rem" }}>Start a Project</a><a href="#cases" className="mk-ghost">View Our Work →</a></div></Rv>
          </section>

          {/* STATS */}
          <Rv><div className="mk-stats">{heroStats.map(s => <div key={s.label} className="mk-stat"><div className="mk-stat-val">{s.val}</div><div className="mk-stat-label">{s.label}</div></div>)}</div></Rv>

          {/* PAIN POINTS */}
          <section className="mk-section">
            <Rv><div className="mk-label">The Problem</div><h2 className="mk-title">Most Marketing Budgets Are Being Spent. Most Aren't Being Invested.</h2></Rv>
            <Rv d={0.1}><p className="mk-subtitle">The difference between marketing that burns money and marketing that builds businesses comes down to three things: data, integration, and the intelligence to know what to do with both.</p></Rv>
            <div className="mk-pain-grid">{painPoints.map((p, i) => <Rv key={i} d={i * 0.04}><div className="mk-pain"><span style={{ color: "rgba(239,68,68,0.5)", flexShrink: 0 }}>✕</span> {p}</div></Rv>)}</div>
          </section>

          {/* SERVICES */}
          <section id="services" className="mk-section" style={{ textAlign: "center" }}>
            <Rv><div className="mk-label">Services</div><h2 className="mk-title">Every Discipline. Every Channel. One Integrated Team.</h2></Rv>
            <div className="mk-services">
              {services.map((s, i) => (
                <Rv key={s.title} d={i * 0.04}>
                  <div className="mk-svc" onClick={() => setExpandedSvc(expandedSvc === i ? null : i)}>
                    <div className="mk-svc-header">
                      <span className="mk-svc-num">{s.num}</span>
                      <span className="mk-svc-title" style={{ color: s.color }}>{s.title}</span>
                      <span className="mk-svc-toggle" style={{ transform: expandedSvc === i ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                    </div>
                    <AnimatePresence>{expandedSvc === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                        <div className="mk-svc-body"><ul className="mk-svc-list">{s.items.map(it => <li key={it}><span style={{ background: s.color, width: 4, height: 4, borderRadius: "50%", display: "inline-block", flexShrink: 0 }} /> {it}</li>)}</ul></div>
                      </motion.div>
                    )}</AnimatePresence>
                  </div>
                </Rv>
              ))}
            </div>
          </section>

          {/* AI CAPABILITIES */}
          <section className="mk-section" style={{ textAlign: "center" }}>
            <Rv><div className="mk-label">AI Marketing</div><h2 className="mk-title">We Don't Use AI as a Shortcut. We Use It as a Competitive Weapon.</h2></Rv>
            <div className="mk-ai-grid">
              {aiCapabilities.map((c, i) => (
                <Rv key={c.title} d={i * 0.06}><div className="mk-ai-card">
                  <div className="mk-ai-icon">{c.icon}</div>
                  <div className="mk-ai-title">{c.title}</div>
                  <div className="mk-ai-desc">{c.desc}</div>
                </div></Rv>
              ))}
            </div>
          </section>

          {/* CASE STUDIES */}
          <section id="cases" className="mk-section" style={{ textAlign: "center" }}>
            <Rv><div className="mk-label">Results</div><h2 className="mk-title">Results-First. Always.</h2></Rv>
            <Rv d={0.1}><p className="mk-subtitle" style={{ margin: "0 auto 3rem" }}>Every engagement starts with a clear understanding of what success looks like — in revenue, not impressions.</p></Rv>
            <div className="mk-cases">
              {caseStudies.map((cs, i) => (
                <Rv key={i} d={i * 0.06}><div className="mk-case">
                  <div className="mk-case-tag" style={{ background: `${cs.color}15`, color: cs.color }}>{cs.tag}</div>
                  <div className="mk-case-title">{cs.title}</div>
                  <ul className="mk-case-results">{cs.results.map((r, j) => <li key={j}><span style={{ color: cs.color }}>✓</span> {r}</li>)}</ul>
                </div></Rv>
              ))}
            </div>
          </section>

          {/* PRICING */}
          <section id="pricing" className="mk-section" style={{ textAlign: "center" }}>
            <Rv><div className="mk-label">Pricing</div><h2 className="mk-title">From First Brand to Full Scale.</h2></Rv>
            <div className="mk-pricing">
              {pricing.map((p, i) => (
                <Rv key={p.name} d={i * 0.1}><div className={`mk-plan${p.pop ? " pop" : ""}`}>
                  {p.pop && <div className="mk-pop-badge">⭐ Most Popular</div>}
                  <div className="mk-plan-name">{p.name}</div>
                  <div className="mk-plan-price">{p.price}<span>{p.period}</span></div>
                  <div className="mk-plan-desc">{p.desc}</div>
                  <ul className="mk-plan-list">{p.features.map(f => <li key={f}><span style={{ color: "#EBD96B" }}>✓</span> {f}</li>)}</ul>
                  <a href="#contact" className={`mk-plan-btn${p.pop ? " pop" : ""}`}>{p.pop ? "Start Growing" : "Get Started"}</a>
                </div></Rv>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="mk-section" style={{ textAlign: "center" }}>
            <Rv><div className="mk-label">Testimonials</div><h2 className="mk-title">Clients Stay Because the Numbers Move.</h2></Rv>
            <div className="mk-testimonials">
              {testimonials.map((t, i) => (
                <Rv key={i} d={i * 0.06}><div className="mk-test">
                  <div className="mk-test-quote">"{t.quote}"</div>
                  <div className="mk-test-author">{t.author}</div>
                  <div className="mk-test-company">{t.company}</div>
                  <div className="mk-test-stat">{t.stat}</div>
                </div></Rv>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mk-section">
            <Rv><div className="mk-label">FAQ</div><h2 className="mk-title">Questions We Hear Often. Answers We Give Honestly.</h2></Rv>
            <div className="mk-faq">
              {faqs.map((f, i) => (
                <div key={i} className="mk-faq-item">
                  <div className="mk-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>{f.q}<span style={{ color: "#EBD96B", fontSize: "1.2rem" }}>{openFaq === i ? "−" : "+"}</span></div>
                  <AnimatePresence>{openFaq === i && <motion.div className="mk-faq-a" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>{f.a}</motion.div>}</AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA */}
          <Rv><section id="contact" className="mk-cta-sec">
            <h2>Your Market Isn't Waiting. <span className="mk-grad">Neither Should You</span>.</h2>
            <p>Start with a conversation. We'll walk through your current marketing, your growth goals, and what a high-impact engagement would look like — no templates, no generic proposals.</p>
            <a href="mailto:Chat@AqurionMarketing.com" className="mk-cta" style={{ padding: "0.75rem 2.5rem" }}>Start a Project — Book a Strategy Session</a>
            <div className="mk-trust">
              {["200+ brands across 12 industries", "AI-powered campaigns tied to revenue", "Native Aqurion Sales integration", "Month-to-month flexibility", "Dedicated account manager"].map(t => <span key={t} className="mk-trust-item"><span style={{ color: "#EBD96B" }}>✓</span> {t}</span>)}
            </div>
          </section></Rv>

          {/* FOOTER */}
          <footer className="mk-footer">
            <div className="mk-footer-grid">
              <div><div className="mk-footer-brand">Aqurion Marketing</div><div className="mk-footer-desc">An Aqurion Holdings Company. Data-driven marketing that builds brands and drives revenue.</div></div>
              <div><div className="mk-footer-col-title">Ecosystem</div><a href="https://Aqurion.net" className="mk-footer-link">Aqurion Holdings</a><a href="https://Aqurion.AI" className="mk-footer-link">Aqurion AI</a><a href="https://AquironSales.com" className="mk-footer-link">Sales</a><a href="https://AqurionDev.com" className="mk-footer-link">Development</a></div>
              <div><div className="mk-footer-col-title">Contact</div><a href="mailto:Chat@AqurionMarketing.com" className="mk-footer-link">Chat@AqurionMarketing.com</a><a href="tel:+18882787106" className="mk-footer-link">1-888-AQUR-10-N (Press 1)</a></div>
            </div>
            <div className="mk-footer-bottom">© {new Date().getFullYear()} Aqurion Marketing — An Aqurion Holdings Company</div>
          </footer>
        </div>
      </div>
    </>
  );
}
