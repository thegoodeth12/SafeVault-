// components/SafeActivityFeed.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ActivityItem {
  id: string;
  timestamp: string;
  txHash: string;
  executed: boolean;
  isSuccess: boolean;
  nonce: number;
  safeAppInfo?: { name: string };
}

export default function SafeActivityFeed({ safeAddress }: { safeAddress: string }) {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const { data } = await axios.get(
          `https://safe-transaction-mainnet.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/?executed=true&limit=5`
        );
        setActivity(data.results);
      } catch (err) {
        console.error('Failed to fetch activity:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, [safeAddress]);

  if (loading) return <p className="text-gray-500">Loading activity...</p>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">🧾 Recent Activity</h2>
      <ul className="space-y-3">
        {activity.map((tx) => (
          <li key={tx.id} className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              ✅ {tx.executed ? 'Executed' : 'Pending'} | Nonce: {tx.nonce}
            </p>
            <p className="text-xs text-gray-500 break-all">
              Hash: {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-10)}
            </p>
            {tx.safeAppInfo?.name && (
              <p className="text-xs text-gray-400">Via: {tx.safeAppInfo.name}</p>
            )}
            <p className="text-xs text-gray-400">Time: {new Date(tx.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
