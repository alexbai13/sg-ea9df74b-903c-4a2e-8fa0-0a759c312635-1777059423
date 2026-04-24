import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
  }),
};

const stats = [
  { value: "100%", label: "Gratis para ti" },
  { value: "+15", label: "Bancos comparados" },
  { value: "Qro", label: "Querétaro exclusivo" },
];

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-secondary/30 blur-3xl -translate-x-1/3 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-muted/40 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full mb-6"
            >
              <Shield size={16} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Asesores certificados en Querétaro
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight text-balance"
            >
              Donde las grandes decisiones{" "}
              <span className="relative inline-block">
                <span className="relative z-10">encuentran respaldo</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/20 -z-0 rounded" />
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground mt-6 leading-relaxed max-w-lg"
            >
              Buscamos entre bancos para darte la mejor opción de crédito.
              Hipotecario, automotriz o préstamos IMSS —{" "}
              <strong className="text-foreground">sin costo para ti.</strong>
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <button
                onClick={() => scrollTo("#contacto")}
                className="group bg-accent text-accent-foreground px-7 py-3.5 rounded-lg font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
              >
                Solicita tu asesoría gratis
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo("#servicios")}
                className="bg-background border-2 border-primary/20 text-foreground px-7 py-3.5 rounded-lg font-semibold text-base hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
              >
                Conoce nuestros servicios
              </button>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-8 mt-10 pt-8 border-t border-border"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-heading font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80"
                alt="Casa moderna en Querétaro"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Tu guía financiero personal</p>
                    <p className="text-xs text-muted-foreground">Nosotros lo hacemos por ti — sin complicaciones</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <span className="text-accent font-heading font-bold text-lg">$0</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-muted border border-primary/10" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollTo("#servicios")}
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs font-medium">Descubre más</span>
          <ChevronDown size={20} className="animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}