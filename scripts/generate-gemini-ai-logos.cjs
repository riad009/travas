const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const brandConfigPath = path.join(repoRoot, 'packages', 'ui', 'src', 'brand-config.ts');
const outDir = path.join(repoRoot, 'apps', 'web', 'public', 'logos', 'ai-logo', 'gemini');
const refImagePath = path.join(repoRoot, 'apps', 'aqurion-sa', 'public', 'logos', 'aqurion-base-logo.png');
const apiKey = process.env.GEMINI_API_KEY || 'banana';
const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash-preview-image-generation';
const limitArg = process.argv.find(a => a.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : 79;
const dryRun = process.argv.includes('--dry-run');

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function slugify(text) { return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }

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

function buildPrompt(brand) {
  return [
    `Create one premium AI-generated logo for ${brand.name}.`,
    `The design MUST stay inside the same glossy blue light bulb concept as the reference image.`,
    `Keep the overall bulb silhouette consistent across the brand family.`,
    `Use a white or very light central mark plus subtle ${brand.accentColor} accents.`,
    `The brand sector is ${brand.category}. Suggest the iconography from that sector while staying minimal and luxury-tech.`,
    `Make it clean, vector-style, centered, transparent background outside the bulb, square composition, no mockup, no extra scenery.`
  ].join(' ');
}

async function generateOne(brand, referencePart) {
  const body = {
    contents: [{
      parts: [
        referencePart,
        { text: buildPrompt(brand) }
      ]
    }],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE']
    }
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

async function main() {
  ensureDir(outDir);
  const source = fs.readFileSync(brandConfigPath, 'utf8');
  const brands = extractBrands(source).slice(0, limit);
  const prompts = brands.map((b) => ({ ...b, prompt: buildPrompt(b) }));
  fs.writeFileSync(path.join(outDir, 'prompts.json'), JSON.stringify(prompts, null, 2));

  const hasReference = fs.existsSync(refImagePath);
  const referencePart = hasReference ? {
    inlineData: {
      mimeType: 'image/png',
      data: fs.readFileSync(refImagePath).toString('base64')
    }
  } : { text: 'Reference concept: glossy blue Aqurion light bulb logo.' };

  console.log(`Prepared ${brands.length} Gemini prompts in ${outDir}`);
  console.log(`Using API key: ${apiKey}`);
  console.log(`Reference image found: ${hasReference}`);

  if (dryRun) {
    console.log('Dry run only. No API requests sent.');
    return;
  }

  for (const brand of brands) {
    console.log(`Generating ${brand.id}...`);
    const result = await generateOne(brand, referencePart);
    const base = path.join(outDir, slugify(brand.id));
    fs.writeFileSync(`${base}.response.json`, JSON.stringify(result.json, null, 2));

    if (!result.ok) {
      console.log(`Failed ${brand.id}: HTTP ${result.status}`);
      continue;
    }

    const parts = result.json?.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p) => p.inlineData?.data);
    const textPart = parts.find((p) => typeof p.text === 'string');

    if (imagePart?.inlineData?.data) {
      const ext = imagePart.inlineData.mimeType === 'image/jpeg' ? 'jpg' : 'png';
      fs.writeFileSync(`${base}.${ext}`, Buffer.from(imagePart.inlineData.data, 'base64'));
      console.log(`Saved ${base}.${ext}`);
    }

    if (textPart?.text) {
      fs.writeFileSync(`${base}.txt`, textPart.text);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
