import { useEffect, useState } from 'react'
import { getPendingTransactions } from '../lib/safeApi'
import { formatEther } from 'viem'
import Link from 'next/link'

export default function Dashboard() {
  const [txs, setTxs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTxs() {
      const data = await getPendingTransactions()
      setTxs(data)
      setLoading(false)
    }
    loadTxs()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🔐 Safe Proposal Dashboard</h1>
        <p className="text-gray-600">View and manage pending transactions for your Gnosis Safe.</p>
      </header>

      {loading ? (
        <div className="text-gray-500">Loading proposals...</div>
      ) : txs.length === 0 ? (
        <div className="text-gray-400">No pending transactions found.</div>
      ) : (
        <div className="grid gap-6">
          {txs.map((tx, index) => {
            const totalConfirmations = tx.confirmationsRequired || tx.confirmations?.length || 0
            const confirmed = tx.confirmations?.length || 0
            const percentage = totalConfirmations ? Math.min((confirmed / totalConfirmations) * 100, 100) : 0

            return (
              <div key={index} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">Transaction #{tx.nonce}</h2>
                    <p className="text-sm text-gray-500 mb-2">To: {tx.to}</
