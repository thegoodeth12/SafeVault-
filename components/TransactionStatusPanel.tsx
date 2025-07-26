import React, { useEffect, useState } from 'react'

export default function TransactionStatusPanel({ safeTxHash, chainId }) {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (!safeTxHash || !chainId) return
    async function fetchStatus() {
      const url = `https://safe-transaction-${chainId}.safe.global/api/v1/multisig-transactions/${safeTxHash}`
      const res = await fetch(url)
      if (!res.ok) return
      const data = await res.json()
      setStatus(data)
    }
    fetchStatus()
  }, [safeTxHash, chainId])

  return (
    <div className="bg-white border p-4 rounded shadow mt-4">
      <h3 className="text-md font-semibold mb-3">✅ Transaction Status</h3>
      {!status ? (
        <p className="text-sm text-gray-500">Loading or no hash provided...</p>
      ) : (
        <ul className="text-sm list-disc list-inside">
          <li>Status: {status.isExecuted ? 'Executed' : 'Pending'}</li>
          <li>Confirmations: {status.confirmations?.length || 0}</li>
          <li>Nonce: {status.nonce}</li>
        </ul>
      )}
    </div>
  )
}
