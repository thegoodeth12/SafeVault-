// src/utils/safe.ts
import { ethers } from 'ethers';

export async function getSafeDetails(safeAddress: string) {
  // Placeholder - you can connect this to Safe API later
  return {
    address: safeAddress,
    threshold: 2,
    owners: [
      "0xOwner1...",
      "0xOwner2..."
    ],
  };
}
