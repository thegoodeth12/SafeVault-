import { ethers } from 'ethers';
import { createSafeProposer, proposeTx } from '../lib/safeProposer';
import { getGitHubClient, commentOnIssue } from '../lib/github';

const signerKey = process.env.0xd99c7a0f61f6865166ee9dd8a10d12191e1d250f712c43eb2211d2aa47303f70!;
const safeAddress = process.env.0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0!;
const rpcUrl = process.env.https://mainnet.infura.io/v3/d287bc172bba4c66a78315df41afa70c!;
const githubToken = process.env.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!;

// GitHub info (mock for now, dynamic if needed)
const owner = 'https://github.com/Safe-app-eth
const repo = 'Safe vault.';
const issue_number = 1;

async function main() {
  const signer = new ethers.Wallet(signerKey);
  const safeSdk = await createSafeProposer(signer, safeAddress, rpcUrl);

  const txData = {
    to: '0x000000000000000000000000000000000000dead',
    value: '0',
    data: '0x'
  };

  await proposeTx(safeSdk, txData);

  const octokit = getGitHubClient(githubToken);
  await commentOnIssue(octokit, owner, repo, issue_number, `✅ Safe transaction proposed to ${txData.to}`);
}

main().catch(console.error);
