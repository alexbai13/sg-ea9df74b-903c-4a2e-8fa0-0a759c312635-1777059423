import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Search, BarChart3, FileCheck } from "lucide-react";

const steps = [
{
  icon: MessageCircle,
  number: "01",
  title: "Cuéntanos tu meta",
  description: "¿Casa, auto o préstamo? Nos compartes tu situación y nosotros tomamos el volante."
},
{
  icon: Search,
  number: "02",
  title: "Analizamos tu perfil",
  description: "Revisamos tus ingresos, historial y necesidades para determinar qué crédito te conviene."
},
{
  icon: BarChart3,
  number: "03",
  title: "Comparamos el mercado",
  description: "Buscamos entre todos los bancos e instituciones para encontrar la mejor tasa y condiciones."
},
{
  icon: FileCheck,
  number: "04",
  title: "Te acompañamos hasta la firma",
  description: "Desde la preaprobación hasta las escrituras o entrega. Sin complicaciones, sin costo."
}];


export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left">
            
            <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Proceso simple
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
              Tú no tienes que ir banco por banco
            </h2>
            <p className="text-muted-foreground mt-4 text-lg lg:text-xl">
              Nosotros lo hacemos por ti — en 4 pasos claros y sin complicaciones.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative">
            
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden border border-border/40 shadow-2xl shadow-primary/10">
              <Image
                src="/andalu_cuadrado1_1_.png"
                alt="Pareja revisando documentos financieros con asesor ALDALU"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 50vw"
                className="object-cover object-center"
                quality={90} />
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 mix-blend-overlay pointer-events-none" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-accent/15 border border-accent/25 backdrop-blur-sm flex items-center justify-center">
              <span className="text-accent font-heading font-bold text-xl">100%</span>
            </div>
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-primary/10 border border-primary/20" aria-hidden="true" />
          </motion.div>
        </div>

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
                className="relative text-center">
                
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
              </motion.div>);

          })}
        </div>
      </div>
    </section>);

}