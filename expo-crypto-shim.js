import { digest } from "expo-crypto";

// eslint-disable-next-line no-undef
const webCrypto = typeof crypto !== "undefined" ? crypto : new Crypto();
webCrypto.subtle = {
  digest: (algo, data) => {
    const buf = Buffer.from(data);
    return digest(algo, buf);
  },
};
(() => {
  if (typeof crypto === "undefined") {
    Object.defineProperty(window, "crypto", {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    });
  }
})();
