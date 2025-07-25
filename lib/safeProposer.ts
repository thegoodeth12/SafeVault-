import { ethers } from 'ethers';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types';

export async function createSafeProposer(signer: ethers.Wallet, safeAddress: string, rpcUrl: string) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const connectedSigner = signer.connect(provider);
  const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: connectedSigner });

  const safeSdk = await Safe.create({ ethAdapter, safeAddress });
  return safeSdk;
}

export async function proposeTx(safeSdk: Safe, txData: SafeTransactionDataPartial) {
  const safeTx = await safeSdk.createTransaction({ safeTransactionData: txData });
  const txHash = await safeSdk.getTransactionHash(safeTx);
  await safeSdk.signTransaction(safeTx);
  console.log('✅ Proposed Safe transaction with hash:', txHash);
}
