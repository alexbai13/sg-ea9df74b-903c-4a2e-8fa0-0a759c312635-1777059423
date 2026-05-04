import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 600;
      const footerEl = document.getElementById("contacto");
      const footerTop = footerEl?.getBoundingClientRect().top || Infinity;
      setVisible(window.scrollY > heroHeight && footerTop > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-card/95 backdrop-blur-lg border-t border-border px-4 py-3 flex items-center gap-3">
            <button
              onClick={() =>
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex-1 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-bold px-6 py-3 rounded-full text-sm transition-all"
            >
              Asesoría Gratis
              <ArrowRight size={16} />
            </button>
            <a
              href="https://wa.me/525541389710?text=Hola%2C%20me%20interesa%20una%20asesor%C3%ADa%20financiera%20gratuita"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shrink-0"
            >
              <MessageCircle size={22} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}