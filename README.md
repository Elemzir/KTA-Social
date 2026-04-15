# KTA Social — Alert Broadcaster & User Portal

> **Discord · Telegram · Slack · X/Twitter · AI insights on every alert · Lifetime alerts from 50 KTA**

The subscriber-facing layer of KTA Oracle. Receives live price and whale events from KTA Oracle every 5 minutes, generates AI-powered market insights, and delivers alerts to 4 social platforms. Manages subscription state, checkout, onboarding, and proxies the full 19-tool Keeta SDK to registered wallets.

**One Cloudflare Worker. One URL. No infrastructure to manage.**

→ **[kta-oracle.top](https://kta-oracle.top)** · [Tools catalog](https://kta-oracle.top/tools) · [Machine-readable spec](https://kta.netrate.workers.dev/llms.txt) · [Companion: KTA-Oracle](https://github.com/Elemzir/KTA-Oracle)

---

## At a glance

| | |
|---|---|
| Alert platforms | Discord · Telegram · Slack · X/Twitter |
| AI insights | On every alert — payment-network focused, never generic |
| Lifetime alerts | 50 KTA total — alerts never expire even if Oracle lapses |
| Tools proxied | All 19 Keeta SDK tools via Cloudflare service binding |
| Edge latency | **<5ms** reads — no public HTTP hop to Oracle |
| Activation | On-chain scan in ~1–2s — wallet address is identity |
| Tiers | 5 — stacking from 0.1 KTA to 600 KTA |
| Source | 100% open source — MIT licensed |

---

## Pages

| Path | Description |
|------|-------------|
| `/onboard` | Register wallet, live price chart, whale feed, status checker |
| `/checkout` | Tier plans, payment methods, activation, status lookup |
| `/donate` | Support page with tier breakdown |
| `/oracle` | Oracle landing page proxy (served from KTA Oracle worker) |
| `/tools` | All 19 SDK tools with tier requirements and AI connector |
| `/guide` | Full integration guide — individuals, businesses, AI agents |
| `/legal` | Legal declaration and terms |
| `/privacy` | Privacy policy |

---

## API Endpoints

### Public

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/price` | Live KTA/USD price — proxied from Oracle |
| `GET` | `/rate?currency=` | KTA rate in 160+ fiat currencies with real-time FX conversion |
| `GET` | `/whale/alerts?wallet=` | Recent whale movements — proxied from Oracle (Starter+ required) |
| `GET` | `/llms.txt` | Machine-readable full spec for AI agents |
| `GET` | `/status?wallet=` | Subscription tier, expiry, social lifetime |
| `GET` | `/stream?wallet=` | SSE stream — live price push every 15s |
| `POST` | `/register` | Register wallet for social alerts |
| `POST` | `/activate-oracle` | Proxy activation request to Oracle |
| `POST` | `/support` | Support message (rate-limited 5/day) |
| `GET` | `/payment-links` | Configured Coinbase Commerce URL |
| `GET` | `/health` | Service health |

### Internal (`X-Internal-Secret` required)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/oracle-activate` | Oracle-triggered lifetime activation |
| `POST` | `/upgrade` | Activate Social lifetime after payment verification |
| `POST` | `/ingest` | Receive price/whale events from Oracle cron |
| `POST` | `/dev/register` | Dev-only subscriber registration |

---

## Alert Platforms

| Platform | Format |
|----------|--------|
| Discord | Rich embed — AI insight, price direction, whale alert, live dot |
| Telegram | Formatted text with inline links |
| Slack | Block message with icon |
| X / Twitter | Tweet with cashtag, AI quote, price direction |

---

## Subscription Tiers

Payments accumulate on-chain from the same wallet. Send KTA to the oracle wallet, then call `POST /activate-oracle`.

| KTA sent | Tier | Tools | Oracle calls | Social alerts | Whale alerts | Duration |
|----------|------|-------|--------------|---------------|--------------|----------|
| 0.1 | Free | 5 | 20 / day | 100 trial | 1 ever | 5 days |
| 10 | Starter | 8 | 60 total | Trial only | 3 / month | 30 days |
| 50 | Social | 8 | 150 / month | **Lifetime** | Unlimited | 30 days |
| 300 | Pro | 13 | 300 / month | **Lifetime** | Unlimited | 30 days |
| 600 | Business | 19 | Unlimited | **Lifetime** | Unlimited | 30 days |

### Tier Progression

Each tier has a natural ceiling. Users typically upgrade when they hit one of these:

- **Free → Starter**: Free tier lasts only 5 days. Whale feed on `/onboard` is blurred and only 1 whale alert ever fires. 10 KTA total extends access to 30 days, unlocks the live whale feed, adds 3 whale alerts/month, and triples the API quota. Sends accumulate — already sent 0.1? Only 9.9 more needed.
- **Starter → Social**: Starter alerts expire after 30 days and still drain the 100-alert trial cap. Social (50 KTA total) makes social platform alerts permanent — Discord, Telegram, Slack, and X keep firing forever, even after Oracle access expires. One send, lifetime delivery.
- **Social → Pro**: Compliance tools, wallet scoring, transaction history, and on-chain analytics are Pro-only. Built for operators, builders, and teams who need more than price alerts.
- **Pro → Business**: All 19 SDK tools, unlimited API calls, priority processing. Designed for institutions and automated systems integrating KTA at scale.

**Accumulation is the key mechanic**: every KTA send from the same wallet stacks toward the highest tier. A user already on Free is already on the ladder — each subsequent send upgrades them without starting over.

---

## Currency Support

160+ fiat currencies supported on the `/rate` endpoint — all major ISO 4217 codes covering Keeta Network's 200+ country reach. FX rates fetched from a live exchange rate feed and cached at the edge for 1 hour.

The registration form currency selector includes 95 currencies across all regions:

- **Americas** — USD, CAD, BRL, MXN, ARS, CLP, COP, PEN, and more
- **Europe** — EUR, GBP, CHF, SEK, NOK, DKK, PLN, CZK, HUF, TRY, and more
- **Middle East / Gulf** — AED, SAR, QAR, KWD, BHD, OMR, JOD, ILS
- **Africa** — ZAR, NGN, KES, GHS, EGP, MAD, TZS, XOF, XAF, and more
- **Asia Pacific** — JPY, CNY, HKD, SGD, KRW, INR, MYR, THB, IDR, VND, and more
- **CIS / Central Asia** — UAH, GEL, KZT, AZN, AMD, UZS
- **Oceania** — AUD, NZD, FJD, PGK

Any ISO 4217 code can be passed directly to `/rate?currency=` even if not in the UI dropdown.

---

## Payment Methods

To buy KTA before activating a tier:

| Exchange | Method |
|----------|--------|
| **Keeta Wallet** | Visa Direct — 0.4s native settlement |
| **Coinbase** | Card · Apple Pay · Google Pay |
| **Kraken** | Card · Bank from $10 |
| **Phantom** | In-wallet swap · No KYC |

Once you hold KTA, send it to the oracle wallet and call `POST /activate-oracle` to activate your tier.

---

## Deploy

```bash
npm install
npx wrangler deploy
```

**Required secrets:**

```bash
npx wrangler secret put INTERNAL_SECRET
npx wrangler secret put AI_KEY
npx wrangler secret put AI_ENDPOINT
npx wrangler secret put AI_MODEL
npx wrangler secret put DEV_SECRET
npx wrangler secret put DEV_WALLET
npx wrangler secret put DISCORD_WEBHOOK_URL
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler secret put SLACK_WEBHOOK_URL
npx wrangler secret put TWITTER_API_KEY
npx wrangler secret put TWITTER_API_SECRET
npx wrangler secret put TWITTER_ACCESS_TOKEN
npx wrangler secret put TWITTER_ACCESS_SECRET
```

`KTA_ORACLE_URL` is only required if not using the Cloudflare service binding (`ORACLE_SERVICE`). When both workers are deployed to the same Cloudflare account, the service binding handles all Oracle communication without an HTTP URL.

**`wrangler.toml` vars** (non-secret, update before deploy):

```toml
APP_URL                = "https://your-worker.workers.dev"
ORACLE_WALLET          = "keeta_..."
TRIAL_LIMIT            = "100"
LIFETIME_KTA           = "50"
COINBASE_COMMERCE_LINK = "https://commerce.coinbase.com/checkout/..."
```

---

## Native SDK

KTA Social communicates with KTA Oracle via a **Cloudflare service binding** — a direct in-process call with zero network overhead. No DNS, no TLS, no TCP.

All subscription and activation logic runs through the Keeta SDK:

| Operation | Native method |
|-----------|---------------|
| Tier activation | Proxies to Oracle → `scanChainTotal()` reads Keeta chain history directly |
| Social lifetime sync | Oracle calls `/oracle-activate` after on-chain verification |
| Wallet identity | Keeta wallet address is the account — no email, no password, no KYC |
| Price data | Served from Oracle KV — sourced from Keeta Anchor FX + DEX |
| Whale alerts | Read from Oracle KV — detected natively from Keeta on-chain history |

---

## Performance

| Operation | Latency | Notes |
|-----------|---------|-------|
| API reads (`/price`, `/rate`, `/status`) | <5ms | Proxied via Cloudflare service binding — no public HTTP hop to Oracle |
| SSE stream (`/stream?wallet=`) | 15s push interval | Client auto-reconnects; consistent with CF Workers' stateless model |
| Tier activation (`/activate-oracle`) | ~1–2s | Service binding → Oracle chain scan → KV write → Social sync |
| KTA settlement | **0.4s** | Keeta Network native finality |
| Social alert delivery | next cron cycle | Alerts fire within 5 min of price move — parallel broadcast to all platforms |

Social calls Oracle via a **Cloudflare service binding** — a direct in-process call with zero network overhead. No DNS, no TLS, no TCP — faster than any inter-service HTTP call.

---

## Mobile

All pages are fully mobile-responsive with hamburger navigation, adaptive layouts, and touch-optimised controls:

| Page | Mobile features |
|------|-----------------|
| `/onboard` | Hamburger nav, stacked tier table, touch-friendly forms |
| `/checkout` | Stacked tier cards, collapsible payment panel |
| `/tools` | 2-column → 1-column tool grid, mobile-first filters |
| `/guide` | Tab navigation, readable code blocks, full-width sections |
| `/oracle` | Responsive hero, stacked endpoint cards |

Breakpoints: 860px (tablet), 600px (mobile), 480px (small mobile).

---

## Stack

- Cloudflare Workers — TypeScript
- Cloudflare KV — subscriber state and price history
- Cloudflare Workers Assets — `public/` static files
- Cloudflare service binding — direct Oracle calls without HTTP

---

## Why KTA-Oracle?

| Feature | Most MCP servers | KTA-Oracle |
|---------|-----------------|------------|
| Tools available | 1–5 | **19** |
| AI-powered reasoning on every response | ✗ | ✓ |
| Tiered subscriptions + on-chain payments | ✗ | ✓ |
| Agent-specific onboarding (autonomous) | ✗ | ✓ |
| AML + compliance tools | ✗ | ✓ |
| Production SDK code snippets | ✗ | ✓ |
| Rate limiting + abuse protection | ✗ | ✓ |
| Listed on 5+ marketplaces | ✗ | ✓ |

## Payment cost comparison

| | SWIFT wire — $50,000 | Keeta Network — $50,000 |
|-|----------------------|------------------------|
| Fee | ~$1,050 | **$75** |
| Speed | 3–5 business days | **0.4 seconds** |

14× cheaper · 1,080,000× faster · same global finality

---

## AI Integration

The `/tools` page exposes the Connect AI panel with SSE and REST connection strings. The `/guide` page has step-by-step setup for Claude API tool use, ChatGPT Custom GPT Actions, OpenAI function calling, and LangChain/CrewAI.

### Agent quick-start

```
GET  https://kta.netrate.workers.dev/llms.txt        # full machine-readable spec
GET  https://kta.netrate.workers.dev/status?wallet=  # current tier + tools._unlock hint
GET  https://kta.netrate.workers.dev/stream?wallet=  # SSE live price feed
```

Every `/status` response now includes a `tools` object:

```json
{
  "tools": {
    "available": 5,
    "locked": 14,
    "_unlock": {
      "name": "starter",
      "kta_total": 10,
      "kta_more": 9.9,
      "tools_unlocked": ["/whale/alerts", "AI insights (embedded)", "portfolio calc (/rate)"],
      "checkout": "https://kta-oracle.top/checkout"
    }
  }
}
```

Agents can call `/status` at any time to discover their current tool count and exactly what KTA is needed to unlock the next tier. This makes the upgrade path fully autonomous — no human needed to read the docs.

---

## Alert detection tiers

The Oracle classifies every price move and sends a `changeLevel` to Social. Large moves bypass the subscriber's chosen frequency timer automatically.

| Price move | Level | Max alert cooldown |
|---|---|---|
| < 5% | — | No alert |
| 5–9% | `minor` | Subscriber's chosen frequency |
| 10–14% | `normal` | 4 hours |
| 15–19% | `notable` | 1 hour |
| 20–24% | `major` | 30 minutes |
| 25%+ | `extreme` | 5 minutes |

Subscribers on a daily digest still receive alerts within 30 minutes on a 20%+ move.

---

## Troubleshoot

**Minimum requirement:** Every feature — alerts, API calls, status checks, and tools — requires at least **0.1 KTA sent to the oracle wallet and an activated wallet**. Registration without activation does nothing.

| Symptom | Cause | Fix |
|---------|-------|-----|
| Not receiving alerts after registering | Wallet not activated | Go to `/onboard → Activate`, enter wallet, click Activate. Must have sent ≥0.1 KTA first |
| Trial alerts exhausted (100 limit) | Free/Starter cap reached | Send 50+ KTA and activate for lifetime social alerts |
| Alerts stopped after working | Oracle 30-day window expired | Check `GET /status?wallet=` — `socialLifetime: true` means alerts continue. Renew Oracle by sending more KTA |
| Discord webhook not delivering | Webhook deleted in Discord | Recreate: right-click channel → Integrations → Webhooks → New Webhook. Re-register at `/onboard` |
| Telegram bot silent | Bot not started or wrong chat ID | Send `/start` to the bot. Get chat ID via `api.telegram.org/bot{TOKEN}/getUpdates` |
| Slack stopped | App removed from workspace | Recreate incoming webhook at `api.slack.com/apps`. Re-register at `/onboard` |
| X / Twitter stopped posting | API tokens expired or monthly quota hit | Regenerate tokens at `developer.twitter.com`. Use ±10%/±15% change trigger to conserve free tier quota |
| Wrong currency in alerts | Stale FX rate or wrong registration | Re-register with correct currency at `/onboard`. FX updates every cron cycle (~5 min) |
| `unregistered` after sending KTA | Activation not triggered | Sending KTA is step 1, activation is step 2. Must call `POST /activate-oracle` or use the Activate button at `/onboard` |
| Status shows old tier | KV not updated | Activation re-scans on-chain history. If tier is wrong, send the difference and re-activate |

**Check wallet status instantly:**
```
GET /status?wallet=keeta_your_wallet
```
Returns: `tier`, `paid`, `socialLifetime`, `alertCount`, `expiresAt`.

**Support:** Use the Support Agent chat at `/onboard` (bottom-right) or contact [@elemzir on X](https://x.com/elemzir).

---

## License

[MIT](./LICENSE) — the code is open source. Service access requires a KTA subscription.

## Security

See [SECURITY.md](./SECURITY.md).

## Contact

[@elemzir](https://x.com/elemzir)
