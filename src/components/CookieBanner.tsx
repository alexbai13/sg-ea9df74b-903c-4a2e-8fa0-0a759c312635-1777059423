"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("aldalu-cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showBanner) {
        rejectCookies();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showBanner]);

  const acceptCookies = () => {
    localStorage.setItem("aldalu-cookie-consent", "accepted");
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("aldalu-cookie-consent", "rejected");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
        >
          <div className="container max-w-6xl">
            <div className="relative bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" aria-hidden="true" />
              
              <div className="relative p-6 md:p-8">
                <button
                  onClick={rejectCookies}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"
                  aria-label="Cerrar y rechazar cookies (Escape)"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex-shrink-0" aria-hidden="true">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Cookie size={24} className="text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 id="cookie-banner-title" className="text-lg font-semibold text-foreground">
                      Usamos cookies para mejorar tu experiencia
                    </h3>
                    <p id="cookie-banner-description" className="text-sm text-muted-foreground leading-relaxed">
                      Utilizamos cookies propias y de terceros para analizar el tráfico del sitio web y personalizar tu experiencia. 
                      Al hacer clic en &quot;Aceptar&quot;, consientes el uso de todas las cookies. Consulta nuestra{" "}
                      <Link 
                        href="/privacidad" 
                        className="text-primary hover:text-primary/80 underline underline-offset-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
                      >
                        Política de Privacidad
                      </Link>
                      {" "}para más información.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                      onClick={rejectCookies}
                      variant="outline"
                      className="w-full sm:w-auto border-border hover:bg-muted focus:ring-2 focus:ring-primary"
                    >
                      Rechazar
                    </Button>
                    <Button
                      onClick={acceptCookies}
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Aceptar cookies
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}