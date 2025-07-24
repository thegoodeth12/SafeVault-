const fetch = require("node-fetch");
const fs = require("fs");

const safeAddress = process.env.SAFE_ADDRESS;
const apiKey = process.env.REOWN_API_KEY;

(async () => {
  try {
    const res = await fetch(`https://api.reown.com/safe/transactions?address=${safeAddress}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from Reown API");
    }

    const data = await res.json();
    const proposals = data.slice(0, 10).map(tx => ({
      date: tx.createdAt,
      description: tx.description || "No description",
      status: tx.status || "Unknown",
      signers: tx.signers || []
    }));

    fs.writeFileSync("SAFE-Dashboard/proposals.json", JSON.stringify(proposals, null, 2));
    console.log("✅ proposals.json updated successfully");
  } catch (err) {
    console.error("❌ Error syncing proposals:", err.message);
  }
})();