import React from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function Privacidad() {
  return (
    <>
      <SEO title="Aviso de Privacidad | ALDALU" description="Aviso de privacidad de ALDALU conforme a la LFPDPPP." />
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="container max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
            Aviso de Privacidad
          </h1>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-5 leading-relaxed">
            <p>
              <strong className="text-foreground">ALDALU</strong>, con domicilio en Querétaro, Qro., México, es responsable del tratamiento de los datos personales que nos proporcione, los cuales serán protegidos conforme a lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y demás normatividad aplicable.
            </p>

            <h2 className="text-lg font-heading font-bold text-foreground mt-8">Datos personales recabados</h2>
            <p>
              Para las finalidades señaladas en el presente aviso de privacidad, podemos recabar los siguientes datos personales:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nombre completo</li>
              <li>Edad</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Servicio de interés</li>
            </ul>

            <h2 className="text-lg font-heading font-bold text-foreground mt-8">Finalidades del tratamiento</h2>
            <p>Sus datos personales serán utilizados para las siguientes finalidades:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Brindar asesoría financiera gratuita sobre créditos hipotecarios, automotrices y préstamos IMSS</li>
              <li>Contactarlo por teléfono, correo electrónico o WhatsApp para dar seguimiento a su solicitud</li>
              <li>Enviar información relevante sobre nuestros servicios</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
            </ul>

            <h2 className="text-lg font-heading font-bold text-foreground mt-8">Transferencia de datos</h2>
            <p>
              Sus datos personales no serán transferidos a terceros sin su consentimiento, salvo las excepciones previstas en la LFPDPPP y su Reglamento.
            </p>

            <h2 className="text-lg font-heading font-bold text-foreground mt-8">Derechos ARCO</h2>
            <p>
              Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (Derechos ARCO). Para ejercer cualquiera de estos derechos, puede enviarnos un correo electrónico a <a href="mailto:alonso.espitia.t@gmail.com" className="text-primary underline">alonso.espitia.t@gmail.com</a>.
            </p>

            <h2 className="text-lg font-heading font-bold text-foreground mt-8">Cambios al aviso de privacidad</h2>
            <p>
              Nos reservamos el derecho de efectuar modificaciones o actualizaciones al presente aviso de privacidad. Las modificaciones estarán disponibles en esta página.
            </p>

            <h2 className="text-lg font-heading font-bold text-foreground mt-8">Consentimiento</h2>
            <p>
              Al proporcionar sus datos personales a través de nuestro formulario de contacto, usted consiente el tratamiento de los mismos conforme a los términos del presente aviso de privacidad.
            </p>

            <p className="text-xs text-muted-foreground/60 mt-10">
              Última actualización: 24 de abril de 2026.
            </p>
          </div>

          <div className="mt-10">
            <Link href="/" className="text-primary font-medium text-sm hover:underline">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}