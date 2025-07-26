const fetch = require("node-fetch");

const safeAddress = process.env.SAFE_ADDRESS;
const apiKey = process.env.REOWN_API_KEY;
const githubToken = process.env.GITHUB_TOKEN;

// TODO: Replace with dynamic PR mapping logic if available
const mockPullRequest = {
  number: 1, // <-- Update this with the actual PR number
  repo: "SafeVault-", // <-- Update this with the repo name
  owner: "Safe-app-eth", // <-- GitHub org or username
  threshold: 2 // <-- Safe signing threshold
};

(async () => {
  try {
    const txs = await fetch(`https://api.reown.com/safe/transactions?address=${safeAddress}`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    }).then(res => res.json());

    const latest = txs[0];
    if (!latest) throw new Error("No transactions found.");

    const approvals = latest.confirmations.length;

    if (approvals >= mockPullRequest.threshold) {
      console.log(`✅ Safe threshold met. Approvals: ${approvals}`);

      const mergeRes = await fetch(`https://api.github.com/repos/${mockPullRequest.owner}/${mockPullRequest.repo}/pulls/${mockPullRequest.number}/merge`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          merge_method: "squash",
          commit_title: "🔐 Safe proposal approved, PR auto-merged"
        })
      });

      if (mergeRes.ok) {
        console.log("✅ PR successfully merged.");
      } else {
        const text = await mergeRes.text();
        console.error("❌ Merge failed:", text);
      }
    } else {
      console.log(`🕒 Approvals (${approvals}) not enough for threshold (${mockPullRequest.threshold})`);
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
