import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Home, Car, HeartHandshake, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Crédito Hipotecario",
    description: "Como Brokers de Creditaria, comparamos entre todos los bancos e Infonavit para encontrarte la mejor tasa y condiciones. También cambio de hipoteca para mejorar tu crédito actual.",
    features: ["Compra de vivienda", "Cambio de hipoteca", "Mejora de tasa"],
    color: "primary" as const,
  },
  {
    icon: Car,
    title: "Crédito Automotriz (Kavak)",
    description: "Asesoría gratuita para créditos de auto. Estamos asociados a Kavak y trabajamos con múltiples bancos para que estrenes auto nuevo o seminuevo rápidamente.",
    features: ["Asociados a Kavak", "Autos nuevos y seminuevos", "Trámite 100% gratis"],
    color: "primary" as const,
  },
  {
    icon: HeartHandshake,
    title: "Préstamos Personales IMSS",
    description: "Préstamos personales exclusivos para pensionados del IMSS. Un trámite seguro, con descuento vía nómina y garantía sobre tu pensión. Nosotros te guiamos en todo el proceso.",
    features: ["Pensionados IMSS", "Descuento vía nómina", "Trámite seguro"],
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), { stiffness: 60, damping: 25 });
  const blob2Y = useSpring(useTransform(scrollYProgress, [0, 1], [-60, 100]), { stiffness: 60, damping: 25 });
  const blob1X = useTransform(scrollYProgress, [0, 0.5, 1], [0, 30, 0]);
  const watermarkRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const watermarkScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="servicios" className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]"
        style={{ y: blob1Y, x: blob1X }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-secondary/20 blur-[100px]"
        style={{ y: blob2Y }}
        aria-hidden="true"
      />
      <div className="absolute top-8 right-8 w-24 h-24" aria-hidden="true">
        <Image
          src="/AD_Imagotipo_color.png"
          alt=""
          fill
          sizes="96px"
          className="object-contain opacity-[0.04] pointer-events-none select-none"
        />
      </div>

      <motion.div
        className="absolute top-40 left-0 lg:-left-20 w-48 h-48 md:w-64 md:h-64 lg:w-[500px] lg:h-[500px] opacity-[0.12] lg:opacity-[0.15] pointer-events-none overflow-hidden mix-blend-luminosity"
        style={{ y: blob1Y, x: blob1X }}
        animate={{
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "40% 60% 70% 30% / 40% 50% 60% 50%"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/generated/young-professional-1.png"
          alt="Joven profesional hipoteca"
          fill
          sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 500px"
          className="object-cover scale-110"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="absolute top-24 right-4 md:top-32 md:right-8 lg:right-20 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 z-0 pointer-events-none opacity-85 lg:opacity-90"
        style={{ y: blob2Y }}
      >
        <motion.div
          animate={{
            borderRadius: [
              "48% 52% 60% 40% / 45% 50% 50% 55%",
              "52% 48% 40% 60% / 55% 45% 55% 45%",
              "48% 52% 60% 40% / 45% 50% 50% 55%"
            ]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-full h-full overflow-hidden border-[3px] md:border-[4px] border-background shadow-lg relative"
        >
          <Image
            src="/generated/young-professional-2.png"
            alt="Joven cliente feliz"
            fill
            sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
            className="object-cover object-center scale-105"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-16 left-4 md:bottom-20 md:left-8 lg:left-10 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 z-0 pointer-events-none opacity-80 lg:opacity-85"
        style={{ y: blob1Y }}
      >
        <motion.div
          animate={{
            borderRadius: [
              "50% 50% 55% 45% / 48% 52% 48% 52%",
              "55% 45% 45% 55% / 52% 48% 52% 48%",
              "50% 50% 55% 45% / 48% 52% 48% 52%"
            ]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="w-full h-full overflow-hidden border-[3px] md:border-[4px] border-background shadow-lg relative"
        >
          <Image
            src="/generated/young-professional-3.png"
            alt="Joven automotriz"
            fill
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 128px"
            className="object-cover object-center scale-105"
          />
        </motion.div>
      </motion.div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block bg-primary/10 text-primary text-base font-medium px-5 py-2 rounded-full mb-5"
          >
            Tu supermercado financiero
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">
            Tres caminos, un mismo compromiso
          </h2>
          <p className="text-muted-foreground mt-5 text-xl md:text-2xl">
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
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className={`group bg-card rounded-3xl p-7 lg:p-9 border ${colors.border} ${colors.hover} transition-colors hover:shadow-xl hover:shadow-primary/8 cursor-pointer`}
                onClick={() => scrollTo("#contacto")}
              >
                <motion.div
                  className={`w-16 h-16 rounded-xl ${colors.bg} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                >
                  <Icon size={32} className={colors.text} />
                </motion.div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {service.features.map((f, fi) => (
                    <motion.span
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.2 + fi * 0.08 }}
                      className={`text-sm font-medium px-3.5 py-1.5 rounded-full ${colors.pill}`}
                    >
                      {f}
                    </motion.span>
                  ))}
                </div>
                <div className={`flex items-center gap-2 text-base font-semibold ${colors.text} group-hover:gap-3 transition-all`}>
                  Solicitar asesoría <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-base text-muted-foreground mt-12 bg-card border border-border rounded-2xl py-5 px-7 max-w-2xl mx-auto"
        >
          <strong className="text-foreground">Asesoría 100% Gratuita</strong> + Análisis Perfilado + Comparación de Mercado = El banco paga, tú ahorras.
        </motion.p>
      </div>
    </section>
  );
}