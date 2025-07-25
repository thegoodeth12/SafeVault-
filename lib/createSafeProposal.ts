import { notifyTelegram , notifySlack } from '../lib/notify'

await notifyTelegram(`🆕 New Safe Proposal Created:
*Target:* 0xAbC...
*Action:* Transfer 1 ETH
*Initiated By:* @thegoodeth`)

await notifySlack(`🧠 New Safe Proposal Created:
• *Target:* 0xabc...
• *From:* @thegoodeth
• *Action:* Call contract ✅`)
