import React from "react";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Página no encontrada | ALDALU" 
        description="La página que buscas no existe o ha sido movida." 
        image="/og-image.png"
      />
      <Navigation />
      <main className="min-h-[80vh] pt-28 pb-16 flex items-center justify-center bg-muted/30">
        <div className="container max-w-2xl text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
              <AlertCircle className="h-12 w-12 text-primary" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            404 - Página no encontrada
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Lo sentimos, la página que buscas no existe, ha cambiado de nombre o está temporalmente indisponible.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-full text-base font-medium">
              <Link href="/" className="flex items-center gap-2">
                <Home size={18} />
                Volver al inicio
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}