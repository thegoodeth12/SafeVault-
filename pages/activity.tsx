import React from 'react'
import TransactionStatusPanel from '../components/TransactionStatusPanel'

export default function ActivityPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📜 Activity</h1>
      <TransactionStatusPanel />
    </div>
  )
}
