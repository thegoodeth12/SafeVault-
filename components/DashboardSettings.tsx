// components/DashboardSettings.tsx
import React, { useState } from 'react'

export default function DashboardSettings({
  safeAddress,
  setSafeAddress,
  chainId,
  setChainId,
}) {
  const [tempAddress, setTempAddress] = useState(safeAddress)
  const [tempChain, setTempChain] = useState(chainId)

  const applyChanges = () => {
    setSafeAddress(tempAddress)
    setChainId(tempChain)
  }

  return (
    <div className="bg-gray-50 border rounded p-4 shadow w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2">⚙️ Dashboard Settings</h2>

      <label className="block text-sm font-medium mb-1">Safe Address</label>
      <input
        className="w-full px-2 py-1 mb-3 border rounded"
        value={tempAddress}
        onChange={(e) => setTempAddress(e.target.value)}
        placeholder="0x..."
      />

      <label className="block text-sm font-medium mb-1">Chain</label>
      <select
        className="w-full px-2 py-1 mb-3 border rounded"
        value={tempChain}
        onChange={(e) => setTempChain(Number(e.target.value))}
      >
        <option value={1}>Ethereum Mainnet</option>
        <option value={42161}>Arbitrum</option>
        <option value={137}>Polygon</option>
        <option value={100}>Gnosis Chain</option>
      </select>

      <button
        className="bg-blue-600 text-white px-4 py-1 rounded"
        onClick={applyChanges}
      >
        Apply Changes
      </button>
    </div>
  )
}
