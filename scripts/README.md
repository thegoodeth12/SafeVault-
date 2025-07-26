# ✅ SafeVault Auto-Merge + Signer Status Tracker

This workflow auto-merges a pull request once the related Safe transaction has enough confirmations.

## 🛠 What It Does:
- Every 10 minutes, fetches the latest Safe transaction from Reown
- Counts confirmations (signers)
- If threshold is met (e.g. 2 of 3), merges the corresponding PR

## 📦 Setup:
- Set these GitHub secrets:
  - `SAFE_ADDRESS`
  - `REOWN_API_KEY`
  - `GITHUB_TOKEN` (already available in workflows)

## 🧠 To-Do:
You can improve it later by:
- Mapping Safe transaction hash to a specific PR
- Tagging or labeling PRs with proposal info

For now, it uses a fixed test PR:
- PR number: `#1`
- Repo: `SafeVault-`
- Owner: `Safe-app-eth`

Update those in the script manually for testing.
