"use client";
import React from "react";

const sectores = [
  { name: "Servicios Inmobiliarios", icon: "🏢", color: "#3B82F6", apps: ["PropertyFlow", "HOAPro", "HotelSuite", "MarinaSuite", "ParkingFlow"] },
  { name: "Servicios del Hogar", icon: "🏠", color: "#F97316", apps: ["HomeServicesSuite", "SolarPro", "ContractingPlus"] },
  { name: "Automotriz", icon: "🚗", color: "#EF4444", apps: ["AutoSuite", "TowSuite", "MotorsOne"] },
  { name: "Finanzas y Legal", icon: "⚖️", color: "#8B5CF6", apps: ["LegalOne", "FinanceFlow", "EscrowSuite"] },
  { name: "Ocio y Recreación", icon: "🏖️", color: "#06B6D4", apps: ["ClubManager", "TravelSuite", "AmusementFlow"] },
  { name: "Bienestar y Fitness", icon: "🧘", color: "#22C55E", apps: ["SalonPro", "FitnessFlow", "SpaSuite", "MedPro"] },
  { name: "Alimentos y Hospitalidad", icon: "🍽️", color: "#D97706", apps: ["RestaurantOne", "CateringSuite", "FoodTruckPro"] },
  { name: "Veterinaria y Animales", icon: "🐾", color: "#84CC16", apps: ["VetPro", "BreedingSuite"] },
  { name: "Seguridad y Servicios", icon: "🛡️", color: "#64748B", apps: ["SecurityMaster", "UtilitySuite", "MuniSuite"] },
  { name: "Educación y ONGs", icon: "🎓", color: "#EC4899", apps: ["EducationSuite", "DonorFlow", "CareFlow"] },
  { name: "Comercio y Retail", icon: "🛍️", color: "#F43F5E", apps: ["RetailFlow", "EcommerceSuite"] },
  { name: "Creatividad y Medios", icon: "🎨", color: "#A855F7", apps: ["PhotographerMaster", "DesignSuite"] },
];

const divisiones = [
  { name: "Aqurion Financial", domain: "AqurionFi.com", icon: "💰" },
  { name: "Aqurion Directory", domain: "AqurionPages.com", icon: "📍" },
  { name: "Aqurion Stores", domain: "AqurionMarketplace.com", icon: "🛒" },
  { name: "Aqurion Sales", domain: "AqurionSales.com", icon: "🤝" },
  { name: "Aqurion Development", domain: "AqurionDev.com", icon: "💻" },
  { name: "Aqurion AI", domain: "Aqurion.AI", icon: "🤖" },
];

export default function SAPage() {
  const [hoveredBlade, setHoveredBlade] = React.useState<number | null>(null);
  const basePath = process.env.NODE_ENV === 'development' ? '/sa' : '';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .sa-page { background: #f7f7f7; color: #111; min-height: 100vh; font-family: 'Inter', sans-serif; }

        .sa-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 3rem; background: rgba(247,247,247,0.85); backdrop-filter: blur(24px); border-bottom: 1px solid rgba(0,0,0,0.05); }
        .sa-nav-logo { display: flex; align-items: center; gap: 0.6rem; font-size: 1rem; font-weight: 700; text-decoration: none; color: #111; }
        .sa-nav-logo img { width: 32px; height: 32px; border-radius: 8px; }
        .sa-nav-links { display: flex; gap: 2.5rem; }
        .sa-nav-link { color: #666; text-decoration: none; font-size: 0.82rem; font-weight: 500; transition: color 0.2s; }
        .sa-nav-link:hover { color: #111; }

        .sa-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 10rem 2rem 4rem; }
        .sa-hero-badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.7rem; font-weight: 600; background: rgba(212,160,23,0.1); color: #B8860B; border: 1px solid rgba(212,160,23,0.2); margin-bottom: 2rem; }
        .sa-hero h1 { font-size: clamp(3.5rem, 8vw, 7rem); font-weight: 800; line-height: 1.0; letter-spacing: -0.05em; margin-bottom: 1.5rem; max-width: 1000px; color: #111; }
        .sa-hero h1 span { background: linear-gradient(135deg, #B8860B, #DAA520); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .sa-hero-sub { font-size: 1.1rem; color: #888; max-width: 560px; line-height: 1.7; }

        .sa-blades { display: flex; align-items: stretch; height: 480px; margin: 0 3rem 4rem; gap: 3px; overflow: hidden; border-radius: 16px; }
        .sa-blade { flex: 1; min-width: 60px; position: relative; overflow: hidden; cursor: pointer; transition: flex 0.5s cubic-bezier(0.4,0,0.2,1); }
        .sa-blade.expanded { flex: 5; }
        .sa-blade-bg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 3.5rem; transition: all 0.5s; }
        .sa-blade-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem 1rem; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); color: #fff; }
        .sa-blade-name { font-size: 0.85rem; font-weight: 700; white-space: nowrap; }
        .sa-blade-count { font-size: 0.7rem; opacity: 0.7; margin-top: 0.15rem; }
        .sa-blade-detail { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem; background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2) 60%, transparent); opacity: 0; transition: opacity 0.4s; }
        .sa-blade.expanded .sa-blade-detail { opacity: 1; }
        .sa-blade-detail-name { font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .sa-blade-detail-apps { display: flex; flex-wrap: wrap; gap: 0.3rem; }
        .sa-blade-tag { padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.65rem; background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.9); font-weight: 500; }

        .sa-stats-row { display: flex; justify-content: center; gap: 4rem; padding: 3rem 2rem; flex-wrap: wrap; border-top: 1px solid rgba(0,0,0,0.06); border-bottom: 1px solid rgba(0,0,0,0.06); margin: 0 3rem; }
        .sa-stat-num { font-size: 3rem; font-weight: 900; color: #111; letter-spacing: -0.03em; }
        .sa-stat-label { font-size: 0.72rem; color: #999; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.25rem; }

        .sa-about { max-width: 900px; margin: 0 auto; padding: 6rem 2rem; text-align: center; }
        .sa-about-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #B8860B; margin-bottom: 1.5rem; }
        .sa-about h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; color: #111; margin-bottom: 1.5rem; }
        .sa-about p { font-size: 1.05rem; color: #666; line-height: 1.8; max-width: 650px; margin: 0 auto; }

        .sa-divisions { max-width: 900px; margin: 0 auto; padding: 5rem 2rem; }
        .sa-divisions-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #999; text-align: center; margin-bottom: 2rem; }
        .sa-divisions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; }
        .sa-div-card { display: flex; align-items: center; gap: 1rem; padding: 1.5rem; background: #fff; text-decoration: none; color: #111; transition: background 0.2s; }
        .sa-div-card:hover { background: #f0f0f0; }
        .sa-div-icon { font-size: 1.3rem; }
        .sa-div-name { font-size: 0.85rem; font-weight: 600; }
        .sa-div-domain { font-size: 0.7rem; color: #999; }

        .sa-footer { padding: 3rem; text-align: center; font-size: 0.78rem; color: #bbb; border-top: 1px solid rgba(0,0,0,0.06); }

        @media (max-width: 768px) {
          .sa-nav { padding: 1rem 1.5rem; } .sa-nav-links { display: none; }
          .sa-blades { height: 350px; margin: 0 1rem 3rem; flex-direction: column; }
          .sa-stats-row { margin: 0 1rem; gap: 2.5rem; }
          .sa-divisions-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sa-page">
        <nav className="sa-nav">
          <a href="/" className="sa-nav-logo"><img src={`${basePath}/logos/aqurion-sa-icon.png`} alt="" style={{ width: 32, height: 32, borderRadius: 8 }} />Aqurion Sudamérica</a>
          <div className="sa-nav-links">
            <a href="#portafolio" className="sa-nav-link">Portafolio</a>
            <a href="#nosotros" className="sa-nav-link">Nosotros</a>
          </div>
        </nav>

        <section className="sa-hero">
          <div className="sa-hero-badge">🌎 Expandiendo la innovación en América Latina</div>
          <h1>Aqurion Sudamérica conecta con empresas excepcionales, desplegando <span>inteligencia</span> a escala.</h1>
          <p className="sa-hero-sub">Soluciones de IA de vanguardia en 12 sectores industriales. 56+ aplicaciones. Un ecosistema unificado.</p>
        </section>

        <section id="portafolio" className="sa-blades">
          {sectores.map((s, i) => (
            <div key={s.name} className={`sa-blade ${hoveredBlade === i ? "expanded" : ""}`} style={{ background: `${s.color}18` }}
              onMouseEnter={() => setHoveredBlade(i)} onMouseLeave={() => setHoveredBlade(null)}>
              <div className="sa-blade-bg" style={{ opacity: hoveredBlade === i ? 0.3 : 0.6 }}>{s.icon}</div>
              <div className="sa-blade-label"><div className="sa-blade-name">{s.name}</div><div className="sa-blade-count">{s.apps.length} apps</div></div>
              <div className="sa-blade-detail">
                <div className="sa-blade-detail-name">{s.name}</div>
                <div className="sa-blade-detail-apps">{s.apps.map(a => <span key={a} className="sa-blade-tag">{a}</span>)}</div>
              </div>
            </div>
          ))}
        </section>

        <div className="sa-stats-row">
          <div style={{ textAlign: "center" }}><div className="sa-stat-num">12</div><div className="sa-stat-label">Sectores Industriales</div></div>
          <div style={{ textAlign: "center" }}><div className="sa-stat-num">56+</div><div className="sa-stat-label">Aplicaciones</div></div>
          <div style={{ textAlign: "center" }}><div className="sa-stat-num">10</div><div className="sa-stat-label">Países</div></div>
          <div style={{ textAlign: "center" }}><div className="sa-stat-num">6</div><div className="sa-stat-label">Divisiones</div></div>
        </div>

        <section id="nosotros" className="sa-about">
          <div className="sa-about-label">Sobre Nosotros</div>
          <h2>Construyendo el futuro de la inteligencia empresarial en toda la región.</h2>
          <p>Aqurion Sudamérica representa el compromiso de la compañía con los emprendedores de América Latina. Estamos construyendo herramientas de IA accesibles y poderosas para empresas de todos los tamaños, democratizando el acceso a tecnología empresarial de primer nivel.</p>
        </section>

        <section className="sa-divisions">
          <div className="sa-divisions-label">Divisiones de Aqurion</div>
          <div className="sa-divisions-grid">
            {divisiones.map(d => (
              <a key={d.domain} href={`https://${d.domain}`} className="sa-div-card" target="_blank" rel="noopener noreferrer">
                <span className="sa-div-icon">{d.icon}</span>
                <div><div className="sa-div-name">{d.name}</div><div className="sa-div-domain">{d.domain}</div></div>
              </a>
            ))}
          </div>
        </section>

        <footer className="sa-footer">
          <p>© {new Date().getFullYear()} Aqurion Sudamérica — Una Empresa de Aqurion Holdings</p>
        </footer>
      </div>
    </>
  );
}
