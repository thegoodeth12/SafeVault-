const REQUIRED_ENV_VARS = [
  'SAFE_SIGNER_KEY',
  'SAFE_ADDRESS',
  'RPC_URL',
  'GITHUB_TOKEN'
];

function isValidPrivateKey(key: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(key);
}

function isValidSafeAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function isValidRpcUrl(url: string): boolean {
  return /^https?:\/\/.+$/.test(url);
}

function checkEnv() {
  let hasError = false;

  REQUIRED_ENV_VARS.forEach((key) => {
    const val = process.env[key];
    if (!val) {
      console.error(`❌ Missing: ${key}`);
      hasError = true;
      return;
    }

    switch (key) {
      case 'SAFE_SIGNER_KEY':
        if (!isValidPrivateKey(val)) {
          console.error(`❌ Invalid private key format for ${key}`);
          hasError = true;
        }
        break;
      case 'SAFE_ADDRESS':
        if (!isValidSafeAddress(val)) {
          console.error(`❌ Invalid Safe address format for ${key}`);
          hasError = true;
        }
        break;
      case 'RPC_URL':
        if (!isValidRpcUrl(val)) {
          console.error(`❌ RPC URL is not valid: ${val}`);
          hasError = true;
        }
        break;
      default:
        break;
    }
  });

  if (!hasError) {
    console.log('✅ All required environment variables are present and valid.');
  } else {
    process.exit(1);
  }
}

checkEnv();
