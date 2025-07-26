const fetch = require("node-fetch");
const { ethers } = require("ethers");

const comment = process.env.COMMENT_BODY;
const safeAddress = process.env.SAFE_ADDRESS;
const rpcUrl = process.env.SAFE_RPC_URL;
const apiKey = process.env.REOWN_API_KEY;
const telegramToken = process.env.TELEGRAM_TOKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;

const ERC20_ABI = [
  "function transfer(address to, uint256 amount)",
  "function decimals() view returns (uint8)"
];

const parseCommand = (body) => {
  const parts = body.trim().split(/\s+/);
  if (parts[0] === "/propose-eth" && parts.length === 3) {
    return { type: "eth", to: parts[1], amount: parts[2] };
  } else if (parts[0] === "/propose-token" && parts.length === 4) {
    return { type: "token", token: parts[1], to: parts[2], amount: parts[3] };
  } else {
    throw new Error("Invalid command format.");
  }
};

(async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const { type, token, to, amount } = parseCommand(comment);

    let tx = {};
    let description = "";

    if (type === "eth") {
      const ethValue = ethers.utils.parseEther(amount);
      tx = { to, value: ethValue.toString(), data: "0x", operation: 0 };
      description = `Send ${amount} ETH to ${to}`;
    } else {
      const contract = new ethers.Contract(token, ERC20_ABI, provider);
      let decimals = 18;
      try {
        decimals = await contract.decimals();
      } catch {}
      const iface = new ethers.utils.Interface(ERC20_ABI);
      const data = iface.encodeFunctionData("transfer", [
        to,
        ethers.utils.parseUnits(amount, decimals),
      ]);
      tx = { to: token, value: "0", data, operation: 0 };
      description = `Send ${amount} tokens from ${token} to ${to}`;
    }

    // Preview
    await provider.call({
      to: tx.to,
      data: tx.data,
      value: tx.value,
    });

    // Propose via Reown
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
        description
      })
    });

    const explorerUrl = `https://app.safe.global/transactions/queue?safe=${safeAddress}`;

    // Send Telegram alert
    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: `🔐 Safe Proposal Triggered\\n${description}`,
        parse_mode: "Markdown"
      })
    });

    console.log("📨 Telegram alert sent.");
  } catch (err) {
    console.error("⚠️ Error:", err.message);
  }
})();
