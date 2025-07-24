import { useEffect } from "react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        },
        (err) => {
          console.log("Service Worker registration failed:", err);
        }
      );
    }
  }, []);

  return <Component {...pageProps} />;
}
