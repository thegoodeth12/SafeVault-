// pages/dashboard.tsx
import dynamic from 'next/dynamic'
import Head from 'next/head'
import WalletStatus from '@/components/WalletStatus'
import ConnectButton from '@/components/ConnectButton'

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Safe Dashboard</title>
      </Head>

      <main className="min-h-screen px-6 py-10 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Safe Dashboard</h1>
          <ConnectButton />
        </div>

        <section className="mb-8">
          <WalletStatus />
        </section>

        <section>
          {/* Future dashboard widgets go here */}
          <p className="text-gray-600">Welcome to your SafeVault 🔐 dashboard.</p>
        </section>
      </main>
    </>
  )
}
