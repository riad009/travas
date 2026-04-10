"use client";
import React from "react";

/* ───────── Data ───────── */
const sectors = [
  { name: "Property Services", icon: "🏢", color: "#3B82F6", apps: ["PropertyFlow", "HOAPro", "HotelSuite", "MarinaSuite", "ParkingFlow", "FuneralSuite"] },
  { name: "Home Services", icon: "🏠", color: "#F97316", apps: ["HomeServicesSuite", "SolarPro", "ContractingPlus"] },
  { name: "Automotive", icon: "🚗", color: "#EF4444", apps: ["AutoSuite", "TowSuite", "MotorsOne"] },
  { name: "Finance & Legal", icon: "⚖️", color: "#8B5CF6", apps: ["LegalOne", "FinanceFlow", "EscrowSuite", "CollectionAgencySuite"] },
  { name: "Leisure & Recreation", icon: "🏖️", color: "#06B6D4", apps: ["ClubManager", "SkiResortFlow", "TravelSuite", "AmusementFlow"] },
  { name: "Wellness & Fitness", icon: "🧘", color: "#22C55E", apps: ["SalonPro", "FitnessFlow", "SpaSuite", "DentalPro", "MedPro"] },
  { name: "Food & Hospitality", icon: "🍽️", color: "#D97706", apps: ["RestaurantOne", "CateringSuite", "FoodTruckPro", "BarSuite"] },
  { name: "Animal & Veterinary", icon: "🐾", color: "#84CC16", apps: ["VetPro", "BreedingSuite"] },
  { name: "Security & Utilities", icon: "🛡️", color: "#64748B", apps: ["SecurityMaster", "UtilitySuite", "MuniSuite"] },
  { name: "Education & Nonprofit", icon: "🎓", color: "#EC4899", apps: ["EducationSuite", "DonorFlow", "Roster", "CareFlow"] },
  { name: "Retail & Commerce", icon: "🛍️", color: "#F43F5E", apps: ["RetailFlow", "EcommerceSuite", "TobaccoLiquorPro", "PawnShopPro"] },
  { name: "Creative & Media", icon: "🎨", color: "#A855F7", apps: ["PhotographerMaster", "DesignSuite", "MoviePerformancePro"] },
];

const divisions = [
  { name: "Aqurion Financial", domain: "AqurionFi.com", color: "#4ECDC4", icon: "💰" },
  { name: "Aqurion Directory", domain: "AqurionPages.com", color: "#A78BFA", icon: "📍" },
  { name: "Aqurion Stores", domain: "AqurionMarketplace.com", color: "#F59E0B", icon: "🛒" },
  { name: "Aqurion Sales", domain: "AqurionSales.com", color: "#10B981", icon: "🤝" },
  { name: "Aqurion Development", domain: "AqurionDev.com", color: "#00B872", icon: "💻" },
  { name: "Aqurion South America", domain: "AqurionSA.LAT", color: "#D4A017", icon: "🌎" },
];

export default function AqurionAIPage() {
  const [activeSector, setActiveSector] = React.useState<number | null>(null);
  const [hoveredBlade, setHoveredBlade] = React.useState<number | null>(null);
  const basePath = process.env.NODE_ENV === 'development' ? '/ai' : '';

  return (
    <>
      <style>{`
        /* ── Reset & Foundation ── */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        /* ── LIGHT MODE like human.capital ── */
        .ai-page { background: #f7f7f7; color: #111; min-height: 100vh; font-family: 'Inter', sans-serif; }

        /* ── Nav: minimal, corners ── */
        .ai-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.5rem 3rem;
          background: rgba(247,247,247,0.85);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .ai-nav-logo {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 1rem; font-weight: 700; letter-spacing: -0.01em;
          text-decoration: none; color: #111;
        }
        .ai-nav-logo img { width: 32px; height: 32px; border-radius: 8px; }
        .ai-nav-links { display: flex; gap: 2.5rem; align-items: center; }
        .ai-nav-link {
          color: #666; text-decoration: none; font-size: 0.82rem;
          font-weight: 500; transition: color 0.2s;
        }
        .ai-nav-link:hover { color: #111; }

        /* ── Hero: huge text, massive whitespace ── */
        .ai-hero {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 10rem 2rem 4rem;
          position: relative; overflow: hidden;
        }
        .ai-hero h1 {
          font-size: clamp(3.5rem, 8vw, 7rem); font-weight: 800; line-height: 1.0;
          letter-spacing: -0.05em; margin-bottom: 1.5rem; max-width: 1000px;
          color: #111;
        }
        .ai-hero h1 span {
          background: linear-gradient(135deg, #00A2C7, #0066CC);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .ai-hero-sub {
          font-size: 1.1rem; color: #888; max-width: 560px;
          line-height: 1.7; margin-bottom: 0;
          font-weight: 400;
        }

        /* ── Blade Strip (human.capital style) ── */
        .ai-blades {
          display: flex; align-items: stretch; height: 480px;
          margin: 0 3rem 4rem; gap: 3px; overflow: hidden; border-radius: 16px;
        }
        .ai-blade {
          flex: 1; min-width: 60px; position: relative; overflow: hidden;
          cursor: pointer; transition: flex 0.5s cubic-bezier(0.4,0,0.2,1);
          background: #e0e0e0;
        }
        .ai-blade.expanded { flex: 5; }
        .ai-blade-bg {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 3.5rem; transition: all 0.5s;
        }
        .ai-blade-label {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 1.5rem 1rem;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          color: #fff;
          transform: translateY(0); transition: all 0.4s;
        }
        .ai-blade-name { font-size: 0.85rem; font-weight: 700; white-space: nowrap; }
        .ai-blade-count { font-size: 0.7rem; opacity: 0.7; margin-top: 0.15rem; }

        .ai-blade-detail {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
          opacity: 0; transition: opacity 0.4s;
        }
        .ai-blade.expanded .ai-blade-detail { opacity: 1; }
        .ai-blade.expanded .ai-blade-bg { font-size: 5rem; }
        .ai-blade-detail-name { font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .ai-blade-detail-apps { display: flex; flex-wrap: wrap; gap: 0.3rem; }
        .ai-blade-detail-tag {
          padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.65rem;
          background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.9);
          font-weight: 500; backdrop-filter: blur(4px);
        }

        /* ── About / Mission ── */
        .ai-about {
          max-width: 900px; margin: 0 auto; padding: 6rem 2rem;
          text-align: center;
        }
        .ai-about-label {
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.15em; color: #0088CC; margin-bottom: 1.5rem;
        }
        .ai-about h2 {
          font-size: clamp(2rem, 4vw, 3rem); font-weight: 800;
          letter-spacing: -0.03em; line-height: 1.15; color: #111;
          margin-bottom: 1.5rem;
        }
        .ai-about p {
          font-size: 1.05rem; color: #666; line-height: 1.8;
          max-width: 650px; margin: 0 auto;
        }

        /* ── Stats Row ── */
        .ai-stats-row {
          display: flex; justify-content: center; gap: 4rem;
          padding: 3rem 2rem; flex-wrap: wrap;
          border-top: 1px solid rgba(0,0,0,0.06);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          margin: 0 3rem;
        }
        .ai-stat { text-align: center; }
        .ai-stat-num { font-size: 3rem; font-weight: 900; color: #111; letter-spacing: -0.03em; }
        .ai-stat-label { font-size: 0.72rem; color: #999; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.25rem; }

        /* ── Divisions ── */
        .ai-divisions {
          max-width: 900px; margin: 0 auto; padding: 5rem 2rem;
        }
        .ai-divisions-label {
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.15em; color: #999; text-align: center; margin-bottom: 2rem;
        }
        .ai-divisions-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
          background: rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden;
        }
        .ai-div-card {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.5rem; background: #fff;
          text-decoration: none; color: #111;
          transition: background 0.2s;
        }
        .ai-div-card:hover { background: #f0f0f0; }
        .ai-div-icon { font-size: 1.3rem; }
        .ai-div-name { font-size: 0.85rem; font-weight: 600; }
        .ai-div-domain { font-size: 0.7rem; color: #999; }

        /* ── Footer ── */
        .ai-footer {
          padding: 3rem; text-align: center; font-size: 0.78rem; color: #bbb;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .ai-footer-links { display: flex; justify-content: center; gap: 2rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .ai-footer-link { color: #888; text-decoration: none; font-size: 0.78rem; transition: color 0.2s; }
        .ai-footer-link:hover { color: #111; }

        @media (max-width: 768px) {
          .ai-nav { padding: 1rem 1.5rem; }
          .ai-nav-links { display: none; }
          .ai-blades { height: 350px; margin: 0 1rem 3rem; flex-direction: column; }
          .ai-blade { min-width: auto; min-height: 40px; }
          .ai-stats-row { margin: 0 1rem; gap: 2.5rem; }
          .ai-divisions-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ai-page">
        {/* Nav */}
        <nav className="ai-nav">
          <a href="/" className="ai-nav-logo">
            <img src={`${basePath}/logos/aqurion-ai-icon.png`} alt="Aqurion AI" style={{ width: 32, height: 32, borderRadius: 8 }} />
            Aqurion AI
          </a>
          <div className="ai-nav-links">
            <a href="#portfolio" className="ai-nav-link">Portfolio</a>
            <a href="#about" className="ai-nav-link">About</a>
          </div>
        </nav>

        {/* Hero */}
        <section className="ai-hero">
          <h1>
            Aqurion AI partners with exceptional businesses, deploying <span>intelligence</span> at scale.
          </h1>
          <p className="ai-hero-sub">
            Cutting-edge AI solutions across 12 industry verticals. 56+ applications. One unified ecosystem.
          </p>
        </section>

        {/* Blade Strip — like human.capital's portfolio display */}
        <section id="portfolio" className="ai-blades">
          {sectors.map((sector, i) => (
            <div
              key={sector.name}
              className={`ai-blade ${hoveredBlade === i ? "expanded" : ""}`}
              style={{ background: `${sector.color}18` }}
              onMouseEnter={() => setHoveredBlade(i)}
              onMouseLeave={() => setHoveredBlade(null)}
            >
              <div className="ai-blade-bg" style={{ opacity: hoveredBlade === i ? 0.3 : 0.6 }}>
                {sector.icon}
              </div>
              <div className="ai-blade-label">
                <div className="ai-blade-name">{sector.name}</div>
                <div className="ai-blade-count">{sector.apps.length} apps</div>
              </div>
              <div className="ai-blade-detail">
                <div className="ai-blade-detail-name">{sector.name}</div>
                <div className="ai-blade-detail-apps">
                  {sector.apps.map(app => (
                    <span key={app} className="ai-blade-detail-tag">{app}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Stats */}
        <div className="ai-stats-row">
          <div className="ai-stat"><div className="ai-stat-num">12</div><div className="ai-stat-label">Industry Sectors</div></div>
          <div className="ai-stat"><div className="ai-stat-num">56+</div><div className="ai-stat-label">Applications</div></div>
          <div className="ai-stat"><div className="ai-stat-num">79</div><div className="ai-stat-label">Active Domains</div></div>
          <div className="ai-stat"><div className="ai-stat-num">6</div><div className="ai-stat-label">Core Divisions</div></div>
        </div>

        {/* About  */}
        <section id="about" className="ai-about">
          <div className="ai-about-label">About Aqurion AI</div>
          <h2>Building the future of business intelligence across every vertical.</h2>
          <p>
            Aqurion AI serves as the central intelligence gateway for the entire Aqurion ecosystem.
            We develop and deploy artificial intelligence solutions that empower businesses across
            every sector — from property management and automotive to hospitality and healthcare.
            Our mission is to democratize access to sophisticated AI tools, making enterprise-grade
            technology available to businesses of every size.
          </p>
        </section>

        {/* Divisions */}
        <section className="ai-divisions">
          <div className="ai-divisions-label">Aqurion Divisions</div>
          <div className="ai-divisions-grid">
            {divisions.map(div => (
              <a key={div.domain} href={`https://${div.domain}`} className="ai-div-card" target="_blank" rel="noopener noreferrer">
                <span className="ai-div-icon">{div.icon}</span>
                <div>
                  <div className="ai-div-name">{div.name}</div>
                  <div className="ai-div-domain">{div.domain}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="ai-footer">
          <div className="ai-footer-links">
            <a href="https://Aqurion.NET" className="ai-footer-link">Aqurion Holdings</a>
            <a href="https://AqurionDev.com" className="ai-footer-link">Development</a>
            <a href="https://AqurionMarketing.com" className="ai-footer-link">Marketing</a>
            <a href="mailto:info@aqurion.net" className="ai-footer-link">Contact</a>
          </div>
          <p>© {new Date().getFullYear()} Aqurion AI — An Aqurion Holdings Company</p>
        </footer>
      </div>
    </>
  );
}
