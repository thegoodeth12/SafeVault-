import Head from 'next/head'
import WalletStatus from '@/components/WalletStatus'
import SafeInfoCard from '@/components/SafeInfoCard'
import ThresholdProposal from '@/components/ThresholdProposal'
import OwnerTools from '@/components/OwnerTools'
import TransactionList from '@/components/TransactionList'

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>SafeVault 🔐 Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">SafeVault 🔐 Dashboard</h1>
          <WalletStatus />
        </header>

        <main className="space-y-8">
          <SafeInfoCard />

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Propose Threshold Change</h2>
            <ThresholdProposal />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Multisend & Owners</h2>
            <OwnerTools />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
            <TransactionList />
          </section>
        </main>
      </div>
    </>
  )
}
