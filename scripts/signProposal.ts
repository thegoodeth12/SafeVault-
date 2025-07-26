import { ethers } from 'ethers'
import Safe, { SafeFactory } from '@safe-global/protocol-kit'
import EthersAdapter from '@safe-global/protocol-kit/dist/src/adapters/ethers'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import dotenv from 'dotenv'

dotenv.config()

const signProposal = async () => {
  const RPC_URL = process.env.RPC_URL as string
  const SAFE_ADDRESS = process.env.SAFE_ADDRESS as string
  const TX_DATA = process.env.TX_DATA as string // Base64 or JSON

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer
  })

  const safeSdk = await Safe.create({
    ethAdapter,
    safeAddress: SAFE_ADDRESS
  })

  const tx: SafeTransactionDataPartial = JSON.parse(
    Buffer.from(TX_DATA, 'base64').toString()
  )

  const safeTransaction = await safeSdk.createTransaction({ safeTransactionData: tx })

  const signedTx = await safeSdk.signTransaction(safeTransaction)

  console.log('✅ Signed Tx:', signedTx)
}

signProposal()
