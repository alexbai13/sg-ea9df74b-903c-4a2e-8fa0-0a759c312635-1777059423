import React from "react";
import { motion } from "framer-motion";
import {
  X,
  Check,
  ArrowRight,
  Building2,
  Sparkles } from
"lucide-react";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const comparisons = [
{ label: "Comparar +15 bancos a la vez", solo: false, aldalu: true },
{ label: "Asesor certificado dedicado", solo: false, aldalu: true },
{ label: "Negociación de tasas", solo: false, aldalu: true },
{ label: "Te acompañan en todo el papeleo", solo: false, aldalu: true },
{ label: "Costo del servicio", soloText: "Comisiones ocultas", aldaluText: "$0 — Gratis" },
{ label: "Tiempo promedio", soloText: "3-6 meses", aldaluText: "2-4 semanas" },
{ label: "Opciones de financiamiento", soloText: "1 banco", aldaluText: "+15 instituciones" },
{ label: "Te ofrecen la mejor tasa del mercado", solo: false, aldalu: true }];


export function ComparisonSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14">
          
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={14} />
            La diferencia es clara
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            ¿Por qué no ir{" "}
            <span className="text-muted-foreground line-through decoration-accent/50">
              solo al banco
            </span>
            ?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Compara la experiencia de buscar crédito por tu cuenta vs. con ALDALU a tu lado
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-3xl mx-auto">
          
          <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_160px_160px] items-center bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-3 md:p-5 bg-muted/30 border-b border-border h-full" />
            <div className="p-2 sm:p-3 md:p-5 text-center border-b border-l border-border bg-muted/50 h-full flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <span className="text-[10px] sm:text-xs md:text-sm font-heading font-bold text-muted-foreground leading-tight">
                  Solo al banco
                </span>
              </div>
            </div>
            <div className="p-2 sm:p-3 md:p-5 text-center border-b border-l border-border bg-primary/5 h-full flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5">
                <img
                  src="/AD_Imagotipo_color.png"
                  alt="ALDALU"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                
                <span className="text-[10px] sm:text-xs md:text-sm font-heading font-bold text-primary leading-tight">
                  Con ALDALU
                </span>
              </div>
            </div>

            {comparisons.map((row, i) =>
            <React.Fragment key={i}>
                <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
                className={`p-3 md:p-5 text-[11px] sm:text-sm text-foreground font-medium flex items-center h-full ${i < comparisons.length - 1 ? "border-b border-border" : ""}`}>
                
                  {row.label}
                </motion.div>
                <div
                className={`p-2 sm:p-3 md:p-5 text-center flex items-center justify-center h-full border-l ${i < comparisons.length - 1 ? "border-b" : ""} border-border`}>
                
                  {row.soloText ?
                <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">
                      {row.soloText}
                    </span> :
                row.solo ?
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> :

                <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                }
                </div>
                <div
                className={`p-2 sm:p-3 md:p-5 text-center flex items-center justify-center h-full border-l ${i < comparisons.length - 1 ? "border-b" : ""} border-border bg-primary/[0.02]`}>
                
                  {row.aldaluText ?
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-primary leading-tight">
                      {row.aldaluText}
                    </span> :
                row.aldalu ?
                <Check
                  className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /> :


                <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                }
                </div>
              </React.Fragment>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
            className="text-center mt-8 px-4 sm:px-0">
            
            <button
              onClick={() =>
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center min-h-[56px] gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25 w-full sm:w-auto">
              
              Quiero la mejor tasa
              <ArrowRight size={18} />
            </button>
            <p className="text-xs text-muted-foreground mt-3" style={{ fontSize: "16px" }}>
              Sin costo · Sin compromiso · Respuesta en 24 hrs
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>);

}