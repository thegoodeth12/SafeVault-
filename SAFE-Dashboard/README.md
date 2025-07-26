# 🔐 SafeVault GitHub Dashboard UI

## ✅ What This Is
A lightweight dashboard (hosted via GitHub Pages) that:
- Shows recent Safe proposals
- Displays status, signers, and description
- Updates via a static `proposals.json` file

## 🔗 Example Output

| Date | Description | Status | Signers |
|------|-------------|--------|---------|
| 2025-07-24 | Send 0.1 ETH | Pending | 0xSigner1, 0xSigner2 |
| 2025-07-23 | Send 50 USDC | Success | 0xSigner3, 0xSigner4 |

## 🚀 How To Use

1. Place the `SAFE-Dashboard` folder in your repo.
2. Enable GitHub Pages (`Settings > Pages > Source: main /docs or main /SAFE-Dashboard`)
3. Access via:
https://.github.io//SAFE-Dashboard/
## 🔁 Optional Automation

You can automate updates to `proposals.json` by syncing with:
- Reown API
- Safe transaction events
- GitHub Action every 15 mins
