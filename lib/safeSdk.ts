// lib/safeSdk.ts
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import { ethers } from 'ethers'
import SafeApiKit from '@safe-global/api-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'

export async function getSafeInstance(safeAddress: string, provider: ethers.providers.Provider, signer: ethers.Signer) {
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  })

  return await Safe.create({ ethAdapter, safeAddress })
}

export async function signSafeTx(
  safeAddress: string,
  txData: SafeTransactionDataPartial,
  signer: ethers.Signer
) {
  const safe = await getSafeInstance(safeAddress, signer.provider!, signer)
  const safeTx = await safe.createTransaction({ safeTransactionData: txData })
  const signed = await safe.signTransaction(safeTx)
  return signed
}

export async function executeSafeTx(
  safeAddress: string,
  txData: SafeTransactionDataPartial,
  signer: ethers.Signer
) {
  const safe = await getSafeInstance(safeAddress, signer.provider!, signer)
  const safeTx = await safe.createTransaction({ safeTransactionData: txData })
  const executed = await safe.executeTransaction(safeTx)
  return executed
}
