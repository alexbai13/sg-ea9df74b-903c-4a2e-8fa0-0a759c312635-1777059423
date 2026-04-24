import React from "react";
import { motion } from "framer-motion";
import { Home, Car, HeartHandshake, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Crédito Hipotecario",
    description: "Comparamos entre todos los bancos e Infonavit para encontrarte la mejor tasa y condiciones. También cambio de hipoteca para mejorar tu crédito actual.",
    features: ["Compra de vivienda", "Cambio de hipoteca", "Mejora de tasa"],
    color: "primary" as const,
  },
  {
    icon: Car,
    title: "Crédito Automotriz",
    description: "Asesoría gratuita para créditos de auto con bancos y socios como Kavak. Nuevos, seminuevos o particulares — todos los trámites son gratuitos.",
    features: ["Autos nuevos y seminuevos", "Socios Kavak", "Trámite 100% gratis"],
    color: "primary" as const,
  },
  {
    icon: HeartHandshake,
    title: "Préstamos IMSS",
    description: "Acompañamiento sin costo para pensionados que buscan liquidez segura. El IMSS otorga el crédito sobre tu pensión — nosotros te guiamos en todo el proceso.",
    features: ["Exclusivo pensionados", "Garantía sobre pensión", "Sin costo"],
    color: "accent" as const,
  },
];

const colorMap = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
    hover: "group-hover:border-primary/40",
    pill: "bg-primary/8 text-primary",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    border: "border-accent/20",
    hover: "group-hover:border-accent/40",
    pill: "bg-secondary text-secondary-foreground",
  },
};

export function ServicesSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="servicios" className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-secondary/20 blur-3xl" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Tu supermercado financiero
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Tres caminos, un mismo compromiso
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            No representamos a un banco — comparamos todas las opciones del mercado para ti.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const colors = colorMap[service.color];
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`group bg-background rounded-2xl p-6 lg:p-8 border ${colors.border} ${colors.hover} transition-all hover:shadow-lg hover:shadow-primary/5 cursor-pointer`}
                onClick={() => scrollTo("#contacto")}
              >
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-5`}>
                  <Icon size={28} className={colors.text} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((f) => (
                    <span key={f} className={`text-xs font-medium px-3 py-1 rounded-full ${colors.pill}`}>
                      {f}
                    </span>
                  ))}
                </div>
                <div className={`flex items-center gap-2 text-sm font-semibold ${colors.text} group-hover:gap-3 transition-all`}>
                  Solicitar asesoría <ArrowRight size={16} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-10 bg-foreground/5 rounded-xl py-4 px-6 max-w-2xl mx-auto"
        >
          <strong className="text-foreground">Asesoría 100% Gratuita</strong> + Análisis Perfilado + Comparación de Mercado = El banco paga, tú ahorras.
        </motion.p>
      </div>
    </section>
  );
}