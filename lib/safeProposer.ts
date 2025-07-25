// lib/safeProposer.ts
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import { ethers } from 'ethers'

export async function proposeTransaction({
  safeAddress,
  signer,
  txData,
  rpcUrl
}: {
  safeAddress: string
  signer: ethers.Signer
  txData: SafeTransactionDataPartial
  rpcUrl: string
}) {
  const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer })
  const safeSdk = await Safe.create({ ethAdapter, safeAddress })

  const safeService = new SafeApiKit({
    txServiceUrl: 'https://safe-transaction-arbitrum.safe.global',
    ethAdapter
  })

  const safeTx = await safeSdk.createTransaction({ safeTransactionData: txData })

  const senderAddress = await signer.getAddress()
  const safeTxHash = await safeSdk.getTransactionHash(safeTx)
  const signature = await safeSdk.signTransactionHash(safeTxHash)

  await safeService.proposeTransaction({
    safeAddress,
    safeTransactionData: safeTx.data,
    safeTxHash,
    senderAddress,
    senderSignature: signature.data
  })

  return { safeTxHash }
}
