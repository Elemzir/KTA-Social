import type { Env, SocialSubscriber } from "./types.js";

const INDEX_KEY  = "social:sub:index";
const LEGACY_KEY = "social:subscribers";
const subKey     = (wallet: string) => `social:sub:${wallet}`;

export async function getSubscribers(env: Env): Promise<SocialSubscriber[]> {
  const rawIndex = await env.KV.get<string[]>(INDEX_KEY, "json");

  if (rawIndex !== null) {
    if (rawIndex.length === 0) return [];
    const entries = await Promise.all(
      rawIndex.map(w => env.KV.get<SocialSubscriber>(subKey(w), "json"))
    );
    return entries.filter((e): e is SocialSubscriber => e !== null);
  }

  // First run — migrate legacy blob if it exists
  const legacy = await env.KV.get<SocialSubscriber[]>(LEGACY_KEY, "json");
  if (!legacy || legacy.length === 0) {
    await env.KV.put(INDEX_KEY, JSON.stringify([]));
    return [];
  }
  await Promise.all([
    ...legacy.map(sub => env.KV.put(subKey(sub.wallet), JSON.stringify(sub))),
    env.KV.put(INDEX_KEY, JSON.stringify(legacy.map(s => s.wallet))),
  ]);
  return legacy;
}

export async function saveSubscribers(env: Env, subs: SocialSubscriber[]): Promise<void> {
  const oldIndex  = (await env.KV.get<string[]>(INDEX_KEY, "json")) ?? [];
  const newWallets = new Set(subs.map(s => s.wallet));
  const toDelete   = oldIndex.filter(w => !newWallets.has(w));

  await Promise.all([
    ...subs.map(sub => env.KV.put(subKey(sub.wallet), JSON.stringify(sub))),
    ...toDelete.map(w => env.KV.delete(subKey(w))),
    env.KV.put(INDEX_KEY, JSON.stringify(subs.map(s => s.wallet))),
  ]);
}

export function trialLimit(env: Env): number {
  return parseInt(env.TRIAL_LIMIT ?? "100");
}

export function lifetimeKta(env: Env): number {
  return parseInt(env.LIFETIME_KTA ?? "50");
}
