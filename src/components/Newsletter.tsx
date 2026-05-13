import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Aquí se conectaría con la API o servicio de mailing real
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className={cn("py-20 bg-muted/30 relative overflow-hidden", className)}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-accent/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium border border-white/20">
                <Mail className="h-4 w-4" />
                <span>Boletín Financiero</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold font-heading leading-tight text-balance">
                Mantente al día con el mercado
              </h3>
              
              <p className="text-primary-foreground/90 text-lg text-balance">
                Recibe semanalmente consejos de ahorro, actualizaciones de tasas de interés y oportunidades inmobiliarias en Querétaro.
              </p>
              
              <ul className="space-y-3">
                {["Tips para mejorar tu buró", "Tendencias hipotecarias", "Educación financiera gratuita"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-primary-foreground/90">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 text-foreground shadow-xl border border-gray-100">
              {submitted ? (
                <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-heading">¡Gracias por suscribirte!</h4>
                  <p className="text-muted-foreground">
                    Tu correo ha sido registrado. Pronto comenzarás a recibir nuestras actualizaciones.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full mt-6" 
                    onClick={() => setSubmitted(false)}
                  >
                    Suscribir otro correo
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-500">
                  <div className="space-y-2">
                    <label htmlFor="email-newsletter" className="text-sm font-semibold text-gray-700">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email-newsletter"
                        type="email"
                        placeholder="tu@correo.com"
                        className="pl-11 h-14 bg-gray-50 border-gray-200 text-base focus-visible:ring-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-semibold shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5"
                  >
                    Suscribirme ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-xs text-center text-muted-foreground pt-2">
                    Al suscribirte, aceptas nuestra política de privacidad. Cero spam, prometido.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}