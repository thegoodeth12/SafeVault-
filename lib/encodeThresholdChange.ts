// lib/encodeThresholdChange.ts

import { SafeFactory, SafeAccountConfig } from "@safe-global/protocol-kit"
import { ethers } from "ethers"
import { getSafeSdk } from "./getSafeSdk"

export async function encodeThresholdChange(safeAddress: string, newThreshold: number) {
  const safeSdk = await getSafeSdk(safeAddress)
  const safeTransactionData = await safeSdk.createChangeThresholdTx(newThreshold)
  return {
    to: safeTransactionData.to,
    data: safeTransactionData.data,
  }
}
