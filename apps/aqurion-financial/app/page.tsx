"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }) };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const products = [
  { icon: "💳", title: "Payment Processing", desc: "Accept payments online and in-person with industry-low fees. Integrated POS and invoicing.", color: "#4ECDC4" },
  { icon: "🤖", title: "AI Tax Prep", desc: "Automated tax preparation powered by AI. Maximize deductions, minimize errors.", color: "#00D4FF" },
  { icon: "💰", title: "Payroll Suite", desc: "Run payroll in minutes. Automated tax filings, direct deposit, and compliance.", color: "#6C63FF" },
  { icon: "🏦", title: "Business Banking", desc: "High-yield accounts, virtual cards, and instant transfers for modern businesses.", color: "#F59E0B" },
  { icon: "📈", title: "Financial Analytics", desc: "Real-time dashboards, cash flow forecasting, and expense tracking.", color: "#10B981" },
  { icon: "🔒", title: "Fraud Protection", desc: "AI-powered fraud detection with real-time alerts and enterprise-grade security.", color: "#EF4444" },
];

const stats = [{ val: "$2.4B+", label: "Transactions Processed" }, { val: "0.5%", label: "Processing Fee" }, { val: "99.99%", label: "Uptime SLA" }, { val: "15K+", label: "Businesses Served" }];

export default function FinancialPage() {
  const bp = process.env.NODE_ENV === "development" ? "/financial" : "";
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .fi{background:#030712;color:#fff;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}
        .fi-mesh{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 80% 60% at 20% 40%,rgba(78,205,196,0.06),transparent),radial-gradient(ellipse 60% 80% at 80% 20%,rgba(0,212,255,0.04),transparent),radial-gradient(ellipse 50% 50% at 50% 80%,rgba(108,99,255,0.04),transparent);}
        .fi-content{position:relative;z-index:1;}
        .fi-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 3rem;background:rgba(3,7,18,0.8);backdrop-filter:blur(20px) saturate(1.4);border-bottom:1px solid rgba(255,255,255,0.04);}
        .fi-nav-logo{display:flex;align-items:center;gap:0.6rem;font-size:1rem;font-weight:700;text-decoration:none;color:#fff;}
        .fi-nav-logo img{width:32px;height:32px;border-radius:10px;}
        .fi-nav-links{display:flex;gap:2.5rem;}
        .fi-nav-link{color:rgba(255,255,255,0.4);text-decoration:none;font-size:0.82rem;font-weight:500;transition:color 0.3s;}
        .fi-nav-link:hover{color:#fff;}
        .fi-cta-btn{padding:0.55rem 1.5rem;border-radius:50px;background:linear-gradient(135deg,#4ECDC4,#00D4FF);color:#000;font-weight:700;font-size:0.82rem;border:none;cursor:pointer;text-decoration:none;}

        .fi-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 4rem;position:relative;}
        .fi-hero-glow{position:absolute;top:20%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(78,205,196,0.12) 0%,transparent 70%);pointer-events:none;animation:pulse 4s ease-in-out infinite;}
        @keyframes pulse{0%,100%{opacity:0.6;transform:translate(-50%,-50%) scale(1);}50%{opacity:1;transform:translate(-50%,-50%) scale(1.1);}}
        .fi-grid-bg{position:absolute;inset:0;overflow:hidden;pointer-events:none;opacity:0.03;}
        .fi-grid-bg svg{width:100%;height:100%;}
        .fi-hero-badge{display:inline-flex;align-items:center;gap:0.5rem;padding:0.4rem 1.2rem;border-radius:50px;font-size:0.72rem;font-weight:600;background:rgba(78,205,196,0.08);color:#4ECDC4;border:1px solid rgba(78,205,196,0.15);margin-bottom:2rem;backdrop-filter:blur(10px);letter-spacing:0.05em;}
        .fi-hero-badge-dot{width:6px;height:6px;border-radius:50%;background:#4ECDC4;animation:blink 2s infinite;}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
        .fi-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(3.5rem,8vw,6rem);font-weight:700;line-height:1.05;letter-spacing:-0.04em;margin-bottom:1.5rem;max-width:900px;}
        .fi-grad{background:linear-gradient(135deg,#4ECDC4,#00D4FF,#6C63FF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% 200%;animation:gradShift 5s ease infinite;}
        @keyframes gradShift{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
        .fi-hero-sub{font-size:1.15rem;color:rgba(255,255,255,0.4);max-width:550px;line-height:1.8;margin-bottom:3rem;font-weight:400;}
        .fi-hero-btns{display:flex;gap:1rem;align-items:center;}
        .fi-ghost-btn{padding:0.55rem 1.5rem;border-radius:50px;background:transparent;border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.7);font-weight:600;font-size:0.82rem;text-decoration:none;transition:all 0.3s;cursor:pointer;}
        .fi-ghost-btn:hover{border-color:rgba(255,255,255,0.3);color:#fff;}

        .fi-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.04);border-radius:20px;overflow:hidden;margin:0 3rem 4rem;}
        .fi-stat{background:rgba(3,7,18,0.9);padding:3rem 2rem;text-align:center;backdrop-filter:blur(10px);}
        .fi-stat-val{font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;background:linear-gradient(135deg,#4ECDC4,#00D4FF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:0.25rem;}
        .fi-stat-label{font-size:0.72rem;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.12em;font-weight:500;}

        .fi-marquee{overflow:hidden;padding:2rem 0;border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);margin:4rem 0;}
        .fi-marquee-inner{display:flex;gap:4rem;animation:marquee 30s linear infinite;white-space:nowrap;}
        @keyframes marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        .fi-marquee-item{font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:600;color:rgba(255,255,255,0.06);display:flex;align-items:center;gap:1rem;}
        .fi-marquee-dot{width:6px;height:6px;border-radius:50%;background:rgba(78,205,196,0.2);}

        .fi-section{padding:7rem 2rem;max-width:1200px;margin:0 auto;text-align:center;}
        .fi-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#4ECDC4;margin-bottom:1rem;}
        .fi-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.2rem);font-weight:700;letter-spacing:-0.03em;margin-bottom:1.5rem;line-height:1.15;}

        .fi-products{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.04);border-radius:20px;overflow:hidden;margin-top:3rem;}
        .fi-product{background:rgba(3,7,18,0.95);padding:2.5rem;position:relative;overflow:hidden;cursor:default;}
        .fi-product-icon{font-size:2rem;margin-bottom:1.25rem;display:inline-block;}
        .fi-product-title{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:700;margin-bottom:0.75rem;}
        .fi-product-desc{font-size:0.88rem;color:rgba(255,255,255,0.35);line-height:1.7;}

        .fi-cta-section{position:relative;text-align:center;padding:8rem 2rem;margin:0 3rem 4rem;border-radius:24px;overflow:hidden;border:1px solid rgba(78,205,196,0.1);}
        .fi-cta-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(78,205,196,0.06),rgba(0,212,255,0.04),rgba(108,99,255,0.04));}
        .fi-cta-glow{position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:400px;height:400px;background:radial-gradient(circle,rgba(78,205,196,0.1),transparent 70%);}
        .fi-cta-content{position:relative;z-index:1;}
        .fi-cta-section h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.5rem,5vw,3.5rem);font-weight:700;margin-bottom:1.25rem;letter-spacing:-0.03em;}
        .fi-cta-section p{color:rgba(255,255,255,0.4);margin-bottom:2.5rem;max-width:420px;margin-left:auto;margin-right:auto;line-height:1.7;}

        .fi-footer{padding:4rem 3rem 2rem;border-top:1px solid rgba(255,255,255,0.04);}
        .fi-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;max-width:1200px;margin:0 auto 3rem;}
        .fi-footer-brand{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:700;margin-bottom:0.75rem;}
        .fi-footer-desc{font-size:0.82rem;color:rgba(255,255,255,0.25);line-height:1.6;max-width:280px;}
        .fi-footer-col-title{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.25);margin-bottom:1rem;}
        .fi-footer-link{display:block;font-size:0.82rem;color:rgba(255,255,255,0.35);text-decoration:none;padding:0.3rem 0;transition:color 0.2s;}
        .fi-footer-link:hover{color:#4ECDC4;}
        .fi-footer-bottom{text-align:center;font-size:0.72rem;color:rgba(255,255,255,0.15);padding-top:2rem;border-top:1px solid rgba(255,255,255,0.04);max-width:1200px;margin:0 auto;}

        @media(max-width:768px){.fi-nav{padding:1rem 1.5rem;}.fi-nav-links{display:none;}.fi-stats{grid-template-columns:repeat(2,1fr);margin:0 1.5rem 3rem;}.fi-products{grid-template-columns:1fr;}.fi-cta-section{margin:0 1.5rem 3rem;}.fi-footer-grid{grid-template-columns:1fr 1fr;}}
      `}</style>

      <div className="fi">
        <div className="fi-mesh" />
        <div className="fi-content">
          <motion.nav className="fi-nav" initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}>
            <a href={`${bp}/`} className="fi-nav-logo"><img src={`${bp}/logos/aqurion-financial-icon.png`} alt="" />Aqurion Financial</a>
            <div className="fi-nav-links">
              <a href="#products" className="fi-nav-link">Products</a>
              <a href="#about" className="fi-nav-link">About</a>
              <a href="#contact" className="fi-nav-link">Contact</a>
            </div>
            <motion.a href="#contact" className="fi-cta-btn" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400 }}>Open Account →</motion.a>
          </motion.nav>

          <section className="fi-hero" ref={heroRef}>
            <div className="fi-hero-glow" />
            <div className="fi-grid-bg"><svg viewBox="0 0 1200 800">{Array.from({ length: 30 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 28} x2="1200" y2={i * 28} stroke="#fff" strokeWidth="0.5" />)}{Array.from({ length: 45 }).map((_, i) => <line key={`v${i}`} x1={i * 28} y1="0" x2={i * 28} y2="800" stroke="#fff" strokeWidth="0.5" />)}</svg></div>
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <motion.div className="fi-hero-badge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}><span className="fi-hero-badge-dot" /> Next-Gen Financial Platform</motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}>The <span className="fi-grad">smarter</span> way to manage business finances.</motion.h1>
              <motion.p className="fi-hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}>AI-powered payments, payroll, tax prep, and banking — all in one platform built for modern businesses.</motion.p>
              <motion.div className="fi-hero-btns" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
                <motion.a href="#contact" className="fi-cta-btn" style={{ padding: "0.7rem 2rem", fontSize: "0.88rem" }} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>Get Started Free</motion.a>
                <motion.a href="#products" className="fi-ghost-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>Explore Products</motion.a>
              </motion.div>
            </motion.div>
          </section>

          <motion.div className="fi-stats" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}>
            {stats.map((s, i) => (
              <motion.div key={s.label} className="fi-stat" variants={fadeUp} custom={i}>
                <div className="fi-stat-val">{s.val}</div>
                <div className="fi-stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="fi-marquee"><div className="fi-marquee-inner">{[...Array(2)].flatMap((_, j) => ["Payments", "Payroll", "Banking", "Tax Prep", "Analytics", "Insurance", "Lending", "Invoicing"].map((t, i) => <span key={`${j}-${i}`} className="fi-marquee-item"><span className="fi-marquee-dot" />{t}</span>))}</div></div>

          <section id="products" className="fi-section">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} custom={0}><div className="fi-label">Products</div><h2 className="fi-title">Everything your business needs, financially.</h2></motion.div>
            </motion.div>
            <motion.div className="fi-products" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {products.map((p, i) => (
                <motion.div key={p.title} className="fi-product" variants={fadeUp} custom={i} whileHover={{ backgroundColor: "rgba(15,20,35,0.95)", transition: { duration: 0.3 } }}>
                  <motion.div className="fi-product-icon" whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>{p.icon}</motion.div>
                  <div className="fi-product-title">{p.title}</div>
                  <div className="fi-product-desc">{p.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <motion.section id="contact" className="fi-cta-section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="fi-cta-bg" /><div className="fi-cta-glow" />
            <div className="fi-cta-content">
              <h2>Ready to modernize<br />your finances?</h2>
              <p>Join thousands of businesses using Aqurion Financial to save time and money.</p>
              <motion.a href="mailto:finance@aqurion.net" className="fi-cta-btn" style={{ padding: "0.75rem 2.5rem", fontSize: "0.92rem" }} whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400 }}>Open Your Account →</motion.a>
            </div>
          </motion.section>

          <footer className="fi-footer">
            <div className="fi-footer-grid">
              <div><div className="fi-footer-brand">Aqurion Financial</div><div className="fi-footer-desc">AI-powered financial tools for modern businesses. Payments, payroll, banking, and tax — under one roof.</div></div>
              <div><div className="fi-footer-col-title">Products</div><a href="#" className="fi-footer-link">Payments</a><a href="#" className="fi-footer-link">Payroll</a><a href="#" className="fi-footer-link">Banking</a><a href="#" className="fi-footer-link">Tax Prep</a></div>
              <div><div className="fi-footer-col-title">Company</div><a href="https://Aqurion.NET" className="fi-footer-link">Holdings</a><a href="https://AqurionDev.com" className="fi-footer-link">Development</a><a href="https://Aqurion.AI" className="fi-footer-link">AI</a></div>
              <div><div className="fi-footer-col-title">Legal</div><a href="#" className="fi-footer-link">Privacy</a><a href="#" className="fi-footer-link">Terms</a><a href="#" className="fi-footer-link">Security</a></div>
            </div>
            <div className="fi-footer-bottom">© {new Date().getFullYear()} Aqurion Financial — An Aqurion Holdings Company</div>
          </footer>
        </div>
      </div>
    </>
  );
}
