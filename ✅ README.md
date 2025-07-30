# 🔐 Safe Vault Dashboard – v1.0.0

A full-featured Safe-native dApp dashboard for managing owners, thresholds, and transaction proposals. Fully integrated with GitHub automation and Safe{Wallet} infrastructure.

---

## 🚀 Features

- ✅ Live Safe status (owners, threshold, balance)
- 🧠 Threshold change proposals (manual + GitHub-triggered)
- 📦 Multisend ETH/tokens with dynamic UI
- 🔐 Secure Reown MPC integration
- 🤖 GitHub Actions auto-proposal workflow
- 📱 Mobile-optimized dashboard (TestFlight-ready)
- 🔧 Extension support for GitHub/Discord workflows

---

## 📸 Screenshots

> _(Optional: add screenshots or demo GIFs here later for better presentation)_  
> Use: `public/screenshots/` or Vercel preview links.

---

## 🛠 Built With

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Safe Protocol Kit](https://github.com/safe-global/safe-core-sdk)
- [ethers.js](https://docs.ethers.io/)
- [wagmi.sh](https://wagmi.sh/)
- GitHub Actions + Webhooks
- Reown AppKit (Safe Signing)
- Vercel (CI/CD + domain deployment)

---

## ⚙️ Setup Instructions

### 1. Clone and install dependencies

```bash
git clone https://github.com/YOUR-ORG/YOUR-REPO.git
cd YOUR-REPO
npm install

NEXT_PUBLIC_SAFE_ADDRESS=0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0
NEXT_PUBLIC_CHAIN_ID=42161
NEXT_PUBLIC_APPKIT_WEBHOOK=https://appkit-lab.reown.com/library/multichain-all/
NEXT_PUBLIC_GITHUB_REPO=https://github.com/Safe-app-eth/SafeVault-.git

npm run dev
Visit: http://localhost:3000/dashboard

🔄 GitHub Auto-Proposal Flow

Push a new Git tag like:
bush
git tag v1.1.0
git push origin v1.1.0
🔧 GitHub Action will auto-create a proposal and update the dashboard.

⸻

🌍 Live Dashboard

✅ Live URL: https://safe-vault-f44t.vercel.app/

Auto-deployed via Vercel with CI.

📁 Project Structure
bash
/pages
  /dashboard.tsx         # Main UI
  /api/propose.ts        # GitHub tag -> Safe proposal
/components
  /SafeStatus.tsx
  /OwnerTools.tsx
  /MultisendForm.tsx
  /ThresholdProposal.tsx
/lib
  /safeClient.ts
  /utils.ts
.github
  /workflows/proposal.yml # Auto-create Safe tx from tags

📦 Release Process
	1.	Push a new tag:
git tag v1.2.0 && git push origin v1.2.0
	2.	GitHub Actions will:
	•	Propose a Safe transaction
	•	Update the repo README
	•	Notify Discord (if configured)
	3.	Sign from Safe{Wallet} UI or frontend.

⸻

🤝 Credits

Built with ❤️ by @thegoodeth12
Powered by Safe, Reown, Vercel, and GitHub.
