import dotenv from "dotenv";
import { ethers } from "ethers";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";

dotenv.config();

const SAFE_ADDRESS = "0x821f2b40d965b81202b181Aba1c7a380C49Ed675";
const NEW_OWNER = "0xFDf84a0e7D07bC56f7De56696fc409704cC83a24";
const TX_SERVICE_URL = "https://safe-transaction-arbitrum.safe.global";

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });
  const safeSdk = await Safe.create({ ethAdapter, safeAddress: SAFE_ADDRESS });
  const safeService = new SafeApiKit({ txServiceUrl: TX_SERVICE_URL, ethAdapter });

  const currentVersion = await safeSdk.getContractVersion();
  console.log(`🔎 Safe version: ${currentVersion}`);

  if (currentVersion !== "1.4.1") {
    const upgradeTx = await safeService.getSafeUpgradeTransaction(SAFE_ADDRESS);
    const safeTx = await safeSdk.createTransaction({ safeTransactionData: upgradeTx });
    const txHash = await safeSdk.getTransactionHash(safeTx);
    const signature = await safeSdk.signTransactionHash(txHash);

    await safeService.proposeTransaction({
      safeAddress: SAFE_ADDRESS,
      safeTransactionData: safeTx.data,
      safeTxHash: txHash,
      senderAddress: signer.address,
      senderSignature: signature.data,
    });

    console.log("✅ Upgrade proposed.");
  }

  const owners = await safeSdk.getOwners();
  if (!owners.includes(NEW_OWNER)) {
    console.log("🔄 Adding new owner...");

    const addOwnerTx = await safeSdk.createAddOwnerTx({
      ownerAddress: NEW_OWNER,
      threshold: 1,
    });

    const safeTx = await safeSdk.createTransaction({ safeTransactionData: addOwnerTx.data });
    const txHash = await safeSdk.getTransactionHash(safeTx);
    const signature = await safeSdk.signTransactionHash(txHash);

    await safeService.proposeTransaction({
      safeAddress: SAFE_ADDRESS,
      safeTransactionData: safeTx.data,
      safeTxHash: txHash,
      senderAddress: signer.address,
      senderSignature: signature.data,
    });

    console.log("✅ Owner add proposed for", NEW_OWNER);
  } else {
    console.log("✔️ Owner already exists.");
  }
}

main();
