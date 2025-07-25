// components/DashboardSettings.tsx
import React, { useState, useEffect } from 'react'

const STORAGE_KEY = 'safe-dashboard-settings'

export default function DashboardSettings({
  safeAddress,
  setSafeAddress,
  chainId,
  setChainId,
}) {
  const [tempAddress, setTempAddress] = useState(safeAddress)
  const [tempChain, setTempChain] = useState(chainId)

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.safeAddress) setSafeAddress(parsed.safeAddress)
        if (parsed.chainId) setChainId(parsed.chainId)
        setTempAddress(parsed.safeAddress || '')
        setTempChain(parsed.chainId || 1)
      } catch (e) {
        console.error('Failed to load settings:', e)
      }
    }
  }, [])

  const applyChanges = () => {
    setSafeAddress(tempAddress)
    setChainId(tempChain)
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ safeAddress: tempAddress, chainId: tempChain })
    )
  }

  return (
    <div className="bg-gray-100 border rounded p-4 shadow w-full max-w-md">
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
        Save Settings
      </button>
    </div>
  )
}
