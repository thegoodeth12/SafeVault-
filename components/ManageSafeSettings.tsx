// components/ManageSafeSettings.tsx
"use client"

import { useState, useEffect } from "react"
import Safe, { EthersAdapter } from "@safe-global/protocol-kit"
import { ethers } from "ethers"
import { SafeFactory } from "@safe-global/protocol-kit"
import { useWalletClient } from "wagmi"
import { getSafeService } from "@/utils/safe-service"
import { getSafeSdk } from "@/utils/safe-sdk"

type Props = {
  safeAddress: string
}

export const ManageSafeSettings = ({ safeAddress }: Props) => {
  const { data: walletClient } = useWalletClient()
  const [newThreshold, setNewThreshold] = useState("")
  const [owners, setOwners] = useState<string[]>([])
  const [currentThreshold, setCurrentThreshold] = useState<number>(0)
  const [status, setStatus] = useState("")

  useEffect(() => {
    const loadSafeData = async () => {
      const sdk = await getSafeSdk(safeAddress)
      const owners = await sdk.getOwners()
      const threshold = await sdk.getThreshold()
      setOwners(owners)
      setCurrentThreshold(threshold)
    }

    if (safeAddress) loadSafeData()
  }, [safeAddress])

  const proposeThresholdChange = async () => {
    if (!walletClient) return
    setStatus("Proposing threshold change...")

    const provider = new ethers.providers.Web3Provider(walletClient.transport)
    const signer = provider.getSigner()
    const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer })
    const safeSdk = await Safe.create({ ethAdapter, safeAddress })

    const txData = await safeSdk.getChangeThresholdTx(parseInt(newThreshold))

    const service = getSafeService()
    const safeTxHash = await safeSdk.getTransactionHash(txData)
    const senderAddress = await signer.getAddress()

    await service.proposeTransaction({
      safeAddress,
      safeTransactionData: txData.data,
      safeTxHash,
      senderAddress
    })

    setStatus("✅ Threshold change proposal submitted!")
  }

  return (
    <div className="bg-white rounded p-6 shadow-md mt-6">
      <h2 className="text-xl font-bold mb-2">Change Threshold</h2>
      <p className="mb-2">Current threshold: {currentThreshold}</p>
      <input
        type="number"
        className="border rounded px-3 py-1 w-full mb-2"
        placeholder="New threshold"
        value={newThreshold}
        onChange={(e) => setNewThreshold(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={proposeThresholdChange}
      >
        Propose Threshold Change
      </button>
      {status && <p className="text-green-600 mt-2">{status}</p>}
    </div>
  )
}
