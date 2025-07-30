// src/walletConnect.ts

import { configureChains, createConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

import { safeVaultWallet } from './wallets/customWallet'; // path to the custom wallet
import { arbitrum, mainnet } from 'wagmi/chains'; // customize to your Safe chains

const { chains, publicClient } = configureChains(
  [mainnet, arbitrum], // ⬅️ Customize this to your Safe chains
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0],
      }),
    }),
  ]
);

// Add SafeVault Wallet under "Other"
const { wallets } = getDefaultWallets({
  appName: 'SafeVault',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains,
  customWallets: [
    {
      groupName: 'Other',
      wallets: [safeVaultWallet],
    },
  ],
});

export const connectors = connectorsForWallets(wallets);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains };
