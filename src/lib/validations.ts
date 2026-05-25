import * as z from "zod";

export const leadFormSchema = z.object({
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
  desarrollo: z.string().optional(),
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

export type LeadFormData = z.infer<typeof leadFormSchema>;