import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, X, ArrowRight, Home, CreditCard, Car, Users, HelpCircle, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSwitch } from "@/components/ThemeSwitch";

const navLinks = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Hipotecario", href: "#servicios", icon: CreditCard },
  { label: "Automotriz", href: "#servicios", icon: Car },
  { label: "Nosotros", href: "#valores", icon: Users },
  { label: "FAQ", href: "#faq", icon: HelpCircle },
  { label: "Blog", href: "/blog", icon: BookOpen },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

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
      if (router.pathname !== "/") {
        router.push(`/${href}`);
        return;
      }
      
      const el = document.querySelector(href);
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      router.push(href);
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
          scrolled || mobileOpen
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border py-2"
            : "bg-transparent py-4"
        }`}
        role="banner"
      >
        <div className="container flex items-center justify-between h-16 md:h-20 lg:h-24">
          <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary rounded-lg transition-transform hover:scale-[1.02]" onClick={() => setMobileOpen(false)}>
            <div className="relative h-14 md:h-20 lg:h-24 w-auto" style={{ width: "320px" }}>
              <Image
                src="/ALDALU_Logo_imago_corregidos-01.png"
                alt="ALDALU - Brokers Hipotecarios"
                fill
                priority
                quality={100}
                sizes="320px"
                className="object-contain object-left block dark:hidden"
              />
              <Image
                src="/ALDALU_Logo_imago_corregidos_blancos-03.png"
                alt="ALDALU - Brokers Hipotecarios"
                fill
                priority
                quality={100}
                sizes="320px"
                className="object-contain object-left hidden dark:block"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-8" role="navigation" aria-label="Navegación principal">
            {navLinks.map((link) => (
              link.href.startsWith("#") ? (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-[15px] font-semibold text-muted-foreground hover:text-primary transition-colors relative group focus:outline-none focus:text-primary"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full group-focus:w-full" />
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[15px] font-semibold text-muted-foreground hover:text-primary transition-colors relative group focus:outline-none focus:text-primary"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full group-focus:w-full" />
                </Link>
              )
            ))}
            <div className="flex items-center gap-4 ml-4">
              <ThemeSwitch />
              <button
                onClick={() => handleNav("#contacto")}
                className="bg-accent text-accent-foreground px-6 py-3 rounded-xl text-[15px] font-bold hover:brightness-110 transition-all shadow-lg shadow-accent/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-label="Solicitar asesoría financiera gratis"
              >
                Asesoría Gratis
              </button>
            </div>
          </nav>

          {/* Mobile/Tablet Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <div className="hidden sm:block">
              <ThemeSwitch />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-3 text-foreground bg-muted/50 rounded-xl transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Improved Mobile Menu Layout */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 top-[72px] md:top-[88px] lg:top-[104px] z-40 bg-background md:hidden xl:flex overflow-y-auto"
              role="navigation"
              aria-label="Navegación móvil"
            >
              <div className="container py-8 flex flex-col h-full">
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 ml-2">Explorar</p>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      {link.href.startsWith("#") ? (
                        <button
                          onClick={() => handleNav(link.href)}
                          className="w-full flex items-center justify-between text-left text-xl font-bold text-foreground py-4 px-4 hover:bg-muted rounded-2xl transition-all active:scale-[0.98]"
                        >
                          <span className="flex items-center gap-4">
                            <link.icon className="w-5 h-5 text-primary" />
                            {link.label}
                          </span>
                          <ArrowRight className="w-5 h-5 text-muted-foreground/40" />
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="w-full flex items-center justify-between text-left text-xl font-bold text-foreground py-4 px-4 hover:bg-muted rounded-2xl transition-all active:scale-[0.98]"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="flex items-center gap-4">
                            <link.icon className="w-5 h-5 text-primary" />
                            {link.label}
                          </span>
                          <ArrowRight className="w-5 h-5 text-muted-foreground/40" />
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto pt-10 pb-8 flex flex-col gap-6">
                  <div className="sm:hidden flex items-center justify-between px-4 py-4 bg-muted/30 rounded-2xl">
                    <span className="font-semibold text-muted-foreground">Cambiar tema</span>
                    <ThemeSwitch />
                  </div>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => handleNav("#contacto")}
                    className="w-full bg-accent text-accent-foreground py-5 rounded-2xl text-lg font-black shadow-xl shadow-accent/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                  >
                    Asesoría Gratis
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">¿Necesitas ayuda inmediata?</p>
                    <a href="tel:5541389710" className="text-primary font-bold text-lg mt-1 block">55 4138 9710</a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}