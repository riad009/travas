"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
function R({children,d=0}:{children:React.ReactNode;d?:number}){return<motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{delay:d,duration:0.7,ease:[0.16,1,0.3,1]}}>{children}</motion.div>;}

const apps = [
  { icon: "🚘", name: "AutoSuite", desc: "Complete dealership management — inventory, CRM, F&I, and DMS.", gradient: "linear-gradient(135deg, #EF4444, #DC2626)" },
  { icon: "🛻", name: "TowSuite", desc: "Dispatch, impound tracking, and roadside assistance management.", gradient: "linear-gradient(135deg, #F59E0B, #D97706)" },
  { icon: "🏍️", name: "MotorsOne", desc: "Motorcycle, powersports, and marine dealership operations.", gradient: "linear-gradient(135deg, #10B981, #059669)" },
];

export default function ATMPage() {
  const bp = process.env.NODE_ENV === "development" ? "/atm" : "";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    for (let i = 0; i < 60; i++) particles.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, r: Math.random() * 1.5 + 0.5, a: Math.random() * 0.3 + 0.1 });

    let animId: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239,68,68,${p.a})`; ctx.fill();
      });

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i]!.x - particles[j]!.x;
          const dy = particles[i]!.y - particles[j]!.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i]!.x, particles[i]!.y);
            ctx.lineTo(particles[j]!.x, particles[j]!.y);
            ctx.strokeStyle = `rgba(239,68,68,${0.03 * (1 - d / 150)})`;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .at { background: #050505; color: #fff; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .at-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; }

        .at-content { position: relative; z-index: 1; }
        .at-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 3rem; background: rgba(5,5,5,0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(239,68,68,0.06); }
        .at-nav-logo { display: flex; align-items: center; gap: 0.6rem; font-size: 1rem; font-weight: 700; text-decoration: none; color: #fff; }
        .at-nav-logo img { width: 32px; height: 32px; border-radius: 10px; }
        .at-cta { padding: 0.55rem 1.5rem; border-radius: 50px; background: #EF4444; color: #fff; font-weight: 700; font-size: 0.82rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; }
        .at-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(239,68,68,0.3); }

        .at-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 2rem 4rem; position: relative; }
        .at-hero::before { content: ''; position: absolute; top: 30%; left: 50%; transform: translate(-50%,-50%); width: 800px; height: 800px; background: radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 60%); animation: atPulse 6s ease-in-out infinite; }
        @keyframes atPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        .at-hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(3.5rem, 8vw, 6.5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.04em; margin-bottom: 1.5rem; position: relative; }
        .at-grad { background: linear-gradient(135deg, #EF4444, #F97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% 200%; animation: gradA 4s ease infinite; }
        @keyframes gradA { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .at-hero-sub { font-size: 1.15rem; color: rgba(255,255,255,0.3); max-width: 520px; line-height: 1.8; margin-bottom: 3rem; position: relative; }
        .at-speed-lines { position: absolute; top: 40%; left: 0; width: 100%; height: 200px; overflow: hidden; pointer-events: none; opacity: 0.03; }
        .at-speed-line { position: absolute; height: 1px; background: linear-gradient(90deg, transparent, #EF4444, transparent); animation: speedLine 3s ease-in-out infinite; }
        @keyframes speedLine { 0% { transform: translateX(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(200%); opacity: 0; } }

        .at-section { padding: 7rem 2rem; max-width: 1200px; margin: 0 auto; text-align: center; }
        .at-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #EF4444; margin-bottom: 1rem; }
        .at-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 700; letter-spacing: -0.03em; margin-bottom: 3rem; }

        .at-apps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .at-app { padding: 3rem; border-radius: 24px; border: 1px solid rgba(255,255,255,0.04); background: rgba(255,255,255,0.02); text-align: left; transition: all 0.5s; position: relative; overflow: hidden; }
        .at-app:hover { transform: translateY(-8px) scale(1.01); border-color: rgba(239,68,68,0.2); }
        .at-app-glow { position: absolute; top: 0; left: 0; right: 0; height: 200px; opacity: 0; transition: opacity 0.5s; }
        .at-app:hover .at-app-glow { opacity: 0.06; }
        .at-app-icon { font-size: 3rem; margin-bottom: 1.5rem; display: block; }
        .at-app-name { font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; font-weight: 700; margin-bottom: 0.75rem; }
        .at-app-desc { font-size: 0.92rem; color: rgba(255,255,255,0.3); line-height: 1.7; }
        .at-app-link { display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 1.5rem; font-size: 0.82rem; font-weight: 600; color: #EF4444; text-decoration: none; opacity: 0; transition: all 0.3s; }
        .at-app:hover .at-app-link { opacity: 1; }

        .at-cta-sec { text-align: center; padding: 8rem 2rem; border-top: 1px solid rgba(239,68,68,0.06); }
        .at-cta-sec h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; margin-bottom: 1.25rem; }
        .at-cta-sec p { color: rgba(255,255,255,0.25); margin-bottom: 2.5rem; max-width: 420px; margin-left: auto; margin-right: auto; line-height: 1.7; }
        .at-footer { padding: 3rem; text-align: center; font-size: 0.72rem; color: rgba(255,255,255,0.12); }
        @media (max-width: 768px) { .at-nav { padding: 1rem 1.5rem; } .at-apps { grid-template-columns: 1fr; } }
      `}</style>
      <div className="at">
        <canvas ref={canvasRef} className="at-canvas" />
        <div className="at-content">
          <nav className="at-nav"><a href={`${bp}/`} className="at-nav-logo"><img src={`${bp}/logos/aqurion-auto-icon.png`} alt="" />Aqurion Automotive</a><a href="#contact" className="at-cta">Request Demo</a></nav>
          <section className="at-hero">
            <div className="at-speed-lines">
              {Array.from({ length: 5 }).map((_, i) => <div key={i} className="at-speed-line" style={{ top: `${i * 40}px`, width: `${200 + Math.random() * 300}px`, animationDelay: `${i * 0.6}s` }} />)}
            </div>
            <R><h1>Drive Smarter.<br /><span className="at-grad">Service Better</span>.</h1></R>
            <R d={0.1}><p className="at-hero-sub">Complete automotive software for dealerships, tow companies, and motorsports businesses.</p></R>
            <R d={0.2}><a href="#contact" className="at-cta" style={{ padding: "0.75rem 2.5rem", fontSize: "0.92rem" }}>Request Demo →</a></R>
          </section>
          <section className="at-section">
            <R><div className="at-label">Applications</div><h2 className="at-title">Software for every wheel.</h2></R>
            <div className="at-apps">
              {apps.map((a, i) => <R key={a.name} d={i * 0.1}><div className="at-app"><div className="at-app-glow" style={{ background: a.gradient }} /><div className="at-app-icon">{a.icon}</div><div className="at-app-name">{a.name}</div><div className="at-app-desc">{a.desc}</div><a href="#contact" className="at-app-link">Learn More →</a></div></R>)}
            </div>
          </section>
          <section id="contact" className="at-cta-sec">
            <R><h2>Ready to <span className="at-grad">accelerate</span>?</h2></R>
            <R d={0.1}><p>See how Aqurion Automotive powers modern auto businesses.</p></R>
            <R d={0.2}><a href="mailto:auto@aqurion.net" className="at-cta" style={{ padding: "0.85rem 2.5rem", fontSize: "0.92rem" }}>Get Started →</a></R>
          </section>
          <footer className="at-footer"><p>© {new Date().getFullYear()} Aqurion Automotive — An Aqurion Holdings Company</p></footer>
        </div>
      </div>
    </>
  );
}
