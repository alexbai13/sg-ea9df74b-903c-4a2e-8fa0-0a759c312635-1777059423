import type { NextApiRequest, NextApiResponse } from "next";
import { leadFormSchema } from "@/lib/validations";

type ResponseData = {
  success: boolean;
  message: string;
  errors?: any;
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
    // Parseamos el body usando el mismo esquema Zod del frontend
    const validData = leadFormSchema.parse(req.body);

    // 2. PROCESAMIENTO (Simulación)
    // Aquí es donde en el futuro enviaremos los datos a Supabase, un CRM, o enviaremos un correo.
    console.log("Datos validados en el servidor:", validData);
    
    // Simulamos un pequeño retraso de procesamiento
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 3. RESPUESTA EXITOSA
    return res.status(200).json({ 
      success: true, 
      message: "Lead registrado y validado correctamente en el servidor." 
    });
    
  } catch (error: any) {
    console.error("Error de validación en el servidor:", error);
    
    // Si la validación de Zod falla en el servidor, devolvemos 400 Bad Request
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