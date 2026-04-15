"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Rv({ children, d = 0 }: { children: React.ReactNode; d?: number }) {
  return <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: d, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

/* ── COLORS ── */
const C = {
  midnight: "#001F3F",
  gold: "#D4AF37",
  goldLight: "rgba(212,175,55,0.08)",
  goldBorder: "rgba(212,175,55,0.15)",
  slate: "#F8F9FA",
  teal: "#0B6E8A",
  green: "#0A6040",
  alert: "#8B1A1A",
};

/* ── DATA ── */
const trustBar = [
  { icon: "🏦", text: "500+ Credit Unions" },
  { icon: "✈", text: "Powered by Duffel NDC" },
  { icon: "🔒", text: "PCI-DSS Level 1 Secured" },
  { icon: "💰", text: "FDIC-Insured Escrow" },
];

const valueProps = [
  { icon: "📊", title: "Real Price Comparison", desc: "We show you what the same booking costs on Expedia, Priceline, and Google — side by side. No guessing. Just savings." },
  { icon: "🤖", title: "AI Price Prediction", desc: "Our Aqurion Eye engine monitors price fluctuations and tells you the probability of a price drop — before you book. Powered by real GDS data." },
  { icon: "🔐", title: "Members-Only Rates", desc: "Wholesale net rates. Zero hidden fees. Protected by FDIC-insured escrow from booking to travel date. This is what travel should have always looked like." },
];

const howItWorks = [
  { num: "01", title: "Verify Your Membership", desc: "Your credit union, employer, or Aqurion account grants access. No public sign-up. Membership means something here." },
  { num: "02", title: "Search at Wholesale Rates", desc: "See the same flights, hotels, and cars — but priced at the net rate we negotiate directly with suppliers. No Expedia markup. No middleman margin." },
  { num: "03", title: "Watch the Comparison", desc: "Our price scanner shows you what the same booking costs on major public sites in real time. The savings are visible before you book." },
  { num: "04", title: "Book with Confidence", desc: "Your payment is held in FDIC-insured escrow until your travel date. Cancel with peace of mind. Travel with a better rate." },
];

const searchTabs = [
  { icon: "✈", label: "Flights" },
  { icon: "🏨", label: "Hotels" },
  { icon: "🚗", label: "Cars" },
  { icon: "📦", label: "Packages" },
];

const destinations = [
  { city: "Paris", price: "$389", save: "31%", img: "🗼" },
  { city: "Tokyo", price: "$612", save: "27%", img: "🏯" },
  { city: "Cancún", price: "$248", save: "34%", img: "🏖️" },
  { city: "London", price: "$421", save: "29%", img: "🏰" },
  { city: "Dubai", price: "$549", save: "25%", img: "🌆" },
  { city: "Bali", price: "$478", save: "33%", img: "🌴" },
];

const memberTypes = [
  { icon: "🏦", title: "Credit Union Members", desc: "If your credit union is an Aqurion Travel partner, your membership number is your key. No additional sign-up required. Your credit union's branded travel portal is waiting for you." },
  { icon: "💼", title: "Corporate Travel Partners", desc: "Companies that contract with Aqurion Travel for employee business travel automatically provide membership access to their enrolled employees." },
  { icon: "🎓", title: "University & Association Members", desc: "Aqurion Travel actively partners with universities, professional trade organizations, labor unions, and alumni associations to extend membership to their communities." },
  { icon: "🖥️", title: "Aqurion Platform Clients", desc: "If you use any Aqurion Holdings platform — Aqurion Sales, Marketing, Financial, Stores, or any Aqurion application — you are eligible for Aqurion Travel membership." },
  { icon: "🛡️", title: "Insurance & Financial Partners", desc: "Strategic partnerships with insurance carriers and financial institutions extend Aqurion Travel membership as a policyholder or account-holder benefit." },
  { icon: "🤝", title: "Referral Membership", desc: "Existing Aqurion Travel members may refer eligible individuals within their organization or network. Referral memberships are subject to verification and approval." },
];

const escrowSteps = [
  { num: "1", title: "You Book", desc: "Your payment is captured by our Oracle Merchant Services payment gateway. Your card data never touches our servers — it goes directly to a PCI-DSS Level 1 compliant payment environment." },
  { num: "2", title: "Funds Held in Escrow", desc: "The net value of your booking is placed into an FDIC-insured money market escrow account. It stays there until 24 hours before your travel date. It is not commingled with our operating funds." },
  { num: "3", title: "We Pay the Supplier", desc: "24 hours before your travel date, our system generates a single-use virtual payment card for the exact supplier net rate. We pay the hotel, airline, or car rental supplier directly." },
  { num: "4", title: "Cancellation Protected", desc: "If you cancel within your cancellation window, your escrow funds are returned to your original payment method in full. Our cancellation policy is displayed clearly — no buried terms." },
];

const rewardsFeatures = [
  { icon: "💰", title: "1 Point per $1 Spent", desc: "Base rate on every Aqurion Travel booking." },
  { icon: "⭐", title: "3× Oracle Partner Properties", desc: "Triple points on bookings at Oracle-partnered properties and flights." },
  { icon: "✍️", title: "1.5× Review Bonus", desc: "Earn 1.5× trip points when you submit a verified review of 50+ words + 1 photo within 14 days." },
  { icon: "🎰", title: "Quarterly Prize Drawing", desc: "Members who reach the point threshold enter our quarterly prize draw for extraordinary travel experiences." },
  { icon: "♾️", title: "Points Never Expire", desc: "Your points remain active as long as your membership is active. No annual expiration. No clawback." },
  { icon: "💳", title: "Redeem Anytime", desc: "1,000 points = $10 travel credit. Apply at checkout to any Aqurion Travel booking." },
];

const aiFeatures = [
  { prob: "76%", level: "High", desc: "chance this price drops in the next 48 hours. Consider waiting — or set a price alert.", color: C.teal },
  { prob: "52%", level: "Moderate", desc: "chance of a price change in 72 hours. Prices on this route tend to be volatile.", color: "#B8860B" },
  { prob: "22%", level: "Low", desc: "chance of a price drop. This rate is performing well. Booking now is advised.", color: C.gold },
];

const securityBadges = [
  "PCI-DSS Level 1 Compliance",
  "FDIC-Insured Escrow",
  "OAuth 2.0 / OpenID Connect SSO",
  "AES-256 Encryption at Rest & Transit",
  "Multi-Factor Authentication",
  "SOC 2 Type II Compliant",
  "AWS US-East-1 Data Residency",
];

const faqs = [
  { q: "How do I know I'm getting the best rate?", a: "Every search result on Aqurion Travel shows your member rate alongside the current price for the same booking on Expedia, Priceline, and Google Travel — in real time. The comparison is live and transparent. If a public site is cheaper (it's rare, but we'll show it honestly), you'll see it." },
  { q: "What is the Aqurion member fee?", a: "There is no separate membership fee beyond your existing Aqurion platform relationship, credit union membership, or employer affiliation. Our revenue comes from a transparent booking margin (1–6% depending on the product) and a 3% processing fee through Oracle Merchant Services — both displayed clearly at checkout." },
  { q: "Is my payment safe?", a: "Yes. Your card data is processed through Oracle Merchant Services' PCI-DSS Level 1 compliant payment gateway — it never touches our servers. Your booking funds are held in an FDIC-insured escrow account until 24 hours before your travel date." },
  { q: "What happens if I need to cancel?", a: "All cancellation policies are displayed clearly on the property or flight detail page and at checkout — before you confirm. Within the free cancellation window, your refund is processed back to your original payment method. After the deadline, supplier terms apply." },
  { q: "How does Aqurion Eye work?", a: "Aqurion Eye monitors price data across global distribution systems in real time and uses historical pattern analysis to calculate the statistical probability that a price will drop within the next 24, 48, or 72 hours. It gives you that probability — as a percentage — so you can decide whether to book now or wait." },
  { q: "How do I earn and redeem Aqurion Travel Rewards points?", a: "You earn 1 point per $1 spent on Aqurion Travel bookings. Oracle Partner properties earn 3× points. Verified reviews earn 1.5× bonus. Points can be redeemed for travel credit at 1,000 points = $10. Points never expire as long as your membership is active." },
  { q: "My organization isn't listed as a partner. Can I still get access?", a: "You can submit a partnership inquiry on our behalf — or refer your organization's leadership to our partnership page. We're actively expanding. If they qualify, membership access follows." },
  { q: "Can I book for other travelers?", a: "Yes. You can book flights, hotels, and cars for other travelers using your membership. The booking will appear in your Vault, and travel documents can be sent to any email address. Corporate accounts can manage bookings for multiple employees." },
];

const footerLinks = {
  "Explore": ["Flights", "Hotels", "Rental Cars", "Vacation Packages", "Aqurion Travel Rewards", "Corporate Travel"],
  "Membership": ["How Membership Works", "Join Through Your Credit Union", "Corporate Partner Program", "University & Association Partners", "Request a Partnership"],
  "Company": ["About Aqurion Travel", "Aqurion Holdings", "Oracle Merchant Services", "Privacy Policy", "Terms of Use"],
};

/* ── PAGE ── */
export default function TravelPage() {
  const bp = process.env.NODE_ENV === "development" ? "/travel" : "";
  const [activeSearchTab, setActiveSearchTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        .tv{background:#F8F9FA;color:#001F3F;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}

        /* NAV */
        .tv-nav{position:fixed;top:0;left:0;right:0;z-index:100;background:#001F3F;display:flex;align-items:center;justify-content:space-between;padding:0 3rem;height:64px;border-bottom:1px solid rgba(212,175,55,0.08);}
        .tv-announce{position:fixed;top:0;left:0;right:0;z-index:101;background:#D4AF37;padding:0.4rem 2rem;text-align:center;font-size:0.72rem;font-weight:600;color:#001F3F;}
        .tv-nav.with-announce{top:28px;}
        .tv-nav-logo{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:#fff;text-decoration:none;display:flex;align-items:center;gap:0.5rem;}
        .tv-nav-logo .tv-a{color:#D4AF37;}
        .tv-nav-links{display:flex;gap:1.5rem;}
        .tv-nav-link{font-size:0.82rem;font-weight:500;color:rgba(255,255,255,0.5);text-decoration:none;transition:color 0.2s;position:relative;padding:0.3rem 0;}
        .tv-nav-link:hover{color:#D4AF37;}
        .tv-nav-link.active::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:#D4AF37;}
        .tv-nav-right{display:flex;gap:0.75rem;align-items:center;}
        .tv-btn-ghost{padding:0.45rem 1.2rem;border-radius:6px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.3s;text-decoration:none;display:inline-block;font-family:'Inter',sans-serif;}
        .tv-btn-ghost:hover{border-color:#D4AF37;color:#D4AF37;}
        .tv-btn-gold{padding:0.5rem 1.5rem;border-radius:6px;background:#D4AF37;color:#001F3F;font-size:0.78rem;font-weight:700;border:none;cursor:pointer;transition:all 0.3s;text-decoration:none;display:inline-block;font-family:'Inter',sans-serif;}
        .tv-btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(212,175,55,0.3);}
        .tv-btn-gold-lg{padding:0.75rem 2.5rem;border-radius:8px;background:#D4AF37;color:#001F3F;font-size:0.88rem;font-weight:700;border:none;cursor:pointer;transition:all 0.3s;text-decoration:none;display:inline-block;font-family:'Inter',sans-serif;}
        .tv-btn-gold-lg:hover{transform:translateY(-2px);box-shadow:0 10px 35px rgba(212,175,55,0.3);}
        .tv-btn-ghost-lg{padding:0.75rem 2rem;border-radius:8px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:#fff;font-size:0.88rem;font-weight:600;cursor:pointer;transition:all 0.3s;text-decoration:none;display:inline-block;font-family:'Inter',sans-serif;}
        .tv-btn-ghost-lg:hover{border-color:#D4AF37;color:#D4AF37;}

        /* HERO */
        .tv-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 5rem;background:#001F3F;position:relative;overflow:hidden;}
        .tv-hero-grid{position:absolute;inset:0;background-image:radial-gradient(rgba(212,175,55,0.03) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;}
        .tv-hero-orb{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,0.06),transparent 70%);top:25%;left:50%;transform:translate(-50%,-50%);animation:tvOrb 10s ease-in-out infinite;}
        @keyframes tvOrb{0%,100%{transform:translate(-50%,-50%) scale(1);}50%{transform:translate(-50%,-50%) scale(1.12);}}
        .tv-hero-content{position:relative;z-index:1;max-width:800px;}
        .tv-eyebrow{display:inline-flex;align-items:center;gap:0.5rem;padding:0.35rem 1rem;border-radius:4px;font-size:0.68rem;font-weight:700;background:rgba(212,175,55,0.08);color:#D4AF37;border:1px solid rgba(212,175,55,0.12);margin-bottom:2rem;letter-spacing:0.15em;text-transform:uppercase;}
        .tv-hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,6vw,4.8rem);font-weight:700;line-height:1.1;letter-spacing:-0.02em;margin-bottom:1.5rem;color:#fff;}
        .tv-gold{color:#D4AF37;}
        .tv-hero-sub{font-size:1.05rem;color:rgba(255,255,255,0.45);max-width:640px;line-height:1.8;margin:0 auto 2.5rem;}
        .tv-hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:3rem;}
        .tv-trust-bar{display:flex;gap:2rem;justify-content:center;flex-wrap:wrap;}
        .tv-trust-item{font-size:0.72rem;color:rgba(255,255,255,0.35);display:flex;align-items:center;gap:0.4rem;}

        /* SECTION BASE */
        .tv-section{padding:6rem 2rem;max-width:1100px;margin:0 auto;}
        .tv-section-dark{padding:6rem 2rem;background:#001F3F;color:#fff;}
        .tv-section-dark .tv-section-inner{max-width:1100px;margin:0 auto;}
        .tv-label{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#D4AF37;margin-bottom:0.75rem;}
        .tv-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,2.8rem);font-weight:700;letter-spacing:-0.02em;margin-bottom:1rem;line-height:1.15;}
        .tv-subtitle{font-size:0.92rem;color:rgba(0,31,63,0.45);max-width:700px;line-height:1.8;margin-bottom:3rem;}
        .tv-section-dark .tv-subtitle{color:rgba(255,255,255,0.4);}

        /* VALUE PROPS */
        .tv-vp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        .tv-vp{padding:2.5rem;border-radius:16px;background:#fff;border:1px solid rgba(0,0,0,0.04);transition:all 0.4s;position:relative;overflow:hidden;}
        .tv-vp::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:#D4AF37;transform:scaleX(0);transition:transform 0.4s;transform-origin:left;}
        .tv-vp:hover::after{transform:scaleX(1);}
        .tv-vp:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,0.06);}
        .tv-vp-icon{font-size:1.5rem;margin-bottom:1rem;display:inline-flex;width:56px;height:56px;border-radius:14px;align-items:center;justify-content:center;background:rgba(212,175,55,0.06);}
        .tv-vp-title{font-family:'Playfair Display',serif;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;}
        .tv-vp-desc{font-size:0.85rem;color:rgba(0,31,63,0.4);line-height:1.7;}

        /* HOW IT WORKS */
        .tv-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;counter-reset:step;}
        .tv-step{position:relative;padding:0 0 0 0;}
        .tv-step-num{font-family:'JetBrains Mono',monospace;font-size:2.5rem;font-weight:700;color:rgba(212,175,55,0.12);margin-bottom:0.5rem;}
        .tv-step-title{font-family:'Playfair Display',serif;font-weight:700;font-size:1rem;margin-bottom:0.5rem;}
        .tv-step-desc{font-size:0.82rem;color:rgba(0,31,63,0.4);line-height:1.7;}
        .tv-step-line{position:absolute;top:1.25rem;left:calc(100% + 0.5rem);width:calc(1.5rem - 1rem);height:2px;background:rgba(212,175,55,0.15);}

        /* SEARCH PREVIEW */
        .tv-search-widget{max-width:800px;margin:0 auto;border-radius:20px;background:#fff;border:1px solid rgba(0,0,0,0.06);overflow:hidden;box-shadow:0 20px 60px rgba(0,31,63,0.08);}
        .tv-search-tabs{display:flex;background:#001F3F;padding:0;}
        .tv-search-tab{flex:1;padding:1rem;text-align:center;font-size:0.82rem;font-weight:600;color:rgba(255,255,255,0.4);cursor:pointer;transition:all 0.3s;border-bottom:3px solid transparent;font-family:'Inter',sans-serif;background:none;border-left:none;border-right:none;border-top:none;}
        .tv-search-tab.active{color:#D4AF37;border-bottom-color:#D4AF37;background:rgba(212,175,55,0.04);}
        .tv-search-tab:hover:not(.active){color:rgba(255,255,255,0.7);}
        .tv-search-body{padding:2rem;}
        .tv-search-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;}
        .tv-search-field{display:flex;flex-direction:column;gap:0.3rem;}
        .tv-search-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(0,31,63,0.35);}
        .tv-search-input{padding:0.75rem 1rem;border-radius:10px;border:1px solid rgba(0,0,0,0.08);font-size:0.88rem;color:#001F3F;background:#F8F9FA;font-family:'Inter',sans-serif;outline:none;transition:border-color 0.2s;}
        .tv-search-input:focus{border-color:#D4AF37;}
        .tv-search-input::placeholder{color:rgba(0,31,63,0.25);}
        .tv-search-full{grid-column:1/-1;}
        .tv-search-cta{grid-column:1/-1;margin-top:0.5rem;}
        .tv-search-nudge{margin-top:1rem;padding:0.75rem 1rem;border-radius:10px;background:rgba(212,175,55,0.04);border:1px solid rgba(212,175,55,0.08);font-size:0.78rem;color:rgba(0,31,63,0.5);display:flex;align-items:center;gap:0.5rem;}

        /* DESTINATIONS */
        .tv-dest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        .tv-dest{border-radius:18px;overflow:hidden;background:#fff;border:1px solid rgba(0,0,0,0.04);transition:all 0.3s;cursor:pointer;position:relative;}
        .tv-dest:hover{transform:translateY(-4px);box-shadow:0 15px 40px rgba(0,0,0,0.08);}
        .tv-dest-img{height:180px;background:#001F3F;display:flex;align-items:center;justify-content:center;font-size:4rem;position:relative;}
        .tv-dest-badge{position:absolute;top:0.75rem;right:0.75rem;padding:0.25rem 0.6rem;border-radius:4px;background:#D4AF37;color:#001F3F;font-size:0.62rem;font-weight:700;}
        .tv-dest-body{padding:1.25rem;}
        .tv-dest-city{font-family:'Playfair Display',serif;font-weight:700;font-size:1.1rem;margin-bottom:0.25rem;}
        .tv-dest-price{font-family:'JetBrains Mono',monospace;font-size:0.88rem;color:#0A6040;font-weight:600;}
        .tv-dest-from{font-size:0.72rem;color:rgba(0,31,63,0.3);margin-left:0.3rem;}

        /* COMPARISON PREVIEW */
        .tv-compare{max-width:700px;margin:0 auto;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.06);background:#fff;box-shadow:0 15px 50px rgba(0,31,63,0.06);}
        .tv-compare-header{padding:1.5rem;background:#001F3F;color:#fff;display:flex;align-items:center;justify-content:space-between;}
        .tv-compare-route{font-family:'Playfair Display',serif;font-weight:700;font-size:1rem;}
        .tv-compare-date{font-size:0.72rem;color:rgba(255,255,255,0.4);}
        .tv-compare-body{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(0,0,0,0.04);}
        .tv-compare-col{padding:1.5rem;background:#fff;text-align:center;}
        .tv-compare-col.aqurion{background:rgba(212,175,55,0.02);}
        .tv-compare-provider{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(0,31,63,0.35);margin-bottom:0.5rem;}
        .tv-compare-col.aqurion .tv-compare-provider{color:#D4AF37;}
        .tv-compare-price{font-family:'JetBrains Mono',monospace;font-size:1.5rem;font-weight:700;}
        .tv-compare-col.aqurion .tv-compare-price{color:#001F3F;}
        .tv-compare-diff{font-size:0.72rem;margin-top:0.3rem;color:#8B1A1A;font-weight:600;}
        .tv-compare-save{font-size:0.72rem;margin-top:0.3rem;color:#0A6040;font-weight:700;}
        .tv-compare-footer{padding:1rem 1.5rem;background:rgba(10,96,64,0.04);border-top:1px solid rgba(0,0,0,0.04);text-align:center;font-size:0.78rem;color:#0A6040;font-weight:600;}

        /* MEMBERSHIP */
        .tv-member-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        .tv-member-card{padding:2rem;border-radius:16px;background:#fff;border:1px solid rgba(0,0,0,0.04);transition:all 0.3s;}
        .tv-member-card:hover{transform:translateY(-4px);box-shadow:0 15px 40px rgba(0,0,0,0.05);}
        .tv-member-icon{font-size:1.5rem;margin-bottom:0.75rem;}
        .tv-member-title{font-family:'Playfair Display',serif;font-weight:700;font-size:1rem;margin-bottom:0.4rem;}
        .tv-member-desc{font-size:0.82rem;color:rgba(0,31,63,0.4);line-height:1.7;}

        /* AI EYE */
        .tv-ai-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        .tv-ai-card{padding:1.5rem;border-radius:16px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.03);transition:all 0.3s;}
        .tv-ai-card:hover{transform:translateY(-4px);border-color:rgba(212,175,55,0.15);}
        .tv-ai-prob{font-family:'JetBrains Mono',monospace;font-size:2.5rem;font-weight:700;margin-bottom:0.25rem;}
        .tv-ai-level{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.75rem;}
        .tv-ai-desc{font-size:0.82rem;color:rgba(255,255,255,0.4);line-height:1.7;}

        /* ESCROW */
        .tv-escrow-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;}
        .tv-escrow{padding:1.5rem;border-radius:16px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.03);}
        .tv-escrow-num{font-family:'JetBrains Mono',monospace;font-size:2rem;font-weight:700;color:rgba(212,175,55,0.2);margin-bottom:0.3rem;}
        .tv-escrow-title{font-family:'Playfair Display',serif;font-weight:700;font-size:0.95rem;margin-bottom:0.4rem;color:#fff;}
        .tv-escrow-desc{font-size:0.78rem;color:rgba(255,255,255,0.35);line-height:1.7;}
        .tv-security-badges{display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:2.5rem;}
        .tv-security-badge{padding:0.35rem 0.75rem;border-radius:6px;font-size:0.68rem;font-weight:600;background:rgba(212,175,55,0.06);color:#D4AF37;border:1px solid rgba(212,175,55,0.1);}

        /* REWARDS */
        .tv-rewards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        .tv-reward{padding:2rem;border-radius:16px;background:#fff;border:1px solid rgba(0,0,0,0.04);transition:all 0.3s;}
        .tv-reward:hover{transform:translateY(-4px);box-shadow:0 15px 40px rgba(0,0,0,0.05);}
        .tv-reward-icon{font-size:1.5rem;margin-bottom:0.75rem;}
        .tv-reward-title{font-family:'Playfair Display',serif;font-weight:700;font-size:1rem;margin-bottom:0.4rem;}
        .tv-reward-desc{font-size:0.82rem;color:rgba(0,31,63,0.4);line-height:1.7;}

        /* FAQ */
        .tv-faq{max-width:700px;}
        .tv-faq-item{border-bottom:1px solid rgba(0,0,0,0.06);}
        .tv-faq-q{padding:1.25rem 0;font-weight:600;font-size:0.92rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;color:rgba(0,31,63,0.7);transition:color 0.2s;}
        .tv-faq-q:hover{color:#D4AF37;}
        .tv-faq-a{padding:0 0 1.25rem;font-size:0.85rem;color:rgba(0,31,63,0.4);line-height:1.8;}

        /* CTA SECTION */
        .tv-cta-sec{text-align:center;padding:6rem 2rem;background:#001F3F;position:relative;overflow:hidden;}
        .tv-cta-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 50% at 50% 50%,rgba(212,175,55,0.04),transparent);}
        .tv-cta-sec h2{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;margin-bottom:1rem;color:#fff;position:relative;}
        .tv-cta-sec p{color:rgba(255,255,255,0.4);margin-bottom:2rem;max-width:550px;margin-left:auto;margin-right:auto;line-height:1.7;font-size:0.92rem;position:relative;}
        .tv-contact-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;max-width:700px;margin:2rem auto 0;position:relative;}
        .tv-contact-card{padding:1.25rem;border-radius:12px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.03);}
        .tv-contact-card-title{font-size:0.72rem;font-weight:700;color:#D4AF37;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.4rem;}
        .tv-contact-card-val{font-size:0.82rem;color:rgba(255,255,255,0.5);}
        .tv-contact-card a{color:rgba(255,255,255,0.5);text-decoration:none;transition:color 0.2s;}
        .tv-contact-card a:hover{color:#D4AF37;}

        /* FOOTER */
        .tv-footer{padding:3rem 2rem;background:#001F3F;border-top:1px solid rgba(255,255,255,0.04);}
        .tv-footer-inner{max-width:1100px;margin:0 auto;}
        .tv-footer-grid{display:grid;grid-template-columns:2fr repeat(3,1fr);gap:3rem;margin-bottom:2rem;}
        .tv-footer-brand{font-family:'Playfair Display',serif;font-weight:700;font-size:1.1rem;color:#fff;margin-bottom:0.5rem;}
        .tv-footer-desc{font-size:0.75rem;color:rgba(255,255,255,0.2);line-height:1.6;max-width:280px;}
        .tv-footer-col-title{font-size:0.62rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#D4AF37;margin-bottom:0.75rem;}
        .tv-footer-link{display:block;font-size:0.75rem;color:rgba(255,255,255,0.3);text-decoration:none;padding:0.2rem 0;transition:color 0.2s;}
        .tv-footer-link:hover{color:#D4AF37;}
        .tv-footer-bottom{text-align:center;font-size:0.62rem;color:rgba(255,255,255,0.12);padding-top:2rem;border-top:1px solid rgba(255,255,255,0.04);line-height:1.8;}
        .tv-footer-ecosystem{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:0.75rem;}
        .tv-footer-ecosystem a{font-size:0.62rem;color:rgba(255,255,255,0.15);text-decoration:none;transition:color 0.2s;}
        .tv-footer-ecosystem a:hover{color:#D4AF37;}

        /* PARTNER SECTION */
        .tv-partner-form{display:grid;grid-template-columns:1fr 1fr;gap:1rem;max-width:600px;}
        .tv-partner-full{grid-column:1/-1;}

        @media(max-width:768px){
          .tv-nav{padding:0 1.5rem;}.tv-nav-links,.tv-nav-right .tv-btn-ghost{display:none;}
          .tv-vp-grid,.tv-member-grid,.tv-ai-cards,.tv-rewards-grid,.tv-dest-grid{grid-template-columns:1fr;}
          .tv-steps,.tv-escrow-grid{grid-template-columns:repeat(2,1fr);}
          .tv-search-row{grid-template-columns:1fr;}
          .tv-compare-body{grid-template-columns:1fr;}
          .tv-contact-grid{grid-template-columns:1fr;}
          .tv-footer-grid{grid-template-columns:1fr;}
          .tv-trust-bar{flex-direction:column;align-items:center;gap:0.5rem;}
          .tv-partner-form{grid-template-columns:1fr;}
        }
      `}</style>

      <div className="tv">
        {/* ═══ ANNOUNCEMENT BAR ═══ */}
        <div className="tv-announce">✨ Members save an average of 23% vs. public booking sites. Your membership is paying off.</div>

        {/* ═══ NAV ═══ */}
        <nav className="tv-nav with-announce">
          <a href={`${bp}/`} className="tv-nav-logo"><span className="tv-a">A</span>qurion Travel</a>
          <div className="tv-nav-links">
            <a href="#search" className="tv-nav-link">Flights</a>
            <a href="#search" className="tv-nav-link">Hotels</a>
            <a href="#search" className="tv-nav-link">Cars</a>
            <a href="#search" className="tv-nav-link">Packages</a>
            <a href="#vault" className="tv-nav-link">My Vault</a>
          </div>
          <div className="tv-nav-right">
            <a href="#membership" className="tv-btn-ghost">Sign In</a>
            <a href="#membership" className="tv-btn-gold">Join Aqurion Travel</a>
          </div>
        </nav>

        {/* ═══ HERO ═══ */}
        <section className="tv-hero">
          <div className="tv-hero-grid" /><div className="tv-hero-orb" />
          <div className="tv-hero-content">
            <Rv><div className="tv-eyebrow">Members Only · Better Rates · Every Time</div></Rv>
            <Rv d={0.1}><h1>Travel Smarter.<br/>Pay Less.<br/><span className="tv-gold">Every Time.</span></h1></Rv>
            <Rv d={0.2}><p className="tv-hero-sub">Aqurion Travel is a private booking platform for members of the Aqurion ecosystem — offering below-market rates on flights, hotels, and rental cars, with real-time price comparison against Expedia, Priceline, and Google Travel.</p></Rv>
            <Rv d={0.3}><div className="tv-hero-btns"><a href="#membership" className="tv-btn-gold-lg">See If You Qualify →</a><a href="#how" className="tv-btn-ghost-lg">Learn How It Works</a></div></Rv>
            <Rv d={0.4}><div className="tv-trust-bar">{trustBar.map(t => <span key={t.text} className="tv-trust-item"><span>{t.icon}</span> {t.text}</span>)}</div></Rv>
          </div>
        </section>

        {/* ═══ VALUE PROPS ═══ */}
        <section className="tv-section" style={{ textAlign: "center" }}>
          <Rv><div className="tv-label">Why Aqurion Travel</div><h2 className="tv-title">A Better Way to Book. A Smarter Way to Save.</h2></Rv>
          <div className="tv-vp-grid">
            {valueProps.map((v, i) => (
              <Rv key={v.title} d={i * 0.1}><div className="tv-vp">
                <div className="tv-vp-icon">{v.icon}</div>
                <div className="tv-vp-title">{v.title}</div>
                <div className="tv-vp-desc">{v.desc}</div>
              </div></Rv>
            ))}
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section id="how" className="tv-section">
          <Rv><div className="tv-label">How It Works</div><h2 className="tv-title">From Membership to Boarding Pass. Four Steps.</h2></Rv>
          <div className="tv-steps">
            {howItWorks.map((s, i) => (
              <Rv key={s.num} d={i * 0.1}><div className="tv-step">
                <div className="tv-step-num">{s.num}</div>
                <div className="tv-step-title">{s.title}</div>
                <div className="tv-step-desc">{s.desc}</div>
              </div></Rv>
            ))}
          </div>
        </section>

        {/* ═══ SEARCH PREVIEW ═══ */}
        <section id="search" className="tv-section" style={{ textAlign: "center" }}>
          <Rv><div className="tv-label">Search Experience</div><h2 className="tv-title">Search at Wholesale Rates. See the Savings Instantly.</h2></Rv>
          <Rv d={0.1}>
            <div className="tv-search-widget">
              <div className="tv-search-tabs">
                {searchTabs.map((t, i) => (
                  <button key={t.label} className={`tv-search-tab${activeSearchTab === i ? " active" : ""}`} onClick={() => setActiveSearchTab(i)}>{t.icon} {t.label}</button>
                ))}
              </div>
              <div className="tv-search-body">
                {activeSearchTab === 0 && <>
                  <div className="tv-search-row">
                    <div className="tv-search-field"><div className="tv-search-label">Flying From</div><input className="tv-search-input" placeholder="City or Airport" readOnly /></div>
                    <div className="tv-search-field"><div className="tv-search-label">Flying To</div><input className="tv-search-input" placeholder="City or Airport" readOnly /></div>
                  </div>
                  <div className="tv-search-row">
                    <div className="tv-search-field"><div className="tv-search-label">Depart</div><input className="tv-search-input" placeholder="Select date" readOnly /></div>
                    <div className="tv-search-field"><div className="tv-search-label">Return</div><input className="tv-search-input" placeholder="Select date" readOnly /></div>
                  </div>
                  <div className="tv-search-row"><div className="tv-search-cta"><button className="tv-btn-gold-lg" style={{ width: "100%" }}>Search Flights →</button></div></div>
                  <div className="tv-search-nudge">💡 Aqurion Eye suggests: Tuesday departures average 14% cheaper for this route.</div>
                </>}
                {activeSearchTab === 1 && <>
                  <div className="tv-search-row"><div className="tv-search-field tv-search-full"><div className="tv-search-label">Where Are You Going?</div><input className="tv-search-input" placeholder="City, landmark, or property name" readOnly /></div></div>
                  <div className="tv-search-row">
                    <div className="tv-search-field"><div className="tv-search-label">Check-in</div><input className="tv-search-input" placeholder="Select date" readOnly /></div>
                    <div className="tv-search-field"><div className="tv-search-label">Check-out</div><input className="tv-search-input" placeholder="Select date" readOnly /></div>
                  </div>
                  <div className="tv-search-row"><div className="tv-search-cta"><button className="tv-btn-gold-lg" style={{ width: "100%" }}>Find Hotels →</button></div></div>
                </>}
                {activeSearchTab === 2 && <>
                  <div className="tv-search-row"><div className="tv-search-field tv-search-full"><div className="tv-search-label">Pick-up Location</div><input className="tv-search-input" placeholder="Airport, City, or Address" readOnly /></div></div>
                  <div className="tv-search-row">
                    <div className="tv-search-field"><div className="tv-search-label">Pick-up Date</div><input className="tv-search-input" placeholder="Select date" readOnly /></div>
                    <div className="tv-search-field"><div className="tv-search-label">Return Date</div><input className="tv-search-input" placeholder="Select date" readOnly /></div>
                  </div>
                  <div className="tv-search-row"><div className="tv-search-cta"><button className="tv-btn-gold-lg" style={{ width: "100%" }}>Find Cars →</button></div></div>
                </>}
                {activeSearchTab === 3 && <>
                  <div style={{ marginBottom: "1rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem" }}>Flights + Hotels. One Price. More Savings.</div>
                  <div className="tv-search-row">
                    <div className="tv-search-field"><div className="tv-search-label">Departure City</div><input className="tv-search-input" placeholder="City or Airport" readOnly /></div>
                    <div className="tv-search-field"><div className="tv-search-label">Destination</div><input className="tv-search-input" placeholder="City or Airport" readOnly /></div>
                  </div>
                  <div className="tv-search-row">
                    <div className="tv-search-field"><div className="tv-search-label">Dates</div><input className="tv-search-input" placeholder="Select dates" readOnly /></div>
                    <div className="tv-search-field"><div className="tv-search-label">Travelers</div><input className="tv-search-input" placeholder="2 Adults" readOnly /></div>
                  </div>
                  <div className="tv-search-row"><div className="tv-search-cta"><button className="tv-btn-gold-lg" style={{ width: "100%" }}>Build My Package →</button></div></div>
                  <div className="tv-search-nudge" style={{ fontStyle: "italic" }}>Member packages include our wholesale rates on both components. Your savings are compounded.</div>
                </>}
              </div>
            </div>
          </Rv>
        </section>

        {/* ═══ COMPARISON PREVIEW ═══ */}
        <section className="tv-section" style={{ textAlign: "center" }}>
          <Rv><div className="tv-label">Price Comparison</div><h2 className="tv-title">The Same Flight. Three Prices. One Clear Winner.</h2></Rv>
          <Rv d={0.1}>
            <div className="tv-compare">
              <div className="tv-compare-header"><div className="tv-compare-route">LAX → JFK · Nonstop</div><div className="tv-compare-date">Round Trip · Economy · 1 Adult</div></div>
              <div className="tv-compare-body">
                <div className="tv-compare-col aqurion">
                  <div className="tv-compare-provider">✈ Aqurion Member Price</div>
                  <div className="tv-compare-price">$289</div>
                  <div className="tv-compare-save">You save $94</div>
                </div>
                <div className="tv-compare-col">
                  <div className="tv-compare-provider">Expedia</div>
                  <div className="tv-compare-price" style={{ color: "rgba(0,31,63,0.35)" }}>$352</div>
                  <div className="tv-compare-diff">+$63 more</div>
                </div>
                <div className="tv-compare-col">
                  <div className="tv-compare-provider">Priceline</div>
                  <div className="tv-compare-price" style={{ color: "rgba(0,31,63,0.35)" }}>$383</div>
                  <div className="tv-compare-diff">+$94 more</div>
                </div>
              </div>
              <div className="tv-compare-footer">✅ You save an average of $78 per booking as an Aqurion member</div>
            </div>
          </Rv>
        </section>

        {/* ═══ DESTINATIONS ═══ */}
        <section className="tv-section" style={{ textAlign: "center" }}>
          <Rv><div className="tv-label">Destination Inspiration</div><h2 className="tv-title">Where Will You Go Next?</h2></Rv>
          <div className="tv-dest-grid">
            {destinations.map((d, i) => (
              <Rv key={d.city} d={i * 0.06}><div className="tv-dest">
                <div className="tv-dest-img" style={{ background: "linear-gradient(135deg, #001F3F, #0B3D69)" }}>{d.img}<div className="tv-dest-badge">Save {d.save}</div></div>
                <div className="tv-dest-body"><div className="tv-dest-city">{d.city}</div><div className="tv-dest-price">From {d.price}<span className="tv-dest-from"> round trip</span></div></div>
              </div></Rv>
            ))}
          </div>
        </section>

        {/* ═══ AQURION EYE — AI ═══ */}
        <div className="tv-section-dark">
          <div className="tv-section-inner">
            <Rv><div className="tv-label">🤖 Aqurion Eye</div><h2 className="tv-title" style={{ color: "#fff" }}>AI Price Intelligence. Book at the Right Moment.</h2></Rv>
            <Rv d={0.1}><p className="tv-subtitle">Aqurion Eye continuously monitors flight and hotel pricing data across global distribution systems, analyzes historical price patterns, and calculates the statistical probability that the price will decrease — so you can make the right decision.</p></Rv>
            <div className="tv-ai-cards">
              {aiFeatures.map((f, i) => (
                <Rv key={f.level} d={i * 0.1}><div className="tv-ai-card">
                  <div className="tv-ai-prob" style={{ color: f.color }}>{f.prob}</div>
                  <div className="tv-ai-level" style={{ color: f.color }}>{f.level} Confidence</div>
                  <div className="tv-ai-desc">🤖 Aqurion Eye: {f.prob} {f.desc}</div>
                </div></Rv>
              ))}
            </div>
            <Rv d={0.3}><p style={{ marginTop: "2rem", fontSize: "0.68rem", color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>Aqurion Eye predictions are based on statistical analysis of historical and real-time pricing data. Actual prices may vary. Aqurion Travel does not guarantee price movements.</p></Rv>
          </div>
        </div>

        {/* ═══ MEMBERSHIP ═══ */}
        <section id="membership" className="tv-section" style={{ textAlign: "center" }}>
          <Rv><div className="tv-label">Membership</div><h2 className="tv-title">Your Membership Opens the Door.</h2></Rv>
          <Rv d={0.1}><p className="tv-subtitle" style={{ margin: "0 auto 3rem" }}>Aqurion Travel membership is exclusively available to members of the Aqurion ecosystem — including platform clients, partner credit unions, affiliated universities and associations, corporate travel partners, and approved union and professional organization members.</p></Rv>
          <div className="tv-member-grid">
            {memberTypes.map((m, i) => (
              <Rv key={m.title} d={i * 0.06}><div className="tv-member-card">
                <div className="tv-member-icon">{m.icon}</div>
                <div className="tv-member-title">{m.title}</div>
                <div className="tv-member-desc">{m.desc}</div>
              </div></Rv>
            ))}
          </div>
          <Rv d={0.4}><div style={{ marginTop: "3rem" }}><a href="mailto:partnerships@aqurion.dev" className="tv-btn-gold-lg">Check Your Access — Enter Your Email</a></div></Rv>
        </section>

        {/* ═══ TRUST / ESCROW ═══ */}
        <div className="tv-section-dark">
          <div className="tv-section-inner">
            <Rv><div className="tv-label">Security & Trust</div><h2 className="tv-title" style={{ color: "#fff" }}>Your Money Is Protected. From Booking to Boarding.</h2></Rv>
            <Rv d={0.1}><p className="tv-subtitle">Aqurion Travel operates as the Merchant of Record on every booking — meaning your payment is captured, protected, and held in a federally insured escrow account until your travel date. We pay suppliers directly. You travel with full protection.</p></Rv>
            <div className="tv-escrow-grid">
              {escrowSteps.map((s, i) => (
                <Rv key={s.num} d={i * 0.08}><div className="tv-escrow">
                  <div className="tv-escrow-num">{s.num}</div>
                  <div className="tv-escrow-title">{s.title}</div>
                  <div className="tv-escrow-desc">{s.desc}</div>
                </div></Rv>
              ))}
            </div>
            <Rv d={0.3}><div className="tv-security-badges">{securityBadges.map(b => <span key={b} className="tv-security-badge">🔒 {b}</span>)}</div></Rv>
          </div>
        </div>

        {/* ═══ REWARDS ═══ */}
        <section className="tv-section" style={{ textAlign: "center" }}>
          <Rv><div className="tv-label">Rewards</div><h2 className="tv-title">Your Trips Earn. Your Loyalty Rewards. Your Points Never Expire.</h2></Rv>
          <Rv d={0.1}><p className="tv-subtitle" style={{ margin: "0 auto 3rem" }}>Every booking earns points. Every review multiplies them. Oracle Partner properties triple them. And every quarter, members compete for extraordinary travel prizes.</p></Rv>
          <div className="tv-rewards-grid">
            {rewardsFeatures.map((r, i) => (
              <Rv key={r.title} d={i * 0.06}><div className="tv-reward">
                <div className="tv-reward-icon">{r.icon}</div>
                <div className="tv-reward-title">{r.title}</div>
                <div className="tv-reward-desc">{r.desc}</div>
              </div></Rv>
            ))}
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="tv-section">
          <Rv><div className="tv-label">FAQ</div><h2 className="tv-title">Questions We Answer Before You Ask.</h2></Rv>
          <div className="tv-faq">
            {faqs.map((f, i) => (
              <div key={i} className="tv-faq-item">
                <div className="tv-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>{f.q}<span style={{ color: "#D4AF37", fontSize: "1.2rem" }}>{openFaq === i ? "−" : "+"}</span></div>
                <AnimatePresence>{openFaq === i && <motion.div className="tv-faq-a" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>{f.a}</motion.div>}</AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ PARTNERSHIP INQUIRY ═══ */}
        <section className="tv-section" style={{ textAlign: "center" }}>
          <Rv><div className="tv-label">Partnerships</div><h2 className="tv-title">Bring Aqurion Travel to Your Members, Employees, or Community.</h2></Rv>
          <Rv d={0.1}><p className="tv-subtitle" style={{ margin: "0 auto 2rem" }}>If you represent a credit union, corporation, university, union, association, or other organization that serves a defined member community — we want to talk. Our partnership program creates genuine value for your members while generating licensing revenue for your organization.</p></Rv>
          <Rv d={0.2}><div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="tv-search-field"><div className="tv-search-label">Organization Name</div><input className="tv-search-input" placeholder="Your organization" readOnly /></div>
              <div className="tv-search-field"><div className="tv-search-label">Organization Type</div><input className="tv-search-input" placeholder="Credit Union, Corp..." readOnly /></div>
              <div className="tv-search-field"><div className="tv-search-label">Contact Name</div><input className="tv-search-input" placeholder="Full name" readOnly /></div>
              <div className="tv-search-field"><div className="tv-search-label">Email</div><input className="tv-search-input" placeholder="you@org.com" readOnly /></div>
              <div className="tv-search-field" style={{ gridColumn: "1/-1" }}><div className="tv-search-label">Estimated Member Count</div><input className="tv-search-input" placeholder="e.g. 50,000" readOnly /></div>
              <div style={{ gridColumn: "1/-1", marginTop: "0.5rem" }}><button className="tv-btn-gold-lg" style={{ width: "100%" }}>Submit Partnership Inquiry</button></div>
            </div>
          </div></Rv>
          <Rv d={0.3}><div style={{ marginTop: "2rem", maxWidth: 500, margin: "2rem auto 0", textAlign: "left" }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem" }}>What Your Organization Gets:</p>
            {["Branded travel portal at /YOUR-NAME", "Wholesale travel rates as a member benefit", "Real-time revenue reporting", "Licensing revenue based on member usage", "No technology cost — we handle everything", "Your members save. Your organization earns."].map(b => (
              <p key={b} style={{ fontSize: "0.82rem", color: "rgba(0,31,63,0.45)", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.2rem 0" }}><span style={{ color: "#D4AF37" }}>✓</span> {b}</p>
            ))}
          </div></Rv>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <div className="tv-cta-sec">
          <Rv><h2>You're One Step Away From<br/>Traveling <span className="tv-gold">Better</span>.</h2></Rv>
          <Rv d={0.1}><p>Check your membership access — or ask your credit union, employer, or organization about the Aqurion Travel benefit.</p></Rv>
          <Rv d={0.2}><a href="#membership" className="tv-btn-gold-lg">See If You Qualify →</a></Rv>
          <Rv d={0.3}><div className="tv-contact-grid">
            <div className="tv-contact-card"><div className="tv-contact-card-title">Member Support</div><div className="tv-contact-card-val"><a href="mailto:support@aquriontravel.com">support@aquriontravel.com</a></div></div>
            <div className="tv-contact-card"><div className="tv-contact-card-title">Corporate Travel</div><div className="tv-contact-card-val"><a href="mailto:corp@aquriontravel.com">corp@aquriontravel.com</a></div></div>
            <div className="tv-contact-card"><div className="tv-contact-card-title">Partnerships</div><div className="tv-contact-card-val"><a href="mailto:partnerships@aqurion.dev">partnerships@aqurion.dev</a></div></div>
          </div></Rv>
          <Rv d={0.4}><p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", position: "relative" }}>📞 1-888-AQUR-10-N · 7 Days / 8AM–10PM EST</p></Rv>
          <Rv d={0.4}><p style={{ marginTop: "0.5rem", fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", position: "relative" }}>Powered by Oracle Merchant Services · Duffel NDC Aviation · Hotelbeds / WebBeds Lodging</p></Rv>
        </div>

        {/* ═══ FOOTER ═══ */}
        <footer className="tv-footer">
          <div className="tv-footer-inner">
            <div className="tv-footer-grid">
              <div>
                <div className="tv-footer-brand"><span style={{ color: "#D4AF37" }}>A</span>qurion Travel</div>
                <div className="tv-footer-desc">An Aqurion Holdings Company. Members-only travel with AI price intelligence, wholesale rates, and FDIC-insured escrow protection.</div>
              </div>
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <div className="tv-footer-col-title">{title}</div>
                  {links.map(l => <a key={l} href="#" className="tv-footer-link">{l}</a>)}
                  {title === "Company" && <>
                    <a href="mailto:Chat@AqurionTravel.com" className="tv-footer-link" style={{ marginTop: "0.5rem" }}>Chat@AqurionTravel.com</a>
                    <a href="tel:+18882787106" className="tv-footer-link">1-888-AQUR-10-N</a>
                  </>}
                </div>
              ))}
            </div>
            <div className="tv-footer-bottom">
              © {new Date().getFullYear()} Aqurion Travel — An Aqurion Holdings Company · Powered by Oracle Merchant Services · Duffel NDC Aviation<br/>
              FDIC-Insured Escrow · PCI-DSS Level 1 Compliant · SOC 2 Secured · AWS US-East-1
              <div className="tv-footer-ecosystem">
                <a href="https://Aqurion.net">Aqurion.net</a>
                <a href="https://Aqurion.AI">Aqurion.AI</a>
                <a href="https://AqurionMarketing.com">AqurionMarketing.com</a>
                <a href="https://AquironSales.com">AquironSales.com</a>
                <a href="https://AqurionDev.com">AqurionDev.com</a>
                <a href="https://AqurionFi.com">AqurionFi.com</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
