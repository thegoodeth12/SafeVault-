# 🔁 SafeVault: GitHub → Safe Proposal Automation

## ✅ What It Does
- When a Pull Request is opened, it automatically proposes a Safe transaction using Reown MPC.

## 🛠 Setup
Create GitHub Actions secrets:

- `SAFE_ADDRESS`: Your Safe wallet address
- `SAFE_RPC_URL`: Arbitrum RPC (e.g. from Alchemy or Ankr)
- `REOWN_API_KEY`: Reown bot access key
- `GITHUB_TOKEN`: Default GitHub token (pre-provided)

## 📁 Files
- `.github/workflows/safe-proposal.yml`: GitHub automation trigger
- `scripts/createSafeProposal.js`: Proposal logic