import { useSafeAddress } from "@/hooks/useSafeAddress";

export default function DashboardPage() {
  const safeAddress = useSafeAddress();

  return (
    <div>
      <h1 className="text-2xl font-bold">Safe Dashboard</h1>
      {safeAddress ? (
        <p className="mt-2 text-blue-600 underline">
          <a href={`/settings/manage?safe=${safeAddress}`}>Manage Owners & Threshold</a>
        </p>
      ) : (
        <p className="text-gray-500">No Safe detected.</p>
      )}
    </div>
  );
}

import React from 'react';
import Head from 'next/head';
import SafeActivityFeed from '@/components/SafeActivityFeed';
import ProposalQueue from '@/components/ProposalQueue';
import OwnerTools from '@/components/OwnerTools';

const DASHBOARD_SAFE = '0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0'; // You can update this dynamically later

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Safe Dashboard 🔐</title>
        <meta name="description" content="Track and manage your Safe proposals, owners, and history all in one view." />
      </Head>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            🔐 Safe Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Monitor proposals, update ownership, and track recent activity for your Safe.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">📝 Proposal Queue</h2>
          <ProposalQueue safeAddress={DASHBOARD_SAFE} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-green-600">👥 Owner Tools</h2>
          <OwnerTools safeAddress={DASHBOARD_SAFE} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">📜 Activity Feed</h2>
          <SafeActivityFeed safeAddress={DASHBOARD_SAFE} />
        </section>
      </main>
    </>
  );
}
