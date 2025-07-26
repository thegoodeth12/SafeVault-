import Head from 'next/head'
import WalletStatus from '@/components/WalletStatus'
import ThresholdProposal from '@/components/ThresholdProposal'
import OwnerTools from '@/components/OwnerTools'

export default function SettingsPage() {
  return (
    <>
      <Head>
        <title>Safe Settings – SafeVault 🔐</title>
      </Head>
      <div className="min-h-screen bg-white px-6 py-10">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Safe Settings</h1>
          <WalletStatus />
        </header>

        <main className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Propose New Threshold</h2>
            <ThresholdProposal />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Owner Management & Multisend</h2>
            <OwnerTools />
          </section>

          <section>
            <p className="text-sm text-gray-500">
              Want to see transaction history? Go to <a href="/dashboard" className="text-blue-600 underline">Dashboard</a>.
            </p>
          </section>
        </main>
      </div>
    </>
  )
}
