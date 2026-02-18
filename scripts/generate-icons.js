/**
 * Script to generate app icons from the GloomhavenLogo SVG.
 * Outputs: icon.png (1024x1024), adaptive-icon.png (1024x1024 with padding), favicon.png (48x48)
 *
 * Usage: node scripts/generate-icons.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');

// Replicate the hexPoints helper from GloomhavenLogo.tsx
function hexPoints(centerX, centerY, radius) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    pts.push(
      `${centerX + radius * Math.cos(angle)},${centerY + radius * Math.sin(angle)}`
    );
  }
  return pts.join(' ');
}

// Generate SVG string matching GloomhavenLogo.tsx exactly
function generateLogoSVG(s) {
  const cx = s / 2;
  const cy = s / 2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3d2912" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#1a1410" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0d0a08" stop-opacity="1"/>
    </radialGradient>

    <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f3d98b"/>
      <stop offset="30%" stop-color="#d4a438"/>
      <stop offset="50%" stop-color="#f9ecc4"/>
      <stop offset="70%" stop-color="#d4a438"/>
      <stop offset="100%" stop-color="#9a6a21"/>
    </linearGradient>

    <linearGradient id="goldSkull" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f3d98b"/>
      <stop offset="50%" stop-color="#d4a438"/>
      <stop offset="100%" stop-color="#9a6a21"/>
    </linearGradient>

    <linearGradient id="blade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#c4b8aa"/>
      <stop offset="50%" stop-color="#8a7d6f"/>
      <stop offset="100%" stop-color="#5c3d1a"/>
    </linearGradient>

    <radialGradient id="innerShadow" cx="50%" cy="65%" r="45%">
      <stop offset="0%" stop-color="#0d0a08" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0d0a08" stop-opacity="0.7"/>
    </radialGradient>
  </defs>

  <!-- Outer hexagon -->
  <polygon
    points="${hexPoints(cx, cy, s * 0.48)}"
    fill="url(#bgGlow)"
    stroke="url(#goldBorder)"
    stroke-width="${s * 0.025}"
    stroke-linejoin="round"
  />

  <!-- Inner hexagon border -->
  <polygon
    points="${hexPoints(cx, cy, s * 0.42)}"
    fill="none"
    stroke="#9a6a21"
    stroke-width="${s * 0.006}"
    stroke-linejoin="round"
    opacity="0.5"
  />

  <!-- Crossed swords -->
  <g opacity="0.35">
    <line x1="${cx - s * 0.28}" y1="${cy + s * 0.28}" x2="${cx + s * 0.12}" y2="${cy - s * 0.28}" stroke="url(#blade)" stroke-width="${s * 0.018}" stroke-linecap="round"/>
    <line x1="${cx - s * 0.16}" y1="${cy + s * 0.08}" x2="${cx - s * 0.06}" y2="${cy + s * 0.18}" stroke="#d4a438" stroke-width="${s * 0.015}" stroke-linecap="round"/>
    <line x1="${cx + s * 0.28}" y1="${cy + s * 0.28}" x2="${cx - s * 0.12}" y2="${cy - s * 0.28}" stroke="url(#blade)" stroke-width="${s * 0.018}" stroke-linecap="round"/>
    <line x1="${cx + s * 0.16}" y1="${cy + s * 0.08}" x2="${cx + s * 0.06}" y2="${cy + s * 0.18}" stroke="#d4a438" stroke-width="${s * 0.015}" stroke-linecap="round"/>
  </g>

  <!-- Shield shape -->
  <path
    d="M ${cx} ${cy - s * 0.24}
       C ${cx + s * 0.22} ${cy - s * 0.22}, ${cx + s * 0.24} ${cy - s * 0.08}, ${cx + s * 0.22} ${cy + s * 0.06}
       C ${cx + s * 0.18} ${cy + s * 0.18}, ${cx + s * 0.08} ${cy + s * 0.28}, ${cx} ${cy + s * 0.32}
       C ${cx - s * 0.08} ${cy + s * 0.28}, ${cx - s * 0.18} ${cy + s * 0.18}, ${cx - s * 0.22} ${cy + s * 0.06}
       C ${cx - s * 0.24} ${cy - s * 0.08}, ${cx - s * 0.22} ${cy - s * 0.22}, ${cx} ${cy - s * 0.24} Z"
    fill="#1a1410"
    stroke="url(#goldBorder)"
    stroke-width="${s * 0.02}"
    stroke-linejoin="round"
  />

  <!-- Shield inner border -->
  <path
    d="M ${cx} ${cy - s * 0.2}
       C ${cx + s * 0.18} ${cy - s * 0.18}, ${cx + s * 0.2} ${cy - s * 0.06}, ${cx + s * 0.18} ${cy + s * 0.05}
       C ${cx + s * 0.15} ${cy + s * 0.15}, ${cx + s * 0.07} ${cy + s * 0.23}, ${cx} ${cy + s * 0.27}
       C ${cx - s * 0.07} ${cy + s * 0.23}, ${cx - s * 0.15} ${cy + s * 0.15}, ${cx - s * 0.18} ${cy + s * 0.05}
       C ${cx - s * 0.2} ${cy - s * 0.06}, ${cx - s * 0.18} ${cy - s * 0.18}, ${cx} ${cy - s * 0.2} Z"
    fill="none"
    stroke="#5c3d1a"
    stroke-width="${s * 0.005}"
    opacity="0.6"
  />

  <!-- Skull cranium -->
  <circle cx="${cx}" cy="${cy - s * 0.04}" r="${s * 0.1}" fill="url(#goldSkull)"/>

  <!-- Jaw -->
  <path
    d="M ${cx - s * 0.07} ${cy + s * 0.02}
       Q ${cx - s * 0.06} ${cy + s * 0.12}, ${cx} ${cy + s * 0.14}
       Q ${cx + s * 0.06} ${cy + s * 0.12}, ${cx + s * 0.07} ${cy + s * 0.02}"
    fill="url(#goldSkull)"
  />

  <!-- Left eye socket -->
  <circle cx="${cx - s * 0.04}" cy="${cy - s * 0.05}" r="${s * 0.028}" fill="#0d0a08"/>

  <!-- Right eye socket -->
  <circle cx="${cx + s * 0.04}" cy="${cy - s * 0.05}" r="${s * 0.028}" fill="#0d0a08"/>

  <!-- Eye glow left -->
  <circle cx="${cx - s * 0.04}" cy="${cy - s * 0.05}" r="${s * 0.015}" fill="#dc4545" opacity="0.8"/>

  <!-- Eye glow right -->
  <circle cx="${cx + s * 0.04}" cy="${cy - s * 0.05}" r="${s * 0.015}" fill="#dc4545" opacity="0.8"/>

  <!-- Nose cavity -->
  <path
    d="M ${cx} ${cy + s * 0.0}
       L ${cx - s * 0.015} ${cy + s * 0.04}
       L ${cx + s * 0.015} ${cy + s * 0.04} Z"
    fill="#0d0a08"
  />

  <!-- Teeth line -->
  <line x1="${cx - s * 0.04}" y1="${cy + s * 0.07}" x2="${cx + s * 0.04}" y2="${cy + s * 0.07}" stroke="#0d0a08" stroke-width="${s * 0.005}"/>
  <line x1="${cx - s * 0.02}" y1="${cy + s * 0.06}" x2="${cx - s * 0.02}" y2="${cy + s * 0.08}" stroke="#0d0a08" stroke-width="${s * 0.004}"/>
  <line x1="${cx}" y1="${cy + s * 0.06}" x2="${cx}" y2="${cy + s * 0.08}" stroke="#0d0a08" stroke-width="${s * 0.004}"/>
  <line x1="${cx + s * 0.02}" y1="${cy + s * 0.06}" x2="${cx + s * 0.02}" y2="${cy + s * 0.08}" stroke="#0d0a08" stroke-width="${s * 0.004}"/>

  <!-- Inner shadow overlay -->
  <path
    d="M ${cx} ${cy - s * 0.24}
       C ${cx + s * 0.22} ${cy - s * 0.22}, ${cx + s * 0.24} ${cy - s * 0.08}, ${cx + s * 0.22} ${cy + s * 0.06}
       C ${cx + s * 0.18} ${cy + s * 0.18}, ${cx + s * 0.08} ${cy + s * 0.28}, ${cx} ${cy + s * 0.32}
       C ${cx - s * 0.08} ${cy + s * 0.28}, ${cx - s * 0.18} ${cy + s * 0.18}, ${cx - s * 0.22} ${cy + s * 0.06}
       C ${cx - s * 0.24} ${cy - s * 0.08}, ${cx - s * 0.22} ${cy - s * 0.22}, ${cx} ${cy - s * 0.24} Z"
    fill="url(#innerShadow)"
  />

  <!-- Top diamond -->
  <polygon
    points="${cx},${cy - s * 0.44} ${cx + s * 0.02},${cy - s * 0.41} ${cx},${cy - s * 0.38} ${cx - s * 0.02},${cy - s * 0.41}"
    fill="#d4a438"
    opacity="0.8"
  />

  <!-- Bottom diamond -->
  <polygon
    points="${cx},${cy + s * 0.44} ${cx + s * 0.02},${cy + s * 0.41} ${cx},${cy + s * 0.38} ${cx - s * 0.02},${cy + s * 0.41}"
    fill="#d4a438"
    opacity="0.8"
  />
</svg>`;
}

// Generate icon with full background fill
function generateIconSVG(size) {
  const logoSvg = generateLogoSVG(size);

  // Replace root <svg> to add background rect
  return logoSvg
    .replace(
      /(<svg[^>]*>)/,
      `$1\n  <rect width="${size}" height="${size}" fill="#0d0a08"/>`
    );
}

// Generate adaptive icon (logo centered with more padding for safe zone)
function generateAdaptiveIconSVG(size) {
  const logoSize = Math.round(size * 0.55);
  const offset = Math.round((size - logoSize) / 2);
  const innerLogoSvg = generateLogoSVG(logoSize);

  // Extract inner content (remove XML declaration and svg wrapper)
  const innerContent = innerLogoSvg
    .replace(/^<\?xml[^?]*\?>\s*/, '')
    .replace(/^<svg[^>]*>\s*/, '')
    .replace(/\s*<\/svg>\s*$/, '');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#0d0a08"/>
  <g transform="translate(${offset}, ${offset})">
    ${innerContent}
  </g>
</svg>`;
}

async function generateIcons() {
  console.log('Generating app icons...\n');

  // icon.png - 1024x1024
  const iconSvg = generateIconSVG(1024);
  await sharp(Buffer.from(iconSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(ASSETS_DIR, 'icon.png'));
  console.log('  ✔ icon.png (1024x1024)');

  // adaptive-icon.png - 1024x1024 with extra padding
  const adaptiveSvg = generateAdaptiveIconSVG(1024);
  await sharp(Buffer.from(adaptiveSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(ASSETS_DIR, 'adaptive-icon.png'));
  console.log('  ✔ adaptive-icon.png (1024x1024)');

  // favicon.png - 48x48
  const faviconSvg = generateIconSVG(512);
  await sharp(Buffer.from(faviconSvg))
    .resize(48, 48)
    .png()
    .toFile(path.join(ASSETS_DIR, 'favicon.png'));
  console.log('  ✔ favicon.png (48x48)');

  // splash-icon.png - 512x512 (used if needed)
  const splashSvg = generateIconSVG(512);
  await sharp(Buffer.from(splashSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(ASSETS_DIR, 'splash-icon.png'));
  console.log('  ✔ splash-icon.png (512x512)');

  console.log('\nAll icons generated in assets/');
}

generateIcons().catch(console.error);
