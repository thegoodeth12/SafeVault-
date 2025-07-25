import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { OwnerThresholdManager } from '../components/OwnerThresholdManager';

const SAFE_ADDRESS = '0xYourSafeAddressHere'; // Replace with your Safe address

const OwnerThresholdPage: React.FC = () => {
  const { provider, signer, address, error } = useWallet();

  return (
    <div style={{ padding: 20 }}>
      <h1>Safe Owner & Threshold Management</h1>

      {!signer && (
        <div>
          <p>Please connect your wallet to manage Safe owners and threshold.</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}

      {signer && provider && (
        <OwnerThresholdManager
          safeAddress={SAFE_ADDRESS}
          provider={provider}
          signer={signer}
        />
      )}

      {address && (
        <p style={{ marginTop: 20 }}>
          Connected wallet: <b>{address}</b>
        </p>
      )}
    </div>
  );
};

export default OwnerThresholdPage;
