import fs from 'fs'
import path from 'path'
import axios from 'axios'

const PROPOSAL_FEED = path.join(__dirname, '../data/proposals.json')
const TELEGRAM_WEBHOOK = process.env.TELEGRAM_WEBHOOK! // from secrets
const LAST_NOTIFIED_FILE = path.join(__dirname, '../data/.lastNotified.json')

type Proposal = {
  to: string
  value: string
  proposer: string
  created: string
}

function loadJSON(file: string) {
  if (!fs.existsSync(file)) return []
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

async function notifyNewProposals() {
  const proposals: Proposal[] = loadJSON(PROPOSAL_FEED)
  const lastNotified = loadJSON(LAST_NOTIFIED_FILE)

  const newOnes = proposals.filter(p => {
    return !lastNotified.find((n: any) => n.created === p.created)
  })

  if (newOnes.length === 0) return console.log('No new proposals.')

  for (const proposal of newOnes) {
    const message = `📤 *New Safe Proposal*\n
To: \`${proposal.to}\`
Value: ${proposal.value} ETH
By: ${proposal.proposer}
🕒 ${proposal.created}`

    await axios.post(TELEGRAM_WEBHOOK, {
      text: message,
      parse_mode: 'Markdown',
    })
  }

  fs.writeFileSync(LAST_NOTIFIED_FILE, JSON.stringify(proposals.slice(0, 5)))
}

notifyNewProposals().catch(console.error)
