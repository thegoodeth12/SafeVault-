const { ethers } = require('ethers');
const { SafeFactory, EthersAdapter } = require('@safe-global/protocol-kit');
require('dotenv').config();

(async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer
  });

  const safeFactory = await SafeFactory.create({ ethAdapter });
  const safe = await safeFactory.connectSafe(process.env.SAFE_ADDRESS);

  const txData = {
    to: signer.address,
    data: '0x',
    value: ethers.utils.parseEther("0.0001").toString()
  };

  const safeTx = await safe.createTransaction({ transactions: [txData] });

  const txHash = await safe.getTransactionHash(safeTx);
  const signature = await safe.signTransactionHash(txHash);
  console.log(`Proposal created and signed. TxHash: ${txHash}`);
})();
