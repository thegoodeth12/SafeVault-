import React, { useState } from 'react';
import { ProposalQueue } from './ProposalQueue';
import { ReownApprovals } from './ReownApprovals'; // From earlier step

const YourSafeVaultApp = ({ safeAddress, provider }) => {
  const [pendingTxs, setPendingTxs] = React.useState<SafeTransactionDataPartial[]>([]);
  const [selectedTx, setSelectedTx] = useState<SafeTransactionDataPartial | null>(null);

  // Example: fetch pendingTxs from your backend or Safe API and update state accordingly

  return (
    <div>
      <ProposalQueue transactions={pendingTxs} onSelect={setSelectedTx} />
      {selectedTx && (
        <ReownApprovals
          safeAddress={safeAddress}
          provider={provider}
          transactions={[selectedTx]}
          onApprove={(txHash) => {
            alert(`Approved! Transaction hash: ${txHash}`);
            setSelectedTx(null);
            // Refresh pendingTxs here if needed
          }}
        />
      )}
    </div>
  );
};
