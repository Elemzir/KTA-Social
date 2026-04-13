const TRIAL_LIMIT     = 100;
const LIFETIME_KTA    = 50;

export function formatMarketCap(mc: number): string {
  if (mc >= 1_000_000_000) return `$${(mc / 1_000_000_000).toFixed(2)}B`;
  if (mc >= 1_000_000)     return `$${(mc / 1_000_000).toFixed(1)}M`;
  return `$${mc.toFixed(0)}`;
}

export function buildMarketNote(
  priceChange: number, change24h: number, marketCap: number,
  change7d: number | null, volume24h: number | null,
): string {
  const up    = priceChange > 0;
  const big   = Math.abs(priceChange) >= 0.08;
  const crash = !up && Math.abs(priceChange) >= 0.20;
  const pct   = (Math.abs(priceChange) * 100).toFixed(1);
  const d24   = `${change24h >= 0 ? "+" : ""}${change24h.toFixed(1)}%`;
  const mc    = marketCap > 0 ? ` Cap: ${formatMarketCap(marketCap)}.` : "";

  const weekNote = change7d !== null
    ? change7d >  3 ? ` 7-day trend bullish at +${change7d.toFixed(1)}% — this move aligns with the medium-term.`
    : change7d >  0 ? ` 7-day trend is slightly positive (+${change7d.toFixed(1)}%) — steady accumulation pattern.`
    : change7d > -3 ? ` 7-day trend flat (${change7d.toFixed(1)}%) — range-bound overall.`
    :                 ` 7-day trend negative (${change7d.toFixed(1)}%) — part of a wider correction.`
    : "";

  const volNote = (volume24h !== null && marketCap > 0)
    ? (() => {
        const ratio = volume24h / marketCap;
        return ratio > 0.15 ? " High volume — institutional activity likely."
             : ratio > 0.05 ? " Volume elevated — conviction behind this move."
             :                " Volume is low — move may not sustain without follow-through.";
      })()
    : "";

  if (crash)
    return `$KTA dropped ${pct}% — significant move. 24h: ${d24}.${weekNote}${volNote}${mc} Favorable entry window for buyers. Payment conversions currently below average cost.`;
  if (!up && big)
    return `$KTA pulled back ${pct}%. 24h: ${d24}.${weekNote}${volNote}${mc} Conversion costs are below average — solid window for payment execution.`;
  if (up && big)
    return `$KTA surged ${pct}% — strong momentum. 24h: ${d24}.${weekNote}${volNote}${mc} Conversion costs elevated. Good time to receive KTA; delay non-urgent outbound payments if timing allows.`;
  if (up)
    return `$KTA up ${pct}%. 24h: ${d24}.${weekNote}${volNote}${mc} Rate within normal range — predictable for treasury and scheduled payments.`;
  return `$KTA down ${pct}%. 24h: ${d24}.${weekNote}${volNote}${mc} Market stable. Payments and conversions can proceed as normal.`;
}

export function buildPriceAlert(
  price: number, priceChange: number, change24h: number, marketCap: number,
  alertCount: number, paid: boolean, appUrl: string,
  currency = "USD", convertedPrice?: number,
  change7d: number | null = null, volume24h: number | null = null,
  aiQuote: string | null = null,
): string {
  const dir    = priceChange > 0 ? "📈" : "📉";
  const sign   = priceChange > 0 ? "+" : "";
  const pct    = (priceChange * 100).toFixed(1);
  const c24    = `${change24h >= 0 ? "+" : ""}${change24h.toFixed(2)}%`;
  const mc     = marketCap > 0 ? `\nCap      ${formatMarketCap(marketCap)}` : "";
  const disp   = (convertedPrice ?? price).toFixed(4);
  const note   = buildMarketNote(priceChange, change24h, marketCap, change7d, volume24h);
  const c7dLine = change7d !== null ? `\n7d       ${change7d >= 0 ? "+" : ""}${change7d.toFixed(1)}%` : "";
  const link   = `${appUrl}/onboard`;
  const footer = paid ? `KTA Oracle Agent` : `KTA Oracle Agent · Trial ${alertCount + 1}/${TRIAL_LIMIT}`;
  const insight = aiQuote ? `\n💡 ${aiQuote}` : "";
  const sep     = `────────────────────`;

  return [
    `${dir} KTA Price Alert`, ``,
    `Price    ${disp} ${currency}`,
    `Move     ${sign}${pct}%`, `24h      ${c24}${c7dLine}${mc}`,
    sep,
    note, insight,
    sep,
    `🔗 ${link}`, ``, footer,
  ].join("\n");
}

export function buildWhaleAlert(
  price: number, amountKta: number, classification: string,
  alertCount: number, paid: boolean, appUrl: string,
  currency = "USD", convertedPrice?: number,
  change7d: number | null = null,
): string {
  const usdVal = (amountKta * price).toFixed(0);
  const locVal = convertedPrice ? (amountKta * convertedPrice).toFixed(0) : null;
  const emoji  = classification === "mega_whale" ? "🚨" : classification === "institutional" ? "🏦" : "🐋";
  const label  = classification.replace(/_/g, " ");
  const valStr = locVal && currency !== "USD"
    ? `~${parseInt(locVal).toLocaleString()} ${currency} (~$${parseInt(usdVal).toLocaleString()})`
    : `~$${parseInt(usdVal).toLocaleString()}`;
  const link   = `${appUrl}/onboard`;
  const footer = paid ? `KTA Oracle Agent` : `KTA Oracle Agent · Trial ${alertCount + 1}/${TRIAL_LIMIT}`;
  const sep     = `────────────────────`;

  return [
    `${emoji} Whale Alert — Keeta Network`, ``,
    `Amount   ${amountKta.toLocaleString()} KTA`,
    `Value    ${valStr}`,
    `Type     ${label}`,
    sep,
    `⚡ Settled in 0.4s on Keeta Network`,
    sep,
    `🔗 ${link}`, ``, footer,
  ].join("\n");
}

export function buildDiscordPriceEmbed(
  price: number, priceChange: number, change24h: number, marketCap: number,
  alertCount: number, paid: boolean, appUrl: string,
  currency = "USD", convertedPrice?: number,
  change7d: number | null = null, volume24h: number | null = null,
  aiQuote: string | null = null,
  socialLifetime = false,
) {
  const up     = priceChange > 0;
  const sign   = up ? "+" : "";
  const pct    = (priceChange * 100).toFixed(1);
  const c24    = `${change24h >= 0 ? "+" : ""}${change24h.toFixed(2)}%`;
  const disp   = (convertedPrice ?? price).toFixed(4);
  const url    = `${appUrl}/onboard`;
  const c7d    = change7d !== null ? `${change7d >= 0 ? "+" : ""}${change7d.toFixed(1)}%` : null;
  const volStr = (volume24h !== null && marketCap > 0)
    ? `${((volume24h / marketCap) * 100).toFixed(1)}% of cap` : null;

  const iconUrl   = `${appUrl}/icon.png`;
  const titleIcon = up ? "📈" : "📉";
  const momentum  = Math.abs(priceChange);
  const accent    = up
    ? momentum >= 0.15 ? "▲  Strong breakout — Keeta Network · 0.4s settlement"
    : momentum >= 0.07 ? "▲  Bullish momentum — Keeta Network · 0.4s settlement"
    :                    "▲  Rising — Keeta Network · 0.4s settlement"
    : momentum >= 0.15 ? "▼  Sharp correction — Keeta Network · 0.4s settlement"
    : momentum >= 0.07 ? "▼  Pullback — Keeta Network · 0.4s settlement"
    :                    "▼  Softening — Keeta Network · 0.4s settlement";
  const note = buildMarketNote(priceChange, change24h, marketCap, change7d, volume24h);

  let footer: string;
  let regLink: string;
  if (socialLifetime) {
    footer  = `⭐ KTA Oracle Agent · Supporter`;
    regLink = `[⚡ Manage access](${appUrl}/onboard)  ·  [About Keeta](https://keeta.com)`;
  } else if (paid) {
    footer  = `KTA Oracle Agent`;
    regLink = `[⚙️ Your account](${appUrl}/onboard)  ·  [About Keeta](https://keeta.com)`;
  } else {
    footer  = `KTA Oracle Agent · Trial ${alertCount + 1}/${TRIAL_LIMIT}`;
    regLink = `[📋 Register for free alerts](${appUrl}/onboard)  ·  [⚡ Lifetime access](${appUrl}/checkout)`;
  }

  return {
    embeds: [{
      title:       `${titleIcon}  KTA Price Alert — ${sign}${pct}%`,
      color:       up ? 0x00D4AA : 0xe74c3c,
      url,
      description: `*${accent}*\n\n${note}`,
      thumbnail:   { url: iconUrl },
      fields: [
        { name: "Price",   value: `\`${disp} ${currency}\``, inline: true },
        { name: "Move",    value: `\`${sign}${pct}%\``,      inline: true },
        { name: "24h",     value: `\`${c24}\``,              inline: true },
        ...(c7d    ? [{ name: "7d Trend",  value: `\`${c7d}\``,    inline: true }] : []),
        ...(volStr ? [{ name: "Vol/Cap",   value: `\`${volStr}\``, inline: true }] : []),
        ...(aiQuote ? [{ name: "⚡ Oracle Signal", value: `> ${aiQuote}`, inline: false }] : []),
        { name: "\u200b", value: regLink, inline: false },
      ],
      footer:    { text: footer, icon_url: iconUrl },
      timestamp: new Date().toISOString(),
    }],
  };
}

export function buildTwitterPrice(
  price: number, priceChange: number, change24h: number, marketCap: number,
  alertCount: number, paid: boolean, appUrl: string,
  currency = "USD", convertedPrice?: number,
  change7d: number | null = null, volume24h: number | null = null,
  aiQuote: string | null = null,
): string | null {
  const up     = priceChange > 0;
  const sign   = up ? "+" : "";
  const pct    = (priceChange * 100).toFixed(1);
  const c24    = `${change24h >= 0 ? "+" : ""}${change24h.toFixed(2)}%`;
  const mc     = marketCap > 0 ? ` · Cap: ${formatMarketCap(marketCap)}` : "";
  const disp   = (convertedPrice ?? price).toFixed(4);
  const link   = `${appUrl}`;
  const footer = paid ? `KTA Oracle Agent` : `KTA Oracle Agent · Trial ${alertCount + 1}/${TRIAL_LIMIT}`;
  const note   = buildMarketNote(priceChange, change24h, marketCap, change7d, volume24h)
    .split(/\.\s/)[0].replace(/\.$/, "").trim();
  const short  = note.replace(/\$KTA\s*/g, "").trimStart();
  const shortTrim = short.length > 80 ? short.substring(0, 77) + "..." : short;

  const qPool     = up ? QUOTES_UP : QUOTES_DOWN;
  const rawFull   = aiQuote ?? qPool[alertCount % qPool.length];
  const extracted = rawFull.match(/[\u201c""](.+?)[\u201d""]|^"(.+?)"/)?.[1] ?? rawFull;
  const capped    = extracted.length > 65 ? extracted.substring(0, 62) + "..." : extracted;
  const quoteLine = `"${capped.replace(/\$[A-Za-z]+/g, m => m.slice(1))}" — KTA Oracle Agent`;

  const attempts = [
    `${up ? "📈" : "📉"} $KTA ${sign}${pct}%\n\n${shortTrim}.\n\n${quoteLine}\n\nNow: ${disp} ${currency} · 24h: ${c24}${mc}\n\n🔗 ${link}\n${footer}`,
    `${up ? "📈" : "📉"} $KTA ${sign}${pct}%\n\n${shortTrim}.\n\n${quoteLine}\n\nNow: ${disp} ${currency} · 24h: ${c24}\n\n🔗 ${link}\n${footer}`,
    `${up ? "📈" : "📉"} $KTA ${sign}${pct}%\n\n${shortTrim}.\n\nNow: ${disp} ${currency} · 24h: ${c24}${mc}\n\n🔗 ${link}\n${footer}`,
    `${up ? "📈" : "📉"} $KTA ${sign}${pct}%\n\nNow: ${disp} ${currency} · 24h: ${c24}${mc}\n\n🔗 ${link}\n${footer}`,
    `${up ? "📈" : "📉"} $KTA ${sign}${pct}%\n\nNow: ${disp} ${currency} · 24h: ${c24}${mc}\n\n🔗 ${link}`,
  ];
  return attempts.find(t => t.length <= 280) ?? null;
}

export function buildTwitterWhale(
  price: number, amountKta: number, classification: string,
  alertCount: number, paid: boolean, appUrl: string,
): string | null {
  const usd    = (amountKta * price).toFixed(0);
  const emoji  = classification === "mega_whale" ? "🚨" : classification === "institutional" ? "🏦" : "🐋";
  const label  = classification.replace(/_/g, " ");
  const link   = `${appUrl}`;
  const footer = paid ? `KTA Oracle Agent` : `KTA Oracle Agent · Trial ${alertCount + 1}/${TRIAL_LIMIT}`;

  const attempts = [
    `${emoji} ${amountKta.toLocaleString()} $KTA moved (~$${parseInt(usd).toLocaleString()})\n${label} · 0.4s settlement on Keeta\n\n🔗 ${link}\n${footer}`,
    `${emoji} ${amountKta.toLocaleString()} $KTA moved (~$${parseInt(usd).toLocaleString()})\n${label}\n\n🔗 ${link}`,
    `${emoji} ${amountKta.toLocaleString()} $KTA moved · ~$${parseInt(usd).toLocaleString()} · ${label}`,
  ];
  return attempts.find(t => t.length <= 280) ?? null;
}

export function buildDiscordWhaleEmbed(
  price: number, amountKta: number, classification: string,
  alertCount: number, paid: boolean, appUrl: string,
  currency = "USD", convertedPrice?: number,
  change7d: number | null = null,
  socialLifetime = false,
): object {
  const usdVal  = (amountKta * price).toFixed(0);
  const locVal  = convertedPrice ? (amountKta * convertedPrice).toFixed(0) : null;
  const emoji   = classification === "mega_whale" ? "🚨" : classification === "institutional" ? "🏦" : "🐋";
  const label   = classification.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const color   = classification === "mega_whale" ? 0xe74c3c : classification === "institutional" ? 0x3498db : 0xf39c12;
  const valStr  = locVal && currency !== "USD"
    ? `\`${parseInt(locVal).toLocaleString()} ${currency}\` (~\`$${parseInt(usdVal).toLocaleString()}\`)`
    : `\`$${parseInt(usdVal).toLocaleString()} USD\``;
  const iconUrl = `${appUrl}/icon.png`;
  const url     = `${appUrl}/onboard`;

  const c7dNote = change7d !== null
    ? change7d > 3  ? `7d trend bullish (+${change7d.toFixed(1)}%) — this whale move aligns with medium-term momentum.`
    : change7d < -3 ? `7d trend negative (${change7d.toFixed(1)}%) — large move against the broader correction.`
    :                 `7d trend flat (${change7d.toFixed(1)}%) — move signals fresh directional pressure.`
    : `Large on-chain movement detected on Keeta Network.`;

  let footer: string;
  let regLink: string;
  if (socialLifetime) {
    footer  = `⭐ KTA Oracle Agent · Supporter`;
    regLink = `[⚡ Manage access](${appUrl}/onboard)  ·  [About Keeta](https://keeta.com)`;
  } else if (paid) {
    footer  = `KTA Oracle Agent`;
    regLink = `[⚙️ Your account](${appUrl}/onboard)  ·  [About Keeta](https://keeta.com)`;
  } else {
    footer  = `KTA Oracle Agent · Trial ${alertCount + 1}/${TRIAL_LIMIT}`;
    regLink = `[📋 Register](${appUrl}/onboard)  ·  [⚡ Lifetime access](${appUrl}/checkout)`;
  }

  return {
    embeds: [{
      title:       `${emoji}  ${label} — ${amountKta.toLocaleString()} KTA`,
      color,
      url,
      description: `*⚡ Settled in 0.4 seconds on Keeta Network*\n\n${c7dNote}`,
      thumbnail:   { url: iconUrl },
      fields: [
        { name: "Amount",    value: `\`${amountKta.toLocaleString()} KTA\``, inline: true },
        { name: "USD Value", value: valStr,                                   inline: true },
        { name: "Type",      value: `\`${label}\``,                          inline: true },
        { name: "\u200b",    value: regLink,                                  inline: false },
      ],
      footer:    { text: footer, icon_url: iconUrl },
      timestamp: new Date().toISOString(),
    }],
  };
}

export function buildTrialWarningDiscord(appUrl: string, lifetimeKta: number): object {
  return {
    embeds: [{
      title: "⚠️ 1 free alert remaining",
      color: 0xf39c12,
      description: [
        `You've used **${TRIAL_LIMIT - 1} of ${TRIAL_LIMIT}** free KTA Oracle alerts. Your next alert will be your last.`,
        ``,
        `**Keep alerts going forever — ${lifetimeKta} KTA total, one payment.**`,
        ``,
        `Already sent some KTA? Check your wallet — everything you've sent already counts toward the total. You may be closer than you think.`,
        ``,
        `👉 **[Check how much KTA you've sent](${appUrl}/onboard)** — enter your wallet in the Status Checker`,
        `👉 **[Get lifetime access](${appUrl}/checkout)** — see exactly how much more you need`,
        ``,
        `Alerts resume automatically after payment confirms on-chain. No action needed beyond sending KTA and activating.`,
      ].join("\n"),
      footer: { text: "KTA Oracle Agent · This is your only warning" },
    }],
  };
}

export function buildTrialWarningText(appUrl: string, lifetimeKta: number): string {
  return [
    `⚠️ 1 free alert remaining`,
    ``,
    `You've used ${TRIAL_LIMIT - 1}/${TRIAL_LIMIT} free KTA Oracle alerts. Your next alert will be your last.`,
    ``,
    `Keep alerts going: ${lifetimeKta} KTA total — one payment, no renewals, ever.`,
    ``,
    `Already sent some KTA? Check your status — it all counts:`,
    `👉 ${appUrl}/onboard`,
    ``,
    `Ready to top up? See exactly how much more you need:`,
    `👉 ${appUrl}/checkout`,
    ``,
    `— KTA Oracle Agent · This is your only warning`,
  ].join("\n");
}

export function buildTrialExhaustedDiscord(appUrl: string): object {
  return {
    embeds: [{
      title: "⏳ Your KTA Oracle trial has ended",
      color: 0xf39c12,
      description: [
        `You've received all **${TRIAL_LIMIT} free KTA Oracle alerts**.`,
        ``,
        `Over those alerts you've seen the oracle in action — live price moves, 7-day trend analysis, volume signals, and AI-powered insights delivered directly here.`,
        ``,
        `**Lifetime access: ${LIFETIME_KTA} KTA total — one payment, no renewals, ever.**`,
        ``,
        `Already sent some KTA? Everything you've sent from your wallet already counts — check your total first:`,
        `👉 **[Check how much you've sent](${appUrl}/onboard)** — enter your wallet in the Status Checker`,
        ``,
        `What you keep forever:`,
        `• Real-time price alerts (as fast as every 5 minutes)`,
        `• Oracle reasoning — 7d trend, volume context, payment timing`,
        `• AI-powered insights on every alert`,
        `• Whale movement alerts`,
        `• Multi-currency support`,
        ``,
        `👉 **[Get lifetime access](${appUrl}/checkout)** — see exactly how much more you need`,
        ``,
        `Alerts resume automatically within one cycle after payment confirms on-chain.`,
      ].join("\n"),
      footer: { text: "KTA Oracle Agent" },
    }],
  };
}

export function buildTrialExhaustedText(appUrl: string): string {
  return [
    `⏳ Your ${TRIAL_LIMIT} free KTA Oracle alerts are used up.`,
    ``,
    `Lifetime access: ${LIFETIME_KTA} KTA total — one payment, no renewals, ever.`,
    ``,
    `Already sent some KTA? Check your total first — it all counts:`,
    `👉 ${appUrl}/onboard  (Status Checker — enter your wallet)`,
    ``,
    `Ready to top up? See how much more you need:`,
    `👉 ${appUrl}/checkout`,
    ``,
    `Alerts resume automatically after payment confirms on-chain.`,
  ].join("\n");
}

export function buildExpiryReminderDiscord(appUrl: string, tier: string, hoursLeft: number): object {
  const h = Math.round(hoursLeft);
  return {
    embeds: [{
      title: "⏰ Your Oracle subscription expires tomorrow",
      color: 0xf39c12,
      description: [
        `Your **${tier}** tier access expires in approximately **${h} hour${h !== 1 ? "s" : ""}**.`,
        ``,
        `**What continues after expiry:**`,
        `• Social alerts — lifetime, no action needed`,
        ``,
        `**What stops after expiry:**`,
        `• Oracle API access`,
        `• Whale detection alerts`,
        `• AI market insights`,
        ``,
        `To renew, send KTA to the oracle wallet and activate again.`,
        ``,
        `👉 **[Renew access](${appUrl}/checkout)**`,
      ].join("\n"),
      footer: { text: "KTA Oracle Agent · This is your only reminder" },
    }],
  };
}

export function buildExpiryReminderText(appUrl: string, tier: string, hoursLeft: number): string {
  const h = Math.round(hoursLeft);
  return [
    `⏰ Your ${tier} Oracle subscription expires in ~${h}h.`,
    ``,
    `After expiry: social alerts continue (lifetime). Whale detection and Oracle API stop.`,
    ``,
    `Renew: ${appUrl}/checkout`,
    ``,
    `— KTA Oracle Agent · This is your only reminder`,
  ].join("\n");
}

export function buildLifetimeActivatedDiscord(appUrl: string): object {
  return {
    embeds: [{
      title:       "✅ Lifetime access activated",
      color:       0x00D4AA,
      description: [
        `Your payment has been verified on Keeta Network. You now have **unlimited KTA Oracle alerts** — no counter, no renewals, ever.`,
        ``,
        `**You now have:**`,
        `• Unlimited real-time price alerts`,
        `• Whale movement detection`,
        `• AI-powered market insights`,
        `• Multi-currency support`,
        `• All alert frequencies`,
        ``,
        `Alerts continue on the next cron cycle.`,
      ].join("\n"),
      footer: { text: "KTA Oracle Agent" },
      url: `${appUrl}/donate`,
    }],
  };
}

export function buildLifetimeActivatedText(appUrl: string): string {
  return [
    `✅ Lifetime access activated.`,
    ``,
    `Payment verified on Keeta Network. You now have unlimited KTA Oracle alerts — no counter, no renewals, ever.`,
    ``,
    `Includes: real-time price alerts · whale detection · AI insights · all frequencies · multi-currency.`,
    ``,
    `Alerts continue on the next cron cycle.`,
    ``,
    `— KTA Oracle Agent`,
  ].join("\n");
}

export type CelebType = "trial_welcome" | "lifetime_welcome" | "upgrade" | "renewal";

export function buildCelebEmbed(
  type: CelebType,
  appUrl: string,
  tier: string,
  remaining?: number,
): object {
  const label = tier.charAt(0).toUpperCase() + tier.slice(1);

  if (type === "trial_welcome") {
    const features = tier === "starter"
      ? ["• 3 whale alerts / month", "• AI insights preview", "• Whale feed access", "• 60 API calls over 30 days"]
      : ["• 1 whale alert", "• 20 API calls / day", "• Live price & FX data"];
    return { embeds: [{ title: "Welcome to KTA Oracle", color: 0xC4A35A, description: [
      `Your **${label}** trial is active. You have **${remaining ?? 100}** alerts remaining.`,
      ``, `**Included in your trial:**`, ...features, ``,
      `Sends accumulate on-chain — top up anytime to upgrade to lifetime access.`,
      `👉 **[See plans](${appUrl}/checkout)**`,
    ].join("\n"), footer: { text: "KTA Oracle Agent" } }] };
  }

  if (type === "lifetime_welcome") {
    const extras = tier === "business"
      ? ["• All 19 SDK tools · priority processing"]
      : tier === "pro"
      ? ["• Compliance tools, wallet scoring, on-chain analytics"]
      : [];
    const insight = (tier === "pro" || tier === "business") ? "• Full institutional AI insights on every alert" : "• Standard AI insights on every alert";
    return { embeds: [{ title: `Welcome to KTA Oracle — ${label} Lifetime`, color: 0x00D4AA, description: [
      `Thank you for your support. Your **${label}** lifetime access is active — alerts never expire, no renewals ever.`,
      ``, `**You now have:**`,
      "• Unlimited real-time price alerts",
      "• Unlimited whale movement detection",
      insight,
      ...extras,
      ``, `👉 **[Explore your tools](${appUrl}/tools)**`,
    ].join("\n"), footer: { text: "KTA Oracle Agent" } }] };
  }

  if (type === "upgrade") {
    const bonus = (tier === "pro" || tier === "business")
      ? `\n\n**Now unlocked:** compliance tools, wallet scoring, full on-chain analytics suite.`
      : "";
    return { embeds: [{ title: "Congratulations on upgrading", color: 0xF1C40F, description: [
      `Thank you for upgrading your KTA Oracle access to **${label}**.`,
      ``,
      `Your alerts are now permanent — no counter, no renewals, ever. They will keep firing on all registered platforms regardless of Oracle access status.`,
      bonus,
      ``, `👉 **[Explore your tools](${appUrl}/tools)**`,
    ].join("\n"), footer: { text: "KTA Oracle Agent" } }] };
  }

  return { embeds: [{ title: "Welcome back", color: 0x3498DB, description: [
    `Thank you for continuing to support KTA Oracle. Your **${label}** access has been renewed.`,
    ``,
    `Oracle API access, whale detection, and all tier features are active again.`,
    ``, `👉 **[Status](${appUrl}/onboard)**`,
  ].join("\n"), footer: { text: "KTA Oracle Agent" } }] };
}

export function buildCelebText(
  type: CelebType,
  appUrl: string,
  tier: string,
  remaining?: number,
): string {
  const label = tier.charAt(0).toUpperCase() + tier.slice(1);
  if (type === "trial_welcome")
    return `🎉 Welcome to KTA Oracle — ${label} trial active. ${remaining ?? 100} alerts remaining. Upgrade anytime: ${appUrl}/checkout\n\n`;
  if (type === "lifetime_welcome")
    return `🌟 Welcome to KTA Oracle — ${label} lifetime access active. Thank you for your support. Alerts never expire. ${appUrl}/tools\n\n`;
  if (type === "upgrade")
    return `🎉 Congratulations on upgrading to ${label}. Thank you for your support. Lifetime alerts are now permanent — no counter, no renewals. ${appUrl}/tools\n\n`;
  return `👋 Welcome back — ${label} access renewed. Oracle API and all features are active again. ${appUrl}/onboard\n\n`;
}

export function prependCelebEmbed(pricePayload: object, celebPayload: object): object {
  const price  = pricePayload  as { embeds?: object[] };
  const celeb  = celebPayload  as { embeds?: object[] };
  return { ...price, embeds: [...(celeb.embeds ?? []), ...(price.embeds ?? [])] };
}

export const QUOTES_UP = [
  `"Momentum building — conversion costs above average" — KTA Oracle Agent`,
  `"Rising rates — receive KTA now, defer outbound if possible" — KTA Oracle Agent`,
  `"Upward pressure — settlement costs above cycle norm" — KTA Oracle Agent`,
  `"Strong move — defer non-urgent outbound payments now" — KTA Oracle Agent`,
  `"Demand absorbing supply — Keeta payment rates rising" — KTA Oracle Agent`,
  `"Rate expansion — incoming KTA payments maximize here" — KTA Oracle Agent`,
  `"Rally holds — conversion costs elevated across Keeta" — KTA Oracle Agent`,
  `"Buyers in control — payment cost basis rising fast" — KTA Oracle Agent`,
  `"Accumulation visible — treasury outbound costs peak" — KTA Oracle Agent`,
  `"Above-average settlement rates — receive, don't send" — KTA Oracle Agent`,
  `"Breakout confirmed — watch for follow-through volume" — KTA Oracle Agent`,
  `"Price leads settlement — Keeta treasuries adjust now" — KTA Oracle Agent`,
];

export const QUOTES_DOWN = [
  `"Pullback opens a payment execution opportunity" — KTA Oracle Agent`,
  `"Compressed rates — strong window for outbound KTA" — KTA Oracle Agent`,
  `"Below-average conversion costs — execute outbound now" — KTA Oracle Agent`,
  `"Rate compression — outbound KTA payments cost less" — KTA Oracle Agent`,
  `"Correction in progress — treasury buys at better rate" — KTA Oracle Agent`,
  `"Downside move — conversion efficiency peaks here" — KTA Oracle Agent`,
  `"Lower rates — favorable window for payment execution" — KTA Oracle Agent`,
  `"Sellers active — payment settlement costs at cycle low" — KTA Oracle Agent`,
  `"Retracement window — Keeta outbound timing improves" — KTA Oracle Agent`,
];
