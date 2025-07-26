// components/ProposeTx.tsx
import { useState } from "react";
import { ethers } from "ethers";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import SafeServiceClient from "@safe-global/safe-service-client";
import { useSafeAddress } from "@/hooks/useSafeAddress";
import { useWallet } from "@/hooks/useWallet";

const txServiceUrl = "https://safe-transaction-arbitrum.safe.global"; // Or mainnet

export default function ProposeTx() {
  const [to, setTo] = useState("");
  const [value, setValue] = useState("0");
  const [data, setData] = useState("0x");
  const [submittedHash, setSubmittedHash] = useState("");
  const [loading, setLoading] = useState(false);

  const { signer } = useWallet();
  const safeAddress = useSafeAddress();

  const handlePropose = async () => {
    if (!signer || !safeAddress) return alert("Missing signer or Safe address");
    setLoading(true);

    try {
      const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });
      const safeSdk = await Safe.create({ ethAdapter, safeAddress });
      const service = new SafeServiceClient({ txServiceUrl, ethAdapter });

      const txData: SafeTransactionDataPartial = {
        to,
        value,
        data,
      };

      const safeTx = await safeSdk.createTransaction({ safeTransactionData: txData });
      const signed = await safeSdk.signTransaction(safeTx);
      const safeTxHash = await safeSdk.getTransactionHash(signed);

      await service.proposeTransaction({
        safeAddress,
        safeTransactionData: signed.data,
        safeTxHash,
        senderAddress: await signer.getAddress(),
        senderSignature: signed.signatures.get(await signer.getAddress())!.data,
      });

      setSubmittedHash(safeTxHash);
    } catch (e) {
      console.error("Error proposing transaction:", e);
      alert("Failed to propose transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h2 className="text-xl font-semibold mb-2">Propose Transaction</h2>

      <input
        type="text"
        placeholder="Recipient (to)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3"
      />
      <input
        type="text"
        placeholder="ETH value (in wei)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3"
      />
      <textarea
        placeholder="Calldata (optional)"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3"
        rows={4}
      />
      <button
        onClick={handlePropose}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Proposing..." : "Propose Transaction"}
      </button>

      {submittedHash && (
        <div className="mt-4 text-green-700">
          <p>Transaction proposed!</p>
          <code className="break-words">{submittedHash}</code>
        </div>
      )}
    </div>
  );
}
