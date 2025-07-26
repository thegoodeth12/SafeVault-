// components/WalletStatus.tsx
import { useSigner } from '@/lib/useSigner'

export default function WalletStatus() {
  const { address, isConnected } = useSigner()

  return (
    <div className="wallet-status">
      {isConnected ? (
        <p>🔐 Connected as <code>{address}</code></p>
      ) : (
        <p>❌ Wallet not connected</p>
      )}
    </div>
  )
}
