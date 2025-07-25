# 🛡️ SafeBot for Telegram + GitHub

Use this bot to:
- ✅ Deploy via `/deploy`
- ✅ View proposals via `/safe`
- ✅ Approve txs via `/safe approve [tx_hash]`

### Setup

1. Copy `.env.example` to `.env`
2. Paste your BOT_TOKEN and SAFE_ADDRESS
3. Run with `python telegram_bot.py` (Replit, Railway, etc.)

### GitHub Integration

To enable webhook:
- Create a GitHub webhook to your PythonAnywhere/Railway endpoint.
- Trigger on PR comment or label.
- Parse comments like `/safe approve` and forward to Telegram.

Coming soon:
- GitHub App version
- PR auto-proposal support
