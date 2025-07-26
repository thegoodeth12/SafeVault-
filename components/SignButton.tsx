import { useSafeSigner } from '../hooks/useSafeSigner'
import Safe from '@safe-global/protocol-kit'
import EthersAdapter from '@safe-global/protocol-kit/dist/src/adapters/ethers'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'

export default function SignButton({ tx }: { tx: SafeTransactionDataPartial }) {
  const signer = useSafeSigner()

  const handleSign = async () => {
    if (!signer) return alert('Connect wallet first!')

    const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer })
    const safe = await Safe.create({ ethAdapter, safeAddress: '0xYourSafe' })

    const safeTx = await safe.createTransaction({ safeTransactionData: tx })
    const signedTx = await safe.signTransaction(safeTx)

    console.log('Signed!', signedTx)
  }

  return (
    <button onClick={handleSign} className="px-4 py-2 bg-green-700 text-white rounded">
      Sign with Wallet
    </button>
  )
}
