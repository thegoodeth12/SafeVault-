import { ethers } from 'ethers';

const SAFE_ABI = [
  "function removeOwner(address prevOwner, address owner, uint256 _threshold)",
  "function addOwnerWithThreshold(address owner, uint256 _threshold)",
  "function getOwners() view returns (address[])"
];

// Encode a call to removeOwner
function encodeRemoveOwner(safeInterface: ethers.utils.Interface, prevOwner: string, ownerToRemove: string, threshold: number) {
  return safeInterface.encodeFunctionData('removeOwner', [prevOwner, ownerToRemove, threshold]);
}

// Encode a call to addOwnerWithThreshold
function encodeAddOwner(safeInterface: ethers.utils.Interface, ownerToAdd: string, threshold: number) {
  return safeInterface.encodeFunctionData('addOwnerWithThreshold', [ownerToAdd, threshold]);
}

// Build the multi-send transactions data
export async function buildOwnerChangeTxs(safeAddress: string, currentOwners: string[], newOwners: string[], threshold: number) {
  const iface = new ethers.utils.Interface(SAFE_ABI);

  const transactions = [];

  // Remove owners that are not in newOwners
  for (const owner of currentOwners) {
    if (!newOwners.includes(owner)) {
      const prevOwner = findPrevOwner(currentOwners, owner);
      const data = encodeRemoveOwner(iface, prevOwner, owner, threshold);
      transactions.push({
        to: safeAddress,
        value: 0,
        data,
      });
    }
  }

  // Add owners that are new in newOwners
  for (const owner of newOwners) {
    if (!currentOwners.includes(owner)) {
      const data = encodeAddOwner(iface, owner, threshold);
      transactions.push({
        to: safeAddress,
        value: 0,
        data,
      });
    }
  }

  return transactions;
}

// Helper: find the previous owner for linked-list style owner storage
function findPrevOwner(owners: string[], owner: string) {
  const index = owners.indexOf(owner);
  if (index === 0) {
    // Sentinel address for the Safe linked list of owners
    return '0x0000000000000000000000000000000000000001';
  }
  return owners[index - 1];
}
