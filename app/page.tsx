'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>🔐 Welcome to SafeVault UI</h1>
      <p>This is your secure Safe app interface.</p>
      <ul>
        <li><Link href="/proposals">📊 View Proposals</Link></li>
        <li><Link href="/owners">🧑‍🤝‍🧑 Safe Owners</Link></li>
        <li><Link href="/create">📝 Create Transaction</Link></li>
      </ul>
    </main>
  )
}
