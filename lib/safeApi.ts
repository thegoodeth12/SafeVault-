// lib/safeApi.ts (append or create if not existing)
import { ethers } from 'ethers';

const SAFE_ABI = [
  "function getOwners() view returns (address[])",
  "function getThreshold() view returns (uint256)"
];

export async function fetchSafeOwnersAndThreshold(safeAddress: string, provider: ethers.providers.Provider) {
  const safeContract = new ethers.Contract(safeAddress, SAFE_ABI, provider);
  const owners: string[] = await safeContract.getOwners();
  const threshold: number = (await safeContract.getThreshold()).toNumber();
  return { owners, threshold };
}
