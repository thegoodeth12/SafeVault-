import React from 'react'
import OwnerManagerPanel from '../components/OwnerManagerPanel'

export default function OwnerToolsPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🛠 Owner Tools</h1>
      <OwnerManagerPanel />
    </div>
  )
}
