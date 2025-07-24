# 💬 GitHub Comment: Token Transfer Proposal (Ethereum)

## 🔁 Format:
/propose-token USDC 0xRecipientAddress 100

✅ Automatically creates a Safe proposal via Reown to transfer tokens (on Ethereum mainnet).

## 🧠 Supported Tokens (Ethereum):
- USDC
- WETH

## 📁 Files
- `.github/workflows/token-transfer.yml` — GitHub Action trigger
- `scripts/parseTokenProposal.js` — Parses + sends transaction

## 🔒 Required GitHub Secrets:
- `SAFE_ADDRESS`
- `SAFE_RPC_URL`
- `REOWN_API_KEY`
- `GITHUB_TOKEN`