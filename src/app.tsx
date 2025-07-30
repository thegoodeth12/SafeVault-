import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

import { wagmiConfig, chains } from '../walletConnect'; // adjust import path

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
