import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const servicios = [
  "Crédito Hipotecario",
  "Crédito Automotriz (Kavak)",
  "Préstamos Personales IMSS",
];

interface FormData {
  nombre: string;
  edad: string;
  correo: string;
  telefono: string;
  servicio: string;
  privacidad: boolean;
}

export function LeadForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    nombre: "",
    edad: "",
    correo: "",
    telefono: "",
    servicio: "",
    privacidad: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.nombre.trim()) newErrors.nombre = "Requerido";
    if (!form.edad.trim() || isNaN(Number(form.edad))) newErrors.edad = "Edad válida requerida";
    if (!form.correo.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) newErrors.correo = "Correo válido requerido";
    if (!form.telefono.trim() || !/^\d{10}$/.test(form.telefono.replace(/\D/g, ""))) newErrors.telefono = "Debe tener 10 dígitos exactos";
    if (!form.servicio) newErrors.servicio = "Selecciona un servicio";
    if (!form.privacidad) newErrors.privacidad = "Acepta el aviso de privacidad";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      router.push("/gracias");
    }
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section id="contacto" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/30 blur-3xl translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-muted/50 blur-3xl -translate-x-1/3" aria-hidden="true" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-accent/10 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Asesoría sin costo
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
              Déjalo en nuestras manos
            </h2>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              Completa tus datos y un asesor certificado te contactará para encontrar tu mejor opción de crédito. <strong className="text-foreground">Sin compromiso, sin costo.</strong>
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Comparamos más de 15 bancos por ti",
                "Proceso simple y sin burocracia",
                "Te acompañamos hasta la firma",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={14} className="text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 relative h-[250px] sm:h-[300px] w-full max-w-sm mx-auto lg:mx-0 hidden sm:block">
              <motion.div
                className="absolute top-0 left-0 w-48 h-48 sm:w-56 sm:h-56 overflow-hidden border-[6px] border-background shadow-2xl z-10 relative"
                animate={{
                  y: [0, -15, 0],
                  borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/7.png"
                  alt="Servicios Financieros"
                  fill
                  sizes="224px"
                  className="object-cover scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
              </motion.div>

              <motion.div
                className="absolute bottom-0 right-0 w-40 h-40 sm:w-48 sm:h-48 overflow-hidden border-[6px] border-background shadow-xl z-20 relative"
                animate={{
                  y: [0, 20, 0],
                  borderRadius: ["50% 50% 50% 70% / 50% 50% 70% 50%", "50% 70% 50% 50% / 70% 50% 50% 50%", "50% 50% 50% 70% / 50% 50% 70% 50%"]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Image
                  src="/11.png"
                  alt="Asesoría ALDALU"
                  fill
                  sizes="192px"
                  className="object-cover scale-110"
                />
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay pointer-events-none" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="absolute -top-4 -right-8 w-24 h-24 sm:w-28 sm:h-28 z-10 hidden lg:block pointer-events-none opacity-90"
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    borderRadius: [
                      "50% 50% 55% 45% / 52% 48% 52% 48%",
                      "55% 45% 45% 55% / 48% 52% 48% 52%",
                      "50% 50% 55% 45% / 52% 48% 52% 48%"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="w-full h-full overflow-hidden border-[3px] border-background shadow-lg relative"
                >
                  <Image
                    src="/p1.png"
                    alt="Cliente Premium"
                    fill
                    sizes="112px"
                    className="object-cover object-center scale-105"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-xl shadow-primary/5"
          >
            <h3 className="text-xl font-heading font-bold text-foreground mb-6">
              Completa tus datos
            </h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-1.5">Nombre completo *</label>
                <input
                  id="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  placeholder="Tu nombre completo"
                  aria-required="true"
                  aria-invalid={!!errors.nombre}
                  aria-describedby={errors.nombre ? "nombre-error" : undefined}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.nombre ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                />
                {errors.nombre && <p id="nombre-error" className="text-xs text-destructive mt-1" role="alert">{errors.nombre}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edad" className="block text-sm font-medium text-foreground mb-1.5">Edad *</label>
                  <input
                    id="edad"
                    type="number"
                    value={form.edad}
                    onChange={(e) => handleChange("edad", e.target.value)}
                    placeholder="Edad"
                    min="18"
                    max="99"
                    aria-required="true"
                    aria-invalid={!!errors.edad}
                    aria-describedby={errors.edad ? "edad-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.edad ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                  />
                  {errors.edad && <p id="edad-error" className="text-xs text-destructive mt-1" role="alert">{errors.edad}</p>}
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-1.5">Teléfono *</label>
                  <input
                    id="telefono"
                    type="tel"
                    value={form.telefono}
                    onChange={(e) => handleChange("telefono", e.target.value)}
                    placeholder="10 dígitos"
                    aria-required="true"
                    aria-invalid={!!errors.telefono}
                    aria-describedby={errors.telefono ? "telefono-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.telefono ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                  />
                  {errors.telefono && <p id="telefono-error" className="text-xs text-destructive mt-1" role="alert">{errors.telefono}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-foreground mb-1.5">Correo electrónico *</label>
                <input
                  id="correo"
                  type="email"
                  value={form.correo}
                  onChange={(e) => handleChange("correo", e.target.value)}
                  placeholder="tu@correo.com"
                  aria-required="true"
                  aria-invalid={!!errors.correo}
                  aria-describedby={errors.correo ? "correo-error" : undefined}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.correo ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                />
                {errors.correo && <p id="correo-error" className="text-xs text-destructive mt-1" role="alert">{errors.correo}</p>}
              </div>

              <div>
                <label htmlFor="servicio" className="block text-sm font-medium text-foreground mb-1.5">Servicio de interés *</label>
                <select
                  id="servicio"
                  value={form.servicio}
                  onChange={(e) => handleChange("servicio", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.servicio}
                  aria-describedby={errors.servicio ? "servicio-error" : undefined}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.servicio ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.servicio && <p id="servicio-error" className="text-xs text-destructive mt-1" role="alert">{errors.servicio}</p>}
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  checked={form.privacidad}
                  onChange={(e) => handleChange("privacidad", e.target.checked)}
                  id="privacidad"
                  aria-required="true"
                  aria-invalid={!!errors.privacidad}
                  aria-describedby={errors.privacidad ? "privacidad-error" : undefined}
                  className="mt-1 w-4 h-4 rounded border-input text-primary focus:ring-primary/30"
                />
                <label htmlFor="privacidad" className="text-xs text-muted-foreground leading-relaxed">
                  Acepto el{" "}
                  <Link href="/privacidad" className="text-primary underline hover:text-primary/80">
                    aviso de privacidad
                  </Link>{" "}
                  y autorizo el contacto comercial por teléfono, correo o WhatsApp. *
                </label>
              </div>
              {errors.privacidad && <p id="privacidad-error" className="text-xs text-destructive -mt-2" role="alert">{errors.privacidad}</p>}

              <button
                type="submit"
                className="w-full bg-accent text-accent-foreground py-3.5 rounded-lg font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-label="Enviar solicitud de asesoría"
              >
                <Send size={18} aria-hidden="true" />
                Enviar solicitud
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}