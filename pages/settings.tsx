import React from 'react'
import SafeSettingsPanel from '../components/SafeSettingsPanel'
import DashboardSettings from '../components/DashboardSettings'

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">⚙️ Safe Settings</h1>
      <SafeSettingsPanel />
      <DashboardSettings />
    </div>
  )
}
