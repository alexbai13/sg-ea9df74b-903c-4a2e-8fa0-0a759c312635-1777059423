import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "5215541389710";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola, me interesa recibir asesoría financiera gratuita en Querétaro. ¿Podrían ayudarme?"
);

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowTooltip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-3">
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Contactar por WhatsApp para asesoría financiera"
        aria-describedby={showTooltip ? "whatsapp-tooltip" : undefined}
      >
        <MessageCircle size={26} aria-hidden="true" />
      </motion.a>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            id="whatsapp-tooltip"
            role="tooltip"
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            className="bg-background rounded-xl shadow-xl border border-border p-3 max-w-[200px] relative mb-1"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Cerrar tooltip"
            >
              <X size={10} className="text-foreground" />
            </button>
            <p className="text-xs text-foreground leading-relaxed">
              ¿Tienes dudas? Escríbenos por <strong className="text-green-600">WhatsApp</strong> y te ayudamos.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}