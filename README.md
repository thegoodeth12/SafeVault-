# 1. Cleaned README.md
readme_final = """
# 🔐 SafeVault Dashboard

Welcome to **SafeVault** — a custom Gnosis Safe{Wallet} dashboard for managing multisig operations, transaction history, and team coordination.

## 🚀 Live Preview
Deployed via Vercel:  
👉 https://your-vercel-url.vercel.app

## ✅ Features
- View Safe metadata: address, owners, threshold
- View transaction history (pending + executed)
- GitHub PR integration: auto-comments Safe status
- Telegram bot alerts for proposal events
- PWA support (installable on iOS/Android)

## 🛠 Tech Stack
- Framework: Next.js (TypeScript)
- Safe API: Manual + mock integration
- CI/CD: GitHub Actions
- Notifications: Telegram Bot
- Hosting: Vercel (no custom domain)

---

## 📦 Setup Locally

```bash
git clone https://github.com/your-org/SafeVault.git
cd SafeVault
npm install
npm run dev
```

### 🔧 Configure Secrets
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### 🔁 GitHub Actions Included
- Telegram alerts
- PR Safe comments

---

## 📲 PWA Install
Works as a native app when added to your phone's home screen.

---

## 🔐 Safe Info
- Address: `0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0`
- Network: Arbitrum
- Threshold: 2 of 3
- Owners: 3

---

Built with 💼 + 🔐 by Safe-app-eth.
"""

# 2. ONBOARDING.md
onboarding_doc = """
# 👋 SafeVault Onboarding Guide

Welcome to the SafeVault multisig dashboard. Here’s how to participate in transaction workflows as a signer.

---

## 🔐 Your Safe Setup

- Safe Address: `0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0`
- Threshold: 2 of 3 signers
- Network: Arbitrum

---

## ✅ Daily Actions

### 🧾 1. View Dashboard
Visit: https://your-vercel-url.vercel.app  
View Safe details, transactions, and status.

### 🧪 2. Propose Transactions
Use the Safe UI (or app) to propose:
- ETH transfers
- Contract calls
- Token approvals

### 👥 3. Approve via Safe App
- Log into the Safe app
- Go to the pending transactions
- Click “Sign” if you're an owner

---

## 🤖 GitHub Bot Commands

### Auto-comments on PRs:
You’ll see:
```
🔐 Safe Wallet Status
- Threshold: 2 of 3
- Network: Arbitrum
✅ Ready to sign.
```

---

## 📡 Telegram Alerts
You'll receive alerts when:
- New proposals are created
- Transactions are executed
- README is updated

---

## ⚙️ GitHub Action Secrets (Admins Only)
In your repo → Settings → Secrets → Actions:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

---

Let us know in the repo if you need help. Welcome aboard!
"""

# Write files
readme_path = project_root / "README.md"
onboarding_path = project_root / "ONBOARDING.md"
readme_path.write_text(readme_final.strip())
onboarding_path.write_text(onboarding_doc.strip())

# Repackage final SafeVault bundle
final_zip_path_clean = Path("/mnt/data/SafeVault-Final.zip")
with ZipFile(final_zip_path_clean, "w") as zipf:
    for file in project_root.rglob("*"):
        if file.is_file():
            zipf.write(file, file.relative_to(project_root))
