import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CookieBanner } from "@/components/CookieBanner";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/contexts/ThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Component {...pageProps} />
      <CookieBanner />
      <Toaster />
    </ThemeProvider>
  );
}