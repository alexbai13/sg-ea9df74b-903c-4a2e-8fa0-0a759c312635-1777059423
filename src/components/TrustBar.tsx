import React from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const banks = [
  { name: "BBVA", color: "#004481" },
  { name: "Banorte", color: "#EC1C24" },
  { name: "Santander", color: "#EC0000" },
  { name: "HSBC", color: "#DB0011" },
  { name: "Scotiabank", color: "#EC111A" },
  { name: "Infonavit", color: "#00843D" },
  { name: "Citibanamex", color: "#1261A0" },
  { name: "Afirme", color: "#003DA5" },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function TrustBar() {
  return (
    <section className="py-10 md:py-14 border-b border-border/50 bg-background relative overflow-hidden">
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest"
        >
          Comparamos entre{" "}
          <span className="text-primary font-bold">+15 instituciones financieras</span>{" "}
          para encontrar tu mejor opción
        </motion.p>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 md:gap-10 flex-wrap"
          >
            {banks.map((bank, i) => (
              <motion.div
                key={bank.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-muted/40 border border-border/50 hover:border-primary/30 hover:bg-muted/70 transition-colors cursor-default"
              >
                <Building2 size={16} className="shrink-0" style={{ color: bank.color }} />
                <span className="text-xs md:text-sm font-semibold text-foreground/70 whitespace-nowrap">
                  {bank.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-center"
        >
          {[
            { value: "+2,500", label: "Familias asesoradas" },
            { value: "$0", label: "Costo para ti" },
            { value: "98%", label: "Satisfacción" },
          ].map((stat) => (
            <div key={stat.label} className="px-2 md:px-4 min-w-[100px]">
              <p className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}