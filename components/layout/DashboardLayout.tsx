// components/layout/DashboardLayout.tsx

import React from 'react';
import Head from 'next/head';

type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function DashboardLayout({ title = 'Safe Dashboard', children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <header className="w-full px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold">🔐 Gnosis Vault Dashboard</h1>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6 space-y-10">{children}</main>
      </div>
    </>
  );
}
