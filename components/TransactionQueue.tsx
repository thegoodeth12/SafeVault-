// components/TransactionQueue.tsx

import { useEffect, useState } from 'react'
import { getPendingTransactions } from '@/lib/safeApi'

export default function TransactionQueue({ safeAddress }: { safeAddress: string }) {
  const [txs, setTxs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTxs() {
      setLoading(true)
      const data = await getPendingTransactions(safeAddress)
      setTxs(data)
      setLoading(false)
    }
    if (safeAddress) fetchTxs()
  }, [safeAddress])

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Pending Transactions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : txs.length === 0 ? (
        <p>No pending transactions.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {txs.map((tx, i) => (
            <li key={i} className="py-2 text-sm">
              <div>Nonce: {tx.nonce}</div>
              <div>To: {tx.to}</div>
              <div>Value: {tx.value}</div>
              <div className="text-xs text-gray-500">TxHash: {tx.safeTxHash}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
