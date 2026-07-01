# X/Twitter Context With TweetClaw

KTA Social can broadcast alerts to X/Twitter. When a maintainer or agent needs
public conversation context before writing a follow-up post, use TweetClaw as a
read-only evidence source.

This workflow is for context review only. It does not provide trading advice,
price predictions, private account data, or permission to publish.

## Setup

Install TweetClaw in OpenClaw:

```bash
openclaw plugins install npm:@xquik/tweetclaw
openclaw config set plugins.entries.tweetclaw.config.apiKey "$XQUIK_API_KEY"
openclaw config set tools.alsoAllow '["explore", "tweetclaw"]'
```

Keep the API key in the environment or OpenClaw config. Do not paste API keys,
cookies, signing keys, wallet secrets, or payment material into prompts, docs,
issues, logs, or screenshots.

## Review Workflow

1. Start from a KTA Social alert, whale event, or support question.
2. Use TweetClaw to search public posts and replies for the KTA topic, cashtag,
   project handle, or alert URL.
3. Capture public post URLs, authors, timestamps, text snippets, and engagement
   counts.
4. Separate observed public discussion from conclusions. Do not infer private
   sentiment, coordinated activity, or investment intent.
5. Draft the follow-up post or summary for human review.
6. Publish only through KTA Social or another approved posting workflow after
   explicit approval.

## Safe Uses

- Check whether an alert is being discussed publicly before writing a recap.
- Collect public replies that need a support or documentation follow-up.
- Compare public X/Twitter context with on-chain KTA alert facts.
- Archive source URLs next to the internal alert summary for later review.

## Do Not Use For

- Automated buy, sell, or trading recommendations.
- Private account scraping or credential handling.
- Posting, replying, following, direct messaging, monitor creation, or webhook
  setup without a separate approval-gated workflow.
- Claims that a public discussion sample proves broad market sentiment.

## Prompt Template

```text
Use TweetClaw to collect public X/Twitter context for this KTA alert:

Alert:
<paste the alert text>

Return:
- public post URLs
- author handles
- timestamps
- short source notes
- limitations

Do not draft trading advice. Do not publish anything.
```
