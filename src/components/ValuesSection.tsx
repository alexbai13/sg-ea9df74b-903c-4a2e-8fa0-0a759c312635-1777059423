import React from "react";
import { motion } from "framer-motion";
import { Eye, Zap, ShieldCheck, Users, Scale } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Transparencia",
    description: "Todo claro, sin costos ocultos. El cliente no paga el servicio; lo absorbe el banco.",
  },
  {
    icon: Zap,
    title: "Simplicidad",
    description: "Cero fricción. Hacemos fácil lo que normalmente es un laberinto burocrático.",
  },
  {
    icon: ShieldCheck,
    title: "Profesionalismo",
    description: "Conocimiento sólido, asesores certificados y respaldo institucional que respalda cada decisión.",
  },
  {
    icon: Users,
    title: "Acompañamiento",
    description: "Apoyo incondicional desde la primera duda hasta la firma final. Nunca estás solo.",
  },
  {
    icon: Scale,
    title: "La mejor opción",
    description: "Comparación objetiva del mercado para encontrar la tasa y condiciones óptimas para ti.",
  },
];

export function ValuesSection() {
  return (
    <section id="valores" className="py-20 md:py-28 bg-foreground text-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[250px] h-[250px] rounded-full bg-accent/10 blur-3xl" />
      </div>
      <img
        src="/AD_Imagotipo_bco.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-8 right-8 w-32 h-32 object-contain opacity-[0.04] pointer-events-none select-none"
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block bg-primary/20 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Nuestro ADN
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
            No somos vendedores, somos tu guía financiero
          </h2>
          <p className="text-background/60 mt-4 text-lg">
            Actuamos como el asesor que simplifica lo complejo sin tecnicismos innecesarios.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-background/5 border border-background/10 rounded-xl p-5 hover:bg-background/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="text-base font-heading font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-background/60 leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}