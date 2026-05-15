import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CookieBanner } from "@/components/CookieBanner";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <CookieBanner />
      <Toaster />
    </>
  );
}