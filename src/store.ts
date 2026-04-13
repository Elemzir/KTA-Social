import type { Env, SocialSubscriber } from "./types.js";

export async function getSubscribers(env: Env): Promise<SocialSubscriber[]> {
  return (await env.KV.get<SocialSubscriber[]>("social:subscribers", "json")) ?? [];
}

export async function saveSubscribers(env: Env, subs: SocialSubscriber[]): Promise<void> {
  await env.KV.put("social:subscribers", JSON.stringify(subs));
}

export function trialLimit(env: Env): number {
  return parseInt(env.TRIAL_LIMIT ?? "100");
}

export function lifetimeKta(env: Env): number {
  return parseInt(env.LIFETIME_KTA ?? "50");
}
