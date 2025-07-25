// components/SignerControls.tsx
import React from 'react'
import { useWallet } from '../hooks/useWallet'

export default function SignerControls() {
  const { address, isConnected, connect, disconnect } = useWallet()

  return (
    <div className="bg-white shadow rounded p-4 w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-2">Wallet Connection</h2>
      {isConnected ? (
        <div>
          <p className="text-sm text-gray-600">Connected as:</p>
          <p className="font-mono text-sm mb-2">{address}</p>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}
