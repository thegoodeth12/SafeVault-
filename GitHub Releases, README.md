# SafeVault 🔐

**SafeVault** is a custom Safe{Wallet} dashboard built with [@safe-global/protocol-kit](https://github.com/safe-global/safe-core-sdk), optimized for secure governance, threshold management, and automation via GitHub + Telegram.

### 🌐 Live App
[https://safe-vault-f44t.vercel.app](https://safe-vault-f44t.vercel.app)

---

## ✅ Features

- 🧠 Real-time Safe info (owners, threshold, balances)
- 🔐 Threshold change proposals via UI or GitHub PRs
- ⚙️ GitHub Actions auto-sync README with Safe proposals
- 📲 Telegram bot notifications for new Safe transactions
- 🧩 Fully dockerized + Vercel deployable

---

## 🧪 Dependencies

| Package | Description |
|--------|-------------|
| `@safe-global/protocol-kit` | Core SDK for Safe Smart Account interaction |
| `@safe-global/api-kit`      | Safe API client |
| `ethers`                    | Ethereum JavaScript library |
| `dotenv`                    | Environment variable loader |
| `typescript` + `ts-node`   | Dev tools |

---

## 🚀 Deploy
Clone, install, and run:
```bash
git clone https://github.com/Safe-app-eth/SafeVault-.git
cd SafeVault-
npm install
npm run dev



📡 Webhooks & Automation
	•	notify-telegram.ts: Sends threshold/proposal alerts to Telegram
	•	update-readme.ts: Auto-updates README with current Safe info
	•	.github/workflows/proposal-sync.yml: GitHub Action for Safe governance sync


🐳 Docker

docker build -t safevault-app .
docker run -p 3000:3000 safevault-app

Made for multisig peace of mind. SafeVault 🔐


---

### 🧱 Next Steps

Now I’ll deliver:
1. `release.json` (GitHub release metadata)
2. `Dockerfile` (build the app easily)
3. `notify-telegram.ts` (for Telegram alerts)
4. Updated `README.md` (with the content above)
5. `proposal-sync.yml` GitHub Action
6. `update-readme.ts` script

Shall I package them and send the drop?
