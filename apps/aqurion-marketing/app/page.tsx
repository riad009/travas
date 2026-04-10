"use client";
import React from "react";

const services = [
  { num: "01", title: "Branding", items: ["Logo & Visual Identity Design", "Brand Strategy & Positioning", "Brand Voice & Copywriting", "Packaging & Print Design", "Rebranding & Brand Refresh"] },
  { num: "02", title: "Social Media", items: ["Content Creation & Graphics", "Social Media Management", "Influencer Marketing", "Paid Social Ads", "Social Media Strategy & Audits"] },
  { num: "03", title: "Digital Marketing", items: ["SEO & Content Marketing", "PPC & Google Ads", "Email Marketing & Automation", "Website Design & Development", "Conversion Rate Optimization"] },
];

const projects = [
  { title: "SaaS launch campaign drives 400% MRR growth in 6 months", stats: [{ val: "400%", label: "MRR Growth" }, { val: "12K+", label: "New Users" }, { val: "3.2x", label: "ROAS" }], tags: ["SEO", "PPC", "Social Media"], color: "#EBD96B" },
  { title: "E-commerce rebrand increases conversion rate by 65%", stats: [{ val: "65%", label: "Conv. Rate" }, { val: "$2.4M", label: "Revenue" }, { val: "45%", label: "Lower CPA" }], tags: ["Branding", "UX Design"], color: "#B4D7C4" },
  { title: "B2B lead generation delivers 3x pipeline growth", stats: [{ val: "3x", label: "Pipeline" }, { val: "82%", label: "SQL Rate" }, { val: "28%", label: "Close Rate" }], tags: ["Content", "Email", "LinkedIn"], color: "#C4B4D7" },
];

const testimonials = [
  { quote: "Aqurion Marketing transformed our digital presence completely. The rebrand not only elevated our image but directly contributed to a 3x increase in qualified leads.", name: "Sarah Chen", role: "CMO, TechVault Solutions", stats: [{ val: "3x", label: "Qualified Leads" }, { val: "45%", label: "Brand Awareness" }] },
  { quote: "Working with Aqurion has been a game-changer. Their data-driven approach to social media helped us build an engaged community of over 50K followers in just 4 months.", name: "Marcus Rivera", role: "Founder, Bloom Wellness", stats: [{ val: "50K+", label: "Followers" }, { val: "8.2%", label: "Engagement" }] },
  { quote: "The ROI we've seen from Aqurion's campaigns is unlike anything we've experienced. They truly understand how to turn marketing spend into measurable growth.", name: "Lisa Park", role: "VP Marketing, Greystone Capital", stats: [{ val: "$4.2M", label: "Revenue" }, { val: "320%", label: "ROAS" }] },
];

const pricing = [
  { name: "Starter", price: "$2,999", period: "/month", desc: "For companies getting started with professional marketing.", features: ["Brand strategy consultation", "8 social media posts/month", "Basic content creation", "$1K ad spend management", "Basic SEO optimization", "Monthly performance report"], popular: false },
  { name: "Growth", price: "$5,999", period: "/month", desc: "For companies ready to scale their marketing efforts.", features: ["Brand strategy & positioning", "16 social media posts/month", "Full content creation suite", "$5K ad spend management", "Advanced SEO & blog content", "Bi-weekly strategy calls"], popular: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "Tailor-made solutions for large-scale needs.", features: ["Everything in Growth", "Unlimited content creation", "Custom ad spend management", "Dedicated account manager", "Weekly strategy sessions", "Custom reporting dashboard"], popular: false },
];

const faqs = [
  { q: "What services does Aqurion Marketing offer?", a: "We provide a full range of digital marketing services including SEO, social media marketing, paid advertising (PPC), content marketing, email marketing, branding strategy, and web development." },
  { q: "Do you work with small businesses and startups?", a: "Absolutely! We love working with small businesses and startups. Whether you're just launching or looking to scale, we create tailored marketing strategies that fit your budget." },
  { q: "What makes Aqurion Marketing different?", a: "We craft strategies that drive real results. Data-driven decisions, AI-powered insights, and personalized solutions. Plus, as part of the Aqurion ecosystem, we leverage cross-platform synergies." },
  { q: "How long before I see results?", a: "Most clients see initial improvements within 30-60 days. Significant ROI typically materializes within 3-6 months, depending on the service mix." },
];

export default function MarketingPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const basePath = process.env.NODE_ENV === 'development' ? '/marketing' : '';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

        .mk-page { background: #111; color: #fff; min-height: 100vh; font-family: 'Inter', sans-serif; }

        /* Nav */
        .mk-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 3rem; background: rgba(17,17,17,0.9); backdrop-filter: blur(20px); }
        .mk-nav-logo { display: flex; align-items: center; gap: 0.6rem; font-size: 1rem; font-weight: 700; text-decoration: none; color: #fff; }
        .mk-nav-logo img { width: 32px; height: 32px; border-radius: 8px; }
        .mk-nav-links { display: flex; gap: 2rem; }
        .mk-nav-link { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.82rem; font-weight: 500; transition: color 0.2s; }
        .mk-nav-link:hover { color: #fff; }
        .mk-cta-btn { padding: 0.6rem 1.5rem; border-radius: 50px; background: #EBD96B; color: #111; font-weight: 700; font-size: 0.82rem; border: none; cursor: pointer; transition: all 0.2s; text-decoration: none; }
        .mk-cta-btn:hover { transform: scale(1.05); box-shadow: 0 4px 20px rgba(235,217,107,0.3); }

        /* Hero — large serif + colored block text */
        .mk-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 10rem 2rem 4rem; position: relative; overflow: hidden; }
        .mk-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(235,217,107,0.08), transparent); pointer-events: none; }
        .mk-hero h1 { font-size: clamp(3rem, 8vw, 6rem); font-weight: 400; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 2rem; max-width: 900px; font-family: 'Instrument Serif', serif; }
        .mk-hero h1 em { font-style: italic; color: #EBD96B; }
        .mk-hero-sub { font-size: 1rem; color: rgba(255,255,255,0.45); max-width: 500px; line-height: 1.7; margin-bottom: 2.5rem; }
        .mk-hero-btns { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
        .mk-hero-ghost { padding: 0.6rem 1.5rem; border-radius: 50px; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; font-weight: 600; font-size: 0.82rem; text-decoration: none; transition: all 0.2s; }
        .mk-hero-ghost:hover { border-color: rgba(255,255,255,0.4); }

        /* Trusted / stats */
        .mk-trusted { display: flex; justify-content: center; gap: 4rem; padding: 4rem 2rem; flex-wrap: wrap; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mk-trusted-item { text-align: center; }
        .mk-trusted-val { font-size: 2.2rem; font-weight: 800; color: #EBD96B; letter-spacing: -0.02em; }
        .mk-trusted-label { font-size: 0.68rem; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.2rem; }

        /* Section base */
        .mk-section { padding: 6rem 2rem; max-width: 1100px; margin: 0 auto; }
        .mk-sec-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.3); margin-bottom: 1rem; }
        .mk-sec-title { font-size: clamp(2rem, 4vw, 3.2rem); font-family: 'Instrument Serif', serif; font-weight: 400; letter-spacing: -0.02em; margin-bottom: 1.5rem; line-height: 1.15; }
        .mk-sec-desc { color: rgba(255,255,255,0.4); font-size: 0.95rem; max-width: 500px; line-height: 1.7; }

        /* Services — accordion style with border */
        .mk-services { margin-top: 3rem; }
        .mk-service { border-bottom: 1px solid rgba(255,255,255,0.08); padding: 2.5rem 0; display: grid; grid-template-columns: 60px 1fr; gap: 2rem; }
        .mk-service:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
        .mk-service-num { font-size: 0.72rem; color: #EBD96B; font-weight: 700; padding-top: 0.2rem; }
        .mk-service-title { font-size: 1.5rem; font-family: 'Instrument Serif', serif; font-weight: 400; margin-bottom: 1rem; }
        .mk-service-items { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
        .mk-service-item { font-size: 0.85rem; color: rgba(255,255,255,0.45); }

        /* Projects — large cards */
        .mk-projects { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 3rem; }
        .mk-project { border-radius: 20px; padding: 3rem; position: relative; overflow: hidden; min-height: 280px; display: flex; flex-direction: column; justify-content: flex-end; transition: transform 0.3s; }
        .mk-project:hover { transform: translateY(-4px); }
        .mk-project-title { font-size: 1.4rem; font-family: 'Instrument Serif', serif; font-weight: 400; color: #111; margin-bottom: 1rem; line-height: 1.3; max-width: 500px; }
        .mk-project-stats { display: flex; gap: 2rem; margin-bottom: 1rem; }
        .mk-project-stat-val { font-size: 1.8rem; font-weight: 900; color: #111; }
        .mk-project-stat-label { font-size: 0.65rem; color: rgba(0,0,0,0.5); text-transform: uppercase; letter-spacing: 0.05em; }
        .mk-project-tags { display: flex; gap: 0.4rem; }
        .mk-project-tag { padding: 0.3rem 0.75rem; border-radius: 50px; font-size: 0.68rem; font-weight: 600; background: rgba(0,0,0,0.08); color: rgba(0,0,0,0.6); }

        /* Testimonials */
        .mk-testimonials { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
        .mk-testimonial { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 2rem; }
        .mk-testimonial q { display: block; font-size: 0.92rem; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 1.5rem; font-style: italic; quotes: none; }
        .mk-test-name { font-weight: 700; font-size: 0.85rem; }
        .mk-test-role { font-size: 0.75rem; color: rgba(255,255,255,0.3); }
        .mk-test-stats { display: flex; gap: 1.5rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06); }

        /* Pricing */
        .mk-pricing { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
        .mk-price-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 2.5rem; position: relative; }
        .mk-price-card.popular { border-color: rgba(235,217,107,0.3); background: rgba(235,217,107,0.04); }
        .mk-price-badge { position: absolute; top: 1rem; right: 1rem; padding: 0.2rem 0.65rem; border-radius: 50px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; background: #EBD96B; color: #111; letter-spacing: 0.05em; }
        .mk-price-name { font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.4); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .mk-price-amount { font-size: 2.5rem; font-weight: 900; }
        .mk-price-period { font-size: 0.85rem; color: rgba(255,255,255,0.3); }
        .mk-price-desc { font-size: 0.82rem; color: rgba(255,255,255,0.35); margin: 1rem 0 1.5rem; line-height: 1.6; }
        .mk-price-features { list-style: none; }
        .mk-price-features li { padding: 0.35rem 0; font-size: 0.82rem; color: rgba(255,255,255,0.5); }
        .mk-price-features li::before { content: '✓ '; color: #EBD96B; font-weight: 700; }
        .mk-price-btn { display: block; width: 100%; padding: 0.8rem; border-radius: 50px; font-weight: 700; font-size: 0.85rem; text-align: center; margin-top: 2rem; cursor: pointer; transition: all 0.2s; text-decoration: none; }
        .mk-price-btn-fill { background: #EBD96B; color: #111; border: none; }
        .mk-price-btn-ghost { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.15); }

        /* FAQ */
        .mk-faq { margin-top: 3rem; max-width: 700px; }
        .mk-faq-item { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mk-faq-q { padding: 1.25rem 0; font-weight: 600; font-size: 0.92rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: color 0.2s; }
        .mk-faq-q:hover { color: #EBD96B; }
        .mk-faq-toggle { font-size: 1.2rem; color: #EBD96B; font-weight: 300; }
        .mk-faq-a { padding: 0 0 1.25rem; font-size: 0.85rem; color: rgba(255,255,255,0.4); line-height: 1.7; }

        /* CTA */
        .mk-cta-section { text-align: center; padding: 8rem 2rem; position: relative; }
        .mk-cta-section h2 { font-size: clamp(2.5rem, 5vw, 4rem); font-family: 'Instrument Serif', serif; font-weight: 400; margin-bottom: 1.5rem; }
        .mk-cta-section h2 em { font-style: italic; color: #EBD96B; }
        .mk-cta-section p { color: rgba(255,255,255,0.4); font-size: 0.95rem; margin-bottom: 2.5rem; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 1.7; }

        /* Footer */
        .mk-footer { padding: 3rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); }
        .mk-footer-links { display: flex; justify-content: center; gap: 2rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .mk-footer-link { color: rgba(255,255,255,0.3); text-decoration: none; font-size: 0.75rem; transition: color 0.2s; }
        .mk-footer-link:hover { color: #EBD96B; }
        .mk-footer p { font-size: 0.75rem; color: rgba(255,255,255,0.2); }

        @media (max-width: 768px) {
          .mk-nav { padding: 1rem 1.5rem; }
          .mk-nav-links { display: none; }
          .mk-service { grid-template-columns: 1fr; }
          .mk-service-items { grid-template-columns: 1fr; }
          .mk-project-stats { flex-wrap: wrap; gap: 1rem; }
        }
      `}</style>

      <div className="mk-page">
        {/* Nav */}
        <nav className="mk-nav">
          <a href="/" className="mk-nav-logo"><img src={`${basePath}/logos/aqurion-marketing-icon.png`} alt="" style={{ width: 32, height: 32, borderRadius: 8 }} />Aqurion Marketing</a>
          <div className="mk-nav-links">
            <a href="#projects" className="mk-nav-link">Projects</a>
            <a href="#services" className="mk-nav-link">Services</a>
            <a href="#pricing" className="mk-nav-link">Pricing</a>
            <a href="#faq" className="mk-nav-link">FAQ</a>
          </div>
          <a href="#contact" className="mk-cta-btn">Start a Project</a>
        </nav>

        {/* Hero */}
        <section className="mk-hero">
          <div className="mk-hero-bg" />
          <h1>We build <em>bold brands</em>, powerful campaigns, and digital experiences that drive <em>real results</em>.</h1>
          <p className="mk-hero-sub">Data-driven marketing strategies designed to grow your business, increase engagement, and deliver measurable ROI.</p>
          <div className="mk-hero-btns">
            <a href="#contact" className="mk-cta-btn" style={{ padding: "0.75rem 2rem", fontSize: "0.88rem" }}>Start a Project</a>
            <a href="#projects" className="mk-hero-ghost">View Our Work →</a>
          </div>
        </section>

        {/* Trusted */}
        <div className="mk-trusted">
          <div className="mk-trusted-item"><div className="mk-trusted-val">200+</div><div className="mk-trusted-label">Brands Transformed</div></div>
          <div className="mk-trusted-item"><div className="mk-trusted-val">50M+</div><div className="mk-trusted-label">Impressions Generated</div></div>
          <div className="mk-trusted-item"><div className="mk-trusted-val">340%</div><div className="mk-trusted-label">Average Campaign ROI</div></div>
          <div className="mk-trusted-item"><div className="mk-trusted-val">$12M+</div><div className="mk-trusted-label">Client Revenue Growth</div></div>
        </div>

        {/* Projects */}
        <section id="projects" className="mk-section">
          <div className="mk-sec-label">Impact</div>
          <h2 className="mk-sec-title">Results that speak for themselves.</h2>
          <div className="mk-projects">
            {projects.map((p, i) => (
              <div key={i} className="mk-project" style={{ background: p.color }}>
                <div className="mk-project-stats">
                  {p.stats.map(s => (<div key={s.label}><div className="mk-project-stat-val">{s.val}</div><div className="mk-project-stat-label">{s.label}</div></div>))}
                </div>
                <div className="mk-project-title">{p.title}</div>
                <div className="mk-project-tags">{p.tags.map(t => <span key={t} className="mk-project-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mk-section">
          <div className="mk-sec-label">Services</div>
          <h2 className="mk-sec-title">What we do best.</h2>
          <div className="mk-services">
            {services.map(s => (
              <div key={s.num} className="mk-service">
                <div className="mk-service-num">{s.num}.</div>
                <div>
                  <div className="mk-service-title">{s.title}</div>
                  <div className="mk-service-items">{s.items.map(item => <div key={item} className="mk-service-item">{item}</div>)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mk-section">
          <div className="mk-sec-label">Testimonials</div>
          <h2 className="mk-sec-title">Hear what they say about us.</h2>
          <div className="mk-testimonials">
            {testimonials.map(t => (
              <div key={t.name} className="mk-testimonial">
                <q>{t.quote}</q>
                <div className="mk-test-name">{t.name}</div>
                <div className="mk-test-role">{t.role}</div>
                <div className="mk-test-stats">
                  {t.stats.map(s => (<div key={s.label}><div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#EBD96B" }}>{s.val}</div><div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div></div>))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mk-section" style={{ textAlign: "center" }}>
          <div className="mk-sec-label" style={{ textAlign: "center" }}>Pricing</div>
          <h2 className="mk-sec-title">From launch to scale, we&apos;ve got you covered.</h2>
          <div className="mk-pricing">
            {pricing.map(p => (
              <div key={p.name} className={`mk-price-card ${p.popular ? "popular" : ""}`}>
                {p.popular && <div className="mk-price-badge">Popular</div>}
                <div className="mk-price-name">{p.name}</div>
                <div><span className="mk-price-amount">{p.price}</span><span className="mk-price-period">{p.period}</span></div>
                <div className="mk-price-desc">{p.desc}</div>
                <ul className="mk-price-features">{p.features.map(f => <li key={f}>{f}</li>)}</ul>
                <a href="#contact" className={`mk-price-btn ${p.popular ? "mk-price-btn-fill" : "mk-price-btn-ghost"}`}>Choose This Plan</a>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mk-section">
          <div className="mk-sec-label">FAQ</div>
          <h2 className="mk-sec-title">Answered.</h2>
          <div className="mk-faq">
            {faqs.map((f, i) => (
              <div key={i} className="mk-faq-item">
                <div className="mk-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q} <span className="mk-faq-toggle">{openFaq === i ? "−" : "+"}</span>
                </div>
                {openFaq === i && <div className="mk-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="mk-cta-section">
          <h2>Your <em>Brand</em>.</h2>
          <p>Feel free to reach out if you want to collaborate with us, or simply have a chat.</p>
          <a href="mailto:marketing@aqurion.net" className="mk-cta-btn" style={{ padding: "0.85rem 2.5rem", fontSize: "0.9rem" }}>Start a Project</a>
        </section>

        {/* Footer */}
        <footer className="mk-footer">
          <div className="mk-footer-links">
            <a href="https://Aqurion.NET" className="mk-footer-link">Aqurion Holdings</a>
            <a href="https://AqurionDev.com" className="mk-footer-link">Development</a>
            <a href="https://Aqurion.AI" className="mk-footer-link">AI</a>
            <a href="https://AqurionSales.com" className="mk-footer-link">Sales</a>
            <a href="mailto:marketing@aqurion.net" className="mk-footer-link">Contact</a>
          </div>
          <p>© {new Date().getFullYear()} Aqurion Marketing — An Aqurion Holdings Company</p>
        </footer>
      </div>
    </>
  );
}
