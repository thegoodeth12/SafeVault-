const { ethers } = require("ethers");

const rpcUrl = process.env.SAFE_RPC_URL;
const safeAddress = process.env.SAFE_ADDRESS;

const SAFE_ABI = [
  "function getThreshold() view returns (uint256)",
  "function getOwners() view returns (address[])"
];

(async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(safeAddress, SAFE_ABI, provider);

    const threshold = await contract.getThreshold();
    const owners = await contract.getOwners();

    console.log("🔐 Safe Info");
    console.log("👥 Owners:", owners);
    console.log("🛡 Threshold:", threshold);
  } catch (error) {
    console.error("❌ Error reading Safe data:", error.message);
  }
})();
