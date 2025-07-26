import { useSafeWallet } from '../hooks/useSafeWallet'
import { signSafeTransaction } from '../lib/safeSdk'

interface Props {
  safeTxHash: string
  onSigned?: () => void
}

export default function SignTransactionButton({ safeTxHash, onSigned }: Props) {
  const { signer } = useSafeWallet()

  const handleSign = async () => {
    if (!signer) return
    try {
      await signSafeTransaction(signer, safeTxHash)
      alert('Transaction signed successfully.')
      onSigned?.()
    } catch (err) {
      alert('Error signing transaction')
      console.error(err)
    }
  }

  return (
    <button className="btn-primary" onClick={handleSign}>
      Sign Transaction
    </button>
  )
}
