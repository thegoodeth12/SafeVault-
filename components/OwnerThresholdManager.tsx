// components/OwnerThresholdManager.tsx
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { fetchSafeOwnersAndThreshold } from '../lib/safeApi';

interface Props {
  safeAddress: string;
  provider: ethers.providers.Provider;
}

const isValidAddress = (address: string) => ethers.utils.isAddress(address);

export const OwnerThresholdManager: React.FC<Props> = ({ safeAddress, provider }) => {
  const [owners, setOwners] = useState<string[]>([]);
  const [threshold, setThreshold] = useState<number>(1);
  const [newOwner, setNewOwner] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    async function loadSafeData() {
      setLoading(true);
      setError(null);
      try {
        const { owners, threshold } = await fetchSafeOwnersAndThreshold(safeAddress, provider);
        setOwners(owners);
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
    // Placeholder: Implement transaction proposal logic here
    setSubmitting(true);
    setError(null);

    try {
      // Build and submit Safe transaction proposal
      // e.g. via Safe SDK or your backend API
      alert('Submit transaction proposal (not implemented)');
    } catch (err) {
      setError('Failed to submit transaction proposal.');
    }

    setSubmitting(false);
  };

  if (loading) return <div>Loading Safe data...</div>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Owners</h2>
      <ul>
        {owners.map(owner => (
          <li key={owner}>
            {owner} <button onClick={() => handleRemoveOwner(owner)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New owner address"
        value={newOwner}
        onChange={e => setNewOwner(e.target.value)}
      />
      <button onClick={handleAddOwner}>Add Owner</button>

      <h2>Threshold</h2>
      <input
        type="number"
        value={threshold}
        min={1}
        max={owners.length}
        onChange={e => handleThresholdChange(Number(e.target.value))}
      />

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button disabled={submitting} onClick={handleSubmit}>
        {submitting ? 'Submitting...' : 'Submit Changes'}
      </button>
    </div>
  );
};
