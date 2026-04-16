function icon(path: string, size = 20): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}
const ICONS = {
  oracle:    icon('<polyline points="4 17 9 10 13 14 17 7 21 10"/><circle cx="21" cy="10" r="1.5" fill="currentColor" stroke="none"/>'),
  whale:     icon('<path d="M4 13c1-4 4-6 8-6 2.5 0 4.5 1 6 3l2-3 .5 5-4.5-.5c.3 1 .5 2 .5 3 0 4-3 6-7 6a7 7 0 0 1-3-1C4 18 3 15 4 13z"/><circle cx="9" cy="14" r="1.2" fill="currentColor" stroke="none"/>'),
  ai:        icon('<path d="M9 3H7a2 2 0 0 0-2 2v2"/><path d="M15 3h2a2 2 0 0 1 2 2v2"/><path d="M9 21H7a2 2 0 0 1-2-2v-2"/><path d="M15 21h2a2 2 0 0 0 2-2v-2"/><rect x="9" y="9" width="6" height="6" rx="1"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>'),
  broadcast: icon('<path d="M4 10a8 8 0 0 1 16 0"/><path d="M7 12.5a5 5 0 0 1 10 0"/><line x1="12" y1="15" x2="12" y2="21"/><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/>'),
  key:       icon('<circle cx="8" cy="13" r="4"/><line x1="12" y1="13" x2="22" y2="13"/><line x1="19" y1="13" x2="19" y2="16"/><line x1="22" y1="13" x2="22" y2="16"/>'),
  infinity:  icon('<path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z"/><path d="M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z"/>'),
  check:     icon('<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><polyline points="22 4 12 14.1 9 11.1"/>'),
  card:      icon('<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>'),
  crypto:    icon('<circle cx="12" cy="12" r="10"/><path d="M9 8h4.5a2.5 2.5 0 0 1 0 5H9v0h5a2.5 2.5 0 0 1 0 5H9"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="18" x2="12" y2="20"/>'),
  bolt:      icon('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
  visa:      icon('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M9 12h6M12 10v4"/><path d="M2 10h20"/>'),
  wallet:    icon('<path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><circle cx="17" cy="13" r="1.5" fill="currentColor" stroke="none"/>'),
  star:      icon('<polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"/>'),
  code:      icon('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
  agent:     icon('<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><circle cx="19" cy="7" r="3"/><line x1="21" y1="5" x2="22" y2="4"/>'),
  tier:      icon('<path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z"/>'),
  status:    icon('<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>'),
  arrow:     icon('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'),
  tools:     icon('<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>'),
  chat:      icon('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
};

export const BASE_CSS = `
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --gold:#C4A35A;--gold-light:#D4B36A;--gold-dim:rgba(196,163,90,0.12);--gold-border:rgba(196,163,90,0.22);
  --bg:#000;--surface:#070707;--surface2:#0d0d0d;--surface3:#111;
  --text:#fff;--muted:#555;--muted2:#888;--accent:#00D4AA;--danger:#ff4d4d;
  --radius:12px;--radius-lg:16px
}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;line-height:1.6;overflow-x:hidden}
html{overflow-x:hidden}
a{color:var(--gold);text-decoration:none;transition:color .15s}
a:hover{color:#fff}
svg{display:inline-block;vertical-align:middle;flex-shrink:0}

.hdr{position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(196,163,90,0.12);background:rgba(0,0,0,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.hdr-inner{max-width:1100px;margin:0 auto;padding:0 28px;height:60px;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:10px;font-size:1rem;font-weight:800;letter-spacing:-0.02em;color:#fff}
.logo-mark{width:28px;height:28px;background:var(--gold);border:1px solid var(--gold);border-radius:7px;display:flex;align-items:center;justify-content:center;color:#000}
.logo em{font-style:normal;color:var(--gold)}
.live-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2s infinite;flex-shrink:0}
.live-dot.off{background:var(--danger);animation:none}
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
.nav-donate.active{color:#fff!important;background:rgba(255,255,255,0.07)!important;border-radius:7px!important}
.nav-oracle-pill{display:inline-flex;align-items:center;gap:5px;font-size:0.78rem;font-weight:600;color:rgba(255,255,255,0.55);padding:4px 10px;border:1px solid #1e1e1e;border-radius:6px;transition:color .15s,border-color .15s;white-space:nowrap}
.nav-oracle-pill:hover,.nav-oracle-pill.active{color:var(--gold);border-color:var(--gold-border)}
.nav-guide-pill{display:inline-flex;align-items:center;font-size:0.71rem;font-weight:600;color:rgba(255,255,255,0.38);padding:4px 10px;border:1px solid #1a1a1a;border-radius:6px;transition:color .15s,border-color .15s;white-space:nowrap}
.nav-guide-pill:hover,.nav-guide-pill.active{color:var(--gold);border-color:var(--gold-border)}

.pbar{background:var(--surface);border-bottom:1px solid #0a0a0a;padding:0 28px;height:36px;display:flex;align-items:center;justify-content:center;gap:32px;font-size:0.78rem;overflow-x:auto;scrollbar-width:none;white-space:nowrap;transition:background .3s}
.pbar.offline{background:rgba(255,77,77,0.05);border-bottom-color:rgba(255,77,77,0.12)}
.pbar::-webkit-scrollbar{display:none}
.pb-item{display:flex;align-items:center;gap:7px}
.pb-label{color:var(--muted)}
.pb-val{color:#fff;font-weight:600;font-variant-numeric:tabular-nums}
.pb-up{color:var(--accent)}.pb-dn{color:var(--danger)}.pb-off{color:#3a1010}
@keyframes flashUp{0%{background:rgba(196,163,90,0.35);color:#fff}100%{background:transparent}}
@keyframes flashDn{0%{background:rgba(200,50,50,0.35);color:#fff}100%{background:transparent}}
.pb-flash-up{animation:flashUp 0.9s ease-out;border-radius:3px;padding:0 3px}
.pb-flash-dn{animation:flashDn 0.9s ease-out;border-radius:3px;padding:0 3px}
.pb-live{display:flex;align-items:center;gap:5px;color:var(--muted)}
.pb-live span{color:var(--accent);font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:0.06em}
.pb-live.offline span{color:var(--danger)}

.wrap{max-width:1100px;margin:0 auto;padding:0 28px}
.wrap-sm{max-width:720px;margin:0 auto;padding:0 28px}
.wrap-md{max-width:860px;margin:0 auto;padding:0 28px}

.hero{padding:52px 28px 60px;text-align:center;max-width:840px;margin:0 auto}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold);font-size:0.73rem;font-weight:700;padding:5px 14px;border-radius:100px;margin-bottom:28px;letter-spacing:0.05em;text-transform:uppercase}
.hero h1{font-size:clamp(2.4rem,5.5vw,3.8rem);font-weight:800;letter-spacing:-0.04em;line-height:1.06;margin-bottom:22px}
.hero h1 em{font-style:normal;color:var(--gold)}
.hero-sub{font-size:1.02rem;color:var(--muted2);max-width:520px;margin:0 auto 44px;line-height:1.7}
.btn-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-primary{display:inline-flex;align-items:center;gap:9px;background:var(--gold);color:#000;font-weight:700;font-size:0.9rem;padding:14px 28px;border-radius:10px;transition:background .15s,transform .12s,box-shadow .15s;white-space:nowrap;box-shadow:0 4px 20px rgba(196,163,90,0.25);touch-action:manipulation}
.btn-primary:hover{background:var(--gold-light);color:#000;transform:translateY(-2px);box-shadow:0 8px 28px rgba(196,163,90,0.35)}
.btn-ghost{display:inline-flex;align-items:center;gap:9px;border:1px solid var(--gold-border);color:var(--gold);font-size:0.88rem;padding:13px 24px;border-radius:10px;transition:all .2s}
.btn-ghost:hover{border-color:var(--gold);color:#fff;background:var(--gold-dim)}
.btn-accent{display:inline-flex;align-items:center;gap:9px;background:rgba(0,212,170,0.12);border:1px solid rgba(0,212,170,0.3);color:var(--accent);font-size:0.88rem;font-weight:600;padding:13px 24px;border-radius:10px;transition:all .2s}
.btn-accent:hover{background:rgba(0,212,170,0.2);color:#fff}

.section{padding:0 0 88px}
.section-head{text-align:center;margin-bottom:40px}
.section-title{font-size:1.5rem;font-weight:700;letter-spacing:-0.03em;margin-bottom:8px}
.section-title em{font-style:normal;color:var(--gold)}
.section-sub{color:var(--muted2);font-size:0.88rem;max-width:460px;margin:0 auto}

.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
@media(max-width:700px){.feat-grid{grid-template-columns:1fr 1fr}}
@media(max-width:440px){.feat-grid{grid-template-columns:1fr}}
.feat-card{background:var(--surface);border:1px solid #111;border-radius:var(--radius);padding:24px;transition:border-color .2s,background .2s}
.feat-card:hover{border-color:var(--gold-border);background:var(--surface2)}
.feat-icon{width:40px;height:40px;border-radius:10px;background:var(--gold-dim);border:1px solid var(--gold-border);display:flex;align-items:center;justify-content:center;color:var(--gold);margin-bottom:16px}
.feat-card h3{font-size:0.9rem;font-weight:700;margin-bottom:7px;letter-spacing:-0.01em}
.feat-card p{font-size:0.8rem;color:var(--muted2);line-height:1.65}

.status-widget{background:var(--surface);border:1px solid var(--gold-border);border-radius:var(--radius-lg);padding:28px;max-width:560px;margin:0 auto}
.status-widget h3{font-size:0.95rem;font-weight:700;margin-bottom:20px;display:flex;align-items:center;gap:9px;color:#fff}
.inp{width:100%;background:var(--surface2);border:1px solid #1a1a1a;border-radius:9px;color:#fff;padding:11px 14px;font-size:0.86rem;outline:none;font-family:inherit;transition:border-color .15s;min-height:44px}
.inp:focus{border-color:var(--gold-border)}
.inp::placeholder{color:var(--muted)}
.inp-row{display:flex;gap:8px;margin-bottom:4px}
.btn-sm{background:var(--gold);color:#000;border:none;padding:10px 18px;border-radius:8px;font-weight:700;font-size:0.83rem;cursor:pointer;white-space:nowrap;transition:background .15s;flex-shrink:0;touch-action:manipulation}
.btn-sm:hover{background:var(--gold-light)}
.btn-sm:disabled{opacity:.4;cursor:not-allowed}
.result-box{margin-top:14px;display:none}
.result-box.show{display:block}
.rrow{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid #111}
.rrow:last-child{border-bottom:none}
.rk{color:var(--muted2);font-size:0.78rem}
.rv{color:#fff;font-weight:500;font-size:0.84rem}
.rv.ok{color:var(--accent)}.rv.gold{color:var(--gold)}.rv.err{color:var(--danger)}
.tier-badge{display:inline-flex;align-items:center;gap:5px;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold);font-size:0.7rem;font-weight:700;padding:2px 9px;border-radius:5px;text-transform:uppercase;letter-spacing:0.06em}
.tier-badge.accent{background:rgba(0,212,170,0.1);border-color:rgba(0,212,170,0.25);color:var(--accent)}

.form-card{background:var(--surface);border:1px solid var(--gold-border);border-radius:var(--radius-lg);padding:28px;max-width:580px;margin:0 auto}
.form-card h3{font-size:0.95rem;font-weight:700;margin-bottom:22px;display:flex;align-items:center;gap:9px}
.field{margin-bottom:15px}
.field label{display:block;font-size:0.71rem;color:var(--muted2);margin-bottom:6px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase}
.field .inp{width:100%}
.field select{width:100%;background:var(--surface2) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpolyline points='1 1 6 7 11 1' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 12px center;background-size:12px 8px;border:1px solid #1a1a1a;border-radius:9px;color:#fff;padding:11px 36px 11px 14px;font-size:0.86rem;outline:none;font-family:inherit;appearance:none;-webkit-appearance:none;cursor:pointer;transition:border-color .15s;min-height:44px}
.field select:focus{border-color:var(--gold-border)}
.field select option{background:#111}
.pf{display:none}.pf.show{display:block}
.btn-full{width:100%;background:var(--gold);color:#000;border:none;padding:13px;border-radius:9px;font-weight:700;font-size:0.9rem;cursor:pointer;transition:background .15s,box-shadow .15s;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 16px rgba(196,163,90,0.2);min-height:48px;touch-action:manipulation}
.btn-full:hover{background:var(--gold-light);box-shadow:0 6px 24px rgba(196,163,90,0.35)}
.btn-full:disabled{opacity:.4;cursor:not-allowed}
.form-result{margin-top:12px;font-size:0.83rem;min-height:16px}
.form-result.ok{color:var(--accent)}.form-result.err{color:var(--danger)}.form-result.loading{color:var(--muted2)}

.tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
table{width:100%;border-collapse:collapse;font-size:0.82rem}
th{text-align:left;color:var(--muted2);padding:10px 14px;border-bottom:1px solid #111;font-weight:500;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.07em}
td{padding:10px 14px;border-bottom:1px solid #0a0a0a;vertical-align:top}
.chk{color:var(--accent);font-weight:600;display:flex;align-items:center;gap:5px}
.dash{color:#222}

.api-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:580px){.api-grid{grid-template-columns:1fr}}
.api-card{background:var(--surface);border:1px solid #111;border-radius:var(--radius);padding:18px 20px;font-family:'SF Mono','Fira Mono',monospace;font-size:0.78rem}
.api-method{display:inline-block;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold);padding:2px 8px;border-radius:4px;font-size:0.68rem;font-weight:700;margin-bottom:8px;letter-spacing:0.04em}
.api-method.post{background:rgba(0,212,170,0.1);border-color:rgba(0,212,170,0.2);color:var(--accent)}
.api-path{color:#fff;font-size:0.84rem;margin-bottom:6px;font-weight:500}
.api-desc{font-size:0.75rem;color:var(--muted2);font-family:inherit;line-height:1.5}

.sep{border:none;border-top:1px solid #080808;margin:0 0 80px}

.footer{border-top:1px solid #080808;padding:36px 28px;text-align:center;color:var(--muted);font-size:0.76rem}
.footer-links{display:flex;justify-content:center;gap:28px;margin-bottom:12px;flex-wrap:wrap}
.footer-links a{color:var(--muted2);transition:color .15s}
.footer-links a:hover{color:var(--gold)}
.footer-brand{color:var(--muted);display:flex;align-items:center;justify-content:center;gap:8px}

.workflow{display:flex;flex-direction:column;gap:16px;max-width:560px;margin:0 auto}
.wf-step{display:flex;gap:16px;align-items:flex-start}
.wf-num{min-width:32px;height:32px;border-radius:50%;background:var(--gold-dim);border:1px solid var(--gold-border);display:flex;align-items:center;justify-content:center;font-size:0.76rem;font-weight:700;color:var(--gold);flex-shrink:0;margin-top:2px}
.wf-body h4{font-weight:600;margin-bottom:4px;font-size:0.9rem}
.wf-body p{font-size:0.8rem;color:var(--muted2);line-height:1.6}

.info-strip{background:var(--surface2);border:1px solid #111;border-radius:10px;padding:14px 18px;font-size:0.82rem;color:var(--muted2);line-height:1.7;margin-bottom:20px}
.info-strip strong{color:#fff}

.agent-fab{position:fixed;bottom:28px;right:28px;z-index:999;width:56px;height:56px;border-radius:50%;background:var(--gold);color:#000;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(196,163,90,0.4);transition:transform .15s,box-shadow .15s;font-family:inherit;touch-action:manipulation}
.agent-fab:hover{transform:scale(1.08);box-shadow:0 10px 32px rgba(196,163,90,0.55)}
.agent-fab .notif{position:absolute;top:-2px;right:-2px;width:14px;height:14px;border-radius:50%;background:var(--accent);border:2px solid #000;animation:pulse 2s infinite}
.ap-contact-btn{background:none;border:none;color:var(--muted2);cursor:pointer;padding:5px 7px;border-radius:7px;transition:color .15s,background .15s;display:flex;align-items:center;gap:5px;font-size:0.71rem;font-weight:600;font-family:inherit;white-space:nowrap}
.ap-contact-btn:hover{color:var(--gold);background:rgba(196,163,90,0.08)}

.agent-panel{position:fixed;bottom:96px;right:28px;z-index:998;width:340px;max-height:520px;background:#080808;border:1px solid var(--gold-border);border-radius:16px;display:none;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.7)}
.agent-panel.open{display:flex}
.ap-head{padding:14px 16px;border-bottom:1px solid #111;display:flex;align-items:center;gap:10px;flex-shrink:0}
.ap-head-icon{width:30px;height:30px;border-radius:50%;background:var(--gold-dim);border:1px solid var(--gold-border);display:flex;align-items:center;justify-content:center;color:var(--gold);flex-shrink:0}
.ap-head-info{flex:1}
.ap-head-name{font-size:0.84rem;font-weight:700}
.ap-head-status{font-size:0.71rem;color:var(--accent)}
.ap-close{background:none;border:none;color:var(--muted2);cursor:pointer;padding:4px;line-height:1;font-size:1rem}
.ap-close:hover{color:#fff}
.ap-messages{overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px;min-height:180px;max-height:320px}
.ap-msg{max-width:88%;padding:9px 13px;border-radius:12px;font-size:0.82rem;line-height:1.55}
.ap-msg.agent{background:var(--surface2);color:#ccc;border-radius:12px 12px 12px 3px;align-self:flex-start}
.ap-msg.user{background:var(--gold-dim);border:1px solid var(--gold-border);color:#fff;border-radius:12px 12px 3px 12px;align-self:flex-end}
.ap-msg.typing{color:var(--muted2);font-style:italic}
.ap-input-row{padding:12px 14px;border-top:1px solid #111;display:flex;gap:8px;flex-shrink:0}
.ap-inp{flex:1;background:var(--surface2);border:1px solid #1a1a1a;border-radius:8px;color:#fff;padding:9px 12px;font-size:0.83rem;outline:none;font-family:inherit;transition:border-color .15s}
.ap-inp:focus{border-color:var(--gold-border)}
.ap-inp::placeholder{color:var(--muted)}
.ap-send{background:var(--gold);color:#000;border:none;padding:9px 14px;border-radius:8px;font-weight:700;font-size:0.8rem;cursor:pointer;transition:background .15s;flex-shrink:0}
.ap-send:hover{background:var(--gold-light)}
.ap-send:disabled{opacity:.4;cursor:not-allowed}
.ap-contact-form{display:none;overflow-y:auto;padding:14px 16px;flex-direction:column;gap:10px;min-height:200px}
.ct-back{background:none;border:none;color:var(--muted2);cursor:pointer;font-size:0.79rem;padding:0;margin-bottom:4px;display:flex;align-items:center;gap:5px;font-family:inherit;transition:color .15s}
.ct-back:hover{color:var(--gold)}
.ct-field{display:flex;flex-direction:column;gap:5px}
.ct-field label{font-size:0.71rem;color:var(--muted2);font-weight:600;letter-spacing:0.05em;text-transform:uppercase}
.ct-field input,.ct-field textarea{background:var(--surface2);border:1px solid #1c1c1c;border-radius:8px;color:#fff;padding:8px 11px;font-size:0.82rem;outline:none;font-family:inherit;transition:border-color .15s;resize:none;width:100%}
.ct-field input:focus,.ct-field textarea:focus{border-color:var(--gold-border)}
.ct-field textarea{height:70px}
.ct-submit{background:var(--gold);color:#000;border:none;padding:10px;border-radius:8px;font-weight:700;font-size:0.86rem;cursor:pointer;font-family:inherit;transition:background .15s}
.ct-submit:hover{background:var(--gold-light)}.ct-submit:disabled{opacity:.5;cursor:default}
.ct-result{font-size:0.78rem;min-height:14px}
.ct-result.ok{color:var(--accent)}.ct-result.err{color:var(--danger)}
.ct-or{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:0.72rem}
.ct-or::before,.ct-or::after{content:'';flex:1;border-top:1px solid #1a1a1a}
.ct-x-link{display:flex;align-items:center;justify-content:center;gap:7px;border:1px solid #1c1c1c;border-radius:8px;padding:9px;font-size:0.81rem;color:var(--muted2);transition:border-color .15s,color .15s;text-decoration:none}
.ct-x-link:hover{border-color:var(--gold-border);color:var(--gold)}

.hbg{display:none;background:none;border:none;cursor:pointer;padding:8px;flex-direction:column;gap:5px;justify-content:center;align-items:center;flex-shrink:0}
.hbg span{display:block;width:20px;height:2px;background:var(--muted2);border-radius:2px;transition:all .25s}
.hbg.is-open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.hbg.is-open span:nth-child(2){opacity:0}
.hbg.is-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
.mob-nav{display:none;position:fixed;top:60px;left:0;right:0;bottom:0;background:rgba(0,0,0,0.97);padding:16px 20px calc(40px + env(safe-area-inset-bottom));z-index:998;flex-direction:column;gap:0;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);overflow-y:auto}
.mob-nav.is-open{display:flex}
.mob-nav a{display:block;padding:14px 16px;color:var(--muted2);font-size:0.95rem;font-weight:500;border-radius:10px;transition:color .15s,background .15s;border-bottom:1px solid #0d0d0d}
.mob-nav a.mob-active{color:var(--gold);background:var(--gold-dim)}
.mob-nav .mob-cta{background:var(--gold);color:#000!important;font-weight:800;text-align:center;margin-top:14px;border-radius:10px;padding:15px 16px!important;border:none;display:block;border-bottom:none!important;font-size:0.95rem}
.mob-nav .mob-ai{color:var(--accent)!important;border:1px solid rgba(0,212,170,0.3);border-radius:8px;text-align:center;margin-top:6px;border-bottom:none!important;padding:12px 16px!important;font-weight:600!important}
.mob-nav .mob-donate{color:rgba(196,163,90,0.8)!important}
@media(max-width:768px){
  .wrap,.wrap-sm,.wrap-md{padding:0 20px}
  .hdr-inner{padding:0 20px}
  .pbar{padding:0 18px;gap:20px}
  .feat-grid{grid-template-columns:1fr 1fr}
  .section-title{font-size:1.3rem}
  .status-widget,.form-card{padding:22px}
  .pbar .pb-item:nth-child(7){display:none}
}
@media(max-width:640px){
  .wrap,.wrap-sm,.wrap-md{padding:0 16px}
  .hero{padding:40px 16px 32px}
  .hdr-inner{padding:0 16px}
  .pbar{padding:0 12px;gap:12px;font-size:0.71rem;height:32px}
  .pbar .pb-item:nth-child(6){display:none}
  .feat-grid{grid-template-columns:1fr 1fr}
  .api-grid{grid-template-columns:1fr}
  .hbg{display:flex}
  .nav a{display:none!important}
  .agent-panel{width:calc(100vw - 24px);right:12px;bottom:calc(76px + env(safe-area-inset-bottom));max-height:70vh}
  .agent-fab{bottom:calc(14px + env(safe-area-inset-bottom));right:12px;width:48px;height:48px}
  .btn-row{flex-direction:column;align-items:stretch;gap:10px}
  .btn-row .btn-primary,.btn-row .btn-ghost,.btn-row .btn-accent{width:100%;justify-content:center}
  .btn-primary{padding:14px 20px;min-height:48px}
  .btn-ghost,.btn-accent{padding:13px 20px;min-height:48px}
  table{font-size:0.72rem}
  th,td{padding:6px 8px}
  th{font-size:0.64rem}
  .section-title{font-size:1.2rem}
  .status-widget,.form-card{padding:18px 16px}
  .inp-row{flex-direction:column}
  .inp-row .btn-sm{width:100%;min-height:44px}
  .btn-sm{min-height:44px}
  .chart-strip{height:90px}
  .info-strip{font-size:0.78rem;padding:12px 14px}
  .field select,.inp{font-size:1rem}
  .ap-inp{font-size:1rem}
  .ct-field input,.ct-field textarea{font-size:1rem}
}
@media(max-width:480px){
  .nav-guide-pill{display:none}
  .hero h1{font-size:1.9rem}
  .hero-sub{font-size:0.88rem}
  .hero-eyebrow{font-size:0.68rem;padding:4px 12px}
  .pbar .pb-item:nth-child(2){display:none}
  .pbar{gap:10px;font-size:0.68rem}
  .two-product{grid-template-columns:1fr}
  .feat-grid{grid-template-columns:1fr}
  .tbl-wrap{margin:0 -16px;border-radius:0}
  th:nth-child(4),td:nth-child(4){display:none}
  .section{padding:0 0 60px}
  .workflow{gap:12px}
  .wf-step{gap:12px}
  table{font-size:0.68rem}
  th,td{padding:5px 6px}
}
@media(max-width:400px){
  .pbar .pb-item:nth-child(5){display:none}
  .pbar{gap:8px;font-size:0.64rem}
  .hero h1{font-size:1.65rem}
  .hero-sub{font-size:0.84rem}
  .feat-grid{grid-template-columns:1fr}
  th:nth-child(3),td:nth-child(3){display:none}
  table{font-size:0.62rem}
  th,td{padding:4px 5px}
}
.intg-strip{padding:32px 0;border-top:1px solid #0d0d0d;border-bottom:1px solid #0d0d0d;background:var(--surface);overflow:hidden;position:relative}
.intg-strip::before,.intg-strip::after{content:'';position:absolute;top:0;height:100%;width:100px;z-index:2;pointer-events:none}
.intg-strip::before{left:0;background:linear-gradient(to right,var(--surface) 0%,transparent 100%)}
.intg-strip::after{right:0;background:linear-gradient(to left,var(--surface) 0%,transparent 100%)}
.intg-label{text-align:center;font-size:0.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.12em;font-weight:600;margin-bottom:20px}
.intg-scroll{overflow:hidden}
.intg-track{display:flex;gap:0;width:max-content;animation:marquee 36s linear infinite}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.intg-item{display:flex;flex-direction:column;align-items:center;gap:8px;padding:0 20px;opacity:.45;transition:opacity .2s;flex-shrink:0;cursor:default}
.intg-item:hover{opacity:1}
.intg-icon{width:42px;height:42px;border-radius:11px;background:var(--surface2);border:1px solid #181818;display:flex;align-items:center;justify-content:center;transition:border-color .2s}
.intg-item:hover .intg-icon{border-color:var(--gold-border)}
.intg-name{font-size:0.62rem;color:var(--muted2);letter-spacing:0.06em;text-transform:uppercase;font-weight:600;white-space:nowrap}
.intg-divider{width:1px;height:52px;background:#141414;align-self:center;flex-shrink:0;margin:0 12px}

details summary{user-select:none;-webkit-tap-highlight-color:transparent}
details summary::-webkit-details-marker{display:none}
details[open]{border-color:var(--gold-border)!important}
details[open] summary{color:#fff}
details summary::after{content:'+';font-size:1rem;color:var(--muted);font-weight:300;flex-shrink:0;transition:transform .2s}
details[open] summary::after{content:'−'}
.whale-widget{background:var(--surface);border:1px solid rgba(196,163,90,0.18);border-radius:14px;padding:22px 24px;position:relative;overflow:hidden}
.whale-widget h3{font-size:0.92rem;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.whale-badge{font-size:0.65rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;background:rgba(196,163,90,0.12);border:1px solid rgba(196,163,90,0.3);color:var(--gold);padding:2px 8px;border-radius:20px}
.whale-row{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--surface2);border-radius:8px;margin-bottom:8px;font-size:0.8rem;gap:10px}
.whale-row:last-child{margin-bottom:0}
.whale-cls{font-weight:700;font-size:0.7rem;text-transform:uppercase;letter-spacing:.05em;padding:2px 8px;border-radius:20px;white-space:nowrap}
.whale-cls.whale{background:rgba(196,163,90,0.12);color:var(--gold)}
.whale-cls.institutional{background:rgba(0,212,170,0.1);color:var(--accent)}
.whale-cls.mega{background:rgba(239,68,68,0.12);color:#ef4444}
.whale-amt{font-weight:700;color:#fff}
.whale-time{color:var(--muted2);font-size:0.72rem;white-space:nowrap}
.whale-locked{position:absolute;inset:0;background:rgba(8,8,8,0.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center;padding:24px;border-radius:14px}
.whale-blur-row{height:38px;background:var(--surface2);border-radius:8px;margin-bottom:8px;filter:blur(4px);opacity:.5}
.whale-empty{color:var(--muted2);font-size:0.8rem;padding:16px 0;text-align:center}
@media(max-width:640px){.whale-row{flex-wrap:wrap;gap:6px}}
`;

const INTG_ITEMS = `
      <div class="intg-item"><div class="intg-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 10c-2.5 0-4.7-1.3-6-3.2.9-1.4 2.5-2.3 4.2-2.3h3.5c1.8 0 3.4.9 4.3 2.3C16.7 15.7 14.5 17 12 17z" fill="rgba(196,163,90,0.8)"/></svg></div><span class="intg-name">Claude</span></div>
      <div class="intg-item"><div class="intg-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 3l2 4-4 2 4 2-2 4-2-4 4-2-4-2 2-4z" fill="rgba(196,163,90,0.8)"/></svg></div><span class="intg-name">ChatGPT</span></div>
      <div class="intg-item"><div class="intg-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zm6 9l.8 2.2L21 15l-2.2.8L18 18l-.8-2.2L15 15l2.2-.8L18 12zm-12 0l.8 2.2L9 15l-2.2.8L6 18l-.8-2.2L3 15l2.2-.8L6 12z" fill="rgba(196,163,90,0.8)"/></svg></div><span class="intg-name">Gemini</span></div>
      <div class="intg-item"><div class="intg-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 17V7l8-4 8 4v10l-8 4-8-4zm8-11L6 9v6l6 3 6-3V9l-6-3z" fill="rgba(196,163,90,0.8)"/></svg></div><span class="intg-name">DeepSeek</span></div>
      <div class="intg-item"><div class="intg-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="rgba(196,163,90,0.8)" stroke-width="2.5" stroke-linecap="round"/></svg></div><span class="intg-name">Grok</span></div>
      <div class="intg-item"><div class="intg-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12l9-9 9 9M5 10v9h4v-5h6v5h4v-9" stroke="rgba(196,163,90,0.8)" stroke-width="2" stroke-linejoin="round" fill="none"/></svg></div><span class="intg-name">Mistral</span></div>
      <div class="intg-divider"></div>
      <div class="intg-item"><div class="intg-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20 4H4C2.9 4 2 4.9 2 6v9c0 1.1.9 2 2 2h4v3l4-3h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="rgba(0,212,170,0.75)"/></svg></div><span class="intg-name">Discord</span></div>
      <div class="intg-item"><div class="intg-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="rgba(0,212,170,0.75)" stroke-width="2" stroke-linejoin="round" fill="none"/></svg></div><span class="intg-name">Telegram</span></div>
      <div class="intg-item"><div class="intg-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 9a5 5 0 0 1-5 5M10 9a5 5 0 0 0 5 5m-5-5V5m5 4V5M5 14a5 5 0 0 1 5-5m-5 5v4m14-4a5 5 0 0 0-5-5m5 5v4" stroke="rgba(0,212,170,0.75)" stroke-width="2" stroke-linecap="round"/></svg></div><span class="intg-name">Slack</span></div>
      <div class="intg-item"><div class="intg-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 4l16 16M20 4L4 20" stroke="rgba(0,212,170,0.75)" stroke-width="2.5" stroke-linecap="round"/></svg></div><span class="intg-name">X / Twitter</span></div>
      <div class="intg-item"><div class="intg-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M10 3H3v7h7V3zm11 0h-7v7h7V3zm0 11h-7v7h7v-7zm-11 0H3v7h7v-7z" fill="rgba(0,212,170,0.75)"/></svg></div><span class="intg-name">MCP / SDK</span></div>
      <div class="intg-divider"></div>`;

const INTG_STRIP = `
<div class="intg-strip">
  <div class="intg-label">Works with every major AI &amp; platform</div>
  <div class="intg-scroll">
    <div class="intg-track">${INTG_ITEMS}${INTG_ITEMS}</div>
  </div>
</div>`;

function header(active: string): string {
  return `
<header class="hdr">
  <div class="hdr-inner">
    <div style="display:flex;align-items:center;gap:8px">
      <a href="/onboard" class="logo">
        <div class="logo-mark"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/></svg></div>
        KTA <em>Oracle</em>
      </a>
      <div style="width:1px;height:16px;background:#1e1e1e;margin:0 2px;flex-shrink:0"></div>
      <a href="/oracle" class="nav-oracle-pill${active==="oracle"?" active":""}"><span class="live-dot" style="width:5px;height:5px;flex-shrink:0"></span>Oracle</a>
      <a href="/guide" class="nav-guide-pill${active==="guide"?" active":""}">Guide</a>
    </div>
    <nav class="nav">
      <a href="/onboard" class="${active==="onboard"?"active":""}">Onboard</a>
      <a href="/checkout" class="${active==="checkout"?"active":""}">Pricing</a>
      <a href="/tools" class="${active==="tools"?"active":""}">Tools</a>
      <a href="/donate" class="nav-donate${active==="donate"?" active":""}">Donate</a>
      <a href="/tools#ai" class="nav-ai-btn${active==="tools"?" nav-ai-active":""}">Connect AI</a>
      <a href="/checkout" class="nav-cta">Get access →</a>
    </nav>
    <button class="hbg" id="hbg-btn" onclick="toggleMobNav()" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</header>
<nav class="mob-nav" id="mob-nav">
  <a href="/oracle"${active==="oracle"?' class="mob-active"':''}>Oracle</a>
  <a href="/onboard"${active==="onboard"?' class="mob-active"':''}>Onboard</a>
  <a href="/guide"${active==="guide"?' class="mob-active"':''}>Guide</a>
  <a href="/checkout"${active==="checkout"?' class="mob-active"':''}>Pricing</a>
  <a href="/tools"${active==="tools"?' class="mob-active"':''}>Tools</a>
  <a href="/donate" class="mob-donate${active==="donate"?' mob-active':''}">Donate</a>
  <a href="/tools#ai" class="mob-ai">Connect AI</a>
  <a href="/checkout" class="mob-cta">Get access →</a>
</nav>
<script>
function toggleMobNav(){var b=document.getElementById('hbg-btn'),m=document.getElementById('mob-nav');if(!b||!m)return;b.classList.toggle('is-open');m.classList.toggle('is-open');}
document.addEventListener('click',function(e){var m=document.getElementById('mob-nav'),b=document.getElementById('hbg-btn');if(!m||!m.classList.contains('is-open'))return;if(!m.contains(e.target)&&(!b||!b.contains(e.target))){m.classList.remove('is-open');if(b)b.classList.remove('is-open');}});
</script>`;
}

function priceBar(appUrl: string): string {
  return `
<div class="pbar" id="pbar">
  <div class="pb-item pb-live" id="pb-live-ind"><span class="live-dot" id="live-dot"></span><span id="live-label">LIVE</span></div>
  <div class="pb-item" id="pb-ago-item" style="display:none"><span class="pb-label" id="pb-ago" style="font-size:0.7rem"></span></div>
  <div class="pb-item"><span class="pb-label">KTA/USD</span>&nbsp;<span class="pb-val" id="pb-price">—</span></div>
  <div class="pb-item"><span class="pb-label">1h</span>&nbsp;<span class="pb-val" id="pb-1h">—</span></div>
  <div class="pb-item"><span class="pb-label">24h</span>&nbsp;<span class="pb-val" id="pb-24h">—</span></div>
  <div class="pb-item"><span class="pb-label">7d</span>&nbsp;<span class="pb-val" id="pb-7d">—</span></div>
  <div class="pb-item"><span class="pb-label">Network</span>&nbsp;<span class="pb-val" style="color:var(--accent)">Keeta Mainnet</span></div>
</div>
<script>
(function(){
  var fails=0,offline=false,fetchingLive=false,fetchingFull=false,lastPrice=0,lastFetch=0,hasLive=false;
  function fmt(n){if(n==null||n===undefined)return'—';return(n>=0?'+':'')+n.toFixed(2)+'%';}
  function cls(n){return(n==null||n===undefined)?'':(n>=0?' pb-up':' pb-dn');}
  function updateAgo(){
    var ago=document.getElementById('pb-ago');
    var agoItem=document.getElementById('pb-ago-item');
    if(!ago||!lastFetch)return;
    var s=Math.floor((Date.now()-lastFetch)/1000);
    if(agoItem)agoItem.style.display='';
    ago.textContent=s<5?'just now':s<60?s+'s ago':Math.floor(s/60)+'m ago';
  }
  function setOnline(){
    var bar=document.getElementById('pbar');
    var dot=document.getElementById('live-dot');
    var lbl=document.getElementById('live-label');
    var ind=document.getElementById('pb-live-ind');
    if(bar)bar.classList.remove('offline');
    if(dot)dot.classList.remove('off');
    if(lbl)lbl.style.color='';
    if(ind)ind.classList.remove('offline');
  }
  function flashPrice(dir){
    var p=document.getElementById('pb-price');
    if(!p)return;
    p.classList.remove('pb-flash-up','pb-flash-dn');
    void p.offsetWidth;
    p.classList.add(dir==='up'?'pb-flash-up':'pb-flash-dn');
    setTimeout(function(){p.classList.remove('pb-flash-up','pb-flash-dn');},900);
  }
  function updatePrice(price,ts,skipChart){
    fails=0;offline=false;lastFetch=Date.now();
    setOnline();
    var p=document.getElementById('pb-price');
    if(p){
      var dir=lastPrice&&price>lastPrice?'up':lastPrice&&price<lastPrice?'dn':null;
      p.textContent='$'+Number(price).toFixed(6);
      p.className='pb-val';
      if(dir)flashPrice(dir);
      lastPrice=price;
    }
    updateAgo();
    if(typeof window.addPricePoint==='function'&&!skipChart)window.addPricePoint(price,ts||Date.now());
  }
  function goOffline(){
    if(offline)return;
    offline=true;
    var bar=document.getElementById('pbar');
    var dot=document.getElementById('live-dot');
    var lbl=document.getElementById('live-label');
    var ind=document.getElementById('pb-live-ind');
    if(bar)bar.classList.add('offline');
    if(dot)dot.classList.add('off');
    if(lbl)lbl.style.color='var(--danger)';
    if(ind)ind.classList.add('offline');
    ['pb-price','pb-1h','pb-24h','pb-7d'].forEach(function(id){
      var el=document.getElementById(id);if(el){el.textContent='—';el.className='pb-val pb-off';}
    });
  }
  function updateChanges(d){
    var c1=document.getElementById('pb-1h');if(c1&&d.change_pct!=null){c1.textContent=fmt(d.change_pct);c1.className='pb-val'+cls(d.change_pct);}
    var c2=document.getElementById('pb-24h');if(c2&&d.change_24h!=null){c2.textContent=fmt(d.change_24h);c2.className='pb-val'+cls(d.change_24h);}
    var c3=document.getElementById('pb-7d');if(c3&&d.change_7d!=null){c3.textContent=fmt(d.change_7d);c3.className='pb-val'+cls(d.change_7d);}
  }
  async function loadLive(){
    if(fetchingLive)return;
    fetchingLive=true;
    try{
      var r=await fetch('${appUrl}/price/live',{signal:AbortSignal.timeout(7000)});
      if(!r.ok){fails++;if(fails>=3)goOffline();fetchingLive=false;return;}
      var d=await r.json();
      if(!d.price){fails++;if(fails>=3)goOffline();fetchingLive=false;return;}
      hasLive=true;
      updatePrice(d.price,d.ts,false);
      updateChanges(d);
    }catch(e){fails++;if(fails>=3)goOffline();}
    fetchingLive=false;
  }
  async function loadFull(){
    if(fetchingFull)return;
    fetchingFull=true;
    try{
      var r=await fetch('${appUrl}/price',{signal:AbortSignal.timeout(9000)});
      if(!r.ok){fetchingFull=false;return;}
      var d=await r.json();
      if(!d.price){fetchingFull=false;return;}
      updatePrice(d.price,d.ts,true);
      if(!hasLive)updateChanges(d);
    }catch(e){}
    fetchingFull=false;
  }
  loadFull();
  loadLive();
  setInterval(loadLive,10000);
  setInterval(loadFull,60000);
  setInterval(updateAgo,10000);
  document.addEventListener('visibilitychange',function(){if(!document.hidden){fails=0;loadLive();loadFull();}});
})();
</script>`;
}

function priceChart(appUrl: string): string {
  return `
<div class="chart-strip" id="chart-strip">
  <canvas id="price-chart" style="display:block;width:100%;height:100%"></canvas>
</div>
<script>
(function(){
  var pts=[];
  var canvas=document.getElementById('price-chart');
  var ctx=canvas?canvas.getContext('2d'):null;
  var dpr=window.devicePixelRatio||1;
  var pulse=0;
  var raf=null;
  var resizeTimer=null;

  function resize(){
    if(!canvas)return;
    var strip=document.getElementById('chart-strip');
    if(!strip)return;
    var W=strip.clientWidth,H=strip.clientHeight;
    if(!W||!H)return;
    canvas.width=W*dpr;canvas.height=H*dpr;
    canvas.style.width=W+'px';canvas.style.height=H+'px';
    if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);
    draw(pulse);
  }

  function draw(p){
    if(!ctx)return;
    var W=canvas.width/dpr,H=canvas.height/dpr;
    if(!W||!H)return;
    ctx.clearRect(0,0,W,H);

    // subtle horizontal grid lines
    ctx.strokeStyle='rgba(255,255,255,0.025)';ctx.lineWidth=1;
    for(var i=1;i<4;i++){var gy=H*i/4;ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}

    if(pts.length<1){
      // no data yet: draw a faint placeholder line at 75%
      var sy=H*0.75;
      ctx.beginPath();ctx.strokeStyle='rgba(196,163,90,0.15)';ctx.lineWidth=1;
      ctx.setLineDash([6,8]);ctx.moveTo(0,sy);ctx.lineTo(W,sy);ctx.stroke();ctx.setLineDash([]);
      return;
    }

    var prices=pts.map(function(pt){return pt.p;});
    var mn=Math.min.apply(null,prices);
    var mx=Math.max.apply(null,prices);
    var spread=mx-mn;
    var minSpread=mn*0.0010;
    var flat=spread<minSpread;
    if(flat){mn=mn-minSpread/2;mx=mx+minSpread/2;spread=minSpread;}
    // bias padding: more space above than below so line sits at ~75% height when flat
    var padTop=spread*(flat?0.75:0.25);
    var padBot=spread*(flat?3.0:0.25);
    mn-=padBot;mx+=padTop;var rng=mx-mn;

    var first=pts[0].p,last=pts[pts.length-1].p;
    var up=last>=first;
    var lineColor=up?'rgba(196,163,90,0.92)':'rgba(255,80,80,0.85)';
    var fillTop=up?'rgba(196,163,90,0.14)':'rgba(255,80,80,0.10)';
    var dotColor=up?'#C4A35A':'#ff5050';

    function px(i){return(i/(Math.max(pts.length-1,1)))*W;}
    function py(v){return H-((v-mn)/rng)*H;}

    // fill gradient
    var grad=ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,fillTop);grad.addColorStop(1,'rgba(0,0,0,0)');
    ctx.beginPath();
    pts.forEach(function(pt,i){if(i===0)ctx.moveTo(px(i),py(pt.p));else ctx.lineTo(px(i),py(pt.p));});
    ctx.lineTo(px(pts.length-1),H);ctx.lineTo(0,H);ctx.closePath();
    ctx.fillStyle=grad;ctx.fill();

    // price line
    ctx.beginPath();
    pts.forEach(function(pt,i){if(i===0)ctx.moveTo(px(i),py(pt.p));else ctx.lineTo(px(i),py(pt.p));});
    ctx.strokeStyle=lineColor;ctx.lineWidth=1.5;ctx.lineJoin='round';ctx.stroke();

    // pulsing end dot
    var ex=px(pts.length-1),ey=py(last);
    var ring=2.5+Math.sin(p)*2.5;
    ctx.beginPath();ctx.arc(ex,ey,ring,0,Math.PI*2);
    ctx.fillStyle='rgba(196,163,90,'+(0.08+Math.sin(p)*0.08)+')';ctx.fill();
    ctx.beginPath();ctx.arc(ex,ey,3.5,0,Math.PI*2);
    ctx.fillStyle=dotColor;ctx.fill();
  }

  function animate(){
    pulse+=0.05;
    draw(pulse);
    raf=requestAnimationFrame(animate);
  }

  window.addPricePoint=function(price,ts){
    pts.push({p:price,t:ts||Date.now()});
    if(pts.length>120)pts.shift();
  };

  async function loadHistory(){
    try{
      var r=await fetch('${appUrl}/price/history',{signal:AbortSignal.timeout(6000)});
      if(!r.ok)return;
      var d=await r.json();
      if(Array.isArray(d.points)&&d.points.length){
        var lastHistTs=d.points[d.points.length-1].t||0;
        var livePts=pts.filter(function(pt){return pt.t>lastHistTs;});
        pts=d.points.slice(-120).concat(livePts).slice(-120);
      }
    }catch(e){}
  }

  window.addEventListener('resize',function(){
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(resize,150);
  });
  requestAnimationFrame(function(){resize();animate();});
  loadHistory();
})();
</script>`;
}

function agentWidget(): string {
  return `
<button class="agent-fab" id="agent-fab" onclick="toggleAgent()" title="Ask AI">
  ${icon('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', 22)}
  <span class="notif"></span>
</button>
<div class="agent-panel" id="agent-panel">
  <div class="ap-head">
    <div class="ap-head-icon">${icon('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>', 15)}</div>
    <div class="ap-head-info">
      <div class="ap-head-name" id="ap-head-name">Support Agent</div>
      <div class="ap-head-status">● Online</div>
    </div>
    <button class="ap-contact-btn" onclick="openContact()">${icon('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>', 14)} Contact</button>
    <button class="ap-close" onclick="toggleAgent()">✕</button>
  </div>
  <div class="ap-messages" id="ap-msgs">
    <div class="ap-msg agent">Hey. Ask me anything about tiers, tools, payments, or the Oracle API. I keep it short and useful.</div>
  </div>
  <div class="ap-input-row" id="ap-input-row">
    <input class="ap-inp" id="ap-input" placeholder="Ask about tiers, tools, or access…" onkeydown="if(event.key==='Enter')sendAgent()">
    <button class="ap-send" id="ap-send" onclick="sendAgent()">→</button>
  </div>
  <div class="ap-contact-form" id="ap-contact-form">
    <button class="ct-back" onclick="showChat()">${icon('<polyline points="15 18 9 12 15 6"/>', 13)} Back to chat</button>
    <div class="ct-field"><label>Full name</label><input type="text" id="ct-name" placeholder="Your full name" maxlength="120" autocomplete="name"></div>
    <div class="ct-field"><label>Email</label><input type="email" id="ct-email" placeholder="you@example.com" maxlength="200" autocomplete="email"></div>
    <div class="ct-field"><label>Message</label><textarea id="ct-msg" placeholder="Describe what you need help with…" maxlength="1000"></textarea></div>
    <div id="ct-status-section" style="display:contents">
      <div class="ct-or">already submitted?</div>
      <a class="ct-x-link" href="/support/status" target="_blank" rel="noopener">Check ticket status →</a>
      <div class="ct-or">or reach out directly</div>
      <a class="ct-x-link" href="https://x.com/elemzir" target="_blank" rel="noopener">Message @elemzir on X</a>
    </div>
    <button class="ct-submit" id="ct-submit" onclick="submitContact()">Send message</button>
    <div class="ct-result" id="ct-result" style="margin-top:4px"></div>
  </div>
</div>
<script>
function toggleAgent(){
  var p=document.getElementById('agent-panel');
  if(!p)return;
  p.classList.toggle('open');
  if(p.classList.contains('open'))showChat();
  var n=document.querySelector('.agent-fab .notif');
  if(n)n.style.display='none';
}
function openContact(){
  var p=document.getElementById('agent-panel');
  if(!p)return;
  p.classList.add('open');
  var n=document.querySelector('.agent-fab .notif');
  if(n)n.style.display='none';
  showContact();
}
function showContact(){
  document.getElementById('ap-msgs').style.display='none';
  document.getElementById('ap-input-row').style.display='none';
  document.getElementById('ap-contact-form').style.display='flex';
  var h=document.getElementById('ap-head-name');if(h)h.textContent='Contact us';
}
function showChat(){
  document.getElementById('ap-msgs').style.display='';
  document.getElementById('ap-input-row').style.display='';
  document.getElementById('ap-contact-form').style.display='none';
  var h=document.getElementById('ap-head-name');if(h)h.textContent='Support Agent';
}
async function sendAgent(){
  var inp=document.getElementById('ap-input');
  var msgs=document.getElementById('ap-msgs');
  var btn=document.getElementById('ap-send');
  var msg=inp.value.trim();
  if(!msg||btn.disabled)return;
  inp.value='';
  var uDiv=document.createElement('div');uDiv.className='ap-msg user';uDiv.textContent=msg;msgs.appendChild(uDiv);
  var tDiv=document.createElement('div');tDiv.className='ap-msg agent typing';tDiv.textContent='Thinking…';msgs.appendChild(tDiv);
  msgs.scrollTop=msgs.scrollHeight;
  btn.disabled=true;
  try{
    var r=await fetch('/agent',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg})});
    var txt=await r.text();var d;try{d=JSON.parse(txt);}catch(pe){d=null;}
    tDiv.className='ap-msg agent';tDiv.textContent=(d&&d.reply)||'Agent is taking a break — check /status?wallet= for your tier info.';
  }catch(e){tDiv.className='ap-msg agent';tDiv.textContent='Check your connection and try again.';}
  msgs.scrollTop=msgs.scrollHeight;
  var cd=5;btn.textContent='Send ('+cd+'s)';
  var iv=setInterval(function(){cd--;if(cd<=0){clearInterval(iv);btn.disabled=false;btn.textContent='Send';}else{btn.textContent='Send ('+cd+'s)';}},1000);
}
async function submitContact(){
  var name=document.getElementById('ct-name').value.trim();
  var email=document.getElementById('ct-email').value.trim();
  var msg=document.getElementById('ct-msg').value.trim();
  var res=document.getElementById('ct-result');
  var btn=document.getElementById('ct-submit');
  if(!name||!email||!msg){res.className='ct-result err';res.textContent='All fields are required.';return;}
  btn.disabled=true;res.className='ct-result';res.textContent='Sending…';
  try{
    var r=await fetch('/support',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name,email:email,message:msg})});
    var d=await r.json();
    if(d.ok){
      res.className='ct-result ok';
      var tid=d.ticketId||'';
      res.innerHTML='Message sent! <br><span style="font-size:0.78rem;color:#aaa">Ticket ID — save this to check replies:</span><br><code style="font-size:0.72rem;color:#C4A35A;word-break:break-all">'+tid+'</code><br><a href="/support/status?ticket='+encodeURIComponent(tid)+'" target="_blank" style="font-size:0.78rem;color:#C4A35A;text-decoration:underline">Check reply status →</a>';
      var ss=document.getElementById('ct-status-section');if(ss)ss.style.display='none';
      document.getElementById('ct-name').value='';
      document.getElementById('ct-email').value='';
      document.getElementById('ct-msg').value='';
    }else{res.className='ct-result err';res.textContent=d.error||'Failed to send — try again.';}
  }catch(e){res.className='ct-result err';res.textContent='Network error — try again.';}
  btn.disabled=false;
}
</script>`;
}

function footer(): string {
  return `
<footer class="footer">
  <div class="footer-links">
    <a href="/onboard">Onboard</a>
    <a href="/checkout">Pricing</a>
    <a href="/tools">Tools</a>
    <a href="/legal">Legal</a>
    <a href="/privacy">Privacy</a>
    <a href="https://keeta.com" target="_blank" rel="noopener">Keeta Network</a>
    <a href="https://x.com/elemzir" target="_blank" rel="noopener">@elemzir</a>
  </div>
  <div class="footer-brand">
    KTA Oracle Agent &nbsp;·&nbsp; Powered by Keeta Network &nbsp;·&nbsp; Sweden, EU
  </div>
  <div style="margin-top:10px;color:var(--muted);font-size:0.71rem;letter-spacing:0.03em">&copy; 2026 ELEMZIR. All rights reserved.</div>
</footer>`;
}

export function renderOnboard(appUrl: string, oracleWallet: string, trialLimit: number, lifetimeKta: number): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>KTA Oracle — Live KTA Intelligence</title>
<meta name="description" content="Real-time KTA price alerts, whale tracking, and AI insights — delivered to Discord, Telegram, Slack, and X/Twitter.">
<meta property="og:type" content="website"><meta property="og:url" content="${appUrl}/"><meta property="og:title" content="KTA Oracle — Live KTA Intelligence"><meta property="og:description" content="Real-time KTA price alerts, whale tracking, and AI insights — delivered to Discord, Telegram, Slack, and X/Twitter."><meta property="og:image" content="${appUrl}/og2.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${appUrl}/og2.png">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${BASE_CSS}
.two-product{display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:640px;margin:0 auto 40px}
@media(max-width:500px){.two-product{grid-template-columns:1fr}}
.prod-pill{background:var(--surface);border:1px solid #111;border-radius:10px;padding:16px 20px;display:flex;align-items:center;gap:12px;transition:border-color .2s}
.prod-pill:hover{border-color:var(--gold-border)}
.prod-pill-icon{color:var(--gold)}.prod-pill-icon.accent{color:var(--accent)}
.chart-strip{background:var(--surface);border-top:1px solid rgba(196,163,90,0.22);border-bottom:1px solid rgba(196,163,90,0.10);height:130px;overflow:hidden}
.prod-pill h4{font-size:0.86rem;font-weight:700;margin-bottom:2px}
.prod-pill p{font-size:0.75rem;color:var(--muted2)}
@media(max-width:640px){.donate-reward-grid{grid-template-columns:1fr!important}}
.scell{padding:22px 28px;text-align:center}.sval{font-size:2.2rem;font-weight:800;letter-spacing:-0.04em;line-height:1}.svs{display:flex;align-items:center;justify-content:center;padding:0 20px;color:var(--muted);font-size:0.82rem;font-weight:700}
@media(max-width:520px){.scell{padding:16px 12px}.sval{font-size:1.7rem}.svs{padding:0 10px;font-size:0.72rem}}
@media(max-width:380px){.scell{padding:12px 8px}.sval{font-size:1.35rem}.svs{padding:0 6px}}
</style>
</head>
<body>
${header("onboard")}
${priceBar(appUrl)}
${priceChart(appUrl)}

<section class="hero">
  <div class="hero-eyebrow">100% Open Source</div>
  <h1>KTA intelligence,<br><em>everywhere you work.</em></h1>
  <p class="hero-sub">Price alerts, whale tracking, and AI insights — pushed to Discord, Telegram, Slack, and X. Priced natively from Keeta's FX anchor. Free trial included. Lifetime alerts from ${lifetimeKta} KTA.</p>

  <div class="two-product">
    <div class="prod-pill">
      <div class="prod-pill-icon">${ICONS.oracle}</div>
      <div><h4>Oracle API</h4><p>Live price · FX rates · 19 tools</p></div>
    </div>
    <div class="prod-pill">
      <div class="prod-pill-icon accent">${ICONS.broadcast}</div>
      <div><h4>Social Agent</h4><p>Alerts · AI insights · 4 platforms</p></div>
    </div>
  </div>
  <div class="btn-row">
    <a href="#register" class="btn-primary">${ICONS.bolt} Start — 0.1 KTA · ${trialLimit} alerts</a>
    <a href="/checkout" class="btn-ghost">${ICONS.tier} View plans</a>
    <a href="/tools" class="btn-accent">${ICONS.tools} Browse tools</a>
  </div>
</section>

<div class="wrap" style="margin-bottom:0;padding-bottom:0">
  <div style="display:grid;grid-template-columns:1fr auto 1fr;background:var(--surface);border:1px solid #111;border-radius:14px;overflow:hidden;margin-bottom:20px">
    <div class="scell" style="border-right:1px solid #0d0d0d">
      <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted2);margin-bottom:10px">SWIFT wire — $50,000</div>
      <div class="sval" style="color:#ff5555">~$1,050</div>
      <div style="font-size:0.77rem;color:var(--muted2);margin-top:6px">3–5 business days</div>
    </div>
    <div class="svs">vs</div>
    <div class="scell" style="border-left:1px solid #0d0d0d">
      <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted2);margin-bottom:10px">Keeta Network — $50,000</div>
      <div class="sval" style="color:var(--accent)">$75</div>
      <div style="font-size:0.77rem;color:var(--accent);margin-top:6px">0.4 seconds</div>
    </div>
  </div>
  <div style="text-align:center;font-size:0.7rem;color:var(--muted);margin-bottom:28px;letter-spacing:0.03em">14× cheaper &nbsp;·&nbsp; 1,080,000× faster &nbsp;·&nbsp; same global finality</div>

</div>

<div class="wrap">
  <div class="feat-grid" style="margin-bottom:88px">
    <div class="feat-card">
      <div class="feat-icon">${ICONS.oracle}</div>
      <h3>100% native pricing</h3>
      <p>Price sourced directly from Keeta Network's FX anchor — the same engine that settles real payments.</p>
    </div>
    <div class="feat-card">
      <div class="feat-icon">${ICONS.whale}</div>
      <h3>Native whale detection</h3>
      <p>Whale alerts read directly from Keeta on-chain history. Settlement-confirmed before alert fires.</p>
    </div>
    <div class="feat-card">
      <div class="feat-icon">${ICONS.ai}</div>
      <h3>AI market insights</h3>
      <p>Every alert includes a concise AI note on trend, volume signal, and payment timing — generated fresh each cycle.</p>
    </div>
    <div class="feat-card">
      <div class="feat-icon">${ICONS.broadcast}</div>
      <h3>Four platforms</h3>
      <p>Discord rich embed, Telegram, Slack, and X/Twitter. One platform per wallet — re-register at any time to switch platform or update credentials.</p>
    </div>
    <div class="feat-card">
      <div class="feat-icon">${ICONS.key}</div>
      <h3>Wallet identity</h3>
      <p>Your Keeta wallet is your account. No email, no password, no KYC required for free access.</p>
    </div>
    <div class="feat-card">
      <div class="feat-icon">${ICONS.tools}</div>
      <h3>19 SDK tools</h3>
      <p>From live price feeds to on-chain certificate operations. Full Keeta Network SDK access from Business tier.</p>
    </div>
  </div>

  <div style="background:var(--surface);border:1px solid rgba(196,163,90,0.2);border-radius:16px;padding:28px 32px;margin-bottom:60px">
    <div style="font-size:0.72rem;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:14px">Send KTA — unlock privileges</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px" class="donate-reward-grid">
      <div style="background:var(--surface2);border:1px solid #151515;border-radius:10px;padding:16px">
        <div style="font-size:1.3rem;font-weight:800;color:var(--gold);margin-bottom:2px">50 KTA</div>
        <div style="font-size:0.75rem;font-weight:700;margin-bottom:8px;color:var(--accent)">Lifetime social alerts</div>
        <div style="font-size:0.71rem;color:var(--muted2);line-height:1.7">30-day Oracle access &nbsp;·&nbsp; Alerts on Discord, Telegram, Slack &amp; X, forever &nbsp;·&nbsp; Unlimited whale alerts</div>
      </div>
      <div style="background:var(--surface2);border:1px solid rgba(196,163,90,0.15);border-radius:10px;padding:16px">
        <div style="font-size:1.3rem;font-weight:800;color:var(--gold);margin-bottom:2px">300 KTA</div>
        <div style="font-size:0.75rem;font-weight:700;margin-bottom:8px;color:var(--accent)">Pro + Lifetime alerts</div>
        <div style="font-size:0.71rem;color:var(--muted2);line-height:1.7">300 API calls/month &nbsp;·&nbsp; Compliance tools &nbsp;·&nbsp; Transaction history &amp; wallet scoring</div>
      </div>
      <div style="background:var(--surface2);border:1px solid #151515;border-radius:10px;padding:16px">
        <div style="font-size:1.3rem;font-weight:800;color:var(--gold);margin-bottom:2px">600 KTA</div>
        <div style="font-size:0.75rem;font-weight:700;margin-bottom:8px;color:var(--accent)">Business + Lifetime alerts</div>
        <div style="font-size:0.71rem;color:var(--muted2);line-height:1.7">All 19 SDK tools &nbsp;·&nbsp; Unlimited API calls &nbsp;·&nbsp; Priority queue &amp; multi-agent mode</div>
      </div>
    </div>
    <div style="margin-top:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
      <div style="font-size:0.73rem;color:var(--muted2)">Amounts accumulate — multiple sends add up. One Keeta wallet unlocks both Oracle API and social alerts.</div>
      <a href="/checkout" style="background:var(--gold);color:#000;font-weight:700;font-size:0.8rem;padding:8px 20px;border-radius:8px;text-decoration:none;white-space:nowrap">Send KTA →</a>
    </div>
  </div>
</div>

${INTG_STRIP}

<hr class="sep">

<section class="section">
  <div class="wrap-sm">
    <div class="section-head">
      <div class="section-title">Check your <em>status</em></div>
      <div class="section-sub">Look up subscription tier, alert count, and expiry by wallet address</div>
    </div>
    <div class="status-widget" id="status">
      <h3>${ICONS.status} Status checker</h3>
      <div class="inp-row">
        <input class="inp" type="text" id="status-wallet" placeholder="keeta_your_wallet_address" onkeydown="if(event.key==='Enter')checkStatus()">
        <button class="btn-sm" onclick="checkStatus()">Look up</button>
      </div>
      <div class="result-box" id="status-out"></div>
    </div>
  </div>
</section>

<hr class="sep">

<section class="section">
  <div class="wrap-sm">
    <div class="section-head">
      <div class="section-title">${ICONS.whale} Whale <em>activity</em></div>
      <div class="section-sub">Large on-chain KTA movements detected by the Oracle. Live feed unlocks from Starter tier.</div>
    </div>
    <div class="whale-widget" id="whale-widget">
      <h3><span class="live-dot"></span>On-chain movements <span class="whale-badge">Starter+</span></h3>
      <div id="whale-rows">
        <div class="whale-blur-row"></div>
        <div class="whale-blur-row"></div>
        <div class="whale-blur-row"></div>
      </div>
      <div class="whale-locked" id="whale-lock">
        <div style="font-size:1.6rem">${ICONS.whale}</div>
        <div style="font-weight:700;font-size:0.92rem;color:#fff">Whale feed locked</div>
        <div style="font-size:0.78rem;color:var(--muted2);max-width:240px">Check your wallet status above to unlock, or upgrade to Starter (10 KTA) for 3 whale alerts/month.</div>
        <a href="/checkout" style="background:var(--gold);color:#000;font-weight:700;font-size:0.8rem;padding:8px 20px;border-radius:8px;text-decoration:none;margin-top:4px">Unlock Starter →</a>
      </div>
    </div>
  </div>
</section>

<hr class="sep">

<section class="section" id="register">
  <div class="wrap-sm">
    <div class="section-head">
      <div class="section-title">Register for <em>alerts</em></div>
      <div class="section-sub">Send <strong>0.1 KTA</strong> to the oracle wallet first, then register to activate your trial of ${trialLimit} alerts.</div>
    </div>
    <div class="form-card">
      <h3>${ICONS.broadcast} New registration</h3>
      <div class="field">
        <label>Keeta wallet address</label>
        <input class="inp" type="text" id="reg-wallet" placeholder="keeta_your_wallet_address" onblur="checkWalletExisting()">
      </div>
      <div id="reg-existing-banner" style="display:none;background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.25);border-radius:8px;padding:10px 14px;margin-bottom:4px;font-size:.82rem;color:var(--muted2)"></div>
      <div class="field">
        <label>Platform</label>
        <select id="reg-platform" onchange="switchPlatform(this.value)">
          <option value="">Select a platform</option>
          <option value="discord">Discord</option>
          <option value="telegram">Telegram</option>
          <option value="slack">Slack</option>
          <option value="twitter">X / Twitter</option>
        </select>
      </div>
      <div id="pf-discord" class="pf">
        <div class="field"><label>Discord webhook URL</label><input class="inp" type="text" id="reg-discordWebhook" placeholder="https://discord.com/api/webhooks/…"></div>
      </div>
      <div id="pf-telegram" class="pf">
        <div class="field"><label>Telegram bot token</label><input class="inp" type="text" id="reg-telegramBotToken" placeholder="123456:ABC-DEF…"></div>
        <div class="field"><label>Telegram chat ID</label><input class="inp" type="text" id="reg-telegramChatId" placeholder="-100123456789"></div>
      </div>
      <div id="pf-slack" class="pf">
        <div class="field"><label>Slack webhook URL</label><input class="inp" type="text" id="reg-slackWebhook" placeholder="https://hooks.slack.com/services/…"></div>
      </div>
      <div id="pf-twitter" class="pf">
        <div class="field"><label>API key (Consumer key)</label><input class="inp" type="text" id="reg-apiKey" placeholder="Consumer key"></div>
        <div class="field"><label>API secret</label><input class="inp" type="password" id="reg-apiSecret" placeholder="Consumer secret"></div>
        <div class="field"><label>Access token</label><input class="inp" type="text" id="reg-accessToken" placeholder="Access token"></div>
        <div class="field"><label>Access secret</label><input class="inp" type="password" id="reg-accessSecret" placeholder="Access token secret"></div>
      </div>
      <div class="field">
        <label>Alert trigger</label>
        <select id="reg-frequency">
          <optgroup label="⏱ Time-based — fires on schedule">
            <option value="5min">Every 5 minutes</option>
            <option value="15min" selected>Every 15 minutes</option>
            <option value="1h">Every hour</option>
            <option value="4h">Every 4 hours</option>
            <option value="12h">12-hour digest</option>
            <option value="1d">Daily digest</option>
          </optgroup>
          <optgroup label="📈 Price change — fires on move">
            <option value="5%">On ±5% price move — minor move</option>
            <option value="10%">On ±10% price move — normal move</option>
            <option value="15%">On ±15% price move — notable move</option>
            <option value="20%">On ±20% price move — major move</option>
            <option value="25%">On ±25% price move — extreme move</option>
          </optgroup>
        </select>
      </div>
      <div class="field">
        <label>Display currency</label>
        <select id="reg-currency">
          ${["USD","EUR","GBP","JPY","CHF","CAD","AUD","NZD",
             "SEK","NOK","DKK","ISK",
             "PLN","CZK","HUF","RON","BGN","HRK","RSD","TRY","UAH","GEL","AMD","AZN","KZT","UZS","MDL","BYN","ALL","MKD",
             "AED","SAR","QAR","KWD","BHD","OMR","JOD","ILS","YER","IRR",
             "EGP","MAD","TND","DZD","LYD",
             "ZAR","NGN","KES","GHS","TZS","UGX","ETB","RWF","XOF","XAF","ZMW","MZN","BWP","NAD","MUR","SCR","MGA","MWK",
             "CNY","HKD","SGD","KRW","TWD","MYR","THB","PHP","IDR","VND","INR","PKR","BDT","LKR","NPR","MMK","KHR","MNT","LAK",
             "BRL","MXN","ARS","CLP","COP","PEN","UYU","BOB","PYG","TTD","JMD","GTQ","HNL","CRC","DOP","PAB",
             "NZD","FJD","PGK","SBD","WST","VUV","TOP","XPF"]
            .map(c => `<option${c === "USD" ? " selected" : ""}>${c}</option>`).join("")}
        </select>
      </div>
      <div style="background:rgba(196,163,90,0.07);border:1px solid rgba(196,163,90,0.2);border-radius:8px;padding:12px 14px;margin-bottom:12px;font-size:.82rem;color:var(--muted2)">
        <strong style="color:var(--gold)">Step 1:</strong> Send at least <strong>0.1 KTA</strong> to the oracle wallet:<br>
        <code style="font-size:.72rem;word-break:break-all;color:var(--muted)">${oracleWallet}</code><br>
        <strong style="color:var(--gold)">Step 2:</strong> Enter your wallet below and register.
      </div>
      <button class="btn-full" id="reg-submit-btn" onclick="submitRegister()">${ICONS.check} Register — requires 0.1 KTA</button>
      <div class="form-result" id="reg-result"></div>
    </div>
  </div>
</section>

<hr class="sep">

<section class="section">
  <div class="wrap-md">
    <div class="section-head">
      <div class="section-title"><em>Tier</em> overview</div>
      <div class="section-sub">Start free. Upgrade by sending KTA — amounts accumulate, tiers activate instantly.</div>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead><tr>
          <th>Feature</th>
          <th>Free <span style="color:var(--gold)">0.1 KTA</span></th>
          <th>Starter <span style="color:var(--gold)">10 KTA</span></th>
          <th>Social <span style="color:var(--gold)">50 KTA</span></th>
          <th>Pro <span style="color:var(--gold)">300 KTA</span></th>
          <th>Business <span style="color:var(--gold)">600 KTA</span></th>
        </tr></thead>
        <tbody>
          <tr><td>Oracle API calls</td><td>20/day</td><td>60 / 30 days</td><td>150/month</td><td>300/month</td><td>Unlimited</td></tr>
          <tr><td>Oracle access</td><td>Persistent</td><td>30 days</td><td>30 days</td><td>30 days</td><td>30 days</td></tr>
          <tr><td>Social alerts</td>
            <td><span style="color:var(--muted2)">Trial (${trialLimit})</span></td>
            <td><span style="color:var(--muted2)">Trial (${trialLimit})</span></td>
            <td><span class="chk" style="color:var(--accent)">Lifetime ✓</span></td>
            <td><span class="chk" style="color:var(--accent)">Lifetime ✓</span></td>
            <td><span class="chk" style="color:var(--accent)">Lifetime ✓</span></td>
          </tr>
          <tr><td>Whale alerts</td>
            <td><span style="color:var(--muted2)">1 ever</span></td>
            <td><span style="color:var(--gold)">3/month</span></td>
            <td><span class="chk">Unlimited</span></td>
            <td><span class="chk">Unlimited</span></td>
            <td><span class="chk">Unlimited</span></td>
          </tr>
          <tr><td>AI insights</td>
            <td><span class="dash">—</span></td>
            <td><span style="color:var(--gold)">Preview</span></td>
            <td><span style="color:#7EC8A0">Standard</span></td>
            <td><span class="chk">Full</span></td>
            <td><span class="chk">Full</span></td>
          </tr>
          <tr><td>Compliance tools</td><td class="dash">—</td><td class="dash">—</td><td class="dash">—</td><td><span class="chk">✓</span></td><td><span class="chk">✓</span></td></tr>
          <tr><td>All 19 SDK tools</td><td class="dash">—</td><td class="dash">—</td><td class="dash">—</td><td class="dash">—</td><td><span class="chk">✓</span></td></tr>
          <tr><td>Manual renewal</td><td>Never</td><td>Every 30 days</td><td>Every 30 days</td><td>Every 30 days</td><td>Every 30 days</td></tr>
          <tr><td style="color:var(--muted2);font-size:0.75rem">No auto-billing</td><td colspan="5" style="color:var(--muted2);font-size:0.75rem">Pay only when you need access. No subscription, no automatic charges.</td></tr>
        </tbody>
      </table>
    </div>
    <div style="margin-top:32px;text-align:center;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="/checkout" class="btn-primary">${ICONS.tier} See all plans</a>
      <a href="/tools" class="btn-ghost">${ICONS.tools} Browse all 19 tools</a>
    </div>
  </div>
</section>

<hr class="sep">

<section class="section">
  <div class="wrap-md">
    <div class="section-head">
      <div class="section-title">Built for <em>agents &amp; APIs</em></div>
      <div class="section-sub">Full REST/JSON API. No authentication for public data. Agents can register, check status, and activate tiers in one call.</div>
    </div>
    <div class="api-grid">
      <div class="api-card"><span class="api-method">GET</span><div class="api-path">/price</div><div class="api-desc">Live KTA/USD price with 1h · 24h · 7d change</div></div>
      <div class="api-card"><span class="api-method">GET</span><div class="api-path">/rate?currency=</div><div class="api-desc">KTA rate in any supported fiat currency</div></div>
      <div class="api-card"><span class="api-method">GET</span><div class="api-path">/whale/alerts</div><div class="api-desc">Recent large on-chain KTA movements</div></div>
      <div class="api-card"><span class="api-method">GET</span><div class="api-path">/status?wallet=</div><div class="api-desc">Tier, alert count, expiry, social lifetime flag</div></div>
      <div class="api-card"><span class="api-method post">POST</span><div class="api-path">/register</div><div class="api-desc">Subscribe wallet to alerts with platform credentials</div></div>
      <div class="api-card"><span class="api-method post">POST</span><div class="api-path">/agent</div><div class="api-desc">Ask the Support Agent — returns JSON { reply }</div></div>
    </div>
    <div style="margin-top:16px;text-align:center">
      <a href="${appUrl}/tools" class="btn-ghost" style="font-family:monospace;font-size:0.8rem">${ICONS.tools} View all 19 tools →</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap-md">
    <div class="section-head">
      <div class="section-title">Common <em>issues</em></div>
      <div class="section-sub">Most problems are fixed in one step. Find yours below.</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <details style="background:var(--surface);border:1px solid #111;border-radius:10px;padding:0;overflow:hidden">
        <summary style="padding:14px 18px;cursor:pointer;font-size:0.86rem;font-weight:600;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:12px">Not receiving alerts after registering<span style="color:var(--gold);font-size:0.75rem;white-space:nowrap">→ KTA not sent yet</span></summary>
        <div style="padding:0 18px 16px;font-size:0.82rem;color:var(--muted2);line-height:1.7">Send ≥0.1 KTA from your registered wallet to the oracle wallet. Your tier is detected automatically — enter your wallet in the status checker above to see it instantly. No KTA sent = no alerts.</div>
      </details>
      <details style="background:var(--surface);border:1px solid #111;border-radius:10px;overflow:hidden">
        <summary style="padding:14px 18px;cursor:pointer;font-size:0.86rem;font-weight:600;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:12px">Alerts stopped after working for a while<span style="color:var(--gold);font-size:0.75rem;white-space:nowrap">→ Check social lifetime</span></summary>
        <div style="padding:0 18px 16px;font-size:0.82rem;color:var(--muted2);line-height:1.7">Oracle access has a 30-day window per payment. Social alerts last forever if you sent ≥50 KTA (<code style="color:var(--accent);font-size:0.78rem">socialLifetime: true</code>). Check your status below. If oracle expired but social lifetime is active, alerts continue — just not price data via API.</div>
      </details>
      <details style="background:var(--surface);border:1px solid #111;border-radius:10px;overflow:hidden">
        <summary style="padding:14px 18px;cursor:pointer;font-size:0.86rem;font-weight:600;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:12px">Discord webhook not delivering<span style="color:var(--gold);font-size:0.75rem;white-space:nowrap">→ Recreate & re-register</span></summary>
        <div style="padding:0 18px 16px;font-size:0.82rem;color:var(--muted2);line-height:1.7">Webhooks break when the channel is deleted, the server changes, or the integration is removed. In Discord: right-click the channel → <strong style="color:#fff">Integrations → Webhooks → New Webhook</strong> → copy the URL → update your registration on this page.</div>
      </details>
      <details style="background:var(--surface);border:1px solid #111;border-radius:10px;overflow:hidden">
        <summary style="padding:14px 18px;cursor:pointer;font-size:0.86rem;font-weight:600;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:12px">Telegram bot is silent<span style="color:var(--gold);font-size:0.75rem;white-space:nowrap">→ Start the bot first</span></summary>
        <div style="padding:0 18px 16px;font-size:0.82rem;color:var(--muted2);line-height:1.7">The bot cannot message you until you have started it. Open Telegram, find your bot, and send <code style="color:var(--accent);font-size:0.78rem">/start</code>. If you need your chat ID: visit <code style="color:var(--accent);font-size:0.78rem">api.telegram.org/bot{TOKEN}/getUpdates</code> after sending any message to the bot.</div>
      </details>
      <details style="background:var(--surface);border:1px solid #111;border-radius:10px;overflow:hidden">
        <summary style="padding:14px 18px;cursor:pointer;font-size:0.86rem;font-weight:600;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:12px">Wrong tier shown after sending more KTA<span style="color:var(--gold);font-size:0.75rem;white-space:nowrap">→ Check status again</span></summary>
        <div style="padding:0 18px 16px;font-size:0.82rem;color:var(--muted2);line-height:1.7">Tiers are based on total KTA sent from your wallet. Enter your wallet in the status checker — it rescans the chain automatically and updates your tier. If it still shows old tier, use the Activate button on the /checkout page to force an immediate rescan.</div>
      </details>
      <details style="background:var(--surface);border:1px solid #111;border-radius:10px;overflow:hidden">
        <summary style="padding:14px 18px;cursor:pointer;font-size:0.86rem;font-weight:600;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:12px">No alerts for small price moves<span style="color:var(--gold);font-size:0.75rem;white-space:nowrap">→ By design</span></summary>
        <div style="padding:0 18px 16px;font-size:0.82rem;color:var(--muted2);line-height:1.7">Moves under 5% produce no alerts regardless of frequency setting — this prevents spam during sideways markets. Moves of 5–9% follow your chosen frequency. 10–14%: max 4h gap. 15–19%: max 1h. 20–24%: max 30 min. 25%+: always fires within 5 minutes.</div>
      </details>
    </div>
    <div style="margin-top:20px;text-align:center;font-size:0.8rem;color:var(--muted2)">
      More help → <a href="https://github.com/Elemzir/KTA-Social/blob/master/TROUBLESHOOT.md" target="_blank" rel="noopener" style="color:var(--gold)">TROUBLESHOOT.md</a> &nbsp;·&nbsp; <a href="https://x.com/elemzir" target="_blank" rel="noopener" style="color:var(--gold)">@elemzir on X</a>
    </div>
  </div>
</section>

${footer()}
${agentWidget()}

<script>
function switchPlatform(v){
  ['discord','telegram','slack','twitter'].forEach(function(p){
    var el=document.getElementById('pf-'+p);
    if(el)el.className='pf'+(v===p?' show':'');
  });
}

var _regIsUpdate=false;
function _whKey(w){return'kta_wh_'+w.slice(-12);}
function _restoreWebhooks(wallet){
  try{
    var p=document.getElementById('reg-platform').value;
    var stored=JSON.parse(localStorage.getItem(_whKey(wallet))||'{}');
    if(stored.discord&&p==='discord'){var el=document.getElementById('reg-discordWebhook');if(el&&!el.value)el.value=stored.discord;}
    if(stored.telegramBotToken&&p==='telegram'){var tb=document.getElementById('reg-telegramBotToken');if(tb&&!tb.value)tb.value=stored.telegramBotToken;}
    if(stored.telegramChatId&&p==='telegram'){var tc=document.getElementById('reg-telegramChatId');if(tc&&!tc.value)tc.value=stored.telegramChatId;}
    if(stored.slack&&p==='slack'){var sl=document.getElementById('reg-slackWebhook');if(sl&&!sl.value)sl.value=stored.slack;}
  }catch(e){}
}
function _saveWebhooks(wallet,platform,body){
  try{
    var stored=JSON.parse(localStorage.getItem(_whKey(wallet))||'{}');
    if(platform==='discord'&&body.discordWebhook)stored.discord=body.discordWebhook;
    if(platform==='telegram'&&body.telegramBotToken){stored.telegramBotToken=body.telegramBotToken;stored.telegramChatId=body.telegramChatId;}
    if(platform==='slack'&&body.slackWebhook)stored.slack=body.slackWebhook;
    localStorage.setItem(_whKey(wallet),JSON.stringify(stored));
  }catch(e){}
}
async function checkWalletExisting(){
  var wallet=document.getElementById('reg-wallet').value.trim();
  var banner=document.getElementById('reg-existing-banner');
  var btn=document.getElementById('reg-submit-btn');
  if(!wallet.startsWith('keeta_')||wallet.length<20){banner.style.display='none';_regIsUpdate=false;btn.innerHTML='${ICONS.check} Register — ${trialLimit} free alerts';return;}
  try{
    var r=await fetch('${appUrl}/status?wallet='+encodeURIComponent(wallet));
    var d=await r.json();
    if(d.found){
      _regIsUpdate=true;
      var tierLabel=d.socialLifetime?'⭐ Supporter':(d.paid?'Lifetime':'Trial');
      banner.innerHTML='<strong style="color:var(--gold)">✓ Subscription found</strong> — '+tierLabel+' · '+d.tier+' · '+(d.frequency||'15min')+' · '+(d.currency||'USD')+'<br><span style="opacity:.7">Update frequency, currency or webhook below — re-enter webhook URL to confirm.</span>';
      banner.style.display='block';
      btn.innerHTML='${ICONS.check} Update my alerts';
      if(d.platform){var ps=document.getElementById('reg-platform');if(ps){ps.value=d.platform;switchPlatform(d.platform);_restoreWebhooks(wallet);}}
      if(d.frequency){var fs=document.getElementById('reg-frequency');if(fs)fs.value=d.frequency;}
      if(d.currency){var cs=document.getElementById('reg-currency');if(cs)cs.value=d.currency;}
    }else{
      _regIsUpdate=false;
      banner.style.display='none';
      btn.innerHTML='${ICONS.check} Register — ${trialLimit} free alerts';
    }
  }catch(e){}
}
async function submitRegister(){
  var res=document.getElementById('reg-result');
  var wallet=document.getElementById('reg-wallet').value.trim();
  var platform=document.getElementById('reg-platform').value;
  var frequency=document.getElementById('reg-frequency').value;
  var currency=document.getElementById('reg-currency').value;
  var label=_regIsUpdate?'Saving…':'Registering…';
  res.className='form-result loading';res.textContent=label;
  if(!wallet.startsWith('keeta_')){res.className='form-result err';res.textContent='Wallet must start with keeta_';return;}
  if(!platform){res.className='form-result err';res.textContent='Select a platform';return;}
  var body={wallet,platform,frequency,currency};
  if(platform==='discord')body.discordWebhook=document.getElementById('reg-discordWebhook').value.trim();
  if(platform==='telegram'){body.telegramBotToken=document.getElementById('reg-telegramBotToken').value.trim();body.telegramChatId=document.getElementById('reg-telegramChatId').value.trim();}
  if(platform==='slack')body.slackWebhook=document.getElementById('reg-slackWebhook').value.trim();
  if(platform==='twitter'){body.apiKey=document.getElementById('reg-apiKey').value.trim();body.apiSecret=document.getElementById('reg-apiSecret').value.trim();body.accessToken=document.getElementById('reg-accessToken').value.trim();body.accessSecret=document.getElementById('reg-accessSecret').value.trim();}
  try{
    var r=await fetch('${appUrl}/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    var txt=await r.text();
    var d;try{d=JSON.parse(txt);}catch(pe){res.className='form-result err';res.textContent='Server error ('+r.status+'). Reload and try again.';return;}
    if(d.ok){_saveWebhooks(wallet,platform,body);res.className='form-result ok';res.textContent='✓ '+(_regIsUpdate?'Settings saved':'Registered')+' — '+d.status+'. Alerts start on next cycle.';}
    else if(r.status===402){res.className='form-result err';res.innerHTML='<strong>Payment required</strong><br>'+(d.message||'Send at least 0.1 KTA to the oracle wallet first.')+(d.oracle_wallet?'<br><br><span style="font-size:.78rem">Oracle wallet:</span><br><code style="font-size:.72rem;word-break:break-all">'+d.oracle_wallet+'</code>':'');}
    else{res.className='form-result err';res.textContent=d.error||'Failed — try again.';}
  }catch(e){res.className='form-result err';res.textContent='Request failed: '+(e&&e.message?e.message:'check connection and try again.');}
}

async function checkStatus(){
  var wallet=document.getElementById('status-wallet').value.trim();
  var out=document.getElementById('status-out');
  out.className='result-box';out.innerHTML='';
  if(!wallet.startsWith('keeta_')){
    out.className='result-box show';
    out.innerHTML='<div class="rrow"><span style="color:var(--danger);font-size:.82rem">Wallet must start with keeta_</span></div>';return;
  }
  out.className='result-box show';out.innerHTML='<div class="rrow"><span style="color:var(--muted2);font-size:.82rem">Looking up…</span></div>';
  try{
    var r=await fetch('${appUrl}/status?wallet='+encodeURIComponent(wallet));
    var d=await r.json();
    if(!d.found){
      out.innerHTML='<div class="rrow"><span style="color:var(--danger);font-size:.82rem">Not registered. Use the form below to sign up.</span></div><div class="rrow" style="padding-top:12px"><a href="#register" style="color:var(--gold);font-size:.82rem">→ Register now</a></div>';return;
    }
    var isPaid=d.paid;
    var isLife=d.socialLifetime;
    var tierLabel=isLife?'<span class="tier-badge accent">⭐ Supporter</span>':(isPaid?'<span class="tier-badge accent">Lifetime</span>':'<span class="tier-badge">Trial</span>');
    var tierName=d.tier?d.tier.charAt(0).toUpperCase()+d.tier.slice(1):'—';
    var exp=d.expiresAt?new Date(d.expiresAt).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}):'Never';
    var rows=[
      ['Status',isPaid?'<span class="rv ok">Active</span>':'<span class="rv gold">Trial — '+d.alertsRemaining+' alerts left</span>'],
      ['Tier','<span class="rv">'+tierName+'</span>'],
      ['Social alerts',isLife?'<span class="rv ok">Lifetime</span>':'<span class="rv">Trial</span>'],
      ['Platform','<span class="rv">'+d.platform+'</span>'],
      ['Frequency','<span class="rv">'+d.frequency+'</span>'],
      ['Oracle expiry','<span class="rv">'+(d.oracleExpired?'<span style="color:var(--danger)">Expired</span>':exp)+'</span>'],
      ['Alerts sent','<span class="rv">'+d.alertCount+'</span>'],
    ];
    out.innerHTML='<div style="padding:10px 0 14px;display:flex;align-items:center;gap:10px">'+tierLabel+'<span style="color:var(--muted2);font-size:.78rem">'+wallet.slice(0,22)+'…</span></div>'+rows.map(function(row){return'<div class="rrow"><span class="rk">'+row[0]+'</span>'+row[1]+'</div>';}).join('');
    if(!isPaid)out.innerHTML+='<div style="padding-top:14px"><a href="/checkout" class="btn-full" style="text-decoration:none;display:flex;font-size:.83rem">Upgrade →</a></div>';
    var starterTiers=['starter','social','pro','business'];
    loadWhaleFeed(starterTiers.indexOf(d.tier)>=0);
  }catch(e){out.innerHTML='<div class="rrow"><span style="color:var(--danger);font-size:.82rem">Network error</span></div>';}
}

var _whalePollTimer=null;
async function loadWhaleFeed(unlocked){
  var lock=document.getElementById('whale-lock');
  var rows=document.getElementById('whale-rows');
  if(!unlocked){
    if(lock)lock.style.display='flex';
    return;
  }
  if(lock)lock.style.display='none';
  await _fetchWhaleRows(rows);
  if(_whalePollTimer)clearInterval(_whalePollTimer);
  _whalePollTimer=setInterval(function(){_fetchWhaleRows(rows);},5*60*1000);
}
async function _fetchWhaleRows(rows){
  try{
    var r=await fetch('/whale/alerts');
    var d=await r.json();
    var alerts=d.alerts||[];
    if(!alerts.length){rows.innerHTML='<div class="whale-empty">No whale events detected recently.</div>';return;}
    rows.innerHTML=alerts.slice(0,8).map(function(a){
      var cls=a.classification==='mega_whale'?'mega':(a.classification==='institutional'?'institutional':'whale');
      var label=a.classification==='mega_whale'?'Mega Whale':(a.classification==='institutional'?'Institutional':'Whale');
      var amt=Number(a.amountKta).toLocaleString('en-US',{maximumFractionDigits:0})+' KTA';
      var usd=a.valueUsd?'$'+Number(a.valueUsd).toLocaleString('en-US',{maximumFractionDigits:0}):'';
      var ago=_timeAgo(a.ts);
      return'<div class="whale-row"><span class="whale-cls '+cls+'">'+label+'</span><span class="whale-amt">'+amt+'</span>'+(usd?'<span style="color:var(--muted2);font-size:.75rem">'+usd+'</span>':'')+'<span class="whale-time">'+ago+'</span></div>';
    }).join('');
  }catch(e){}
}
function _timeAgo(ts){
  var s=Math.floor((Date.now()-ts)/1000);
  if(s<60)return s+'s ago';
  if(s<3600)return Math.floor(s/60)+'m ago';
  if(s<86400)return Math.floor(s/3600)+'h ago';
  return Math.floor(s/86400)+'d ago';
}

</script>
</body>
</html>`;
}

export function renderCheckout(appUrl: string, oracleWallet: string, stripeLink = "", coinbaseLink = ""): string {
  const hasStripe   = !!stripeLink;
  const hasCoinbase = !!coinbaseLink;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Pricing — KTA Oracle</title>
<meta name="description" content="Choose your KTA Oracle tier. One payment activates Oracle API access and Social lifetime alerts.">
<meta property="og:type" content="website"><meta property="og:url" content="${appUrl}/checkout"><meta property="og:title" content="Pricing — KTA Oracle"><meta property="og:description" content="Real-time KTA price alerts, whale tracking, and AI insights — delivered to Discord, Telegram, Slack, and X/Twitter."><meta property="og:image" content="${appUrl}/og2.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${appUrl}/og2.png">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${BASE_CSS}
.tier-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:52px}
@media(max-width:880px){.tier-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:600px){.tier-grid{grid-template-columns:1fr 1fr}}
@media(max-width:400px){.tier-grid{grid-template-columns:1fr}}

.tier-card{background:var(--surface);border:1px solid #181818;border-radius:14px;padding:22px 16px 18px;cursor:pointer;transition:border-color .2s,background .2s,transform .15s,box-shadow .2s;position:relative;display:flex;flex-direction:column;gap:12px;user-select:none;overflow:hidden}
.tier-card::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(196,163,90,0.06) 50%,transparent 70%);transform:translateX(-120%);transition:transform 0.6s ease;pointer-events:none}
.tier-card:hover{border-color:var(--gold-border);background:var(--surface2);transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,0.5)}
.tier-card:hover::after{transform:translateX(120%)}
.tier-card.active{border-color:var(--gold);background:var(--surface2);transform:translateY(-3px);box-shadow:0 8px 24px rgba(196,163,90,0.15)}
.tier-card.popular{border-color:rgba(196,163,90,0.4);box-shadow:0 0 0 1px rgba(196,163,90,0.1);padding-top:36px}
.tier-rec{position:absolute;top:10px;left:50%;transform:translateX(-50%);background:var(--gold);color:#000;font-size:0.61rem;font-weight:800;letter-spacing:0.08em;padding:3px 10px;border-radius:20px;white-space:nowrap;text-transform:uppercase}
.tier-kta{font-size:1.6rem;font-weight:800;letter-spacing:-0.03em;color:#fff}
.tier-kta span{font-size:0.78rem;font-weight:500;color:var(--muted2)}
.tier-name{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--gold);display:flex;align-items:center;gap:5px}
.tier-feats{list-style:none;display:flex;flex-direction:column;gap:6px;flex:1}
.tier-feats li{font-size:0.75rem;color:var(--muted2);display:flex;align-items:flex-start;gap:6px;line-height:1.4}
.tier-feats li::before{content:'';display:block;width:12px;height:12px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpolyline points='10 3 5 8 2 5' stroke='%2300D4AA' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") center/contain no-repeat;flex-shrink:0;margin-top:2px}
.tier-feats li.dim{color:#282828}
.tier-feats li.dim::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cline x1='3' y1='6' x2='9' y2='6' stroke='%23222' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")}
.tier-select-btn{display:block;text-align:center;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold);font-size:0.76rem;font-weight:700;padding:9px;border-radius:8px;transition:background .15s;cursor:pointer}
.tier-card.active .tier-select-btn{background:var(--gold);color:#000}

.pay-panel{background:linear-gradient(145deg,var(--surface) 0%,rgba(196,163,90,0.03) 100%);border:1px solid var(--gold-border);border-radius:var(--radius-lg);padding:32px;display:none;box-shadow:0 24px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(196,163,90,0.08)}
.pay-panel.show{display:block}
.pay-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;padding-bottom:20px;border-bottom:1px solid rgba(196,163,90,0.1)}
.pay-head h3{font-size:1rem;font-weight:700;display:flex;align-items:center;gap:10px}
.pay-amount{background:var(--gold);border-radius:8px;padding:7px 18px;font-size:1rem;font-weight:800;color:#000;letter-spacing:-0.01em}

.method-tabs{display:flex;gap:6px;margin-bottom:24px;flex-wrap:wrap;background:var(--surface2);padding:5px;border-radius:11px;border:1px solid #222}
.mtab{display:flex;align-items:center;gap:7px;padding:9px 16px;border:1px solid rgba(255,255,255,0.07);border-radius:8px;font-size:0.82rem;font-weight:600;color:rgba(255,255,255,0.55);cursor:pointer;transition:all .2s;background:rgba(255,255,255,0.03);flex:1;justify-content:center}
.mtab:hover{color:#fff;background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.15)}
.mtab[data-m="kta"]{color:rgba(196,163,90,0.8);border-color:rgba(196,163,90,0.2);background:rgba(196,163,90,0.04)}
.mtab[data-m="kta"]:hover{color:var(--gold);background:rgba(196,163,90,0.08);border-color:rgba(196,163,90,0.35)}
.mtab[data-m="visa"]{color:rgba(160,180,255,0.75);border-color:rgba(100,130,255,0.18);background:rgba(100,130,255,0.03)}
.mtab[data-m="visa"]:hover{color:rgba(180,200,255,0.95);background:rgba(100,130,255,0.07);border-color:rgba(100,130,255,0.3)}
.mtab.active{background:var(--surface);border:1px solid rgba(196,163,90,0.45);color:var(--gold);box-shadow:0 2px 14px rgba(196,163,90,0.18),inset 0 1px 0 rgba(196,163,90,0.08)}

.mpanel{display:none}.mpanel.show{display:block}

.wallet-block{background:var(--surface2);border:1px solid #1a1a1a;border-radius:10px;padding:18px 20px;margin-bottom:20px}
.wbl-label{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted2);margin-bottom:8px;font-weight:600;display:flex;align-items:center;gap:7px}
.wbl-label span{background:var(--gold-dim);color:var(--gold);padding:1px 7px;border-radius:4px;border:1px solid var(--gold-border);font-size:0.66rem}
.wbl-addr{font-family:'SF Mono','Fira Mono','Cascadia Code',monospace;font-size:0.79rem;color:#fff;word-break:break-all;line-height:1.6;cursor:pointer;transition:color .15s}
.wbl-addr:hover{color:var(--gold)}
.copy-hint{margin-top:6px;font-size:0.72rem;color:var(--muted);display:flex;align-items:center;gap:5px}
.copy-confirm{color:var(--accent);margin-left:4px;opacity:0;transition:opacity .2s}
.copy-confirm.show{opacity:1}

.pay-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;background:var(--gold);color:#000;font-weight:700;font-size:0.95rem;padding:15px;border-radius:10px;text-decoration:none;transition:background .15s,transform .1s,box-shadow .15s;margin-bottom:12px;border:none;cursor:pointer;font-family:inherit;box-shadow:0 4px 20px rgba(196,163,90,0.2)}
.pay-btn:hover{background:var(--gold-light);color:#000;transform:translateY(-1px);box-shadow:0 8px 28px rgba(196,163,90,0.35)}

.activate-section{margin-top:24px;padding-top:24px;border-top:1px solid #111}
.activate-section h4{font-size:0.88rem;font-weight:700;margin-bottom:14px;color:var(--muted2)}
@media(max-width:640px){
  .tier-card{padding:18px 14px 14px}
  .tier-card.popular{padding-top:36px}
  .tier-kta{font-size:1.3rem}
  .tier-feats li{font-size:0.72rem}
  .pay-panel{padding:20px 14px}
  .pay-head{flex-direction:column;align-items:flex-start;gap:8px}
  .pay-amount{font-size:0.9rem;padding:5px 14px}
  .method-tabs{flex-direction:column;gap:4px}
  .mtab{justify-content:flex-start;padding:10px 14px}
  .wbl-addr{font-size:0.72rem}
  .pay-btn{font-size:0.88rem;padding:13px}
}
@media(max-width:640px){.buy-kta-grid{grid-template-columns:1fr!important}}
.buy-opt-card{background:var(--surface2);border:1px solid #1a1a1a;border-radius:9px;padding:11px 13px;text-decoration:none;display:flex;align-items:center;gap:10px;transition:border-color .15s}
.buy-opt-card:hover{border-color:#333}
.buy-opt-icon{flex-shrink:0;color:var(--muted2)}
.buy-opt-name{font-size:0.76rem;font-weight:800;color:#fff;margin-bottom:2px}
.buy-opt-desc{font-size:0.67rem;color:var(--muted2)}
@media(max-width:480px){
  .tier-grid{grid-template-columns:1fr 1fr}
  .tier-card{padding:16px 12px 12px}
  .tier-card.popular{padding-top:34px}
  .tier-kta{font-size:1.2rem}
  .tier-feats li{font-size:0.7rem;gap:5px}
  .tier-select-btn{font-size:0.72rem;padding:8px}
}
@media(max-width:400px){
  .tier-grid{grid-template-columns:1fr}
  .tier-card.popular{padding-top:36px}
  .tier-kta{font-size:1.15rem}
}
</style>
</head>
<body>
${header("checkout")}
${priceBar(appUrl)}

<div class="wrap">
  <div style="text-align:center;padding:72px 0 52px;max-width:620px;margin:0 auto">
    <div class="hero-eyebrow">${ICONS.tier} One wallet · Both products</div>
    <h1 style="font-size:clamp(2rem,5vw,3.2rem);font-weight:800;letter-spacing:-0.04em;margin-bottom:14px">Choose your <em style="font-style:normal;color:var(--gold)">tier</em></h1>
    <p style="color:var(--muted2);font-size:0.95rem;max-width:480px;margin:0 auto">Send KTA to the oracle wallet. The amount you send determines your tier — for both Oracle API and Social alerts. Payments accumulate across multiple sends.</p>
  </div>

  <div class="status-widget" style="margin-bottom:36px">
    <h3>${ICONS.status} Check your supporter status</h3>
    <div style="font-size:0.78rem;color:var(--muted2);margin-bottom:12px">Already sent KTA? Look up your wallet to see your current tier, total sent, and what the next unlock requires.</div>
    <div class="inp-row">
      <input class="inp" type="text" id="co-status-wallet" placeholder="keeta_your_wallet_address" onkeydown="if(event.key==='Enter')checkCoStatus()">
      <button class="btn-sm" onclick="checkCoStatus()">Check status</button>
    </div>
    <div class="result-box" id="co-status-out"></div>
  </div>

  <div class="tier-grid" id="tier-grid">
    <div class="tier-card" data-kta="0.1" data-tier="free" onclick="selectTier(this)">
      <div class="tier-kta">0.1 <span>KTA</span></div>
      <div class="tier-name">${icon('<circle cx="12" cy="12" r="10"/>', 12)} Free</div>
      <ul class="tier-feats">
        <li>20 API calls/day</li>
        <li>5-day trial access</li>
        <li>Live price &amp; FX</li>
        <li class="dim">100 trial social alerts</li>
        <li class="dim">1 whale alert</li>
      </ul>
      <div class="tier-select-btn">Select</div>
    </div>
    <div class="tier-card" data-kta="10" data-tier="starter" onclick="selectTier(this)">
      <div class="tier-kta">10 <span>KTA</span></div>
      <div class="tier-name">${icon('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>', 12)} Starter</div>
      <ul class="tier-feats">
        <li>60 API calls / 30 days</li>
        <li>3 whale alerts/month</li>
        <li>AI insights preview</li>
        <li class="dim">Trial social alerts</li>
        <li class="dim">Manual renewal — 30 days</li>
      </ul>
      <div class="tier-select-btn">Select</div>
    </div>
    <div class="tier-card popular" data-kta="50" data-tier="social" onclick="selectTier(this)">
      <div class="tier-rec">Most popular</div>
      <div class="tier-kta">50 <span>KTA</span></div>
      <div class="tier-name">${icon('<path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z"/>', 12)} Social</div>
      <ul class="tier-feats">
        <li>150 API calls/month</li>
        <li>Lifetime social alerts</li>
        <li>Unlimited whale alerts</li>
        <li>Standard AI insights</li>
        <li>30-day Oracle access</li>
      </ul>
      <div class="tier-select-btn">Select</div>
    </div>
    <div class="tier-card" data-kta="300" data-tier="pro" onclick="selectTier(this)">
      <div class="tier-kta">300 <span>KTA</span></div>
      <div class="tier-name">${icon('<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>', 12)} Pro</div>
      <ul class="tier-feats">
        <li>300 API calls/month</li>
        <li>Lifetime social alerts</li>
        <li>Unlimited whale alerts</li>
        <li>Compliance tools</li>
        <li>Wallet scoring</li>
      </ul>
      <div class="tier-select-btn">Select</div>
    </div>
    <div class="tier-card" data-kta="600" data-tier="business" onclick="selectTier(this)">
      <div class="tier-kta">600 <span>KTA</span></div>
      <div class="tier-name">${icon('<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>', 12)} Business</div>
      <ul class="tier-feats">
        <li>All 19 SDK tools</li>
        <li>Unlimited API calls</li>
        <li>Lifetime social alerts</li>
        <li>Unlimited whale alerts</li>
        <li>Priority queue</li>
      </ul>
      <div class="tier-select-btn">Select</div>
    </div>
  </div>

  <div class="pay-panel" id="pay-panel">
    <div class="pay-head">
      <h3>${ICONS.bolt} Complete your payment</h3>
      <div class="pay-amount" id="pay-amount-tag">— KTA</div>
    </div>

    <div class="method-tabs">
      <div class="mtab active" data-m="kta" onclick="switchMethod('kta')">${ICONS.bolt} KTA</div>
      ${hasStripe   ? `<div class="mtab" data-m="card"   onclick="switchMethod('card')">${ICONS.card} Card</div>`   : ''}
      ${hasCoinbase ? `<div class="mtab" data-m="crypto" onclick="switchMethod('crypto')">${ICONS.crypto} Crypto</div>` : ''}
      <div class="mtab" data-m="visa" onclick="switchMethod('visa')">${ICONS.visa} Visa Direct</div>
    </div>

    <div class="mpanel show" id="mp-kta">
      <div class="info-strip">Send <strong id="kta-amount-inline">—</strong> KTA from your registered wallet to the address below. Amounts accumulate — multiple payments add up. <strong>No auto-billing</strong> — you pay manually when you need access.</div>
      <div class="wallet-block">
        <div class="wbl-label">Oracle wallet — all tiers <span>Keeta Network</span></div>
        <div class="wbl-addr" onclick="copyAddr(this,'cc-kta')">${oracleWallet}</div>
        <div class="copy-hint">${icon('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>', 12)} Click address to copy &nbsp;·&nbsp; Send from your <strong style="color:#fff">registered</strong> wallet<span class="copy-confirm" id="cc-kta">Copied!</span></div>
      </div>
      <div class="workflow">
        <div class="wf-step"><div class="wf-num">1</div><div class="wf-body"><h4>Send KTA to the oracle wallet</h4><p>From your registered Keeta wallet. Total sent from your address determines your tier.</p></div></div>
        <div class="wf-step"><div class="wf-num">2</div><div class="wf-body"><h4>Check your status</h4><p>Enter your wallet in the status checker on /onboard — tier is detected automatically. Or click Activate below for immediate confirmation.</p></div></div>
        <div class="wf-step"><div class="wf-num">3</div><div class="wf-body"><h4>Oracle + Social activate together</h4><p>From 50 KTA, Social lifetime alerts activate alongside the Oracle API tier.</p></div></div>
      </div>
      <div style="border-top:1px solid #111;margin:16px 0 14px"></div>
      <div style="font-size:0.7rem;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px">Need KTA first? Buy here</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:16px" class="buy-kta-grid">
        <a href="https://wallet.keeta.com" target="_blank" rel="noopener" class="buy-opt-card" style="border-color:rgba(0,212,170,0.55);background:rgba(0,212,170,0.06);box-shadow:0 0 18px rgba(0,212,170,0.08)">
          <div class="buy-opt-icon" style="color:var(--accent)">${icon('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',18)}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:7px;margin-bottom:3px">
              <div class="buy-opt-name" style="color:var(--accent)">Keeta Wallet</div>
              <span style="font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;background:rgba(0,212,170,0.15);color:var(--accent);border:1px solid rgba(0,212,170,0.35);padding:1px 6px;border-radius:20px">Recommended</span>
            </div>
            <div class="buy-opt-desc" style="color:rgba(0,212,170,0.6)">Visa Direct &mdash; 0.4s native settlement</div>
          </div>
        </a>
        <a href="https://www.coinbase.com/price/base-keeta-8973" target="_blank" rel="noopener" class="buy-opt-card">
          <div class="buy-opt-icon">${icon('<circle cx="12" cy="12" r="10"/><path d="M15 9.354a5 5 0 1 0 0 5.292"/><line x1="8" y1="12" x2="16" y2="12"/>',15)}</div>
          <div>
            <div class="buy-opt-name">Coinbase</div>
            <div class="buy-opt-desc">Card · Apple/Google Pay</div>
          </div>
        </a>
        <a href="https://www.kraken.com/learn/buy-keeta-kta" target="_blank" rel="noopener" class="buy-opt-card">
          <div class="buy-opt-icon">${icon('<path d="M3 3l18 18M3 21l7-7"/><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64"/>',15)}</div>
          <div>
            <div class="buy-opt-name">Kraken</div>
            <div class="buy-opt-desc">Card · Bank from $10</div>
          </div>
        </a>
        <a href="https://phantom.com/tokens/base/0xc0634090f2fe6c6d75e61be2b949464abb498973" target="_blank" rel="noopener" class="buy-opt-card">
          <div class="buy-opt-icon">${icon('<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>',15)}</div>
          <div>
            <div class="buy-opt-name">Phantom</div>
            <div class="buy-opt-desc">In-wallet swap · No KYC</div>
          </div>
        </a>
      </div>
      <div class="activate-section">
        <h4>${ICONS.check} Already sent? Activate your tier</h4>
        <div style="display:flex;gap:8px;margin-bottom:8px">
          <input class="inp" type="text" id="act-wallet-kta" placeholder="keeta_ wallet you sent from" style="flex:1">
          <button class="btn-sm" onclick="activateOracle('act-wallet-kta','act-result-kta')">Activate</button>
        </div>
        <div class="form-result" id="act-result-kta"></div>
      </div>
    </div>

    ${hasStripe ? `
    <div class="mpanel" id="mp-card">
      <div class="info-strip">Pay by card via <strong>Stripe</strong>. After checkout completes, enter your Keeta wallet below to verify and activate. <strong>No Stripe account needed.</strong></div>
      <a href="${stripeLink}" target="_blank" rel="noopener" class="pay-btn">${ICONS.card} &nbsp;Pay by card — <span id="stripe-tier-label">select a tier above</span></a>
      <div style="font-size:.76rem;color:var(--muted2);text-align:center;margin-bottom:20px">Visa · Mastercard · Amex · Apple Pay · Google Pay</div>
      <div class="activate-section">
        <h4>${ICONS.check} Already paid? Enter your Keeta wallet to activate</h4>
        <div style="display:flex;gap:8px;margin-bottom:8px">
          <input class="inp" type="text" id="act-wallet-card" placeholder="keeta_ your wallet address" style="flex:1">
          <button class="btn-sm" onclick="verifyAndActivate('act-wallet-card','act-result-card')">Verify</button>
        </div>
        <div class="form-result" id="act-result-card"></div>
      </div>
    </div>` : ''}

    ${hasCoinbase ? `
    <div class="mpanel" id="mp-crypto">
      <div class="info-strip">Pay with <strong>USDC, ETH, or BTC</strong> via Coinbase Commerce. No Coinbase account needed — any compatible wallet works.</div>
      <a href="${coinbaseLink}" target="_blank" rel="noopener" class="pay-btn">${ICONS.crypto} &nbsp;Pay with crypto — <span id="coinbase-tier-label">select a tier above</span></a>
      <div style="font-size:.76rem;color:var(--muted2);text-align:center;margin-bottom:20px">MetaMask · Coinbase Wallet · Trust Wallet · and more</div>
      <div class="activate-section">
        <h4>${ICONS.check} Already paid? Enter your Keeta wallet to activate</h4>
        <div style="display:flex;gap:8px;margin-bottom:8px">
          <input class="inp" type="text" id="act-wallet-crypto" placeholder="keeta_ your wallet address" style="flex:1">
          <button class="btn-sm" onclick="verifyAndActivate('act-wallet-crypto','act-result-crypto')">Verify</button>
        </div>
        <div class="form-result" id="act-result-crypto"></div>
      </div>
    </div>` : ''}

    <div class="mpanel" id="mp-visa">
      <div class="info-strip"><strong>Visa Direct</strong> is natively integrated into Keeta Network. A payment from your Visa card lands directly in the oracle wallet in <strong>0.4 seconds</strong>. No bridging, no other network.</div>
      <div style="background:rgba(196,163,90,0.06);border:1px solid rgba(196,163,90,0.2);border-radius:10px;padding:14px 16px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
        <div>
          <div style="font-size:0.82rem;font-weight:700;color:var(--gold);margin-bottom:3px">Don't have KTA yet?</div>
          <div style="font-size:0.76rem;color:var(--muted2)">Buy KTA on the Keeta Network bridge using your Visa card, then send it here to activate your tier.</div>
        </div>
        <a href="https://keeta.com" target="_blank" rel="noopener" style="background:var(--gold);color:#000;font-weight:700;font-size:0.8rem;padding:8px 18px;border-radius:8px;text-decoration:none;white-space:nowrap;flex-shrink:0">Get KTA →</a>
      </div>
      <div class="wallet-block">
        <div class="wbl-label">Destination wallet — Visa Direct <span>Keeta Network</span></div>
        <div class="wbl-addr" onclick="copyAddr(this,'cc-visa')">${oracleWallet}</div>
        <div class="copy-hint">${icon('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>', 12)} Click to copy &nbsp;·&nbsp; Send the KTA equivalent via Visa Direct<span class="copy-confirm" id="cc-visa">Copied!</span></div>
      </div>
      <div class="workflow">
        <div class="wf-step"><div class="wf-num">1</div><div class="wf-body"><h4>Get KTA</h4><p>Buy KTA on the <a href="https://keeta.com" target="_blank" rel="noopener" style="color:var(--gold)">Keeta Network bridge</a> using your Visa card. Takes under a minute.</p></div></div>
        <div class="wf-step"><div class="wf-num">2</div><div class="wf-body"><h4>Send to the wallet above</h4><p>Use your Keeta-connected Visa account. Send the KTA equivalent of your chosen tier.</p></div></div>
        <div class="wf-step"><div class="wf-num">3</div><div class="wf-body"><h4>0.4s settlement</h4><p>Keeta Network settles instantly. No waiting for card clearing cycles.</p></div></div>
        <div class="wf-step"><div class="wf-num">4</div><div class="wf-body"><h4>Tier detected automatically</h4><p>Enter your wallet in the status checker on <a href="/onboard" style="color:var(--gold)">/onboard</a> to confirm your tier, or click Activate below for immediate confirmation.</p></div></div>
      </div>
      <div class="activate-section">
        <h4>${ICONS.check} Verify Visa Direct payment</h4>
        <div style="display:flex;gap:8px;margin-bottom:8px">
          <input class="inp" type="text" id="act-wallet-visa" placeholder="keeta_ your registered wallet" style="flex:1">
          <button class="btn-sm" onclick="verifyAndActivate('act-wallet-visa','act-result-visa')">Verify</button>
        </div>
        <div class="form-result" id="act-result-visa"></div>
      </div>
    </div>
  </div>

  <div style="height:88px"></div>

  <div class="section-head" style="margin-bottom:28px">
    <div class="section-title">Full <em>tier comparison</em></div>
  </div>
  <div class="tbl-wrap" style="margin-bottom:88px">
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Free <span style="color:var(--gold)">0.1 KTA</span></th>
          <th>Starter <span style="color:var(--gold)">10 KTA</span></th>
          <th>Social <span style="color:var(--gold)">50 KTA</span></th>
          <th>Pro <span style="color:var(--gold)">300 KTA</span></th>
          <th>Business <span style="color:var(--gold)">600 KTA</span></th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Oracle API calls</td><td>20/day</td><td>60 / 30 days</td><td>150/month</td><td>300/month</td><td>Unlimited</td></tr>
        <tr><td>Oracle access</td><td>Persistent</td><td>30 days</td><td>30 days</td><td>30 days</td><td>30 days</td></tr>
        <tr><td>Social alerts</td>
          <td><span style="color:var(--muted2)">Trial (100)</span></td>
          <td><span style="color:var(--muted2)">Trial (100)</span></td>
          <td><span class="chk" style="color:var(--accent)">Lifetime ✓</span></td>
          <td><span class="chk" style="color:var(--accent)">Lifetime ✓</span></td>
          <td><span class="chk" style="color:var(--accent)">Lifetime ✓</span></td>
        </tr>
        <tr><td>Whale detection</td>
          <td><span style="color:var(--muted2)">1 ever</span></td>
          <td><span style="color:var(--gold)">3/month</span></td>
          <td><span class="chk">Unlimited</span></td>
          <td><span class="chk">Unlimited</span></td>
          <td><span class="chk">Unlimited</span></td>
        </tr>
        <tr><td>AI insights</td>
          <td class="dash">—</td>
          <td><span style="color:var(--gold)">Preview</span></td>
          <td><span style="color:#7EC8A0">Standard</span></td>
          <td><span class="chk">Full</span></td>
          <td><span class="chk">Full</span></td>
        </tr>
        <tr><td>Compliance tools</td><td class="dash">—</td><td class="dash">—</td><td class="dash">—</td><td><span class="chk">✓</span></td><td><span class="chk">✓</span></td></tr>
        <tr><td>All 19 SDK tools</td><td class="dash">—</td><td class="dash">—</td><td class="dash">—</td><td class="dash">—</td><td><span class="chk">✓</span></td></tr>
        <tr><td>Priority queue</td><td class="dash">—</td><td class="dash">—</td><td class="dash">—</td><td class="dash">—</td><td><span class="chk">✓</span></td></tr>
        <tr><td>Manual renewal</td><td>Never</td><td>Every 30 days</td><td>Every 30 days</td><td>Every 30 days</td><td>Every 30 days</td></tr>
        <tr><td style="color:var(--muted2);font-size:0.75rem">No auto-billing</td><td colspan="5" style="color:var(--muted2);font-size:0.75rem">Pay only when you need access. No subscription, no automatic charges.</td></tr>
      </tbody>
    </table>
  </div>
</div>

${footer()}
${agentWidget()}

<script>
var _selectedTier={kta:'',label:''};

function selectTier(el){
  document.querySelectorAll('.tier-card').forEach(function(c){c.classList.remove('active');});
  el.classList.add('active');
  var kta=el.dataset.kta;
  var tier=el.dataset.tier;
  var label=kta+' KTA — '+tier.charAt(0).toUpperCase()+tier.slice(1);
  _selectedTier={kta:kta,label:label};
  var amt=document.getElementById('pay-amount-tag');if(amt)amt.textContent=kta+' KTA';
  var inl=document.getElementById('kta-amount-inline');if(inl)inl.textContent=kta;
  var sl=document.getElementById('stripe-tier-label');if(sl)sl.textContent=label;
  var cl=document.getElementById('coinbase-tier-label');if(cl)cl.textContent=label;
  var pp=document.getElementById('pay-panel');
  if(pp){pp.className='pay-panel show';pp.scrollIntoView({behavior:'smooth',block:'nearest'});}
}

function switchMethod(m){
  document.querySelectorAll('.mtab').forEach(function(t){t.classList.toggle('active',t.dataset.m===m);});
  document.querySelectorAll('.mpanel').forEach(function(p){p.classList.remove('show');});
  document.getElementById('mp-'+m).classList.add('show');
}

function copyAddr(el,confirmId){
  navigator.clipboard.writeText(el.textContent.trim()).then(function(){
    el.style.color='var(--accent)';
    var c=document.getElementById(confirmId);if(c)c.classList.add('show');
    setTimeout(function(){el.style.color='';if(c)c.classList.remove('show');},2000);
  });
}

async function activateOracle(inputId,resultId){
  var wallet=document.getElementById(inputId).value.trim();
  var result=document.getElementById(resultId);
  result.className='form-result loading';result.textContent='Scanning Keeta chain…';
  if(!wallet.startsWith('keeta_')){result.className='form-result err';result.textContent='Enter a valid keeta_ wallet address.';return;}
  try{
    var res=await fetch('/activate-oracle',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({wallet:wallet}),signal:AbortSignal.timeout(25000)});
    var data=await res.json();
    if(data.success){result.className='form-result ok';result.textContent='✓ '+data.message+(data.socialLifetime?' — Social Agent lifetime included.':'');}
    else{result.className='form-result err';result.textContent=(data.message||data.error||'Activation failed.')+(data.detail?' ('+data.detail+')':'');}
  }catch(e){result.className='form-result err';result.textContent='Network error — try again.';}
}

async function verifyAndActivate(inputId,resultId){
  var wallet=document.getElementById(inputId).value.trim();
  var result=document.getElementById(resultId);
  result.className='form-result loading';result.textContent='Verifying on Keeta chain…';
  if(!wallet.startsWith('keeta_')){result.className='form-result err';result.textContent='Enter a valid keeta_ wallet address.';return;}
  try{
    var res=await fetch('${appUrl}/upgrade',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({wallet})});
    var data=await res.json();
    if(data.ok){result.className='form-result ok';result.textContent='✓ '+(data.message||'Access activated!');}
    else{result.className='form-result err';result.textContent=data.error||'Verification failed. Check that payment has confirmed.';}
  }catch(e){result.className='form-result err';result.textContent='Network error — try again.';}
}
async function checkCoStatus(){
  var wallet=document.getElementById('co-status-wallet').value.trim();
  var out=document.getElementById('co-status-out');
  out.className='result-box';out.innerHTML='';
  if(!wallet.startsWith('keeta_')){out.className='result-box show';out.innerHTML='<div style="color:var(--danger);font-size:.82rem">Enter a valid keeta_ wallet address.</div>';return;}
  out.className='result-box show';out.innerHTML='<div style="color:var(--muted2);font-size:.82rem">Looking up on-chain…</div>';
  try{
    var r=await fetch('${appUrl}/status?wallet='+encodeURIComponent(wallet));
    var d=await r.json();
    if(!d.registered&&!d.tier){out.innerHTML='<div style="color:var(--muted2);font-size:.82rem">No record found for this wallet. Register on the <a href="/onboard#register" style="color:var(--gold)">onboard page</a> first, then send KTA to activate.</div>';return;}
    var tiers=[{k:0.1,n:'Free'},{k:10,n:'Starter'},{k:50,n:'Social',social:true},{k:300,n:'Pro',social:true},{k:600,n:'Business',social:true}];
    var cur=d.tier||'free';
    var curIdx=tiers.findIndex(function(t){return t.n.toLowerCase()===cur.toLowerCase()});
    var nextTier=curIdx>=0&&curIdx<tiers.length-1?tiers[curIdx+1]:null;
    var socialActive=d.socialLifetime||d.paid||(curIdx>=2);
    var tierLabel='<span style="color:var(--gold);font-weight:700">'+(d.tier||'Free')+'</span>';
    var rows='<div style="padding:10px 0 14px;display:flex;align-items:center;gap:10px">'+tierLabel+'<span style="color:var(--muted2);font-size:.78rem">'+wallet.slice(0,22)+'…</span></div>';
    rows+='<div class="rrow"><span class="rk">Social alerts</span>'+(socialActive?'<span style="color:var(--accent)">Lifetime ✓</span>':'<span style="color:var(--muted2)">Trial</span>')+'</div>';
    if(d.expiry)rows+='<div class="rrow"><span class="rk">Oracle access</span><span>'+new Date(d.expiry).toLocaleDateString()+'</span></div>';
    if(nextTier)rows+='<div class="rrow"><span class="rk">Next unlock</span><span style="color:var(--gold)">'+nextTier.k+' KTA → '+nextTier.n+(nextTier.social?' + lifetime alerts':'')+'</span></div>';
    rows+='<div style="padding-top:12px"><a href="#tier-grid" class="btn-full" style="text-decoration:none;display:flex;font-size:.83rem">Select tier below →</a></div>';
    out.innerHTML=rows;
  }catch(e){out.innerHTML='<div style="color:var(--danger);font-size:.82rem">Network error — try again.</div>';}
}
</script>
</body>
</html>`;
}

export function renderDonate(appUrl: string, oracleWallet: string, lifetimeKta: number, stripeLink = "", coinbaseLink = ""): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Support KTA Oracle — Keep it alive</title>
<meta name="description" content="KTA Oracle is an independent project. Your support keeps the live data, AI insights, and whale tracking running for the whole community.">
<meta property="og:type" content="website"><meta property="og:url" content="${appUrl}/donate"><meta property="og:title" content="Support KTA Oracle"><meta property="og:description" content="Real-time KTA price alerts, whale tracking, and AI insights — delivered to Discord, Telegram, Slack, and X/Twitter."><meta property="og:image" content="${appUrl}/og2.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${appUrl}/og2.png">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${BASE_CSS}
.donate-hero{text-align:center;padding:88px 28px 60px;max-width:640px;margin:0 auto}
.donate-hero h1{font-size:clamp(2.2rem,6vw,3.6rem);font-weight:800;letter-spacing:-0.04em;line-height:1.1;margin-bottom:18px}
.donate-hero p{font-size:1rem;color:var(--muted2);line-height:1.8;max-width:520px;margin:0 auto 28px}
.reward-card{background:linear-gradient(135deg,rgba(196,163,90,0.08) 0%,rgba(196,163,90,0.03) 100%);border:1px solid rgba(196,163,90,0.35);border-radius:18px;padding:32px;margin-bottom:48px;position:relative;overflow:hidden}
.reward-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(196,163,90,0.6),transparent)}
.reward-kta{font-size:3.2rem;font-weight:800;color:var(--gold);letter-spacing:-0.04em;line-height:1}
.reward-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(0,212,170,0.12);border:1px solid rgba(0,212,170,0.3);color:var(--accent);font-size:0.72rem;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:14px;letter-spacing:0.04em}
.reward-perks{display:flex;flex-direction:column;gap:8px;margin-top:16px}
.reward-perk{display:flex;align-items:center;gap:10px;font-size:0.84rem;color:var(--muted2)}
.reward-perk span{color:var(--accent);font-weight:700}
.donate-form{background:var(--surface);border:1px solid #111;border-radius:16px;padding:28px;margin-bottom:32px}
.amt-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px}
.amt-btn{background:var(--surface2);border:1px solid #1a1a1a;border-radius:9px;padding:12px 8px;text-align:center;cursor:pointer;transition:border-color .15s,background .15s;user-select:none}
.amt-btn:hover{border-color:rgba(196,163,90,0.4)}
.amt-btn.selected{border-color:var(--gold);background:rgba(196,163,90,0.07)}
.amt-btn.threshold{border-color:rgba(0,212,170,0.3);background:rgba(0,212,170,0.04)}
.amt-btn.threshold.selected{border-color:var(--accent);background:rgba(0,212,170,0.1)}
.amt-kta{font-size:1.1rem;font-weight:800;color:var(--gold)}
.amt-label{font-size:0.65rem;color:var(--muted2);margin-top:2px}
.amt-label.hl{color:var(--accent)}
.wallet-block{background:var(--surface2);border:1px solid #111;border-radius:10px;padding:16px;margin-bottom:20px;cursor:pointer}
.wbl-label{font-size:0.65rem;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.wbl-label span{background:rgba(196,163,90,0.12);color:var(--gold);padding:2px 8px;border-radius:4px;font-size:0.6rem}
.wbl-addr{font-family:monospace;font-size:0.78rem;color:#fff;word-break:break-all;line-height:1.6;margin-bottom:6px}
.copy-hint{font-size:0.67rem;color:var(--muted);display:flex;align-items:center;gap:5px}
.copy-confirm{color:var(--accent);margin-left:6px;opacity:0;transition:opacity .2s}.copy-confirm.show{opacity:1}
.donate-steps{display:flex;flex-direction:column;gap:12px;margin-bottom:20px}
.ds-step{display:flex;align-items:flex-start;gap:12px}
.ds-num{width:24px;height:24px;border-radius:50%;background:rgba(196,163,90,0.12);border:1px solid rgba(196,163,90,0.3);display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:800;color:var(--gold);flex-shrink:0;margin-top:1px}
.ds-body h4{font-size:0.82rem;font-weight:700;margin-bottom:2px}
.ds-body p{font-size:0.74rem;color:var(--muted2);line-height:1.6}
.get-kta-section{border-top:1px solid #111;padding-top:16px;margin-top:4px}
.get-kta-title{font-size:0.7rem;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px}
.buy-opt-card{background:var(--surface2);border:1px solid #1a1a1a;border-radius:9px;padding:11px 13px;text-decoration:none;display:flex;align-items:center;gap:10px;transition:border-color .15s}
.buy-opt-card:hover{border-color:#333}
.buy-opt-icon{flex-shrink:0;color:var(--muted2)}
.buy-opt-name{font-size:0.76rem;font-weight:800;color:#fff;margin-bottom:2px}
.buy-opt-desc{font-size:0.67rem;color:var(--muted2)}
@media(max-width:560px){.amt-grid{grid-template-columns:repeat(2,1fr)}.buy-kta-grid{grid-template-columns:1fr!important}}
</style>
</head>
<body>
${header("donate")}

<div class="donate-hero">
  <div class="hero-eyebrow">${icon('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',13)} Community support</div>
  <h1>Help keep the<br><em>Oracle running.</em></h1>
  <p>KTA Oracle is built and maintained by a single independent developer. There are no investors, no company behind it — just code, on-chain data, and a community that relies on it every day.<br><br>Your support directly funds server costs, development time, and keeps live KTA price data, AI insights, and whale alerts flowing for everyone.</p>
</div>

<div class="wrap" style="max-width:680px">

  <div class="reward-card">
    <div style="display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap">
      <div style="flex:1;min-width:220px">
        <div class="reward-badge">${icon('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',11)} Supporter reward</div>
        <div class="reward-kta">${lifetimeKta} KTA</div>
        <div style="font-size:1rem;font-weight:700;color:#fff;margin:6px 0 4px">Unlocks lifetime social alerts</div>
        <div style="font-size:0.8rem;color:var(--muted2)">Send ${lifetimeKta} KTA or more and you receive real benefits — not just a thank-you.</div>
        <div class="reward-perks">
          <div class="reward-perk">${icon('<polyline points="20 6 9 17 4 12"/>',14)}<span>Lifetime social alerts</span> — Discord, Telegram, Slack &amp; X</div>
          <div class="reward-perk">${icon('<polyline points="20 6 9 17 4 12"/>',14)}<span>30-day Social tier</span> on Oracle API</div>
          <div class="reward-perk">${icon('<polyline points="20 6 9 17 4 12"/>',14)}<span>Unlimited whale alerts</span> every month</div>
          <div class="reward-perk">${icon('<polyline points="20 6 9 17 4 12"/>',14)}<span>Amounts accumulate</span> — multiple smaller sends add up</div>
        </div>
      </div>
      <div style="background:rgba(0,212,170,0.06);border:1px solid rgba(0,212,170,0.2);border-radius:12px;padding:18px;min-width:180px;text-align:center;flex-shrink:0">
        <div style="font-size:0.68rem;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:8px">Current KTA price</div>
        <div style="font-size:1.6rem;font-weight:800;color:var(--accent)" id="don-price">—</div>
        <div style="font-size:0.68rem;color:var(--muted2);margin-top:4px">${lifetimeKta} KTA ≈ <span id="don-usd">…</span> USD</div>
        <div style="font-size:0.65rem;color:var(--muted);margin-top:10px">Any amount is appreciated</div>
      </div>
    </div>
  </div>

  <div class="donate-form">
    <div style="font-size:0.9rem;font-weight:700;margin-bottom:4px">Choose a donation amount</div>
    <div style="font-size:0.76rem;color:var(--muted2);margin-bottom:16px">Or type a custom amount. Smaller donations are always welcome — they all add up.</div>
    <div class="amt-grid">
      <div class="amt-btn" onclick="selectAmt(this,'10')">
        <div class="amt-kta">10</div>
        <div class="amt-label">KTA</div>
      </div>
      <div class="amt-btn threshold selected" onclick="selectAmt(this,'${lifetimeKta}')">
        <div class="amt-kta" style="color:var(--accent)">${lifetimeKta}</div>
        <div class="amt-label hl">KTA · Social tier</div>
      </div>
      <div class="amt-btn" onclick="selectAmt(this,'300')">
        <div class="amt-kta">300</div>
        <div class="amt-label">KTA</div>
      </div>
      <div class="amt-btn" onclick="selectAmt(this,'custom')" id="amt-custom-btn">
        <div class="amt-kta" style="font-size:0.85rem;color:var(--muted2)">Custom</div>
        <div class="amt-label">KTA</div>
      </div>
    </div>
    <div id="custom-inp-wrap" style="display:none;margin-bottom:16px">
      <input class="inp" type="number" id="custom-amt" placeholder="Enter KTA amount" min="1" oninput="updateCustomAmt(this.value)">
    </div>
    <div style="font-size:0.72rem;color:var(--muted2);margin-bottom:16px">You are donating: <strong style="color:var(--gold)" id="amt-display">${lifetimeKta} KTA</strong> <span id="amt-usd-inline" style="color:var(--muted)"></span></div>

    <div class="wallet-block" onclick="copyAddr(this,'cc-don')">
      <div class="wbl-label">Donation wallet <span>Keeta Network</span></div>
      <div class="wbl-addr">${oracleWallet}</div>
      <div class="copy-hint">${icon('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',12)} Click to copy address<span class="copy-confirm" id="cc-don">Copied!</span></div>
    </div>

    <div class="donate-steps">
      <div class="ds-step"><div class="ds-num">1</div><div class="ds-body"><h4>Copy the wallet above</h4><p>Send your chosen KTA amount from your registered Keeta wallet to this address.</p></div></div>
      <div class="ds-step"><div class="ds-num">2</div><div class="ds-body"><h4>Confirm on Keeta Network</h4><p>Settlement takes 0.4 seconds. You'll see the transaction confirmed instantly on-chain.</p></div></div>
      <div class="ds-step"><div class="ds-num">3</div><div class="ds-body"><h4>Check your status</h4><p>Enter your wallet in the status checker on the <a href="/onboard" style="color:var(--gold)">onboard page</a> — your tier is detected automatically. Or click Activate below to confirm immediately.</p></div></div>
    </div>

    <div class="activate-section">
      <h4>${ICONS.check} Check status &amp; activate</h4>
      <div style="font-size:0.74rem;color:var(--muted2);margin-bottom:10px">Enter the wallet you donated from. We'll show your current tier and activate any new rewards.</div>
      <div style="display:flex;gap:8px;margin-bottom:8px">
        <input class="inp" type="text" id="don-wallet" placeholder="keeta_ wallet you sent from" style="flex:1" onkeydown="if(event.key==='Enter')donateActivate()">
        <button class="btn-sm" onclick="donateActivate()">Activate</button>
      </div>
      <div class="form-result" id="don-result"></div>
    </div>

    <div class="get-kta-section">
      <div class="get-kta-title">Don't have KTA yet? Get some here</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px" class="buy-kta-grid">
        <a href="https://wallet.keeta.com" target="_blank" rel="noopener" class="buy-opt-card" style="border-color:rgba(0,212,170,0.25)">
          <div class="buy-opt-icon" style="color:var(--accent)">${icon('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',15)}</div>
          <div><div class="buy-opt-name" style="color:var(--accent)">Keeta Wallet</div><div class="buy-opt-desc">Visa Direct · 0.4s native</div></div>
        </a>
        <a href="https://www.coinbase.com/price/base-keeta-8973" target="_blank" rel="noopener" class="buy-opt-card">
          <div class="buy-opt-icon">${icon('<circle cx="12" cy="12" r="10"/><path d="M15 9.354a5 5 0 1 0 0 5.292"/><line x1="8" y1="12" x2="16" y2="12"/>',15)}</div>
          <div><div class="buy-opt-name">Coinbase</div><div class="buy-opt-desc">Card · Apple/Google Pay</div></div>
        </a>
        <a href="https://www.kraken.com/learn/buy-keeta-kta" target="_blank" rel="noopener" class="buy-opt-card">
          <div class="buy-opt-icon">${icon('<path d="M3 3l18 18M3 21l7-7"/><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64"/>',15)}</div>
          <div><div class="buy-opt-name">Kraken</div><div class="buy-opt-desc">Card · Bank from $10</div></div>
        </a>
        <a href="https://phantom.com/tokens/base/0xc0634090f2fe6c6d75e61be2b949464abb498973" target="_blank" rel="noopener" class="buy-opt-card">
          <div class="buy-opt-icon">${icon('<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>',15)}</div>
          <div><div class="buy-opt-name">Phantom</div><div class="buy-opt-desc">In-wallet swap · No KYC</div></div>
        </a>
      </div>
    </div>
  </div>

  <div style="text-align:center;padding:0 0 80px">
    <div style="font-size:0.8rem;color:var(--muted2);line-height:1.9;max-width:480px;margin:0 auto">
      Every KTA sent goes directly to the oracle wallet that powers this service.<br>
      No intermediaries. On-chain and fully transparent.<br>
      <span style="color:var(--muted)">Thank you for keeping this alive.</span>
    </div>
    <div style="margin-top:20px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="/onboard" class="btn-ghost" style="font-size:0.82rem">Register for alerts</a>
      <a href="/checkout" class="btn-ghost" style="font-size:0.82rem">View tier plans</a>
    </div>
  </div>

</div>

${agentWidget()}

<script>
var _selectedAmt=${lifetimeKta};
var _price=0;

(function(){
  fetch('${appUrl}/price').then(function(r){return r.json();}).then(function(d){
    _price=d.price||0;
    var el=document.getElementById('don-price');
    var usd=document.getElementById('don-usd');
    var inl=document.getElementById('amt-usd-inline');
    if(el)el.textContent='$'+_price.toFixed(5);
    if(usd)usd.textContent=(_price*${lifetimeKta}).toFixed(2);
    updateInlineUsd();
  }).catch(function(){});
})();

function updateInlineUsd(){
  var el=document.getElementById('amt-usd-inline');
  if(!el||!_price||!_selectedAmt)return;
  el.textContent='≈ $'+(_price*_selectedAmt).toFixed(2)+' USD';
}

function selectAmt(btn,val){
  document.querySelectorAll('.amt-btn').forEach(function(b){b.classList.remove('selected');});
  btn.classList.add('selected');
  var wrap=document.getElementById('custom-inp-wrap');
  if(val==='custom'){
    wrap.style.display='block';
    _selectedAmt=0;
  } else {
    wrap.style.display='none';
    _selectedAmt=parseFloat(val);
    var disp=document.getElementById('amt-display');
    if(disp)disp.textContent=_selectedAmt+' KTA';
    updateInlineUsd();
  }
}

function updateCustomAmt(v){
  var n=parseFloat(v)||0;
  _selectedAmt=n;
  var disp=document.getElementById('amt-display');
  if(disp)disp.textContent=(n||'—')+' KTA';
  updateInlineUsd();
}

function copyAddr(el,confirmId){
  navigator.clipboard.writeText(el.querySelector('.wbl-addr').textContent.trim()).then(function(){
    var c=document.getElementById(confirmId);if(c)c.classList.add('show');
    setTimeout(function(){if(c)c.classList.remove('show');},2000);
  });
}

async function donateActivate(){
  var wallet=document.getElementById('don-wallet').value.trim();
  var result=document.getElementById('don-result');
  result.className='form-result loading';result.textContent='Checking on-chain…';
  if(!wallet.startsWith('keeta_')){result.className='form-result err';result.textContent='Enter a valid keeta_ wallet address.';return;}
  try{
    var res=await fetch('${appUrl}/activate-oracle',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({wallet}),signal:AbortSignal.timeout(25000)});
    var data=await res.json();
    if(data.success){
      var social=data.socialLifetime;
      var msg='✓ '+(data.tier?data.tier.charAt(0).toUpperCase()+data.tier.slice(1)+' tier activated':'Activated')+'.';
      if(social)msg+=' Lifetime social alerts active.';
      result.className='form-result ok';result.textContent=msg;
    } else {
      result.className='form-result err';result.textContent=(data.message||data.error||'No qualifying payment found yet.')+(data.detail?' ('+data.detail+')':'');
    }
  }catch(e){result.className='form-result err';result.textContent='Network error — try again.';}
}
</script>
</body>
</html>`;
}

export function renderLegal(appUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Legal — KTA Oracle</title>
<meta property="og:type" content="website"><meta property="og:url" content="${appUrl}/legal"><meta property="og:title" content="Legal — KTA Oracle"><meta property="og:image" content="${appUrl}/og2.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${appUrl}/og2.png">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${BASE_CSS}.legal{max-width:640px;margin:0 auto;padding:72px 28px 100px}.legal h1{font-size:1.8rem;font-weight:800;margin-bottom:8px;letter-spacing:-0.03em}.legal h2{font-size:1.05rem;font-weight:700;margin:32px 0 10px;color:var(--gold)}.legal p,.legal li{font-size:0.87rem;color:var(--muted2);line-height:1.8;margin-bottom:10px}.legal ul{padding-left:18px}.legal strong{color:#fff}</style>
</head>
<body>
${header("")}
<div class="legal">
  <h1>Legal</h1>
  <p style="color:var(--muted2);font-size:.84rem">Last updated: 2025</p>
  <h2>Service Description</h2>
  <p>KTA Oracle is an informational and alerting service providing real-time KTA/USD price data, whale movement detection, and AI market insights derived from Keeta Network on-chain data. It is not a financial advisory service.</p>
  <h2>No Financial Advice</h2>
  <p>All data, alerts, and AI-generated insights provided by this service are for <strong>informational purposes only</strong>. Nothing constitutes financial, investment, trading, or any other advice. Use at your own risk.</p>
  <h2>Payments &amp; Access</h2>
  <p>Payments are processed via Coinbase Commerce (crypto) or directly on Keeta Network (KTA). Social lifetime alerts are granted upon confirmed payment verification. Oracle API access is active for the defined tier period. There is no automatic renewal or subscription — access must be renewed manually by sending KTA. No refunds are issued for digital service activations.</p>
  <h2>Limitation of Liability</h2>
  <p>The service is provided "as is." We are not liable for any loss, financial or otherwise, resulting from use of alerts, price data, or AI insights. Market data may be delayed or inaccurate.</p>
  <h2>Jurisdiction</h2>
  <p>This service is operated from Sweden, EU. Any disputes are subject to Swedish law.</p>
  <h2>Contact</h2>
  <p><a href="https://x.com/elemzir" target="_blank">@elemzir on X</a></p>
</div>
${footer()}
</body>
</html>`;
}

export function renderPrivacy(appUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Privacy Policy — KTA Oracle</title>
<meta property="og:type" content="website"><meta property="og:url" content="${appUrl}/privacy"><meta property="og:title" content="Privacy Policy — KTA Oracle"><meta property="og:image" content="${appUrl}/og2.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${appUrl}/og2.png">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${BASE_CSS}.legal{max-width:640px;margin:0 auto;padding:72px 28px 100px}.legal h1{font-size:1.8rem;font-weight:800;margin-bottom:8px;letter-spacing:-0.03em}.legal h2{font-size:1.05rem;font-weight:700;margin:32px 0 10px;color:var(--gold)}.legal p,.legal li{font-size:0.87rem;color:var(--muted2);line-height:1.8;margin-bottom:10px}.legal ul{padding-left:18px}.legal strong{color:#fff}</style>
</head>
<body>
${header("")}
<div class="legal">
  <h1>Privacy Policy</h1>
  <p style="color:var(--muted2);font-size:.84rem">Last updated: 2025</p>
  <h2>Data we store</h2>
  <ul>
    <li><strong>Keeta wallet address</strong> — required to identify your subscription and scan payment history.</li>
    <li><strong>Platform credentials</strong> (webhook URLs, bot tokens) — stored in Cloudflare KV, used only to deliver your alerts.</li>
    <li><strong>Alert count and timestamps</strong> — used to track tier limits and delivery history.</li>
    <li><strong>Anonymous registration fingerprints</strong> — one-way hashed, non-reversible, retained for 30 days for fraud prevention under legitimate interest (GDPR Art. 6(1)(f)).</li>
  </ul>
  <h2>Data we do not store</h2>
  <ul>
    <li>Email addresses</li>
    <li>Raw IP addresses</li>
    <li>Browsing or session data</li>
    <li><strong>Payment card details</strong> (handled by Coinbase Commerce — we never receive card data)</li>
  </ul>
  <h2>Third-party services</h2>
  <p>Payments are processed by <strong>Coinbase Commerce</strong> under their privacy policy, or directly via <strong>Keeta Network</strong> on-chain. Alert delivery uses <strong>Discord</strong>, <strong>Telegram</strong>, <strong>Slack</strong>, or <strong>X/Twitter</strong> APIs. AI responses are generated by a third-party LLM provider (no personal data is transmitted).</p>
  <h2>Data retention</h2>
  <p>Subscriber records are retained for the duration of service. You can request deletion at any time by contacting @elemzir.</p>
  <h2>Your rights (GDPR)</h2>
  <p>As an EU-operated service, you have the right to access, correct, or delete your data. Contact us via X to exercise these rights.</p>
  <h2>Contact</h2>
  <p><a href="https://x.com/elemzir" target="_blank">@elemzir on X</a></p>
</div>
${footer()}
</body>
</html>`;
}
