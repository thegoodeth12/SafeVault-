// utils/safeTools.ts
import { ethers } from "ethers";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
import { getChainInfo } from "./chains";

export async function getSafeDetails(safeAddress: string, chainId: number) {
  const { rpcUrl, safeTxServiceUrl } = getChainInfo(chainId);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const signer = provider.getSigner();
  const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });

  const safeSdk = await Safe.create({ ethAdapter, safeAddress });
  const api = new SafeApiKit({ txServiceUrl: safeTxServiceUrl, ethAdapter });

  const [threshold, owners] = await Promise.all([
    safeSdk.getThreshold(),
    safeSdk.getOwners(),
  ]);

  return { threshold, owners };
}
