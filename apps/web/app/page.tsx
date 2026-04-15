"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { AQURION_BRANDS, getBrandsByTier } from "@repo/ui/brand-config";

const tier2 = getBrandsByTier(2);
const tier3 = getBrandsByTier(3);
const allCompanies = [...tier2, ...tier3];

/* ── Dotted Text Component ── */
function DotText({ lines, fontSize = 72 }: { lines: string[]; fontSize?: number }) {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{ x: number; y: number; ox: number; oy: number; vx: number; vy: number; r: number }[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const initDone = useRef(false);

  useEffect(() => {
    const c = cvRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = c.offsetWidth, H = c.offsetHeight;
    c.width = W * dpr; c.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Sample text as dots
    if (!initDone.current) {
      const offC = document.createElement("canvas");
      offC.width = W; offC.height = H;
      const offCtx = offC.getContext("2d")!;
      offCtx.fillStyle = "#fff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      const lineH = fontSize * 1.15;
      const startY = H / 2 - ((lines.length - 1) * lineH) / 2;
      lines.forEach((line, li) => {
        offCtx.font = `800 ${fontSize}px Inter, sans-serif`;
        offCtx.fillText(line, W / 2, startY + li * lineH);
      });
      const img = offCtx.getImageData(0, 0, W, H);
      const pts: typeof particlesRef.current = [];
      const gap = 4;
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          const a = img.data[(y * W + x) * 4 + 3]!;
          if (a > 128) {
            pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0, r: 1.2 + Math.random() * 0.6 });
          }
        }
      }
      particlesRef.current = pts;
      initDone.current = true;
    }

    let animId: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const radius = 80;
      particlesRef.current.forEach(p => {
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius && dist > 0) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 3;
          p.vy += Math.sin(angle) * force * 3;
        }
        // Spring back to origin
        p.vx += (p.ox - p.x) * 0.04;
        p.vy += (p.oy - p.y) * 0.04;
        // Damping
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    c.addEventListener("mousemove", onMove);
    c.addEventListener("mouseleave", onLeave);
    return () => { cancelAnimationFrame(animId); c.removeEventListener("mousemove", onMove); c.removeEventListener("mouseleave", onLeave); };
  }, [lines, fontSize]);

  const totalH = lines.length * fontSize * 1.15 + 40;
  return <canvas ref={cvRef} style={{ width: "100%", maxWidth: 900, height: totalH, cursor: "default" }} />;
}

/* ── Stable positions for company circles: scattered across viewport ── */
function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
}

function genCompanyPositions(count: number) {
  const rng = seededRandom(42);
  const pts: { x: number; y: number }[] = [];
  const pad = 0.06;
  for (let i = 0; i < count; i++) {
    let x: number, y: number, ok = false;
    for (let attempt = 0; attempt < 50; attempt++) {
      x = pad + rng() * (1 - pad * 2);
      y = pad + rng() * (1 - pad * 2);
      ok = true;
      for (const p of pts) {
        const dx = (x! - p.x), dy = (y! - p.y);
        if (Math.sqrt(dx * dx + dy * dy) < 0.06) { ok = false; break; }
      }
      if (ok) break;
    }
    pts.push({ x: x!, y: y! });
  }
  return pts;
}
const companyPositions = genCompanyPositions(allCompanies.length);

export default function HomePage() {
  const [active, setActive] = React.useState<number | null>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [formSent, setFormSent] = React.useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const galaxyCanvasRef = useRef<HTMLCanvasElement>(null);
  const starfieldRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const dimRef = useRef({ w: 0, h: 0 });
  const hovIdxRef = useRef<number | null>(null);
  const hoverRadii = useRef<number[]>(new Array(allCompanies.length).fill(18));
  const bp = process.env.NODE_ENV === "development" ? "/aqurion-holdings" : "";

  const { scrollYProgress } = useScroll({ target: starfieldRef, offset: ["start start", "end start"] });
  const featuredOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const featuredY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);

  /* ── Procedural Galaxy / Nebula Background (rendered once) ── */
  useEffect(() => {
    const gc = galaxyCanvasRef.current; if (!gc) return;
    const gctx = gc.getContext("2d"); if (!gctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = gc.offsetWidth, H = gc.offsetHeight;
    gc.width = W * dpr; gc.height = H * dpr;
    gctx.scale(dpr, dpr);

    // --- Noise helper ---
    function noise2D(x: number, y: number): number {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    }
    function smoothNoise(x: number, y: number): number {
      const ix = Math.floor(x), iy = Math.floor(y);
      const fx = x - ix, fy = y - iy;
      const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
      const n00 = noise2D(ix, iy), n10 = noise2D(ix+1, iy);
      const n01 = noise2D(ix, iy+1), n11 = noise2D(ix+1, iy+1);
      return (n00*(1-sx)+n10*sx)*(1-sy) + (n01*(1-sx)+n11*sx)*sy;
    }
    function fbm(x: number, y: number, octaves: number): number {
      let val = 0, amp = 0.5, freq = 1;
      for (let i = 0; i < octaves; i++) {
        val += amp * smoothNoise(x * freq, y * freq);
        amp *= 0.5; freq *= 2;
      }
      return val;
    }

    // --- 1. Deep space base ---
    gctx.fillStyle = '#020410';
    gctx.fillRect(0, 0, W, H);

    // --- 2. Nebula clouds (multiple layers) ---
    const nebulaLayers = [
      { color: [90, 40, 180], scale: 2.5, opacity: 0.12, ox: 0, oy: 0 },      // Deep purple
      { color: [200, 50, 120], scale: 3.2, opacity: 0.09, ox: 50, oy: 30 },   // Magenta/pink
      { color: [30, 100, 200], scale: 2.8, opacity: 0.10, ox: -30, oy: 20 },  // Blue
      { color: [20, 180, 180], scale: 4.0, opacity: 0.07, ox: 80, oy: -40 },  // Teal
      { color: [220, 80, 60], scale: 3.5, opacity: 0.05, ox: -60, oy: 50 },   // Red/orange
      { color: [140, 60, 220], scale: 2.0, opacity: 0.08, ox: 20, oy: -20 },  // Violet
    ];

    const nebulaImg = gctx.createImageData(W, H);
    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        const idx = (py * W + px) * 4;
        let r = 2, g = 4, b = 16; // base deep space

        // Milky Way band — a bright elongated band across the center
        const cx = W / 2, cy = H / 2;
        const dx = (px - cx) / (W * 0.55);
        const dy = (py - cy) / (H * 0.22);
        const bandAngle = -0.15; // slight tilt
        const rx = dx * Math.cos(bandAngle) - dy * Math.sin(bandAngle);
        const ry = dx * Math.sin(bandAngle) + dy * Math.cos(bandAngle);
        const bandDist = Math.sqrt(rx*rx + ry*ry);
        const bandIntensity = Math.max(0, 1 - bandDist) * Math.max(0, 1 - bandDist);

        // Noise-modulated milky way
        const mwNoise = fbm(px * 0.003 + 100, py * 0.006 + 100, 5);
        const mwBright = bandIntensity * (0.5 + mwNoise * 0.8);

        // Milky Way colors (warm white-blue core)
        r += mwBright * 80;
        g += mwBright * 75;
        b += mwBright * 110;

        // Nebula color layers
        for (const layer of nebulaLayers) {
          const nx = (px + layer.ox) * layer.scale / W;
          const ny = (py + layer.oy) * layer.scale / H;
          const n = fbm(nx * 8 + layer.ox * 0.01, ny * 8 + layer.oy * 0.01, 5);
          const intensity = Math.pow(Math.max(0, n - 0.3) / 0.7, 1.5) * layer.opacity;
          // Stronger near the band
          const bandBoost = 1 + bandIntensity * 2.5;
          r += layer.color[0]! * intensity * bandBoost;
          g += layer.color[1]! * intensity * bandBoost;
          b += layer.color[2]! * intensity * bandBoost;
        }

        // Subtle vignette (darken edges)
        const vx = (px / W - 0.5) * 2, vy = (py / H - 0.5) * 2;
        const vignette = 1 - Math.pow(Math.sqrt(vx*vx + vy*vy) * 0.7, 2);
        r *= vignette; g *= vignette; b *= vignette;

        nebulaImg.data[idx] = Math.min(255, Math.max(0, Math.round(r)));
        nebulaImg.data[idx+1] = Math.min(255, Math.max(0, Math.round(g)));
        nebulaImg.data[idx+2] = Math.min(255, Math.max(0, Math.round(b)));
        nebulaImg.data[idx+3] = 255;
      }
    }
    gctx.putImageData(nebulaImg, 0, 0);

    // --- 3. Dense starfield ---
    const starCount = 2500;
    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
    };
    const rand = rng(12345);

    for (let i = 0; i < starCount; i++) {
      const sx = rand() * W, sy = rand() * H;
      const size = rand() < 0.05 ? 1.5 + rand() * 1.5 : 0.3 + rand() * 1.0;

      // Stars near the milky way band are denser/brighter
      const sdx = (sx - W/2) / (W * 0.55);
      const sdy = (sy - H/2) / (H * 0.22);
      const srx = sdx * Math.cos(-0.15) - sdy * Math.sin(-0.15);
      const sry = sdx * Math.sin(-0.15) + sdy * Math.cos(-0.15);
      const sBand = Math.max(0, 1 - Math.sqrt(srx*srx + sry*sry));

      // Star color variation
      const colorRoll = rand();
      let sr: number, sg: number, sb: number;
      if (colorRoll < 0.1) { sr = 180; sg = 200; sb = 255; }        // Blue-white
      else if (colorRoll < 0.15) { sr = 255; sg = 200; sb = 150; }  // Warm yellow
      else if (colorRoll < 0.18) { sr = 255; sg = 150; sb = 120; }  // Orange
      else if (colorRoll < 0.2) { sr = 200; sg = 220; sb = 255; }   // Ice blue
      else { sr = 255; sg = 255; sb = 255; }                        // White

      const brightness = 0.4 + rand() * 0.6 + sBand * 0.4;

      // Glow for brighter stars
      if (size > 1.2) {
        const glowR = size * 4;
        const grd = gctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
        grd.addColorStop(0, `rgba(${sr},${sg},${sb},${0.3 * brightness})`);
        grd.addColorStop(1, 'transparent');
        gctx.fillStyle = grd;
        gctx.beginPath(); gctx.arc(sx, sy, glowR, 0, Math.PI * 2); gctx.fill();
      }

      gctx.beginPath(); gctx.arc(sx, sy, size, 0, Math.PI * 2);
      gctx.fillStyle = `rgba(${sr},${sg},${sb},${brightness})`;
      gctx.fill();
    }

    // --- 4. Extra dense star clusters along the milky way ---
    for (let i = 0; i < 800; i++) {
      const angle = -0.15 + (rand() - 0.5) * 0.3;
      const dist = rand() * 0.4;
      const along = (rand() - 0.5) * 1.8;
      const sx = W/2 + along * W * 0.45 * Math.cos(angle) - dist * H * 0.15 * Math.sin(angle);
      const sy = H/2 + along * W * 0.45 * Math.sin(angle) + dist * H * 0.15 * Math.cos(angle);
      if (sx < 0 || sx > W || sy < 0 || sy > H) continue;
      const size = 0.2 + rand() * 0.6;
      const brightness = 0.3 + rand() * 0.7;
      gctx.beginPath(); gctx.arc(sx, sy, size, 0, Math.PI * 2);
      gctx.fillStyle = `rgba(220,225,255,${brightness})`;
      gctx.fill();
    }

    // --- 5. Bright nebula highlight spots ---
    const highlights = [
      { x: W*0.3, y: H*0.35, r: W*0.12, color: '120,50,200' },
      { x: W*0.7, y: H*0.55, r: W*0.10, color: '200,60,130' },
      { x: W*0.5, y: H*0.45, r: W*0.15, color: '60,120,220' },
      { x: W*0.2, y: H*0.6, r: W*0.08, color: '40,180,170' },
      { x: W*0.8, y: H*0.35, r: W*0.09, color: '180,80,200' },
    ];
    for (const h of highlights) {
      const grd = gctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.r);
      grd.addColorStop(0, `rgba(${h.color},0.08)`);
      grd.addColorStop(0.5, `rgba(${h.color},0.03)`);
      grd.addColorStop(1, 'transparent');
      gctx.fillStyle = grd;
      gctx.beginPath(); gctx.arc(h.x, h.y, h.r, 0, Math.PI * 2); gctx.fill();
    }

  }, []);

  /* ── Canvas: company nodes (interactive layer) ── */
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    let W = c.offsetWidth, H = c.offsetHeight;
    c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr);
    dimRef.current = { w: W, h: H };

    let t = 0; let animId: number;

    function draw() {
      if (!ctx) return;
      const W2 = dimRef.current.w, H2 = dimRef.current.h;
      ctx.clearRect(0, 0, W2, H2);

      const mxNow = mouseRef.current;
      let newHov: number | null = null;

      companyPositions.forEach((p, i) => {
        const cx = p.x * W2, cy = p.y * H2;
        const dist = Math.sqrt((mxNow.x - cx) ** 2 + (mxNow.y - cy) ** 2);
        const isHov = dist < 30;
        if (isHov) newHov = i;
        const sx = cx, sy = cy;

        const targetR = isHov ? 30 : 18;
        hoverRadii.current[i] = hoverRadii.current[i]! + (targetR - hoverRadii.current[i]!) * 0.04;
        const r = hoverRadii.current[i]!;
        const hoverFactor = Math.max(0, (r - 18) / 12);
        const accent = allCompanies[i]?.accentColor || '#6C63FF';
        const ar = parseInt(accent.slice(1, 3), 16), ag = parseInt(accent.slice(3, 5), 16), ab = parseInt(accent.slice(5, 7), 16);

        // Glow on hover
        if (hoverFactor > 0.05) {
          const glowG = ctx.createRadialGradient(sx, sy, r * 0.5, sx, sy, r * 2.5);
          glowG.addColorStop(0, `rgba(${ar},${ag},${ab},${0.2 * hoverFactor})`);
          glowG.addColorStop(1, "transparent");
          ctx.fillStyle = glowG; ctx.beginPath(); ctx.arc(sx, sy, r * 2.5, 0, Math.PI * 2); ctx.fill();
        }

        // Ring
        ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.strokeStyle = hoverFactor > 0.05 ? `rgba(${ar},${ag},${ab},${0.3 + hoverFactor * 0.7})` : 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 0.4 + hoverFactor * 1.3;
        ctx.stroke();

        // Dot
        const dotR = 3.5 + hoverFactor * 2;
        ctx.beginPath(); ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = hoverFactor > 0.05 ? accent : 'rgba(255,255,255,0.7)';
        ctx.fill();

        // Label
        if (hoverFactor > 0.3 && allCompanies[i]) {
          ctx.save();
          ctx.globalAlpha = Math.min(1, (hoverFactor - 0.3) * 2);
          ctx.font = '700 13px Inter, sans-serif';
          const tw = ctx.measureText(allCompanies[i]!.name).width;
          const lx = sx + r + 8, ly = sy - 10;
          ctx.fillStyle = 'rgba(0,0,0,0.7)';
          ctx.beginPath(); ctx.roundRect(lx, ly, tw + 16, 24, 6); ctx.fill();
          ctx.fillStyle = accent; ctx.textAlign = 'left';
          ctx.fillText(allCompanies[i]!.name, lx + 8, sy + 5);
          ctx.restore();
        }
      });

      hovIdxRef.current = newHov;
      t++;
      animId = requestAnimationFrame(draw);
    }
    draw();

    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      c.style.cursor = hovIdxRef.current !== null ? 'pointer' : 'default';
    };
    const onClick = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      const mx2 = e.clientX - r.left, my2 = e.clientY - r.top;
      const W2 = dimRef.current.w, H2 = dimRef.current.h;
      for (let i = 0; i < companyPositions.length; i++) {
        const cx = companyPositions[i]!.x * W2, cy = companyPositions[i]!.y * H2;
        if (Math.sqrt((mx2 - cx) ** 2 + (my2 - cy) ** 2) < 25) { setActive(i); return; }
      }
    };
    const resize = () => {
      W = c.offsetWidth; H = c.offsetHeight;
      c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimRef.current = { w: W, h: H };
    };

    c.addEventListener("mousemove", onMove);
    c.addEventListener("click", onClick);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); c.removeEventListener("mousemove", onMove); c.removeEventListener("click", onClick); window.removeEventListener("resize", resize); };
  }, []);

  const company = active !== null ? allCompanies[active] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .hq{background:#020408;color:#fff;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}

        .hq-logo{position:fixed;top:1.5rem;left:2rem;z-index:101;display:flex;align-items:center;gap:0.5rem;text-decoration:none;}
        .hq-logo img{width:28px;height:28px;border-radius:6px;}
        .hq-logo-text{font-size:0.85rem;font-weight:700;color:#fff;}
        .hq-nav{position:fixed;top:1.5rem;left:50%;transform:translateX(-50%);z-index:100;display:flex;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:50px;padding:0.3rem;backdrop-filter:blur(20px);}
        .hq-nav a{padding:0.5rem 1.25rem;border-radius:50px;font-size:0.78rem;font-weight:600;color:rgba(255,255,255,0.45);text-decoration:none;transition:all 0.2s;white-space:nowrap;}
        .hq-nav a:hover{background:#fff;color:#000;}

        /* FULL-SCREEN STARFIELD HERO */
        .hq-starfield{position:relative;width:100%;height:100vh;overflow:hidden;background:#020410;}
        .hq-starfield canvas{position:absolute;inset:0;width:100%;height:100%;}
        .hq-starfield .galaxy-bg{z-index:0;}
        .hq-starfield .nodes-layer{z-index:1;}
        /* Featured cards at bottom of starfield */
        .hq-featured{position:absolute;bottom:3rem;left:0;right:0;z-index:3;display:flex;gap:1rem;padding:0 3rem;overflow-x:auto;scrollbar-width:none;}
        .hq-featured::-webkit-scrollbar{display:none;}
        .hq-featured-card{position:relative;flex:0 0 200px;height:240px;border-radius:18px;overflow:hidden;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:1.25rem;border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(4px);transition:border-color 0.3s;}
        .hq-featured-card:hover{border-color:rgba(108,99,255,0.35);}
        .hq-featured-bg{position:absolute;inset:0;opacity:0.5;transition:opacity 0.3s;}
        .hq-featured-card:hover .hq-featured-bg{opacity:0.8;}
        .hq-featured-icon{position:relative;z-index:1;font-size:2.5rem;margin-bottom:0.75rem;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.4));}
        .hq-featured-name{position:relative;z-index:1;font-size:0.88rem;font-weight:800;text-shadow:0 2px 8px rgba(0,0,0,0.5);}
        .hq-hero-section{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 3rem 6rem;}
        .hq-hero-section h1{font-size:clamp(3rem,7vw,5.5rem);font-weight:800;line-height:1.05;letter-spacing:-0.04em;margin-bottom:1.5rem;max-width:800px;}
        .hq-hero-section h1 span{color:rgba(255,255,255,0.2);}
        .hq-hero-section p{font-size:1rem;color:rgba(255,255,255,0.3);max-width:500px;margin:0 auto 2rem;line-height:1.7;}
        .hq-hero-section .hq-btn{display:inline-block;padding:0.75rem 2rem;border-radius:50px;background:#fff;color:#000;font-weight:700;font-size:0.85rem;border:none;cursor:pointer;text-decoration:none;transition:all 0.2s;}
        .hq-hero-section .hq-btn:hover{transform:scale(1.05);box-shadow:0 4px 25px rgba(255,255,255,0.2);}
        .hq-scroll-hint{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.15);font-size:0.65rem;letter-spacing:0.15em;display:flex;flex-direction:column;align-items:center;gap:0.4rem;}
        .hq-scroll-line{width:1px;height:28px;background:linear-gradient(180deg,rgba(255,255,255,0.2),transparent);animation:sPulse 2s infinite;}
        @keyframes sPulse{0%,100%{opacity:0.3;}50%{opacity:1;}}

        /* COMPANY CARDS SECTION */
        .hq-cards-section{padding:6rem 2rem;max-width:1200px;margin:0 auto;}
        .hq-cards-header{text-align:center;margin-bottom:3rem;}
        .hq-cards-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:rgba(255,255,255,0.2);font-family:'Space Mono',monospace;margin-bottom:0.75rem;}
        .hq-cards-title{font-size:clamp(2rem,4vw,3rem);font-weight:800;letter-spacing:-0.03em;}
        .hq-cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem;}
        .hq-card{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);cursor:pointer;display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem;transition:border-color 0.3s;}
        .hq-card:hover{border-color:rgba(108,99,255,0.3);}
        .hq-card-bg{position:absolute;inset:0;opacity:0.25;transition:opacity 0.3s;}
        .hq-card:hover .hq-card-bg{opacity:0.4;}
        .hq-card-stars{position:absolute;top:0.75rem;right:0.75rem;display:flex;gap:0.25rem;}
        .hq-card-star{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.3);}
        .hq-card-content{position:relative;z-index:1;}
        .hq-card-name{font-size:1.1rem;font-weight:800;margin-bottom:0.2rem;}
        .hq-card-domain{font-size:0.72rem;color:rgba(255,255,255,0.35);}
        .hq-card-cat{font-size:0.62rem;color:rgba(255,255,255,0.25);margin-top:0.15rem;}

        /* MODAL */
        .hq-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(12px);z-index:200;display:flex;align-items:center;justify-content:center;padding:2rem;}
        .hq-modal{width:100%;max-width:520px;background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:3rem;position:relative;}
        .hq-modal-close{position:absolute;top:1.25rem;right:1.25rem;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);background:transparent;color:rgba(255,255,255,0.5);font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
        .hq-modal-close:hover{background:rgba(255,255,255,0.08);color:#fff;}
        .hq-modal-icon{font-size:3rem;margin-bottom:1.25rem;}
        .hq-modal-name{font-size:1.8rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:0.3rem;}
        .hq-modal-domain{font-size:0.88rem;color:rgba(255,255,255,0.35);margin-bottom:1.25rem;}
        .hq-modal-cat{display:inline-block;padding:0.3rem 1rem;border-radius:50px;font-size:0.72rem;font-weight:600;background:rgba(108,99,255,0.1);color:#8B85FF;border:1px solid rgba(108,99,255,0.15);margin-bottom:1.5rem;}
        .hq-modal-desc{font-size:0.9rem;color:rgba(255,255,255,0.45);line-height:1.8;margin-bottom:2rem;}
        .hq-modal-link{display:inline-flex;align-items:center;gap:0.5rem;padding:0.75rem 2rem;border-radius:50px;background:#6C63FF;color:#fff;font-weight:700;font-size:0.88rem;text-decoration:none;transition:all 0.2s;}
        .hq-modal-link:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(108,99,255,0.35);}

        /* SECTIONS */
        .hq-section{padding:6rem 2rem;max-width:1100px;margin:0 auto;}
        .hq-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:rgba(255,255,255,0.25);font-family:'Space Mono',monospace;margin-bottom:1rem;}
        .hq-title{font-size:clamp(2rem,4vw,3rem);font-weight:800;letter-spacing:-0.03em;margin-bottom:1.5rem;line-height:1.1;}

        /* Company Directory */
        .hq-dir-grid{display:flex;flex-direction:column;gap:2px;margin-top:1rem;}
        .hq-dir-item{display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:14px;text-decoration:none;color:#fff;transition:all 0.2s;}
        .hq-dir-item:hover{background:rgba(108,99,255,0.06);border-color:rgba(108,99,255,0.2);}
        .hq-dir-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;}
        .hq-dir-info{flex:1;min-width:0;}
        .hq-dir-name{font-size:0.92rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .hq-dir-domain{font-size:0.72rem;color:rgba(255,255,255,0.3);}
        .hq-dir-cat{font-size:0.65rem;color:rgba(255,255,255,0.3);padding:0.2rem 0.65rem;border-radius:50px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);white-space:nowrap;}
        .hq-dir-arrow{font-size:0.85rem;color:rgba(255,255,255,0.15);transition:color 0.2s;}
        .hq-dir-item:hover .hq-dir-arrow{color:#6C63FF;}

        .hq-about-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.04);border-radius:20px;overflow:hidden;margin-top:3rem;}
        .hq-about-card{background:#0a0a0a;padding:2.5rem 2rem;}
        .hq-about-stat{font-size:2.5rem;font-weight:900;color:#6C63FF;margin-bottom:0.5rem;letter-spacing:-0.03em;}
        .hq-about-card-title{font-size:1rem;font-weight:700;margin-bottom:0.75rem;}
        .hq-about-card-desc{font-size:0.85rem;color:rgba(255,255,255,0.4);line-height:1.7;}

        .hq-faq{max-width:700px;margin-top:2rem;}
        .hq-faq-item{border-bottom:1px solid rgba(255,255,255,0.06);}
        .hq-faq-q{padding:1.25rem 0;font-weight:600;font-size:0.92rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:color 0.2s;}
        .hq-faq-q:hover{color:#6C63FF;}
        .hq-faq-a{padding:0 0 1.25rem;font-size:0.85rem;color:rgba(255,255,255,0.4);line-height:1.7;}

        .hq-careers-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-top:2rem;}
        .hq-career-card{padding:1.5rem;border-radius:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);}
        .hq-career-title{font-weight:700;font-size:0.95rem;margin-bottom:0.25rem;}
        .hq-career-meta{font-size:0.75rem;color:rgba(255,255,255,0.35);margin-bottom:0.75rem;}
        .hq-career-desc{font-size:0.82rem;color:rgba(255,255,255,0.45);line-height:1.6;}

        .hq-contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start;}
        .hq-input{padding:0.8rem 1.2rem;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-size:0.88rem;font-family:'Inter',sans-serif;outline:none;width:100%;transition:border-color 0.2s;}
        .hq-input:focus{border-color:rgba(108,99,255,0.4);}
        .hq-input::placeholder{color:rgba(255,255,255,0.25);}
        .hq-textarea{min-height:120px;resize:vertical;}
        .hq-form-btn{padding:0.8rem;background:#6C63FF;color:#fff;border:none;border-radius:10px;font-weight:700;font-size:0.88rem;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;width:100%;}
        .hq-form-btn:hover{background:#7C75FF;}

        .hq-footer{padding:4rem 2rem 2rem;border-top:1px solid rgba(255,255,255,0.06);max-width:1100px;margin:0 auto;}
        .hq-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem;}
        .hq-footer-brand{font-size:1.1rem;font-weight:800;margin-bottom:0.75rem;}
        .hq-footer-desc{font-size:0.8rem;color:rgba(255,255,255,0.35);line-height:1.6;max-width:280px;}
        .hq-footer-col-title{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin-bottom:1rem;}
        .hq-footer-link{display:block;font-size:0.8rem;color:rgba(255,255,255,0.45);text-decoration:none;padding:0.25rem 0;transition:color 0.2s;}
        .hq-footer-link:hover{color:#6C63FF;}
        .hq-footer-bottom{text-align:center;font-size:0.72rem;color:rgba(255,255,255,0.2);padding-top:2rem;border-top:1px solid rgba(255,255,255,0.05);}

        @media(max-width:768px){.hq-nav{display:none;}.hq-about-grid{grid-template-columns:1fr;}.hq-contact-grid{grid-template-columns:1fr;}.hq-footer-grid{grid-template-columns:1fr 1fr;}.hq-cards-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));}}
      `}</style>

      <div className="hq">
        <a href={`${bp}/`} className="hq-logo"><img src={`${bp}/logos/aqurion-holdings-icon.png`} alt="" /><span className="hq-logo-text">Aqurion</span></a>
        <nav className="hq-nav"><a href="#companies">Companies</a><a href="#about">About</a><a href="#careers">Careers</a><a href="#contact">Contact</a></nav>

        {/* ═══ HERO TEXT — first thing on the page ═══ */}
        <section className="hq-hero-section">
          <DotText lines={["Aqurion is a", "Company Studio"]} fontSize={72} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
            We build, invest in, and operate technology companies across 12+ industry verticals.
          </motion.p>
          <motion.a href="#constellation" className="hq-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            Explore Companies ↓
          </motion.a>
          <div className="hq-scroll-hint"><span>SCROLL</span><div className="hq-scroll-line" /></div>
        </section>

        {/* ═══ FULL-SCREEN STARFIELD — scroll to reveal ═══ */}
        <section id="constellation" ref={starfieldRef} className="hq-starfield">
          <canvas ref={galaxyCanvasRef} className="galaxy-bg" />
          <canvas ref={canvasRef} className="nodes-layer" />
        </section>

        {/* ═══ MODAL ═══ */}
        <AnimatePresence>
          {company && (
            <motion.div className="hq-modal-overlay" onClick={() => setActive(null)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <motion.div className="hq-modal" onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}>
                <button className="hq-modal-close" onClick={() => setActive(null)}>✕</button>
                <div className="hq-modal-icon"><img src={`${bp}${company.logoUrl || '/logos/aqurion-base-logo.png'}`} alt={company.name} style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'contain' }} /></div>
                <div className="hq-modal-name">{company.name}</div>
                <div className="hq-modal-domain">{company.domain}</div>
                <div className="hq-modal-cat">{company.category}</div>
                <div className="hq-modal-desc">
                  Part of the Aqurion ecosystem, {company.name} provides enterprise-grade solutions for the {company.category?.toLowerCase()} industry. Built with modern technology and designed to scale.
                </div>
                <a href={`https://${company.domain}`} className="hq-modal-link" target="_blank" rel="noopener noreferrer">Visit {company.domain} →</a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ COMPANY DIRECTORY ═══ */}
        <section id="companies" className="hq-section">
          <motion.div className="hq-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Portfolio</motion.div>
          <motion.h2 className="hq-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>All Companies</motion.h2>
          <div className="hq-dir-grid">
            {allCompanies.map((c, i) => (
              <motion.a key={c.id} href={`https://${c.domain}`} target="_blank" rel="noopener noreferrer" className="hq-dir-item"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}>
                <div className="hq-dir-icon" style={{ background: `${c.accentColor}15` }}>
                  <img src={`${bp}${c.logoUrl || '/logos/aqurion-base-logo.png'}`} alt={c.name} style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'contain' }} />
                </div>
                <div className="hq-dir-info">
                  <div className="hq-dir-name">{c.name}</div>
                  <div className="hq-dir-domain">{c.domain}</div>
                </div>
                <div className="hq-dir-cat">{c.category}</div>
                <div className="hq-dir-arrow">→</div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" className="hq-section" style={{ textAlign: "center" }}>
          <motion.div className="hq-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>About</motion.div>
          <motion.h2 className="hq-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>A Holding Company Built for the Digital Age</motion.h2>
          <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>Aqurion Holdings provides infrastructure for ambitious technology companies. Strategy, capital, and talent under one roof.</p>
          <div className="hq-about-grid">
            {[{ s: "56+", t: "Applications", d: "Active platforms across the ecosystem." }, { s: "12", t: "Verticals", d: "From property to healthcare." }, { s: "79", t: "Domains", d: "Growing digital real estate." }].map((c, i) => (
              <motion.div key={i} className="hq-about-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="hq-about-stat">{c.s}</div><div className="hq-about-card-title">{c.t}</div><div className="hq-about-card-desc">{c.d}</div>
              </motion.div>
            ))}
            {[{ t: "Our Mission", d: "Democratize enterprise-grade tech for SMBs worldwide." }, { t: "Our Approach", d: "Build, invest, operate. Shared infrastructure and AI-first." }, { t: "Global Reach", d: "North and South America, 10+ countries." }].map((c, i) => (
              <motion.div key={i + 3} className="hq-about-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i + 3) * 0.1 }}>
                <div className="hq-about-card-title">{c.t}</div><div className="hq-about-card-desc">{c.d}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ CAREERS ═══ */}
        <section id="careers" className="hq-section">
          <motion.div className="hq-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Careers</motion.div>
          <motion.h2 className="hq-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Join the Team</motion.h2>
          <div className="hq-careers-grid">
            {[{ t: "Full-Stack Engineer", d: "React, Next.js, Node.js." }, { t: "AI/ML Engineer", d: "Intelligent models at scale." }, { t: "Growth Marketing Lead", d: "Drive acquisition." }, { t: "Sales Development Rep", d: "Generate leads." }].map((c, i) => (
              <motion.div key={i} className="hq-career-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="hq-career-title">{c.t}</div><div className="hq-career-meta">Remote • Full-time</div><div className="hq-career-desc">{c.d}</div>
              </motion.div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", marginTop: "1.5rem" }}>Email <a href="mailto:careers@aqurion.net" style={{ color: "#6C63FF", textDecoration: "none" }}>careers@aqurion.net</a></p>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="hq-section">
          <div className="hq-label">FAQ</div><h2 className="hq-title">Common Questions</h2>
          <div className="hq-faq">
            {[{ q: "What is Aqurion Holdings?", a: "A next-gen digital holding company across 12+ verticals." }, { q: "How many companies?", a: "56+ applications and platforms." }, { q: "How to partner?", a: "Email info@aqurion.net." }, { q: "Is Aqurion hiring?", a: "Yes! careers@aqurion.net." }].map((f, i) => (
              <div key={i} className="hq-faq-item">
                <div className="hq-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>{f.q}<span style={{ color: "#6C63FF", fontSize: "1.2rem" }}>{openFaq === i ? "−" : "+"}</span></div>
                {openFaq === i && <motion.div className="hq-faq-a" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }}>{f.a}</motion.div>}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className="hq-section">
          <div className="hq-contact-grid">
            <div><div className="hq-label">Contact</div><h2 className="hq-title">Let&apos;s Build Together</h2><p style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>Send us a message.</p></div>
            <div>
              {formSent ? (<div style={{ padding: "2rem", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 16, textAlign: "center", color: "#22C55E", fontWeight: 600 }}>✓ Sent!</div>) : (
                <form style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }} onSubmit={e => { e.preventDefault(); setFormSent(true); }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}><input className="hq-input" placeholder="First name" required /><input className="hq-input" placeholder="Last name" required /></div>
                  <input className="hq-input" type="email" placeholder="Email" required /><textarea className="hq-input hq-textarea" placeholder="Your project..." required />
                  <button type="submit" className="hq-form-btn">Send Message →</button>
                </form>
              )}
            </div>
          </div>
        </section>

        <footer className="hq-footer">
          <div className="hq-footer-grid">
            <div><div className="hq-footer-brand">Aqurion Holdings</div><div className="hq-footer-desc">Building the future of digital business.</div></div>
            <div><div className="hq-footer-col-title">Divisions</div><a href="https://Aqurion.AI" className="hq-footer-link">AI</a><a href="https://AqurionDev.com" className="hq-footer-link">Dev</a><a href="https://AqurionMarketing.com" className="hq-footer-link">Marketing</a><a href="https://AqurionSales.com" className="hq-footer-link">Sales</a></div>
            <div><div className="hq-footer-col-title">Company</div><a href="#about" className="hq-footer-link">About</a><a href="#careers" className="hq-footer-link">Careers</a><a href="#contact" className="hq-footer-link">Contact</a></div>
            <div><div className="hq-footer-col-title">Connect</div><a href="mailto:info@aqurion.net" className="hq-footer-link">Email</a><a href="https://linkedin.com" className="hq-footer-link">LinkedIn</a></div>
          </div>
          <div className="hq-footer-bottom">© {new Date().getFullYear()} Aqurion Holdings. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}
