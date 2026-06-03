import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MapPin, Phone, Mail } from "lucide-react";

const zones = [
  "Ahuacatlán de Guadalupe",
  "Ajuchitlán",
  "Amazcala",
  "Amealco",
  "Bernal",
  "Bordo Blanco",
  "Cadereyta de Montes",
  "Camargo",
  "Candiles",
  "Ceja de Bravo",
  "Centro",
  "Chichimequillas",
  "Colón",
  "Concá",
  "Corregidora",
  "El Pueblito",
  "El Vegil",
  "Epigmenio González",
  "Escanelilla",
  "Escolásticas",
  "Ezequiel Montes",
  "Galindo",
  "Higueras",
  "Higuerillas",
  "Huimilpan",
  "Jalpan de Serra",
  "Jurica",
  "Juriquilla",
  "La Cañada",
  "La Estancia",
  "La Fuente",
  "La Laguna",
  "Landa de Matamoros",
  "Pedro Escobedo",
  "Peñamiller",
  "Pinal de Amoles",
  "Purísima de Arista",
  "Ranas",
  "Río del Carrizal",
  "San Ildefonso",
  "San Joaquín",
  "San Juan del Río",
  "San Miguel Palmas",
  "San Pablo Tolimán",
  "Santa Rosa Jáuregui",
  "Santiago de Querétaro",
  "Santiago Mexquititlán",
  "Tancoyol",
  "Tejeda",
  "Tequisquiapan",
  "Tolimán",
  "Valle Verde",
  "Villa Progreso",
  "Viborillas",
  "Vizarrón",
  "Zákia"
];

export function Footer() {
  const router = useRouter();

  const scrollTo = (id: string) => {
    if (router.pathname !== "/") {
      router.push(`/${id}`);
      return;
    }

    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4 focus:outline-none focus:ring-2 focus:ring-background/20 rounded-lg transition-transform hover:scale-[1.02]">
              <div className="relative h-32 w-auto" style={{ width: "280px" }}>
                <Image
                  src="/logo_andalu.png"
                  alt="ALDALU Logo"
                  fill
                  unoptimized
                  className="object-contain object-left" />
                
              </div>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed mb-4">
              Brokers de Creditaria en Querétaro. Expertos en crédito hipotecario, automotriz asociados a Kavak y préstamos personales a pensionados del IMSS.
            </p>
            <p className="text-xs text-background/40 italic">
              Donde las grandes decisiones encuentran respaldo.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-primary">Servicios</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => scrollTo("#servicios")} className="text-sm text-background/60 hover:text-primary transition-colors">Crédito Hipotecario</button></li>
              <li><button onClick={() => scrollTo("#servicios")} className="text-sm text-background/60 hover:text-primary transition-colors">Crédito Automotriz (Kavak)</button></li>
              <li><button onClick={() => scrollTo("#servicios")} className="text-sm text-background/60 hover:text-primary transition-colors">Préstamos Personales IMSS</button></li>
              <li><Link href="/contacto" className="text-sm text-background/60 hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-primary">Todo Querétaro</h4>
            <div className="flex flex-wrap gap-2">
              {zones.map((zone) =>
              <span key={zone} className="text-sm bg-background/10 text-background/70 px-3 py-1.5 rounded-full">
                  {zone}
                </span>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-primary">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href="tel:+52442506819" className="text-sm text-background/60 hover:text-primary transition-colors">
                  +52 442 250 6819
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a href="mailto:alonso.espitia.t@gmail.com" className="text-sm text-background/60 hover:text-primary transition-colors">la-espitia@creditaria.com

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
    </footer>);

}