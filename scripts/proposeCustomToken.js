const fetch = require("node-fetch");
const { ethers } = require("ethers");

const comment = process.env.COMMENT_BODY;
const commentUrl = process.env.COMMENT_URL;
const safeAddress = process.env.SAFE_ADDRESS;
const rpcUrl = process.env.SAFE_RPC_URL;
const apiKey = process.env.REOWN_API_KEY;
const githubToken = process.env.GITHUB_TOKEN;

const ERC20_ABI = [
  "function transfer(address to, uint256 amount)",
  "function decimals() view returns (uint8)"
];

const parseComment = (input) => {
  const parts = input.trim().split(/\s+/);
  if (parts.length !== 4) throw new Error("Format: /propose-token 0xToken 0xTo 100");
  const [, token, to, amount] = parts;
  return { token, to, amount };
};

(async () => {
  try {
    const { token, to, amount } = parseComment(comment);
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(token, ERC20_ABI, provider);

    let decimals = 18;
    try {
      decimals = await contract.decimals();
    } catch {
      console.warn("⚠️ Could not fetch decimals, defaulting to 18");
    }

    const iface = new ethers.utils.Interface(ERC20_ABI);
    const data = iface.encodeFunctionData("transfer", [
      to,
      ethers.utils.parseUnits(amount, decimals),
    ]);

    const tx = {
      to: token,
      value: "0",
      data,
      operation: 0,
    };

    const response = await fetch("https://api.reown.com/safe/propose", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        safeAddress,
        rpcUrl,
        tx,
        description: `Send ${amount} tokens from ${token} to ${to}`,
      }),
    });

    const res = await response.json();
    const explorerUrl = `https://app.safe.global/transactions/queue?safe=${safeAddress}`;

    const message = response.ok
      ? `✅ **Proposal Created**\\nSend **${amount} tokens** to \`${to}\` from \`${token}\`\\n[🔗 View in Safe](<${explorerUrl}>)`
      : `❌ **Proposal Failed**\\nReason: ${res.message || "Unknown error"}`;

    await fetch(commentUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: message }),
    });

    console.log("📢 GitHub comment posted.");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
