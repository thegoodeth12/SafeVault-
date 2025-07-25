// components/ProposeTransactionForm.tsx
'use client'

import { useState } from 'react'

export default function ProposeTransactionForm() {
  const [to, setTo] = useState('')
  const [value, setValue] = useState('')
  const [data, setData] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const safeTx = {
        to,
        value,
        data,
      }

      // TODO: connect to Safe SDK or backend API
      console.log('Proposing tx:', safeTx)
      alert('Proposal submitted (mocked)')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">To</label>
        <input
          type="text"
          className="w-full border p-2"
          placeholder="0x..."
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium">Value (ETH)</label>
        <input
          type="text"
          className="w-full border p-2"
          placeholder="0.1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium">Data (hex)</label>
        <input
          type="text"
          className="w-full border p-2"
          placeholder="0x..."
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Proposal
      </button>
    </form>
  )
}
