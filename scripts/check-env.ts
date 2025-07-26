const requiredEnv = [
  'SAFE_ADDRESS',
  'SIGNER_ADDRESS',
  'GITHUB_TOKEN',
  'TX_SERVICE_URL',
  'CHAIN_ID',
  'PRIVATE_KEY' // Optional if using injected wallet
]

let missing: string[] = []

for (const key of requiredEnv) {
  if (!process.env[key]) {
    missing.push(key)
  }
}

if (missing.length) {
  console.error('❌ Missing environment variables:')
  for (const key of missing) {
    console.error(`- ${key}`)
  }
  process.exit(1)
} else {
  console.log('✅ All required environment variables are set.')
}
