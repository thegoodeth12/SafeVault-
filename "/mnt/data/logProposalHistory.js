const fetch = require("node-fetch");
const fs = require("fs");

const apiKey = process.env.REOWN_API_KEY;
const safeAddress = process.env.SAFE_ADDRESS;

(async () => {
  try {
    const res = await fetch(`https://api.reown.com/safe/transactions?address=${safeAddress}`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });
    const txs = await res.json();

    let output = "# 🧾 Safe Proposal History\\n\\n";
    for (const tx of txs.slice(0, 10)) {
      const date = new Date(tx.createdAt).toLocaleString();
      output += `- ${date}: ${tx.description} (Status: ${tx.status})\\n`;
    }

    fs.writeFileSync("safe-proposal-history.md", output);
    console.log("✅ History updated");
  } catch (e) {
    console.error("❌ Error logging history:", e.message);
  }
})();
