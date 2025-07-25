import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <main>
        <h1>Welcome to SafeVault 🔐</h1>
        <p>Your multisig wallet just became mobile-native.</p>
      </main>
    </>
  );
}
