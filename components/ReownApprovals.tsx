import React, { useEffect, useState } from 'react';
import { ReownAppKit, SafeTransactionDataPartial } from '@reownlabs/appkit';
import { ethers } from 'ethers';

interface ReownApprovalsProps {
  safeAddress: string;
  provider: ethers.providers.Web3Provider;
  transactions: SafeTransactionDataPartial[];
  onApprove: (txHash: string) => void;
}

export const ReownApprovals: React.FC<ReownApprovalsProps> = ({
  safeAddress,
  provider,
  transactions,
  onApprove,
}) => {
  const [appKit, setAppKit] = useState<ReownAppKit | null>(null);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const signer = provider.getSigner();
        const kit = await ReownAppKit.init({
          signer,
          safeAddress,
          chainId: await provider.getNetwork().then(net => net.chainId),
        });
        setAppKit(kit);
      } catch (e) {
        setError('Failed to initialize Reown SDK');
        console.error(e);
      }
    }
    init();
  }, [provider, safeAddress]);

  const approveTx = async (tx: SafeTransactionDataPartial) => {
    if (!appKit) return;

    setSigning(true);
    setError(null);

    try {
      // Propose and sign the transaction via MPC threshold signing
      const txHash = await appKit.signTransaction(tx);
      onApprove(txHash);
    } catch (e: any) {
      setError(e.message || 'Approval failed');
    } finally {
      setSigning(false);
    }
  };

  return (
    <div>
      <h3>Reown MPC Approval</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {transactions.length === 0 && <p>No pending transactions.</p>}
      <ul>
        {transactions.map((tx, i) => (
          <li key={i} style={{ marginBottom: 12 }}>
            <pre style={{ background: '#f0f0f0', padding: 8 }}>
              {JSON.stringify(tx, null, 2)}
            </pre>
            <button
              disabled={signing}
              onClick={() => approveTx(tx)}
              style={{ padding: '8px 12px', cursor: 'pointer' }}
            >
              {signing ? 'Signing...' : 'Approve with Reown MPC'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
