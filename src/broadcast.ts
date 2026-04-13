import type { Env, SocialSubscriber } from "./types.js";

const AGENT_NAME = "KTA Oracle Agent";

async function twitterOAuthHeader(
  method: string, url: string,
  apiKey: string, apiSecret: string, accessToken: string, accessSecret: string,
): Promise<string> {
  const nonce     = Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, "0")).join("");
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const params: Record<string, string> = {
    oauth_consumer_key:     apiKey,
    oauth_nonce:            nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp:        timestamp,
    oauth_token:            accessToken,
    oauth_version:          "1.0",
  };

  const sorted = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

  const base       = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(sorted)}`;
  const signingKey = `${encodeURIComponent(apiSecret)}&${encodeURIComponent(accessSecret)}`;

  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(signingKey),
    { name: "HMAC", hash: "SHA-1" }, false, ["sign"],
  );
  const sig       = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(base));
  const signature = btoa(String.fromCharCode(...new Uint8Array(sig)));

  params["oauth_signature"] = signature;

  return "OAuth " + Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
    .join(", ");
}

export async function sendDiscord(webhook: string, payload: object, iconUrl?: string): Promise<void> {
  const body = iconUrl
    ? { username: AGENT_NAME, avatar_url: iconUrl, ...(payload as Record<string, unknown>) }
    : payload;
  await fetch(webhook, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
}

export async function sendTelegram(botToken: string, chatId: string, text: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown", disable_web_page_preview: true }),
  });
}

export async function sendSlack(webhook: string, text: string, iconUrl?: string): Promise<void> {
  const body: Record<string, unknown> = { text, username: AGENT_NAME };
  if (iconUrl) body.icon_url = iconUrl;
  await fetch(webhook, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
}

export async function postTweet(
  sub: SocialSubscriber, text: string | null,
): Promise<void> {
  if (!sub.twitterCreds || !text) return;
  const { apiKey, apiSecret, accessToken, accessSecret } = sub.twitterCreds;
  const url    = "https://api.twitter.com/2/tweets";
  const header = await twitterOAuthHeader("POST", url, apiKey, apiSecret, accessToken, accessSecret);
  await fetch(url, {
    method:  "POST",
    headers: { "Authorization": header, "Content-Type": "application/json" },
    body:    JSON.stringify({ text }),
  });
}

export async function sendDevTwitter(env: Env, text: string | null): Promise<void> {
  if (!text || !env.TWITTER_API_KEY || !env.TWITTER_API_SECRET || !env.TWITTER_ACCESS_TOKEN || !env.TWITTER_ACCESS_SECRET) return;
  const url    = "https://api.twitter.com/2/tweets";
  const header = await twitterOAuthHeader("POST", url, env.TWITTER_API_KEY, env.TWITTER_API_SECRET, env.TWITTER_ACCESS_TOKEN, env.TWITTER_ACCESS_SECRET);
  await fetch(url, {
    method:  "POST",
    headers: { "Authorization": header, "Content-Type": "application/json" },
    body:    JSON.stringify({ text }),
  });
}
