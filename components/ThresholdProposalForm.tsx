// components/ThresholdProposalForm.tsx

import { useState } from "react"
import { encodeThresholdChange } from "@/lib/encodeThresholdChange"
import { proposeTransaction } from "@/lib/safeApi"

export const ThresholdProposalForm = ({ safeAddress }: { safeAddress: string }) => {
  const [newThreshold, setNewThreshold] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const threshold = parseInt(newThreshold)
      if (isNaN(threshold) || threshold < 1) throw new Error("Invalid threshold")

      const { to, data } = await encodeThresholdChange(safeAddress, threshold)

      await proposeTransaction({
        safeAddress,
        to,
        data,
        value: "0",
      })

      setMessage("Proposal submitted successfully!")
    } catch (err: any) {
      setMessage(err.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Propose New Threshold</h2>
      <input
        type="number"
        min="1"
        value={newThreshold}
        onChange={(e) => setNewThreshold(e.target.value)}
        className="border px-2 py-1 w-full"
        placeholder="New threshold"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isLoading ? "Submitting..." : "Submit Proposal"}
      </button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  )
}
