<header className="flex items-center justify-between mb-10">
  <h1 className="text-3xl font-bold">🔐 Safe Vault</h1>
  <div className="flex gap-4">
    <button onClick={toggle} className="bg-gray-200 px-3 py-2 rounded">
      {enabled ? '☀️ Light' : '🌙 Dark'}
    </button>
    {connected ? (
      <button onClick={disconnect} className="bg-red-500 text-white px-4 py-2 rounded">
        Disconnect
      </button>
    ) : (
      <button onClick={connect} className="bg-blue-600 text-white px-4 py-2 rounded">
        Connect Wallet
      </button>
    )}
  </div>
</header>
export default function Home() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111', color: '#fff' }}>
      <h1>🔐 SafeVault PWA is Live</h1>
    </main>
  )
}
