# 💬 GitHub Comment → Token Transfer Proposal + Confirmation

## ✅ Example Comment:
/propose-token USDC 0xRecipientAddress 150

This will:
- Propose a Safe transaction on Ethereum
- Post a comment back to the PR/issue with a confirmation + link

## 🛠 Required Secrets:
- `SAFE_ADDRESS`
- `SAFE_RPC_URL`
- `REOWN_API_KEY`
- `GITHUB_TOKEN`

## Supported Tokens (Ethereum Mainnet):
- USDC
- WETH