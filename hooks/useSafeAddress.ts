import { useRouter } from "next/router";
import { useSafeInfo } from "@safe-global/safe-apps-react-sdk";

/**
 * Returns the Safe address from either the URL or the Safe App context.
 * Useful for working both inside and outside the Safe iframe.
 */
export const useSafeAddress = () => {
  const { safe } = useSafeInfo();
  const router = useRouter();

  const urlSafe = router.query.safe as string | undefined;
  const contextSafe = safe?.safeAddress;

  return urlSafe || contextSafe || "";
};
