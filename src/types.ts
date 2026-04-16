export type AlertFrequency = "5min" | "15min" | "1h" | "4h" | "12h" | "1d" | "5%" | "10%" | "15%" | "20%" | "25%";
export type SocialPlatform = "discord" | "telegram" | "slack" | "twitter";
export type SubTier = "unregistered" | "free" | "starter" | "social" | "pro" | "business";

export interface TwitterCreds {
  apiKey:       string;
  apiSecret:    string;
  accessToken:  string;
  accessSecret: string;
}

export interface SocialSubscriber {
  wallet:            string;
  platform:          SocialPlatform;
  discordWebhook?:   string;
  telegramBotToken?: string;
  telegramChatId?:   string;
  slackWebhook?:     string;
  twitterCreds?:     TwitterCreds;
  frequency:         AlertFrequency;
  currency:          string;
  lastAlertAt:       number;
  lastAlertPrice?:   number;
  alertCount:        number;
  paid:              boolean;
  registeredAt:      number;
  tier?:             SubTier;
  expiresAt?:        number;
  socialLifetime?:   boolean;
  whaleCount?:       number;
  whaleMonthCount?:  number;
  whaleMonth?:       number;
  reminderSent?:     boolean;
  firstAlertSent?:   boolean;
  celebPending?:     "upgrade" | "renewal";
}

export interface Env {
  KV:                    KVNamespace;
  ORACLE_SERVICE?:       Fetcher;
  INTERNAL_SECRET:       string;
  KTA_ORACLE_URL?:       string;
  APP_URL:               string;
  ORACLE_WALLET:         string;
  TRIAL_LIMIT?:          string;
  LIFETIME_KTA?:         string;
  AI_KEY?:               string;
  AI_ENDPOINT?:          string;
  AI_MODEL?:             string;
  DEV_SECRET?:           string;
  DEV_WALLET?:           string;
  DISCORD_WEBHOOK_URL?:    string;
  ALERTS_DISCORD_WEBHOOK_URL?: string;
  DISCORD_PUBLIC_KEY?:     string;
  RESEND_API_KEY?:          string;
  TELEGRAM_BOT_TOKEN?:   string;
  TELEGRAM_CHAT_ID?:     string;
  SLACK_WEBHOOK_URL?:    string;
  TWITTER_API_KEY?:         string;
  TWITTER_API_SECRET?:      string;
  TWITTER_ACCESS_TOKEN?:    string;
  TWITTER_ACCESS_SECRET?:   string;
  STRIPE_PAYMENT_LINK?:     string;
  STRIPE_WEBHOOK_SECRET?:   string;
  COINBASE_COMMERCE_LINK?:  string;
}
