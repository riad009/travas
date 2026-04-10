"use client";
import React from "react";
import { AQURION_BRANDS, getBrandsByTier } from "@repo/ui/brand-config";

const tier2 = getBrandsByTier(2);
const tier3 = getBrandsByTier(3);
const allCompanies = [...tier2, ...tier3];

/* ─── Constellation node positions (normalized 0-1) ─── */
function generatePositions(count: number) {
  const positions: { x: number; y: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const r = 0.12 + 0.32 * Math.sqrt(i / count);
    const theta = i * goldenAngle;
    positions.push({
      x: 0.5 + r * Math.cos(theta),
      y: 0.5 + r * Math.sin(theta),
    });
  }
  return positions;
}

const positions = generatePositions(allCompanies.length);

/* ─── Constellation Lines (connect nearby nodes) ─── */
function generateLines(nodes: { x: number; y: number }[]) {
  const lines: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.14) lines.push([i, j]);
    }
  }
  return lines;
}

const lines = generateLines(positions);

const navItems = [
  { label: "Companies", href: "#constellation" },
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const faqItems = [
  { q: "What is Aqurion Holdings?", a: "Aqurion Holdings is a next-generation digital holding company that builds, invests in, and operates technology businesses across 12+ industry verticals. We provide the infrastructure, talent, and strategy for our portfolio companies to scale." },
  { q: "How many companies does Aqurion own?", a: "Aqurion currently manages 56+ applications and platforms across its ecosystem, organized into specialized divisions covering Development, Marketing, Sales, Finance, and more." },
  { q: "How can I partner with Aqurion?", a: "We're always looking for strategic partnerships. Whether you want to build together, invest, or leverage our platforms, reach out via our contact form or email info@aqurion.net." },
  { q: "Is Aqurion hiring?", a: "Yes! We're actively building our team across engineering, marketing, sales, and operations. Check our careers section or email careers@aqurion.net." },
];

export default function HomePage() {
  const [activeNode, setActiveNode] = React.useState<number | null>(null);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [formSent, setFormSent] = React.useState(false);
  const basePath = '';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');

        .hq-page { background: #000; color: #fff; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; }

        /* ── Nav: center pill ── */
        .hq-nav { position: fixed; top: 1.5rem; left: 50%; transform: translateX(-50%); z-index: 100; display: flex; align-items: center; gap: 0; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 50px; padding: 0.3rem; backdrop-filter: blur(20px); }
        .hq-nav-link { padding: 0.5rem 1.25rem; border-radius: 50px; font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.5); text-decoration: none; transition: all 0.2s; white-space: nowrap; }
        .hq-nav-link:hover, .hq-nav-link.active { background: #fff; color: #000; }

        .hq-logo { position: fixed; top: 1.5rem; left: 2rem; z-index: 101; display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
        .hq-logo img { width: 28px; height: 28px; border-radius: 6px; }
        .hq-logo-text { font-size: 0.85rem; font-weight: 700; color: #fff; letter-spacing: -0.01em; }

        /* ── Hero ── */
        .hq-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 2rem 4rem; position: relative; }
        .hq-hero-glow { position: absolute; width: 900px; height: 600px; border-radius: 50%; background: radial-gradient(ellipse, rgba(108,99,255,0.06), transparent 70%); top: 30%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; }
        .hq-hero h1 { font-size: clamp(3rem, 8vw, 6rem); font-weight: 800; line-height: 1.0; letter-spacing: -0.05em; max-width: 900px; margin-bottom: 1.5rem; color: #fff; }
        .hq-hero h1 span { color: rgba(255,255,255,0.25); -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
        .hq-hero-sub { font-size: 1.05rem; color: rgba(255,255,255,0.4); max-width: 500px; line-height: 1.7; margin-bottom: 2.5rem; }
        .hq-hero-btn { padding: 0.75rem 2rem; border-radius: 50px; background: #fff; color: #000; font-weight: 700; font-size: 0.85rem; border: none; cursor: pointer; transition: all 0.2s; text-decoration: none; }
        .hq-hero-btn:hover { transform: scale(1.05); box-shadow: 0 4px 25px rgba(255,255,255,0.2); }

        /* ── Constellation ── */
        .hq-constellation { position: relative; width: 100%; max-width: 1000px; margin: 0 auto; aspect-ratio: 1; padding: 2rem; }
        .hq-const-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
        .hq-const-line { stroke: rgba(255,255,255,0.06); stroke-width: 1; }
        .hq-const-node { position: absolute; transform: translate(-50%,-50%); cursor: pointer; z-index: 2; }
        .hq-const-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.3); transition: all 0.3s; position: relative; }
        .hq-const-dot::after { content: ''; position: absolute; inset: -6px; border-radius: 50%; border: 1px solid transparent; transition: all 0.3s; }
        .hq-const-node:hover .hq-const-dot, .hq-const-node.active .hq-const-dot { background: #6C63FF; transform: scale(1.5); box-shadow: 0 0 20px rgba(108,99,255,0.5); }
        .hq-const-node:hover .hq-const-dot::after, .hq-const-node.active .hq-const-dot::after { border-color: rgba(108,99,255,0.3); }
        .hq-const-label { position: absolute; top: 50%; left: calc(100% + 12px); transform: translateY(-50%); white-space: nowrap; padding: 0.4rem 0.8rem; border-radius: 8px; background: rgba(0,0,0,0.85); border: 1px solid rgba(255,255,255,0.1); font-size: 0.72rem; font-weight: 600; color: #fff; opacity: 0; pointer-events: none; transition: opacity 0.2s; backdrop-filter: blur(10px); }
        .hq-const-node:hover .hq-const-label, .hq-const-node.active .hq-const-label { opacity: 1; }
        .hq-const-label-domain { font-size: 0.6rem; color: rgba(255,255,255,0.4); display: block; margin-top: 0.1rem; }

        /* ── Company Detail Panel ── */
        .hq-detail { max-width: 600px; margin: 0 auto 4rem; padding: 2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; text-align: center; transition: all 0.3s; }
        .hq-detail-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
        .hq-detail-name { font-size: 1.3rem; font-weight: 800; margin-bottom: 0.25rem; }
        .hq-detail-domain { font-size: 0.8rem; color: rgba(255,255,255,0.35); margin-bottom: 0.75rem; }
        .hq-detail-cat { display: inline-block; padding: 0.2rem 0.75rem; border-radius: 50px; font-size: 0.68rem; font-weight: 600; background: rgba(108,99,255,0.12); color: #8B85FF; border: 1px solid rgba(108,99,255,0.2); margin-bottom: 1rem; }
        .hq-detail-link { color: #6C63FF; text-decoration: none; font-size: 0.82rem; font-weight: 600; }
        .hq-detail-link:hover { text-decoration: underline; }

        /* ── Sections ── */
        .hq-section { padding: 6rem 2rem; max-width: 1100px; margin: 0 auto; }
        .hq-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.25); margin-bottom: 1rem; font-family: 'Space Mono', monospace; }
        .hq-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 1.5rem; line-height: 1.1; }

        /* ── About Grid ── */
        .hq-about-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.06); border-radius: 20px; overflow: hidden; margin-top: 3rem; }
        .hq-about-card { background: #0a0a0a; padding: 2.5rem 2rem; }
        .hq-about-card-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem; }
        .hq-about-card-desc { font-size: 0.85rem; color: rgba(255,255,255,0.4); line-height: 1.7; }
        .hq-about-stat { font-size: 2.5rem; font-weight: 900; color: #6C63FF; margin-bottom: 0.5rem; letter-spacing: -0.03em; }

        /* ── Companies Grid ── */
        .hq-companies { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; margin-top: 3rem; }
        .hq-company-card { padding: 1.5rem; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 1rem; text-decoration: none; color: #fff; transition: all 0.2s; }
        .hq-company-card:hover { border-color: rgba(108,99,255,0.3); transform: translateY(-2px); }
        .hq-company-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
        .hq-company-name { font-size: 0.9rem; font-weight: 700; }
        .hq-company-domain { font-size: 0.72rem; color: rgba(255,255,255,0.3); }
        .hq-company-cat { font-size: 0.65rem; color: rgba(255,255,255,0.4); margin-top: 0.2rem; }

        /* ── FAQ ── */
        .hq-faq { max-width: 700px; margin-top: 2rem; }
        .hq-faq-item { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .hq-faq-q { padding: 1.25rem 0; font-weight: 600; font-size: 0.92rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: color 0.2s; }
        .hq-faq-q:hover { color: #6C63FF; }
        .hq-faq-a { padding: 0 0 1.25rem; font-size: 0.85rem; color: rgba(255,255,255,0.4); line-height: 1.7; }

        /* ── Careers ── */
        .hq-careers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 2rem; }
        .hq-career-card { padding: 1.5rem; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); }
        .hq-career-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.25rem; }
        .hq-career-meta { font-size: 0.75rem; color: rgba(255,255,255,0.35); margin-bottom: 0.75rem; }
        .hq-career-desc { font-size: 0.82rem; color: rgba(255,255,255,0.45); line-height: 1.6; }

        /* ── Contact ── */
        .hq-contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 4rem; align-items: start; }
        .hq-input { padding: 0.8rem 1.2rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: #fff; font-size: 0.88rem; font-family: 'Inter', sans-serif; outline: none; width: 100%; transition: border-color 0.2s; }
        .hq-input:focus { border-color: rgba(108,99,255,0.4); }
        .hq-input::placeholder { color: rgba(255,255,255,0.25); }
        .hq-textarea { min-height: 120px; resize: vertical; }
        .hq-form-btn { padding: 0.8rem; background: #6C63FF; color: #fff; border: none; border-radius: 10px; font-weight: 700; font-size: 0.88rem; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; width: 100%; }
        .hq-form-btn:hover { background: #7C75FF; }

        /* ── Footer ── */
        .hq-footer { padding: 4rem 2rem 2rem; border-top: 1px solid rgba(255,255,255,0.06); max-width: 1100px; margin: 0 auto; }
        .hq-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
        .hq-footer-brand { font-size: 1.1rem; font-weight: 800; margin-bottom: 0.75rem; }
        .hq-footer-desc { font-size: 0.8rem; color: rgba(255,255,255,0.35); line-height: 1.6; max-width: 280px; }
        .hq-footer-col-title { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); margin-bottom: 1rem; }
        .hq-footer-link { display: block; font-size: 0.8rem; color: rgba(255,255,255,0.45); text-decoration: none; padding: 0.25rem 0; transition: color 0.2s; }
        .hq-footer-link:hover { color: #6C63FF; }
        .hq-footer-bottom { text-align: center; font-size: 0.72rem; color: rgba(255,255,255,0.2); padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); }

        /* ── Stars BG ── */
        .hq-stars { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .hq-star { position: absolute; width: 2px; height: 2px; border-radius: 50%; background: rgba(255,255,255,0.3); animation: hqTwinkle 3s infinite; }
        @keyframes hqTwinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 0.8; } }

        .hq-content { position: relative; z-index: 1; }

        @media (max-width: 768px) {
          .hq-nav { display: none; }
          .hq-about-grid { grid-template-columns: 1fr; }
          .hq-contact-grid { grid-template-columns: 1fr; }
          .hq-footer-grid { grid-template-columns: 1fr 1fr; }
          .hq-constellation { aspect-ratio: auto; min-height: 500px; }
        }
      `}</style>

      <div className="hq-page">
        {/* Stars Background */}
        <div className="hq-stars">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className="hq-star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }} />
          ))}
        </div>

        <div className="hq-content">
          {/* Logo */}
          <a href="/" className="hq-logo">
            <img src={`${basePath}/logos/aqurion-holdings-icon.png`} alt="" style={{ width: 28, height: 28, borderRadius: 6 }} />
            <span className="hq-logo-text">Aqurion</span>
          </a>

          {/* Center Pill Nav */}
          <nav className="hq-nav">
            {navItems.map(n => (
              <a key={n.label} href={n.href} className="hq-nav-link">{n.label}</a>
            ))}
          </nav>

          {/* Hero */}
          <section className="hq-hero">
            <div className="hq-hero-glow" />
            <h1>Aqurion is a <span>Company Studio</span></h1>
            <p className="hq-hero-sub">
              We build, invest in, and operate technology companies across 12+ industry verticals.
              Click the constellation below to explore our ecosystem.
            </p>
            <a href="#constellation" className="hq-hero-btn">Explore Companies ↓</a>
          </section>

          {/* Constellation */}
          <section id="constellation" className="hq-section" style={{ textAlign: "center" }}>
            <div className="hq-label">Our Constellation</div>
            <h2 className="hq-title">Click a star to explore.</h2>

            <div className="hq-constellation">
              {/* Lines */}
              <svg className="hq-const-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                {lines.map(([a, b], i) => (
                  <line key={i} className="hq-const-line"
                    x1={positions[a].x * 100} y1={positions[a].y * 100}
                    x2={positions[b].x * 100} y2={positions[b].y * 100}
                  />
                ))}
              </svg>

              {/* Nodes */}
              {allCompanies.map((company, i) => (
                <div
                  key={company.id}
                  className={`hq-const-node ${activeNode === i ? "active" : ""}`}
                  style={{ left: `${positions[i].x * 100}%`, top: `${positions[i].y * 100}%` }}
                  onClick={() => setActiveNode(activeNode === i ? null : i)}
                >
                  <div className="hq-const-dot" style={activeNode === i ? { background: company.accentColor, boxShadow: `0 0 20px ${company.accentColor}50` } : {}} />
                  <div className="hq-const-label">
                    {company.name}
                    <span className="hq-const-label-domain">{company.domain}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail Panel */}
            {activeNode !== null && allCompanies[activeNode] && (
              <div className="hq-detail">
                <div className="hq-detail-icon">{allCompanies[activeNode].icon}</div>
                <div className="hq-detail-name">{allCompanies[activeNode].name}</div>
                <div className="hq-detail-domain">{allCompanies[activeNode].domain}</div>
                <div className="hq-detail-cat">{allCompanies[activeNode].category}</div>
                <br />
                <a href={`https://${allCompanies[activeNode].domain}`} className="hq-detail-link" target="_blank" rel="noopener noreferrer">
                  Visit {allCompanies[activeNode].domain} →
                </a>
              </div>
            )}
          </section>

          {/* All Companies Grid */}
          <section className="hq-section">
            <div className="hq-label">Portfolio</div>
            <h2 className="hq-title">All Companies</h2>
            <div className="hq-companies">
              {allCompanies.map(c => (
                <a key={c.id} href={`https://${c.domain}`} className="hq-company-card" target="_blank" rel="noopener noreferrer">
                  <div className="hq-company-icon" style={{ background: `${c.accentColor}15`, color: c.accentColor }}>{c.icon}</div>
                  <div>
                    <div className="hq-company-name">{c.name}</div>
                    <div className="hq-company-domain">{c.domain}</div>
                    <div className="hq-company-cat">{c.category}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* About */}
          <section id="about" className="hq-section" style={{ textAlign: "center" }}>
            <div className="hq-label">About</div>
            <h2 className="hq-title">A Holding Company Built for the Digital Age</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: "600px", margin: "0 auto 0", lineHeight: 1.7 }}>
              Aqurion Holdings provides the infrastructure for the most ambitious technology companies. We bring strategy, capital, and talent together under one roof.
            </p>
            <div className="hq-about-grid">
              <div className="hq-about-card"><div className="hq-about-stat">56+</div><div className="hq-about-card-title">Applications</div><div className="hq-about-card-desc">Active platforms and tools across the Aqurion ecosystem.</div></div>
              <div className="hq-about-card"><div className="hq-about-stat">12</div><div className="hq-about-card-title">Industry Verticals</div><div className="hq-about-card-desc">From property management to healthcare, we serve every sector.</div></div>
              <div className="hq-about-card"><div className="hq-about-stat">79</div><div className="hq-about-card-title">Active Domains</div><div className="hq-about-card-desc">A growing portfolio of digital real estate across the web.</div></div>
              <div className="hq-about-card"><div className="hq-about-card-title">Our Mission</div><div className="hq-about-card-desc">To democratize enterprise-grade technology for small and mid-sized businesses worldwide, making powerful tools accessible to everyone.</div></div>
              <div className="hq-about-card"><div className="hq-about-card-title">Our Approach</div><div className="hq-about-card-desc">We build. We invest. We operate. Each company in our portfolio benefits from shared infrastructure, cross-platform synergies, and AI-first thinking.</div></div>
              <div className="hq-about-card"><div className="hq-about-card-title">Global Reach</div><div className="hq-about-card-desc">With operations across North and South America, Aqurion serves businesses in 10+ countries and counting.</div></div>
            </div>
          </section>

          {/* Careers */}
          <section id="careers" className="hq-section">
            <div className="hq-label">Careers</div>
            <h2 className="hq-title">Join the Team</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: "550px", lineHeight: 1.7, marginBottom: "0.5rem" }}>
              We&apos;re building the future of business technology and looking for exceptional people to join us.
            </p>
            <div className="hq-careers-grid">
              <div className="hq-career-card"><div className="hq-career-title">Full-Stack Engineer</div><div className="hq-career-meta">Remote • Full-time</div><div className="hq-career-desc">Build and ship products across the Aqurion ecosystem using React, Next.js, and Node.js.</div></div>
              <div className="hq-career-card"><div className="hq-career-title">AI/ML Engineer</div><div className="hq-career-meta">Remote • Full-time</div><div className="hq-career-desc">Design and deploy intelligent models that power automation across 56+ applications.</div></div>
              <div className="hq-career-card"><div className="hq-career-title">Growth Marketing Lead</div><div className="hq-career-meta">Remote • Full-time</div><div className="hq-career-desc">Drive user acquisition and engagement across Aqurion Marketing&apos;s client portfolio.</div></div>
              <div className="hq-career-card"><div className="hq-career-title">Sales Development Rep</div><div className="hq-career-meta">Remote • Full-time</div><div className="hq-career-desc">Generate and qualify leads for Aqurion&apos;s suite of SaaS products and services.</div></div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", marginTop: "1.5rem" }}>
              Don&apos;t see your role? Email <a href="mailto:careers@aqurion.net" style={{ color: "#6C63FF", textDecoration: "none" }}>careers@aqurion.net</a>
            </p>
          </section>

          {/* FAQ */}
          <section className="hq-section">
            <div className="hq-label">FAQ</div>
            <h2 className="hq-title">Common Questions</h2>
            <div className="hq-faq">
              {faqItems.map((f, i) => (
                <div key={i} className="hq-faq-item">
                  <div className="hq-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {f.q} <span style={{ color: "#6C63FF", fontSize: "1.2rem", fontWeight: 300 }}>{openFaq === i ? "−" : "+"}</span>
                  </div>
                  {openFaq === i && <div className="hq-faq-a">{f.a}</div>}
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="hq-section">
            <div className="hq-contact-grid">
              <div>
                <div className="hq-label">Contact</div>
                <h2 className="hq-title">Let&apos;s Build Together</h2>
                <p style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "2rem" }}>
                  Have a project in mind, or want to learn more about what Aqurion can do for your business? Send us a message.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                    <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>✉</span>
                    info@aqurion.net
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                    <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>◎</span>
                    Aqurion.NET
                  </div>
                </div>
              </div>
              <div>
                {formSent ? (
                  <div style={{ padding: "2rem", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 16, textAlign: "center", color: "#22C55E", fontWeight: 600 }}>
                    ✓ Message sent! We&apos;ll be in touch shortly.
                  </div>
                ) : (
                  <form style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }} onSubmit={e => { e.preventDefault(); setFormSent(true); }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      <input className="hq-input" type="text" placeholder="First name" required />
                      <input className="hq-input" type="text" placeholder="Last name" required />
                    </div>
                    <input className="hq-input" type="email" placeholder="Email address" required />
                    <input className="hq-input" type="text" placeholder="Company (optional)" />
                    <textarea className="hq-input hq-textarea" placeholder="Tell us about your project..." required />
                    <button type="submit" className="hq-form-btn">Send Message →</button>
                  </form>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="hq-footer">
            <div className="hq-footer-grid">
              <div>
                <div className="hq-footer-brand">Aqurion Holdings</div>
                <div className="hq-footer-desc">Building the future of digital business. Technology, marketing, finance, and creative — under one roof.</div>
              </div>
              <div>
                <div className="hq-footer-col-title">Divisions</div>
                <a href="https://Aqurion.AI" className="hq-footer-link">Aqurion AI</a>
                <a href="https://AqurionDev.com" className="hq-footer-link">Development</a>
                <a href="https://AqurionMarketing.com" className="hq-footer-link">Marketing</a>
                <a href="https://AqurionSales.com" className="hq-footer-link">Sales</a>
                <a href="https://AqurionSA.LAT" className="hq-footer-link">South America</a>
              </div>
              <div>
                <div className="hq-footer-col-title">Company</div>
                <a href="#about" className="hq-footer-link">About</a>
                <a href="#careers" className="hq-footer-link">Careers</a>
                <a href="#contact" className="hq-footer-link">Contact</a>
                <a href="https://TravisRoqueSoto.ME" className="hq-footer-link">Leadership</a>
              </div>
              <div>
                <div className="hq-footer-col-title">Connect</div>
                <a href="mailto:info@aqurion.net" className="hq-footer-link">Email</a>
                <a href="https://linkedin.com" className="hq-footer-link">LinkedIn</a>
                <a href="https://twitter.com" className="hq-footer-link">Twitter</a>
              </div>
            </div>
            <div className="hq-footer-bottom">
              © {new Date().getFullYear()} Aqurion Holdings. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
