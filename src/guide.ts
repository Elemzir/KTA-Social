import { BASE_CSS } from './onboard.js';

export function renderGuide(appUrl: string): string {
  const base = appUrl || '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Guide — KTA Oracle</title>
<meta name="description" content="Complete guide to KTA Oracle — for individuals, businesses, and AI agents. Every tool explained, AI connector setup, and integration patterns.">
<meta property="og:type" content="website"><meta property="og:url" content="${base}/guide"><meta property="og:title" content="Guide — KTA Oracle"><meta property="og:description" content="Real-time KTA price alerts, whale tracking, and AI insights — delivered to Discord, Telegram, Slack, and X/Twitter."><meta property="og:image" content="${base}/og2.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${base}/og2.png">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${BASE_CSS}
.guide-hero{text-align:center;padding:88px 28px 60px;max-width:700px;margin:0 auto}
.guide-hero h1{font-size:clamp(2rem,5vw,3rem);font-weight:800;letter-spacing:-0.04em;line-height:1.1;margin-bottom:14px}
.guide-hero h1 em{font-style:normal;color:var(--gold)}
.guide-hero p{font-size:0.97rem;color:var(--muted2);line-height:1.8;max-width:520px;margin:0 auto}
.audience-tabs{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:36px 0 0}
.atab{padding:8px 20px;border-radius:20px;border:1px solid #1c1c1c;font-size:0.8rem;font-weight:600;color:var(--muted2);cursor:pointer;transition:all .2s;background:transparent;font-family:inherit}
.atab:hover{color:#fff;border-color:#333}
.atab.active{background:var(--gold-dim);border-color:var(--gold-border);color:var(--gold)}
.guide-wrap{max-width:860px;margin:0 auto;padding:0 28px 80px}
.guide-section{margin-bottom:64px}
.gs-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--gold);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.gs-label::after{content:'';flex:1;height:1px;background:rgba(196,163,90,0.12)}
.gs-title{font-size:1.5rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:8px}
.gs-sub{font-size:0.88rem;color:var(--muted2);line-height:1.75;margin-bottom:28px;max-width:640px}
.step-list{display:flex;flex-direction:column;gap:18px}
.step{display:flex;gap:16px;align-items:flex-start}
.step-num{width:30px;height:30px;border-radius:50%;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold);font-size:0.78rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.step-body h4{font-size:0.9rem;font-weight:700;margin-bottom:4px;color:#fff}
.step-body p{font-size:0.82rem;color:var(--muted2);line-height:1.7}
.step-body a{color:var(--gold)}
.card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-bottom:28px}
.guide-card{background:var(--surface);border:1px solid #111;border-radius:12px;padding:22px;transition:border-color .2s}
.guide-card:hover{border-color:var(--gold-border)}
.gc-icon{width:36px;height:36px;border-radius:8px;background:var(--gold-dim);border:1px solid var(--gold-border);display:flex;align-items:center;justify-content:center;color:var(--gold);margin-bottom:14px}
.gc-title{font-size:0.9rem;font-weight:700;margin-bottom:6px}
.gc-desc{font-size:0.79rem;color:var(--muted2);line-height:1.65}
.code-block{background:var(--surface2);border:1px solid #1a1a1a;border-radius:10px;padding:16px 20px;font-family:'Menlo','Monaco',monospace;font-size:0.78rem;color:#aaa;overflow-x:auto;white-space:pre;margin:14px 0}
.code-block .hl{color:var(--gold)}
.code-block .cm{color:#444}
.tool-table{display:flex;flex-direction:column;gap:8px}
.tool-row{background:var(--surface);border:1px solid #111;border-radius:10px;padding:14px 18px;display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;transition:border-color .2s}
.tool-row:hover{border-color:var(--gold-border)}
.tr-badge{font-size:0.66rem;font-weight:700;padding:2px 8px;border-radius:4px;letter-spacing:0.05em;text-transform:uppercase;white-space:nowrap}
.tb-free{background:rgba(136,136,136,0.1);color:var(--muted2);border:1px solid #222}
.tb-starter{background:var(--gold-dim);color:var(--gold);border:1px solid var(--gold-border)}
.tb-pro{background:rgba(100,160,255,0.1);color:#64A0FF;border:1px solid rgba(100,160,255,0.2)}
.tb-business{background:rgba(255,100,100,0.1);color:#FF7070;border:1px solid rgba(255,100,100,0.2)}
.tr-name{font-size:0.85rem;font-weight:700;color:#fff;margin-bottom:3px}
.tr-desc{font-size:0.76rem;color:var(--muted2);line-height:1.5}
.tr-endpoint{font-family:'Menlo','Monaco',monospace;font-size:0.72rem;color:var(--accent);text-align:right;white-space:nowrap}
.tr-method{display:inline-block;font-size:0.62rem;font-weight:700;padding:1px 6px;border-radius:3px;margin-right:4px;letter-spacing:0.05em}
.m-get{background:rgba(0,212,170,0.1);color:var(--accent);border:1px solid rgba(0,212,170,0.22)}
.m-post{background:rgba(100,160,255,0.1);color:#64A0FF;border:1px solid rgba(100,160,255,0.2)}
.info-box{background:rgba(196,163,90,0.06);border:1px solid rgba(196,163,90,0.18);border-radius:10px;padding:16px 20px;font-size:0.82rem;color:var(--muted2);line-height:1.75;margin:14px 0}
.info-box strong{color:var(--gold)}
.audience-section{display:none}.audience-section.show{display:block}
.section-divider{border:none;border-top:1px solid #0d0d0d;margin:48px 0}
.ptab-row{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 24px}
.ptab{padding:7px 18px;border-radius:20px;border:1px solid #1c1c1c;font-size:0.79rem;font-weight:600;color:var(--muted2);cursor:pointer;transition:all .2s;background:transparent;font-family:inherit}
.ptab:hover{color:#fff;border-color:#333}
.ptab.active{background:var(--gold-dim);border-color:var(--gold-border);color:var(--gold)}
.pg{display:none}.pg.show{display:block}
.trigger-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:16px 0}
.trig-card{background:var(--surface);border:1px solid #111;border-radius:12px;padding:18px 20px}
.trig-card h5{font-size:0.88rem;font-weight:700;margin-bottom:10px;color:var(--gold)}
.trig-row{display:flex;align-items:baseline;gap:10px;padding:6px 0;border-bottom:1px solid #0d0d0d;font-size:0.79rem}
.trig-row:last-child{border-bottom:none}
.trig-key{color:#fff;font-weight:700;min-width:44px;flex-shrink:0}
.trig-val{color:var(--muted2);line-height:1.5}
@media(max-width:600px){.trigger-grid{grid-template-columns:1fr}}
@media(max-width:640px){.tool-row{grid-template-columns:1fr;gap:6px}.tr-endpoint{text-align:left}}
@media(max-width:640px){
  .guide-hero{padding:60px 16px 36px}
  .guide-wrap{padding:0 16px 60px}
  .audience-tabs{gap:6px;margin:24px 0 0}
  .atab{font-size:0.74rem;padding:7px 14px}
  .gs-title{font-size:1.2rem}
  .card-grid{grid-template-columns:1fr}
  .guide-section{margin-bottom:44px}
  .step-list{gap:14px}
}
@media(max-width:480px){
  .guide-hero h1{font-size:1.8rem}
  .atab{font-size:0.7rem;padding:6px 12px}
}
</style>
</head>
<body>
<header class="hdr">
  <div class="hdr-inner">
    <div style="display:flex;align-items:center;gap:8px">
      <a href="/onboard" class="logo">
        <div class="logo-mark"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/></svg></div>
        KTA <em>Oracle</em>
      </a>
      <div style="width:1px;height:16px;background:#1e1e1e;margin:0 2px;flex-shrink:0"></div>
      <a href="/oracle" class="nav-oracle-pill"><span class="live-dot" style="width:5px;height:5px;flex-shrink:0"></span>Oracle</a>
      <a href="/guide" class="nav-guide-pill active">Guide</a>
    </div>
    <nav class="nav">
      <a href="/onboard">Onboard</a>
      <a href="/checkout">Pricing</a>
      <a href="/tools">Tools</a>
      <a href="/donate" class="nav-donate">Donate</a>
      <a href="/tools#ai" class="nav-ai-btn">Connect AI</a>
      <a href="/checkout" class="nav-cta">Get access →</a>
    </nav>
    <button class="hbg" id="hbg-btn" onclick="toggleMobNav()" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</header>
<nav class="mob-nav" id="mob-nav">
  <a href="/oracle">Oracle</a>
  <a href="/onboard">Onboard</a>
  <a href="/guide" class="mob-active">Guide</a>
  <a href="/checkout">Pricing</a>
  <a href="/tools">Tools</a>
  <a href="/donate" class="mob-donate">Donate</a>
  <a href="/tools#ai" class="mob-ai">Connect AI</a>
  <a href="/checkout" class="mob-cta">Get access →</a>
</nav>
<script>
function toggleMobNav(){var b=document.getElementById('hbg-btn'),m=document.getElementById('mob-nav');if(!b||!m)return;b.classList.toggle('is-open');m.classList.toggle('is-open');}
document.addEventListener('click',function(e){var m=document.getElementById('mob-nav'),b=document.getElementById('hbg-btn');if(!m||!m.classList.contains('is-open'))return;if(!m.contains(e.target)&&(!b||!b.contains(e.target))){m.classList.remove('is-open');if(b)b.classList.remove('is-open');}});
</script>

<div class="guide-hero">
  <div style="display:inline-flex;align-items:center;gap:8px;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold);font-size:0.72rem;font-weight:700;padding:5px 14px;border-radius:100px;margin-bottom:24px;letter-spacing:0.05em;text-transform:uppercase">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    Complete Guide
  </div>
  <h1>KTA Oracle — <em>How to Use</em></h1>
  <p>Everything you need — from registering your first wallet to integrating live Keeta Network data into AI agents and production systems.</p>
  <div class="audience-tabs">
    <button class="atab active" onclick="showAudience('all',this)">Everyone</button>
    <button class="atab" onclick="showAudience('individual',this)">Individuals</button>
    <button class="atab" onclick="showAudience('business',this)">Businesses</button>
    <button class="atab" onclick="showAudience('ai',this)">AI Agents</button>
  </div>
</div>

<div class="guide-wrap">

<div class="audience-section show" id="aud-all">

  <div class="guide-section">
    <div class="gs-label">Start here</div>
    <div class="gs-title">Getting started</div>
    <div class="gs-sub">Three steps to go from zero to a fully active Oracle subscription. Every tier — including Free — starts exactly here.</div>
    <div class="step-list">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h4>Get a Keeta wallet &amp; buy KTA</h4>
          <p>Download <a href="https://wallet.keeta.com" target="_blank">Keeta Wallet</a> (Visa Direct, 0.4s settlement) or buy KTA on <a href="https://www.coinbase.com/price/base-keeta-8973" target="_blank">Coinbase</a>, <a href="https://www.kraken.com/learn/buy-keeta-kta" target="_blank">Kraken</a>, or swap via <a href="https://phantom.com/tokens/base/0xc0634090f2fe6c6d75e61be2b949464abb498973" target="_blank">Phantom</a>. You need a <code style="color:var(--gold);font-size:0.8em">keeta_</code> format wallet address for registration.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h4>Register at /onboard (Free — 0.1 KTA)</h4>
          <p>Visit <a href="${base}/onboard">/onboard</a>, enter your <code style="color:var(--gold);font-size:0.8em">keeta_</code> wallet and choose your alert platform (Discord, Telegram, Slack, or X). Send 0.1 KTA to the oracle wallet to activate your Free tier. Amounts accumulate — multiple sends add up toward higher tiers.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h4>Activate your Oracle access</h4>
          <p>After sending KTA, paste your wallet in the Activate section on <a href="${base}/onboard">/onboard</a> or <a href="${base}/donate">/donate</a>. The Oracle scans your on-chain history, assigns your tier instantly, and enables your access. Verification takes under 2 seconds on Keeta Mainnet.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <h4>Test with your active wallet</h4>
          <p>Go to <a href="${base}/oracle">/oracle</a>, enter your wallet in the Verify section, and unlock the live exchange rate and whale alert tools. Your tier controls how many results you see. Upgrade anytime by sending more KTA — no re-registration needed.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="guide-section">
    <div class="gs-label">Tier overview</div>
    <div class="gs-title">Choose your plan</div>
    <div class="gs-sub">All tiers unlock with a single KTA send — no subscriptions, no auto-billing. Send more KTA to the oracle wallet anytime to accumulate toward higher tiers.</div>
    <div class="card-grid">
      <div class="guide-card">
        <div class="gc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg></div>
        <div class="gc-title">Free — 0.1 KTA</div>
        <div class="gc-desc">20 API calls/day. Live price feed, FX rate, SSE stream, social alert delivery. Trial alerts (100 limit). Persistent access — never expires.</div>
      </div>
      <div class="guide-card" style="border-color:var(--gold-border)">
        <div class="gc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4A35A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
        <div class="gc-title" style="color:var(--gold)">Starter — 10 KTA</div>
        <div class="gc-desc">60 API calls / 30 days. Adds whale alerts (3/month), AI market insights preview, portfolio calculator. Manual renewal.</div>
      </div>
      <div class="guide-card">
        <div class="gc-icon" style="background:rgba(100,160,255,0.08);border-color:rgba(100,160,255,0.2)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64A0FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z"/></svg></div>
        <div class="gc-title" style="color:#64A0FF">Pro — 300 KTA</div>
        <div class="gc-desc">300 API calls/month. Compliance screening, transaction history, wallet scoring, on-chain analytics, network health monitor. Lifetime social alerts.</div>
      </div>
      <div class="guide-card">
        <div class="gc-icon" style="background:rgba(255,100,100,0.08);border-color:rgba(255,100,100,0.2)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF7070" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
        <div class="gc-title" style="color:#FF7070">Business — 600 KTA</div>
        <div class="gc-desc">All 19 SDK tools. Unlimited API calls. KYC verification, certificate operations, identity resolution, encrypted containers, batch builder, permission management.</div>
      </div>
    </div>
    <div class="info-box"><strong>Social tier (50 KTA)</strong> — Sending 50 KTA activates both lifetime social alerts and Social-tier Oracle API access (150 calls / 30 days). Lifetime social alerts never expire — Oracle API renews with additional KTA sends.</div>
  </div>

  <div class="guide-section">
    <div class="gs-label">Troubleshoot</div>
    <div class="gs-title">Not working? Start here.</div>
    <div class="gs-sub">Every feature — alerts, API calls, and tools — requires at minimum a <strong style="color:var(--gold)">0.1 KTA activated wallet</strong>. Registration alone is not enough. You must send KTA and activate.</div>

    <div class="info-box" style="margin-bottom:20px">
      <strong>Step 1 — Check your wallet status:</strong><br>
      Go to <a href="${base}/onboard#status" style="color:var(--gold)">/onboard → Status Checker</a> and enter your wallet address. It shows your tier, expiry, alert count, and lifetime social flag. If it shows <strong>unregistered</strong> — you need to activate.
    </div>

    <div class="step-list">
      <div class="step"><div class="step-num">!</div><div class="step-body"><h4>Not receiving alerts after registering</h4><p>Registration creates your subscriber record but alerts require an <strong>activated wallet</strong> (minimum 0.1 KTA sent + activated). Check your status at <a href="${base}/onboard#status" style="color:var(--gold)">/onboard</a>. If <code style="color:var(--gold);font-size:0.78em">paid: false</code> and trial alerts are exhausted, upgrade at <a href="${base}/checkout" style="color:var(--gold)">/checkout</a>.</p></div></div>
      <div class="step"><div class="step-num">!</div><div class="step-body"><h4>Trial alerts ran out (100 limit)</h4><p>Free and Starter tiers include 100 trial social alerts total. Once exhausted, alerts stop until you upgrade. Send 50+ KTA to the oracle wallet and activate — this unlocks <strong>lifetime social alerts</strong> that never expire.</p></div></div>
      <div class="step"><div class="step-num">!</div><div class="step-body"><h4>Alerts stopped after some time</h4><p>Oracle API access has a 30-day window for Starter/Pro/Business tiers. However, <strong>social alerts survive Oracle expiry</strong> if you have lifetime social (50+ KTA sent). Check <code style="color:var(--gold);font-size:0.78em">socialLifetime</code> in your status. To renew Oracle access, send KTA again — amounts accumulate on-chain.</p></div></div>
      <div class="step"><div class="step-num">!</div><div class="step-body"><h4>Discord / Telegram / Slack not receiving messages</h4><p>Verify your webhook URL or bot token is still valid. Discord webhooks can be deleted — recreate and re-register. Telegram bots need to be started by the user (<code style="color:var(--gold);font-size:0.78em">/start</code>). Slack webhooks expire if the app is removed from the workspace. Re-register at <a href="${base}/onboard#register" style="color:var(--gold)">/onboard</a>.</p></div></div>
      <div class="step"><div class="step-num">!</div><div class="step-body"><h4>X / Twitter stopped posting</h4><p>Twitter API access tokens expire or get revoked. Go to <a href="https://developer.twitter.com/en/portal" target="_blank" style="color:var(--gold)">developer.twitter.com</a>, regenerate your Access Token and Access Token Secret, and re-register with the new values. Free tier API has a monthly post cap — use ±5% or ±10% change triggers to conserve quota.</p></div></div>
      <div class="step"><div class="step-num">!</div><div class="step-body"><h4>Wrong currency showing in alerts</h4><p>Re-register your wallet with the correct display currency at <a href="${base}/onboard#register" style="color:var(--gold)">/onboard</a>. FX rates cover 160+ ISO 4217 currencies. If your currency shows USD, the FX rate may have missed a cron cycle — it will correct on the next alert.</p></div></div>
      <div class="step"><div class="step-num">!</div><div class="step-body"><h4>Wallet shows "unregistered" after sending KTA</h4><p>Activation is a separate step from sending. After sending KTA, go to <a href="${base}/onboard" style="color:var(--gold)">/onboard</a> and click <strong>Activate</strong> — or call <code style="color:var(--gold);font-size:0.78em">POST /activate-oracle</code> with your wallet. The Oracle scans your on-chain history and assigns your tier. This takes under 2 seconds.</p></div></div>
    </div>

    <div class="info-box" style="margin-top:8px">Still stuck? Use the <strong>Support Agent</strong> chat at <a href="${base}/onboard" style="color:var(--gold)">/onboard</a> (bottom-right button) or contact <a href="https://x.com/elemzir" target="_blank" style="color:var(--gold)">@elemzir on X</a> directly.</div>
  </div>

</div>

<div class="audience-section" id="aud-individual">

  <div class="guide-section">
    <div class="gs-label">For individuals</div>
    <div class="gs-title">Price alerts &amp; whale tracking</div>
    <div class="gs-sub">KTA Oracle delivers live market data directly to where you already are — Discord, Telegram, Slack, or X/Twitter. No dashboards to check, no apps to open.</div>
    <div class="step-list">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h4>Register your wallet &amp; choose a platform</h4>
          <p>Go to <a href="${base}/onboard">/onboard</a>. Enter your <code style="color:var(--gold);font-size:0.8em">keeta_</code> wallet address and select where alerts go: Discord (rich embeds with charts), Telegram (instant push), Slack (channel posts), or X/Twitter (public or DM). Add your handle or webhook URL.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h4>Set your alert frequency</h4>
          <p>Choose how often price alerts fire: every 1 minute, 5 minutes, 15 minutes, hourly, or daily digest. Each alert includes the current KTA/USD price, 1h/24h/7d change, and an AI-generated market insight (Starter and above).</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h4>Send KTA to activate</h4>
          <p>Send the amount matching your desired tier to the oracle wallet shown at <a href="${base}/donate">/donate</a>. Free tier (0.1 KTA) gives 100 trial alerts. Sending 50+ KTA gives lifetime alerts — they never stop, no renewal needed.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <h4>Check your status anytime</h4>
          <p>Visit <a href="${base}/onboard">/onboard</a> and scroll to the Status Checker, or call <code style="color:var(--gold);font-size:0.8em">GET /status?wallet=your_wallet</code>. It shows your tier, alert count remaining, and whether lifetime social is active.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="guide-section">
    <div class="gs-label">Platform setup</div>
    <div class="gs-title">Connect your platform — step by step</div>
    <div class="gs-sub">Pick your platform below, follow the steps, then go to <a href="${base}/onboard#register" style="color:var(--gold)">/onboard → Register</a> and paste in what you collect here.</div>
    <div class="ptab-row">
      <button class="ptab active" onclick="showPlatform('discord',this)">Discord</button>
      <button class="ptab" onclick="showPlatform('telegram',this)">Telegram</button>
      <button class="ptab" onclick="showPlatform('slack',this)">Slack</button>
      <button class="ptab" onclick="showPlatform('twitter',this)">X / Twitter</button>
    </div>
    <div id="pg-discord" class="pg show"><div class="step-list">
      <div class="step"><div class="step-num">1</div><div class="step-body"><h4>Open your Discord server</h4><p>Use any existing server or create a new one (free). Pick or create a text channel for KTA alerts — a private server with a <code style="color:var(--gold);font-size:0.78em">#kta-alerts</code> channel works well.</p></div></div>
      <div class="step"><div class="step-num">2</div><div class="step-body"><h4>Create a webhook</h4><p>Right-click the channel → <strong>Edit Channel</strong> → <strong>Integrations</strong> → <strong>Webhooks</strong> → <strong>New Webhook</strong>. Name it "KTA Oracle", then click <strong>Copy Webhook URL</strong>.</p></div></div>
      <div class="step"><div class="step-num">3</div><div class="step-body"><h4>Paste into the registration form</h4><p>Go to <a href="${base}/onboard#register" style="color:var(--gold)">/onboard → Register</a>, select <strong>Discord</strong>, paste the URL. It looks like: <code style="color:var(--gold);font-size:0.78em">https://discord.com/api/webhooks/1234…/abcd…</code></p></div></div>
      <div class="step"><div class="step-num">4</div><div class="step-body"><h4>Choose trigger and currency</h4><p>Select your alert trigger (time-based or % change) and display currency. Your channel will receive a rich embed with KTA price, 1h/24h/7d change, whale status, and an AI-generated market insight.</p></div></div>
    </div></div>
    <div id="pg-telegram" class="pg"><div class="step-list">
      <div class="step"><div class="step-num">1</div><div class="step-body"><h4>Create a bot via @BotFather</h4><p>Open Telegram, search <strong>@BotFather</strong>, send <code style="color:var(--gold);font-size:0.78em">/newbot</code>. Choose a display name and a username ending in <code style="color:var(--gold);font-size:0.78em">bot</code> (e.g. <code style="color:var(--gold);font-size:0.78em">MyKTAalertsbot</code>).</p></div></div>
      <div class="step"><div class="step-num">2</div><div class="step-body"><h4>Copy your bot token</h4><p>BotFather gives you a token like <code style="color:var(--gold);font-size:0.78em">7123456789:AAFHx-abc…</code> — save it. This is your <strong>Telegram bot token</strong>.</p></div></div>
      <div class="step"><div class="step-num">3</div><div class="step-body"><h4>Start the bot &amp; get your Chat ID</h4><p>Search for your bot, click <strong>Start</strong>. Then open <code style="color:var(--gold);font-size:0.78em">https://api.telegram.org/bot{TOKEN}/getUpdates</code> in your browser — look for <code style="color:var(--gold);font-size:0.78em">"chat": {"id": …}</code>. For groups add the bot first; group IDs start with <code style="color:var(--gold);font-size:0.78em">-100…</code></p></div></div>
      <div class="step"><div class="step-num">4</div><div class="step-body"><h4>Paste into the registration form</h4><p>Go to <a href="${base}/onboard#register" style="color:var(--gold)">/onboard → Register</a>, select <strong>Telegram</strong>, enter your bot token and chat ID.</p></div></div>
    </div></div>
    <div id="pg-slack" class="pg"><div class="step-list">
      <div class="step"><div class="step-num">1</div><div class="step-body"><h4>Create a Slack app</h4><p>Go to <a href="https://api.slack.com/apps" target="_blank" style="color:var(--gold)">api.slack.com/apps</a> → <strong>Create New App</strong> → <strong>From scratch</strong>. Name it "KTA Oracle" and choose your workspace.</p></div></div>
      <div class="step"><div class="step-num">2</div><div class="step-body"><h4>Enable Incoming Webhooks</h4><p>In the left sidebar: <strong>Features → Incoming Webhooks</strong> → toggle <strong>On</strong> → click <strong>Add New Webhook to Workspace</strong>.</p></div></div>
      <div class="step"><div class="step-num">3</div><div class="step-body"><h4>Authorise a channel</h4><p>Select the channel (e.g. <code style="color:var(--gold);font-size:0.78em">#kta-alerts</code>), click <strong>Allow</strong>. Slack generates a URL starting with <code style="color:var(--gold);font-size:0.78em">https://hooks.slack.com/services/…</code> — copy it.</p></div></div>
      <div class="step"><div class="step-num">4</div><div class="step-body"><h4>Paste into the registration form</h4><p>Go to <a href="${base}/onboard#register" style="color:var(--gold)">/onboard → Register</a>, select <strong>Slack</strong>, paste the webhook URL.</p></div></div>
    </div></div>
    <div id="pg-twitter" class="pg"><div class="step-list">
      <div class="step"><div class="step-num">1</div><div class="step-body"><h4>Create a Twitter Developer app</h4><p>Go to <a href="https://developer.twitter.com/en/portal" target="_blank" style="color:var(--gold)">developer.twitter.com/en/portal</a> → create a project and app. Under <strong>User Authentication Settings</strong>, enable <strong>OAuth 1.0a</strong> with <strong>Read + Write</strong> permissions.</p></div></div>
      <div class="step"><div class="step-num">2</div><div class="step-body"><h4>Generate all 4 keys</h4><p>Under <strong>Keys and Tokens</strong>: copy <strong>API Key</strong> and <strong>API Key Secret</strong>. Click <strong>Generate</strong> to create <strong>Access Token</strong> and <strong>Access Token Secret</strong>. You need all four.</p></div></div>
      <div class="step"><div class="step-num">3</div><div class="step-body"><h4>Paste into the registration form</h4><p>Go to <a href="${base}/onboard#register" style="color:var(--gold)">/onboard → Register</a>, select <strong>X / Twitter</strong>, fill in all 4 fields.</p></div></div>
      <div class="step"><div class="step-num">4</div><div class="step-body"><h4>Consider your post quota</h4><p>The free Twitter API tier has a limited monthly post budget. For high-frequency triggers (1 min or ±1%), consider using a time-based 15 min or a ±2%/±5% trigger to stay within limits.</p></div></div>
    </div>
    <div class="info-box" style="margin-top:14px"><strong>Note:</strong> Alerts post as tweets from the connected account — price, direction, change %, and AI quote within 280 characters.</div>
    </div>
  </div>

  <div class="guide-section">
    <div class="gs-label">Alert triggers</div>
    <div class="gs-title">Time-based vs. price-change alerts</div>
    <div class="gs-sub">Two modes. Pick whichever fits how you trade or hold.</div>
    <div class="trigger-grid">
      <div class="trig-card">
        <h5>⏱ Time-based</h5>
        <p style="margin-bottom:12px;font-size:0.78rem;color:var(--muted2);line-height:1.65">Fires on schedule regardless of price movement. Good for regular updates.</p>
        <div class="trig-row"><span class="trig-key">5 min</span><span class="trig-val">High frequency — best for active traders monitoring momentum</span></div>
        <div class="trig-row"><span class="trig-key">15 min</span><span class="trig-val">Recommended default — balanced, easy to follow</span></div>
        <div class="trig-row"><span class="trig-key">1h</span><span class="trig-val">Hourly summary with AI insight</span></div>
        <div class="trig-row"><span class="trig-key">4h / 12h</span><span class="trig-val">Low-noise digest for long-term holders</span></div>
        <div class="trig-row"><span class="trig-key">1d</span><span class="trig-val">One alert per day with full context</span></div>
      </div>
      <div class="trig-card">
        <h5>📈 % Price change</h5>
        <p style="margin-bottom:12px;font-size:0.78rem;color:var(--muted2);line-height:1.65">Fires only when price moves by the set % from your last alert. 5-minute cooldown. Silent in flat markets.</p>
        <div class="trig-row"><span class="trig-key">±5%</span><span class="trig-val">Significant moves only — real breakouts and meaningful reversals</span></div>
        <div class="trig-row"><span class="trig-key">±10%</span><span class="trig-val">Notable swings — good signal-to-noise balance</span></div>
        <div class="trig-row"><span class="trig-key">±15%</span><span class="trig-val">Major moves only — quiet in sideways markets</span></div>
        <div class="trig-row"><span class="trig-key">±20% / ±25%</span><span class="trig-val">Extreme moves only — institutional-level volatility</span></div>
      </div>
    </div>
    <div class="info-box"><strong>Twitter / X tip:</strong> Use ±5% or ±10% to conserve your monthly post budget. 5-minute time-based on X can exhaust the free API tier in days.</div>
  </div>

  <div class="guide-section">
    <div class="gs-label">Display currency</div>
    <div class="gs-title">160+ currencies supported</div>
    <div class="gs-sub">Every alert converts KTA to your chosen currency using Keeta Anchor FX rates — the same engine that settles real payments. Rates refresh hourly.</div>
    <div class="info-box">
      <strong>Americas</strong> — USD, CAD, BRL, MXN, ARS, CLP, COP, PEN…<br>
      <strong>Europe</strong> — EUR, GBP, SEK, NOK, DKK, CHF, PLN, CZK, TRY, UAH…<br>
      <strong>Middle East</strong> — AED, SAR, QAR, KWD, BHD, ILS…<br>
      <strong>Africa</strong> — ZAR, NGN, KES, GHS, EGP, TZS…<br>
      <strong>Asia Pacific</strong> — JPY, CNY, HKD, SGD, KRW, INR, THB, IDR, VND…<br>
      <strong>CIS</strong> — KZT, GEL, AMD, AZN, UZS…<br><br>
      Any ISO 4217 code works via <code style="color:var(--gold);font-size:0.78em">GET /rate?currency=XYZ</code> even if not in the dropdown.
    </div>
  </div>

  <div class="guide-section">
    <div class="gs-label">Whale alerts</div>
    <div class="gs-title">On-chain movement tracking</div>
    <div class="gs-sub">Whale alerts fire when large KTA transfers are confirmed on Keeta Mainnet — classified by size and delivered to your registered platform.</div>
    <div class="info-box">
      <strong>Classification thresholds:</strong><br>
      · Whale — 100,000+ KTA moved in a single transaction<br>
      · Institutional — 1,000,000+ KTA<br>
      · Mega-whale — 10,000,000+ KTA<br><br>
      Alerts are settlement-confirmed before firing (0.4s after the transaction). Starter tier: 3 per month. Social/Pro/Business: unlimited.
    </div>
    <div class="info-box"><strong>Testing:</strong> Go to <a href="${base}/oracle" style="color:var(--gold)">/oracle</a>, verify your active wallet, and use the whale alerts tool. Results are capped by your tier. No phantom test data — all results are real on-chain events.</div>
  </div>

</div>

<div class="audience-section" id="aud-business">

  <div class="guide-section">
    <div class="gs-label">For businesses</div>
    <div class="gs-title">REST API integration</div>
    <div class="gs-sub">All public endpoints return JSON with no API key for read-only data. Register a wallet, choose your tier based on call volume, and integrate directly.</div>
    <div class="step-list">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h4>Select a tier matching your call volume</h4>
          <p>Free: 20 calls/day. Starter: 60 total / 30 days. Pro: 300/month. Business: unlimited. All endpoints share the same base URL: <code style="color:var(--gold);font-size:0.8em">https://kta.netrate.workers.dev</code></p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h4>Call public endpoints directly</h4>
          <p>No authentication required for price, rate, whale alerts, and subscription status. Just HTTP GET requests. CORS is enabled — call from browser or server.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h4>Stream real-time data via SSE</h4>
          <p>Use <code style="color:var(--gold);font-size:0.8em">GET /stream?wallet=your_wallet</code> for Server-Sent Events. The stream pushes live price + tier status every 15 seconds. Ideal for dashboards and automated trading triggers.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <h4>Access advanced tools at Pro/Business tier</h4>
          <p>Compliance screening, wallet scoring, transaction history, KYC verification, certificate operations, and batch builders require Pro (300 KTA) or Business (600 KTA) tier. Register and activate the same way — higher tiers unlock automatically when your cumulative KTA send crosses the threshold.</p>
        </div>
      </div>
    </div>

    <div class="gs-title" style="margin-top:36px;font-size:1.1rem">Example API calls</div>
    <div class="code-block"><span class="cm"># Live KTA/USD price</span>
<span class="hl">GET</span> https://kta.netrate.workers.dev/price

<span class="cm"># FX rate — replace EUR with any supported currency</span>
<span class="hl">GET</span> https://kta.netrate.workers.dev/rate?currency=EUR

<span class="cm"># Recent whale movements</span>
<span class="hl">GET</span> https://kta.netrate.workers.dev/whale/alerts

<span class="cm"># Check wallet tier and expiry</span>
<span class="hl">GET</span> https://kta.netrate.workers.dev/subscription?wallet=keeta_your_wallet

<span class="cm"># SSE stream — reconnects every 15s</span>
<span class="hl">GET</span> https://kta.netrate.workers.dev/stream?wallet=keeta_your_wallet</div>

    <div class="gs-title" style="margin-top:24px;font-size:1.1rem">Response formats</div>
    <div class="code-block"><span class="cm">// GET /price</span>
{ <span class="hl">"price"</span>: 0.175100, <span class="hl">"change_pct"</span>: -0.19, <span class="hl">"change_24h"</span>: 1.97, <span class="hl">"change_7d"</span>: -0.40, <span class="hl">"ts"</span>: 1713000000000 }

<span class="cm">// GET /rate?currency=EUR</span>
{ <span class="hl">"currency"</span>: "EUR", <span class="hl">"rate"</span>: "1 KTA = 0.161500 EUR", <span class="hl">"price"</span>: 0.161500, <span class="hl">"ts"</span>: 1713000000000 }

<span class="cm">// GET /whale/alerts</span>
{ <span class="hl">"alerts"</span>: [{ <span class="hl">"amount"</span>: 500000, <span class="hl">"type"</span>: "whale", <span class="hl">"ts"</span>: 1713000000000 }] }

<span class="cm">// GET /subscription?wallet=</span>
{ <span class="hl">"tier"</span>: "pro", <span class="hl">"expiry"</span>: 1715592000000, <span class="hl">"socialLifetime"</span>: true, <span class="hl">"paid"</span>: true }</div>
  </div>

</div>

<div class="audience-section" id="aud-ai">

  <div class="guide-section">
    <div class="gs-label">For AI agents</div>
    <div class="gs-title">Connecting AI to live Keeta data</div>
    <div class="gs-sub">KTA Oracle exposes 19 SDK tools accessible via REST and SSE. Any AI system — Claude, ChatGPT, custom agents — can query live Keeta Network data in real time.</div>

    <div class="step-list">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h4>Register a wallet (minimum Free tier)</h4>
          <p>Your AI agent needs a registered <code style="color:var(--gold);font-size:0.8em">keeta_</code> wallet to access the SSE stream and subscription tools. Register at <a href="${base}/onboard">/onboard</a> with 0.1 KTA minimum. No API keys — the wallet address IS the credential.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h4>Set up the AI Connector</h4>
          <p>Go to <a href="${base}/tools#ai">/tools → Connect AI</a>. Enter your wallet to generate your SSE and REST connection strings. These strings are what you paste into your AI platform's tool configuration or system prompt.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h4>Feed live data into your agent context</h4>
          <p>Use the SSE endpoint to stream live price data into your agent. Use REST endpoints for on-demand queries (price, rates, whale movements). The agent can call these as HTTP tools — no SDK installation required.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <h4>Check tier before calling advanced tools</h4>
          <p>Call <code style="color:var(--gold);font-size:0.8em">GET /subscription?wallet=</code> first to verify the wallet's active tier. This prevents failed calls to endpoints that require higher tiers. The response includes tier name, expiry, and remaining quota.</p>
        </div>
      </div>
    </div>

    <div class="gs-title" style="margin-top:36px;font-size:1.1rem">AI Connector Setup — step by step</div>
    <div class="step-list" style="margin-top:18px">
      <div class="step">
        <div class="step-num">A</div>
        <div class="step-body">
          <h4>Open the Connect AI panel</h4>
          <p>Navigate to <a href="${base}/tools#ai">${base}/tools#ai</a>. Enter your active wallet and click Generate. You'll see your SSE URL and a list of all REST tool endpoints pre-formatted for your wallet.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">B</div>
        <div class="step-body">
          <h4>Configure SSE in your AI platform</h4>
          <p>Paste the generated SSE URL into your AI assistant's tool source or memory feed. The stream sends a JSON payload every 15 seconds containing price, tier, and timestamp. Your agent always has fresh market context without polling.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">C</div>
        <div class="step-body">
          <h4>Add REST tools to your agent definition</h4>
          <p>Define each Oracle endpoint as an HTTP tool in your agent configuration. Minimal setup — GET requests with no auth headers. The base URL is always <code style="color:var(--gold);font-size:0.8em">https://kta.netrate.workers.dev</code>.</p>
        </div>
      </div>
    </div>

    <div class="code-block" style="margin-top:24px"><span class="cm"># SSE connection (your wallet pre-filled by Connect AI panel)</span>
<span class="hl">GET</span> https://kta.netrate.workers.dev/stream?wallet=keeta_your_wallet

<span class="cm"># SSE payload format (received every 15s)</span>
event: price
data: { <span class="hl">"wallet"</span>: "keeta_...", <span class="hl">"tier"</span>: "pro", <span class="hl">"price"</span>: 0.1751, <span class="hl">"change_pct"</span>: -0.19, <span class="hl">"ts"</span>: 1713000000000 }

<span class="cm"># System prompt snippet for your AI agent</span>
You have access to live KTA price data via KTA Oracle.
Use GET /price for current price, GET /rate?currency= for FX rates,
GET /whale/alerts for large on-chain movements.
Base URL: https://kta.netrate.workers.dev
All responses are JSON. No authentication required for public endpoints.</div>

    <div class="gs-title" style="margin-top:48px;font-size:1.15rem">Platform-specific connector setup</div>
    <div class="gs-sub" style="margin-bottom:24px">Active wallet (any tier) required for SSE stream. Public endpoints — /price, /rate, /whale/alerts — work without a wallet in any AI platform.</div>

    <div class="guide-card" style="margin-bottom:14px">
      <div style="font-size:0.82rem;font-weight:700;color:var(--gold);margin-bottom:10px">Claude API — tool use (Anthropic)</div>
      <div class="gc-desc" style="margin-bottom:12px">Pass Oracle endpoints as tools in your <code style="color:var(--gold);font-size:0.78em">tools</code> array. Claude calls them autonomously when the user asks about KTA price or whale activity. The SSE stream gives your agent continuous price context — connect via EventSource in a system prompt or tool config.</div>
      <div class="code-block"><span class="cm">// tools array in your Anthropic API call</span>
{
  <span class="hl">"name"</span>: "get_kta_price",
  <span class="hl">"description"</span>: "Get live KTA/USD price and 1h/24h/7d changes from KTA Oracle",
  <span class="hl">"input_schema"</span>: { <span class="hl">"type"</span>: "object", <span class="hl">"properties"</span>: {}, <span class="hl">"required"</span>: [] }
},
{
  <span class="hl">"name"</span>: "get_kta_rate",
  <span class="hl">"description"</span>: "Convert KTA to fiat currency",
  <span class="hl">"input_schema"</span>: { <span class="hl">"type"</span>: "object", <span class="hl">"properties"</span>: { <span class="hl">"currency"</span>: { <span class="hl">"type"</span>: "string", <span class="hl">"description"</span>: "e.g. EUR, GBP, SEK" } }, <span class="hl">"required"</span>: ["currency"] }
},
{
  <span class="hl">"name"</span>: "get_whale_alerts",
  <span class="hl">"description"</span>: "Get recent large on-chain KTA movements (whale/institutional/mega-whale)",
  <span class="hl">"input_schema"</span>: { <span class="hl">"type"</span>: "object", <span class="hl">"properties"</span>: {}, <span class="hl">"required"</span>: [] }
}

<span class="cm">// Tool execution — fetch Oracle and return result</span>
<span class="hl">GET</span> https://kta.netrate.workers.dev/price
<span class="hl">GET</span> https://kta.netrate.workers.dev/rate?currency=EUR
<span class="hl">GET</span> https://kta.netrate.workers.dev/whale/alerts</div>
    </div>

    <div class="guide-card" style="margin-bottom:14px">
      <div style="font-size:0.82rem;font-weight:700;color:var(--gold);margin-bottom:10px">ChatGPT Custom GPT — Actions (OpenAI)</div>
      <div class="gc-desc" style="margin-bottom:12px">Go to <strong>My GPTs → Configure → Add Actions → Import from URL</strong>. Paste your Oracle OpenAPI schema. No API key required for public endpoints. Add your wallet as a default query parameter for SSE stream access.</div>
      <div class="code-block"><span class="cm"># Minimal OpenAPI schema for ChatGPT Actions</span>
openapi: "3.1.0"
info:
  title: KTA Oracle
  version: "1.0"
servers:
  - url: https://kta.netrate.workers.dev
paths:
  /price:
    get:
      operationId: getKtaPrice
      summary: Live KTA/USD price with changes
      responses:
        "200": { description: Price data }
  /rate:
    get:
      operationId: getKtaRate
      summary: KTA to fiat exchange rate
      parameters:
        - name: currency
          in: query
          required: true
          schema: { type: string }
      responses:
        "200": { description: FX rate }
  /whale/alerts:
    get:
      operationId: getWhaleAlerts
      summary: Recent large on-chain KTA movements
      responses:
        "200": { description: Whale alert list }</div>
    </div>

    <div class="guide-card" style="margin-bottom:14px">
      <div style="font-size:0.82rem;font-weight:700;color:var(--gold);margin-bottom:10px">OpenAI API — function calling</div>
      <div class="gc-desc" style="margin-bottom:12px">Add Oracle tools to your <code style="color:var(--gold);font-size:0.78em">tools</code> array in your <code style="color:var(--gold);font-size:0.78em">chat.completions.create</code> call. When the model triggers a tool call, execute the corresponding Oracle endpoint and return the result in a follow-up message.</div>
      <div class="code-block"><span class="cm">// tools array in chat.completions.create</span>
{
  <span class="hl">"type"</span>: "function",
  <span class="hl">"function"</span>: {
    <span class="hl">"name"</span>: "get_kta_price",
    <span class="hl">"description"</span>: "Returns live KTA/USD price and change percentages",
    <span class="hl">"parameters"</span>: { <span class="hl">"type"</span>: "object", <span class="hl">"properties"</span>: {}, <span class="hl">"required"</span>: [] }
  }
}

<span class="cm">// On tool_call response, execute and return</span>
const res = await fetch("https://kta.netrate.workers.dev/price");
const data = await res.json();
<span class="cm">// Return as tool message with tool_call_id</span></div>
    </div>

    <div class="guide-card">
      <div style="font-size:0.82rem;font-weight:700;color:var(--gold);margin-bottom:10px">LangChain · CrewAI · AutoGPT · MCP hosts</div>
      <div class="gc-desc" style="margin-bottom:12px">Use HTTP GET tools pointing at Oracle endpoints. All responses are clean JSON — no parsing wrappers needed. The SSE stream at <code style="color:var(--gold);font-size:0.78em">/stream?wallet=</code> follows the W3C EventSource spec and auto-reconnects every 15s.</div>
      <div class="code-block"><span class="cm"># LangChain HTTP tool example (Python)</span>
from langchain.tools import Tool
import requests

kta_price_tool = Tool(
    name="kta_price",
    func=lambda _: requests.get("https://kta.netrate.workers.dev/price").json(),
    description="Returns live KTA/USD price and 1h/24h/7d change percentages"
)

kta_rate_tool = Tool(
    name="kta_rate",
    func=lambda currency: requests.get(f"https://kta.netrate.workers.dev/rate?currency={currency}").json(),
    description="Convert KTA to fiat. Input: currency code like EUR, GBP, SEK"
)

<span class="cm"># SSE stream in Python (for live price push)</span>
import sseclient, requests
stream = requests.get("https://kta.netrate.workers.dev/stream?wallet=keeta_your_wallet", stream=True)
for event in sseclient.SSEClient(stream):
    print(event.data)</div>
    </div>

    <div class="info-box" style="margin-top:20px"><strong>Tier requirements for AI agents:</strong> Free tier gives SSE stream + price + rate + status. Starter adds whale alerts + AI insights. Pro adds compliance screening, wallet scoring, transaction history. Business unlocks all 19 tools. Check tier before calling: <code style="color:var(--gold);font-size:0.85em">GET /subscription?wallet=your_wallet</code></div>
  </div>

</div>

<hr class="section-divider">

<div class="guide-section" id="all-tools">
  <div class="gs-label">All 19 SDK tools</div>
  <div class="gs-title">Complete tool reference</div>
  <div class="gs-sub">Every tool available on KTA Oracle, with its tier requirement and endpoint. Test all tools with your active wallet at <a href="/oracle">/oracle</a>.</div>

  <div style="font-size:0.78rem;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;padding:0 4px">Free tier — included with 0.1 KTA registration</div>
  <div class="tool-table" style="margin-bottom:28px">
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">Live Price Feed</div><div class="tr-desc">Real-time KTA/USD price with 1h, 24h, and 7d change. Sub-second latency directly from Keeta Network's FX anchor.</div></div><div class="tr-endpoint tr-badge tb-free">/price</div></div>
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">Multi-currency FX Rate</div><div class="tr-desc">Convert KTA to USD, EUR, GBP, SEK, JPY, AED, SGD and more using the live anchor price. Ideal for payment cost calculations.</div></div><div class="tr-endpoint tr-badge tb-free">/rate?currency=</div></div>
    <div class="tool-row"><div><span class="tr-method m-post">POST</span></div><div><div class="tr-name">Social Alert Delivery</div><div class="tr-desc">Register wallet for price alerts on Discord, Telegram, Slack, or X. Configurable frequency from 5 minutes to daily digest, or on % price moves (±5%–±25%). 100 trial alerts on Free.</div></div><div class="tr-endpoint tr-badge tb-free">/register</div></div>
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">Subscription Status</div><div class="tr-desc">Look up any wallet's tier, expiry, alert quota, and lifetime social status. Used by agents before making tier-restricted calls.</div></div><div class="tr-endpoint tr-badge tb-free">/status?wallet=</div></div>
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">Live SSE Stream</div><div class="tr-desc">Server-Sent Events stream. Pushes live price + tier context every 15 seconds. Connect Claude, ChatGPT, or any AI assistant directly. Registered wallet required.</div></div><div class="tr-endpoint tr-badge tb-free">/stream?wallet=</div></div>
  </div>

  <div style="font-size:0.78rem;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;padding:0 4px">Starter tier — from 10 KTA</div>
  <div class="tool-table" style="margin-bottom:28px">
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">Whale Movement Alerts</div><div class="tr-desc">On-chain KTA movements classified as whale (100K+), institutional (1M+), or mega-whale (10M+). Settlement-confirmed before alert fires. 3/month on Starter, unlimited on Social+.</div></div><div class="tr-endpoint tr-badge tb-starter">/whale/alerts</div></div>
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">AI Market Insights</div><div class="tr-desc">LLM-generated trend analysis embedded in every price alert — trend phase, volume conviction, and payment timing signal. Preview on Starter, full access from Social.</div></div><div class="tr-endpoint tr-badge tb-starter">embedded</div></div>
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">Portfolio Value Calculator</div><div class="tr-desc">Returns the live KTA price in any fiat currency using the Keeta Anchor FX rate. Multiply the returned price by your KTA holdings to get portfolio value. Useful for treasury reporting and position monitoring.</div></div><div class="tr-endpoint tr-badge tb-starter">/rate?currency=</div></div>
  </div>

  <div style="font-size:0.78rem;font-weight:700;color:#64A0FF;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;padding:0 4px">Pro tier — from 300 KTA</div>
  <div class="tool-table" style="margin-bottom:28px">
    <div class="tool-row"><div><span class="tr-method m-post">POST</span></div><div><div class="tr-name">Compliance Screening</div><div class="tr-desc">Screen a wallet against flagged activity patterns on Keeta Network. Returns risk classification and last-seen activity. Essential for payment operators and treasury flows.</div></div><div class="tr-endpoint tr-badge tb-pro">/compliance/screen</div></div>
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">Transaction History</div><div class="tr-desc">Full on-chain history for any Keeta wallet. Paginated. Returns amounts, counterparties, timestamps, and settlement status. Required for reconciliation and audit trails.</div></div><div class="tr-endpoint tr-badge tb-pro">/wallet/history</div></div>
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">Wallet Scoring</div><div class="tr-desc">Risk and activity score (0–100) for any Keeta wallet. Factors: volume, frequency, counterparty network, and account age. Returns score with classification label.</div></div><div class="tr-endpoint tr-badge tb-pro">/wallet/score</div></div>
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">On-chain Analytics</div><div class="tr-desc">Network-level metrics: active wallets, daily settlement volume, token velocity, and KTA circulation. For market research, treasury planning, and DeFi integrations.</div></div><div class="tr-endpoint tr-badge tb-pro">/analytics/network</div></div>
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">Network Health Monitor</div><div class="tr-desc">Real-time Keeta Network status: settlement latency, validator count, pending staples, and anomaly flags. Check before executing high-value payment flows or batch operations.</div></div><div class="tr-endpoint tr-badge tb-pro">/network/health</div></div>
  </div>

  <div style="font-size:0.78rem;font-weight:700;color:#FF7070;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;padding:0 4px">Business tier — from 600 KTA</div>
  <div class="tool-table">
    <div class="tool-row"><div><span class="tr-method m-post">POST</span></div><div><div class="tr-name">KYC Verification</div><div class="tr-desc">Initiate and verify identity via Keeta's native KYC anchor. Returns verification status and supported jurisdictions. Required for regulated payment corridors.</div></div><div class="tr-endpoint tr-badge tb-business">/kyc/verify</div></div>
    <div class="tool-row"><div><span class="tr-method m-post">POST</span></div><div><div class="tr-name">Certificate Operations</div><div class="tr-desc">Full access to Keeta's MANAGE_CERTIFICATE block operations. Build, sign, and verify DER-encoded certificates on-chain. For identity attestation and credential issuance.</div></div><div class="tr-endpoint tr-badge tb-business">/certificate/manage</div></div>
    <div class="tool-row"><div><span class="tr-method m-get">GET</span></div><div><div class="tr-name">Identity Resolution</div><div class="tr-desc">Resolve Keeta usernames to wallet addresses and vice versa. Username prefix search, availability checks, and reverse lookup for display names.</div></div><div class="tr-endpoint tr-badge tb-business">/identity/resolve</div></div>
    <div class="tool-row"><div><span class="tr-method m-post">POST</span></div><div><div class="tr-name">Encrypted Container Operations</div><div class="tr-desc">Create and decrypt encrypted on-chain containers. Enables private data attestation and confidential agreement workflows on Keeta Network.</div></div><div class="tr-endpoint tr-badge tb-business">/container/seal</div></div>
    <div class="tool-row"><div><span class="tr-method m-post">POST</span></div><div><div class="tr-name">Batch Transaction Builder</div><div class="tr-desc">Construct atomic multi-operation transactions using Keeta's BlockBuilder. Combine sends, burns, mints, and state updates in a single staple — all-or-nothing execution guaranteed.</div></div><div class="tr-endpoint tr-badge tb-business">/batch/build</div></div>
    <div class="tool-row"><div><span class="tr-method m-post">POST</span></div><div><div class="tr-name">Permission Management</div><div class="tr-desc">Query and update Keeta account permissions: ACCESS, ADMIN, OWNER, UPDATE_INFO, and custom external rules. For multi-key treasury setups and delegated operator configurations.</div></div><div class="tr-endpoint tr-badge tb-business">/permissions/manage</div></div>
  </div>
</div>

<div style="text-align:center;padding:40px 0 20px">
  <a href="/checkout" style="display:inline-flex;align-items:center;gap:10px;background:var(--gold);color:#000;font-weight:800;font-size:0.92rem;padding:14px 36px;border-radius:100px;transition:background .15s,transform .15s;box-shadow:0 0 22px rgba(196,163,90,0.25)">Get access →</a>
  <div style="margin-top:14px;font-size:0.78rem;color:var(--muted2)">Start with Free (0.1 KTA) · Upgrade anytime · No auto-billing</div>
</div>

</div>

<footer style="border-top:1px solid #080808;padding:32px 28px;text-align:center;color:var(--muted2);font-size:0.76rem;margin-top:32px">
  <div style="display:flex;justify-content:center;gap:24px;margin-bottom:12px;flex-wrap:wrap">
    <a href="/onboard" style="color:var(--muted2)">Onboard</a>
    <a href="/oracle" style="color:var(--muted2)">Oracle</a>
    <a href="/tools" style="color:var(--muted2)">Tools</a>
    <a href="/checkout" style="color:var(--muted2)">Pricing</a>
    <a href="/donate" style="color:var(--muted2)">Donate</a>
    <a href="/legal" style="color:var(--muted2)">Legal</a>
    <a href="/privacy" style="color:var(--muted2)">Privacy</a>
    <a href="https://x.com/elemzir" target="_blank" rel="noopener" style="color:var(--muted2)">@elemzir</a>
  </div>
  <div style="margin-bottom:8px">KTA Oracle Agent &nbsp;·&nbsp; Powered by Keeta Network &nbsp;·&nbsp; Sweden, EU</div>
  <div style="font-size:0.71rem;letter-spacing:0.03em">&copy; 2026 ELEMZIR. All rights reserved.</div>
</footer>

<script>
function showAudience(id, btn) {
  document.querySelectorAll('.audience-section').forEach(function(el){el.classList.remove('show');});
  document.querySelectorAll('.atab').forEach(function(el){el.classList.remove('active');});
  btn.classList.add('active');
  var target = id === 'all' ? 'aud-all' : 'aud-' + id;
  var el = document.getElementById(target);
  if(el) el.classList.add('show');
  document.getElementById('all-tools').style.display = 'block';
}
function showPlatform(id, btn) {
  ['discord','telegram','slack','twitter'].forEach(function(p){
    var el = document.getElementById('pg-' + p);
    if(el) el.classList.remove('show');
  });
  document.querySelectorAll('.ptab').forEach(function(el){el.classList.remove('active');});
  btn.classList.add('active');
  var pg = document.getElementById('pg-' + id);
  if(pg) pg.classList.add('show');
}
</script>
</body>
</html>`;
}
