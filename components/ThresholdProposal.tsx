// components/ThresholdProposal.tsx
import { useState } from "react";
import { ethers } from "ethers";
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { useWallet } from '@/hooks/useWallet';
import { useSafeAddress } from '@/hooks/useSafeAddress';

export default function ThresholdProposal() {
  const { signer } = useWallet();
  const safeAddress = useSafeAddress();

  const [newThreshold, setNewThreshold] = useState<number>(1);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const proposeThresholdChange = async () => {
    if (!signer || !safeAddress) return alert("Missing signer or Safe address");

    setLoading(true);
    try {
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });

      const safeSdk = await Safe.create({ ethAdapter, safeAddress });

      const tx = await safeSdk.getChangeThresholdTx(newThreshold);
      const safeTxHash = await safeSdk.getTransactionHash(tx);
      setTxHash(safeTxHash);

      alert(`Threshold change proposal ready! SafeTxHash: ${safeTxHash}`);
      // Optional: Use Safe Service to propose it
    } catch (err) {
      console.error(err);
      alert("Failed to propose threshold change.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-semibold mb-2">Change Threshold</h2>
      <label className="block mb-1 text-sm font-medium">New Threshold</label>
      <input
        type="number"
        value={newThreshold}
        onChange={(e) => setNewThreshold(Number(e.target.value))}
        className="border rounded px-3 py-2 w-32"
        min={1}
      />
      <button
        onClick={proposeThresholdChange}
        disabled={loading}
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Proposing..." : "Propose Change"}
      </button>

      {txHash && (
        <p className="mt-4 text-green-600 break-words">
          Proposed SafeTxHash: <br /> <code>{txHash}</code>
        </p>
      )}
    </div>
  );
}
