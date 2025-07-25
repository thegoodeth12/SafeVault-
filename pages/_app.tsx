// pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet, arbitrum } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import {
  RainbowKitProvider,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const { chains, publicClient } = configureChains(
  [mainnet, arbitrum],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'SafeVault 🔐',
  projectId: '0e86b980-2298-4978-8dd5-0b9e7af95016 ', // optional for WalletConnect v2
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
