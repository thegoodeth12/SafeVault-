import axios from 'axios';
import { ethers } from 'ethers';

export async function proposeSafeTx({ to, value, data }: {
  to: string;
  value: string;
  data: string;
}) {
  const safeAddress = process.env.SAFE_ADDRESS!;
  const serviceUrl = process.env.SAFE_SERVICE_URL!;
  const chainId = parseInt(process.env.SAFE_CHAIN_ID!, 10);

  const sender = '0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0'; // You can make this dynamic

  const tx = {
    to,
    value,
    data,
    operation: 0,
    safeTxGas: 0,
    baseGas: 0,
    gasPrice: 0,
    gasToken: ethers.constants.AddressZero,
    refundReceiver: ethers.constants.AddressZero,
    nonce: Date.now(),
  };

  const safeTxHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(tx)));

  const payload = {
    ...tx,
    safe: safeAddress,
    sender,
    contractTransactionHash: safeTxHash,
    origin: 'GitHub SafeBot',
    signature: '0x', // Signature optional for proposal
  };

  await axios.post(`${serviceUrl}/api/v1/safes/${safeAddress}/multisig-transactions/`, payload);
}
