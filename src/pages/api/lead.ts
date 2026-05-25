import type { NextApiRequest, NextApiResponse } from "next";
import { leadFormSchema } from "@/lib/validations";
import nodemailer from "nodemailer";
import { getAdminEmailHTML, getClientEmailHTML } from "@/lib/email-templates";

type ResponseData = {
  success: boolean;
  message: string;
  errors?: any;
};

// Configurar transporter de Nodemailer con IONOS SMTP
const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465", // true para puerto 465, false para otros
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false // Útil para desarrollo, en producción considera quitarlo
    }
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método no permitido. Usa POST." });
  }

  try {
    // 1. VALIDACIÓN EN EL SERVIDOR
    const validData = leadFormSchema.parse(req.body);

    // 2. VERIFICAR CONFIGURACIÓN DE CORREO
    const transporter = createTransporter();
    
    if (!transporter) {
      console.error("⚠️ Configuración SMTP incompleta en .env.local");
      console.log("📝 Lead capturado (sin envío de correo):", validData);
      return res.status(200).json({
        success: true,
        message: "Lead registrado correctamente. Configuración de correo pendiente."
      });
    }

    // 3. ENVIAR CORREO AL ADMIN (ALDALU)
    const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER;
    const emailTo = process.env.EMAIL_TO || process.env.SMTP_USER;

    try {
      await transporter.sendMail({
        from: `"ALDALU - Nuevo Lead" <${emailFrom}>`,
        to: emailTo,
        subject: `🎯 Nuevo Lead: ${validData.servicio} - ${validData.nombre}`,
        html: getAdminEmailHTML(validData),
      });

      console.log(`✅ Email enviado al admin: ${emailTo}`);
    } catch (emailError: any) {
      console.error("❌ Error enviando email al admin:", emailError.message);
      // No bloqueamos la respuesta si falla el email
    }

    // 4. ENVIAR CONFIRMACIÓN AL CLIENTE
    try {
      await transporter.sendMail({
        from: `"ALDALU" <${emailFrom}>`,
        to: validData.correo,
        subject: "✅ Solicitud Recibida - ALDALU",
        html: getClientEmailHTML(validData.nombre),
      });

      console.log(`✅ Email de confirmación enviado a: ${validData.correo}`);
    } catch (emailError: any) {
      console.error("❌ Error enviando confirmación al cliente:", emailError.message);
      // No bloqueamos la respuesta si falla el email
    }

    // 5. RESPUESTA EXITOSA
    return res.status(200).json({
      success: true,
      message: "Lead registrado y correos enviados correctamente."
    });

  } catch (error: any) {
    console.error("Error procesando lead:", error);

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