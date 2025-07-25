// pages/dashboard.tsx

import React from 'react';
import Head from 'next/head';
import SafeActivityFeed from '@/components/SafeActivityFeed';
import ProposalQueue from '@/components/ProposalQueue';
import OwnerTools from '@/components/OwnerTools';

const DASHBOARD_SAFE = '0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0'; // replace if needed

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Safe Dashboard</title>
      </Head>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">🔐 Safe Dashboard</h1>

        <section>
          <ProposalQueue safeAddress={DASHBOARD_SAFE} />
        </section>

        <section>
          <OwnerTools safeAddress={DASHBOARD_SAFE} />
        </section>

        <section>
          <SafeActivityFeed safeAddress={DASHBOARD_SAFE} />
        </section>
      </main>
    </>
  );
}
