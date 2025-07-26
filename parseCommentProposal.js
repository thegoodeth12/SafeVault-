const fetch = require("node-fetch");

const comment = process.env.COMMENT_BODY;
const safeAddress = process.env.SAFE_ADDRESS;
const rpcUrl = process.env.SAFE_RPC_URL;
const apiKey = process.env.REOWN_API_KEY;

const parseTransfer = (input) => {
  const parts = input.trim().split(/\s+/);
  if (parts.length !== 3) throw new Error("Invalid format. Use /propose-transfer <to> <amount>");
  const [, to, amount] = parts;
  return { to, amount };
};

(async () => {
  try {
    const { to, amount } = parseTransfer(comment);
    const tx = {
      to,
      value: "0",
      data: "0x",
      operation: 0,
    };

    const response = await fetch("https://api.reown.com/safe/propose", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        safeAddress,
        rpcUrl,
        tx,
        description: `Auto proposal via comment to transfer ${amount} to ${to}`,
      }),
    });

    const res = await response.json();
    if (response.ok) {
      console.log("✅ Proposal created:", res);
    } else {
      console.error("❌ Proposal failed:", res);
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();