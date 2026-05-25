import type { NextApiRequest, NextApiResponse } from "next";
import { leadFormSchema } from "@/lib/validations";
import { Resend } from "resend";
import { getAdminEmailHTML, getClientEmailHTML } from "@/lib/email-templates";

type ResponseData = {
  success: boolean;
  message: string;
  errors?: any;
};

const resend = new Resend(process.env.RESEND_API_KEY);

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
    if (!process.env.RESEND_API_KEY) {
      console.error("⚠️ RESEND_API_KEY no configurada en .env.local");
      // Continuamos sin enviar correo pero registrando el lead
      console.log("📝 Lead capturado (sin envío de correo):", validData);
      return res.status(200).json({
        success: true,
        message: "Lead registrado correctamente. Configuración de correo pendiente."
      });
    }

    // 3. ENVIAR CORREO AL ADMIN (ALDALU)
    const emailFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";
    const emailTo = process.env.EMAIL_TO || "info@aldalu.com.mx";

    try {
      await resend.emails.send({
        from: emailFrom,
        to: emailTo,
        subject: `🎯 Nuevo Lead: ${validData.servicio} - ${validData.nombre}`,
        html: getAdminEmailHTML(validData),
      });

      console.log(`✅ Email enviado al admin: ${emailTo}`);
    } catch (emailError: any) {
      console.error("❌ Error enviando email al admin:", emailError);
      // No bloqueamos la respuesta si falla el email
    }

    // 4. ENVIAR CONFIRMACIÓN AL CLIENTE
    try {
      await resend.emails.send({
        from: emailFrom,
        to: validData.correo,
        subject: "✅ Solicitud Recibida - ALDALU",
        html: getClientEmailHTML(validData.nombre),
      });

      console.log(`✅ Email de confirmación enviado a: ${validData.correo}`);
    } catch (emailError: any) {
      console.error("❌ Error enviando confirmación al cliente:", emailError);
      // No bloqueamos la respuesta si falla el email
    }

    // 5. RESPUESTA EXITOSA
    return res.status(200).json({
      success: true,
      message: "Lead registrado y correos enviados correctamente."
    });

  } catch (error: any) {
    console.error("Error de validación en el servidor:", error);

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