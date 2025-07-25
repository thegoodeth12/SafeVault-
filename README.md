# SafeVault 🔐

> **Multisig made mobile. Secure your Safe, your way.**

**SafeVault 🔐** is a secure, modular, and mobile-first multisig wallet built on top of the Gnosis Safe protocol.  
It enables DAOs and teams to manage treasury operations with:
- WalletConnect support
- GitHub-powered Safe proposals
- Discord alerts for signers
- Fully mobile installable UI (PWA/TestFlight)
- Extendable frontend for custom Safe workflows

---

## 🚀 Live Version

- Vercel: [https://safevault.vercel.app](https://safevault.vercel.app)
- Netlify: [https://safevault.netlify.app](https://safevault.netlify.app)
- GitHub Pages: [https://your-org.github.io/SafeVault](https://your-org.github.io/SafeVault)
- Custom Domain:

> Replace with your actual deployment links.

---

## ✨ Features

- 🔐 Gnosis Safe SDK + ProtocolKit
- 🔗 WalletConnect & SafeAuthKit support
- 📊 View Safe owners, thresholds, balances
- 📁 GitHub Actions for Safe proposals
- 📣 Discord webhook alerts for pending transactions
- 🧩 Reown plugin support (optional smart automation)
- 🧪 TestFlight-ready export & PWA install support
- 🌐 Multichain support: Ethereum, Arbitrum, Base, Optimism
- 🎨 Customizable, developer-friendly frontend

---

## 📦 Tech Stack

- Next.js (App Router)
- TypeScript + Tailwind CSS
- wagmi + viem (wallet/chain interaction)
- @safe-global/protocol-kit
- WalletConnect
- GitHub Actions + Discord Webhooks
- Reown SDK (optional extension)

---

## 🛠️ Local Setup

```bash
git clone https://github.com/your-org/SafeVault
cd SafeVault

# Install dependencies
npm install

# Configure your environment
cp .env.example .env.local

# Run the app
npm run dev
