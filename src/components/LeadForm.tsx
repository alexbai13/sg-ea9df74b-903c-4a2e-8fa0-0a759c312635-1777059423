import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const servicios = [
  "Crédito Hipotecario",
  "Crédito Automotriz (Kavak)",
  "Préstamos Personales IMSS",
] as const;

const leadFormSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  edad: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 18 && num <= 99;
  }, "Debes ser mayor de edad (18-99 años)"),
  correo: z.string().email("Ingresa un correo electrónico válido"),
  telefono: z.string().regex(/^\d{10}$/, "El teléfono debe tener exactamente 10 dígitos"),
  servicio: z.string().min(1, "Debes seleccionar un servicio"),
  // Campos Hipotecario
  valorInmueble: z.string().optional(),
  enganche: z.string().optional(),
  ingresos: z.string().optional(),
  situacionLaboral: z.string().optional(),
  estadoCivil: z.string().optional(),
  estatusInfonavit: z.string().optional(),
  // Campos Auto
  valorAuto: z.string().optional(),
  engancheAuto: z.string().optional(),
  historialCrediticio: z.string().optional(),
  // Campos IMSS
  tipoPension: z.string().optional(),
  montoPension: z.string().optional(),
  prestamoActivo: z.string().optional(),
  
  privacidad: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar el aviso de privacidad" }),
  }),
});

type FormData = z.infer<typeof leadFormSchema>;

export function LeadForm() {
  const router = useRouter();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      nombre: "",
      edad: "",
      correo: "",
      telefono: "",
      servicio: "",
      valorInmueble: "",
      enganche: "",
      ingresos: "",
      situacionLaboral: "",
      estadoCivil: "",
      estatusInfonavit: "",
      valorAuto: "",
      engancheAuto: "",
      historialCrediticio: "",
      tipoPension: "",
      montoPension: "",
      prestamoActivo: "",
    },
  });

  const selectedServicio = watch("servicio");

  const onSubmit = async (data: FormData) => {
    // Aquí iría la lógica para enviar a tu API o base de datos (Supabase)
    console.log("Form Data Validated:", data);
    
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast({
      title: "¡Solicitud enviada con éxito!",
      description: "Un asesor certificado te contactará muy pronto.",
      variant: "default",
      className: "bg-primary text-primary-foreground border-none",
    });

    reset();
    
    // Opcional: Redirigir a página de gracias después de unos segundos
    setTimeout(() => {
      router.push("/gracias");
    }, 2000);
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
                  src="/generated/young-friends-planning.png"
                  alt="Servicios Financieros Jóvenes"
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
                  src="/generated/young-man-keys.png"
                  alt="Asesoría ALDALU Nueva Casa"
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
                    src="/generated/young-woman-signing.png"
                    alt="Cliente Premium Firmando"
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
            onSubmit={handleSubmit(onSubmit)}
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
                  {...register("nombre")}
                  placeholder="Tu nombre completo"
                  aria-required="true"
                  aria-invalid={!!errors.nombre}
                  aria-describedby={errors.nombre ? "nombre-error" : undefined}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.nombre ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                />
                {errors.nombre && <p id="nombre-error" className="text-xs text-destructive mt-1" role="alert">{errors.nombre.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edad" className="block text-sm font-medium text-foreground mb-1.5">Edad *</label>
                  <input
                    id="edad"
                    type="number"
                    {...register("edad")}
                    placeholder="Edad"
                    min="18"
                    max="99"
                    aria-required="true"
                    aria-invalid={!!errors.edad}
                    aria-describedby={errors.edad ? "edad-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.edad ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                  />
                  {errors.edad && <p id="edad-error" className="text-xs text-destructive mt-1" role="alert">{errors.edad.message}</p>}
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-1.5">Teléfono *</label>
                  <input
                    id="telefono"
                    type="tel"
                    {...register("telefono")}
                    placeholder="10 dígitos"
                    aria-required="true"
                    aria-invalid={!!errors.telefono}
                    aria-describedby={errors.telefono ? "telefono-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.telefono ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                  />
                  {errors.telefono && <p id="telefono-error" className="text-xs text-destructive mt-1" role="alert">{errors.telefono.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-foreground mb-1.5">Correo electrónico *</label>
                <input
                  id="correo"
                  type="email"
                  {...register("correo")}
                  placeholder="tu@correo.com"
                  aria-required="true"
                  aria-invalid={!!errors.correo}
                  aria-describedby={errors.correo ? "correo-error" : undefined}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.correo ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                />
                {errors.correo && <p id="correo-error" className="text-xs text-destructive mt-1" role="alert">{errors.correo.message}</p>}
              </div>

              <div>
                <label htmlFor="servicio" className="block text-sm font-medium text-foreground mb-1.5">Servicio de interés *</label>
                <select
                  id="servicio"
                  {...register("servicio")}
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
                {errors.servicio && <p id="servicio-error" className="text-xs text-destructive mt-1" role="alert">{errors.servicio.message}</p>}
              </div>

              {selectedServicio === "Crédito Hipotecario" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="grid grid-cols-2 gap-4 mt-4 bg-muted/40 p-5 rounded-xl border border-primary/10"
                >
                  <div className="col-span-2">
                    <p className="text-sm font-semibold text-foreground mb-1">Precalificación Hipotecaria (Opcional)</p>
                    <p className="text-xs text-muted-foreground mb-3">Estos datos nos ayudan a darte una mejor respuesta más rápido.</p>
                  </div>
                  
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="situacionLaboral" className="block text-xs font-medium text-foreground mb-1">Situación Laboral</label>
                    <select
                      id="situacionLaboral"
                      {...register("situacionLaboral")}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Asalariado">Asalariado (Nómina)</option>
                      <option value="Independiente">Independiente (Persona Física)</option>
                      <option value="Empresario">Empresario (Persona Moral)</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="estadoCivil" className="block text-xs font-medium text-foreground mb-1">Estado Civil</label>
                    <select
                      id="estadoCivil"
                      {...register("estadoCivil")}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Soltero">Soltero/a</option>
                      <option value="Casado">Casado/a</option>
                      <option value="Concubinato">Unión Libre / Concubinato</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="estatusInfonavit" className="block text-xs font-medium text-foreground mb-1">Estatus Infonavit / Fovissste</label>
                    <select
                      id="estatusInfonavit"
                      {...register("estatusInfonavit")}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Tengo puntos Infonavit">Ya chequé, sí tengo puntos Infonavit</option>
                      <option value="Tengo puntos Fovissste">Ya chequé, sí tengo Fovissste</option>
                      <option value="No se como checarlo">No sé cómo checar mis puntos</option>
                      <option value="No cotizo">No cotizo en ninguna institución</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="valorInmueble" className="block text-xs font-medium text-foreground mb-1">Valor Inmueble (Aprox)</label>
                    <input
                      id="valorInmueble"
                      type="number"
                      {...register("valorInmueble")}
                      placeholder="$"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="enganche" className="block text-xs font-medium text-foreground mb-1">Enganche Disponible</label>
                    <input
                      id="enganche"
                      type="number"
                      {...register("enganche")}
                      placeholder="$"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="ingresos" className="block text-xs font-medium text-foreground mb-1">Ingresos Mensuales</label>
                    <input
                      id="ingresos"
                      type="number"
                      {...register("ingresos")}
                      placeholder="$"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                </motion.div>
              )}

              {selectedServicio === "Crédito Automotriz (Kavak)" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="grid grid-cols-2 gap-4 mt-4 bg-secondary/20 p-5 rounded-xl border border-secondary/30"
                >
                  <div className="col-span-2">
                    <p className="text-sm font-semibold text-foreground mb-1">Perfil Automotriz (Opcional)</p>
                    <p className="text-xs text-muted-foreground mb-3">Ayúdanos a encontrar el coche perfecto para ti con Kavak.</p>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="valorAuto" className="block text-xs font-medium text-foreground mb-1">Valor del Auto (Aprox)</label>
                    <input
                      id="valorAuto"
                      type="number"
                      {...register("valorAuto")}
                      placeholder="$"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="engancheAuto" className="block text-xs font-medium text-foreground mb-1">Enganche Disponible</label>
                    <input
                      id="engancheAuto"
                      type="number"
                      {...register("engancheAuto")}
                      placeholder="$"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="historialCrediticio" className="block text-xs font-medium text-foreground mb-1">¿Cómo consideras tu Buró de Crédito?</label>
                    <select
                      id="historialCrediticio"
                      {...register("historialCrediticio")}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Excelente">Excelente (Nunca me atraso)</option>
                      <option value="Bueno">Bueno (Algunos atrasos leves)</option>
                      <option value="Regular">Regular (Tuve problemas pero ya pagué)</option>
                      <option value="No se / Sin historial">No tengo historial o no lo sé</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {selectedServicio === "Préstamos Personales IMSS" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="grid grid-cols-2 gap-4 mt-4 bg-accent/5 p-5 rounded-xl border border-accent/20"
                >
                  <div className="col-span-2">
                    <p className="text-sm font-semibold text-foreground mb-1">Perfil Pensionado IMSS (Opcional)</p>
                    <p className="text-xs text-muted-foreground mb-3">Conocer tu pensión nos permite ofrecerte la mejor tasa.</p>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="tipoPension" className="block text-xs font-medium text-foreground mb-1">Tipo de Pensión IMSS</label>
                    <select
                      id="tipoPension"
                      {...register("tipoPension")}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-colors"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Vejez">Vejez (Ley 73)</option>
                      <option value="Cesantia">Cesantía en Edad Avanzada</option>
                      <option value="Viudez">Viudez</option>
                      <option value="Incapacidad">Incapacidad Parcial/Permanente</option>
                      <option value="Otra">Otra / No estoy seguro</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="montoPension" className="block text-xs font-medium text-foreground mb-1">Pensión Mensual Neta</label>
                    <input
                      id="montoPension"
                      type="number"
                      {...register("montoPension")}
                      placeholder="$"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-colors"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="prestamoActivo" className="block text-xs font-medium text-foreground mb-1">¿Tienes préstamos activos?</label>
                    <select
                      id="prestamoActivo"
                      {...register("prestamoActivo")}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-colors"
                    >
                      <option value="">Selecciona</option>
                      <option value="Si">Sí, me descuentan actualmente</option>
                      <option value="No">No, mi recibo está libre</option>
                    </select>
                  </div>
                </motion.div>
              )}

              <div className="flex items-start gap-3 pt-3">
                <input
                  type="checkbox"
                  {...register("privacidad")}
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
              {errors.privacidad && <p id="privacidad-error" className="text-xs text-destructive -mt-2" role="alert">{errors.privacidad.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground py-3.5 rounded-lg font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar solicitud de asesoría"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" />
                    Enviar solicitud
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}