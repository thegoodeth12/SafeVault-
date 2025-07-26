// pages/_app.tsx
import "../styles/globals.css";
import Layout from "../components/Layout";
import { WalletProvider } from "../components/WalletStatus";

export default function App({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletProvider>
  );
}
