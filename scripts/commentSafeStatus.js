const fetch = require("node-fetch");

const token = process.env.GITHUB_TOKEN;
const safeAddress = process.env.SAFE_ADDRESS;
const repo = process.env.GITHUB_REPOSITORY;
const prNumber = process.env.GITHUB_REF.split("/")[2];

const body = `
🔐 **Safe Wallet Status**
- Address: ${safeAddress}
- Threshold: 2
- Owners: 3
- Network: Arbitrum

✅ Ready for signing or proposing new transactions.
`;

async function postComment() {
  const url = `https://api.github.com/repos/${repo}/issues/${prNumber}/comments`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: \`token \${token}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
  });

  const data = await res.json();
  if (res.ok) {
    console.log("✅ Comment posted:", data.html_url);
  } else {
    console.error("❌ Failed to post comment:", data);
  }
}

postComment();
