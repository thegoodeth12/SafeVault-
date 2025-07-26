import { useAccount, useChainId, useWalletClient } from 'wagmi'

export function useSafeWallet() {
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const chainId = useChainId()

  return {
    address,
    isConnected,
    chainId,
    signer: walletClient,
  }
}
