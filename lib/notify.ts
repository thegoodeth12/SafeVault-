// lib/notify.ts

export async function notifyTelegram(message: string) {
  const token = process.env.7841605450:AAHev-ZXjdtJg2mp5t6uGFqkvTShSW6PAeY
  const chatId = process.env.1097330947

  if (!token || !chatId) return

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    }),
  })
}
