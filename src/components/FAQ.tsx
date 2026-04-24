import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Realmente no cobran nada por la asesoría?",
    answer: "Correcto. Nuestro servicio es 100% gratuito para ti. Cuando se firma el crédito, el banco o la institución financiera nos paga una comisión. Tú nunca pagas nada adicional.",
  },
  {
    question: "¿Cómo es diferente a ir directo al banco?",
    answer: "En un banco solo te ofrecen sus propios productos. Nosotros comparamos entre más de 15 bancos e instituciones (incluyendo Infonavit) para encontrarte la mejor tasa y condiciones. Somos como un supermercado financiero.",
  },
  {
    question: "¿Qué necesito para solicitar un crédito hipotecario?",
    answer: "Para iniciar solo necesitamos conocer tu situación financiera básica: ingresos, antigüedad laboral e historial crediticio. Nosotros te guiamos paso a paso con los documentos necesarios según tu perfil.",
  },
  {
    question: "¿También ayudan con cambio de hipoteca?",
    answer: "Sí. Si ya tienes una hipoteca con algún banco, podemos asesorarte para cambiarte a otro banco con mejor tasa de interés y condiciones — todo sin costo para ti.",
  },
  {
    question: "¿Cómo funciona el crédito automotriz?",
    answer: "Buscamos las mejores opciones de crédito para tu auto con nuestros socios comerciales (bancos e instituciones financieras). También trabajamos como socios de Kavak para facilitar trámites de crédito. Todo es gratuito.",
  },
  {
    question: "¿Quiénes pueden solicitar el préstamo IMSS?",
    answer: "Este servicio es exclusivo para pensionados del IMSS (generalmente 65+ años). El crédito lo otorga directamente el IMSS y la garantía es tu pensión. Nosotros te acompañamos en todo el trámite sin costo.",
  },
  {
    question: "¿Solo atienden en Querétaro?",
    answer: "Sí, nos enfocamos exclusivamente en el estado de Querétaro y sus municipios: Juriquilla, Zibatá, Corregidora, Zakia, El Refugio, Centro Sur y todas las zonas de la ciudad.",
  },
  {
    question: "¿Cuánto tarda el proceso?",
    answer: "Depende del tipo de crédito. Un hipotecario puede tomar de 4 a 8 semanas, un automotriz de 1 a 3 semanas, y un préstamo IMSS varía según el caso. Te mantenemos informado en cada paso del camino.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block bg-accent/10 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Resolvemos tus dudas
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Preguntas frecuentes
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Todo lo que necesitas saber antes de dar el primer paso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl border border-border px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}