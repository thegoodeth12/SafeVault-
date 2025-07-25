import React, { useState } from 'react'

export default function OwnerManagerPanel() {
  const [action, setAction] = useState<'add' | 'remove' | 'threshold'>('add')

  return (
    <div className="border p-4 rounded shadow space-y-4">
      <div className="flex gap-4">
        <button onClick={() => setAction('add')} className="btn">
          ➕ Add Owner
        </button>
        <button onClick={() => setAction('remove')} className="btn">
          ➖ Remove Owner
        </button>
        <button onClick={() => setAction('threshold')} className="btn">
          🔁 Change Threshold
        </button>
      </div>

      {action === 'add' && <AddOwnerForm />}
      {action === 'remove' && <RemoveOwnerForm />}
      {action === 'threshold' && <ChangeThresholdForm />}
    </div>
  )
}

function AddOwnerForm() {
  return (
    <form className="space-y-2">
      <label>New Owner Address:</label>
      <input type="text" className="input" placeholder="0x..." />
      <button type="submit" className="btn-primary">Propose Add Owner</button>
    </form>
  )
}

function RemoveOwnerForm() {
  return (
    <form className="space-y-2">
      <label>Owner to Remove:</label>
      <input type="text" className="input" placeholder="0x..." />
      <button type="submit" className="btn-danger">Propose Remove Owner</button>
    </form>
  )
}

function ChangeThresholdForm() {
  return (
    <form className="space-y-2">
      <label>New Threshold:</label>
      <input type="number" min={1} className="input" />
      <button type="submit" className="btn-secondary">Propose Threshold Change</button>
    </form>
  )
}
