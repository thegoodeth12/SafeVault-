import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import { ethers } from 'ethers'

export async function getSafeClient(provider: ethers.providers.Web3Provider) {
  const signer = provider.getSigner()
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  })

  const safeAddress = process.env.NEXT_PUBLIC_SAFE_ADDRESS || '' // from Vercel env

  const safeSdk = await Safe.create({ ethAdapter, safeAddress })

  return {
    safeSdk,
    safeAddress,
    signer,
    provider,
  }
}
