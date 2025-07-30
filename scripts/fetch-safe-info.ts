import fs from 'fs';
import { getSafeInfo } from '../lib/safe/utils';

async function main() {
  const info = await getSafeInfo('0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0');

  const newSection = `
## 🔐 Safe Info (Auto-updated)
- **Address**: ${info.address}
- **Network**: ${info.network}
- **Owners**: ${info.owners.join(', ')}
- **Threshold**: ${info.threshold}
- **Balance**: ${info.balance} ETH
`;

  const readme = fs.readFileSync('README.md', 'utf-8');
  const updated = readme.replace(/## 🔐 Safe Info(.|\n)*?(?=##|$)/, newSection.trim());

  fs.writeFileSync('README.md', updated);
  console.log('✅ README updated with Safe info.');
}

main().catch(console.error);
