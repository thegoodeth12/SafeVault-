// utils/multisendBuilder.ts

import { SafeTransactionDataPartial, encodeMultiSendData, MetaTransactionData } from '@safe-global/safe-core-sdk-types'
import { SafeAccountConfig } from '@safe-global/protocol-kit'
import Safe from '@safe-global/protocol-kit'
import { ethers } from 'ethers'

/**
 * Build a multiSend Safe transaction that:
 * - Removes an old owner
 * - Adds a new owner
 * - Updates the threshold
 */
export async function buildOwnerRotationTx(
  safe: Safe,
  oldOwner: string,
  newOwner: string,
  newThreshold: number
) {
  const safeAddress = await safe.getAddress()

  // Remove old owner
  const removeOwnerTx: MetaTransactionData = {
    to: safeAddress,
    value: '0',
    data: safe.encodeRemoveOwnerTx({
      ownerAddress: oldOwner,
      threshold: newThreshold,
    }),
    operation: 0,
  }

  // Add new owner
  const addOwnerTx: MetaTransactionData = {
    to: safeAddress,
    value: '0',
    data: safe.encodeAddOwnerTx({
      ownerAddress: newOwner,
      threshold: newThreshold,
    }),
    operation: 0,
  }

  // MultiSend batch encode
  const multiSendData = encodeMultiSendData([removeOwnerTx, addOwnerTx])

  // Wrap in a single transaction
  const multiSendTx: SafeTransactionDataPartial = {
    to: safe.getMultiSendAddress(),
    data: multiSendData,
    value: '0',
  }

  return safe.createTransaction({ safeTransactionData: multiSendTx })
}
