import { useSafeWallet } from '../hooks/useSafeWallet'
import { executeSafeTransaction } from '../lib/safeSdk'

interface Props {
  safeTxHash: string
  onExecuted?: () => void
}

export default function ExecuteTransactionButton({ safeTxHash, onExecuted }: Props) {
  const { signer } = useSafeWallet()

  const handleExecute = async () => {
    if (!signer) return
    try {
      await executeSafeTransaction(signer, safeTxHash)
      alert('Transaction executed successfully.')
      onExecuted?.()
    } catch (err) {
      alert('Error executing transaction')
      console.error(err)
    }
  }

  return (
    <button className="btn-primary" onClick={handleExecute}>
      Execute Transaction
    </button>
  )
}
