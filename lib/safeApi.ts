export async function fetchPendingProposals(safeAddress, chainId) {
  const url = `https://safe-transaction-${mainnet}.safe.global/api/v1/safes/${0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0}/multisig-transactions/?executed=false`
  const res = await fetch(url)
  if (!res.ok) return []
  const data = await res.json()
  return data.results || []
}
