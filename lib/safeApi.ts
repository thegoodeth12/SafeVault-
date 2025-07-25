export async function fetchPendingProposals(safeAddress, chainId) {
  const url = `https://safe-transaction-${chainId}.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/?executed=false`
  const res = await fetch(url)
  if (!res.ok) return []
  const data = await res.json()
  return data.results || []
}
