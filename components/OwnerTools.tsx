// components/OwnerTools.tsx

import { useState } from 'react'
import { SafeAccountConfig, buildSafeTransaction, sendSafeTransaction } from '../lib/safeSdk'

interface OwnerToolsProps {
  safeAddress: string
  currentOwners: string[]
  currentThreshold: number
}

export default function OwnerTools({ safeAddress, currentOwners, currentThreshold }: OwnerToolsProps) {
  const [newOwner, setNewOwner] = useState('')
  const [ownerToRemove, setOwnerToRemove] = useState('')
  const [threshold, setThreshold] = useState(currentThreshold)
  const [status, setStatus] = useState('')

  const handleAddOwner = async () => {
    try {
      setStatus('Preparing transaction...')
      const config: SafeAccountConfig = {
        owners: [...currentOwners, newOwner],
        threshold,
      }
      const tx = await buildSafeTransaction(safeAddress, config)
      await sendSafeTransaction(safeAddress, tx)
      setStatus('✅ Add owner transaction submitted.')
    } catch (err) {
      console.error(err)
      setStatus('❌ Error adding owner.')
    }
  }

  const handleRemoveOwner = async () => {
    try {
      setStatus('Preparing transaction...')
      const config: SafeAccountConfig = {
        owners: currentOwners.filter((addr) => addr.toLowerCase() !== ownerToRemove.toLowerCase()),
        threshold,
      }
      const tx = await buildSafeTransaction(safeAddress, config)
      await sendSafeTransaction(safeAddress, tx)
      setStatus('✅ Remove owner transaction submitted.')
    } catch (err) {
      console.error(err)
      setStatus('❌ Error removing owner.')
    }
  }

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">🔐 Owner Management</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">New Owner Address</label>
        <input
          type="text"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="0x..."
        />
        <button onClick={handleAddOwner} className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md">
          ➕ Add Owner
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Owner Address to Remove</label>
        <input
          type="text"
          value={ownerToRemove}
          onChange={(e) => setOwnerToRemove(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="0x..."
        />
        <button onClick={handleRemoveOwner} className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md">
          ❌ Remove Owner
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Threshold</label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
          min={1}
          max={currentOwners.length + 1}
        />
      </div>

      <div className="text-sm text-gray-600">{status}</div>
    </div>
  )
}
