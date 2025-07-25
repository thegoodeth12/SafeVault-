// pages/index.tsx
import Link from 'next/link'
import { useSafeWallet } from '../hooks/useSafeWallet'
import { useEffect, useState } from 'react'

export default function Home() {
  const { address, connect, disconnect } = useSafeWallet()
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    setConnected(!!address)
  }, [address])

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">🔐 Gnosis Vault</h1>
        {connected ? (
          <button onClick={disconnect} className="bg-red-500 text-white px-4 py-2 rounded">
            Disconnect
          </button>
        ) : (
          <button onClick={connect} className="bg-blue-600 text-white px-4 py-2 rounded">
            Connect Wallet
          </button>
        )}
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <LinkCard title="Dashboard" href="/dashboard" />
        <LinkCard title="Propose" href="/propose" />
        <LinkCard title="Queue" href="/queue" />
        <LinkCard title="Settings" href="/settings" />
      </section>

      <footer className="mt-16 text-sm text-center text-gray-400">
        Built with ❤️ for Safe Wallet automation
      </footer>
    </main>
  )
}

function LinkCard({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href}>
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">Go to {title} page</p>
      </div>
    </Link>
  )
}
