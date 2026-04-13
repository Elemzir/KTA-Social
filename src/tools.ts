const TOOLS_CSS = `
html{scroll-behavior:smooth}
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --gold:#C4A35A;--gold-light:#D4B36A;--gold-dim:rgba(196,163,90,0.12);--gold-border:rgba(196,163,90,0.22);
  --bg:#000;--surface:#070707;--surface2:#0d0d0d;--surface3:#111;
  --text:#fff;--muted:#555;--muted2:#888;--accent:#00D4AA;--danger:#ff4d4d;
  --radius:12px
}
html{overflow-x:hidden}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;line-height:1.6;overflow-x:hidden}
a{color:var(--gold);text-decoration:none;transition:color .15s}
a:hover{color:#fff}
svg{display:inline-block;vertical-align:middle;flex-shrink:0;fill:var(--gold)}
.hdr{position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(196,163,90,0.12);background:rgba(0,0,0,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.hdr-inner{max-width:1100px;margin:0 auto;padding:0 28px;height:60px;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:10px;font-size:1rem;font-weight:800;letter-spacing:-0.02em;color:#fff}
.logo-mark{width:28px;height:28px;background:var(--gold);border:1px solid var(--gold);border-radius:7px;display:flex;align-items:center;justify-content:center;color:#000}
.logo em{font-style:normal;color:var(--gold)}
.live-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2s infinite;flex-shrink:0}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.85)}}
.nav{display:flex;align-items:center;gap:6px}
.nav a{color:rgba(255,255,255,0.5);font-size:0.82rem;font-weight:500;padding:6px 11px;border-radius:7px;transition:color .15s,background .15s}
.nav a:hover{color:#fff;background:rgba(255,255,255,0.05)}
.nav a.active{color:#fff;background:rgba(255,255,255,0.07)}
.nav-cta{background:var(--gold)!important;color:#000!important;font-weight:700!important;padding:8px 20px!important;border-radius:8px!important;font-size:0.82rem!important;letter-spacing:0.01em!important;transition:background .15s,transform .12s,box-shadow .15s!important;box-shadow:none!important}
.nav-cta:hover{background:var(--gold-light)!important;color:#000!important;transform:translateY(-1px)!important;box-shadow:0 4px 16px rgba(196,163,90,0.28)!important}
.nav-ai-btn{color:var(--accent)!important;border:1px solid rgba(0,212,170,0.3)!important;border-radius:7px!important;padding:5px 13px!important;font-size:0.82rem!important;font-weight:600!important;transition:color .15s,border-color .15s,background .15s!important}
.nav-ai-btn:hover,.nav-ai-btn.nav-ai-active{background:rgba(0,212,170,0.08)!important;border-color:rgba(0,212,170,0.5)!important;color:var(--accent)!important}
.nav-donate{color:rgba(255,255,255,0.5)!important;transition:color .15s,background .15s!important}
.nav-donate:hover{color:#fff!important;background:rgba(255,255,255,0.05)!important;text-shadow:none!important}
.nav-oracle-pill{display:inline-flex;align-items:center;gap:5px;font-size:0.78rem;font-weight:600;color:rgba(255,255,255,0.55);padding:4px 10px;border:1px solid #1e1e1e;border-radius:6px;transition:color .15s,border-color .15s;white-space:nowrap}
.nav-oracle-pill:hover,.nav-oracle-pill.active{color:var(--gold);border-color:var(--gold-border)}
.nav-guide-pill{display:inline-flex;align-items:center;font-size:0.71rem;font-weight:600;color:rgba(255,255,255,0.38);padding:4px 10px;border:1px solid #1a1a1a;border-radius:6px;transition:color .15s,border-color .15s;white-space:nowrap}
.nav-guide-pill:hover,.nav-guide-pill.active{color:var(--gold);border-color:var(--gold-border)}
.mob-nav .mob-cta{background:var(--gold);color:#000!important;font-weight:800;text-align:center;margin-top:14px;border-radius:10px;padding:15px 16px!important;border:none;display:block;border-bottom:none!important;font-size:0.95rem}
.mob-nav .mob-ai{color:var(--accent)!important;border:1px solid rgba(0,212,170,0.3);border-radius:8px;text-align:center;margin-top:6px;border-bottom:none!important;padding:12px 16px!important;font-weight:600!important}
.mob-nav .mob-donate{color:rgba(255,255,255,0.5)!important}
@media(max-width:480px){.nav-guide-pill{display:none}}
.wrap{max-width:1100px;margin:0 auto;padding:0 28px}
.hero{padding:72px 28px 56px;text-align:center;max-width:740px;margin:0 auto}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold);font-size:0.73rem;font-weight:700;padding:5px 14px;border-radius:100px;margin-bottom:24px;letter-spacing:0.05em;text-transform:uppercase}
.hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;letter-spacing:-0.04em;line-height:1.06;margin-bottom:16px}
.hero h1 em{font-style:normal;color:var(--gold)}
.hero-sub{font-size:0.95rem;color:var(--muted2);max-width:500px;margin:0 auto;line-height:1.7}

.tier-filter{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:48px}
.tfilter{padding:7px 18px;border:1px solid #1a1a1a;border-radius:100px;font-size:0.8rem;font-weight:600;color:var(--muted2);cursor:pointer;background:var(--surface);transition:all .15s}
.tfilter:hover{border-color:var(--gold-border);color:#fff}
.tfilter.active{border-color:var(--gold);background:var(--gold-dim);color:var(--gold)}

.tools-section{margin-bottom:64px}
.ts-header{display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid #111}
.ts-title{font-size:1rem;font-weight:800;letter-spacing:-0.02em}
.ts-badge{display:inline-flex;align-items:center;gap:5px;font-size:0.68rem;font-weight:700;padding:3px 10px;border-radius:6px;letter-spacing:0.05em;text-transform:uppercase}
.tb-free{background:rgba(136,136,136,0.12);color:var(--muted2);border:1px solid #222}
.tb-starter{background:rgba(196,163,90,0.1);color:var(--gold);border:1px solid var(--gold-border)}
.tb-social{background:rgba(0,212,170,0.1);color:var(--accent);border:1px solid rgba(0,212,170,0.25)}
.tb-pro{background:rgba(100,160,255,0.1);color:#64A0FF;border:1px solid rgba(100,160,255,0.25)}
.tb-business{background:rgba(255,100,100,0.1);color:#FF7070;border:1px solid rgba(255,100,100,0.25)}

.tools-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
@media(max-width:860px){.tools-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:540px){.tools-grid{grid-template-columns:1fr}}

.tool-card{background:var(--surface);border:1px solid #111;border-radius:var(--radius);padding:22px;transition:border-color .25s,background .25s,transform .18s,box-shadow .25s;position:relative;overflow:hidden}
.tool-card::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(196,163,90,0.07) 50%,transparent 70%);transform:translateX(-120%);transition:transform 0.55s ease;pointer-events:none}
.tool-card:hover{border-color:var(--gold-border);background:var(--surface2);transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.4)}
.tool-card:hover::after{transform:translateX(120%)}
.tc-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px}
.tc-icon{width:38px;height:38px;border-radius:9px;background:var(--gold-dim);border:1px solid var(--gold-border);display:flex;align-items:center;justify-content:center;color:var(--gold);flex-shrink:0}
.tc-icon.acc{background:rgba(0,212,170,0.1);border-color:rgba(0,212,170,0.25);color:var(--accent)}
.tc-icon.blue{background:rgba(100,160,255,0.1);border-color:rgba(100,160,255,0.2);color:#64A0FF}
.tc-icon.red{background:rgba(255,100,100,0.1);border-color:rgba(255,100,100,0.2);color:#FF7070}
.tc-name{font-size:0.9rem;font-weight:700;margin-bottom:5px;letter-spacing:-0.01em}
.tc-desc{font-size:0.79rem;color:var(--muted2);line-height:1.65}
.tc-endpoint{font-family:'SF Mono','Fira Mono',monospace;font-size:0.7rem;color:var(--muted);margin-top:10px;display:flex;align-items:center;gap:5px}
.tc-method{font-size:0.63rem;font-weight:700;padding:1px 6px;border-radius:3px;text-transform:uppercase;letter-spacing:0.04em}
.mc-get{background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold)}
.mc-post{background:rgba(0,212,170,0.1);border:1px solid rgba(0,212,170,0.2);color:var(--accent)}
.tc-tier-req{margin-top:10px;display:flex;align-items:center;gap:5px}

.tool-soon{position:relative;opacity:0.55;pointer-events:none}
.tool-soon-badge{position:absolute;top:10px;right:10px;background:rgba(255,165,0,0.15);border:1px solid rgba(255,165,0,0.35);color:#FFA040;font-size:0.62rem;font-weight:700;padding:2px 8px;border-radius:4px;letter-spacing:0.06em;text-transform:uppercase;pointer-events:none}
.upgrade-strip{background:var(--surface);border:1px solid var(--gold-border);border-radius:14px;padding:28px 32px;text-align:center;margin-bottom:80px}
.upgrade-strip h3{font-size:1.1rem;font-weight:800;margin-bottom:8px;letter-spacing:-0.02em}
.upgrade-strip p{font-size:0.87rem;color:var(--muted2);margin-bottom:20px;max-width:480px;margin-left:auto;margin-right:auto}
.upgrade-btns{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}
.btn-primary{display:inline-flex;align-items:center;gap:8px;background:var(--gold);color:#000;font-weight:700;font-size:0.88rem;padding:12px 24px;border-radius:10px;transition:background .15s,transform .1s;text-decoration:none;min-height:44px}
.btn-primary:hover{background:var(--gold-light);color:#000;transform:translateY(-1px)}
.btn-ghost{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--gold-border);color:var(--gold);font-size:0.86rem;padding:11px 22px;border-radius:10px;transition:all .2s;text-decoration:none;min-height:44px}
.btn-ghost:hover{border-color:var(--gold);color:#fff;background:var(--gold-dim)}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:48px;text-align:center}
.ai-section{background:var(--surface);border:1px solid rgba(0,212,170,0.2);border-radius:16px;padding:32px;margin-bottom:48px}
.ai-section-head{display:flex;align-items:flex-start;gap:12px;margin-bottom:20px;flex-wrap:wrap}
.ai-connect-btn{background:var(--accent);color:#000;border:none;padding:10px 20px;border-radius:8px;font-weight:700;font-size:0.83rem;cursor:pointer;white-space:nowrap;font-family:inherit;flex-shrink:0;min-height:44px}
.ai-wallet-inp{width:100%;background:var(--surface2);border:1px solid #1a1a1a;border-radius:6px;color:#fff;padding:11px 12px;font-size:0.82rem;outline:none;font-family:monospace;box-sizing:border-box;min-height:44px}

.footer{border-top:1px solid #080808;padding:36px 28px;text-align:center;color:var(--muted);font-size:0.76rem}
.footer-links{display:flex;justify-content:center;gap:28px;margin-bottom:12px;flex-wrap:wrap}
.footer-links a{color:var(--muted2);transition:color .15s}
.footer-links a:hover{color:var(--gold)}
.live-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2s infinite;display:inline-block}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.85)}}

body{overflow-x:hidden}html{overflow-x:hidden}
.hbg{display:none;background:none;border:none;cursor:pointer;padding:8px;flex-direction:column;gap:5px;justify-content:center;align-items:center;flex-shrink:0}
.hbg span{display:block;width:20px;height:2px;background:var(--muted2);border-radius:2px;transition:all .25s}
.hbg.is-open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.hbg.is-open span:nth-child(2){opacity:0}
.hbg.is-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
.mob-nav{display:none;position:fixed;top:60px;left:0;right:0;bottom:0;background:rgba(0,0,0,0.97);padding:16px 20px 40px;z-index:998;flex-direction:column;gap:0;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);overflow-y:auto}
.mob-nav.is-open{display:flex}
.mob-nav a{display:block;padding:14px 16px;color:var(--muted2);font-size:0.95rem;font-weight:500;border-radius:10px;transition:color .15s,background .15s;border-bottom:1px solid #0d0d0d}
.mob-nav a.mob-active{color:var(--gold);background:rgba(196,163,90,0.08)}
.mob-nav .mob-cta{background:var(--gold);color:#000!important;font-weight:800;text-align:center;margin-top:14px;border-radius:20px;padding:15px 16px!important;border:none;display:block;border-bottom:none!important}
@media(max-width:860px){.ai-intg-grid{grid-template-columns:1fr 1fr!important}}
@media(max-width:640px){.ai-intg-grid{grid-template-columns:1fr!important}}
@media(max-width:768px){
  .wrap{padding:0 20px}
  .hdr-inner{padding:0 20px}
  .tools-grid{grid-template-columns:repeat(2,1fr)}
  .hero{padding:48px 20px 36px}
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .ai-section{padding:22px 18px}
}
@media(max-width:640px){
  .wrap{padding:0 16px}
  .hero{padding:40px 16px 30px}
  .hdr-inner{padding:0 16px}
  .hero h1{font-size:clamp(1.8rem,6vw,2.6rem)}
  .hbg{display:flex}
  .nav a{display:none!important}
  .tools-grid{grid-template-columns:repeat(2,1fr);gap:8px}
  .tool-card{padding:16px}
  .tc-name{font-size:0.84rem}
  .tc-desc{font-size:0.75rem}
  .upgrade-strip{padding:22px 16px}
  .upgrade-btns{flex-direction:column;align-items:stretch}
  .upgrade-btns .btn-primary,.upgrade-btns .btn-ghost{width:100%;justify-content:center}
  .btn-ghost{margin-left:0}
  .tier-filter{gap:6px}
  .tfilter{padding:10px 14px;font-size:0.8rem;min-height:44px}
  .stats-grid{grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:32px}
  .ai-section{padding:18px 14px}
  .ai-connect-btn{width:100%;justify-content:center}
  .ai-section-head{gap:10px}
}
@media(max-width:480px){
  .hero h1{font-size:1.85rem}
  .hero-sub{font-size:0.86rem}
  .tools-grid{grid-template-columns:1fr}
  .tool-card{padding:18px}
  .tier-filter{flex-wrap:wrap;gap:5px}
  .tfilter{padding:5px 11px;font-size:0.74rem}
  .upgrade-strip{padding:18px 14px}
  .upgrade-strip h3{font-size:0.95rem}
}
@media(max-width:380px){
  .hero h1{font-size:1.6rem}
  .hero-sub{font-size:0.82rem}
  .tools-grid{grid-template-columns:1fr}
  .tool-card{padding:14px}
}
`;

function si(path: string, size = 18): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

interface ToolDef {
  name:       string;
  desc:       string;
  endpoint:   string;
  method:     "GET" | "POST";
  tier:       "free" | "starter" | "social" | "pro" | "business";
  iconPath:   string;
  iconCls?:   string;
  comingSoon?: boolean;
}

const TOOLS: ToolDef[] = [
  {
    name: "Live Price Feed",
    desc: "Real-time KTA/USD price pulled directly from Keeta Network's FX anchor. Includes 1h, 24h, and 7-day change percentages. Sub-second latency, no third-party intermediaries.",
    endpoint: "/price",
    method: "GET",
    tier: "free",
    iconPath: '<polyline points="4 17 9 10 13 14 17 7 21 10"/><circle cx="21" cy="10" r="1.5" fill="currentColor" stroke="none"/>',
  },
  {
    name: "Multi-currency FX Rate",
    desc: "Convert KTA to any fiat currency — 160+ currencies supported including all major ISO 4217 codes. Uses the live oracle price with real-time FX conversion. Ideal for payment cost calculations across Keeta's 200+ country reach.",
    endpoint: "/rate?currency=",
    method: "GET",
    tier: "free",
    iconPath: '<circle cx="12" cy="12" r="10"/><path d="M9 8h4.5a2.5 2.5 0 0 1 0 5H9v0h5a2.5 2.5 0 0 1 0 5H9"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="18" x2="12" y2="20"/>',
  },
  {
    name: "Social Alert Delivery",
    desc: "Price alerts pushed to Discord (rich embeds), Telegram, Slack, or X/Twitter. Configure frequency from 5 minutes to daily digest, or trigger on price moves from ±5% to ±25%. Free trial gives 100 alerts — lifetime social from 50 KTA.",
    endpoint: "/register",
    method: "POST",
    tier: "free",
    iconPath: '<path d="M4 10a8 8 0 0 1 16 0"/><path d="M7 12.5a5 5 0 0 1 10 0"/><line x1="12" y1="15" x2="12" y2="21"/><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/>',
  },
  {
    name: "Subscription Status",
    desc: "Look up any wallet's current tier, alert count, expiry date, and remaining API quota. Used by AI agents to check access before making requests. No authentication required.",
    endpoint: "/status?wallet=",
    method: "GET",
    tier: "free",
    iconPath: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
  },
  {
    name: "Whale Movement Alerts",
    desc: "On-chain KTA movements classified as whale (100K+ KTA), institutional (1M+ KTA), or mega-whale (10M+ KTA). Settlement-confirmed before alert fires. Starter: 3/month. Social+: unlimited.",
    endpoint: "/whale/alerts",
    method: "GET",
    tier: "starter",
    iconPath: '<path d="M4 13c1-4 4-6 8-6 2.5 0 4.5 1 6 3l2-3 .5 5-4.5-.5c.3 1 .5 2 .5 3 0 4-3 6-7 6a7 7 0 0 1-3-1C4 18 3 15 4 13z"/>',
    iconCls: "acc",
  },
  {
    name: "AI Market Insights",
    desc: "Every alert carries an AI-generated insight on trend phase, volume conviction, and payment timing. Powered by fast LLM inference on Keeta price data. Preview available on Starter — full access from Social.",
    endpoint: "embedded in alerts",
    method: "GET",
    tier: "starter",
    iconPath: '<path d="M9 3H7a2 2 0 0 0-2 2v2"/><path d="M15 3h2a2 2 0 0 1 2 2v2"/><path d="M9 21H7a2 2 0 0 1-2-2v-2"/><path d="M15 21h2a2 2 0 0 0 2-2v-2"/><rect x="9" y="9" width="6" height="6" rx="1"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>',
    iconCls: "acc",
  },
  {
    name: "Portfolio Value Calculator",
    desc: "Returns the live KTA rate in any target currency. Multiply the returned price by your KTA holdings to get current portfolio value in fiat. Useful for treasury reporting and automated position monitoring.",
    endpoint: "/rate?currency=",
    method: "GET",
    tier: "starter",
    iconPath: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    iconCls: "acc",
  },
  {
    name: "Compliance Screening",
    desc: "Screen a wallet address against flagged activity patterns on Keeta Network. Returns risk classification and last-seen activity. Essential for operators running payment flows or treasury operations.",
    endpoint: "/compliance/screen",
    method: "POST",
    tier: "pro",
    iconPath: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    iconCls: "blue",
  },
  {
    name: "Transaction History",
    desc: "Full on-chain transaction history for any Keeta wallet. Paginated by staple. Returns amounts, counterparties, timestamps, and settlement status. Required for reconciliation and audit trails.",
    endpoint: "/wallet/history",
    method: "GET",
    tier: "pro",
    iconPath: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    iconCls: "blue",
  },
  {
    name: "Wallet Scoring",
    desc: "Risk and activity score for any Keeta wallet address. Factors: transaction volume, frequency, counterparty network, and age. Returns a 0–100 score with classification label.",
    endpoint: "/wallet/score",
    method: "GET",
    tier: "pro",
    iconPath: '<path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z"/>',
    iconCls: "blue",
  },
  {
    name: "On-chain Analytics",
    desc: "Aggregate network-level metrics: active wallets, daily settlement volume, token velocity, and KTA circulation. Useful for market research, treasury planning, and DeFi integrations.",
    endpoint: "/analytics/network",
    method: "GET",
    tier: "pro",
    iconPath: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    iconCls: "blue",
  },
  {
    name: "Network Health Monitor",
    desc: "Real-time Keeta Network status: settlement latency, validator count, pending staples, and anomaly flags. Use this before executing high-value payment flows or batch operations.",
    endpoint: "/network/health",
    method: "GET",
    tier: "pro",
    iconPath: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    iconCls: "blue",
  },
  {
    name: "KYC Verification",
    desc: "Initiate and verify identity via Keeta's native KYC anchor service. Returns verification status and supported jurisdictions. Required for regulated payment corridors and compliant treasury ops.",
    endpoint: "/kyc/verify",
    method: "POST",
    tier: "business",
    iconPath: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><path d="M19 8l1.5 1.5L23 7"/>',
    iconCls: "red",
  },
  {
    name: "Certificate Operations",
    desc: "Full access to Keeta's MANAGE_CERTIFICATE block operations. Build, sign, and verify DER-encoded certificates on-chain. Used for identity attestation, credential issuance, and multi-party authorization.",
    endpoint: "/certificate/manage",
    method: "POST",
    tier: "business",
    iconPath: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    iconCls: "red",
  },
  {
    name: "Identity Resolution",
    desc: "Resolve Keeta usernames to wallet addresses and vice versa via the Username anchor service. Search by username prefix, claim availability check, and reverse lookup for display names.",
    endpoint: "/identity/resolve",
    method: "GET",
    tier: "business",
    iconPath: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    iconCls: "red",
  },
  {
    name: "Encrypted Container Operations",
    desc: "Create and decrypt encrypted containers on Keeta Network. Encode plaintext into sealed on-chain containers, decrypt with authorized keys. Enables private data attestation and confidential agreement workflows.",
    endpoint: "/container/seal",
    method: "POST",
    tier: "business",
    iconPath: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    iconCls: "red",
  },
  {
    name: "Batch Transaction Builder",
    desc: "Construct atomic multi-operation transactions using Keeta's BlockBuilder. Combine sends, burns, mints, and state updates into a single staple. Guarantees all-or-nothing execution at network level.",
    endpoint: "/batch/build",
    method: "POST",
    tier: "business",
    iconPath: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>',
    iconCls: "red",
  },
  {
    name: "Live SSE Stream",
    desc: "Server-Sent Events stream delivering real-time KTA price updates. Connect Claude, ChatGPT, or any AI assistant directly to live market data. Reconnects every 15 seconds. Requires a registered wallet.",
    endpoint: "/stream?wallet=",
    method: "GET",
    tier: "free",
    iconPath: '<path d="M4 10a8 8 0 0 1 16 0"/><path d="M7 12.5a5 5 0 0 1 10 0"/><line x1="12" y1="15" x2="12" y2="21"/><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/>',
  },
  {
    name: "Permission Management",
    desc: "Query and update Keeta account permissions: ACCESS, ADMIN, OWNER, UPDATE_INFO, and custom external rules. Useful for multi-key treasury setups, DAO-style governance, and delegated operator configurations.",
    endpoint: "/permissions/manage",
    method: "POST",
    tier: "business",
    iconPath: '<circle cx="8" cy="13" r="4"/><line x1="12" y1="13" x2="22" y2="13"/><line x1="19" y1="13" x2="19" y2="16"/><line x1="22" y1="13" x2="22" y2="16"/>',
    iconCls: "red",
  },
];

const TIER_SECTIONS = [
  { id: "free",     label: "Free",     min: "0.1 KTA",  badgeCls: "tb-free",     tools: TOOLS.filter(t => t.tier === "free") },
  { id: "starter",  label: "Starter",  min: "10 KTA",   badgeCls: "tb-starter",  tools: TOOLS.filter(t => t.tier === "starter") },
  { id: "social",   label: "Social",   min: "50 KTA",   badgeCls: "tb-social",   tools: [] },
  { id: "pro",      label: "Pro",      min: "300 KTA",  badgeCls: "tb-pro",      tools: TOOLS.filter(t => t.tier === "pro") },
  { id: "business", label: "Business", min: "600 KTA",  badgeCls: "tb-business", tools: TOOLS.filter(t => t.tier === "business") },
];

function toolCard(t: ToolDef): string {
  const badge = `<span class="ts-badge ${
    t.tier === "free" ? "tb-free" : t.tier === "starter" ? "tb-starter" : t.tier === "social" ? "tb-social" : t.tier === "pro" ? "tb-pro" : "tb-business"
  }">${t.tier}</span>`;
  const soonBadge = t.comingSoon ? `<span class="tool-soon-badge">In Development</span>` : "";
  return `
<div class="tool-card${t.comingSoon ? " tool-soon" : ""}">
  ${soonBadge}
  <div class="tc-head">
    <div>
      <div class="tc-name">${t.name}</div>
      <div class="tc-tier-req">${badge}</div>
    </div>
    <div class="tc-icon${t.iconCls ? " " + t.iconCls : ""}">${si(t.iconPath)}</div>
  </div>
  <div class="tc-desc">${t.desc}</div>
  <div class="tc-endpoint">
    <span class="tc-method ${t.method === "GET" ? "mc-get" : "mc-post"}">${t.method}</span>
    ${t.endpoint}
  </div>
</div>`;
}

export function renderTools(appUrl: string): string {
  const totalTools = TOOLS.length;
  const freeTools = TOOLS.filter(t => t.tier === "free").length;
  const starterTools = TOOLS.filter(t => t.tier === "free" || t.tier === "starter").length;
  const proTools = TOOLS.filter(t => ["free","starter","pro"].includes(t.tier)).length;
  const bizTools = TOOLS.length;

  const allToolCards = TOOLS.map(t => toolCard(t)).join("");

  const sectionHtml = TIER_SECTIONS.filter(s => s.tools.length > 0).map(s => `
<div class="tools-section" id="sec-${s.id}">
  <div class="ts-header">
    <div class="ts-title">${s.label} tier</div>
    <div class="ts-badge ${s.badgeCls}">${s.min}</div>
    <div style="margin-left:auto;font-size:0.78rem;color:var(--muted2)">${s.id === "free" ? "Included with Free" : `Requires ${s.min}`}</div>
  </div>
  <div class="tools-grid">
    ${s.tools.map(t => toolCard(t)).join("")}
  </div>
</div>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Tools — KTA Oracle</title>
<meta name="description" content="All ${totalTools} KTA Oracle tools. From live price feeds to certificate management — each tool mapped to the tier that unlocks it.">
<meta property="og:type" content="website"><meta property="og:url" content="${appUrl}/tools"><meta property="og:title" content="Tools — KTA Oracle"><meta property="og:description" content="Real-time KTA price alerts, whale tracking, and AI insights — delivered to Discord, Telegram, Slack, and X/Twitter."><meta property="og:image" content="${appUrl}/og2.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${appUrl}/og2.png">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${TOOLS_CSS}</style>
</head>
<body>
<header class="hdr">
  <div class="hdr-inner">
    <div style="display:flex;align-items:center;gap:8px">
      <a href="/onboard" class="logo">
        <div class="logo-mark"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#000"/></svg></div>
        KTA <em>Oracle</em>
      </a>
      <div style="width:1px;height:16px;background:#1e1e1e;margin:0 2px;flex-shrink:0"></div>
      <a href="/oracle" class="nav-oracle-pill"><span class="live-dot" style="width:5px;height:5px;flex-shrink:0"></span>Oracle</a>
      <a href="/guide" class="nav-guide-pill">Guide</a>
    </div>
    <nav class="nav">
      <a href="/onboard">Onboard</a>
      <a href="/checkout">Pricing</a>
      <a href="/tools" class="active">Tools</a>
      <a href="/donate" class="nav-donate">Donate</a>
      <a href="/tools#ai" class="nav-ai-btn nav-ai-active">Connect AI</a>
      <a href="/checkout" class="nav-cta">Get access →</a>
    </nav>
    <button class="hbg" id="hbg-btn" onclick="toggleMobNav()" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</header>
<nav class="mob-nav" id="mob-nav">
  <a href="/oracle">Oracle</a>
  <a href="/onboard">Onboard</a>
  <a href="/guide">Guide</a>
  <a href="/checkout">Pricing</a>
  <a href="/tools" class="mob-active">Tools</a>
  <a href="/donate" class="mob-donate">Donate</a>
  <a href="/tools#ai" class="mob-ai">Connect AI</a>
  <a href="/checkout" class="mob-cta">Get access →</a>
</nav>
<script>
function toggleMobNav(){var b=document.getElementById('hbg-btn'),m=document.getElementById('mob-nav');if(!b||!m)return;b.classList.toggle('is-open');m.classList.toggle('is-open');}
document.addEventListener('click',function(e){var m=document.getElementById('mob-nav'),b=document.getElementById('hbg-btn');if(!m||!m.classList.contains('is-open'))return;if(!m.contains(e.target)&&(!b||!b.contains(e.target))){m.classList.remove('is-open');if(b)b.classList.remove('is-open');}});
</script>

<section class="hero">
  <div class="hero-eyebrow">${si('<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>', 14)} ${totalTools} tools · Keeta Network SDK</div>
  <h1>Every tool,<br><em>mapped to your tier.</em></h1>
  <p class="hero-sub">From live price data to on-chain certificate operations — each tool is production-ready and built on the Keeta Network SDK. Unlock more as you go deeper.</p>
</section>

<div class="wrap">
  <div class="stats-grid">
    <div style="background:var(--surface);border:1px solid #111;border-radius:10px;padding:18px 12px">
      <div style="font-size:1.5rem;font-weight:800;color:#fff;margin-bottom:4px">${freeTools}</div>
      <div style="font-size:0.75rem;color:var(--muted2)">Free tools</div>
    </div>
    <div style="background:var(--surface);border:1px solid var(--gold-border);border-radius:10px;padding:18px 12px">
      <div style="font-size:1.5rem;font-weight:800;color:var(--gold);margin-bottom:4px">${starterTools}</div>
      <div style="font-size:0.75rem;color:var(--muted2)">Starter+ tools</div>
    </div>
    <div style="background:var(--surface);border:1px solid rgba(100,160,255,0.25);border-radius:10px;padding:18px 12px">
      <div style="font-size:1.5rem;font-weight:800;color:#64A0FF;margin-bottom:4px">${proTools}</div>
      <div style="font-size:0.75rem;color:var(--muted2)">Pro+ tools</div>
    </div>
    <div style="background:var(--surface);border:1px solid rgba(255,100,100,0.2);border-radius:10px;padding:18px 12px">
      <div style="font-size:1.5rem;font-weight:800;color:#FF7070;margin-bottom:4px">${bizTools}</div>
      <div style="font-size:0.75rem;color:var(--muted2)">Business tools</div>
    </div>
  </div>

  ${sectionHtml}

  <div id="ai" class="ai-section">
    <div class="ai-section-head">
      <div style="width:40px;height:40px;border-radius:10px;background:rgba(0,212,170,0.1);border:1px solid rgba(0,212,170,0.25);display:flex;align-items:center;justify-content:center;color:var(--accent);flex-shrink:0;margin-top:2px">${si('<path d="M9 3H7a2 2 0 0 0-2 2v2"/><path d="M15 3h2a2 2 0 0 1 2 2v2"/><path d="M9 21H7a2 2 0 0 1-2-2v-2"/><path d="M15 21h2a2 2 0 0 0 2-2v-2"/><rect x="9" y="9" width="6" height="6" rx="1"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>')}</div>
      <div style="flex:1;min-width:200px">
        <div style="font-size:1rem;font-weight:800;letter-spacing:-0.02em">Connect any AI — Claude, ChatGPT, Gemini &amp; more</div>
        <div style="font-size:0.8rem;color:var(--muted2);margin-top:4px">Live KTA data via SSE stream or REST. Works with Claude, ChatGPT, Gemini, DeepSeek, Grok, Mistral, and any AI that can call an HTTP endpoint. Registration required.</div>
      </div>
      <button onclick="toggleAiPanel()" class="ai-connect-btn">Connect AI →</button>
    </div>
    <div id="ai-panel" style="display:none">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px" class="ai-intg-grid">
        <div style="background:var(--surface2);border:1px solid #1a1a1a;border-radius:10px;padding:16px">
          <div style="font-size:0.78rem;font-weight:700;margin-bottom:8px;color:#C4A35A">Claude · Gemini · Grok</div>
          <div style="font-size:0.73rem;color:var(--muted2);line-height:1.65;margin-bottom:10px">Use tool-use / function-calling API. Pass the Oracle REST endpoints as tools. The SSE stream gives live price pushes — connect via EventSource in your system prompt or tool config.</div>
          <code style="font-family:monospace;font-size:0.67rem;color:var(--accent);background:#050505;border:1px solid #1a1a1a;border-radius:6px;padding:5px 9px;display:block;word-break:break-all">GET /stream?wallet=your_wallet</code>
        </div>
        <div style="background:var(--surface2);border:1px solid #1a1a1a;border-radius:10px;padding:16px">
          <div style="font-size:0.78rem;font-weight:700;margin-bottom:8px;color:#C4A35A">ChatGPT · DeepSeek · Mistral</div>
          <div style="font-size:0.73rem;color:var(--muted2);line-height:1.65;margin-bottom:10px">Set up Custom GPT Actions or OpenAPI tool definitions. Declare the /price and /rate endpoints as actions — no API key needed for public data endpoints.</div>
          <code style="font-family:monospace;font-size:0.67rem;color:var(--gold);background:#050505;border:1px solid #1a1a1a;border-radius:6px;padding:5px 9px;display:block;word-break:break-all">GET /price · GET /rate?currency=USD</code>
        </div>
        <div style="background:var(--surface2);border:1px solid #1a1a1a;border-radius:10px;padding:16px">
          <div style="font-size:0.78rem;font-weight:700;margin-bottom:8px;color:#C4A35A">MCP / Agent frameworks</div>
          <div style="font-size:0.73rem;color:var(--muted2);line-height:1.65;margin-bottom:10px">Integrate with LangChain, AutoGPT, CrewAI, or any MCP-compatible host. All endpoints return clean JSON. The /stream endpoint follows SSE spec — auto-reconnects every 15s.</div>
          <code style="font-family:monospace;font-size:0.67rem;color:var(--muted2);background:#050505;border:1px solid #1a1a1a;border-radius:6px;padding:5px 9px;display:block;word-break:break-all">Content-Type: text/event-stream</code>
        </div>
      </div>
      <div style="background:#050505;border:1px solid #1a1a1a;border-radius:8px;padding:14px 16px">
        <div style="font-size:0.72rem;font-weight:700;color:var(--muted2);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.06em">Generate your connection string</div>
        <input id="ai-wallet-inp" class="ai-wallet-inp" placeholder="Paste your registered wallet (keeta_…)" oninput="buildSSE(this.value)">
        <code id="ai-conn-str" style="font-family:monospace;font-size:0.7rem;color:var(--muted2);margin-top:10px;display:block;line-height:1.8;white-space:pre-wrap;word-break:break-all">Enter your wallet above to generate the connection string</code>
      </div>
    </div>
  </div>

  <div class="upgrade-strip">
    <h3>Need Business-tier tools?</h3>
    <p>600 KTA unlocks all ${bizTools} tools including KYC verification, certificate operations, batch transactions, and the full Keeta SDK surface. Plus lifetime social alerts and priority API queue.</p>
    <div class="upgrade-btns">
      <a href="/checkout" class="btn-primary">${si('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/>')} View plans</a>
      <a href="/onboard" class="btn-ghost">Start free</a>
    </div>
  </div>

<script>
function toggleAiPanel(){
  var p=document.getElementById('ai-panel');
  if(p)p.style.display=p.style.display==='none'?'block':'none';
}
function buildSSE(wallet){
  var el=document.getElementById('ai-conn-str');
  if(!el)return;
  if(!wallet||!wallet.startsWith('keeta_')){el.textContent='Enter your wallet to generate the connection string';el.style.color='var(--muted2)';return;}
  var base=window.location.origin;
  el.textContent='SSE:  '+base+'/stream?wallet='+wallet+'\\nREST: '+base+'/price\\n      '+base+'/rate?currency=USD&wallet='+wallet;
  el.style.color='var(--accent)';
}
</script>
</div>

<footer class="footer">
  <div class="footer-links">
    <a href="/onboard">Onboard</a>
    <a href="/checkout">Pricing</a>
    <a href="/tools">Tools</a>
    <a href="/legal">Legal</a>
    <a href="/privacy">Privacy</a>
    <a href="https://keeta.com" target="_blank" rel="noopener">Keeta Network</a>
  </div>
  <div style="color:var(--muted)">
    KTA Oracle Agent &nbsp;·&nbsp; Built on Keeta Network SDK &nbsp;·&nbsp; Sweden, EU
  </div>
  <div style="margin-top:10px;color:var(--muted);font-size:0.71rem;letter-spacing:0.03em">&copy; 2026 ELEMZIR. All rights reserved.</div>
</footer>
</body>
</html>`;
}
