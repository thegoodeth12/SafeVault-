// pages/settings/manage.tsx

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AddOwnerProposalForm } from "@/components/AddOwnerProposalForm"
import { RemoveOwnerProposalForm } from "@/components/RemoveOwnerProposalForm"
import { ThresholdProposalForm } from "@/components/ThresholdProposalForm"

export default function ManageSafePage() {
  const router = useRouter()
  const [safeAddress, setSafeAddress] = useState("")

  useEffect(() => {
    const querySafe = router.query.safe as string
    if (querySafe) setSafeAddress(querySafe)
  }, [router.query.safe])

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">🔐 Safe Management Tools</h1>

      {!safeAddress ? (
        <p className="text-gray-500">No Safe address provided in the URL.</p>
      ) : (
        <>
          <AddOwnerProposalForm safeAddress={safeAddress} />
          <RemoveOwnerProposalForm safeAddress={safeAddress} />
          <ThresholdProposalForm safeAddress={safeAddress} />
        </>
      )}
    </div>
  )
}
