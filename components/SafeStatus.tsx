'use client'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { getSafeClient } from '@/lib/safeClient'

export default function SafeStatus() {
  const [status, setStatus] = useState<any>(null)

  useEffect(() => {
    const connect = async () => {
      if (typeof window.ethereum === 'undefined') return
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      await provider.send('eth_requestAccounts', [])
      const { safeSdk, signer } = await getSafeClient(provider)
      const address = await signer.getAddress()
      const chainId = (await provider.getNetwork()).chainId

      setStatus({
        address,
        chainId,
        safe: await safeSdk.getAddress(),
        threshold: await safeSdk.getThreshold(),
      })
    }

    connect().catch(console.error)
  }, [])

  if (!status) return <p>🔌 Connecting wallet...</p>

  return (
    <div style={{ marginTop: '2rem' }}>
      <p>🧾 Signer: {status.address}</p>
      <p>🌐 Chain ID: {status.chainId}</p>
      <p>🔐 Safe: {status.safe}</p>
      <p>✅ Threshold: {status.threshold}</p>
    </div>
  )
}
