const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const brandConfigPath = path.join(repoRoot, 'packages', 'ui', 'src', 'brand-config.ts');
const outDir = path.join(repoRoot, 'apps', 'web', 'public', 'logos', 'ai-logo');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function extractBrands(tsSource) {
  const brands = [];
  const regex = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?accentColor:\s*"(#[0-9A-Fa-f]{6})"/g;
  let match;
  while ((match = regex.exec(tsSource)) !== null) {
    const [, id, name, category, accentColor] = match;
    brands.push({ id, name, category, accentColor });
  }
  return brands;
}

function coreName(name) {
  return name
    .replace(/^Aqurion\s+/i, '')
    .replace(/^ExExecutive\s+/i, 'Executive ')
    .trim();
}

function makeAbbr(name) {
  const stop = new Set(['and', 'of', 'the', 'for', 'to']);
  const words = coreName(name)
    .replace(/[^A-Za-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter(w => !stop.has(w.toLowerCase()));

  if (words.length === 0) return 'A';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function hashNum(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function symbolVariant(seed, accentColor) {
  const v = seed % 5;
  switch (v) {
    case 0:
      return `<circle cx="256" cy="234" r="88" fill="url(#accentGlow)" opacity="0.32"/>`;
    case 1:
      return `<path d="M186 240c30-54 110-76 140-8" stroke="${accentColor}" stroke-width="18" stroke-linecap="round" fill="none" opacity="0.7"/>`;
    case 2:
      return `<path d="M196 268l58-96 62 96" stroke="${accentColor}" stroke-width="14" stroke-linejoin="round" fill="none" opacity="0.72"/>`;
    case 3:
      return `<rect x="178" y="164" width="156" height="126" rx="32" fill="url(#accentGlow)" opacity="0.24"/>`;
    default:
      return `<path d="M172 222c34-16 66-32 100-24s60 30 76 54" stroke="${accentColor}" stroke-width="16" stroke-linecap="round" fill="none" opacity="0.65"/>`;
  }
}

function logoSvg(brand) {
  const name = escapeXml(brand.name);
  const short = escapeXml(coreName(brand.name));
  const abbr = escapeXml(makeAbbr(brand.name));
  const accent = brand.accentColor;
  const seed = hashNum(brand.id);
  const fontSize = abbr.length >= 3 ? 86 : 116;
  const label = short.length > 20 ? short.slice(0, 20) : short;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title>${name} bulb logo</title>
  <desc>Blue Aqurion light bulb style logo for ${name}.</desc>
  <defs>
    <linearGradient id="bulbBlue" x1="120" y1="50" x2="392" y2="448" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#38BDF8"/>
      <stop offset="0.38" stop-color="#1D4ED8"/>
      <stop offset="1" stop-color="#020C5A"/>
    </linearGradient>
    <radialGradient id="shine" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(214 120) rotate(52) scale(160 146)">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="accentGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256 220) rotate(90) scale(140 140)">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.95"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="70" y="18" width="372" height="460" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#02103F" flood-opacity="0.35"/>
    </filter>
  </defs>

  <g filter="url(#shadow)">
    <path d="M256 42c-80.6 0-146 65.4-146 146 0 51.5 26.5 95.6 66.6 121.3 17.3 11.1 27.4 30.8 27.4 51.3V378c0 8.8 7.2 16 16 16h72c8.8 0 16-7.2 16-16v-17.4c0-20.5 10.1-40.2 27.4-51.3C375.5 283.6 402 239.5 402 188c0-80.6-65.4-146-146-146Z" fill="url(#bulbBlue)"/>
    <path d="M196 378h120c12.2 0 22 9.8 22 22v10c0 12.2-9.8 22-22 22H196c-12.2 0-22-9.8-22-22v-10c0-12.2 9.8-22 22-22Z" fill="#041D79"/>
    <path d="M202 452h108c8.8 0 16 7.2 16 16s-7.2 16-16 16H202c-8.8 0-16-7.2-16-16s7.2-16 16-16Z" fill="url(#bulbBlue)"/>
    <path d="M224 484h64c0 15.5-12.5 28-28 28h-8c-15.5 0-28-12.5-28-28Z" fill="url(#bulbBlue)"/>
    <path d="M156 126c15-45 56-74 103-74" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="10" stroke-linecap="round"/>
    <path d="M150 154c-6 14-10 30-11 47" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="8" stroke-linecap="round"/>
    <path d="M126 212c0 34 8 66 30 90 14 16 22 31 23 49v27" fill="#03145E" opacity="0.45"/>
    <ellipse cx="238" cy="130" rx="106" ry="88" fill="url(#shine)"/>
    ${symbolVariant(seed, accent)}

    <text x="256" y="250" text-anchor="middle" font-size="${fontSize}" font-family="Inter, Arial, sans-serif" font-weight="800" fill="#FFFFFF" letter-spacing="2">${abbr}</text>
    <text x="256" y="414" text-anchor="middle" font-size="22" font-family="Inter, Arial, sans-serif" font-weight="700" fill="#FFFFFF" letter-spacing="1.4">${escapeXml(label.toUpperCase())}</text>
  </g>
</svg>`;
}

function previewHtml(brands) {
  const cards = brands.map((b) => {
    const file = `${slugify(b.id)}-bulb.svg`;
    return `<div class="card"><img src="./${file}" alt="${escapeXml(b.name)}"><div class="name">${escapeXml(b.name)}</div><div class="meta">${escapeXml(b.category)}</div></div>`;
  }).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Aqurion AI Logo Pack</title>
  <style>
    body{margin:0;font-family:Inter,Arial,sans-serif;background:#050816;color:#fff;padding:24px}
    h1{margin:0 0 8px;font-size:32px} p{margin:0 0 24px;color:#a5b4fc}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px}
    .card{background:linear-gradient(180deg,#0b1230,#09101f);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:14px;text-align:center}
    .card img{width:100%;height:150px;object-fit:contain;background:linear-gradient(180deg,#eef2ff,#dbeafe);border-radius:12px}
    .name{font-weight:700;font-size:14px;margin-top:10px}
    .meta{font-size:12px;color:#93c5fd;margin-top:4px}
  </style>
</head>
<body>
  <h1>Aqurion AI Bulb Logos</h1>
  <p>${brands.length} extracted brand logos generated in a consistent blue light-bulb concept.</p>
  <div class="grid">${cards}</div>
</body>
</html>`;
}

const source = fs.readFileSync(brandConfigPath, 'utf8');
const brands = extractBrands(source);
ensureDir(outDir);

brands.forEach((brand) => {
  const filename = `${slugify(brand.id)}-bulb.svg`;
  fs.writeFileSync(path.join(outDir, filename), logoSvg(brand), 'utf8');
});

fs.writeFileSync(path.join(outDir, 'logo-manifest.json'), JSON.stringify({ generatedAt: new Date().toISOString(), count: brands.length, logos: brands.map(b => ({ ...b, file: `${slugify(b.id)}-bulb.svg` })) }, null, 2));
fs.writeFileSync(path.join(outDir, 'index.html'), previewHtml(brands), 'utf8');

console.log(`Generated ${brands.length} bulb logos in ${outDir}`);
