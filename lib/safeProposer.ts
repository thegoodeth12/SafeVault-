const ethAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: signer
})

const safeSdk = await Safe.create({ ethAdapter, safeAddress })

const safeTransactionData: SafeTransactionDataPartial = {
  to: recipient,
  value: '0',
  data: encodedData,
  operation: 0
}

const safeTx = await safeSdk.createTransaction({ safeTransactionData })

// Send to Safe Tx Service
const safeService = new SafeApiKit({ txServiceUrl: 'https://safe-transaction-arbitrum.safe.global', ethAdapter })
await safeService.proposeTransaction({
  safeAddress,
  safeTransactionData: safeTx.data,
  senderAddress: signer.address,
  senderSignature: await signer.signMessage(safeTx.encodedSignatures())
})
