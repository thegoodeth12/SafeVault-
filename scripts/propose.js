const { ethers } = require('ethers');
const { EthersAdapter, SafeFactory } = require('@safe-global/protocol-kit');
require('dotenv').config();

(async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.https://mainnet.infura.io/v3/d287bc172bba4c66a78315df41afa70c);
  const signer = new ethers.Wallet(process.env.0e86b980-2298-4978-8dd5-0b9e7af95016, provider);

  const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });
  const safeFactory = await SafeFactory.create({ ethAdapter });

  const safe = await safeFactory.connectSafe(process.env.0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0);

  const txData = {
    to: signer.address,
    data: '0x',
    value: ethers.utils.parseEther("0.0001").toString()
  };

  const safeTx = await safe.createTransaction({ transactions: [txData] });
  const txHash = await safe.getTransactionHash(safeTx);
  const signature = await safe.signTransactionHash(txHash);

  console.log(`✅ Proposal sent!\nTransaction Hash: ${txHash}`);
})();
