// pages/queue.tsx
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProposalQueue from '@/components/ProposalQueue'

export default function QueuePage() {
  return (
    <DashboardLayout>
      <h2 className="text-xl font-bold mb-4">Pending Safe Proposals</h2>
      <ProposalQueue />
    </DashboardLayout>
  )
}
