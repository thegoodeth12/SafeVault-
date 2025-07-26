// components/SettingsPanel.tsx

import { useState } from 'react'

export default function SettingsPanel() {
  const [testnetMode, setTestnetMode] = useState(false)
  const [slackOn, setSlackOn] = useState(true)
  const [githubBot, setGitHubBot] = useState(true)

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={testnetMode} onChange={() => setTestnetMode(!testnetMode)} />
          Block Testnet Transactions
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={slackOn} onChange={() => setSlackOn(!slackOn)} />
          Slack Notifications
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={githubBot} onChange={() => setGitHubBot(!githubBot)} />
          GitHub Integration
        </label>
      </div>
    </div>
  )
}
