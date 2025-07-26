import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!(window as any).ethereum) {
      setError('MetaMask or compatible wallet not installed');
      return;
    }

    const ethProvider = new ethers.providers.Web3Provider((window as any).ethereum);

    ethProvider.send('eth_requestAccounts', []).then(accounts => {
      setProvider(ethProvider);
      setSigner(ethProvider.getSigner());
      setAddress(accounts[0]);
    }).catch((err) => {
      setError(err.message);
    });
  }, []);

  return { provider, signer, address, error };
}
