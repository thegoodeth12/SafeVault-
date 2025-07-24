const fetch = require("node-fetch");
const { ethers } = require("ethers");

const safeAddress = process.env.SAFE_ADDRESS;
const rpcUrl = process.env.SAFE_RPC_URL;
const apiKey = process.env.REOWN_API_KEY;
const prNumber = process.env.PR_NUMBER;

(async () => {
  try {
    const tx = {
      to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // replace with target
      value: ethers.utils.parseEther("0.1").toString(), // 0.1 ETH
      data: "0x",
      operation: 0
    };

    const res = await fetch("https://api.reown.com/safe/propose", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        safeAddress,
        rpcUrl,
        tx,
        description: `Auto-proposed via label on PR #${prNumber}`
      })
    });

    const json = await res.json();
    if (res.ok) {
      console.log(`✅ Proposal triggered successfully`);
    } else {
      console.error("❌ Failed to propose:", json);
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
