const { execSync } = require("child_process");

const body = process.env.COMMENT_BODY;

if (body.startsWith("/propose-eth")) {
  execSync("node scripts/proposeETHTransfer.js", { stdio: "inherit" });
} else if (body.startsWith("/propose-token")) {
  execSync("node scripts/proposeCustomToken.js", { stdio: "inherit" });
} else {
  console.log("🔕 No matching command.");
}
