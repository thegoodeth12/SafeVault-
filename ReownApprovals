import { ReownApprovals } from './ReownApprovals';
import { ethers } from 'ethers';

// ... inside your SafeWallet app component:
const provider = new ethers.providers.Web3Provider(window.ethereum);
const [pendingTxs, setPendingTxs] = React.useState<SafeTransactionDataPartial[]>([]);

// Function to handle approval callback
const handleApprove = (txHash: string) => {
  console.log('Transaction approved via Reown MPC:', txHash);
  // Update UI, fetch updated safe status, etc.
};

return (
  <ReownApprovals
    safeAddress={yourSafeAddress}
    provider={provider}
    transactions={pendingTxs}
    onApprove={handleApprove}
  />
);
