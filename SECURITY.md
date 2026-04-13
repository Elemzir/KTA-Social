# Security Policy

## Scope

This policy covers the `kta` Cloudflare Worker (KTA Social) and all code in this repository.

---

## Reporting a Vulnerability

Do not open a public GitHub issue for security vulnerabilities.

Contact privately:
- **X:** [@elemzir](https://x.com/elemzir) — mention "KTA-Social Security"
- **Response time:** within 48 hours
- **Fix target:** critical within 7 days, high severity within 14 days

Include a clear description, reproduction steps, potential impact, and your preferred follow-up contact. Responsible disclosure is appreciated — allow time to fix before any public disclosure.

---

## Architecture

### Secrets

All secrets (webhook URLs, API keys, `INTERNAL_SECRET`) are stored as encrypted Cloudflare Worker secrets set via `wrangler secret put`. They are never present in source code, `wrangler.toml`, logs, or any endpoint response.

### Internal Endpoints

`/oracle-activate`, `/upgrade`, and `/ingest` are protected by `X-Internal-Secret`. Requests without a valid secret are rejected before any processing.

### Rate Limiting

The `/support` endpoint is rate-limited to 5 submissions per IP per day via Cloudflare KV. The `/agent` chat endpoint is rate-limited to 10 messages per hour per IP.

### Input Validation

All wallet addresses are validated against the `keeta_[a-z0-9]+` pattern. Social platform credentials provided by subscribers are stored in KV and never logged or returned in responses.

### Transport

All traffic is served over HTTPS via Cloudflare's edge.

### Data Privacy

No personal data is collected beyond what is necessary for alert delivery. Wallet addresses are pseudonymous blockchain identifiers. No cookies, tracking pixels, or third-party analytics are used. Subscriber data is stored in Cloudflare KV and is not shared with any third party.

---

## Supported Versions

Only the current deployed version is actively maintained.
