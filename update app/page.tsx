'use client'
import Link from 'next/link'
import SafeStatus from '@/components/SafeStatus'

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>🔐 Welcome to SafeVault UI</h1>
      <SafeStatus />
      <ul>
        <li><Link href="/proposals">📊 View Proposals</Link></li>
        <li><Link href="/owners">🧑‍🤝‍🧑 Safe Owners</Link></li>
        <li><Link href="/create">📝 Create Transaction</Link></li>
      </ul>
    </main>
  )
}
