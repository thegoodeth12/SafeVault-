import { Context } from "telegraf";

export const startCommand = (ctx: Context) => {
  ctx.reply("Welcome to https://t.me/mysafenotifier_bot 🔐", {
    reply_markup: {
      inline_keyboard: [[
        { text: "Open SafeVault", web_app: { url: "https://safe-wallet-swart.vercel.app/" } }
      ]]
    }
  });
};
