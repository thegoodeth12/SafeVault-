# 💬 GitHub Comment → Safe Proposal

This setup lets you create Safe proposals by commenting on PRs/issues.

## 💬 Format:
```
/propose-transfer 0xRecipientAddress 100
```

## 📁 Files:
- `.github/workflows/comment-trigger.yml`: GitHub Action trigger
- `scripts/parseCommentProposal.js`: Parses and submits to Reown

## 🛠 Required Secrets:
- `SAFE_ADDRESS`
- `SAFE_RPC_URL`
- `REOWN_API_KEY`
- `GITHUB_TOKEN`

Deploy and test by commenting on a PR in your repo.