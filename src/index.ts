import type { Env, SocialSubscriber, AlertFrequency, SocialPlatform } from "./types.js";
import { requireInternalAuth, sanitiseWallet }                        from "./auth.js";
import { getSubscribers, saveSubscribers, trialLimit, lifetimeKta }   from "./store.js";
import {
  buildPriceAlert, buildWhaleAlert,
  buildDiscordPriceEmbed, buildDiscordWhaleEmbed, buildTwitterPrice, buildTwitterWhale,
  buildTrialWarningDiscord, buildTrialWarningText,
  buildTrialExhaustedDiscord, buildTrialExhaustedText,
  buildLifetimeActivatedDiscord, buildLifetimeActivatedText,
  buildExpiryReminderDiscord, buildExpiryReminderText,
  buildCelebEmbed, buildCelebText, prependCelebEmbed, type CelebType,
  QUOTES_UP, QUOTES_DOWN,
} from "./messages.js";
import {
  sendDiscord, sendTelegram, sendSlack, postTweet, sendDevTwitter,
} from "./broadcast.js";
import { generateInsight, chatWithAgent, type InsightLevel }          from "./ai.js";
import {
  renderOnboard, renderDonate, renderCheckout, renderLegal, renderPrivacy,
} from "./onboard.js";
import { renderTools } from "./tools.js";
import { renderGuide } from "./guide.js";

function oracleFetch(env: Env, path: string): Promise<Response> {
  if (env.ORACLE_SERVICE) return env.ORACLE_SERVICE.fetch(`https://oracle${path}`);
  if (env.KTA_ORACLE_URL) return fetch(`${env.KTA_ORACLE_URL}${path}`, { signal: AbortSignal.timeout(15000) });
  return Promise.reject(new Error("no oracle configured"));
}

function oraclePost(env: Env, path: string, body: string): Promise<Response> {
  const init: RequestInit = { method: "POST", body, headers: { "Content-Type": "application/json" } };
  if (env.ORACLE_SERVICE) return env.ORACLE_SERVICE.fetch(`https://oracle${path}`, init);
  if (env.KTA_ORACLE_URL) return fetch(`${env.KTA_ORACLE_URL}${path}`, { ...init, signal: AbortSignal.timeout(15000) });
  return Promise.reject(new Error("no oracle configured"));
}

async function hashFp(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
}

const FREQ_MS: Partial<Record<AlertFrequency, number>> = {
  "5min":  5 * 60 * 1000,
  "15min": 15 * 60 * 1000,
  "1h":    1  * 60 * 60 * 1000,
  "4h":    4  * 60 * 60 * 1000,
  "12h":   12 * 60 * 60 * 1000,
  "1d":    24 * 60 * 60 * 1000,
};
const CHANGE_PCT: Partial<Record<AlertFrequency, number>> = {
  "5%":  5,
  "10%": 10,
  "15%": 15,
  "20%": 20,
  "25%": 25,
};
const PCT_COOLDOWN   = 5 * 60 * 1000;
const DIGEST_FREQS:  AlertFrequency[] = ["12h", "1d"];
const VALID_FREQS:   AlertFrequency[] = ["5min", "15min", "1h", "4h", "12h", "1d", "5%", "10%", "15%", "20%", "25%"];
const VALID_PLATFORMS: SocialPlatform[] = ["discord", "telegram", "slack", "twitter"];

const WHALE_LIMIT_FREE    = 1;
const WHALE_LIMIT_STARTER = 3;

const CC_HTML  = "public, max-age=60, s-maxage=300";
const CC_PRICE = "public, max-age=30, s-maxage=30";
const CC_WHALE = "public, max-age=300, s-maxage=300";

const BOT_PATHS = new Set([
  "/.env","/.env.local","/.env.production","/.env.development","/.env.backup","/.env.example",
  "/wp-admin","/wp-login.php","/wp-config.php","/wp-config.php.bak","/xmlrpc.php",
  "/phpinfo.php","/phpmyadmin","/config.php","/configuration.php",
  "/.git","/.git/HEAD","/.git/config","/.gitignore","/.github",
  "/admin","/administrator","/panel","/cpanel",
  "/actuator","/actuator/env","/actuator/health","/actuator/logfile","/actuator/mappings",
  "/.htaccess","/.htpasswd","/.well-known/security.txt",
  "/shell.php","/eval.php","/cmd.php","/info.php","/test.php","/upload.php","/backdoor.php",
  "/config.json","/package.json","/package-lock.json","/composer.json","/Dockerfile",
  "/etc/passwd","/etc/shadow","/proc/self/environ",
  "/server-status","/server-info",
]);
const BLOCKED_METHODS = new Set(["PUT","PATCH","DELETE","TRACE","CONNECT","PURGE","PROPFIND","MOVE"]);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
    const { pathname, searchParams } = new URL(request.url);
    const method = request.method;
    const corsHeaders = { "Access-Control-Allow-Origin": "*" };

    if (BLOCKED_METHODS.has(method)) return new Response(null, { status: 405 });
    if (BOT_PATHS.has(pathname) || pathname.includes("..") || (pathname.startsWith("/.") && pathname !== "/.well-known/openid-configuration"))
      return new Response(null, { status: 403 });
    if (pathname === "/robots.txt")
      return new Response("User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /dev/\n", { headers: { "Content-Type": "text/plain" } });
    if (pathname === "/favicon.svg" || pathname === "/favicon.ico") {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#C4A35A"/><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" fill="#000"/></svg>`;
      return new Response(svg, { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" } });
    }
    if (/\.[a-zA-Z0-9]{1,6}$/.test(pathname))
      return new Response(null, { status: 404 });

    if (method === "GET" && (pathname === "/" || pathname === "/onboard"))
      return new Response(renderOnboard(env.APP_URL, env.ORACLE_WALLET, trialLimit(env), lifetimeKta(env)),
        { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": CC_HTML, ...corsHeaders } });

    if (method === "GET" && pathname === "/checkout")
      return new Response(
        renderCheckout(env.APP_URL, env.ORACLE_WALLET,
          env.STRIPE_PAYMENT_LINK ?? "", env.COINBASE_COMMERCE_LINK ?? ""),
        { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": CC_HTML, ...corsHeaders } });

    if (method === "GET" && (pathname === "/donate" || pathname === "/upgrade"))
      return new Response(
        renderDonate(env.APP_URL, env.ORACLE_WALLET, lifetimeKta(env),
          env.STRIPE_PAYMENT_LINK ?? "", env.COINBASE_COMMERCE_LINK ?? ""),
        { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": CC_HTML, ...corsHeaders } });

    if (method === "GET" && pathname === "/tools")
      return new Response(renderTools(env.APP_URL),
        { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": CC_HTML, ...corsHeaders } });

    if (method === "GET" && pathname === "/guide")
      return new Response(renderGuide(env.APP_URL),
        { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": CC_HTML, ...corsHeaders } });

    if (method === "GET" && pathname === "/legal")
      return new Response(renderLegal(), { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": CC_HTML } });

    if (method === "GET" && pathname === "/privacy")
      return new Response(renderPrivacy(), { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": CC_HTML } });

    if (method === "GET" && pathname === "/health")
      return Response.json({ status: "ok", service: "kta", ts: Date.now() }, { headers: corsHeaders });

    if (method === "GET" && pathname === "/price") {
      const cached = await env.KV.get<Record<string, unknown>>("social:price_cache", "json");
      if (cached) return Response.json(cached, { headers: { "Cache-Control": CC_PRICE, ...corsHeaders } });
      const r = await oracleFetch(env, "/price").catch(() => null);
      if (!r?.ok) return Response.json({ error: "unavailable" }, { status: 503, headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "application/json", "Cache-Control": CC_PRICE, ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/price/live") {
      const cached = await env.KV.get<Record<string, unknown>>("social:price_cache", "json");
      if (cached) return Response.json(cached, { headers: { "Cache-Control": CC_PRICE, ...corsHeaders } });
      const r = await oracleFetch(env, "/price/live").catch(() => null);
      if (!r?.ok) return Response.json({ error: "unavailable" }, { status: 503, headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "application/json", "Cache-Control": CC_PRICE, ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/price/history") {
      const r = await oracleFetch(env, "/price/history").catch(() => null);
      if (!r?.ok) return Response.json({ points: [] }, { headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60, s-maxage=60", ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/stream") {
      const wallet = searchParams.get("wallet") ?? "";
      if (!wallet.startsWith("keeta_"))
        return new Response(`data: {"error":"wallet required"}\n\n`, { status: 400, headers: { "Content-Type": "text/event-stream", ...corsHeaders } });

      const subs = await getSubscribers(env);
      const sub  = subs.find(s => s.wallet.toLowerCase() === wallet.toLowerCase());
      if (!sub)
        return new Response(`data: {"error":"not registered — visit /onboard"}\n\n`, { status: 403, headers: { "Content-Type": "text/event-stream", ...corsHeaders } });

      const price = await env.KV.get<Record<string,unknown>>("social:price_cache", "json")
        ?? await oracleFetch(env, "/price").then(r => r.ok ? r.json() as Promise<Record<string,unknown>> : null).catch(() => null);

      const payload = JSON.stringify({
        wallet,
        tier:    sub.tier ?? "free",
        paid:    sub.paid ?? false,
        ...(price ?? {}),
        ts: Date.now(),
      });

      const body = `event: price\ndata: ${payload}\n\nretry: 15000\n\n`;
      return new Response(body, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/whale/alerts") {
      const r = await oracleFetch(env, "/whale/alerts").catch(() => null);
      if (!r?.ok) return Response.json({ alerts: [] }, { headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "application/json", "Cache-Control": CC_WHALE, ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/rate") {
      const currency = (searchParams.get("currency") ?? "USD").toUpperCase();
      const cKey = `social:rate:${currency}`;
      const cachedRate = await env.KV.get<Record<string,unknown>>(cKey, "json");
      if (cachedRate) return Response.json(cachedRate, { headers: { "Cache-Control": CC_PRICE, ...corsHeaders } });
      const r = await oracleFetch(env, `/rate?currency=${encodeURIComponent(currency)}`).catch(() => null);
      if (!r?.ok) return Response.json({ error: "unavailable" }, { status: 503, headers: corsHeaders });
      const rateData = await r.json() as Record<string,unknown>;
      env.KV.put(cKey, JSON.stringify(rateData), { expirationTtl: 60 }).catch(() => {});
      return Response.json(rateData, { headers: { "Cache-Control": CC_PRICE, ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/oracle") {
      const r = await oracleFetch(env, "/").catch(() => null);
      if (!r?.ok) return Response.json({ error: "unavailable" }, { status: 503, headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": CC_HTML, ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/subscription") {
      const wallet = searchParams.get("wallet") ?? "";
      const r = await oracleFetch(env, `/subscription?wallet=${encodeURIComponent(wallet)}`).catch(() => null);
      if (!r?.ok) return Response.json({ error: "unavailable" }, { status: 503, headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/payment-links")
      return Response.json({
        stripe:   env.STRIPE_PAYMENT_LINK   ?? null,
        coinbase: env.COINBASE_COMMERCE_LINK ?? null,
      }, { headers: corsHeaders });

    if (method === "POST" && pathname === "/agent")
      return handleAgent(request, env, corsHeaders);

    if (method === "POST" && pathname === "/activate-oracle")
      return handleActivateOracle(request, env, corsHeaders);

    if (method === "POST" && pathname === "/webhook/stripe")
      return handleStripeWebhook(request, env);

    if (method === "POST" && pathname === "/ingest")
      return handleIngest(request, env);

    if (method === "POST" && pathname === "/register")
      return handleRegister(request, env);

    if (method === "POST" && pathname === "/upgrade")
      return handleUpgrade(request, env);

    if (method === "POST" && pathname === "/oracle-activate") {
      const secret = request.headers.get("X-Internal-Secret");
      if (!secret || secret !== env.INTERNAL_SECRET)
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      return handleOracleActivate(request, env);
    }

    if (method === "GET" && pathname === "/status")
      return handleStatus(searchParams, env);

    if (method === "POST" && pathname === "/dev/register")
      return handleDevRegister(request, env);

    if (method === "POST" && pathname === "/dev/support/reply")
      return handleDevSupportReply(request, env);

    if (method === "POST" && pathname === "/discord/interactions")
      return handleDiscordInteractions(request, env);

    if (method === "GET" && pathname === "/support/status")
      return handleSupportStatus(searchParams, env);

    if (method === "POST" && pathname === "/support")
      return handleSupport(request, env, corsHeaders);

    if (method === "OPTIONS")
      return new Response(null, { headers: { ...corsHeaders, "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type,X-Internal-Secret" } });

    if (method === "GET" && pathname === "/wallet/history") {
      const wallet = searchParams.get("wallet") ?? "";
      const r = await oracleFetch(env, `/wallet/history?wallet=${encodeURIComponent(wallet)}`).catch(() => null);
      if (!r?.ok) return Response.json({ error: "unavailable" }, { status: 503, headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/wallet/score") {
      const wallet = searchParams.get("wallet") ?? "";
      const r = await oracleFetch(env, `/wallet/score?wallet=${encodeURIComponent(wallet)}`).catch(() => null);
      if (!r?.ok) return Response.json({ error: "unavailable" }, { status: 503, headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/analytics/network") {
      const r = await oracleFetch(env, "/analytics/network").catch(() => null);
      if (!r?.ok) return Response.json({ error: "unavailable" }, { status: 503, headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/network/health") {
      const r = await oracleFetch(env, "/network/health").catch(() => null);
      if (!r?.ok) return Response.json({ error: "unavailable" }, { status: 503, headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    if (method === "GET" && pathname === "/identity/resolve") {
      const q = searchParams.get("username") ?? searchParams.get("wallet") ?? searchParams.get("q") ?? "";
      const r = await oracleFetch(env, `/identity/resolve?q=${encodeURIComponent(q)}`).catch(() => null);
      if (!r?.ok) return Response.json({ error: "unavailable" }, { status: 503, headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    const SDK_POST_PATHS = new Set(["/compliance/screen", "/kyc/verify", "/certificate/manage", "/container/seal", "/batch/build", "/permissions/manage"]);
    if (method === "POST" && SDK_POST_PATHS.has(pathname)) {
      let rawBody: string;
      try { rawBody = await request.text(); } catch { rawBody = "{}"; }
      const r = await oraclePost(env, pathname, rawBody).catch(() => null);
      if (!r?.ok) return Response.json({ error: "unavailable" }, { status: 503, headers: corsHeaders });
      return new Response(r.body, { headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    return Response.json({ service: "kta" }, { status: 404, headers: corsHeaders });
    } catch (e) {
      return Response.json({ error: e instanceof Error ? e.message : "Internal error" }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
    }
  },
} satisfies ExportedHandler<Env>;

async function handleAgent(request: Request, env: Env, cors: Record<string,string>): Promise<Response> {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return Response.json({ error: "Invalid JSON" }, { status: 400, headers: cors }); }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length < 2)
    return Response.json({ error: "message required" }, { status: 400, headers: cors });

  const ip    = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const fp    = await hashFp(ip);
  const rKey  = `agent:rate:${fp}`;
  const state = await env.KV.get<{ count: number; last: number }>(rKey, "json") ?? { count: 0, last: 0 };

  const now = Date.now();
  if (now - state.last < 5_000)
    return Response.json({ reply: "Slow down — wait a moment before sending another message." }, { headers: cors });
  if (state.count >= 10)
    return Response.json({ reply: "You're asking great questions — slow down a little though. Come back in an hour and let's continue." }, { headers: cors });

  await env.KV.put(rKey, JSON.stringify({ count: state.count + 1, last: now }), { expirationTtl: 3600 });

  const reply = await chatWithAgent(env.AI_KEY, env.AI_ENDPOINT, env.AI_MODEL, message);
  return Response.json({ reply }, { headers: cors });
}

async function handleActivateOracle(request: Request, env: Env, cors: Record<string,string>): Promise<Response> {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return Response.json({ error: "Invalid JSON" }, { status: 400, headers: cors }); }

  const wallet = sanitiseWallet(body.wallet);
  if (!wallet)
    return Response.json({ error: "wallet required" }, { status: 400, headers: cors });

  const payload = JSON.stringify({ wallet });
  const headers  = { "Content-Type": "application/json" };

  let res: Response | null = null;
  if (env.ORACLE_SERVICE) {
    res = await env.ORACLE_SERVICE.fetch("https://oracle/activate", { method: "POST", headers, body: payload }).catch(() => null);
  } else {
    const base = env.KTA_ORACLE_URL ?? "";
    if (!base) return Response.json({ error: "Oracle not configured" }, { status: 503, headers: cors });
    res = await fetch(`${base}/activate`, { method: "POST", headers, body: payload, signal: AbortSignal.timeout(20000) }).catch(() => null);
  }

  if (!res?.ok) return Response.json({ error: "Activation failed" }, { status: 502, headers: cors });
  return new Response(res.body, { headers: { "Content-Type": "application/json", ...cors } });
}

async function handleIngest(request: Request, env: Env): Promise<Response> {
  const authErr = requireInternalAuth(request, env.INTERNAL_SECRET);
  if (authErr) return authErr;

  let event: Record<string, unknown>;
  try { event = await request.json() as Record<string, unknown>; }
  catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }

  if (event.type === "price_update") {
    const price          = event.price          as number;
    const priceChange    = event.priceChange     as number;
    const change24h      = event.change24h       as number;
    const change7d       = event.change7d        as number | null;
    const volume24h      = (event.volume24h      as number | null) ?? null;
    const liquidityUsd   = (event.liquidityUsd   as number | null) ?? null;
    const alertTriggered = event.alertTriggered  as boolean;
    const changeLevel    = (event.changeLevel as string | undefined) ?? null;
    const whale          = event.whale           as { amountKta: number; classification: string } | null;
    const now            = Date.now();

    const alertCount  = Math.floor(now / 3_600_000) % 100;
    const QUOTE_TTL   = 3 * 60_000;

    type QuoteCache = { standard: string; full: string; preview: string; ts: number };
    const [quoteCache] = await Promise.all([
      env.KV.get<QuoteCache>("social:quote_cache", "json"),
      env.KV.put("social:price_cache", JSON.stringify({
        price, change_pct: priceChange, change_24h: change24h, change_7d: change7d ?? null, ts: now,
      }), { expirationTtl: 600 }),
    ]);

    let quoteStandard: string;
    let quoteFull: string;

    let quotePreview: string;

    if (quoteCache && now - quoteCache.ts < QUOTE_TTL) {
      quoteStandard = quoteCache.standard;
      quoteFull     = quoteCache.full;
      quotePreview  = quoteCache.preview;
    } else {
      [quoteStandard, quoteFull, quotePreview] = await Promise.all([
        generateInsight(env.AI_KEY, env.AI_ENDPOINT, env.AI_MODEL, priceChange, change24h, change7d, alertCount, "standard", volume24h, liquidityUsd),
        generateInsight(env.AI_KEY, env.AI_ENDPOINT, env.AI_MODEL, priceChange, change24h, change7d, alertCount, "full", volume24h, liquidityUsd),
        generateInsight(env.AI_KEY, env.AI_ENDPOINT, env.AI_MODEL, priceChange, change24h, change7d, alertCount, "preview", volume24h, liquidityUsd),
      ]);
      env.KV.put("social:quote_cache", JSON.stringify({ standard: quoteStandard, full: quoteFull, preview: quotePreview, ts: now }), { expirationTtl: 300 }).catch(() => {});
    }

    await broadcastToSubscribers(env, price, priceChange, change24h, change7d, volume24h, liquidityUsd, alertTriggered, changeLevel, whale, quotePreview, quoteStandard, quoteFull, now);
  }

  return Response.json({ ok: true });
}

function currentYYYYMM(): number {
  const d = new Date();
  return d.getFullYear() * 100 + (d.getMonth() + 1);
}

function canReceiveWhale(sub: SocialSubscriber): boolean {
  const tier = sub.tier ?? (sub.paid ? "social" : "free");
  if (["social", "pro", "business"].includes(tier)) return true;
  const month = currentYYYYMM();
  if (tier === "starter") {
    if ((sub.whaleMonth ?? 0) !== month) return true;
    return (sub.whaleMonthCount ?? 0) < WHALE_LIMIT_STARTER;
  }
  return (sub.whaleCount ?? 0) < WHALE_LIMIT_FREE;
}

function chargeWhale(sub: SocialSubscriber): void {
  const tier = sub.tier ?? (sub.paid ? "social" : "free");
  if (["social", "pro", "business"].includes(tier)) return;
  const month = currentYYYYMM();
  if (tier === "starter") {
    if ((sub.whaleMonth ?? 0) !== month) {
      sub.whaleMonth = month;
      sub.whaleMonthCount = 1;
    } else {
      sub.whaleMonthCount = (sub.whaleMonthCount ?? 0) + 1;
    }
  } else {
    sub.whaleCount = (sub.whaleCount ?? 0) + 1;
  }
}

function pickQuote(
  tier: string | undefined,
  quotePreview: string,
  quoteStandard: string,
  quoteFull: string,
): string | null {
  if (tier === "pro" || tier === "business") return quoteFull;
  if (tier === "social") return quoteStandard;
  if (tier === "starter") return quotePreview;
  return null;
}

async function broadcastToSubscribers(
  env: Env,
  price: number, priceChange: number, change24h: number, change7d: number | null,
  volume24h: number | null, liquidityUsd: number | null,
  alertTriggered: boolean,
  changeLevel: string | null,
  whale: { amountKta: number; classification: string } | null,
  quotePreview: string,
  quoteStandard: string,
  quoteFull: string,
  now: number,
): Promise<void> {
  const subscribers = await getSubscribers(env);
  if (!subscribers.length) return;

  const TRIAL = trialLimit(env);
  const devWallet = env.DEV_WALLET?.trim().toLowerCase();
  const appUrl    = env.APP_URL;
  const iconUrl   = `${appUrl}/icon.png`;
  const DAY_MS    = 24 * 60 * 60 * 1000;

  const uniqueCurrencies = [...new Set(subscribers.map(s => (s.currency ?? "USD").toUpperCase()).filter(c => c !== "USD"))];
  const fxPrices = new Map<string, number>();
  await Promise.all(uniqueCurrencies.map(async (cur) => {
    try {
      const cKey = `social:fx:${cur}`;
      const cachedFx = await env.KV.get<{ price: number }>(cKey, "json");
      if (cachedFx?.price) { fxPrices.set(cur, cachedFx.price); return; }
      const r = await oracleFetch(env, `/rate?currency=${cur}`);
      if (r.ok) {
        const d = await r.json() as { price?: number };
        if (d.price) {
          fxPrices.set(cur, d.price);
          env.KV.put(cKey, JSON.stringify({ price: d.price }), { expirationTtl: 60 }).catch(() => {});
        }
      }
    } catch {}
  }));

  const updated: SocialSubscriber[] = [];
  let dirty = false;

  for (const sub of subscribers) {
    const isDev = !!(devWallet && sub.wallet.toLowerCase() === devWallet);

    if (!isDev && !sub.paid && sub.alertCount >= TRIAL) {
      updated.push(sub);
      continue;
    }

    const freq        = sub.frequency ?? "15min";
    const isDigest    = DIGEST_FREQS.includes(freq as AlertFrequency);
    const pctThresh   = CHANGE_PCT[freq as AlertFrequency];
    const silenceMs   = now - (sub.lastAlertAt ?? 0);
    let   intervalMet: boolean;
    if (changeLevel === "extreme") {
      intervalMet = silenceMs >= 5 * 60_000;
    } else if (changeLevel === "major") {
      intervalMet = silenceMs >= 30 * 60_000;
    } else if (changeLevel === "notable") {
      intervalMet = silenceMs >= 60 * 60_000;
    } else if (changeLevel === "normal") {
      intervalMet = silenceMs >= 4 * 60 * 60_000;
    } else if (pctThresh !== undefined) {
      const cooldownMet = silenceMs >= PCT_COOLDOWN;
      const lastP       = sub.lastAlertPrice ?? 0;
      const pctMoved    = lastP > 0 ? Math.abs((price - lastP) / lastP * 100) : 100;
      intervalMet       = cooldownMet && pctMoved >= pctThresh;
    } else {
      intervalMet = silenceMs >= (FREQ_MS[freq as AlertFrequency] ?? FREQ_MS["15min"]!);
    }

    if (!intervalMet) {
      updated.push(sub);
      continue;
    }

    const currency      = (sub.currency ?? "USD").toUpperCase();
    const convertedPrice = currency !== "USD" ? (fxPrices.get(currency) ?? undefined) : undefined;
    const socialLife    = !!(sub.socialLifetime ?? sub.paid);
    const isExpired     = sub.expiresAt ? sub.expiresAt < now : false;
    const isOracle      = !isExpired || sub.tier === "free";

    if (!isDev && isExpired && !socialLife) {
      updated.push(sub);
      continue;
    }

    if (!isDev && sub.expiresAt && !sub.reminderSent) {
      const hoursLeft = (sub.expiresAt - now) / 3_600_000;
      if (hoursLeft <= 24 && hoursLeft > 0) {
        const tierLabel = sub.tier ?? "Oracle";
        try {
          if (sub.platform === "discord" && sub.discordWebhook)
            await sendDiscord(sub.discordWebhook, buildExpiryReminderDiscord(appUrl, tierLabel, hoursLeft), iconUrl);
          if (sub.platform === "telegram" && sub.telegramBotToken && sub.telegramChatId)
            await sendTelegram(sub.telegramBotToken, sub.telegramChatId, buildExpiryReminderText(appUrl, tierLabel, hoursLeft));
          if (sub.platform === "slack" && sub.slackWebhook)
            await sendSlack(sub.slackWebhook, buildExpiryReminderText(appUrl, tierLabel, hoursLeft), iconUrl);
        } catch {}
        sub.reminderSent = true;
        dirty = true;
      }
    }

    const aiQuote = pickQuote(sub.tier, quotePreview, quoteStandard, quoteFull);

    const celebType: CelebType | null = !sub.firstAlertSent
      ? ((sub.paid || sub.socialLifetime) ? "lifetime_welcome" : "trial_welcome")
      : sub.celebPending ?? null;
    const celebTier      = sub.tier ?? (sub.paid ? "social" : "free");
    const celebRemaining = TRIAL - sub.alertCount - 1;

    try {
      if (sub.platform === "discord" && sub.discordWebhook) {
        const pricePayload = buildDiscordPriceEmbed(price, priceChange, change24h, 0, sub.alertCount, sub.paid, appUrl, currency, convertedPrice, change7d, volume24h, aiQuote, socialLife);
        const finalPayload = celebType
          ? prependCelebEmbed(pricePayload, buildCelebEmbed(celebType, appUrl, celebTier, celebRemaining))
          : pricePayload;
        await sendDiscord(sub.discordWebhook, finalPayload, iconUrl);
        if (whale && isOracle && canReceiveWhale(sub)) {
          await sendDiscord(sub.discordWebhook,
            buildDiscordWhaleEmbed(price, whale.amountKta, whale.classification, sub.alertCount, sub.paid, appUrl, currency, convertedPrice, change7d, socialLife), iconUrl);
          chargeWhale(sub);
        }
      }

      if (sub.platform === "telegram" && sub.telegramBotToken && sub.telegramChatId) {
        const prefix = celebType ? buildCelebText(celebType, appUrl, celebTier, celebRemaining) : "";
        await sendTelegram(sub.telegramBotToken, sub.telegramChatId,
          prefix + buildPriceAlert(price, priceChange, change24h, 0, sub.alertCount, sub.paid, appUrl, currency, convertedPrice, change7d, volume24h, aiQuote));
        if (whale && isOracle && canReceiveWhale(sub)) {
          await sendTelegram(sub.telegramBotToken, sub.telegramChatId,
            buildWhaleAlert(price, whale.amountKta, whale.classification, sub.alertCount, sub.paid, appUrl, currency, undefined, change7d));
          chargeWhale(sub);
        }
      }

      if (sub.platform === "slack" && sub.slackWebhook) {
        const prefix = celebType ? buildCelebText(celebType, appUrl, celebTier, celebRemaining) : "";
        await sendSlack(sub.slackWebhook,
          prefix + buildPriceAlert(price, priceChange, change24h, 0, sub.alertCount, sub.paid, appUrl, currency, convertedPrice, change7d, volume24h, aiQuote), iconUrl);
        if (whale && isOracle && canReceiveWhale(sub)) {
          await sendSlack(sub.slackWebhook,
            buildWhaleAlert(price, whale.amountKta, whale.classification, sub.alertCount, sub.paid, appUrl, currency, undefined, change7d), iconUrl);
          chargeWhale(sub);
        }
      }

      if (sub.platform === "twitter" && sub.twitterCreds) {
        await postTweet(sub,
          buildTwitterPrice(price, priceChange, change24h, 0, sub.alertCount, sub.paid, appUrl, currency, convertedPrice, change7d, null, aiQuote));
        if (whale && isOracle && canReceiveWhale(sub)) {
          await postTweet(sub,
            buildTwitterWhale(price, whale.amountKta, whale.classification, sub.alertCount, sub.paid, appUrl));
          chargeWhale(sub);
        }
      }

      sub.alertCount     += 1;
      sub.lastAlertAt      = now;
      sub.lastAlertPrice   = price;
      if (!sub.firstAlertSent) sub.firstAlertSent = true;
      if (sub.celebPending)    sub.celebPending   = undefined;
      dirty = true;

      if (!isDev && !sub.paid && sub.alertCount === TRIAL - 1)
        await sendTrialWarning(env, sub);
      if (!isDev && !sub.paid && sub.alertCount === TRIAL)
        await sendTrialExhausted(env, sub);

    } catch {}

    updated.push(sub);
  }

  if (dirty) await saveSubscribers(env, updated);

  if (alertTriggered || whale) {
    await broadcastDevChannels(env, price, priceChange, change24h, change7d, volume24h, whale, quoteFull);

  }
}

async function broadcastDevChannels(
  env: Env,
  price: number, priceChange: number, change24h: number, change7d: number | null,
  volume24h: number | null,
  whale: { amountKta: number; classification: string } | null,
  aiQuote: string | null,
): Promise<void> {
  const appUrl  = env.APP_URL;
  const iconUrl = `${appUrl}/icon.png`;

  if (env.DISCORD_WEBHOOK_URL)
    await sendDiscord(env.DISCORD_WEBHOOK_URL,
      buildDiscordPriceEmbed(price, priceChange, change24h, 0, 0, true, appUrl, "USD", undefined, change7d, volume24h, aiQuote, true), iconUrl)
      .catch(() => {});

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID)
    await sendTelegram(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID,
      buildPriceAlert(price, priceChange, change24h, 0, 0, true, appUrl, "USD", undefined, change7d, volume24h, aiQuote))
      .catch(() => {});

  if (env.SLACK_WEBHOOK_URL)
    await sendSlack(env.SLACK_WEBHOOK_URL,
      buildPriceAlert(price, priceChange, change24h, 0, 0, true, appUrl, "USD", undefined, change7d, null, aiQuote), iconUrl)
      .catch(() => {});

  await sendDevTwitter(env,
    buildTwitterPrice(price, priceChange, change24h, 0, 0, true, appUrl, "USD", undefined, change7d, null, aiQuote))
    .catch(() => {});

  if (whale) {
    if (env.DISCORD_WEBHOOK_URL)
      await sendDiscord(env.DISCORD_WEBHOOK_URL,
        { content: buildWhaleAlert(price, whale.amountKta, whale.classification, 0, true, appUrl) }, iconUrl)
        .catch(() => {});
    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID)
      await sendTelegram(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID,
        buildWhaleAlert(price, whale.amountKta, whale.classification, 0, true, appUrl))
        .catch(() => {});
    await sendDevTwitter(env,
      buildTwitterWhale(price, whale.amountKta, whale.classification, 0, true, appUrl))
      .catch(() => {});
  }
}

async function sendTrialWarning(env: Env, sub: SocialSubscriber): Promise<void> {
  const appUrl   = env.APP_URL;
  const iconUrl  = `${appUrl}/icon.png`;
  const lifetime = lifetimeKta(env);
  try {
    if (sub.platform === "discord" && sub.discordWebhook)
      await sendDiscord(sub.discordWebhook, buildTrialWarningDiscord(appUrl, lifetime), iconUrl);
    if (sub.platform === "telegram" && sub.telegramBotToken && sub.telegramChatId)
      await sendTelegram(sub.telegramBotToken, sub.telegramChatId, buildTrialWarningText(appUrl, lifetime));
    if (sub.platform === "slack" && sub.slackWebhook)
      await sendSlack(sub.slackWebhook, buildTrialWarningText(appUrl, lifetime), iconUrl);
    if (sub.platform === "twitter" && sub.twitterCreds) {
      const tLimit = trialLimit(env);
      const msg = `⚠️ 1 free $KTA alert remaining.\n\nYou've used ${tLimit - 1}/${tLimit} free oracle alerts.\n\nLifetime access: ${lifetime} KTA — one payment, no renewals.\nCheck your status or top up:\n👉 ${appUrl}/checkout`;
      if (msg.length <= 280) await postTweet(sub, msg);
    }
  } catch {}
}

async function sendTrialExhausted(env: Env, sub: SocialSubscriber): Promise<void> {
  const appUrl  = env.APP_URL;
  const iconUrl = `${appUrl}/icon.png`;
  try {
    if (sub.platform === "discord" && sub.discordWebhook)
      await sendDiscord(sub.discordWebhook, buildTrialExhaustedDiscord(appUrl), iconUrl);
    if (sub.platform === "telegram" && sub.telegramBotToken && sub.telegramChatId)
      await sendTelegram(sub.telegramBotToken, sub.telegramChatId, buildTrialExhaustedText(appUrl));
    if (sub.platform === "slack" && sub.slackWebhook)
      await sendSlack(sub.slackWebhook, buildTrialExhaustedText(appUrl), iconUrl);
    if (sub.platform === "twitter" && sub.twitterCreds) {
      const TRIAL = trialLimit(env);
      const LIFETIME = lifetimeKta(env);
      const msg = `⏳ ${TRIAL} free $KTA alerts used up.\n\nYou've seen the oracle — price moves, AI insights, whale alerts.\n\nLifetime social alerts: ${LIFETIME} KTA once.\n\n👉 ${appUrl}/donate`;
      if (msg.length <= 280) await postTweet(sub, msg);
    }
  } catch {}
}

async function handleRegister(request: Request, env: Env): Promise<Response> {
  try {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }

  const wallet = sanitiseWallet(body.wallet);
  if (!wallet)
    return Response.json({ error: "wallet required — must start with keeta_", help: "Get a free wallet at wallet.keeta.com" }, { status: 400 });

  const platform = body.platform as SocialPlatform | undefined;
  if (!platform || !VALID_PLATFORMS.includes(platform))
    return Response.json({ error: "platform required", options: VALID_PLATFORMS }, { status: 400 });

  const frequency = (body.frequency as AlertFrequency | undefined) ?? "15min";
  if (!VALID_FREQS.includes(frequency))
    return Response.json({ error: "invalid frequency", options: VALID_FREQS }, { status: 400 });

  const currency = typeof body.currency === "string"
    ? body.currency.toUpperCase().replace(/[^A-Z]/g, "").substring(0, 5) : "USD";

  const credError = validateCredentials(platform, body);
  if (credError) return Response.json({ error: credError }, { status: 400 });

  const ip = request.headers.get("CF-Connecting-IP") ?? "";
  const ua = request.headers.get("User-Agent") ?? "";
  if (ip) {
    const fp   = await hashFp(ip + "|" + ua.slice(0, 80));
    const fKey = `fp:reg:${fp}`;
    const seen = (await env.KV.get<string[]>(fKey, "json")) ?? [];
    if (!seen.includes(wallet) && seen.length >= 3) {
      return Response.json({ error: "Registration limit reached." }, { status: 429 });
    }
    if (!seen.includes(wallet)) {
      seen.push(wallet);
      await env.KV.put(fKey, JSON.stringify(seen), { expirationTtl: 30 * 24 * 60 * 60 });
    }
  }

  const TRIAL     = trialLimit(env);
  const LIFETIME  = lifetimeKta(env);
  const devSecret = env.DEV_SECRET?.trim();
  const isDev     = !!(devSecret && String(body.devSecret ?? "").trim() === devSecret);

  const existing    = await getSubscribers(env);
  const existingIdx = existing.findIndex(s => s.wallet === wallet);
  const previous    = existingIdx !== -1 ? existing[existingIdx] : null;

  const sub: SocialSubscriber = {
    wallet, platform, frequency, currency,
    alertCount:   previous?.alertCount  ?? 0,
    paid:         isDev ? true : (previous?.paid ?? false),
    lastAlertAt:  previous?.lastAlertAt ?? 0,
    registeredAt: previous?.registeredAt ?? Date.now(),
    tier:         previous?.tier,
    expiresAt:    previous?.expiresAt,
    socialLifetime: previous?.socialLifetime,
    whaleCount:   previous?.whaleCount,
    whaleMonthCount: previous?.whaleMonthCount,
    whaleMonth:   previous?.whaleMonth,
    reminderSent: previous?.reminderSent,
    discordWebhook:   platform === "discord"  ? body.discordWebhook  as string : undefined,
    telegramBotToken: platform === "telegram" ? body.telegramBotToken as string : undefined,
    telegramChatId:   platform === "telegram" ? body.telegramChatId  as string : undefined,
    slackWebhook:     platform === "slack"    ? body.slackWebhook    as string : undefined,
    twitterCreds:     platform === "twitter"  ? {
      apiKey:       body.apiKey       as string,
      apiSecret:    body.apiSecret    as string,
      accessToken:  body.accessToken  as string,
      accessSecret: body.accessSecret as string,
    } : undefined,
  };

  if (existingIdx !== -1) existing[existingIdx] = sub;
  else existing.push(sub);
  await saveSubscribers(env, existing);

  const remaining = sub.paid ? "unlimited" : Math.max(0, TRIAL - sub.alertCount);
  const status    = sub.paid
    ? "Lifetime access active"
    : remaining === 0
    ? `Trial exhausted — send ${LIFETIME} KTA to upgrade`
    : `Trial: ${sub.alertCount} used · ${remaining} remaining`;

  return Response.json({
    ok: true,
    action: existingIdx !== -1 ? "updated" : "registered",
    wallet, platform, frequency, currency,
    status, paid: sub.paid,
    upgrade: sub.paid ? null : { cost: `${LIFETIME} KTA (one-time)`, endpoint: `POST ${env.APP_URL}/upgrade` },
  });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Registration failed" }, { status: 500 });
  }
}

async function handleUpgrade(request: Request, env: Env): Promise<Response> {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }

  const wallet = sanitiseWallet(body.wallet);
  if (!wallet)
    return Response.json({ error: "wallet required" }, { status: 400 });

  const subscribers = await getSubscribers(env);
  const idx         = subscribers.findIndex(s => s.wallet === wallet);

  if (idx === -1)
    return Response.json({ error: "Wallet not registered. Register first at POST /register." }, { status: 404 });

  if (subscribers[idx].paid)
    return Response.json({ ok: true, already: true, message: "This wallet already has lifetime access." });

  const LIFETIME = lifetimeKta(env);

  const verifyHeaders = { "X-Internal-Secret": env.INTERNAL_SECRET, "Content-Type": "application/json" };
  const verifyPayload = JSON.stringify({ wallet, requiredKta: LIFETIME });
  let res: Response | null = null;
  if (env.ORACLE_SERVICE) {
    res = await env.ORACLE_SERVICE.fetch("https://oracle/verify-payment", {
      method: "POST", headers: verifyHeaders, body: verifyPayload,
    }).catch(() => null);
  } else if (env.KTA_ORACLE_URL) {
    res = await fetch(`${env.KTA_ORACLE_URL}/verify-payment`, {
      method: "POST", headers: verifyHeaders, body: verifyPayload, signal: AbortSignal.timeout(12000),
    }).catch(() => null);
  }

  if (!res || !res.ok)
    return Response.json({ error: "Payment verification unavailable — try again in a moment." }, { status: 503 });

  const result = await res.json() as { verified: boolean; amount: number; error?: string };

  if (result.error)
    return Response.json({ error: "Verification error", detail: result.error }, { status: 503 });

  if (!result.verified)
    return Response.json({
      error: "No qualifying payment found",
      required: `${LIFETIME} KTA`,
      oracle_wallet: env.ORACLE_WALLET,
      instructions: [
        `1. Send ${LIFETIME} KTA or more to the oracle wallet`,
        `2. Use your registered wallet as the sender: ${wallet}`,
        `3. Wait ~0.4 seconds for Keeta Network settlement`,
        `4. Call this endpoint again`,
      ],
    }, { status: 402 });

  subscribers[idx].paid           = true;
  subscribers[idx].socialLifetime = true;
  await saveSubscribers(env, subscribers);

  const sub     = subscribers[idx];
  const appUrl  = env.APP_URL;
  const iconUrl = `${appUrl}/icon.png`;
  try {
    if (sub.platform === "discord" && sub.discordWebhook)
      await sendDiscord(sub.discordWebhook, buildLifetimeActivatedDiscord(appUrl), iconUrl);
    if (sub.platform === "telegram" && sub.telegramBotToken && sub.telegramChatId)
      await sendTelegram(sub.telegramBotToken, sub.telegramChatId, buildLifetimeActivatedText(appUrl));
    if (sub.platform === "slack" && sub.slackWebhook)
      await sendSlack(sub.slackWebhook, buildLifetimeActivatedText(appUrl), iconUrl);
  } catch {}

  return Response.json({
    ok:      true,
    message: `Lifetime access activated. Payment of ${result.amount.toFixed(1)} KTA verified on Keeta Network.`,
    wallet,
    paid:    true,
    alerts:  "Unlimited — alerts resume on the next cycle.",
  });
}

async function handleOracleActivate(request: Request, env: Env): Promise<Response> {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }

  const wallet = sanitiseWallet(body.wallet);
  if (!wallet)
    return Response.json({ error: "wallet required" }, { status: 400 });

  const tier          = body.tier as string | undefined;
  const expiresAt     = body.expiresAt as number | undefined;
  const socialLifetime = !!(body.socialLifetime);

  const subscribers = await getSubscribers(env);
  const idx         = subscribers.findIndex(s => s.wallet === wallet);

  if (idx === -1)
    return Response.json({ ok: false, message: "Wallet not yet registered in Social — register first to receive alerts." });

  if (subscribers[idx].paid && subscribers[idx].socialLifetime)
    return Response.json({ ok: true, already: true });

  const wasTrialWithAlerts = subscribers[idx].firstAlertSent && !subscribers[idx].paid;
  const isRenewal          = !socialLifetime && !!subscribers[idx].expiresAt && subscribers[idx].firstAlertSent;

  if (socialLifetime) subscribers[idx].paid = true;
  if (tier)       subscribers[idx].tier      = tier as any;
  if (expiresAt)  subscribers[idx].expiresAt = expiresAt;
  subscribers[idx].socialLifetime = socialLifetime;
  subscribers[idx].reminderSent   = false;

  if (socialLifetime && wasTrialWithAlerts) subscribers[idx].celebPending = "upgrade";
  else if (isRenewal)                       subscribers[idx].celebPending = "renewal";

  await saveSubscribers(env, subscribers);

  const sub     = subscribers[idx];
  const appUrl  = env.APP_URL;
  const iconUrl = `${appUrl}/icon.png`;
  if (socialLifetime) {
    try {
      if (sub.platform === "discord" && sub.discordWebhook)
        await sendDiscord(sub.discordWebhook, buildLifetimeActivatedDiscord(appUrl), iconUrl);
      if (sub.platform === "telegram" && sub.telegramBotToken && sub.telegramChatId)
        await sendTelegram(sub.telegramBotToken, sub.telegramChatId, buildLifetimeActivatedText(appUrl));
      if (sub.platform === "slack" && sub.slackWebhook)
        await sendSlack(sub.slackWebhook, buildLifetimeActivatedText(appUrl), iconUrl);
    } catch {}
  }

  return Response.json({ ok: true, wallet, activated: true });
}

async function handleStatus(searchParams: URLSearchParams, env: Env): Promise<Response> {
  const wallet = sanitiseWallet(searchParams.get("wallet"));
  if (!wallet)
    return Response.json({ error: "wallet query param required" }, { status: 400 });

  const TRIAL    = trialLimit(env);
  const LIFETIME = lifetimeKta(env);

  const [subscribers, oracleR] = await Promise.all([
    getSubscribers(env),
    oracleFetch(env, `/subscription?wallet=${encodeURIComponent(wallet)}`).catch(() => null),
  ]);

  const sub    = subscribers.find(s => s.wallet === wallet);
  const oracle = oracleR?.ok ? await oracleR.json() as Record<string, unknown> : null;
  const oracleTier = typeof oracle?.tier === "string" && oracle.tier !== "unregistered" ? oracle.tier : null;

  if (!sub) {
    return Response.json({
      found: false, wallet,
      oracle: oracleTier ? {
        tier:           oracleTier,
        amount:         oracle?.amount,
        expiresAt:      oracle?.expiresAt ?? null,
        socialLifetime: oracle?.socialLifetime ?? false,
      } : null,
      register: { endpoint: `POST ${env.APP_URL}/register`, trial: `${TRIAL} free alerts included` },
    }, { status: 404 });
  }

  const remaining = sub.paid ? "unlimited" : Math.max(0, TRIAL - sub.alertCount);
  const isExpired = sub.expiresAt ? sub.expiresAt < Date.now() : false;
  const status    = sub.paid
    ? `Lifetime social alerts${isExpired ? " (Oracle expired — renew for API access)" : " — active"}`
    : remaining === 0
    ? "Trial exhausted — send 50 KTA to upgrade"
    : `Trial active — ${sub.alertCount} used · ${remaining} remaining`;

  return Response.json({
    found: true, wallet,
    platform:        sub.platform,
    frequency:       sub.frequency,
    currency:        sub.currency,
    paid:            sub.paid,
    tier:            sub.tier ?? (sub.paid ? "social" : "free"),
    socialLifetime:  sub.socialLifetime ?? sub.paid,
    alertCount:      sub.alertCount,
    alertsRemaining: remaining,
    expiresAt:       sub.expiresAt ? new Date(sub.expiresAt).toISOString() : null,
    oracleExpired:   isExpired,
    lastAlertAt:     sub.lastAlertAt ? new Date(sub.lastAlertAt).toISOString() : null,
    registeredAt:    new Date(sub.registeredAt).toISOString(),
    status,
    oracle: oracleTier ? {
      tier:           oracleTier,
      amount:         oracle?.amount,
      expiresAt:      oracle?.expiresAt ?? null,
      socialLifetime: oracle?.socialLifetime ?? false,
    } : null,
    upgrade: sub.paid ? null : {
      cost: `${LIFETIME} KTA (one-time)`,
      endpoint: `POST ${env.APP_URL}/upgrade`,
    },
  });
}

async function handleDevRegister(request: Request, env: Env): Promise<Response> {
  const devSecret = env.DEV_SECRET?.trim();
  const devWallet = env.DEV_WALLET?.trim();

  if (!devSecret || !devWallet)
    return Response.json({ error: "Not configured" }, { status: 503 });

  if (request.headers.get("X-Dev-Secret") !== devSecret)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }

  const platform = body.platform as SocialPlatform | undefined;
  if (!platform || !VALID_PLATFORMS.includes(platform))
    return Response.json({ error: "platform required", options: VALID_PLATFORMS }, { status: 400 });

  const credError = validateCredentials(platform, body);
  if (credError) return Response.json({ error: credError }, { status: 400 });

  const existing    = await getSubscribers(env);
  const existingIdx = existing.findIndex(s => s.wallet === devWallet);
  const previous    = existingIdx !== -1 ? existing[existingIdx] : null;

  const devSub: SocialSubscriber = {
    wallet:            devWallet,
    platform,
    frequency:        (body.frequency as AlertFrequency) ?? "15min",
    currency:         (body.currency  as string)         ?? "USD",
    lastAlertAt:       previous?.lastAlertAt  ?? 0,
    alertCount:        previous?.alertCount   ?? 0,
    paid:              true,
    socialLifetime:    true,
    tier:              "business",
    registeredAt:      previous?.registeredAt ?? Date.now(),
    discordWebhook:    platform === "discord"  ? body.discordWebhook  as string : undefined,
    telegramBotToken:  platform === "telegram" ? body.telegramBotToken as string : undefined,
    telegramChatId:    platform === "telegram" ? body.telegramChatId  as string : undefined,
    slackWebhook:      platform === "slack"    ? body.slackWebhook    as string : undefined,
    twitterCreds:      platform === "twitter"  ? {
      apiKey:       body.apiKey       as string,
      apiSecret:    body.apiSecret    as string,
      accessToken:  body.accessToken  as string,
      accessSecret: body.accessSecret as string,
    } : undefined,
  };

  const updated = [...existing.filter(s => s.wallet !== devWallet), devSub];
  await saveSubscribers(env, updated);

  return Response.json({ ok: true, platform: devSub.platform, frequency: devSub.frequency, paid: true });
}

async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  const secret = env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: "Not configured" }, { status: 503 });

  const body      = await request.text();
  const sigHeader = request.headers.get("stripe-signature") ?? "";

  const sigMatch = sigHeader.match(/t=(\d+).*v1=([a-f0-9]+)/);
  if (!sigMatch) return Response.json({ error: "Invalid signature header" }, { status: 400 });

  const [, timestamp, receivedSig] = sigMatch;

  const payload    = `${timestamp}.${body}`;
  const keyData    = new TextEncoder().encode(secret);
  const msgData    = new TextEncoder().encode(payload);
  const cryptoKey  = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sigBuffer  = await crypto.subtle.sign("HMAC", cryptoKey, msgData);
  const expectedSig = Array.from(new Uint8Array(sigBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");

  if (expectedSig !== receivedSig)
    return Response.json({ error: "Signature mismatch" }, { status: 400 });

  const tolerance = 300;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > tolerance)
    return Response.json({ error: "Timestamp too old" }, { status: 400 });

  let event: Record<string, unknown>;
  try { event = JSON.parse(body) as Record<string, unknown>; }
  catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }

  if (event.type !== "checkout.session.completed" && event.type !== "payment_intent.succeeded")
    return Response.json({ ok: true, ignored: true });

  const session  = event.data as Record<string, unknown>;
  const obj      = session?.object as Record<string, unknown> | undefined;
  const metadata = (obj?.metadata ?? (obj?.charges as any)?.data?.[0]?.metadata ?? {}) as Record<string, string>;
  const wallet   = sanitiseWallet(metadata?.keeta_wallet ?? metadata?.wallet ?? "");

  if (!wallet) return Response.json({ ok: true, no_wallet: true });

  const subscribers = await getSubscribers(env);
  const idx         = subscribers.findIndex(s => s.wallet === wallet);
  if (idx === -1) return Response.json({ ok: true, not_registered: true });
  if (subscribers[idx].paid) return Response.json({ ok: true, already_paid: true });

  subscribers[idx].paid           = true;
  subscribers[idx].socialLifetime = true;
  await saveSubscribers(env, subscribers);

  const sub     = subscribers[idx];
  const appUrl  = env.APP_URL;
  const iconUrl = `${appUrl}/icon.png`;
  try {
    if (sub.platform === "discord" && sub.discordWebhook)
      await sendDiscord(sub.discordWebhook, buildLifetimeActivatedDiscord(appUrl), iconUrl);
    if (sub.platform === "telegram" && sub.telegramBotToken && sub.telegramChatId)
      await sendTelegram(sub.telegramBotToken, sub.telegramChatId, buildLifetimeActivatedText(appUrl));
    if (sub.platform === "slack" && sub.slackWebhook)
      await sendSlack(sub.slackWebhook, buildLifetimeActivatedText(appUrl), iconUrl);
  } catch {}

  return Response.json({ ok: true, activated: wallet });
}

function validateCredentials(platform: SocialPlatform, body: Record<string, unknown>): string | null {
  if (platform === "discord") {
    if (!body.discordWebhook || typeof body.discordWebhook !== "string")
      return "discordWebhook required for Discord";
    if (!String(body.discordWebhook).startsWith("https://discord.com/api/webhooks/"))
      return "discordWebhook must start with https://discord.com/api/webhooks/";
  }
  if (platform === "telegram") {
    if (!body.telegramBotToken) return "telegramBotToken required for Telegram";
    if (!body.telegramChatId)   return "telegramChatId required for Telegram";
  }
  if (platform === "slack") {
    if (!body.slackWebhook || typeof body.slackWebhook !== "string")
      return "slackWebhook required for Slack";
    if (!String(body.slackWebhook).startsWith("https://hooks.slack.com/"))
      return "slackWebhook must start with https://hooks.slack.com/";
  }
  if (platform === "twitter") {
    for (const f of ["apiKey", "apiSecret", "accessToken", "accessSecret"])
      if (!body[f] || typeof body[f] !== "string")
        return `${f} required for X/Twitter`;
  }
  return null;
}

async function handleSupport(request: Request, env: Env, cors: Record<string,string>): Promise<Response> {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return Response.json({ error: "Invalid JSON" }, { status: 400, headers: cors }); }

  const name    = typeof body.name    === "string" ? body.name.trim().slice(0, 120)    : "";
  const email   = typeof body.email   === "string" ? body.email.trim().slice(0, 200)   : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";

  if (!name || !email || !message)
    return Response.json({ error: "name, email and message are required" }, { status: 400, headers: cors });

  if (!email.includes("@") || !email.includes("."))
    return Response.json({ error: "Invalid email address" }, { status: 400, headers: cors });

  const ip    = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const fp    = await hashFp(ip);
  const rKey  = `support:rate:${fp}`;
  const count = parseInt((await env.KV.get(rKey)) ?? "0");
  if (count >= 5)
    return Response.json({ error: "Too many requests — try again tomorrow." }, { status: 429, headers: cors });

  await env.KV.put(rKey, String(count + 1), { expirationTtl: 86400 });
  const ticketKey = `support:${Date.now()}:${fp}`;
  await env.KV.put(ticketKey, JSON.stringify({ name, email, message, ts: Date.now() }), { expirationTtl: 30 * 86400 });

  if (env.DISCORD_WEBHOOK_URL) {
    await fetch(env.DISCORD_WEBHOOK_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "Support Request",
          color: 0xC4A35A,
          fields: [
            { name: "Name",      value: name,      inline: true  },
            { name: "Email",     value: email,      inline: true  },
            { name: "Message",   value: message,    inline: false },
            { name: "Ticket ID", value: ticketKey,  inline: false },
          ],
          footer: { text: "Reply: POST /dev/support/reply  { ticket_id, reply }  X-Dev-Secret: ***" },
          timestamp: new Date().toISOString(),
        }],
      }),
    }).catch(() => {});
  }

  return Response.json({ ok: true, ticketId: ticketKey }, { headers: cors });
}

async function handleSupportStatus(searchParams: URLSearchParams, env: Env): Promise<Response> {
  const ticketId = (searchParams.get("ticket") ?? "").trim();
  const h = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Support Status · KTA Oracle</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0a;color:#e5e5e5;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.card{background:#111;border:1px solid #1a1a1a;border-radius:16px;padding:32px 28px;max-width:540px;width:100%}h1{font-size:1.15rem;font-weight:800;color:#C4A35A;margin-bottom:6px}p.sub{font-size:0.8rem;color:#555;margin-bottom:28px}.field{margin-bottom:18px}.label{font-size:0.72rem;font-weight:700;letter-spacing:0.05em;color:#555;text-transform:uppercase;margin-bottom:6px}.value{font-size:0.9rem;color:#ccc;background:#0d0d0d;border:1px solid #1a1a1a;border-radius:8px;padding:12px 14px;line-height:1.5}input{width:100%;background:#0d0d0d;border:1px solid #1a1a1a;border-radius:8px;padding:12px 14px;color:#e5e5e5;font-size:0.88rem;outline:none;font-family:inherit}input:focus{border-color:#C4A35A}button{width:100%;background:#C4A35A;color:#000;font-weight:800;border:none;border-radius:20px;padding:13px;font-size:0.9rem;cursor:pointer;margin-top:12px}button:hover{background:#d4b46a}.pending{color:#888;font-style:italic}.accent{color:#C4A35A}.footer{margin-top:24px;font-size:0.72rem;color:#333;text-align:center}</style></head><body><div class="card">`;

  if (!ticketId) {
    const page = h + `<h1>Support Status</h1><p class="sub">Enter your ticket ID to check for a reply</p><form method="get" action="/support/status"><input name="ticket" placeholder="support:1234567890:abc123" required autocomplete="off"><button type="submit">Check Status</button></form><p class="footer">KTA Oracle Agent · Powered by Keeta Network</p></div></body></html>`;
    return new Response(page, { headers: { "Content-Type": "text/html;charset=utf-8" } });
  }

  const raw      = await env.KV.get(ticketId);
  const replyRaw = await env.KV.get(`${ticketId}:reply`);

  if (!raw) {
    const page = h + `<h1>Support Status</h1><p class="sub">Ticket not found — check the ID and try again</p><form method="get" action="/support/status"><input name="ticket" value="${ticketId.replace(/"/g,'')}" required autocomplete="off"><button type="submit">Try Again</button></form><p class="footer">KTA Oracle Agent · Powered by Keeta Network</p></div></body></html>`;
    return new Response(page, { headers: { "Content-Type": "text/html;charset=utf-8" } });
  }

  let ticket: Record<string, unknown> = {};
  try { ticket = JSON.parse(raw); } catch { /* ignore */ }

  let replyData: Record<string, unknown> | null = null;
  if (replyRaw) { try { replyData = JSON.parse(replyRaw); } catch { /* ignore */ } }

  const submittedAt = ticket.ts ? new Date(ticket.ts as number).toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" }) : "—";
  const repliedAt   = replyData?.ts ? new Date(replyData.ts as number).toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" }) : null;

  const replySection = replyData
    ? `<div class="field"><div class="label">Dev Reply</div><div class="value accent">${String(replyData.reply ?? "").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div></div><div class="field"><div class="label">Replied at</div><div class="value">${repliedAt}</div></div>`
    : `<div class="field"><div class="label">Status</div><div class="value pending">Pending — no reply yet. Check back soon.</div></div>`;

  const page = h
    + `<h1>Support Status</h1><p class="sub">Ticket · <code style="font-size:0.72rem;color:#555">${ticketId.replace(/</g,"&lt;")}</code></p>`
    + `<div class="field"><div class="label">Name</div><div class="value">${String(ticket.name ?? "—").replace(/</g,"&lt;")}</div></div>`
    + `<div class="field"><div class="label">Your message</div><div class="value">${String(ticket.message ?? "—").replace(/</g,"&lt;")}</div></div>`
    + `<div class="field"><div class="label">Submitted</div><div class="value">${submittedAt}</div></div>`
    + replySection
    + `<p class="footer" style="margin-top:28px">KTA Oracle Agent · Powered by Keeta Network</p></div></body></html>`;

  return new Response(page, { headers: { "Content-Type": "text/html;charset=utf-8" } });
}

async function sendReplyEmail(apiKey: string, toEmail: string, toName: string, originalMessage: string, reply: string): Promise<void> {
  await fetch("https://api.resend.com/emails", {
    method:  "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from:    "KTA Support <onboarding@resend.dev>",
      to:      [toEmail],
      subject: "Reply to your KTA Oracle support request",
      html:    `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#0a0a0a;color:#e5e5e5;border-radius:12px"><h2 style="color:#C4A35A;margin:0 0 20px">KTA Oracle Support</h2><p style="color:#aaa;font-size:0.88rem;margin:0 0 16px">Hi ${toName},</p><p style="margin:0 0 24px;line-height:1.6">${reply}</p><hr style="border:none;border-top:1px solid #1a1a1a;margin:24px 0"><p style="color:#555;font-size:0.78rem;margin:0 0 6px"><strong style="color:#777">Your original message:</strong></p><p style="color:#666;font-size:0.82rem;font-style:italic;margin:0 0 24px">${originalMessage}</p><p style="color:#444;font-size:0.74rem;margin:0">KTA Oracle Agent &nbsp;·&nbsp; Powered by Keeta Network &nbsp;·&nbsp; Sweden, EU</p></div>`,
    }),
  }).catch(() => {});
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2)
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  return bytes;
}

async function verifyDiscordSignature(publicKey: string, signature: string, timestamp: string, body: string): Promise<boolean> {
  try {
    const key = await crypto.subtle.importKey(
      "raw", hexToBytes(publicKey),
      { name: "Ed25519" }, false, ["verify"]
    );
    return await crypto.subtle.verify(
      "Ed25519", key,
      hexToBytes(signature),
      new TextEncoder().encode(timestamp + body)
    );
  } catch { return false; }
}

async function handleDiscordInteractions(request: Request, env: Env): Promise<Response> {
  if (!env.DISCORD_PUBLIC_KEY)
    return Response.json({ error: "Discord not configured" }, { status: 503 });

  const signature = request.headers.get("x-signature-ed25519") ?? "";
  const timestamp = request.headers.get("x-signature-timestamp") ?? "";
  const rawBody   = await request.text();

  const valid = await verifyDiscordSignature(env.DISCORD_PUBLIC_KEY, signature, timestamp, rawBody);
  if (!valid)
    return new Response("Invalid signature", { status: 401 });

  let body: Record<string, unknown>;
  try { body = JSON.parse(rawBody); }
  catch { return new Response("Bad JSON", { status: 400 }); }

  if (body.type === 1)
    return Response.json({ type: 1 });

  if (body.type === 2) {
    const data    = body.data as Record<string, unknown>;
    const name    = typeof data?.name === "string" ? data.name : "";
    const options = Array.isArray(data?.options) ? data.options as Array<Record<string, unknown>> : [];

    if (name === "reply") {
      const ticketId = String(options.find(o => o.name === "ticket_id")?.value ?? "").trim();
      const reply    = String(options.find(o => o.name === "message")?.value ?? "").trim();

      if (!ticketId || !reply)
        return Response.json({ type: 4, data: { content: "ticket_id and message are required.", flags: 64 } });

      const raw = await env.KV.get(ticketId);
      if (!raw)
        return Response.json({ type: 4, data: { content: `Ticket not found: \`${ticketId}\``, flags: 64 } });

      let ticket: Record<string, unknown>;
      try { ticket = JSON.parse(raw); }
      catch { return Response.json({ type: 4, data: { content: "Corrupt ticket data.", flags: 64 } }); }

      if (env.DISCORD_WEBHOOK_URL) {
        await fetch(env.DISCORD_WEBHOOK_URL, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [{
              title:  "Support Reply — Dev",
              color:  0x00D4AA,
              fields: [
                { name: "From",             value: `${ticket.name ?? "?"} <${ticket.email ?? "?"}>`, inline: false },
                { name: "Original message", value: String(ticket.message ?? "—"),                    inline: false },
                { name: "Dev reply",        value: reply,                                             inline: false },
                { name: "Ticket",           value: ticketId,                                          inline: false },
              ],
              timestamp: new Date().toISOString(),
            }],
          }),
        }).catch(() => {});
      }

      await env.KV.put(`${ticketId}:reply`, JSON.stringify({ reply, ts: Date.now() }), { expirationTtl: 30 * 86400 });

      if (env.RESEND_API_KEY && ticket.email)
        await sendReplyEmail(env.RESEND_API_KEY, String(ticket.email), String(ticket.name ?? "there"), String(ticket.message ?? ""), reply);

      return Response.json({ type: 4, data: { content: `Reply sent for ticket \`${ticketId}\` · check: /support/status?ticket=${encodeURIComponent(ticketId)}`, flags: 64 } });
    }

    return Response.json({ type: 4, data: { content: "Unknown command.", flags: 64 } });
  }

  return Response.json({ type: 1 });
}

async function handleDevSupportReply(request: Request, env: Env): Promise<Response> {
  const secret = request.headers.get("X-Dev-Secret");
  if (!secret || secret !== env.DEV_SECRET)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }

  const ticketId = typeof body.ticket_id === "string" ? body.ticket_id.trim() : "";
  const reply    = typeof body.reply     === "string" ? body.reply.trim().slice(0, 2000) : "";

  if (!ticketId || !reply)
    return Response.json({ error: "ticket_id and reply are required" }, { status: 400 });

  const raw = await env.KV.get(ticketId);
  if (!raw)
    return Response.json({ error: "Ticket not found" }, { status: 404 });

  let ticket: Record<string, unknown>;
  try { ticket = JSON.parse(raw); }
  catch { return Response.json({ error: "Corrupt ticket data" }, { status: 500 }); }

  if (!env.DISCORD_WEBHOOK_URL)
    return Response.json({ error: "Discord webhook not configured" }, { status: 503 });

  await fetch(env.DISCORD_WEBHOOK_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "Support Reply — Dev",
        color: 0x00D4AA,
        fields: [
          { name: "Ticket",           value: ticketId,                                        inline: false },
          { name: "From",             value: `${ticket.name ?? "?"} <${ticket.email ?? "?"}>`, inline: false },
          { name: "Original message", value: String(ticket.message ?? "—"),                    inline: false },
          { name: "Dev reply",        value: reply,                                             inline: false },
        ],
        timestamp: new Date().toISOString(),
      }],
    }),
  });

  await env.KV.put(`${ticketId}:reply`, JSON.stringify({ reply, ts: Date.now() }), { expirationTtl: 30 * 86400 });

  if (env.RESEND_API_KEY && ticket.email)
    await sendReplyEmail(env.RESEND_API_KEY, String(ticket.email), String(ticket.name ?? "there"), String(ticket.message ?? ""), reply);

  return Response.json({ ok: true, ticketId });
}
