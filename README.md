# 💬 ETH Transfer Proposal via GitHub Comment

## ✅ Usage:
```
/propose-eth 0xRecipientAddress 0.5
```

✅ Automatically proposes ETH transfer from Safe using Reown + posts result to PR/issue comment.

## 📁 Files:
- .github/workflows/eth-transfer.yml
- scripts/proposeETHTransfer.js

## 🔒 GitHub Secrets Needed:
- SAFE_ADDRESS
- SAFE_RPC_URL
- REOWN_API_KEY
- GITHUB_TOKEN