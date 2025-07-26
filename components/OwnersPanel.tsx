'use client'
import { useEffect, useState } from 'react'
import { getSafeClient } from '@/lib/safeClient'

export default function OwnersPanel() {
  const [owners, setOwners] = useState<string[]>([])
  const [threshold, setThreshold] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const { safeSdk } = await getSafeClient(window.ethereum)
      const ownerList = await safeSdk.getOwners()
      const threshold = await safeSdk.getThreshold()
      setOwners(ownerList)
      setThreshold(threshold)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>🔐 Safe Owners</h2>
      <ul>
        {owners.map(owner => <li key={owner}>{owner}</li>)}
      </ul>
      <p>🔢 Threshold: {threshold} approvals required</p>
    </div>
  )
}
