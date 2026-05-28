import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import * as z from "zod";

type ResponseData = {
  success: boolean;
  message: string;
  errors?: any;
};

const contactFormSchema = z.object({
  nombre: z.string().min(2),
  correo: z.string().email(),
  telefono: z.string().min(10),
  asunto: z.string().min(3),
  mensaje: z.string().min(10),
});

const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

const getContactEmailHTML = (data: z.infer<typeof contactFormSchema>): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2dd4bf 0%, #d946ef 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">
                📩 Nuevo Mensaje de Contacto
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 24px; color: #64748b; font-size: 16px; line-height: 1.6;">
                Has recibido un nuevo mensaje desde el formulario de contacto:
              </p>

              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 16px; background-color: #f1f5f9; border-radius: 8px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #475569; font-weight: 600; width: 120px;">Nombre:</td>
                        <td style="color: #0f172a; font-weight: 500;">${data.nombre}</td>
                      </tr>
                      <tr>
                        <td style="color: #475569; font-weight: 600;">Correo:</td>
                        <td style="color: #0f172a; font-weight: 500;">
                          <a href="mailto:${data.correo}" style="color: #2dd4bf; text-decoration: none;">${data.correo}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #475569; font-weight: 600;">Teléfono:</td>
                        <td style="color: #0f172a; font-weight: 500;">
                          <a href="tel:${data.telefono}" style="color: #2dd4bf; text-decoration: none;">${data.telefono}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #475569; font-weight: 600;">Asunto:</td>
                        <td style="color: #0f172a; font-weight: 500;">${data.asunto}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 12px; color: #0f172a; font-size: 18px; font-weight: 600;">Mensaje:</h3>
                <div style="padding: 20px; background-color: #f8fafc; border-left: 4px solid #2dd4bf; border-radius: 6px;">
                  <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.mensaje}</p>
                </div>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.correo}?subject=Re: ${encodeURIComponent(data.asunto)}" 
                       style="display: inline-block; padding: 14px 32px; background-color: #2dd4bf; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                      Responder
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8fafc; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 13px;">
                Este correo fue generado automáticamente desde <strong>aldalu.com.mx</strong>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const getContactConfirmationHTML = (nombre: string): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2dd4bf 0%, #d946ef 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 700;">
                ✅ ¡Mensaje Recibido!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 24px; font-weight: 600;">
                Hola ${nombre},
              </h2>
              
              <p style="margin: 0 0 20px; color: #334155; font-size: 16px; line-height: 1.7;">
                Gracias por contactarnos. Hemos recibido tu mensaje correctamente y nuestro equipo lo revisará a la brevedad.
              </p>

              <p style="margin: 0 0 30px; color: #334155; font-size: 16px; line-height: 1.7;">
                Nos pondremos en contacto contigo en las próximas <strong>24-48 horas hábiles</strong> para atender tu solicitud.
              </p>

              <!-- Contact Options -->
              <div style="padding: 24px; background-color: #f8fafc; border-radius: 8px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 16px; color: #0f172a; font-size: 18px; font-weight: 600;">
                  ¿Necesitas atención inmediata?
                </h3>
                <p style="margin: 0 0 20px; color: #64748b; font-size: 15px; line-height: 1.6;">
                  Si tu consulta es urgente, puedes comunicarte con nosotros por:
                </p>
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #475569; font-weight: 600; width: 100px;">Teléfono:</td>
                    <td>
                      <a href="tel:+52442506819" style="color: #2dd4bf; text-decoration: none; font-weight: 500;">+52 442 250 6819</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #475569; font-weight: 600;">WhatsApp:</td>
                    <td>
                      <a href="https://wa.me/52442506819" style="color: #25D366; text-decoration: none; font-weight: 500;">Enviar mensaje</a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://aldalu.com.mx" 
                       style="display: inline-block; padding: 14px 32px; background-color: #2dd4bf; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                      Visitar Sitio Web
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8fafc; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px; color: #0f172a; font-size: 16px; font-weight: 600;">
                ALDALU - Brokers Hipotecarios
              </p>
              <p style="margin: 0; color: #64748b; font-size: 13px;">
                Querétaro, México · <a href="mailto:info@aldalu.com.mx" style="color: #2dd4bf; text-decoration: none;">info@aldalu.com.mx</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método no permitido. Usa POST." });
  }

  try {
    const validData = contactFormSchema.parse(req.body);
    console.log("📩 Mensaje de contacto recibido:", { nombre: validData.nombre, asunto: validData.asunto });

    const transporter = createTransporter();
    
    if (!transporter) {
      console.error("⚠️ Configuración SMTP incompleta");
      return res.status(200).json({
        success: true,
        message: "Mensaje registrado. Configuración de correo pendiente."
      });
    }

    const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER;
    const emailTo = process.env.EMAIL_TO || process.env.SMTP_USER;

    const emailErrors: string[] = [];

    // Enviar correo al admin
    try {
      await transporter.sendMail({
        from: `"ALDALU - Contacto" <${emailFrom}>`,
        to: emailTo,
        replyTo: validData.correo,
        subject: `💬 Contacto: ${validData.asunto} - ${validData.nombre}`,
        html: getContactEmailHTML(validData),
      });
      console.log("✅ Email de contacto enviado al admin");
    } catch (error: any) {
      console.error("❌ Error enviando email al admin:", error.message);
      emailErrors.push(`Admin: ${error.message}`);
    }

    // Enviar confirmación al cliente
    try {
      await transporter.sendMail({
        from: `"ALDALU" <${emailFrom}>`,
        to: validData.correo,
        subject: "✅ Hemos recibido tu mensaje - ALDALU",
        html: getContactConfirmationHTML(validData.nombre),
      });
      console.log("✅ Confirmación enviada al cliente");
    } catch (error: any) {
      console.error("❌ Error enviando confirmación:", error.message);
      emailErrors.push(`Cliente: ${error.message}`);
    }

    if (emailErrors.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Mensaje registrado. Algunos correos no se enviaron: " + emailErrors.join(", ")
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mensaje enviado correctamente."
    });

  } catch (error: any) {
    console.error("💥 Error procesando mensaje de contacto:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Los datos enviados no son válidos.",
        errors: error.errors
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor."
    });
  }
}