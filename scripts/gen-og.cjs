const { createCanvas } = require('@napi-rs/canvas');
const { writeFileSync } = require('fs');
const { join } = require('path');

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

function rr(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

const bg = ctx.createRadialGradient(W/2, H*0.45, 0, W/2, H/2, W*0.65);
bg.addColorStop(0, '#0e0e0e');
bg.addColorStop(1, '#040404');
ctx.fillStyle = bg;
ctx.fillRect(0, 0, W, H);

const glow = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W*0.55);
glow.addColorStop(0, 'rgba(196,163,90,0.07)');
glow.addColorStop(1, 'rgba(196,163,90,0)');
ctx.fillStyle = glow;
ctx.fillRect(0, 0, W, H);

ctx.strokeStyle = 'rgba(196,163,90,0.18)';
ctx.lineWidth = 1;
ctx.strokeRect(0.5, 0.5, W-1, H-1);

rr(560, 0, 80, 3, 1.5);
ctx.fillStyle = 'rgba(196,163,90,0.8)';
ctx.fill();

const lx = 576, ly = 148, ls = 48;
rr(lx, ly, ls, ls, 11);
ctx.fillStyle = '#C4A35A';
ctx.fill();

ctx.fillStyle = '#000000';
ctx.beginPath();
const s = ls / 24;
const bolt = [[13,2],[3,14],[12,14],[11,22],[21,10],[12,10],[13,2]];
ctx.moveTo(lx + bolt[0][0]*s, ly + bolt[0][1]*s);
for (let i = 1; i < bolt.length; i++) ctx.lineTo(lx + bolt[i][0]*s, ly + bolt[i][1]*s);
ctx.closePath();
ctx.fill();

ctx.textAlign = 'center';
ctx.textBaseline = 'alphabetic';
const font = '"Segoe UI", Arial, sans-serif';
ctx.font = `800 86px ${font}`;

const ktaW = ctx.measureText('KTA ').width;
const oracleW = ctx.measureText('Oracle').width;
const totalW = ktaW + oracleW;
const titleX = W/2 - totalW/2;
const titleY = 295;

ctx.fillStyle = '#ffffff';
ctx.textAlign = 'left';
ctx.fillText('KTA ', titleX, titleY);
ctx.fillStyle = '#C4A35A';
ctx.fillText('Oracle', titleX + ktaW, titleY);

ctx.textAlign = 'center';
ctx.font = `400 24px ${font}`;
ctx.fillStyle = 'rgba(255,255,255,0.42)';
ctx.fillText('Real-time KTA intelligence for the Keeta Network', W/2, 350);

function pill(x, y, w, h, bgColor, strokeColor, label, labelColor) {
  rr(x, y, w, h, h/2);
  ctx.fillStyle = bgColor;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.font = `700 14px ${font}`;
  ctx.fillStyle = labelColor;
  ctx.textAlign = 'center';
  ctx.fillText(label, x + w/2, y + h/2 + 4);
}

pill(282, 404, 148, 34, 'rgba(196,163,90,0.12)', 'rgba(196,163,90,0.45)', 'LIVE PRICE',    '#C4A35A');
pill(450, 404, 160, 34, 'rgba(0,212,170,0.08)',   'rgba(0,212,170,0.35)',   'WHALE ALERTS',  '#00D4AA');
pill(630, 404, 148, 34, 'rgba(196,163,90,0.12)', 'rgba(196,163,90,0.45)', 'AI INSIGHTS',   '#C4A35A');
pill(798, 404, 120, 34, 'rgba(100,140,255,0.10)', 'rgba(120,160,255,0.4)', 'SDK / MCP',     'rgba(160,190,255,0.95)');

ctx.font = `400 17px ${font}`;
ctx.fillStyle = 'rgba(196,163,90,0.3)';
ctx.textAlign = 'center';
ctx.fillText('kta-oracle.top', W/2, 548);

const buf = canvas.toBuffer('image/png');
writeFileSync(join(__dirname, '..', 'public', 'og2.png'), buf);
console.log('og2.png generated:', W + 'x' + H, Math.round(buf.length/1024) + 'KB');
