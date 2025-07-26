# telegram_bot.py
import os, logging, requests
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

from safe_utils import fetch_safe_proposals, approve_safe_tx

BOT_TOKEN = os.getenv("7841605450:AAHev-ZXjdtJg2mp5t6uGFqkvTShSW6PAeY")

logging.basicConfig(level=logging.INFO)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("🔐 Welcome to SafeBot\nUse /safe to view or approve transactions.")

async def deploy(update: Update, context: ContextTypes.DEFAULT_TYPE):
    webhook_url = os.getenv("https://replit.com/@thegoodeth09/VercelDeployBot?s=app")
    if webhook_url:
        r = requests.post(webhook_url)
        await update.message.reply_text("✅ Vercel deploy triggered!" if r.ok else "❌ Failed to deploy.")
    else:
        await update.message.reply_text("❌ Missing webhook.")

async def safe(update: Update, context: ContextTypes.DEFAULT_TYPE):
    args = context.args
    if not args:
        proposals = fetch_safe_proposals()
        await update.message.reply_text(proposals)
    elif args[0] == "approve" and len(args) > 1:
        result = approve_safe_tx(args[1])
        await update.message.reply_text(result)
    else:
        await update.message.reply_text("Usage:\n/safe → view tx\n/safe approve [tx_hash]")

def run_bot():
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("deploy", deploy))
    app.add_handler(CommandHandler("safe", safe))
    app.run_polling()

if __name__ == "__main__":
    run_bot()
