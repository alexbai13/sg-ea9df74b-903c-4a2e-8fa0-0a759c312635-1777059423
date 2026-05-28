import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import { leadFormSchema, type LeadFormData } from "@/lib/validations";
import { useRouter } from "next/router";

const servicios = [
  "Crédito Hipotecario",
  "Crédito Automotriz (Kavak)",
  "Préstamos Personales IMSS",
] as const;

export default function Contacto() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LeadFormData>({
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
      desarrollo: "",
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

  const onSubmit = async (data: LeadFormData) => {
    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Ocurrió un error al enviar la solicitud.");
      }

      toast({
        title: "¡Solicitud enviada con éxito!",
        description: "Un asesor certificado te contactará muy pronto.",
        variant: "default",
        className: "bg-primary text-primary-foreground border-none",
      });

      reset();
      
      setTimeout(() => {
        router.push("/gracias");
      }, 2000);
      
    } catch (error: any) {
      toast({
        title: "Error al enviar",
        description: error.message || "Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <SEO
        title="Contacto - ALDALU"
        description="Contacta con ALDALU para asesoría hipotecaria, automotriz o préstamos IMSS en Querétaro. Estamos listos para ayudarte."
        url="https://aldalu.com.mx/contacto"
      />
      
      <Navigation />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Contáctanos
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Estamos aquí para responder tus preguntas y ayudarte a encontrar la mejor solución financiera
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                  Información de Contacto
                </h2>
                <p className="text-muted-foreground mb-8">
                  Nuestro equipo de expertos está listo para ayudarte. Contáctanos por cualquiera de estos medios:
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-6 bg-muted/30 rounded-xl border border-border hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Dirección</h3>
                    <p className="text-muted-foreground">
                      Querétaro, Querétaro<br />
                      México
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-muted/30 rounded-xl border border-border hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Teléfono</h3>
                    <a href="tel:+52442506819" className="text-primary hover:underline">
                      +52 442 250 6819
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-muted/30 rounded-xl border border-border hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Correo Electrónico</h3>
                    <a href="mailto:info@aldalu.com.mx" className="text-primary hover:underline">
                      info@aldalu.com.mx
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-muted/30 rounded-xl border border-border hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Horario de Atención</h3>
                    <p className="text-muted-foreground">
                      Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                      Sábados: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-border shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119072.58351900777!2d-100.48978485!3d20.588656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35b8ad4813e5b%3A0x94c8b6a1d8f5c42f!2zUXVlcsOpdGFybywgUXJvLg!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación ALDALU en Querétaro"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Solicita Información
                </h2>
                <p className="text-muted-foreground mb-8">
                  Completa tus datos y un asesor certificado te contactará para encontrar tu mejor opción de crédito
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-1.5">Nombre completo *</label>
                    <input
                      id="nombre"
                      type="text"
                      {...register("nombre")}
                      placeholder="Tu nombre completo"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.nombre ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                    />
                    {errors.nombre && <p className="text-xs text-destructive mt-1">{errors.nombre.message}</p>}
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
                        className={`w-full px-4 py-3 rounded-lg border ${errors.edad ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                      />
                      {errors.edad && <p className="text-xs text-destructive mt-1">{errors.edad.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-1.5">Teléfono *</label>
                      <input
                        id="telefono"
                        type="tel"
                        {...register("telefono")}
                        placeholder="10 dígitos"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.telefono ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                      />
                      {errors.telefono && <p className="text-xs text-destructive mt-1">{errors.telefono.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="correo" className="block text-sm font-medium text-foreground mb-1.5">Correo electrónico *</label>
                    <input
                      id="correo"
                      type="email"
                      {...register("correo")}
                      placeholder="tu@correo.com"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.correo ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                    />
                    {errors.correo && <p className="text-xs text-destructive mt-1">{errors.correo.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="servicio" className="block text-sm font-medium text-foreground mb-1.5">Servicio de interés *</label>
                    <select
                      id="servicio"
                      {...register("servicio")}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.servicio ? "border-destructive" : "border-input"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
                    >
                      <option value="">Selecciona un servicio</option>
                      {servicios.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.servicio && <p className="text-xs text-destructive mt-1">{errors.servicio.message}</p>}
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
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="desarrollo" className="block text-xs font-medium text-foreground mb-1">Desarrollo / Fraccionamiento</label>
                        <input
                          id="desarrollo"
                          type="text"
                          {...register("desarrollo")}
                          placeholder="Ej: Zibatá, Juriquilla, etc."
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
                  {errors.privacidad && <p className="text-xs text-destructive -mt-2">{errors.privacidad.message}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-accent-foreground py-3.5 rounded-lg font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        Enviar solicitud
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}