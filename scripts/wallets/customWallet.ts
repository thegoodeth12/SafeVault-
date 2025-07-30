// src/wallets/customWallet.ts

export const safeVaultWallet = {
  id: 'safevault-wallet',
  name: 'SafeVault Wallet',
  iconUrl: 'https://appkit-lab.reown.com/library/multichain-all/logo512.png',
  links: {
    native: 'safevault://app',
    universal: 'https://appkit-lab.reown.com/library/multichain-all/',
  },
  app: {
    ios: 'safevault://app',
    android: 'safevault://app',
    desktop: 'https://appkit-lab.reown.com/library/multichain-all/launch',
    web: 'https://appkit-lab.reown.com/library/multichain-all/',
  },
};
