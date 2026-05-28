import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const contactFormSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  correo: z.string().email("Correo electrónico no válido"),
  telefono: z.string().min(10, "Teléfono debe tener al menos 10 dígitos"),
  asunto: z.string().min(3, "El asunto es requerido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contacto() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Nos pondremos en contacto contigo pronto.",
        });
        reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
                  Envíanos un Mensaje
                </h2>
                <p className="text-muted-foreground mb-8">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="nombre">Nombre Completo *</Label>
                    <Input
                      id="nombre"
                      {...register("nombre")}
                      placeholder="Juan Pérez"
                      className={errors.nombre ? "border-destructive" : ""}
                    />
                    {errors.nombre && (
                      <p className="text-sm text-destructive mt-1">{errors.nombre.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="correo">Correo Electrónico *</Label>
                    <Input
                      id="correo"
                      type="email"
                      {...register("correo")}
                      placeholder="juan@ejemplo.com"
                      className={errors.correo ? "border-destructive" : ""}
                    />
                    {errors.correo && (
                      <p className="text-sm text-destructive mt-1">{errors.correo.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      {...register("telefono")}
                      placeholder="442 250 6819"
                      className={errors.telefono ? "border-destructive" : ""}
                    />
                    {errors.telefono && (
                      <p className="text-sm text-destructive mt-1">{errors.telefono.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="asunto">Asunto *</Label>
                    <Input
                      id="asunto"
                      {...register("asunto")}
                      placeholder="¿En qué podemos ayudarte?"
                      className={errors.asunto ? "border-destructive" : ""}
                    />
                    {errors.asunto && (
                      <p className="text-sm text-destructive mt-1">{errors.asunto.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="mensaje">Mensaje *</Label>
                    <Textarea
                      id="mensaje"
                      {...register("mensaje")}
                      placeholder="Cuéntanos más sobre tu consulta..."
                      rows={6}
                      className={errors.mensaje ? "border-destructive" : ""}
                    />
                    {errors.mensaje && (
                      <p className="text-sm text-destructive mt-1">{errors.mensaje.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Al enviar este formulario, aceptas nuestra{" "}
                    <Link href="/privacidad" className="text-primary hover:underline">
                      Política de Privacidad
                    </Link>
                  </p>
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