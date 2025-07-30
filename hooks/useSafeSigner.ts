import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

export function useSafeSigner() {
  const [signer, setSigner] = useState<ethers.Signer | null>(null)

  useEffect(() => {
    const connectWallet = async () => {
      if ((window as any).ethereum) {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        await provider.send('eth_requestAccounts', [])
        setSigner(provider.getSigner())
      }
    }
    connectWallet()
  }, [])

  return signer
}
