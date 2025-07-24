'use client'
import TxHistory from '@/components/TxHistory'

export default function HistoryPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>📜 Safe Transaction History</h1>
      <TxHistory />
    </main>
  )
}
