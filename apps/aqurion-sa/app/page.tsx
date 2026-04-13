"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const fadeUp = { hidden: { opacity: 0, y: 35 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }) };
function Rv({children,d=0}:{children:React.ReactNode;d?:number}){return<motion.div initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{delay:d,duration:0.6,ease:[0.16,1,0.3,1]}}>{children}</motion.div>;}

const markets = [
  { flag: "🇧🇷", country: "Brazil", city: "São Paulo", status: "Active", color: "#22C55E" },
  { flag: "🇲🇽", country: "Mexico", city: "Mexico City", status: "Active", color: "#22C55E" },
  { flag: "🇦🇷", country: "Argentina", city: "Buenos Aires", status: "Active", color: "#22C55E" },
  { flag: "🇨🇴", country: "Colombia", city: "Bogotá", status: "Expanding", color: "#F59E0B" },
  { flag: "🇨🇱", country: "Chile", city: "Santiago", status: "Expanding", color: "#F59E0B" },
  { flag: "🇵🇪", country: "Peru", city: "Lima", status: "Coming Soon", color: "#94A3B8" },
];

const features = [
  { icon: "🌎", title: "Localization", desc: "Full Portuguese and Spanish localization with region-specific compliance." },
  { icon: "💱", title: "Multi-Currency", desc: "Real-time exchange rates and local payment methods (PIX, OXXO, MercadoPago)." },
  { icon: "📋", title: "Tax Compliance", desc: "Automated tax calculations for Brazil (ICMS, ISS), Mexico (IVA), and Argentina." },
  { icon: "🤝", title: "Local Support", desc: "Dedicated LATAM account managers with native language support teams." },
];

const stats = [{ val: "6", label: "Countries" }, { val: "12K+", label: "Businesses" }, { val: "3", label: "Languages" }, { val: "$400M+", label: "GMV" }];

export default function SAPage() {
  const bp = process.env.NODE_ENV === "development" ? "/sa" : "";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .sa{background:#030712;color:#fff;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}
        .sa-mesh{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 60% 50% at 20% 30%,rgba(212,160,23,0.04),transparent),radial-gradient(ellipse 50% 60% at 80% 70%,rgba(34,197,94,0.03),transparent);}
        .sa-content{position:relative;z-index:1;}
        .sa-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 3rem;background:rgba(3,7,18,0.8);backdrop-filter:blur(20px);border-bottom:1px solid rgba(212,160,23,0.06);}
        .sa-nav-logo{display:flex;align-items:center;gap:0.6rem;font-size:1rem;font-weight:700;text-decoration:none;color:#fff;}
        .sa-nav-logo img{width:32px;height:32px;border-radius:10px;}
        .sa-cta{padding:0.55rem 1.5rem;border-radius:50px;background:linear-gradient(135deg,#D4A017,#B8860B);color:#fff;font-weight:700;font-size:0.82rem;border:none;cursor:pointer;text-decoration:none;transition:all 0.3s;}
        .sa-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(212,160,23,0.25);}

        .sa-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 4rem;position:relative;}
        .sa-hero-glow{position:absolute;top:25%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(212,160,23,0.08),transparent 70%);animation:saGlow 5s ease-in-out infinite;}
        @keyframes saGlow{0%,100%{opacity:0.5;transform:translate(-50%,-50%) scale(1);}50%{opacity:1;transform:translate(-50%,-50%) scale(1.15);}}
        .sa-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(3.5rem,8vw,6rem);font-weight:700;line-height:1.05;letter-spacing:-0.04em;margin-bottom:1.5rem;position:relative;}
        .sa-grad{background:linear-gradient(135deg,#D4A017,#F59E0B,#22C55E);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% 200%;animation:saGrad 5s ease infinite;}
        @keyframes saGrad{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
        .sa-hero-sub{font-size:1.15rem;color:rgba(255,255,255,0.3);max-width:520px;line-height:1.8;margin-bottom:3rem;position:relative;}

        .sa-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.04);border-radius:20px;overflow:hidden;margin:0 3rem 4rem;}
        .sa-stat{background:rgba(3,7,18,0.95);padding:3rem 2rem;text-align:center;}
        .sa-stat-val{font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;color:#D4A017;}
        .sa-stat-label{font-size:0.72rem;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.12em;}

        .sa-section{padding:7rem 2rem;max-width:1200px;margin:0 auto;text-align:center;}
        .sa-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#D4A017;margin-bottom:1rem;}
        .sa-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.2rem);font-weight:700;letter-spacing:-0.03em;margin-bottom:3rem;}

        .sa-markets{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:left;}
        .sa-market{padding:2rem;border-radius:16px;border:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);transition:all 0.4s;display:flex;align-items:center;gap:1.25rem;}
        .sa-market:hover{transform:translateY(-4px);border-color:rgba(212,160,23,0.12);}
        .sa-market-flag{font-size:2.5rem;}
        .sa-market-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;}
        .sa-market-city{font-size:0.78rem;color:rgba(255,255,255,0.3);}
        .sa-market-status{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-top:0.25rem;}

        .sa-features{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.03);border-radius:20px;overflow:hidden;}
        .sa-feature{background:rgba(3,7,18,0.95);padding:2.5rem;text-align:left;transition:all 0.4s;}
        .sa-feature:hover{background:rgba(15,20,30,0.95);}
        .sa-feature::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#D4A017,#22C55E);transform:scaleX(0);transition:transform 0.4s;transform-origin:left;}
        .sa-feature:hover::before{transform:scaleX(1);}
        .sa-feature{position:relative;overflow:hidden;}
        .sa-feature-icon{font-size:2rem;margin-bottom:1.25rem;}
        .sa-feature-title{font-family:'Space Grotesk',sans-serif;font-weight:700;margin-bottom:0.5rem;}
        .sa-feature-desc{font-size:0.85rem;color:rgba(255,255,255,0.3);line-height:1.7;}

        .sa-cta-sec{text-align:center;padding:8rem 2rem;margin:0 3rem 4rem;border-radius:24px;border:1px solid rgba(212,160,23,0.08);position:relative;overflow:hidden;}
        .sa-cta-sec::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(212,160,23,0.04),rgba(34,197,94,0.02));}
        .sa-cta-sec h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.5rem,5vw,3.5rem);font-weight:700;margin-bottom:1rem;position:relative;}
        .sa-cta-sec p{color:rgba(255,255,255,0.3);margin-bottom:2.5rem;max-width:420px;margin-left:auto;margin-right:auto;position:relative;line-height:1.7;}
        .sa-footer{padding:3rem;text-align:center;font-size:0.72rem;color:rgba(255,255,255,0.12);border-top:1px solid rgba(255,255,255,0.04);}
        @media(max-width:768px){.sa-nav{padding:1rem 1.5rem;}.sa-stats{grid-template-columns:repeat(2,1fr);margin:0 1rem 3rem;}.sa-markets{grid-template-columns:1fr;}.sa-features{grid-template-columns:1fr 1fr;}.sa-cta-sec{margin:0 1rem 3rem;}}
      `}</style>
      <div className="sa">
        <div className="sa-mesh" />
        <div className="sa-content">
          <nav className="sa-nav"><a href={`${bp}/`} className="sa-nav-logo"><img src={`${bp}/logos/aqurion-sa-icon.png`} alt="" />Aqurion South America</a><a href="#contact" className="sa-cta">Explore Markets →</a></nav>
          <section className="sa-hero">
            <div className="sa-hero-glow" />
            <Rv><h1>Aqurion for<br /><span className="sa-grad">Latin America</span>.</h1></Rv>
            <Rv d={0.1}><p className="sa-hero-sub">The full Aqurion ecosystem localized for LATAM — payments, compliance, and multi-language support built in.</p></Rv>
            <Rv d={0.2}><a href="#contact" className="sa-cta" style={{ padding: "0.75rem 2.5rem" }}>Explore Markets →</a></Rv>
          </section>
          <Rv><div className="sa-stats">{stats.map(s => <div key={s.label} className="sa-stat"><div className="sa-stat-val">{s.val}</div><div className="sa-stat-label">{s.label}</div></div>)}</div></Rv>
          <section className="sa-section">
            <Rv><div className="sa-label">Markets</div><h2 className="sa-title">Active across the continent.</h2></Rv>
            <div className="sa-markets">{markets.map((m, i) => <Rv key={m.country} d={i * 0.08}><div className="sa-market"><div className="sa-market-flag">{m.flag}</div><div><div className="sa-market-name">{m.country}</div><div className="sa-market-city">{m.city}</div><div className="sa-market-status" style={{ color: m.color }}>● {m.status}</div></div></div></Rv>)}</div>
          </section>
          <section className="sa-section">
            <Rv><div className="sa-label">Platform</div><h2 className="sa-title">Built for Latin America.</h2></Rv>
            <div className="sa-features">{features.map((f, i) => <Rv key={f.title} d={i * 0.1}><div className="sa-feature"><div className="sa-feature-icon">{f.icon}</div><div className="sa-feature-title">{f.title}</div><div className="sa-feature-desc">{f.desc}</div></div></Rv>)}</div>
          </section>
          <Rv><section id="contact" className="sa-cta-sec"><h2>Expand into <span className="sa-grad">LATAM</span></h2><p>Ready to bring your business to 500M+ consumers across Latin America.</p><a href="mailto:sa@aqurion.net" className="sa-cta" style={{ padding: "0.75rem 2.5rem" }}>Contact LATAM Team →</a></section></Rv>
          <footer className="sa-footer">© {new Date().getFullYear()} Aqurion South America — An Aqurion Holdings Company</footer>
        </div>
      </div>
    </>
  );
}
