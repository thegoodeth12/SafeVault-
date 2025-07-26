import SafeActivityFeed from '@/components/SafeActivityFeed';

<SafeActivityFeed safeAddress="0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0" />
// pages/dashboard.tsx
"use client"

import SafeInfo from "@/components/SafeInfo"
import WalletStatus from "@/components/WalletStatus"
import ThresholdProposal from "@/components/ThresholdProposal"
import OwnerTools from "@/components/OwnerTools"
import { useSafeInfo } from "@/hooks/useSafeInfo"

export default function DashboardPage() {
  const { safeAddress } = useSafeInfo()

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Safe Dashboard 🔐</h1>
          <p className="text-gray-600 mt-2">Manage your Safe — signers, threshold, transactions, and more.</p>
        </header>

        <section className="mb-8">
          <WalletStatus />
        </section>

        {safeAddress ? (
          <>
            <section className="mb-8">
              <SafeInfo />
            </section>

            <section className="mb-8">
              <ThresholdProposal />
            </section>

            <section className="mb-8">
              <OwnerTools />
            </section>
          </>
        ) : (
          <p className="text-center text-gray-500">Connect your wallet to view Safe details.</p>
        )}
      </div>
    </div>
  )
}
