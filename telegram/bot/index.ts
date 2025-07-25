import { Telegraf } from "telegraf";
import { startCommand } from "./commands/start";

const bot = new Telegraf(process.env.7841605450:AAHev-ZXjdtJg2mp5t6uGFqkvTShSW6PAeY);
bot.start(startCommand);
bot.launch();
console.log("Telegram bot is running...");
