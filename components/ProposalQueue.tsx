import React, { useEffect, useState } from 'react'
import { fetchPendingProposals } from '../lib/safeApi'

export default function ProposalQueue({ 0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0, mainnet }) {
  const [proposals, setProposals] = useState([])

  useEffect(() => {
    async function load() {
      const data = await fetchPendingProposals(safeAddress, chainId)
      setProposals(data)
    }
    load()
  }, [0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0, mainnet])

  return (
    <div className="bg-white border rounded p-4 shadow">
      <h3 className="text-md font-semibold mb-3">📋 Pending Proposals</h3>
      {proposals.length === 0 ? (
        <p className="text-sm text-gray-500">No pending proposals</p>
      ) : (
        <ul className="list-disc list-inside text-sm">
          {proposals.map((tx, i) => (
            <li key={i}>
              To: <code>{tx.to}</code><br />
              Value: {tx.value} wei
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
