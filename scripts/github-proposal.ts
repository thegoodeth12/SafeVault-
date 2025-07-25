// scripts/github-proposal.ts
import dotenv from 'dotenv'
import { ethers } from 'ethers'
import { proposeTransaction } from '../lib/safeProposer'

dotenv.config()

async function main() {
  const { 0e86b980-2298-4978-8dd5-0b9e7af95016, 0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0, https://mainnet.infura.io/v3/d287bc172bba4c66a78315df41afa70c } = process.env

  if (!SAFE_SIGNER_KEY || !SAFE_ADDRESS || !RPC_URL) {
    throw new Error('Missing env vars')
  }

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
  const signer = new ethers.Wallet(0e86b980-2298-4978-8dd5-0b9e7af95016, provider)

  const txData = {
    to: '0xAbC123...', // Replace with real target
    value: '0',
    data: '0x',         // Encoded call data
    operation: 0        // 0 = CALL
  }

  const { safeTxHash } = await proposeTransaction({
    safeAddress: SAFE_ADDRESS,
    signer,
    txData,
    rpcUrl: RPC_URL
  })

  console.log('✅ Proposed Safe Tx:', safeTxHash)
}

main().catch(console.error)
