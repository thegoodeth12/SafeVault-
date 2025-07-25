// pages/queue.tsx
import ProposalQueue from '../components/ProposalQueue'

export default function QueuePage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">🔐 Safe Proposal Queue</h1>
      <ProposalQueue
        safeAddress="0x821f2b40d965b81202b181Aba1c7a380C49Ed675"
        chainId="42161"
      />
    </main>
  )
}
