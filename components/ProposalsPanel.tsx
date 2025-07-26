'use client'
import { useEffect, useState } from 'react'

interface Proposal {
  date: string
  description: string
  status: string
  signers: string[]
}

export default function ProposalsPanel() {
  const [proposals, setProposals] = useState<Proposal[]>([])

  useEffect(() => {
    fetch('/SAFE-Dashboard/proposals.json')
      .then(res => res.json())
      .then(setProposals)
      .catch(err => console.error('Failed to load proposals:', err))
  }, [])

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📊 Proposals</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Description</th><th>Status</th><th>Signers</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((p, i) => (
            <tr key={i}>
              <td>{new Date(p.date).toLocaleString()}</td>
              <td>{p.description}</td>
              <td>{p.status}</td>
              <td>{p.signers?.join(', ') || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
