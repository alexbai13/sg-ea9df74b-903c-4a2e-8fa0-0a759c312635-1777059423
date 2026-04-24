import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Search, BarChart3, FileCheck } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Cuéntanos tu meta",
    description: "¿Casa, auto o préstamo? Nos compartes tu situación y nosotros tomamos el volante.",
  },
  {
    icon: Search,
    number: "02",
    title: "Analizamos tu perfil",
    description: "Revisamos tus ingresos, historial y necesidades para determinar qué crédito te conviene.",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "Comparamos el mercado",
    description: "Buscamos entre todos los bancos e instituciones para encontrar la mejor tasa y condiciones.",
  },
  {
    icon: FileCheck,
    number: "04",
    title: "Te acompañamos hasta la firma",
    description: "Desde la preaprobación hasta las escrituras o entrega. Sin complicaciones, sin costo.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Proceso simple
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Tú no tienes que ir banco por banco
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Nosotros lo hacemos por ti — en 4 pasos claros y sin complicaciones.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative text-center"
              >
                <div className="relative mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5 border-2 border-primary/20">
                  <Icon size={28} className="text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shadow-lg shadow-accent/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}