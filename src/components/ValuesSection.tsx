import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

function FloatingIcon({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -6, 0, 6, 0],
        rotate: [0, 3, 0, -3, 0],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gradient1Y = useSpring(useTransform(scrollYProgress, [0, 1], [60, -80]), { stiffness: 50, damping: 25 });
  const gradient2Y = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 100]), { stiffness: 50, damping: 25 });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.02, 0.05, 0.05, 0.02]);

  return (
    <section ref={sectionRef} id="valores" className="py-20 md:py-28 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-10 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[120px]"
          style={{ y: gradient1Y }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-[280px] h-[280px] rounded-full bg-accent/10 blur-[120px]"
          style={{ y: gradient2Y }}
        />
      </div>
      <motion.img
        src="/AD_Imagotipo_bco.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-8 right-8 w-32 h-32 object-contain pointer-events-none select-none"
        style={{ y: watermarkY, opacity: watermarkOpacity }}
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block bg-primary/20 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4"
          >
            Nuestro ADN
          </motion.span>
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
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -6,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="bg-background/5 border border-background/10 rounded-xl p-5 transition-colors"
              >
                <FloatingIcon delay={index * 0.4}>
                  <div className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-primary" />
                  </div>
                </FloatingIcon>
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