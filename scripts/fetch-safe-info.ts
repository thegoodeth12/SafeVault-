import fs from 'fs';
import { getSafeInfo } from '../lib/safe/utils'; // 0x821f2b40d965b81202b181Aba1c7a380C49Ed675

async function main() {
  const info = await getSafeInfo('0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0'); // Example

  const content = `
## 🔐 Safe Info (Auto-updated)
- Address: ${info.address}
- Network: ${info.network}
- Owners: ${info.owners.join(', ')}
- Threshold: ${info.threshold}
- Balance: ${info.balance} ETH
`;

  const readme = fs.readFileSync('README.md', 'utf-8');
  const updated = readme.replace(
    /## 🔐 Safe Info(.|\n)*?(?=##|$)/,
    content.trim()
  );

  fs.writeFileSync('README.md', updated);
}

main().catch(console.error);
