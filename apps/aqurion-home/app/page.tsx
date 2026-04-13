"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
function R({children,d=0}:{children:React.ReactNode;d?:number}){return<motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{delay:d,duration:0.7,ease:[0.16,1,0.3,1]}}>{children}</motion.div>;}

const services = [
  { icon: "🌿", title: "Landscaping", desc: "Scheduling, route optimization, and invoicing for lawn and landscape companies.", color: "#22C55E" },
  { icon: "☀️", title: "Solar Installation", desc: "Project management, permitting, and monitoring for solar installers.", color: "#F59E0B" },
  { icon: "🔧", title: "Plumbing & Electric", desc: "Job dispatch, work orders, and customer management for trades.", color: "#3B82F6" },
  { icon: "🏗️", title: "General Contracting", desc: "Project timelines, subcontractor coordination, and estimates.", color: "#EF4444" },
  { icon: "🐛", title: "Pest Control", desc: "Route scheduling, treatment tracking, and recurring service management.", color: "#8B5CF6" },
  { icon: "🏠", title: "Handyman Services", desc: "Multi-trade service management with real-time dispatch.", color: "#06B6D4" },
];

const steps = [
  { num: "01", title: "Sign Up", desc: "Create your free account in under 60 seconds." },
  { num: "02", title: "Configure", desc: "Set up your services, pricing, and team members." },
  { num: "03", title: "Grow", desc: "Start taking bookings and managing jobs like a pro." },
];

export default function HomePage() {
  const bp = process.env.NODE_ENV === "development" ? "/home" : "";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .hm { background: #FAFDF7; color: #0F172A; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; }

        .hm-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 3rem; background: rgba(250,253,247,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,0,0,0.04); }
        .hm-nav-logo { display: flex; align-items: center; gap: 0.6rem; font-size: 1rem; font-weight: 700; text-decoration: none; color: #0F172A; }
        .hm-nav-logo img { width: 32px; height: 32px; border-radius: 10px; }
        .hm-cta { padding: 0.55rem 1.5rem; border-radius: 50px; background: #EA580C; color: #fff; font-weight: 700; font-size: 0.82rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; }
        .hm-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(234,88,12,0.25); }

        .hm-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 2rem 4rem; position: relative; overflow: hidden; }
        .hm-hero-bg { position: absolute; inset: 0; background: linear-gradient(180deg, #FFF7ED 0%, #FAFDF7 100%); }
        .hm-hero-blob1 { position: absolute; top: 5%; right: 10%; width: 400px; height: 400px; border-radius: 50%; background: rgba(234,88,12,0.05); filter: blur(100px); animation: blobFloat 10s ease-in-out infinite; }
        .hm-hero-blob2 { position: absolute; bottom: 10%; left: 5%; width: 350px; height: 350px; border-radius: 50%; background: rgba(34,197,94,0.05); filter: blur(100px); animation: blobFloat 12s ease-in-out infinite reverse; }
        @keyframes blobFloat { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-20px) scale(1.05); } }

        .hm-hero-content { position: relative; z-index: 1; }
        .hm-hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(3.5rem, 8vw, 6rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.04em; margin-bottom: 1.5rem; }
        .hm-grad { background: linear-gradient(135deg, #EA580C, #F59E0B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hm-hero-sub { font-size: 1.15rem; color: rgba(15,23,42,0.45); max-width: 550px; line-height: 1.8; margin-bottom: 3rem; }

        .hm-section { padding: 7rem 2rem; max-width: 1200px; margin: 0 auto; text-align: center; }
        .hm-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #EA580C; margin-bottom: 1rem; }
        .hm-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 700; letter-spacing: -0.03em; margin-bottom: 3rem; }

        .hm-services { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .hm-service { padding: 2.5rem; border-radius: 24px; background: #fff; border: 1px solid rgba(0,0,0,0.04); text-align: left; transition: all 0.4s; position: relative; overflow: hidden; }
        .hm-service:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.06); }
        .hm-service::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--accent); transform: scaleX(0); transition: transform 0.4s; transform-origin: left; }
        .hm-service:hover::after { transform: scaleX(1); }
        .hm-service-icon { font-size: 1.5rem; margin-bottom: 1.25rem; display: inline-flex; width: 56px; height: 56px; border-radius: 16px; align-items: center; justify-content: center; }
        .hm-service-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.5rem; }
        .hm-service-desc { font-size: 0.85rem; color: rgba(15,23,42,0.4); line-height: 1.7; }

        /* How it works */
        .hm-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; margin-top: 3rem; text-align: left; }
        .hm-step { position: relative; padding-left: 1rem; border-left: 2px solid rgba(234,88,12,0.15); }
        .hm-step-num { font-family: 'Space Grotesk', sans-serif; font-size: 3rem; font-weight: 700; color: rgba(234,88,12,0.12); line-height: 1; margin-bottom: 0.75rem; }
        .hm-step-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; margin-bottom: 0.5rem; }
        .hm-step-desc { font-size: 0.85rem; color: rgba(15,23,42,0.4); line-height: 1.7; }

        .hm-cta-sec { text-align: center; padding: 8rem 2rem; background: linear-gradient(135deg, #EA580C, #C2410C); color: #fff; border-radius: 32px; margin: 0 3rem 4rem; position: relative; overflow: hidden; }
        .hm-cta-sec h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; margin-bottom: 1rem; position: relative; }
        .hm-cta-sec p { color: rgba(255,255,255,0.6); margin-bottom: 2.5rem; max-width: 420px; margin-left: auto; margin-right: auto; position: relative; line-height: 1.7; }
        .hm-cta-white { padding: 0.75rem 2rem; border-radius: 50px; background: #fff; color: #EA580C; font-weight: 700; font-size: 0.88rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; position: relative; }
        .hm-cta-white:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
        .hm-footer { padding: 3rem; text-align: center; font-size: 0.72rem; color: rgba(15,23,42,0.25); }
        @media (max-width: 768px) { .hm-nav { padding: 1rem 1.5rem; } .hm-services, .hm-steps { grid-template-columns: 1fr; } .hm-cta-sec { margin: 0 1rem 3rem; } }
      `}</style>
      <div className="hm">
        <nav className="hm-nav"><a href={`${bp}/`} className="hm-nav-logo"><img src={`${bp}/logos/aqurion-home-icon.png`} alt="" />Aqurion Home Services</a><a href="#contact" className="hm-cta">Get Started</a></nav>
        <section className="hm-hero">
          <div className="hm-hero-bg" /><div className="hm-hero-blob1" /><div className="hm-hero-blob2" />
          <div className="hm-hero-content">
            <R><h1>Your Home.<br />Our <span className="hm-grad">Expertise</span>.</h1></R>
            <R d={0.1}><p className="hm-hero-sub">Software for landscapers, contractors, solar installers, plumbers, electricians, and every home service professional.</p></R>
            <R d={0.2}><a href="#contact" className="hm-cta" style={{ padding: "0.75rem 2.5rem" }}>Start Free Trial →</a></R>
          </div>
        </section>
        <section className="hm-section">
          <R><div className="hm-label">Services</div><h2 className="hm-title">Built for every trade.</h2></R>
          <div className="hm-services">
            {services.map((s, i) => <R key={s.title} d={i * 0.08}><div className="hm-service" style={{ "--accent": s.color } as React.CSSProperties}><div className="hm-service-icon" style={{ background: `${s.color}12` }}>{s.icon}</div><div className="hm-service-title">{s.title}</div><div className="hm-service-desc">{s.desc}</div></div></R>)}
          </div>
        </section>
        <section className="hm-section">
          <R><div className="hm-label">How It Works</div><h2 className="hm-title">Up and running in minutes.</h2></R>
          <div className="hm-steps">
            {steps.map((s, i) => <R key={s.num} d={i * 0.15}><div className="hm-step"><div className="hm-step-num">{s.num}</div><div className="hm-step-title">{s.title}</div><div className="hm-step-desc">{s.desc}</div></div></R>)}
          </div>
        </section>
        <R><section id="contact" className="hm-cta-sec"><h2>Grow your business</h2><p>Join thousands of professionals already using Aqurion.</p><a href="mailto:home@aqurion.net" className="hm-cta-white">Get Started Free →</a></section></R>
        <footer className="hm-footer"><p>© {new Date().getFullYear()} Aqurion Home Services — An Aqurion Holdings Company</p></footer>
      </div>
    </>
  );
}
