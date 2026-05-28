import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { leadFormSchema, type LeadFormData } from "@/lib/validations";
import { getAdminEmailHTML, getClientEmailHTML } from "@/lib/email-templates";

type ResponseData = {
  success: boolean;
  message: string;
  errors?: any;
};

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método no permitido. Usa POST." });
  }

  try {
    const validData = leadFormSchema.parse(req.body);
    console.log("📋 Lead validado desde página de contacto:", { nombre: validData.nombre, servicio: validData.servicio });

    const transporter = createTransporter();
    
    if (!transporter) {
      console.error("⚠️ Configuración SMTP incompleta en .env.local");
      return res.status(200).json({
        success: true,
        message: "Lead registrado correctamente. Configuración de correo pendiente."
      });
    }

    const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER;
    const emailTo = process.env.EMAIL_TO || process.env.SMTP_USER;

    console.log("📧 Configuración de correo:");
    console.log(`   FROM: ${emailFrom}`);
    console.log(`   TO (Admin): ${emailTo}`);
    console.log(`   TO (Cliente): ${validData.correo}`);

    const emailErrors: string[] = [];

    // Enviar correo al admin
    try {
      console.log("📤 Intentando enviar email al admin...");
      
      const adminEmailResult = await transporter.sendMail({
        from: `"ALDALU - Nuevo Lead" <${emailFrom}>`,
        to: emailTo,
        replyTo: validData.correo,
        subject: `🎯 Nuevo Lead: ${validData.servicio} - ${validData.nombre}`,
        html: getAdminEmailHTML(validData),
      });

      console.log(`✅ Email ADMIN enviado exitosamente`);
      console.log(`   MessageID: ${adminEmailResult.messageId}`);
      
    } catch (emailError: any) {
      console.error("❌ ERROR enviando email al admin:");
      console.error(`   Mensaje: ${emailError.message}`);
      emailErrors.push(`Admin: ${emailError.message}`);
    }

    // Enviar confirmación al cliente
    try {
      console.log("📤 Intentando enviar confirmación al cliente...");
      
      const clientEmailResult = await transporter.sendMail({
        from: `"ALDALU" <${emailFrom}>`,
        to: validData.correo,
        subject: "✅ Solicitud Recibida - ALDALU",
        html: getClientEmailHTML(validData.nombre),
      });

      console.log(`✅ Email CLIENTE enviado exitosamente`);
      console.log(`   MessageID: ${clientEmailResult.messageId}`);
      
    } catch (emailError: any) {
      console.error("❌ ERROR enviando confirmación al cliente:");
      console.error(`   Mensaje: ${emailError.message}`);
      emailErrors.push(`Cliente: ${emailError.message}`);
    }

    if (emailErrors.length > 0) {
      console.warn("⚠️ Lead registrado pero con errores en envío de correos:", emailErrors);
      return res.status(200).json({
        success: true,
        message: "Lead registrado. Algunos correos no se enviaron: " + emailErrors.join(", ")
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead registrado y correos enviados correctamente."
    });

  } catch (error: any) {
    console.error("💥 Error general procesando lead:", error);

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