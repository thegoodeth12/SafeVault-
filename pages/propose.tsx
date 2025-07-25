// pages/propose.tsx

import { useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import { buildSafeTransaction, sendSafeTransaction } from '../lib/safeSdk'

export default function ProposeTransaction() {
  const { safeAddress, signerAddress } = useWallet()
  const [to, setTo] = useState('')
  const [value, setValue] = useState('')
  const [data, setData] = useState('')
  const [status, setStatus] = useState('')

  const handlePropose = async () => {
    try {
      setStatus('Preparing proposal...')
      const tx = await buildSafeTransaction(safeAddress, {
        to,
        value: value || '0',
        data: data || '0x',
      })
      await sendSafeTransaction(safeAddress, tx)
      setStatus('✅ Proposal submitted!')
    } catch (err) {
      console.error(err)
      setStatus('❌ Error submitting proposal.')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">📝 Propose Transaction</h1>

      <label className="block mb-2 font-medium">Recipient Address</label>
      <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="0x..."
        className="w-full px-3 py-2 mb-4 border rounded"
      />

      <label className="block mb-2 font-medium">Value (ETH)</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. 0.01"
        className="w-full px-3 py-2 mb-4 border rounded"
      />

      <label className="block mb-2 font-medium">Data (hex)</label>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Optional calldata (e.g. for contract call)"
        className="w-full px-3 py-2 mb-4 border rounded"
      />

      <button
        onClick={handlePropose}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        🚀 Submit Proposal
      </button>

      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  )
}
