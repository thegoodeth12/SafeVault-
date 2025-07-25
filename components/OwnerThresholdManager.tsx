import React, { useEffect, useState } from 'react';
import { ethers, Signer, providers } from 'ethers';
import Safe, { SafeTransaction } from '@safe-global/safe-core-sdk';
import EthersAdapter from '@safe-global/safe-ethers-lib';
import { fetchSafeOwnersAndThreshold } from '../lib/safeApi';
import { buildOwnerChangeTxs } from '../lib/safeOwnerTxs';

interface Props {
  safeAddress: string;
  provider: providers.Provider;
  signer: Signer | null;
}

const isValidAddress = (address: string) => ethers.utils.isAddress(address);

export const OwnerThresholdManager: React.FC<Props> = ({ safeAddress, provider, signer }) => {
  const [owners, setOwners] = useState<string[]>([]);
  const [originalOwners, setOriginalOwners] = useState<string[]>([]);
  const [threshold, setThreshold] = useState<number>(1);
  const [newOwner, setNewOwner] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    async function loadSafeData() {
      setLoading(true);
      setError(null);
      try {
        const { owners, threshold } = await fetchSafeOwnersAndThreshold(safeAddress, provider);
        setOwners(owners);
        setOriginalOwners(owners);
        setThreshold(threshold);
      } catch (err) {
        setError('Failed to load Safe data.');
      }
      setLoading(false);
    }
    loadSafeData();
  }, [safeAddress, provider]);

  const handleAddOwner = () => {
    if (!isValidAddress(newOwner)) {
      setError('Invalid Ethereum address.');
      return;
    }
    if (owners.includes(newOwner)) {
      setError('Owner already exists.');
      return;
    }
    setOwners([...owners, newOwner]);
    setNewOwner('');
    setError(null);
  };

  const handleRemoveOwner = (address: string) => {
    if (owners.length <= 1) {
      setError('Cannot remove the last owner.');
      return;
    }
    setOwners(owners.filter(o => o !== address));
    if (threshold > owners.length - 1) {
      setThreshold(owners.length - 1);
    }
    setError(null);
  };

  const handleThresholdChange = (value: number) => {
    if (value < 1 || value > owners.length) {
      setError('Threshold must be between 1 and the number of owners.');
      return;
    }
    setThreshold(value);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!signer) {
      setError('Wallet not connected');
      return;
    }

    setSubmitting(true);
    setError(null);
    setTxHash(null);

    try {
      const ethAdapter = new EthersAdapter({ ethers, signer });
      const safeSdk = await Safe.create({ ethAdapter, safeAddress });

      // Build multi-send transactions to update owners and threshold
      const txs = await buildOwnerChangeTxs(safeAddress, originalOwners, owners, threshold);

      if (txs.length === 0) {
        setError('No changes to submit.');
        setSubmitting(false);
        return;
      }

      // Create a multi-send transaction
      const multiSendTx = await safeSdk.createTransaction(txs);

      // Sign transaction
      const signedTx = await safeSdk.signTransaction(multiSendTx);

      // Execute transaction
      const txResponse = await safeSdk.executeTransaction(signedTx);
      await txResponse.transactionResponse?.wait();

      setTxHash(txResponse.hash || null);
      alert('Transaction submitted successfully!');
      setOriginalOwners(owners);
    } catch (err: any) {
      setError(err.message || 'Failed to submit transaction.');
    }

    setSubmitting(false);
  };

  if (loading) return <div>Loading Safe data...</div>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Manage Safe Owners & Threshold</h2>

      <div>
        <h3>Current Owners</h3>
        <ul>
          {owners.map(owner => (
            <li key={owner}>
              {owner}{' '}
              <button
                onClick={() => {
                  if (window.confirm(`Remove owner ${owner}?`)) {
                    handleRemoveOwner(owner);
                  }
                }}
                disabled={submitting}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <input
          type="text"
          placeholder="New owner address"
          value={newOwner}
          onChange={e => setNewOwner(e.target.value)}
          disabled={submitting}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <button onClick={handleAddOwner} disabled={submitting || !newOwner}>
          Add Owner
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Threshold</h3>
        <input
          type="number"
          value={threshold}
          min={1}
          max={owners.length}
          onChange={e => handleThresholdChange(Number(e.target.value))}
          disabled={submitting}
          style={{ width: 100 }}
        />
        <div style={{ fontSize: 12, color: 'gray' }}>
          Must be between 1 and {owners.length}
        </div>
      </div>

      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        style={{ marginTop: 20, padding: '8px 16px' }}
      >
        {submitting ? 'Submitting...' : 'Submit Changes'}
      </button>

      {txHash && (
        <div style={{ marginTop: 12 }}>
          Transaction Hash:{' '}
          <a
            href={`https://etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {txHash}
          </a>
        </div>
      )}
    </div>
  );
};
