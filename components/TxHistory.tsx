'use client'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { getSafeClient } from '@/lib/safeClient'

export default function TxHistory() {
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const { safeSdk } = await getSafeClient(provider)
      const txs = await safeSdk.getTransactionHistory()

      setHistory(txs.results || [])
    }

    fetchHistory().catch(console.error)
  }, [])

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📜 Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Tx Hash</th><th>To</th><th>Value</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((tx: any, i: number) => (
            <tr key={i}>
              <td>
                <a href={`https://etherscan.io/tx/${tx.transactionHash}`} target="_blank" rel="noreferrer">
                  {tx.transactionHash.slice(0, 10)}...
                </a>
              </td>
              <td>{tx.to}</td>
              <td>{ethers.utils.formatEther(tx.value || '0')}</td>
              <td>{tx.executionDate ? '✅ Executed' : '⏳ Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
