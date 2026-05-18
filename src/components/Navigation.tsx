import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSwitch } from "@/components/ThemeSwitch";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Nosotros", href: "#valores" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "/blog" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>
      
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary rounded-lg">
            <div className="relative h-10 md:h-14 w-auto" style={{ width: "160px" }}>
              <Image
                src="/ALDALU_Logo_imago_corregidos-01.png"
                alt="ALDALU - Brokers Hipotecarios"
                fill
                priority
                quality={95}
                sizes="160px"
                className="object-contain object-left block dark:hidden"
              />
              <Image
                src="/ALDALU_Logo_imago_corregidos_blancos-03.png"
                alt="ALDALU - Brokers Hipotecarios"
                fill
                priority
                quality={95}
                sizes="160px"
                className="object-contain object-left hidden dark:block"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Navegación principal">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group focus:outline-none focus:text-foreground"
                  aria-label={`Ir a sección ${link.label}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full group-focus:w-full" />
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group focus:outline-none focus:text-foreground"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full group-focus:w-full" />
                </Link>
              )
            )}
            <ThemeSwitch />
            <button
              onClick={() => handleNav("#contacto")}
              className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="Solicitar asesoría financiera gratis"
            >
              Asesoría Gratis
            </button>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeSwitch />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
              role="navigation"
              aria-label="Navegación móvil"
            >
              <div className="container py-4 flex flex-col gap-3">
                {navLinks.map((link) =>
                  link.href.startsWith("#") ? (
                    <button
                      key={link.href}
                      onClick={() => handleNav(link.href)}
                      className="text-left text-base font-medium text-muted-foreground hover:text-foreground py-2 transition-colors focus:outline-none focus:text-foreground focus:bg-muted rounded-lg px-2"
                      aria-label={`Ir a sección ${link.label}`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-left text-base font-medium text-muted-foreground hover:text-foreground py-2 transition-colors focus:outline-none focus:text-foreground focus:bg-muted rounded-lg px-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <button
                  onClick={() => handleNav("#contacto")}
                  className="bg-accent text-accent-foreground px-5 py-3 rounded-lg text-sm font-semibold mt-2 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  aria-label="Solicitar asesoría financiera gratis"
                >
                  Asesoría Gratis
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}