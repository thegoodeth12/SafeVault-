// components/ProposalQueue.tsx
import React, { useEffect, useState } from 'react'
import { fetchPendingTransactions } from '../lib/safeApi'

export default function ProposalQueue({ safeAddress, chainId }: { safeAddress: string; chainId: string }) {
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    async function loadTransactions() {
      const txs = await fetchPendingTransactions(safeAddress, chainId)
      setTransactions(txs)
    }

    loadTransactions()
  }, [safeAddress, chainId])

  if (!transactions.length) return <div className="text-center py-4">✅ No pending proposals</div>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">🧾 Proposal Queue</h2>
      {transactions.map((tx, i) => (
        <div key={i} className="border p-3 mb-2 rounded bg-white/10">
          <p><strong>Nonce:</strong> {tx.nonce}</p>
          <p><strong>To:</strong> {tx.to}</p>
          <p><strong>Value:</strong> {tx.value} ETH</p>
          <p><strong>Status:</strong> {tx.isExecuted ? 'Executed' : 'Pending'}</p>
          <p><strong>Approvals:</strong> {tx.confirmations?.length ?? 0}</p>
        </div>
      ))}
    </div>
  )
}
