// lib/useWallet.ts
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const loadWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signerInstance = provider.getSigner();
        const addr = await signerInstance.getAddress();
        setSigner(signerInstance);
        setAddress(addr);
      }
    };

    loadWallet().catch(console.error);
  }, []);

  return { signer, address };
}
