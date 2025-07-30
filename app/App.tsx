import React from 'react';
import { SafeAppProvider } from '@safe-global/safe-apps-react-sdk';
import SafeAppsSDK from '@safe-global/safe-apps-sdk';
import { WalletProvider } from './context/WalletProvider'; // adjust path

const sdk = new SafeAppsSDK();

function App() {
  return (
    <WalletProvider>
      <SafeAppProvider sdk={sdk}>
        <YourMainRoutesOrLayout />
      </SafeAppProvider>
    </WalletProvider>
  );
}

export default App;
