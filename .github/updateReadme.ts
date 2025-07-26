import fs from 'fs'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const SAFE_ADDRESS = process.env.0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0!
const SAFE_CHAIN_ID = process.env.MAINNET!
const TELEGRAM_BOT_TOKEN = process.env.7841605450:AAHev-ZXjdtJg2mp5t6uGFqkvTShSW6PAeY!
const TELEGRAM_CHAT_ID = process.env.1097330947!

const SAFE_TX_SERVICE = `https://safe-transaction-${SAFE_CHAIN_ID === '1' ? 'mainnet' : 'arbitrum'}.safe.global`

async function fetchProposals() {
  const url = `${SAFE_TX_SERVICE}/api/v1/safes/${SAFE_ADDRESS}/multisig-transactions/`
  const res = await axios.get(url)
  return res.data.results.slice(0, 3)
}

async function updateReadme(transactions: any[]) {
  const readme = fs.readFileSync('README.md', 'utf-8')
  const start = '<!-- SAFE_PROPOSALS_START -->'
  const end = '<!-- SAFE_PROPOSALS_END -->'
  const middle = transactions.map(tx => `- 📝 Tx: [${tx.nonce}](${SAFE_TX_SERVICE}/tx/${tx.safe_tx_hash}) | Status: ${tx.is_executed ? '✅ Executed' : '🕒 Pending'}`).join('\n')

  const updated = readme.replace(
    new RegExp(`${start}[\\s\\S]*${end}`),
    `${start}\n${middle}\n${end}`
  )

  fs.writeFileSync('README.md', updated)
}

async function notifyTelegram(msg: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return
  await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: TELEGRAM_CHAT_ID,
    text: msg,
    parse_mode: 'Markdown'
  })
}

async function main() {
  const proposals = await fetchProposals()
  await updateReadme(proposals)

  const summary = proposals.map(p => `• Tx #${p.nonce} — ${p.is_executed ? 'Executed ✅' : 'Pending ⏳'}`).join('\n')
  await notifyTelegram(`🔐 *SafeVault Proposals Update*\n\n${summary}`)
}

main()
