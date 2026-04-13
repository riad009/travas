"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
function R({children,d=0}:{children:React.ReactNode;d?:number}){return<motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{delay:d,duration:0.7,ease:[0.16,1,0.3,1]}}>{children}</motion.div>;}

const sectors = [
  { icon: "🏢", title: "Commercial Property", desc: "Streamline office, retail, and industrial property operations with AI-driven lease management.", apps: ["PropertyFlow", "ParkingFlow"], color: "#3B82F6" },
  { icon: "🏨", title: "Hotels & Resorts", desc: "End-to-end hotel management from reservations to housekeeping and guest experience.", apps: ["HotelSuite", "SkiResortFlow"], color: "#8B5CF6" },
  { icon: "🏘️", title: "Residential & HOA", desc: "Simplify resident communications, maintenance requests, and association management.", apps: ["HOAPro", "MarinaSuite"], color: "#06B6D4" },
  { icon: "⚱️", title: "Memorial Services", desc: "Dignified management solutions for funeral homes and cemetery operations.", apps: ["FuneralSuite"], color: "#64748B" },
];

const stats = [{ val: "500+", label: "Properties" }, { val: "$1.2B", label: "Under Management" }, { val: "15K+", label: "Units Tracked" }, { val: "99.8%", label: "Client Retention" }];

export default function PSPage() {
  const bp = process.env.NODE_ENV === "development" ? "/ps" : "";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .ps { background: #FAFCFF; color: #0F172A; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .ps-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 3rem; background: rgba(250,252,255,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,0,0,0.04); }
        .ps-nav-logo { display: flex; align-items: center; gap: 0.6rem; font-size: 1rem; font-weight: 700; text-decoration: none; color: #0F172A; }
        .ps-nav-logo img { width: 32px; height: 32px; border-radius: 10px; }
        .ps-cta { padding: 0.55rem 1.5rem; border-radius: 50px; background: #2563EB; color: #fff; font-weight: 700; font-size: 0.82rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; }
        .ps-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(37,99,235,0.25); }

        .ps-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 2rem 4rem; position: relative; overflow: hidden; }
        .ps-hero-bg { position: absolute; inset: 0; background: linear-gradient(180deg, #EEF2FF 0%, #FAFCFF 100%); }
        .ps-hero-grid { position: absolute; inset: 0; opacity: 0.4; background-image: linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px); background-size: 60px 60px; }
        .ps-hero-content { position: relative; z-index: 1; }
        .ps-hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1.2rem; border-radius: 50px; font-size: 0.72rem; font-weight: 600; background: rgba(37,99,235,0.06); color: #2563EB; border: 1px solid rgba(37,99,235,0.12); margin-bottom: 2rem; }
        .ps-hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(3.5rem, 8vw, 6rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.04em; margin-bottom: 1.5rem; }
        .ps-grad { background: linear-gradient(135deg, #2563EB, #7C3AED); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .ps-hero-sub { font-size: 1.15rem; color: rgba(15,23,42,0.45); max-width: 550px; line-height: 1.8; margin-bottom: 3rem; }

        .ps-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin: 0 3rem; border-radius: 20px; overflow: hidden; background: rgba(0,0,0,0.04); }
        .ps-stat { background: #fff; padding: 3rem 2rem; text-align: center; }
        .ps-stat-val { font-family: 'Space Grotesk', sans-serif; font-size: 2.5rem; font-weight: 700; color: #2563EB; margin-bottom: 0.25rem; }
        .ps-stat-label { font-size: 0.72rem; color: rgba(15,23,42,0.3); text-transform: uppercase; letter-spacing: 0.12em; }

        .ps-section { padding: 7rem 2rem; max-width: 1200px; margin: 0 auto; }
        .ps-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #2563EB; margin-bottom: 1rem; }
        .ps-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 700; letter-spacing: -0.03em; margin-bottom: 3rem; }

        .ps-sectors { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .ps-sector { padding: 2.5rem; border-radius: 24px; background: #fff; border: 1px solid rgba(0,0,0,0.04); transition: all 0.4s; position: relative; overflow: hidden; }
        .ps-sector:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.06); }
        .ps-sector::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--accent); opacity: 0; transition: opacity 0.3s; }
        .ps-sector:hover::before { opacity: 1; }
        .ps-sector-icon { font-size: 2rem; margin-bottom: 1.25rem; display: inline-flex; width: 56px; height: 56px; border-radius: 16px; align-items: center; justify-content: center; background: rgba(37,99,235,0.04); }
        .ps-sector-title { font-family: 'Space Grotesk', sans-serif; font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem; }
        .ps-sector-desc { font-size: 0.88rem; color: rgba(15,23,42,0.4); line-height: 1.7; margin-bottom: 1.25rem; }
        .ps-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .ps-tag { padding: 0.3rem 0.75rem; border-radius: 50px; font-size: 0.72rem; font-weight: 600; background: rgba(37,99,235,0.04); color: #2563EB; border: 1px solid rgba(37,99,235,0.08); }

        .ps-cta-sec { text-align: center; padding: 8rem 2rem; background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #fff; border-radius: 32px; margin: 0 3rem 4rem; position: relative; overflow: hidden; }
        .ps-cta-sec h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; margin-bottom: 1rem; position: relative; }
        .ps-cta-sec p { color: rgba(255,255,255,0.6); margin-bottom: 2.5rem; max-width: 420px; margin-left: auto; margin-right: auto; position: relative; line-height: 1.7; }
        .ps-cta-white { padding: 0.75rem 2rem; border-radius: 50px; background: #fff; color: #2563EB; font-weight: 700; font-size: 0.88rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; position: relative; }
        .ps-cta-white:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
        .ps-footer { padding: 3rem; text-align: center; font-size: 0.72rem; color: rgba(15,23,42,0.25); }
        @media (max-width: 768px) { .ps-nav { padding: 1rem 1.5rem; } .ps-stats { grid-template-columns: repeat(2, 1fr); margin: 0 1rem; } .ps-sectors { grid-template-columns: 1fr; } .ps-cta-sec { margin: 0 1rem 3rem; } }
      `}</style>
      <div className="ps">
        <nav className="ps-nav"><a href={`${bp}/`} className="ps-nav-logo"><img src={`${bp}/logos/aqurion-ps-icon.png`} alt="" />Aqurion Property Services</a><a href="#contact" className="ps-cta">Request Demo</a></nav>
        <section className="ps-hero">
          <div className="ps-hero-bg" /><div className="ps-hero-grid" />
          <div className="ps-hero-content">
            <R><div className="ps-hero-badge">🏢 Property Technology Platform</div></R>
            <R d={0.1}><h1>Real Estate.<br /><span className="ps-grad">Reimagined</span>.</h1></R>
            <R d={0.2}><p className="ps-hero-sub">Technology-driven solutions for every type of property — residential, commercial, hospitality, and beyond.</p></R>
            <R d={0.3}><a href="#contact" className="ps-cta" style={{ padding: "0.75rem 2.5rem" }}>Request Demo →</a></R>
          </div>
        </section>
        <R><div className="ps-stats">{stats.map(s => <div key={s.label} className="ps-stat"><div className="ps-stat-val">{s.val}</div><div className="ps-stat-label">{s.label}</div></div>)}</div></R>
        <section className="ps-section">
          <R><div className="ps-label">Sectors</div><h2 className="ps-title">Purpose-built for every property type.</h2></R>
          <div className="ps-sectors">
            {sectors.map((s, i) => <R key={s.title} d={i * 0.1}><div className="ps-sector" style={{ "--accent": s.color } as React.CSSProperties}><div className="ps-sector-icon">{s.icon}</div><div className="ps-sector-title">{s.title}</div><div className="ps-sector-desc">{s.desc}</div><div className="ps-tags">{s.apps.map(a => <span key={a} className="ps-tag">{a}</span>)}</div></div></R>)}
          </div>
        </section>
        <R><section id="contact" className="ps-cta-sec"><h2>Ready to modernize<br />your properties?</h2><p>Get a personalized demo and see how Aqurion can transform your operations.</p><a href="mailto:ps@aqurion.net" className="ps-cta-white">Request Demo →</a></section></R>
        <footer className="ps-footer"><p>© {new Date().getFullYear()} Aqurion Property Services — An Aqurion Holdings Company</p></footer>
      </div>
    </>
  );
}
