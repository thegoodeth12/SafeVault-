// lib/safeApi.ts
export async function fetchPendingTransactions(safeAddress: string, chainId: string) {
  const chain = chainId === '42161' ? 'arb1' : 'eth'
  const url = `https://safe-transaction-${chain}.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/?executed=false&nonce__gt=0`

  const res = await fetch(url)
  if (!res.ok) return []

  const data = await res.json()
  return data.results || []
}
