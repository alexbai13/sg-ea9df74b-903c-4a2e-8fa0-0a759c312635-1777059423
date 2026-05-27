import React from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle, Home, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Gracias() {
  return (
    <>
      <SEO 
        title="¡Gracias por tu registro! | ALDALU" 
        description="Hemos recibido tu información. Un asesor experto se pondrá en contacto contigo muy pronto."
        image="/og-image.png"
      />
      <Navigation />
      <main className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-muted/30">
        <div className="container max-w-2xl text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            ¡Solicitud Recibida!
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Gracias por confiar en <strong>ALDALU</strong>. Uno de nuestros asesores expertos revisará tu perfil y se pondrá en contacto contigo muy pronto para darte la mejor opción financiera.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border mb-8 text-left"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-serif text-xl font-semibold mb-2">¿Tienes prisa o dudas urgentes?</h2>
                <p className="text-muted-foreground mb-0">Si necesitas atención inmediata, escríbenos directo a nuestro WhatsApp.</p>
              </div>
              <Button asChild variant="outline" className="w-full md:w-auto border-primary text-primary hover:bg-primary/5 whitespace-nowrap">
                <a 
                  href="https://wa.me/52442506819?text=Hola,%20acabo%20de%20llenar%20el%20formulario%20en%20su%20sitio%20web%20y%20me%20gustar%C3%ADa%20atenci%C3%B3n%20r%C3%A1pida." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2"
                >
                  <MessageCircle size={18} />
                  Contactar Asesor
                </a>
              </Button>
            </div>
          </motion.div>
          
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