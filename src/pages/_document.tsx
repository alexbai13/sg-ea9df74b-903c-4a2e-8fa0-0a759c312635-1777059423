import { cn } from "@/lib/utils";
import { Html, Head, Main, NextScript } from "next/document";
import { SEOElements } from "@/components/SEO";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <SEOElements />
        {/* Volley Widget */}
        <link rel="stylesheet" href="https://widget.meetvolley.com/static/css/widget.css" />
        <script type="text/javascript" data-widget="https://api.meetvolley.com/api/public/get-widget/944c1b5e-9f91-42f1-8ae9-33094314fda2" src="https://widget.meetvolley.com/widget.js" defer></script>
        
        {/*
          CRITICAL: DO NOT REMOVE THIS SCRIPT
          The Softgen AI monitoring script is essential for core app functionality.
          The application will not function without it.
        */}
        <script
          src="https://cdn.softgen.ai/script.js"
          async
          data-softgen-monitoring="true"
        />
      </Head>
      <body
        className={cn(
          "min-h-screen w-full scroll-smooth bg-background text-foreground antialiased"
        )}
      >
        <Main />
        <NextScript />

        {/* Visual Editor Script */}
        {process.env.NODE_ENV === "development" && (
          <script
            src="https://cdn.softgen.dev/visual-editor.min.js"
            async
            data-softgen-visual-editor="true"
          />
        )}

        {/* Start of HubSpot Embed Code */}
        <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/51492519.js"></script>
        {/* End of HubSpot Embed Code */}
      </body>
    </Html>
  );
}
