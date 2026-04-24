import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const zones = ["Juriquilla", "Zibatá", "Corregidora", "Zakia", "El Refugio", "Centro Sur", "Candiles", "Tres Cantos"];

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <circle cx="20" cy="20" r="18" fill="hsl(174, 72%, 56%)" opacity="0.2" />
                <path d="M12 28L20 10L28 28" stroke="hsl(174, 72%, 56%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 22H25" stroke="hsl(330, 82%, 52%)" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="20" cy="10" r="2" fill="hsl(330, 82%, 52%)" />
              </svg>
              <span className="font-heading font-bold text-xl tracking-tight">ALDALU</span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed mb-4">
              Tu guía financiero personal en Querétaro. Comparamos bancos para que tú tomes la mejor decisión.
            </p>
            <p className="text-xs text-background/40 italic">
              Donde las grandes decisiones encuentran respaldo.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-primary">Servicios</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => scrollTo("#servicios")} className="text-sm text-background/60 hover:text-primary transition-colors">Crédito Hipotecario</button></li>
              <li><button onClick={() => scrollTo("#servicios")} className="text-sm text-background/60 hover:text-primary transition-colors">Cambio de Hipoteca</button></li>
              <li><button onClick={() => scrollTo("#servicios")} className="text-sm text-background/60 hover:text-primary transition-colors">Crédito Automotriz</button></li>
              <li><button onClick={() => scrollTo("#servicios")} className="text-sm text-background/60 hover:text-primary transition-colors">Préstamos IMSS</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-primary">Zonas en Querétaro</h4>
            <div className="flex flex-wrap gap-2">
              {zones.map((zone) => (
                <span key={zone} className="text-xs bg-background/10 text-background/60 px-2.5 py-1 rounded-full">
                  {zone}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-primary">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href="tel:5541389710" className="text-sm text-background/60 hover:text-primary transition-colors">
                  55 4138 9710
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a href="mailto:alonso.espitia.t@gmail.com" className="text-sm text-background/60 hover:text-primary transition-colors">
                  alonso.espitia.t@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-background/60">Querétaro, Qro., México</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            &copy; 2026 ALDALU. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="text-xs text-background/40 hover:text-primary transition-colors">
              Aviso de Privacidad
            </Link>
            <button onClick={() => scrollTo("#faq")} className="text-xs text-background/40 hover:text-primary transition-colors">
              FAQ
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}