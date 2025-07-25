// utils/fetchPendingTransactions.ts
import axios from 'axios';
import { SafeTransactionDataPartial } from '@reownlabs/appkit';

export async function fetchPendingTransactions(
  safeAddress: string,
  chainId: number
): Promise<SafeTransactionDataPartial[]> {
  const chainPrefix = getTxServicePrefix(chainId);
  const url = `https://safe-transaction-${chainPrefix}.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/?executed=false&nonce__gte=0`;

  const res = await axios.get(url);

  // Filter only unexecuted and unconfirmed transactions
  const pending = res.data.results.filter((tx: any) => !tx.isExecuted);

  return pending.map((tx: any) => ({
    to: tx.to,
    value: tx.value,
    data: tx.data,
    operation: tx.operation,
    nonce: tx.nonce,
    safeTxGas: tx.safeTxGas,
    baseGas: tx.baseGas,
    gasPrice: tx.gasPrice,
    gasToken: tx.gasToken,
    refundReceiver: tx.refundReceiver,
    signatures: tx.signatures,
  }));
}

function getTxServicePrefix(chainId: number): string {
  switch (chainId) {
    case 1:
      return 'mainnet';
    case 5:
      return 'goerli';
    case 100:
      return 'gnosis';
    case 137:
      return 'polygon';
    case 42161:
      return 'arbitrum';
    default:
      throw new Error(`Unsupported chainId: ${chainId}`);
  }
}
