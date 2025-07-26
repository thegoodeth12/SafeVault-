import React, { useState } from 'react'

export default function SafeSettingsPanel({ onUpdate }) {
  const [address, setAddress] = useState('')
  const [chainId, setChainId] = useState('1') // Default to Ethereum Mainnet

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate({ address, chainId })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-4 rounded shadow mb-4">
      <h3 className="text-md font-semibold mb-3">⚙️ Safe Settings</h3>
      <div className="flex flex-col space-y-2">
        <label className="text-sm">Safe Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
          className="border px-2 py-1 rounded"
        />
        <label className="text-sm">Chain ID</label>
        <input
          type="text"
          value={chainId}
          onChange={(e) => setChainId(e.target.value)}
          placeholder="e.g. 1 for Mainnet, 42161 for Arbitrum"
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded mt-2">
          Update Safe Context
        </button>
      </div>
    </form>
  )
}
