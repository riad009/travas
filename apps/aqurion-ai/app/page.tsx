"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Rv({ children, d = 0 }: { children: React.ReactNode; d?: number }) {
  return <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: d, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

/* ── DATA ── */
const heroStats = [
  { val: "56+", label: "AI Applications" },
  { val: "12", label: "Industry Sectors" },
  { val: "10K+", label: "Active Users" },
  { val: "99.9%", label: "Platform Uptime" },
  { val: "250+", label: "Integrations" },
];

const sectors = [
  {
    id: "sales", icon: "💰", name: "Sales Automation", count: 8, color: "#10B981",
    desc: "AI-powered sales bots, pipeline automation, CRM intelligence, and revenue forecasting tools.",
    apps: [
      { name: "AI Sales Chatbot", desc: "Conversational AI that qualifies leads, answers product questions, and books meetings 24/7." },
      { name: "AI Email Bot", desc: "Intelligent email sequences that adapt based on engagement, optimize timing, and personalize every message." },
      { name: "AI Phone Bot", desc: "Natural-sounding voice AI for inbound/outbound calls with objection handling and warm transfers." },
      { name: "Smart CRM", desc: "Auto-logging CRM with AI lead scoring, deal health monitoring, and predictive forecasting." },
      { name: "Pipeline Analytics", desc: "Real-time pipeline visualization with AI-powered win probability and bottleneck detection." },
      { name: "Revenue Forecasting", desc: "ML-based revenue predictions built on historical close rates and current engagement velocity." },
      { name: "Lead Scoring Engine", desc: "Dynamic scoring based on engagement behavior, demographic fit, and predictive close probability." },
      { name: "Sales Intelligence Hub", desc: "360° contact enrichment with company data, social profiles, and AI-generated talking points." },
    ]
  },
  {
    id: "marketing", icon: "📢", name: "Marketing & Growth", count: 7, color: "#EBD96B",
    desc: "AI content creation, campaign optimization, SEO intelligence, and predictive audience targeting.",
    apps: [
      { name: "AI Content Generator", desc: "Create blog posts, social captions, ad copy, and email content — optimized for engagement and SEO." },
      { name: "Campaign Optimizer", desc: "Real-time budget allocation across channels, shifting spend toward highest-performing placements." },
      { name: "SEO Intelligence", desc: "AI-powered keyword research, content gap analysis, and technical SEO recommendations." },
      { name: "Social Media Autopilot", desc: "AI scheduling, hashtag optimization, and engagement analytics across all platforms." },
      { name: "Predictive Audiences", desc: "Build lookalike segments using behavioral data and intent signals for precision targeting." },
      { name: "Brand Monitor", desc: "Real-time sentiment analysis and brand mention tracking powered by NLP." },
      { name: "A/B Testing Engine", desc: "Continuous multivariate testing with AI-driven winner selection and auto-optimization." },
    ]
  },
  {
    id: "finance", icon: "🏦", name: "Financial Services", count: 6, color: "#3B82F6",
    desc: "Fraud detection, risk assessment, automated compliance, and intelligent financial operations.",
    apps: [
      { name: "Fraud Detection AI", desc: "Real-time transaction monitoring with pattern recognition and anomaly detection." },
      { name: "Risk Assessment Engine", desc: "ML-powered credit scoring and risk evaluation with explainable AI decisions." },
      { name: "Compliance Automator", desc: "Automated regulatory compliance monitoring with real-time policy updates." },
      { name: "Portfolio Optimizer", desc: "AI-driven portfolio analysis and rebalancing recommendations based on market signals." },
      { name: "KYC/AML Assistant", desc: "Automated identity verification and anti-money laundering checks with document parsing." },
      { name: "Financial Chatbot", desc: "Customer-facing AI for account inquiries, transaction history, and financial guidance." },
    ]
  },
  {
    id: "healthcare", icon: "🏥", name: "Healthcare & Life Sciences", count: 5, color: "#EF4444",
    desc: "Patient engagement, clinical decision support, medical imaging analysis, and healthcare operations.",
    apps: [
      { name: "Patient Engagement Bot", desc: "AI-powered appointment scheduling, medication reminders, and symptom triage." },
      { name: "Clinical Decision Support", desc: "Evidence-based treatment recommendations and drug interaction detection." },
      { name: "Medical Image Analysis", desc: "AI-assisted radiology with anomaly detection and diagnostic support." },
      { name: "Health Records Parser", desc: "NLP-powered extraction and structuring of unstructured medical documents." },
      { name: "Care Coordination Hub", desc: "AI workflow optimization for patient routing, bed management, and resource allocation." },
    ]
  },
  {
    id: "realestate", icon: "🏠", name: "Real Estate & PropTech", count: 5, color: "#8B5CF6",
    desc: "Property valuation, market prediction, tenant management, and smart building operations.",
    apps: [
      { name: "Property Valuation AI", desc: "Automated comparative market analysis with ML-powered price predictions." },
      { name: "Market Predictor", desc: "Real estate market trend forecasting using economic indicators and transaction data." },
      { name: "Tenant Screening AI", desc: "Automated background checks, credit analysis, and risk assessment for tenants." },
      { name: "Smart Building Manager", desc: "IoT-integrated building management with predictive maintenance and energy optimization." },
      { name: "Real Estate Chatbot", desc: "Property discovery, virtual tour scheduling, and lead qualification for brokerages." },
    ]
  },
  {
    id: "ecommerce", icon: "🛒", name: "E-Commerce & Retail", count: 5, color: "#F59E0B",
    desc: "Product recommendations, inventory optimization, pricing intelligence, and customer experience.",
    apps: [
      { name: "Product Recommender", desc: "Personalized product suggestions using collaborative filtering and purchase history." },
      { name: "Dynamic Pricing Engine", desc: "Real-time price optimization based on demand, competition, and inventory levels." },
      { name: "Inventory Forecaster", desc: "ML-powered demand forecasting for optimal stock levels and supply chain planning." },
      { name: "Visual Search", desc: "Image-based product discovery — upload a photo, find matching products instantly." },
      { name: "Customer Experience Bot", desc: "AI support for order tracking, returns, product questions, and upsell recommendations." },
    ]
  },
  {
    id: "hospitality", icon: "🏨", name: "Hospitality & Travel", count: 4, color: "#06B6D4",
    desc: "Revenue management, guest experience, operational efficiency, and booking optimization.",
    apps: [
      { name: "Revenue Manager", desc: "Dynamic rate optimization across booking channels with demand forecasting." },
      { name: "Guest Experience AI", desc: "Personalized guest communications, preference tracking, and concierge automation." },
      { name: "Booking Optimizer", desc: "Channel management and distribution optimization with real-time rate parity." },
      { name: "Operations Assistant", desc: "Housekeeping scheduling, maintenance prediction, and staff optimization." },
    ]
  },
  {
    id: "legal", icon: "⚖️", name: "Legal & Compliance", count: 4, color: "#EC4899",
    desc: "Contract analysis, legal research, compliance monitoring, and document automation.",
    apps: [
      { name: "Contract Analyzer", desc: "AI-powered contract review with risk identification, clause extraction, and comparison." },
      { name: "Legal Research AI", desc: "Case law analysis, precedent matching, and regulatory intelligence powered by NLP." },
      { name: "Compliance Monitor", desc: "Continuous regulatory monitoring with automated alert generation and reporting." },
      { name: "Document Automator", desc: "Template-based legal document generation with intelligent clause selection." },
    ]
  },
  {
    id: "education", icon: "🎓", name: "Education & EdTech", count: 4, color: "#14B8A6",
    desc: "Adaptive learning, student success prediction, content personalization, and administrative AI.",
    apps: [
      { name: "Adaptive Learning Engine", desc: "Personalized learning paths that adjust difficulty, pace, and content based on student performance." },
      { name: "Student Success Predictor", desc: "Early warning system for at-risk students using engagement and performance data." },
      { name: "AI Tutor", desc: "Conversational AI tutor for homework help, concept explanation, and practice problems." },
      { name: "Admin Assistant", desc: "Automated enrollment processing, scheduling optimization, and communication management." },
    ]
  },
  {
    id: "logistics", icon: "🚛", name: "Logistics & Supply Chain", count: 4, color: "#F97316",
    desc: "Route optimization, demand forecasting, warehouse automation, and fleet management.",
    apps: [
      { name: "Route Optimizer", desc: "AI-driven route planning considering traffic, weather, delivery windows, and fuel efficiency." },
      { name: "Demand Forecaster", desc: "Multi-variable demand prediction using historical data, seasonality, and market signals." },
      { name: "Warehouse AI", desc: "Pick path optimization, inventory placement, and autonomous systems management." },
      { name: "Fleet Manager", desc: "Predictive maintenance scheduling, driver performance analytics, and utilization optimization." },
    ]
  },
  {
    id: "government", icon: "🏛️", name: "Government & Public Sector", count: 4, color: "#6366F1",
    desc: "Citizen services, document processing, fraud detection, and operational intelligence.",
    apps: [
      { name: "Citizen Services Bot", desc: "24/7 AI-powered citizen support for permits, licenses, and government services." },
      { name: "Document Processor", desc: "Automated form processing, data extraction, and workflow routing for government agencies." },
      { name: "Public Safety Analytics", desc: "Predictive analytics for resource allocation, incident response, and community safety." },
      { name: "Grant Management AI", desc: "Automated grant application review, compliance monitoring, and fund allocation." },
    ]
  },
  {
    id: "automotive", icon: "🚗", name: "Automotive & Mobility", count: 4, color: "#A855F7",
    desc: "Vehicle diagnostics, dealership automation, fleet intelligence, and mobility services.",
    apps: [
      { name: "Vehicle Diagnostics AI", desc: "OBD-II and telematics data analysis for predictive maintenance and fault detection." },
      { name: "Dealership Automation", desc: "AI-powered lead management, inventory optimization, and customer follow-up for dealerships." },
      { name: "Fleet Intelligence", desc: "Multi-vehicle tracking, maintenance scheduling, and operational cost optimization." },
      { name: "Connected Car Platform", desc: "In-vehicle AI for navigation, voice commands, and personalized driver experiences." },
    ]
  },
];

const platformFeatures = [
  { icon: "🧠", title: "AI-Native Architecture", desc: "Every application is built on our proprietary AI/ML infrastructure — not bolted-on intelligence, but purpose-built AI from the ground up." },
  { icon: "🔗", title: "Ecosystem Integration", desc: "Native connections to Aqurion Sales, Marketing, and Development. Plus 250+ external integrations via API, webhook, and iPaaS." },
  { icon: "💳", title: "Oracle Merchant Services", desc: "PCI DSS compliant payment processing built into every commercial application. Accept payments where your AI operates." },
  { icon: "📱", title: "Multi-Platform Deployment", desc: "Deploy on web, mobile (iOS & Android), desktop, voice assistants, IoT devices, and embedded systems." },
  { icon: "🔒", title: "Enterprise Security", desc: "SOC 2 Type II certified. End-to-end encryption. Role-based access control. Data residency options. GDPR and HIPAA ready." },
  { icon: "📊", title: "Unified Analytics", desc: "Cross-application analytics dashboard with custom reporting, anomaly detection, and executive-ready insights." },
];

export default function AIPage() {
  const bp = process.env.NODE_ENV === "development" ? "/ai" : "";
  const [activeSector, setActiveSector] = useState(0);
  const totalApps = sectors.reduce((acc, s) => acc + s.apps.length, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        .ai{background:#06080F;color:#fff;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}
        .ai-aurora{position:fixed;inset:0;z-index:0;pointer-events:none;}
        .ai-aurora-a{position:absolute;width:800px;height:600px;border-radius:50%;top:-10%;left:-10%;background:radial-gradient(circle,rgba(99,102,241,0.05),transparent 70%);animation:aiA 12s ease-in-out infinite;}
        .ai-aurora-b{position:absolute;width:600px;height:800px;border-radius:50%;bottom:-15%;right:-5%;background:radial-gradient(circle,rgba(16,185,129,0.04),transparent 70%);animation:aiA 15s ease-in-out infinite reverse;}
        @keyframes aiA{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(30px,-20px) scale(1.1);}}
        .ai-z{position:relative;z-index:1;}

        .ai-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1rem 3rem;background:rgba(6,8,15,0.8);backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,0.03);}
        .ai-nav-logo{display:flex;align-items:center;gap:0.6rem;font-size:1rem;font-weight:700;text-decoration:none;color:#fff;}
        .ai-nav-logo img{width:32px;height:32px;border-radius:10px;}
        .ai-nav-links{display:flex;gap:2rem;}
        .ai-nav-link{font-size:0.82rem;font-weight:500;color:rgba(255,255,255,0.3);text-decoration:none;transition:color 0.2s;}
        .ai-nav-link:hover{color:#fff;}
        .ai-cta{padding:0.55rem 1.5rem;border-radius:50px;background:linear-gradient(135deg,#6366F1,#818CF8);color:#fff;font-weight:700;font-size:0.82rem;border:none;cursor:pointer;text-decoration:none;transition:all 0.3s;display:inline-block;}
        .ai-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,102,241,0.3);}
        .ai-cta-outline{padding:0.55rem 1.5rem;border-radius:50px;background:transparent;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);font-weight:600;font-size:0.82rem;text-decoration:none;transition:all 0.3s;display:inline-block;cursor:pointer;}
        .ai-cta-outline:hover{border-color:rgba(255,255,255,0.3);color:#fff;}

        .ai-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 4rem;}
        .ai-eyebrow{display:inline-flex;align-items:center;gap:0.5rem;padding:0.4rem 1.2rem;border-radius:50px;font-size:0.7rem;font-weight:600;background:rgba(99,102,241,0.08);color:#818CF8;border:1px solid rgba(99,102,241,0.12);margin-bottom:2rem;letter-spacing:0.04em;}
        .ai-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.8rem,6vw,4.5rem);font-weight:700;line-height:1.08;letter-spacing:-0.04em;margin-bottom:1.5rem;max-width:850px;}
        .ai-grad{background:linear-gradient(135deg,#6366F1,#818CF8,#A5B4FC);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .ai-hero-sub{font-size:1.05rem;color:rgba(255,255,255,0.35);max-width:620px;line-height:1.8;margin-bottom:1.5rem;}
        .ai-hero-proof{font-size:0.75rem;color:rgba(255,255,255,0.2);margin-bottom:2.5rem;font-style:italic;}
        .ai-hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}

        .ai-stats{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;margin:0 3rem;border-radius:20px;overflow:hidden;background:rgba(255,255,255,0.03);margin-top:-3rem;}
        .ai-stat{background:rgba(6,8,15,0.95);padding:2.5rem 1.5rem;text-align:center;}
        .ai-stat-val{font-family:'Space Grotesk',sans-serif;font-size:2rem;font-weight:700;}
        .ai-stat-label{font-size:0.68rem;color:rgba(255,255,255,0.2);text-transform:uppercase;letter-spacing:0.12em;margin-top:0.25rem;}

        .ai-section{padding:6rem 2rem;max-width:1100px;margin:0 auto;}
        .ai-section-wide{padding:6rem 2rem;max-width:1300px;margin:0 auto;}
        .ai-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#818CF8;margin-bottom:0.75rem;}
        .ai-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,2.8rem);font-weight:700;letter-spacing:-0.03em;margin-bottom:1rem;line-height:1.1;}
        .ai-subtitle{font-size:0.92rem;color:rgba(255,255,255,0.3);max-width:700px;line-height:1.8;margin-bottom:3rem;}

        /* SECTOR SELECTOR */
        .ai-sector-layout{display:grid;grid-template-columns:320px 1fr;gap:2rem;min-height:500px;}
        .ai-sector-list{display:grid;gap:0.4rem;align-content:start;max-height:600px;overflow-y:auto;padding-right:0.5rem;}
        .ai-sector-list::-webkit-scrollbar{width:4px;}.ai-sector-list::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.06);border-radius:4px;}
        .ai-sector-btn{display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;border-radius:12px;border:1px solid transparent;background:transparent;color:rgba(255,255,255,0.4);font-size:0.85rem;font-weight:500;cursor:pointer;transition:all 0.2s;text-align:left;font-family:'Inter',sans-serif;}
        .ai-sector-btn:hover{background:rgba(255,255,255,0.02);color:rgba(255,255,255,0.7);}
        .ai-sector-btn.active{background:rgba(99,102,241,0.06);border-color:rgba(99,102,241,0.12);color:#fff;}
        .ai-sector-btn-icon{font-size:1.2rem;flex-shrink:0;}
        .ai-sector-btn-name{flex:1;font-weight:600;}
        .ai-sector-btn-count{font-size:0.68rem;color:rgba(255,255,255,0.2);background:rgba(255,255,255,0.03);padding:0.15rem 0.5rem;border-radius:50px;}

        .ai-sector-detail{padding:1.5rem;border-radius:20px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);}
        .ai-sector-header{display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;}
        .ai-sector-icon-lg{font-size:1.5rem;}
        .ai-sector-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.3rem;}
        .ai-sector-desc{font-size:0.85rem;color:rgba(255,255,255,0.35);line-height:1.7;margin-bottom:1.5rem;}
        .ai-apps-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem;}
        .ai-app{padding:1.25rem;border-radius:14px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.03);transition:all 0.3s;}
        .ai-app:hover{border-color:rgba(99,102,241,0.12);transform:translateY(-2px);}
        .ai-app-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.88rem;margin-bottom:0.3rem;}
        .ai-app-desc{font-size:0.78rem;color:rgba(255,255,255,0.3);line-height:1.6;}

        /* PLATFORM FEATURES */
        .ai-feats{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        .ai-feat{padding:2rem;border-radius:18px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);transition:all 0.3s;}
        .ai-feat:hover{transform:translateY(-4px);border-color:rgba(99,102,241,0.1);}
        .ai-feat-icon{font-size:1.5rem;margin-bottom:0.75rem;}
        .ai-feat-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;margin-bottom:0.4rem;}
        .ai-feat-desc{font-size:0.82rem;color:rgba(255,255,255,0.3);line-height:1.7;}

        /* CTA SEC */
        .ai-cta-sec{text-align:center;padding:6rem 2rem;margin:0 3rem 4rem;border-radius:24px;border:1px solid rgba(99,102,241,0.08);position:relative;overflow:hidden;}
        .ai-cta-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(99,102,241,0.06),transparent);}
        .ai-cta-sec h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;margin-bottom:1rem;position:relative;}
        .ai-cta-sec p{color:rgba(255,255,255,0.35);margin-bottom:2rem;max-width:550px;margin-left:auto;margin-right:auto;position:relative;line-height:1.7;font-size:0.9rem;}

        .ai-footer{padding:3rem 2rem;max-width:1100px;margin:0 auto;}
        .ai-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem;margin-bottom:2rem;}
        .ai-footer-brand{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;margin-bottom:0.5rem;}
        .ai-footer-desc{font-size:0.78rem;color:rgba(255,255,255,0.2);line-height:1.6;}
        .ai-footer-col-title{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.15);margin-bottom:0.75rem;}
        .ai-footer-link{display:block;font-size:0.78rem;color:rgba(255,255,255,0.25);text-decoration:none;padding:0.2rem 0;transition:color 0.2s;}
        .ai-footer-link:hover{color:#818CF8;}
        .ai-footer-bottom{text-align:center;font-size:0.68rem;color:rgba(255,255,255,0.08);padding-top:2rem;border-top:1px solid rgba(255,255,255,0.03);}

        @media(max-width:768px){
          .ai-nav{padding:1rem 1.5rem;}.ai-nav-links{display:none;}
          .ai-stats{grid-template-columns:repeat(2,1fr);margin:0 1rem;margin-top:-2rem;}.ai-stats .ai-stat:last-child{display:none;}
          .ai-sector-layout{grid-template-columns:1fr;}.ai-sector-list{max-height:none;flex-direction:row;display:flex;overflow-x:auto;gap:0.5rem;padding-bottom:0.5rem;}
          .ai-apps-grid,.ai-feats{grid-template-columns:1fr;}
          .ai-cta-sec{margin:0 1rem 3rem;}
          .ai-footer-grid{grid-template-columns:1fr;}
        }
      `}</style>

      <div className="ai">
        <div className="ai-aurora"><div className="ai-aurora-a" /><div className="ai-aurora-b" /></div>
        <div className="ai-z">
          <nav className="ai-nav">
            <a href={`${bp}/`} className="ai-nav-logo"><img src={`${bp}/logos/aqurion-ai-icon.png`} alt="" />Aqurion AI</a>
            <div className="ai-nav-links">
              <a href="#catalog" className="ai-nav-link">App Catalog</a>
              <a href="#platform" className="ai-nav-link">Platform</a>
              <a href="#contact" className="ai-nav-link">Contact</a>
            </div>
            <a href="#contact" className="ai-cta">Get Started</a>
          </nav>

          {/* ═══ HERO ═══ */}
          <section className="ai-hero">
            <Rv><div className="ai-eyebrow">Enterprise AI Platform • {totalApps}+ Applications • 12 Industries</div></Rv>
            <Rv d={0.1}><h1>The <span className="ai-grad">Intelligence Layer</span> for Every Industry.</h1></Rv>
            <Rv d={0.2}><p className="ai-hero-sub">Aqurion AI is a comprehensive AI application platform delivering {totalApps}+ purpose-built AI solutions across 12 industry sectors — from sales automation to healthcare diagnostics, financial compliance to logistics optimization.</p></Rv>
            <Rv d={0.3}><p className="ai-hero-proof">Powered by the Aqurion ecosystem. Built for enterprise. Available for everyone.</p></Rv>
            <Rv d={0.4}><div className="ai-hero-btns"><a href="#catalog" className="ai-cta" style={{ padding: "0.75rem 2.5rem" }}>Explore Applications</a><a href="#contact" className="ai-cta-outline">Request a Demo →</a></div></Rv>
          </section>

          {/* ═══ STATS ═══ */}
          <Rv><div className="ai-stats">
            {heroStats.map((s, i) => <div key={s.label} className="ai-stat"><div className="ai-stat-val" style={{ color: ["#6366F1","#10B981","#EBD96B","#3B82F6","#F59E0B"][i] }}>{s.val}</div><div className="ai-stat-label">{s.label}</div></div>)}
          </div></Rv>

          {/* ═══ SECTOR CATALOG ═══ */}
          <section id="catalog" className="ai-section-wide" style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Rv><div className="ai-label">Application Catalog</div><h2 className="ai-title">{totalApps}+ AI Applications. 12 Industry Sectors. One Platform.</h2></Rv>
            <Rv d={0.1}><p className="ai-subtitle">Select an industry to explore purpose-built AI applications designed for your sector's unique challenges.</p></Rv>
            <div className="ai-sector-layout">
              <div className="ai-sector-list">
                {sectors.map((s, i) => (
                  <button key={s.id} className={`ai-sector-btn${activeSector === i ? " active" : ""}`} onClick={() => setActiveSector(i)}>
                    <span className="ai-sector-btn-icon">{s.icon}</span>
                    <span className="ai-sector-btn-name">{s.name}</span>
                    <span className="ai-sector-btn-count">{s.count} apps</span>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={activeSector} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="ai-sector-detail">
                    <div className="ai-sector-header">
                      <span className="ai-sector-icon-lg">{sectors[activeSector].icon}</span>
                      <span className="ai-sector-name" style={{ color: sectors[activeSector].color }}>{sectors[activeSector].name}</span>
                    </div>
                    <p className="ai-sector-desc">{sectors[activeSector].desc}</p>
                    <div className="ai-apps-grid">
                      {sectors[activeSector].apps.map((app, j) => (
                        <div key={app.name} className="ai-app">
                          <div className="ai-app-name">{app.name}</div>
                          <div className="ai-app-desc">{app.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* ═══ PLATFORM ═══ */}
          <section id="platform" className="ai-section" style={{ textAlign: "center" }}>
            <Rv><div className="ai-label">Platform</div><h2 className="ai-title">Enterprise-Grade AI Infrastructure. Built for Scale.</h2></Rv>
            <Rv d={0.1}><p className="ai-subtitle" style={{ margin: "0 auto 3rem" }}>Every Aqurion AI application runs on our proprietary infrastructure — purpose-built for reliability, security, and seamless integration with your existing systems.</p></Rv>
            <div className="ai-feats">
              {platformFeatures.map((f, i) => (
                <Rv key={f.title} d={i * 0.08}><div className="ai-feat">
                  <div className="ai-feat-icon">{f.icon}</div>
                  <div className="ai-feat-title">{f.title}</div>
                  <div className="ai-feat-desc">{f.desc}</div>
                </div></Rv>
              ))}
            </div>
          </section>

          {/* ═══ FINAL CTA ═══ */}
          <Rv><section id="contact" className="ai-cta-sec">
            <h2>Ready to Deploy <span className="ai-grad">Intelligent Solutions</span>?</h2>
            <p>Whether you need a single AI application or a full-platform deployment across your organization, our team will help you identify, implement, and scale the right solutions.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              <a href="mailto:Chat@Aqurion.AI" className="ai-cta" style={{ padding: "0.75rem 2.5rem" }}>Request a Demo</a>
              <a href="#catalog" className="ai-cta-outline">Browse Applications →</a>
            </div>
          </section></Rv>

          {/* ═══ FOOTER ═══ */}
          <footer className="ai-footer">
            <div className="ai-footer-grid">
              <div><div className="ai-footer-brand">Aqurion AI</div><div className="ai-footer-desc">An Aqurion Holdings Company. {totalApps}+ AI applications across 12 industries. Enterprise-grade intelligence for every business.</div></div>
              <div><div className="ai-footer-col-title">Ecosystem</div><a href="https://Aqurion.net" className="ai-footer-link">Aqurion Holdings</a><a href="https://AquironSales.com" className="ai-footer-link">Sales</a><a href="https://AqurionMarketing.com" className="ai-footer-link">Marketing</a><a href="https://AqurionDev.com" className="ai-footer-link">Development</a></div>
              <div><div className="ai-footer-col-title">Contact</div><a href="mailto:Chat@Aqurion.AI" className="ai-footer-link">Chat@Aqurion.AI</a><a href="tel:+18882787106" className="ai-footer-link">1-888-AQUR-10-N (Press 3)</a></div>
            </div>
            <div className="ai-footer-bottom">© {new Date().getFullYear()} Aqurion AI — An Aqurion Holdings Company</div>
          </footer>
        </div>
      </div>
    </>
  );
}
