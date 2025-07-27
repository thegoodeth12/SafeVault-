more_files = {
    "components/SignerControls.tsx": """import React from 'react'

export default function SignerControls({ owners, threshold }) {
  return (
    <div className="bg-white p-4 border rounded shadow mb-4">
      <h3 className="text-md font-semibold mb-2">🧑‍🤝‍🧑 Owners & Threshold</h3>
      <p className="mb-1">Required confirmations: <strong>{threshold}</strong></p>
      <ul className="text-sm list-disc list-inside">
        {owners.map((owner, index) => (
          <li key={index} className="break-all">{owner}</li>
        ))}
      </ul>
    </div>
  )
}
""",

    "components/SignTransactionButton.tsx": """import React from 'react'

export default function SignTransactionButton({ onSign }) {
  return (
    <button
      onClick={onSign}
      className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
    >
      🖋️ Sign Transaction
    </button>
  )
}
""",

    "components/ExecuteTransactionButton.tsx": """import React from 'react'

export default function ExecuteTransactionButton({ onExecute }) {
  return (
    <button
      onClick={onExecute}
      className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition"
    >
      🚀 Execute Transaction
    </button>
  )
}
""",

    "lib/safeSdk.ts": """import { ethers } from 'ethers'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'

export async function getSafeSdk(signer, safeAddress, chainId) {
  const ethAdapter = new EthersAdapter({ ethers, signer })
  const safeSdk = await Safe.create({ ethAdapter, safeAddress })
  return safeSdk
}

export async function signTransaction(safeSdk, tx) {
  const safeTx = await safeSdk.createTransaction({ safeTransactionData: tx })
  const signed = await safeSdk.signTransaction(safeTx)
  return signed
}

export async function executeTransaction(safeSdk, tx) {
  const safeTx = await safeSdk.createTransaction({ safeTransactionData: tx })
  const executed = await safeSdk.executeTransaction(safeTx)
  return executed
}
"""
}

# Write the new files
for filepath, content in more_files.items():
    full_path = os.path.join(base_path, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w") as f:
        f.write(content)
