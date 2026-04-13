# KTA Social — Troubleshoot

**Minimum requirement:** Every feature — alerts, API calls, status checks, and tools — requires at least **0.1 KTA sent to the oracle wallet and an activated wallet**. Registration without activation does nothing.

---

## Quick status check

```
GET /status?wallet=keeta_your_wallet
```
Returns: `tier`, `paid`, `socialLifetime`, `alertCount`, `expiresAt`.

If `tier` is `unregistered` → you need to send KTA and activate.  
If `paid: false` and `alertCount >= 100` → trial exhausted, upgrade at `/checkout`.

---

## Activation steps

1. Send KTA to the oracle wallet (shown at `/onboard` and `/checkout`)
2. Go to `/onboard` → Activate section, enter your wallet, click **Activate**
3. Or call: `POST /activate-oracle` with `{ "wallet": "keeta_your_wallet" }`
4. Check result: `GET /status?wallet=keeta_your_wallet`

---

## Common issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Not receiving alerts after registering | Wallet not activated | Go to `/onboard → Activate`. Must have sent ≥0.1 KTA first |
| Trial alerts exhausted (100 limit) | Free/Starter cap reached | Send 50 KTA total and re-activate — upgrades to Social with lifetime alerts |
| Free trial or Oracle window expired | 5-day Free / 30-day paid window elapsed | `socialLifetime: true` means social alerts continue forever. Renew Oracle by sending more KTA and re-activating |
| Discord webhook not delivering | Webhook deleted in Discord | Recreate: right-click channel → Integrations → Webhooks → New Webhook. Re-register at `/onboard` |
| Telegram bot silent | Bot not started or wrong chat ID | Send `/start` to the bot. Get chat ID via `api.telegram.org/bot{TOKEN}/getUpdates` |
| Slack stopped | App removed from workspace | Recreate incoming webhook at `api.slack.com/apps`. Re-register at `/onboard` |
| X / Twitter stopped posting | API tokens expired or monthly quota hit | Regenerate tokens at `developer.twitter.com`. Use ±10%/±15% change trigger to conserve free tier quota |
| Wrong currency in alerts | Stale FX rate or wrong registration | Re-register with correct currency at `/onboard`. FX updates every cron cycle (~5 min) |
| `unregistered` after sending KTA | Activation not triggered | Sending KTA is step 1, activation is step 2. Use Activate button at `/onboard` |
| Status shows old/wrong tier | KV not updated | Activation re-scans on-chain history. Send remaining KTA and re-activate |

---

## Platform setup quick reference

**Discord:** Channel Settings → Integrations → Webhooks → New Webhook → copy URL → register at `/onboard`

**Telegram:** Create bot via [@BotFather](https://t.me/botfather) → get token → send `/start` to bot → get chat ID from `getUpdates` → register at `/onboard`

**Slack:** [api.slack.com/apps](https://api.slack.com/apps) → Create App → Incoming Webhooks → Activate → Add to Workspace → copy URL → register at `/onboard`

**X / Twitter:** [developer.twitter.com](https://developer.twitter.com) → Project → App → Keys and Tokens → generate all 4 keys → register at `/onboard`

---

## Alert detection tiers

The Oracle classifies every price move. Large moves bypass your chosen frequency timer automatically.

| Price move | Level | Max cooldown override |
|---|---|---|
| < 5% | — | No alert emitted |
| 5–9% | minor | Your chosen frequency |
| 10–14% | normal | 4 hours |
| 15–19% | notable | 1 hour |
| 20–24% | major | 30 minutes |
| 25%+ | extreme | 5 minutes |

---

## Tier reference

| KTA sent | Tier     | Social alerts     | Duration |
|----------|----------|-------------------|----------|
| 0.1      | Free     | Trial (100 total) | 5 days   |
| 10       | Starter  | Trial (100 cap)   | 30 days  |
| 50       | Social   | **Lifetime**      | 30 days  |
| 300      | Pro      | **Lifetime**      | 30 days  |
| 600      | Business | **Lifetime**      | 30 days  |

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

---

## Payment cost comparison

| | SWIFT wire — $50,000 | Keeta Network — $50,000 |
|-|----------------------|------------------------|
| Fee | ~$1,050 | **$75** |
| Speed | 3–5 business days | **0.4 seconds** |

14× cheaper · 1,080,000× faster · same global finality

---

## Dev support reply

Respond to a support ticket via Discord (dev only):

```
POST /dev/support/reply
Header: X-Dev-Secret: your_dev_secret
Body: {
  "ticket_id": "support:1234567890:abc123",
  "reply": "Your reply text here"
}
```

Ticket IDs appear in the Discord embed footer when a support message is received. Reply is posted to `DISCORD_WEBHOOK_URL` only — not visible to any user tier.

---

## Contact

[@elemzir on X](https://x.com/elemzir) · [/onboard Support Agent](https://kta.netrate.workers.dev/onboard)
