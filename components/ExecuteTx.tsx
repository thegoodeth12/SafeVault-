'use client'

import { useEffect, useState } from 'react'
import { useSafeInfo } from '../hooks/useSafeInfo'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import { ethers } from 'ethers'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'

export default function ExecuteTx() {
  const { safeAddress, provider, signer } = useSafeInfo()
  const [pendingTxs, setPendingTxs] = useState<SafeTransactionDataPartial[]>([])
  const [safeSdk, setSafeSdk] = useState<Safe | null>(null)

  useEffect(() => {
    const init = async () => {
      if (!signer || !safeAddress) return
      const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer })
      const sdk = await Safe.create({ ethAdapter, safeAddress })
      setSafeSdk(sdk)
    }
    init()
  }, [signer, safeAddress])

  const loadPendingTransactions = async () => {
    // You can connect this to Safe Transaction Service API or your own backend
    alert('You’ll fetch transactions from backend or Safe API here.')
  }

  const signAndExecute = async () => {
    if (!safeSdk) return

    // Simulate a dummy tx for now — replace with a real one later
    const txData: SafeTransactionDataPartial = {
      to: safeAddress,
      data: '0x',
      value: '0',
    }

    const safeTx = await safeSdk.createTransaction({ safeTransactionData: txData })
    const signed = await safeSdk.signTransaction(safeTx)

    const canExec = await safeSdk.executeTransaction(safeTx)
    alert('Transaction executed (or sent for execution)!')
  }

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">Execute Pending Transactions</h2>
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        onClick={signAndExecute}
      >
        Sign & Execute (Demo)
      </button>
    </div>
  )
}
