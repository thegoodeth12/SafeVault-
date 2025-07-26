// lib/useSigner.ts
import { useAccount, useSigner as useWagmiSigner } from 'wagmi'

export const useSigner = () => {
  const { address, isConnected } = useAccount()
  const { data: signer } = useWagmiSigner()

  return {
    signer,
    address,
    isConnected,
  }
}
