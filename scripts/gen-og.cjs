const sharp = require('sharp');
const path = require('path');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
<defs>
  <radialGradient id="bg" cx="50%" cy="45%" r="65%">
    <stop offset="0%" stop-color="#0e0e0e"/>
    <stop offset="100%" stop-color="#040404"/>
  </radialGradient>
  <radialGradient id="gl" cx="50%" cy="50%" r="55%">
    <stop offset="0%" stop-color="#C4A35A" stop-opacity="0.07"/>
    <stop offset="100%" stop-color="#C4A35A" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<rect width="1200" height="630" fill="url(#gl)"/>
<rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="rgba(196,163,90,0.14)" stroke-width="1"/>
<rect x="560" y="0" width="80" height="3" rx="1.5" fill="#C4A35A" opacity="0.75"/>
<rect x="576" y="148" width="48" height="48" rx="11" fill="#C4A35A"/>
<svg x="576" y="148" width="48" height="48" viewBox="0 0 24 24">
  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#000"/>
</svg>
<text x="600" y="295" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="88" font-weight="800" letter-spacing="-4" fill="white">KTA Oracle</text>
<text x="600" y="350" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="25" fill="rgba(255,255,255,0.42)" letter-spacing="-0.3">Real-time KTA intelligence for the Keeta Network</text>
<rect x="282" y="404" width="148" height="34" rx="17" fill="rgba(196,163,90,0.15)" stroke="rgba(196,163,90,0.4)" stroke-width="1"/>
<text x="356" y="426" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="12" font-weight="700" fill="#C4A35A" letter-spacing="1.2">LIVE PRICE</text>
<rect x="450" y="404" width="160" height="34" rx="17" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.3)" stroke-width="1"/>
<text x="530" y="426" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="12" font-weight="700" fill="#00D4AA" letter-spacing="1.2">WHALE ALERTS</text>
<rect x="630" y="404" width="148" height="34" rx="17" fill="rgba(196,163,90,0.15)" stroke="rgba(196,163,90,0.4)" stroke-width="1"/>
<text x="704" y="426" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="12" font-weight="700" fill="#C4A35A" letter-spacing="1.2">AI INSIGHTS</text>
<rect x="798" y="404" width="120" height="34" rx="17" fill="rgba(100,140,255,0.1)" stroke="rgba(120,160,255,0.35)" stroke-width="1"/>
<text x="858" y="426" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="12" font-weight="700" fill="rgba(160,190,255,0.95)" letter-spacing="1.2">SDK / MCP</text>
<text x="600" y="546" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="18" fill="rgba(196,163,90,0.28)" letter-spacing="2">kta-oracle.top</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(__dirname, '..', 'public', 'og.png'), (err, info) => {
    if (err) { console.error(err); process.exit(1); }
    console.log('og.png generated:', info.width + 'x' + info.height, Math.round(info.size/1024) + 'KB');
  });
