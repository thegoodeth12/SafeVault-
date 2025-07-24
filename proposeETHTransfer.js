const fetch = require("node-fetch");
const { ethers } = require("ethers");

const comment = process.env.COMMENT_BODY;
const commentUrl = process.env.COMMENT_URL;
const safeAddress = process.env.SAFE_ADDRESS;
const rpcUrl = process.env.SAFE_RPC_URL;
const apiKey = process.env.REOWN_API_KEY;
const githubToken = process.env.GITHUB_TOKEN;

const parseComment = (input) => {
  const parts = input.trim().split(/\s+/);
  if (parts.length !== 3) throw new Error("Format: /propose-eth 0xRecipient 0.5");
  const [, to, amount] = parts;
  return { to, amount };
};

(async () => {
  try {
    const { to, amount } = parseComment(comment);
    const ethValue = ethers.utils.parseEther(amount);

    const tx = {
      to,
      value: ethValue.toString(),
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
        description: `Send ${amount} ETH to ${to}`,
      }),
    });

    const res = await response.json();
    let message;
    if (response.ok) {
      const explorerUrl = `https://app.safe.global/transactions/queue?safe=${safeAddress}`;
      message = `✅ **ETH Proposal Created**\nSend **${amount} ETH** to \`${to}\`\n[🔗 View in Safe](<${explorerUrl}>)`;
    } else {
      message = `❌ **Proposal Failed**\nReason: ${res.message || "Unknown error"}`;
    }

    await fetch(commentUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: message }),
    });

    console.log("📢 Comment posted back to GitHub");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();