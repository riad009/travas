"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
function R({children,d=0}:{children:React.ReactNode;d?:number}){return<motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{delay:d,duration:0.7,ease:[0.16,1,0.3,1]}}>{children}</motion.div>;}

const apps = [
  { icon: "🍳", name: "RestaurantOne", desc: "POS, ordering, and operations for independent restaurants and cafes.", gradient: "linear-gradient(135deg, #FF6B35, #F7931A)" },
  { icon: "🥂", name: "CateringSuite", desc: "End-to-end catering management, event planning, and client communications.", gradient: "linear-gradient(135deg, #E91E8C, #FF6B6B)" },
  { icon: "🚐", name: "FoodTruckPro", desc: "Route planning, mobile POS, and inventory for food truck operators.", gradient: "linear-gradient(135deg, #4ECDC4, #44AF69)" },
  { icon: "🍸", name: "BarSuite", desc: "Bar and nightclub management with tab tracking and staff scheduling.", gradient: "linear-gradient(135deg, #6C63FF, #3B82F6)" },
  { icon: "🍷", name: "WineryManager", desc: "Vineyard operations, wine club management, and tasting room booking.", gradient: "linear-gradient(135deg, #722F37, #C73E4B)" },
  { icon: "💍", name: "WeddingPlannerPro", desc: "Full wedding and event planning with vendor management and timelines.", gradient: "linear-gradient(135deg, #F59E0B, #EC4899)" },
];

export default function HospitalityPage() {
  const bp = process.env.NODE_ENV === "development" ? "/hospitality" : "";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .ho { background: #080808; color: #fff; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; }

        /* Warm ambient gradient */
        .ho-ambient { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
        .ho-ambient::before { content: ''; position: absolute; top: -20%; left: -10%; width: 60%; height: 60%; background: radial-gradient(circle, rgba(217,119,6,0.04) 0%, transparent 70%); animation: amb1 15s ease-in-out infinite alternate; }
        .ho-ambient::after { content: ''; position: absolute; bottom: -20%; right: -10%; width: 50%; height: 50%; background: radial-gradient(circle, rgba(239,68,68,0.03) 0%, transparent 70%); animation: amb2 18s ease-in-out infinite alternate; }
        @keyframes amb1 { 0% { transform: translate(0,0); } 100% { transform: translate(50px, 30px); } }
        @keyframes amb2 { 0% { transform: translate(0,0); } 100% { transform: translate(-40px, -20px); } }

        .ho-content { position: relative; z-index: 1; }

        .ho-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 3rem; background: rgba(8,8,8,0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.04); }
        .ho-nav-logo { display: flex; align-items: center; gap: 0.6rem; font-size: 1rem; font-weight: 700; text-decoration: none; color: #fff; }
        .ho-nav-logo img { width: 32px; height: 32px; border-radius: 10px; }
        .ho-cta { padding: 0.55rem 1.5rem; border-radius: 50px; background: linear-gradient(135deg, #D97706, #B45309); color: #fff; font-weight: 700; font-size: 0.82rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; }
        .ho-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(217,119,6,0.25); }

        .ho-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 2rem 4rem; position: relative; }
        .ho-hero h1 { font-family: 'Instrument Serif', serif; font-size: clamp(4rem, 10vw, 8rem); font-weight: 400; line-height: 1.05; margin-bottom: 1.5rem; }
        .ho-hero h1 em { font-style: italic; background: linear-gradient(135deg, #D97706, #F59E0B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .ho-hero-sub { font-size: 1.15rem; color: rgba(255,255,255,0.3); max-width: 550px; line-height: 1.8; margin-bottom: 3rem; }
        .ho-hero-line { width: 60px; height: 1px; background: linear-gradient(90deg, transparent, rgba(217,119,6,0.5), transparent); margin: 0 auto 2rem; }

        .ho-section { padding: 7rem 2rem; max-width: 1200px; margin: 0 auto; }
        .ho-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #D97706; margin-bottom: 1rem; }
        .ho-title { font-family: 'Instrument Serif', serif; font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 400; margin-bottom: 3rem; }

        .ho-apps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .ho-app { padding: 2.5rem; border-radius: 24px; border: 1px solid rgba(255,255,255,0.04); background: rgba(255,255,255,0.02); transition: all 0.5s; position: relative; overflow: hidden; cursor: default; }
        .ho-app:hover { transform: translateY(-8px); border-color: rgba(217,119,6,0.15); }
        .ho-app-glow { position: absolute; bottom: -40px; right: -40px; width: 200px; height: 200px; border-radius: 50%; opacity: 0; transition: opacity 0.5s; filter: blur(80px); }
        .ho-app:hover .ho-app-glow { opacity: 0.15; }
        .ho-app-icon { font-size: 2.5rem; margin-bottom: 1.5rem; display: block; }
        .ho-app-name { font-family: 'Space Grotesk', sans-serif; font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem; }
        .ho-app-desc { font-size: 0.88rem; color: rgba(255,255,255,0.3); line-height: 1.7; }

        .ho-divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent); margin: 2rem 0; }

        .ho-cta-sec { text-align: center; padding: 10rem 2rem; position: relative; }
        .ho-cta-sec h2 { font-family: 'Instrument Serif', serif; font-size: clamp(3rem, 6vw, 5rem); font-weight: 400; margin-bottom: 1.5rem; }
        .ho-cta-sec h2 em { background: linear-gradient(135deg, #D97706, #F59E0B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .ho-cta-sec p { color: rgba(255,255,255,0.25); margin-bottom: 2.5rem; max-width: 420px; margin-left: auto; margin-right: auto; line-height: 1.7; }

        .ho-footer { padding: 3rem; text-align: center; font-size: 0.72rem; color: rgba(255,255,255,0.12); border-top: 1px solid rgba(255,255,255,0.04); }
        @media (max-width: 768px) { .ho-nav { padding: 1rem 1.5rem; } .ho-apps { grid-template-columns: 1fr; } }
      `}</style>
      <div className="ho">
        <div className="ho-ambient" />
        <div className="ho-content">
          <nav className="ho-nav"><a href={`${bp}/`} className="ho-nav-logo"><img src={`${bp}/logos/aqurion-hospitality-icon.png`} alt="" />Aqurion Hospitality</a><a href="#contact" className="ho-cta">Get Started</a></nav>
          <section className="ho-hero">
            <R><div className="ho-hero-line" /></R>
            <R d={0.1}><h1>Exceptional<br /><em>experiences</em>,<br />every time.</h1></R>
            <R d={0.2}><p className="ho-hero-sub">Digital solutions for restaurants, bars, catering, wineries, and event venues. One ecosystem, every hospitality need.</p></R>
            <R d={0.3}><a href="#contact" className="ho-cta" style={{ padding: "0.75rem 2.5rem", fontSize: "0.92rem" }}>Get Started →</a></R>
          </section>
          <section className="ho-section">
            <R><div className="ho-label">Applications</div><h2 className="ho-title">Purpose-built for hospitality.</h2></R>
            <div className="ho-apps">
              {apps.map((a, i) => <R key={a.name} d={i * 0.08}><div className="ho-app"><div className="ho-app-glow" style={{ background: a.gradient }} /><div className="ho-app-icon">{a.icon}</div><div className="ho-app-name">{a.name}</div><div className="ho-app-desc">{a.desc}</div></div></R>)}
            </div>
          </section>
          <section id="contact" className="ho-cta-sec">
            <R><h2>Ready to serve<br /><em>better</em>?</h2></R>
            <R d={0.1}><p>Join thousands of hospitality businesses using Aqurion to delight guests.</p></R>
            <R d={0.2}><a href="mailto:hospitality@aqurion.net" className="ho-cta" style={{ padding: "0.85rem 2.5rem", fontSize: "0.92rem" }}>Start a Demo →</a></R>
          </section>
          <footer className="ho-footer"><p>© {new Date().getFullYear()} Aqurion Hospitality — An Aqurion Holdings Company</p></footer>
        </div>
      </div>
    </>
  );
}
