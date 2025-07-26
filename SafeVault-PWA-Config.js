# Create necessary folders
os.makedirs(public_dir, exist_ok=True)
os.makedirs(pages_dir, exist_ok=True)

# PWA manifest file
manifest_json = """{
  "name": "SafeVault 🔐",
  "short_name": "SafeVault",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "description": "A secure, installable multisig wallet interface powered by Safe.",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}"""

# Service worker stub
service_worker_js = """self.addEventListener('install', event => {
  console.log('Service Worker installed.');
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
"""

# Dummy index.tsx page
index_tsx = """import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>SafeVault 🔐</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main>
        <h1>🚀 SafeVault is live as a PWA!</h1>
        <p>Install this multisig wallet on your mobile device for a native app experience.</p>
      </main>
    </>
  );
}
"""

# next.config.js PWA config
next_config_js = """const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
});
"""

# Save all files
with open(os.path.join(public_dir, "manifest.json"), "w") as f:
    f.write(manifest_json)

with open(os.path.join(public_dir, "service-worker.js"), "w") as f:
    f.write(service_worker_js)

with open(os.path.join(pages_dir, "index.tsx"), "w") as f:
    f.write(index_tsx)

with open(os.path.join(base_dir, "next.config.js"), "w") as f:
    f.write(next_config_js)
