import type { Env, SocialSubscriber } from "./types.js";

const INDEX_KEY  = "social:sub:index";
const LEGACY_KEY = "social:subscribers";
export const subKey = (wallet: string) => `social:sub:${wallet.toLowerCase()}`;

export async function getSubscribers(env: Env): Promise<SocialSubscriber[]> {
  const rawIndex = await env.KV.get<string[]>(INDEX_KEY, "json");

  if (rawIndex !== null) {
    if (rawIndex.length === 0) return [];
    const entries = await Promise.all(
      rawIndex.map(async w => {
        return (await env.KV.get<SocialSubscriber>(subKey(w), "json"))
          ?? (await env.KV.get<SocialSubscriber>(`sub:${w.toLowerCase()}`, "json"));
      })
    );
    return entries.filter((e): e is SocialSubscriber => e !== null);
  }

  const legacy = await env.KV.get<SocialSubscriber[]>(LEGACY_KEY, "json");
  if (!legacy || legacy.length === 0) {
    await env.KV.put(INDEX_KEY, JSON.stringify([]));
    return [];
  }
  await Promise.all([
    ...legacy.map(sub => env.KV.put(subKey(sub.wallet), JSON.stringify(sub))),
    env.KV.put(INDEX_KEY, JSON.stringify(legacy.map(s => s.wallet.toLowerCase()))),
  ]);
  return legacy;
}

export async function saveSubscribers(env: Env, subs: SocialSubscriber[]): Promise<void> {
  const oldIndex  = (await env.KV.get<string[]>(INDEX_KEY, "json")) ?? [];
  const newWallets = new Set(subs.map(s => s.wallet.toLowerCase()));
  const toDelete   = oldIndex.filter(w => !newWallets.has(w.toLowerCase()));

  await Promise.all([
    ...subs.map(sub => env.KV.put(subKey(sub.wallet), JSON.stringify(sub))),
    ...toDelete.map(w => env.KV.delete(subKey(w))),
    env.KV.put(INDEX_KEY, JSON.stringify(subs.map(s => s.wallet.toLowerCase()))),
  ]);
}

export async function getSubscriber(env: Env, wallet: string): Promise<SocialSubscriber | null> {
  const norm = wallet.toLowerCase();
  const direct = await env.KV.get<SocialSubscriber>(subKey(norm), "json")
    ?? await env.KV.get<SocialSubscriber>(`sub:${norm}`, "json");
  if (direct) return direct;
  const all = await getSubscribers(env);
  const found = all.find(s => s.wallet.toLowerCase() === norm) ?? null;
  if (found) await env.KV.put(subKey(norm), JSON.stringify(found)).catch(() => {});
  return found;
}

export async function saveSubscriber(env: Env, sub: SocialSubscriber): Promise<void> {
  const norm = sub.wallet.toLowerCase();
  await env.KV.put(subKey(norm), JSON.stringify(sub));
  const index = (await env.KV.get<string[]>(INDEX_KEY, "json")) ?? [];
  if (!index.some(w => w.toLowerCase() === norm)) {
    index.push(norm);
    await env.KV.put(INDEX_KEY, JSON.stringify(index));
  }
}

export function trialLimit(env: Env): number {
  return parseInt(env.TRIAL_LIMIT ?? "100");
}

export function lifetimeKta(env: Env): number {
  return parseInt(env.LIFETIME_KTA ?? "50");
}
