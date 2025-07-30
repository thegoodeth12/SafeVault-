import { ethers } from 'ethers';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { SafeFactory } from '@safe-global/protocol-kit';

export async function getSafeInfo(safeAddress: string) {
  const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc'); // or mainnet
  const signer = ethers.Wallet.createRandom().connect(provider); // read-only

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  const safe = await Safe.create({ ethAdapter, safeAddress });

  const [owners, threshold] = await Promise.all([
    safe.getOwners(),
    safe.getThreshold(),
  ]);

  const balance = await provider.getBalance(safeAddress);
  const eth = ethers.utils.formatEther(balance);

  return {
    address: safeAddress,
    network: 'Arbitrum One',
    owners,
    threshold,
    balance: eth,
  };
}
