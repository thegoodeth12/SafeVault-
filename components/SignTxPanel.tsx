import React, { useEffect, useState } from 'react'
import { fetchPendingTransactions } from '../lib/safeApi'
import { useWalletClient } from 'wagmi'

export default function SignTxPanel() {
  const [pendingTxs, setPendingTxs] = useState<any[]>([])
  const { data: walletClient } = useWalletClient()

  useEffect(() => {
    const load = async () => {
      const txs = await fetchPendingTransactions()
      setPendingTxs(txs)
    }
    load()
  }, [])

  const handleSign = async (tx: any) => {
    if (!walletClient) return alert('Wallet not connected.')

    try {
      // In reality, you'd reconstruct tx hash, validate, and sign via Safe SDK
      alert(`Simulated signing tx ${tx.safeTxHash}`)
      // await walletClient.signMessage({ message: tx.safeTxHash })
    } catch (err) {
      console.error(err)
      alert('Sign error')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pending Transactions</h2>
      {pendingTxs.length === 0 && <p>No transactions to sign.</p>}
      {pendingTxs.map((tx, idx) => (
        <div key={idx} className="border rounded p-4 space-y-1">
          <p><b>Tx Hash:</b> {tx.safeTxHash}</p>
          <p><b>To:</b> {tx.to}</p>
          <p><b>Value:</b> {tx.value}</p>
          <p><b>Nonce:</b> {tx.nonce}</p>
          <button className="btn-primary" onClick={() => handleSign(tx)}>
            🖋️ Sign
          </button>
        </div>
      ))}
    </div>
  )
}
