import { useEffect, useState } from "react";
import { useWallet } from "../components/WalletStatus";
import { getSafeDetails } from "../utils/safeTools";

export default function SettingsPage() {
  const { address, chainId } = useWallet();
  const [safeInfo, setSafeInfo] = useState<any>(null);

  useEffect(() => {
    if (address && chainId) {
      getSafeDetails(address, chainId).then(setSafeInfo);
    }
  }, [address, chainId]);

  if (!safeInfo) return <div>Loading Safe Info...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🔐 Safe Settings</h1>
      <p><strong>Safe Address:</strong> {address}</p>
      <p><strong>Network:</strong> {chainId}</p>
      <p><strong>Threshold:</strong> {safeInfo.threshold}</p>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Owners:</h2>
        <ul className="list-disc pl-6">
          {safeInfo.owners.map((owner: string, idx: number) => (
            <li key={idx}>{owner}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
