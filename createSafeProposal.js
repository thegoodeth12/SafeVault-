const fetch = require("node-fetch");

const safeAddress = process.env.SAFE_ADDRESS;
const rpcUrl = process.env.SAFE_RPC_URL;
const apiKey = process.env.REOWN_API_KEY;

const createProposal = async () => {
  const tx = {
    to: "0x0000000000000000000000000000000000000000",
    value: "0",
    data: "0x",
    operation: 0,
  };

  console.log("🔐 Proposing Safe transaction via Reown...");

  const res = await fetch("https://api.reown.com/safe/propose", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      safeAddress,
      rpcUrl,
      tx,
      description: "Auto-generated proposal from GitHub PR"
    })
  });

  const data = await res.json();
  if (res.ok) {
    console.log("✅ Proposal created:", data);
  } else {
    console.error("❌ Failed to create proposal:", data);
  }
};

createProposal();