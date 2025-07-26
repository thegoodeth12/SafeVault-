# 🔐 SafeVault — Your Secure Dashboard for Safe{Wallet}

Live App: [safe-vault-f44t.vercel.app](https://safe-vault-f44t.vercel.app/)  
Safe App Ready ✅ | GitHub Action Enabled 🟢 | Vercel Deployment ⚡️

> SafeVault is a Safe{Wallet}-native dashboard that allows owners to view Safe details, propose transactions, manage thresholds, and receive real-time notifications.

---

## 🚀 Features

- 📊 Real-time Safe info: owners, balances, threshold
- 🧩 Safe App SDK integration (iframe support for Safe{Wallet})
- 🧠 Safe Proposal automation (via GitHub Action or Discord)
- 🛡 Connects to any Safe on Arbitrum or Ethereum
- 🔗 Works with WalletConnect, OneKey, Ledger, and MPC wallets

---

## 📦 Dependencies

```bash
@safe-global/protocol-kit        # Interact with Safe smart contracts
@safe-global/api-kit             # Safe transaction service SDK
@safe-global/safe-core-sdk-types # Type definitions
ethers                           # Ethereum JS SDK
dotenv                           # .env file support

    ⚙️ Dev Dependencies
      
     ts-node      # TypeScript runner
     typescript # TS compiler


🌐 Safe App Integration

SafeVault runs inside Safe{Wallet} via iframe using the Safe Apps SDK. You can test it by
1.	Opening any Safe on app.safe.global
2.	Clicking Apps → Add Custom App
3.	Pasting:
   https://safe-vault-f44t.vercel.app
   

The Safe will auto-load the app and inject your Safe address + chain info.

⸻

🧪 Local Development

    git clone https://github.com/Safe-app-eth/.    SafeVault-.git
cd SafeVault-
npm install
npm run dev

Then open http://localhost:3000 to see the live dashboard.

⸻

📦 Production Deployment

We’re using Vercel for automatic deployments.
Every push to main rebuilds the app and publishes to:

🔗 https://safe-vault-f44t.vercel.app

🔁 GitHub Actions

This repo comes with a GitHub Action that:
	•	⏳ Auto-updates this README with new Safe proposals
	•	✅ Sends Telegram/Slack notifications on changes
	•	📬 Can be extended to auto-create PRs for proposals

⸻

📌 Version

v1.0.0
Release Date: July 26, 2025
GitHub: github.com/Safe-app-eth/SafeVault-

⸻

© 2025 SafeVault, All rights reserved.
    ---

## ✅ `manifest.json` for Safe{App} loading

Place this in your **`public/manifest.json`** file:

```json
{
  "name": "SafeVault",
  "description": "Dashboard for viewing and managing Safe{Wallet} accounts",
  "iconPath": "logo.svg",
  "network": {
