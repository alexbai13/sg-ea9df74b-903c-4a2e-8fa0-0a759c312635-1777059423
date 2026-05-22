import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const testimonials = [
  {
    name: "Fer López",
    zone: "Juriquilla",
    type: "Crédito Hipotecario",
    quote: "La verdad pensé que buscar hipoteca iba a ser súper tedioso. Me contactó Rodrigo y en unos días ya teníamos varias opciones. Me ahorré bastante en intereses y no tuve que dar tantas vueltas al banco.",
    rating: 4,
    savings: "$180,000",
  },
  {
    name: "Carlos E. Ramírez",
    zone: "Zibatá",
    type: "Crédito Automotriz",
    quote: "Quería comprar coche pero los del banco tardaban mucho en contestar. Los contacté por Whats y me ayudaron súper rápido. Muy buena atención, aunque me pidieron reenviar un papel.",
    rating: 4,
    savings: "Tasa del 11.5%",
  },
  {
    name: "Doña Rosy Martínez",
    zone: "Centro Histórico",
    type: "Préstamo IMSS",
    quote: "Soy pensionada y necesitaba liquidez. Mi asesora Lupita me tuvo mucha paciencia porque no le sé mucho al celular. Me acompañó paso a paso, muy linda señorita.",
    rating: 5,
    savings: "Trámite fácil",
  },
  {
    name: "Javier Hernández",
    zone: "El Refugio",
    type: "Crédito Hipotecario",
    quote: "Llevaba meses atorado con mi banco de toda la vida. Con ellos en un par de semanas ya tenía mi carta de autorización, y con mejor tasa de la que yo creía. Muy recomendables.",
    rating: 5,
    savings: "$120,000",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl -translate-x-1/3" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-3xl translate-x-1/4" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-base font-medium px-5 py-2 rounded-full mb-5">
            <Star size={16} className="fill-accent" />
            Lo que dicen nuestros clientes
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground px-4">
            Historias reales de{" "}
            <span className="text-primary">familias queretanas</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-xl">
            Más de 2,500 familias ya ahorraron con nuestra asesoría gratuita
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -4 }}
              className="relative bg-card border border-border rounded-3xl p-7 md:p-9 hover:shadow-xl hover:shadow-primary/5 transition-shadow"
            >
              <Quote
                size={44}
                className="absolute top-6 right-6 text-primary/10"
              />

              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={18}
                    className={j < t.rating ? "fill-amber-400 text-amber-400" : "text-amber-400/20"}
                  />
                ))}
              </div>

              <p className="text-foreground/90 leading-relaxed mb-7 text-base md:text-lg">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-border/50">
                <div>
                  <p className="font-heading font-bold text-foreground text-base">
                    {t.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin size={14} className="text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {t.zone}
                    </span>
                  </div>
                  <span className="inline-block mt-2.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {t.type}
                  </span>
                </div>
                {t.savings && (
                  <div className="sm:text-right bg-accent/5 sm:bg-transparent p-3 sm:p-0 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground">Ahorro</p>
                    <p className="text-xl md:text-2xl font-heading font-bold text-accent">
                      {t.savings}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}