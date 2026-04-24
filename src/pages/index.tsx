import React from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <SEO />
      <Navigation />
      <main>
        <Hero />
        <section id="servicios" className="py-24 bg-muted/30">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Nuestros Servicios
            </h2>
            <p className="text-muted-foreground mt-3">Próximamente...</p>
          </div>
        </section>
        <section id="contacto" className="py-24">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Contáctanos
            </h2>
            <p className="text-muted-foreground mt-3">Próximamente...</p>
          </div>
        </section>
      </main>
    </>
  );
}