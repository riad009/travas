"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
function R({children,d=0}:{children:React.ReactNode;d?:number}){return<motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{delay:d,duration:0.7,ease:[0.16,1,0.3,1]}}>{children}</motion.div>;}

const apps = [
  { icon: "🔒", name: "SecurityMaster", desc: "Residential and commercial security monitoring, alarm billing, and guard scheduling.", num: "01" },
  { icon: "⚡", name: "UtilitySuite", desc: "Water, sewer, gas, electric, and cellular utility billing and customer management.", num: "02" },
  { icon: "🏛️", name: "MuniSuite", desc: "Municipal bill payment, permit tracking, and citizen services for local governments.", num: "03" },
];

const stats = [{ val: "250+", label: "Municipalities" }, { val: "1.2M", label: "Accounts" }, { val: "99.99%", label: "Uptime" }, { val: "$8B+", label: "Processed" }];

export default function ServicesPage() {
  const bp = process.env.NODE_ENV === "development" ? "/services" : "";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    // Radar sweep effect
    let angle = 0;
    let animId: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2; const cy = H * 0.45;

      // Concentric circles
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, 80 * i, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(148,163,184,${0.03})`;
        ctx.stroke();
      }

      // Sweep line
      const grd = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * 320, cy + Math.sin(angle) * 320);
      grd.addColorStop(0, "rgba(148,163,184,0)");
      grd.addColorStop(1, "rgba(148,163,184,0.06)");
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, 320, angle - 0.5, angle, false);
      ctx.closePath();
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * 320, cy + Math.sin(angle) * 320);
      ctx.strokeStyle = "rgba(148,163,184,0.08)";
      ctx.stroke();

      angle += 0.008;
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .sv { background: #070A14; color: #fff; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .sv-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        .sv-content { position: relative; z-index: 1; }

        .sv-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 3rem; background: rgba(7,10,20,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(148,163,184,0.06); }
        .sv-nav-logo { display: flex; align-items: center; gap: 0.6rem; font-size: 1rem; font-weight: 700; text-decoration: none; color: #fff; letter-spacing: -0.02em; }
        .sv-nav-logo img { width: 32px; height: 32px; border-radius: 10px; }
        .sv-cta { padding: 0.55rem 1.5rem; border-radius: 8px; background: rgba(148,163,184,0.12); color: #94A3B8; font-weight: 700; font-size: 0.82rem; border: 1px solid rgba(148,163,184,0.12); cursor: pointer; text-decoration: none; transition: all 0.3s; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.05em; }
        .sv-cta:hover { background: rgba(148,163,184,0.2); color: #fff; }

        .sv-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 2rem 4rem; position: relative; }
        .sv-hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1rem; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 500; background: rgba(148,163,184,0.06); color: #94A3B8; border: 1px solid rgba(148,163,184,0.08); margin-bottom: 2.5rem; letter-spacing: 0.08em; }
        .sv-hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #22C55E; animation: svBlink 2s infinite; box-shadow: 0 0 8px rgba(34,197,94,0.4); }
        @keyframes svBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .sv-hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(3.5rem, 8vw, 6rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.04em; margin-bottom: 1.5rem; }
        .sv-grad { background: linear-gradient(135deg, #94A3B8, #CBD5E1, #94A3B8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% 200%; animation: svGrad 6s ease infinite; }
        @keyframes svGrad { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .sv-hero-sub { font-size: 1.15rem; color: rgba(255,255,255,0.25); max-width: 520px; line-height: 1.8; margin-bottom: 3rem; }

        .sv-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(148,163,184,0.06); border-radius: 12px; overflow: hidden; margin: 0 3rem; border: 1px solid rgba(148,163,184,0.06); }
        .sv-stat { background: rgba(7,10,20,0.95); padding: 3rem 2rem; text-align: center; }
        .sv-stat-val { font-family: 'Space Grotesk', sans-serif; font-size: 2.5rem; font-weight: 700; color: #94A3B8; margin-bottom: 0.25rem; }
        .sv-stat-label { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(148,163,184,0.4); text-transform: uppercase; letter-spacing: 0.15em; }

        .sv-section { padding: 7rem 2rem; max-width: 1200px; margin: 0 auto; }
        .sv-label { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.2em; color: #94A3B8; margin-bottom: 1rem; }
        .sv-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 700; letter-spacing: -0.03em; margin-bottom: 3rem; }

        .sv-apps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .sv-app { padding: 3rem; border-radius: 16px; border: 1px solid rgba(148,163,184,0.06); background: rgba(148,163,184,0.02); transition: all 0.4s; position: relative; text-align: left; }
        .sv-app:hover { border-color: rgba(148,163,184,0.12); transform: translateY(-4px); }
        .sv-app-num { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(148,163,184,0.2); letter-spacing: 0.1em; position: absolute; top: 2rem; right: 2rem; }
        .sv-app-icon { font-size: 2.5rem; margin-bottom: 1.5rem; }
        .sv-app-name { font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; margin-bottom: 0.75rem; }
        .sv-app-desc { font-size: 0.88rem; color: rgba(255,255,255,0.25); line-height: 1.7; }
        .sv-app-status { display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: #22C55E; }
        .sv-app-status::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: #22C55E; box-shadow: 0 0 6px rgba(34,197,94,0.4); }

        .sv-cta-sec { text-align: center; padding: 8rem 2rem; margin: 0 3rem 4rem; border-radius: 16px; border: 1px solid rgba(148,163,184,0.06); position: relative; overflow: hidden; }
        .sv-cta-sec::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(148,163,184,0.03), rgba(148,163,184,0.01)); }
        .sv-cta-sec h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; margin-bottom: 1rem; position: relative; }
        .sv-cta-sec p { color: rgba(255,255,255,0.25); margin-bottom: 2.5rem; max-width: 420px; margin-left: auto; margin-right: auto; position: relative; line-height: 1.7; }
        .sv-cta-main { padding: 0.75rem 2rem; border-radius: 8px; background: #94A3B8; color: #070A14; font-weight: 700; font-size: 0.88rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; position: relative; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.05em; }
        .sv-cta-main:hover { background: #CBD5E1; transform: translateY(-2px); }
        .sv-footer { padding: 3rem; text-align: center; font-size: 0.65rem; color: rgba(148,163,184,0.15); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.05em; border-top: 1px solid rgba(148,163,184,0.04); }
        @media (max-width: 768px) { .sv-nav { padding: 1rem 1.5rem; } .sv-stats { grid-template-columns: repeat(2, 1fr); margin: 0 1rem; } .sv-apps { grid-template-columns: 1fr; } .sv-cta-sec { margin: 0 1rem 3rem; } }
      `}</style>
      <div className="sv">
        <canvas ref={canvasRef} className="sv-canvas" />
        <div className="sv-content">
          <nav className="sv-nav"><a href={`${bp}/`} className="sv-nav-logo"><img src={`${bp}/logos/aqurion-security-icon.png`} alt="" />Aqurion Services</a><a href="#contact" className="sv-cta">Contact_us</a></nav>
          <section className="sv-hero">
            <R><div className="sv-hero-badge"><span className="sv-hero-badge-dot" /> SYSTEMS OPERATIONAL</div></R>
            <R d={0.1}><h1>Protect. Power.<br /><span className="sv-grad">Serve</span>.</h1></R>
            <R d={0.2}><p className="sv-hero-sub">Enterprise-grade software for security companies, utility providers, and municipal governments.</p></R>
            <R d={0.3}><a href="#contact" className="sv-cta" style={{ padding: "0.7rem 2rem" }}>Request_demo →</a></R>
          </section>
          <R><div className="sv-stats">{stats.map(s => <div key={s.label} className="sv-stat"><div className="sv-stat-val">{s.val}</div><div className="sv-stat-label">{s.label}</div></div>)}</div></R>
          <section className="sv-section" style={{ textAlign: "center" }}>
            <R><div className="sv-label">// Applications</div><h2 className="sv-title">Mission-critical software.</h2></R>
            <div className="sv-apps">
              {apps.map((a, i) => <R key={a.name} d={i * 0.12}><div className="sv-app"><div className="sv-app-num">{a.num}</div><div className="sv-app-icon">{a.icon}</div><div className="sv-app-name">{a.name}</div><div className="sv-app-desc">{a.desc}</div><div className="sv-app-status">OPERATIONAL</div></div></R>)}
            </div>
          </section>
          <R><section id="contact" className="sv-cta-sec"><h2>Modernize your<br />infrastructure.</h2><p>Discover how Aqurion can transform your security or utility operations.</p><a href="mailto:services@aqurion.net" className="sv-cta-main">Contact_sales →</a></section></R>
          <footer className="sv-footer"><p>© {new Date().getFullYear()} Aqurion_Services // Aqurion Holdings</p></footer>
        </div>
      </div>
    </>
  );
}
