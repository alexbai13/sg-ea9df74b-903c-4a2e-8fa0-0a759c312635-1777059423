import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const testimonials = [
  {
    name: "María Fernanda López",
    zone: "Juriquilla, Querétaro",
    type: "Crédito Hipotecario",
    quote: "Pensé que comparar bancos iba a ser un dolor de cabeza. ALDALU lo hizo en 3 días y me ahorraron más de $180,000 en intereses. Mi asesor Rodrigo me explicó todo sin tecnicismos.",
    rating: 5,
    savings: "$180,000",
  },
  {
    name: "Carlos Eduardo Ramírez",
    zone: "Zibatá, Querétaro",
    type: "Crédito Automotriz",
    quote: "Quería un auto nuevo y no sabía ni por dónde empezar. Me presentaron 4 opciones de financiamiento y elegí la de menor tasa. Cero costo para mí, increíble servicio.",
    rating: 5,
    savings: "$45,000",
  },
  {
    name: "Rosa Elena Martínez",
    zone: "Centro, Querétaro",
    type: "Préstamo IMSS",
    quote: "Soy pensionada y necesitaba un préstamo. Mi asesora Lupita me acompañó en todo el proceso, fue rápido y transparente. A mi edad eso se valora mucho.",
    rating: 5,
    savings: "Tasa preferencial",
  },
  {
    name: "Javier Hernández Torres",
    zone: "El Refugio, Querétaro",
    type: "Crédito Hipotecario",
    quote: "Llevaba 6 meses intentando solo con el banco y no avanzaba. Con ALDALU en 2 semanas ya tenía mi preaprobación con mejor tasa que la que yo había negociado. 100% recomendados.",
    rating: 5,
    savings: "$220,000",
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
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Star size={14} className="fill-accent" />
            Lo que dicen nuestros clientes
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Historias reales de{" "}
            <span className="text-primary">familias queretanas</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
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
              className="relative bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-xl hover:shadow-primary/5 transition-shadow"
            >
              <Quote
                size={40}
                className="absolute top-5 right-5 text-primary/10"
              />

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-foreground/90 leading-relaxed mb-6 text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <p className="font-heading font-bold text-foreground text-sm">
                    {t.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {t.zone}
                    </span>
                  </div>
                  <span className="inline-block mt-2 text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                    {t.type}
                  </span>
                </div>
                {t.savings && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Ahorro</p>
                    <p className="text-lg font-heading font-bold text-accent">
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