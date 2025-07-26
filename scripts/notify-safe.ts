// scripts/notify-safe.ts
import { notifySlack } from '../lib/slackNotify'
import { notifyTelegram } from '../lib/notify'

const args = process.argv.slice(2)
const message = args.join(' ') || '📣 New Safe Proposal created.'

Promise.all([
  notifySlack(message),
  notifyTelegram(message),
]).then(() => {
  console.log('🔔 Notification sent.')
})
