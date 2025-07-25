// pages/propose.tsx
import { useEffect, useState } from "react";
import { useWallet } from "../components/WalletStatus";
import SafeApiKit from "@safe-global/api-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";

export default function ProposePage() {
  const { signer, address } = useWallet();
  const [safeAddress, setSafeAddress] = useState("");
  const [target, setTarget] = useState("");
  const [data, setData] = useState("");
  const [value, setValue] = useState("0");
  const [message, setMessage] = useState("");

  async function proposeTx() {
    if (!signer || !ethers.utils.isAddress(safeAddress)) {
      setMessage("Invalid signer or Safe address");
      return;
    }

    setMessage("Preparing transaction...");

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });

    const safeSdk = await Safe.create({
      ethAdapter,
      safeAddress,
    });

    const tx = await safeSdk.createTransaction({
      safeTransactionData: {
        to: target,
        value: ethers.utils.parseEther(value).toString(),
        data,
      },
    });

    const safeTxHash = await safeSdk.getTransactionHash(tx);
    const signature = await safeSdk.signTransactionHash(safeTxHash);

    const safeService = new SafeApiKit({
      txServiceUrl: "https://safe-transaction-mainnet.safe.global", // change per chain
      ethAdapter,
    });

    await safeService.proposeTransaction({
      safeAddress,
      safeTransactionData: tx.data,
      safeTxHash,
      senderAddress: address!,
      senderSignature: signature.data,
    });

    setMessage("Transaction proposed 🎉");
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Propose Safe Transaction</h1>

      <input
        type="text"
        placeholder="Safe Address"
        value={safeAddress}
        onChange={(e) => setSafeAddress(e.target.value)}
        className="w-full border p-2"
      />
      <input
        type="text"
        placeholder="Target Address"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="w-full border p-2"
      />
      <input
        type="text"
        placeholder="Value in ETH"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border p-2"
      />
      <textarea
        placeholder="Calldata (0x...)"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full border p-2 h-32"
      />
      <button
        onClick={proposeTx}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Propose
      </button>
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
}
