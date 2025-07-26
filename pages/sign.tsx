import React from 'react'
import SignTxPanel from '../components/SignTxPanel'

export default function SignPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🔐 Sign Transactions</h1>
      <SignTxPanel />
    </div>
  )
}
